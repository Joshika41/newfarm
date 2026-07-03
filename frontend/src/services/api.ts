export const baseUrl = process.env.EXPO_PUBLIC_API_URL || "http://localhost:8000";

export const Url = {
  login: `${baseUrl}/login`,
  tasks: `${baseUrl}/tasks`,
  toggleTask: (id: string) => `${baseUrl}/tasks/${id}/toggle`,
  uploadVoice: (id: string) => `${baseUrl}/tasks/${id}/voice`,
  getVoice: (id: string) => `${baseUrl}/tasks/${id}/voice`,
  users: `${baseUrl}/users`,
};