export interface User {
  id: string;
  name: string;
  username: string;
  email?: string;
  password?: string;  // Only used for demo fallback; never stored in production
  role: 'employee' | 'admin' | 'owner' | 'manager'; // manager kept for legacy mock compatibility
  department?: 'birds' | 'fish' | 'calves' | 'cow_shed' | 'vehicles' | 'maintenance' | 'pond' | 'health';
  assigned_checklists?: TaskCategory[];  // RBAC: categories this user can access
  avatar?: string;
}

export type TaskCategory = 'birds' | 'fish' | 'calves' | 'cow_shed' | 'vehicles' | 'maintenance' | 'pond' | 'health';

export interface Task {
  id: string;
  title: string;
  category: TaskCategory;
  subcategory: string; // e.g., 'Feed', 'Water', 'Cleaning', 'Vaccination', 'Fuel', etc.
  status: 'pending' | 'completed';
  assignedTo: string; // Employee Name/ID
  completedAt?: string;
  completedBy?: string;
  priority: 'low' | 'medium' | 'high';
  notes?: string;
  details?: Record<string, any>; // For extra form fields (e.g., pH: 7.2, temp: 18C, mortality: 0)
  dueDate?: string;              // ISO String or simplified date representation (e.g. YYYY-MM-DD)
  originalDueDate?: string;
  rescheduledReason?: string;
  rescheduledAt?: string;
  proof?: string[];               // Photo/media proof URIs
}

export interface Issue {
  id: string;
  taskId?: string;      // Linked task if applicable
  taskTitle?: string;   // Cached title for easy display
  category: TaskCategory;
  reportedBy: string;   // Worker name
  reportedAt: string;   // Timestamp
  priority: 'low' | 'medium' | 'high';
  type: 'equipment' | 'animal_health' | 'supply' | 'other';
  description: string;
  imageUri?: string;    // Base64 or local image URL
  audioUri?: string;    // Local audio recording URI
  status: 'pending' | 'resolved';
  resolutionNotes?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  category: TaskCategory;
  read: boolean;
  type: 'issue_reported' | 'task_completed' | 'task_rescheduled';
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: string; // e.g., "Completed Feed task in Birds"
  timestamp: string;
  category: TaskCategory;
}

export interface FarmSummary {
  totalTasks: number;
  completedTasks: number;
  completionRate: number;
  byCategory: Record<TaskCategory, { total: number; completed: number }>;
}

export interface WeatherData {
  temp: number;
  condition: string; // e.g., 'Sunny', 'Rainy', 'Cloudy'
  humidity: number;
  windSpeed: number;
}

// Auth API response types
export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: {
    id: string;
    username: string;
    name: string;
    role: 'employee' | 'admin' | 'owner';
    assigned_checklists: TaskCategory[];
  };
}
