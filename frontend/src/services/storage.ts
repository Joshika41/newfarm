import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Url } from './api';
import { Task, User, ActivityLog, FarmSummary, TaskCategory, Issue, Notification } from '../types';
import { INITIAL_TASKS, INITIAL_ACTIVITIES, INITIAL_ISSUES, INITIAL_NOTIFICATIONS, INITIAL_USERS } from './mockData';

// ── Storage Keys ──────────────────────────────────────────────────────────────
const KEYS = {
  USER: 'fws_user',
  TOKEN: 'fws_token',
  TASKS: 'fws_tasks',
  ACTIVITIES: 'fws_activities',
  ISSUES: 'fws_issues',
  NOTIFICATIONS: 'fws_notifications',
};

const KEYS_EXT = {
  TASK_PHOTOS: 'fws_task_photos',
};

// ── Helper to determine if a role is a manager-level role ────────────────────
export function isManagerRole(role: string): boolean {
  return role === 'admin' || role === 'owner' || role === 'manager';
}

export const StorageService = {

  // ── TOKEN MANAGEMENT ────────────────────────────────────────────────────────
  async getToken(): Promise<string | null> {
    return await AsyncStorage.getItem(KEYS.TOKEN);
  },

  // ── USER AUTH / SESSION ──────────────────────────────────────────────────────
  async login(identifier: string, password: string): Promise<User | null> {
    const mockUser = INITIAL_USERS.find(
      (u) => u.username.toLowerCase() === identifier.trim().toLowerCase() && u.password === password
    );
    if (mockUser) {
      const user: User = {
        id: mockUser.id,
        name: mockUser.name,
        username: mockUser.username,
        role: mockUser.role,
        assigned_checklists: mockUser.assigned_checklists || [],
      };
      await AsyncStorage.setItem(KEYS.TOKEN, 'mock-token');
      await AsyncStorage.setItem(KEYS.USER, JSON.stringify(user));
      return user;
    }
    return null;
  },

  async getCurrentUser(): Promise<User | null> {
    const userStr = await AsyncStorage.getItem(KEYS.USER);
    if (!userStr) return null;
    const user: User = JSON.parse(userStr);

    // Optionally validate the token is still valid by checking the stored token
    const token = await this.getToken();
    if (!token) {
      // Token is gone but user object exists — clear session
      await this.logout();
      return null;
    }
    return user;
  },

  async logout(): Promise<void> {
    await AsyncStorage.removeItem(KEYS.USER);
    await AsyncStorage.removeItem(KEYS.TOKEN);
  },

  // Kept for compatibility (used in Manager's add employee form)
  async getUsers(): Promise<User[]> {
    return INITIAL_USERS.map((u) => ({
      id: String(u.id),
      name: u.name,
      username: u.username,
      role: u.role,
      assigned_checklists: u.assigned_checklists || [],
    }));
  },

  // ── TASKS ─────────────────────────────────────────────────────────────────────
  async getTasks(): Promise<Task[]> {
    try {
      const token = await this.getToken();
      if (!token) throw new Error("No token available");
      
      const response = await axios.get(Url.tasks, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const fetchedTasks = response.data;
      await this.saveTasks(fetchedTasks);
      return fetchedTasks;
    } catch (err) {
      console.error("Failed to fetch tasks from backend, falling back to local:", err);
      const tasksStr = await AsyncStorage.getItem(KEYS.TASKS);
      if (!tasksStr) {
        await AsyncStorage.setItem(KEYS.TASKS, JSON.stringify(INITIAL_TASKS));
        return INITIAL_TASKS;
      }
      return JSON.parse(tasksStr);
    }
  },

  async saveTasks(tasks: Task[]): Promise<void> {
    await AsyncStorage.setItem(KEYS.TASKS, JSON.stringify(tasks));
  },

  async toggleTask(taskId: string, userName: string): Promise<Task[]> {
    const tasks = await this.getTasks();
    const taskIndex = tasks.findIndex((t) => t.id === taskId);
    if (taskIndex > -1) {
      const task = tasks[taskIndex];
      const isCompleting = task.status === 'pending';
      const newStatus = isCompleting ? 'completed' : 'pending';

      try {
        const token = await this.getToken();
        if (token) {
          await axios.post(Url.toggleTask(taskId), { status: newStatus }, {
            headers: { Authorization: `Bearer ${token}` }
          });
        }
      } catch (err) {
        console.error("Failed to sync toggle with backend:", err);
      }

      task.status = newStatus;
      task.completedAt = isCompleting ? new Date().toISOString() : undefined;
      task.completedBy = isCompleting ? userName : undefined;

      await this.saveTasks(tasks);

      const actionText = isCompleting
        ? `Completed "${task.title}"`
        : `Reopened "${task.title}"`;
      await this.logActivity(userName, actionText, task.category);
    }
    return this.getTasks();
  },

  async updateTaskDetails(taskId: string, details: Record<string, any>, notes?: string): Promise<Task[]> {
    const tasks = await this.getTasks();
    const taskIndex = tasks.findIndex((t) => t.id === taskId);
    if (taskIndex > -1) {
      tasks[taskIndex].details = { ...tasks[taskIndex].details, ...details };
      if (notes !== undefined) {
        tasks[taskIndex].notes = notes;
      }
      await this.saveTasks(tasks);
    }
    return this.getTasks();
  },

  // ── ACTIVITIES ────────────────────────────────────────────────────────────────
  async getActivities(): Promise<ActivityLog[]> {
    const actStr = await AsyncStorage.getItem(KEYS.ACTIVITIES);
    if (!actStr) {
      await AsyncStorage.setItem(KEYS.ACTIVITIES, JSON.stringify(INITIAL_ACTIVITIES));
      return INITIAL_ACTIVITIES;
    }
    return JSON.parse(actStr);
  },

  async logActivity(userName: string, action: string, category: TaskCategory): Promise<ActivityLog> {
    const activities = await this.getActivities();
    const newLog: ActivityLog = {
      id: `act_${Date.now()}`,
      userId: userName.toLowerCase().replace(/\s+/g, '_'),
      userName,
      action,
      timestamp: new Date().toISOString(),
      category,
    };
    const updated = [newLog, ...activities].slice(0, 50);
    await AsyncStorage.setItem(KEYS.ACTIVITIES, JSON.stringify(updated));
    return newLog;
  },

  // ── ANALYTICS ─────────────────────────────────────────────────────────────────
  async getSummary(): Promise<FarmSummary> {
    const tasks = await this.getTasks();
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.status === 'completed').length;
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    const categories: TaskCategory[] = ['birds', 'fish', 'pond', 'calves', 'cow_shed', 'vehicles', 'maintenance', 'health'];
    const byCategory = {} as Record<TaskCategory, { total: number; completed: number }>;

    categories.forEach((cat) => {
      const catTasks = tasks.filter((t) => t.category === cat);
      byCategory[cat] = {
        total: catTasks.length,
        completed: catTasks.filter((t) => t.status === 'completed').length,
      };
    });

    return {
      totalTasks,
      completedTasks,
      completionRate,
      byCategory,
    };
  },

  // ── ISSUES ────────────────────────────────────────────────────────────────────
  async getIssues(): Promise<Issue[]> {
    const issuesStr = await AsyncStorage.getItem(KEYS.ISSUES);
    if (!issuesStr) {
      await AsyncStorage.setItem(KEYS.ISSUES, JSON.stringify(INITIAL_ISSUES));
      return INITIAL_ISSUES;
    }
    return JSON.parse(issuesStr);
  },

  async saveIssues(issues: Issue[]): Promise<void> {
    await AsyncStorage.setItem(KEYS.ISSUES, JSON.stringify(issues));
  },

  async reportIssue(issueDetails: Omit<Issue, 'id' | 'reportedAt' | 'status'>, imageUri?: string, audioUri?: string): Promise<Issue> {
    const issues = await this.getIssues();
    const newIssue: Issue = {
      ...issueDetails,
      id: `iss_${Date.now()}`,
      reportedAt: new Date().toISOString(),
      status: 'pending',
      imageUri,
      audioUri,
    };

    const updated = [newIssue, ...issues];
    await this.saveIssues(updated);

    const notificationMessage = `${newIssue.reportedBy} reported a ${newIssue.priority} priority ${newIssue.type.replace('_', ' ')} issue in ${newIssue.category.replace('_', ' ')}${newIssue.taskTitle ? ` (Task: ${newIssue.taskTitle})` : ''}.`;
    await this.createNotification(
      'New Issue Reported ⚠️',
      notificationMessage,
      newIssue.category,
      'issue_reported'
    );

    await this.logActivity(newIssue.reportedBy, `Reported issue: ${newIssue.description.substring(0, 30)}...`, newIssue.category);

    return newIssue;
  },

  // ── TASK PHOTO / PROOF ────────────────────────────────────────────────────────
  async getPhotos(category?: TaskCategory) {
    const photosStr = await AsyncStorage.getItem(KEYS_EXT.TASK_PHOTOS);
    let photos = [] as Array<{ id: string; taskId?: string; category?: TaskCategory; uri: string; reportedBy: string; timestamp: string; location?: { latitude: number; longitude: number } }>;
    if (!photosStr) {
      await AsyncStorage.setItem(KEYS_EXT.TASK_PHOTOS, JSON.stringify(photos));
      return photos;
    }
    photos = JSON.parse(photosStr);
    if (category) return photos.filter((p) => p.category === category);
    return photos;
  },

  async savePhotos(photos: Array<any>): Promise<void> {
    await AsyncStorage.setItem(KEYS_EXT.TASK_PHOTOS, JSON.stringify(photos));
  },

  async addTaskPhoto(taskId: string | undefined, category: TaskCategory | undefined, uri: string, reportedBy: string, location?: { latitude: number; longitude: number }) {
    const photos = await this.getPhotos();
    const newPhoto = {
      id: `photo_${Date.now()}`,
      taskId,
      category,
      uri,
      reportedBy,
      timestamp: new Date().toISOString(),
      location,
    };
    const updated = [newPhoto, ...photos].slice(0, 500);
    await this.savePhotos(updated);
    return newPhoto;
  },

  async completeTaskWithPhoto(taskId: string, userName: string, details?: Record<string, any>, imageUri?: string, location?: { latitude: number; longitude: number }) {
    const tasks = await this.getTasks();
    const taskIndex = tasks.findIndex((t) => t.id === taskId);
    if (taskIndex > -1) {
      const task = tasks[taskIndex];
      tasks[taskIndex].details = { ...tasks[taskIndex].details, ...details };
      if (imageUri) {
        tasks[taskIndex].proof = tasks[taskIndex].proof ? [...(tasks[taskIndex].proof as string[]), imageUri] : [imageUri];
      }
      tasks[taskIndex].status = 'completed';
      tasks[taskIndex].completedAt = new Date().toISOString();
      tasks[taskIndex].completedBy = userName;

      await this.saveTasks(tasks);

      if (imageUri) {
        await this.addTaskPhoto(taskId, task.category, imageUri, userName, location);
      }

      await this.logActivity(userName, `Completed "${task.title}" with proof`, task.category);
      await this.createNotification(
        'Task Completed ✅',
        `${userName} completed "${task.title}" (${task.category.replace('_', ' ')})`,
        task.category,
        'task_completed'
      );
    }

    return this.getTasks();
  },

  async resolveIssue(issueId: string, resolutionNotes?: string): Promise<Issue[]> {
    const issues = await this.getIssues();
    const index = issues.findIndex((i) => i.id === issueId);
    if (index > -1) {
      issues[index].status = 'resolved';
      issues[index].resolutionNotes = resolutionNotes;
      await this.saveIssues(issues);

      const user = await this.getCurrentUser();
      const userName = user ? user.name : 'Manager';
      await this.logActivity(userName, `Resolved issue: ${issues[index].description.substring(0, 30)}...`, issues[index].category);
    }
    return this.getIssues();
  },

  // ── NOTIFICATIONS ─────────────────────────────────────────────────────────────
  async getNotifications(): Promise<Notification[]> {
    const notificationsStr = await AsyncStorage.getItem(KEYS.NOTIFICATIONS);
    if (!notificationsStr) {
      await AsyncStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(INITIAL_NOTIFICATIONS));
      return INITIAL_NOTIFICATIONS;
    }
    return JSON.parse(notificationsStr);
  },

  async saveNotifications(notifications: Notification[]): Promise<void> {
    await AsyncStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  },

  async createNotification(title: string, message: string, category: TaskCategory, type: Notification['type']): Promise<Notification> {
    const notifications = await this.getNotifications();
    const newNotification: Notification = {
      id: `not_${Date.now()}`,
      title,
      message,
      timestamp: new Date().toISOString(),
      category,
      read: false,
      type,
    };
    const updated = [newNotification, ...notifications].slice(0, 50);
    await this.saveNotifications(updated);
    return newNotification;
  },

  async markNotificationRead(notificationId: string): Promise<Notification[]> {
    const notifications = await this.getNotifications();
    const index = notifications.findIndex((n) => n.id === notificationId);
    if (index > -1) {
      notifications[index].read = true;
      await this.saveNotifications(notifications);
    }
    return this.getNotifications();
  },

  async markAllNotificationsRead(): Promise<Notification[]> {
    const notifications = await this.getNotifications();
    const updated = notifications.map((n) => ({ ...n, read: true }));
    await this.saveNotifications(updated);
    return updated;
  },

  // ── RESCHEDULING ──────────────────────────────────────────────────────────────
  async rescheduleTask(
    taskId: string,
    newDueDate: string,
    newAssignee: string,
    newPriority: 'low' | 'medium' | 'high',
    reason: string
  ): Promise<Task[]> {
    const tasks = await this.getTasks();
    const taskIndex = tasks.findIndex((t) => t.id === taskId);
    if (taskIndex > -1) {
      const task = tasks[taskIndex];

      task.originalDueDate = task.originalDueDate || task.dueDate || new Date().toISOString();
      task.dueDate = newDueDate;
      task.assignedTo = newAssignee;
      task.priority = newPriority;
      task.rescheduledReason = reason;
      task.rescheduledAt = new Date().toISOString();

      await this.saveTasks(tasks);

      const notificationMsg = `Task "${task.title}" has been rescheduled to ${new Date(newDueDate).toLocaleDateString()} and assigned to ${newAssignee}. Reason: ${reason}`;
      await this.createNotification(
        'Task Rescheduled 📅',
        notificationMsg,
        task.category,
        'task_rescheduled'
      );

      const user = await this.getCurrentUser();
      const userName = user ? user.name : 'Manager';
      await this.logActivity(
        userName,
        `Rescheduled "${task.title}" (assigned to ${newAssignee})`,
        task.category
      );
    }
    return this.getTasks();
  },

  // ── SEED RESET ────────────────────────────────────────────────────────────────
  async resetAllData(): Promise<void> {
    await AsyncStorage.removeItem(KEYS.TASKS);
    await AsyncStorage.removeItem(KEYS.ACTIVITIES);
    await AsyncStorage.removeItem(KEYS.ISSUES);
    await AsyncStorage.removeItem(KEYS.NOTIFICATIONS);
  },
};
