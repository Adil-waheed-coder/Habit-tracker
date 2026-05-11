export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  password?: string;
  settings: UserSettings;
}

export interface UserSettings {
  showStreaks: boolean;
}

export interface Habit {
  id: string;
  userId: string;
  name: string;
  description: string;
  isDaily: boolean;
  daysOfWeek: number[]; // 0 = Sunday, 1 = Monday, etc.
  createdAt: string;
}

export interface HabitLog {
  id: string;
  habitId: string;
  userId: string;
  date: string; // YYYY-MM-DD
  completed: boolean;
}
