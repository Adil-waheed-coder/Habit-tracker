import { useAuth } from './useAuth';
import { useLocalStorage } from './useLocalStorage';
import { Habit, HabitLog } from '@/types';
import { format, isSameDay, subDays } from 'date-fns';

export function useHabits() {
  const { user } = useAuth();
  const [allHabits, setAllHabits] = useLocalStorage<Habit[]>('habitTracker_habits', []);
  const [allLogs, setAllLogs] = useLocalStorage<HabitLog[]>('habitTracker_logs', []);

  const userHabits = allHabits.filter(h => h.userId === user?.id);
  const userLogs = allLogs.filter(l => l.userId === user?.id);

  const addHabit = (habitStr: Omit<Habit, 'id' | 'userId' | 'createdAt'>) => {
    if (!user) return;
    const newHabit: Habit = {
      ...habitStr,
      id: crypto.randomUUID(),
      userId: user.id,
      createdAt: new Date().toISOString()
    };
    setAllHabits([...allHabits, newHabit]);
  };

  const updateHabit = (id: string, updates: Partial<Habit>) => {
    setAllHabits(allHabits.map(h => h.id === id ? { ...h, ...updates } : h));
  };

  const deleteHabit = (id: string) => {
    setAllHabits(allHabits.filter(h => h.id !== id));
    setAllLogs(allLogs.filter(l => l.habitId !== id));
  };

  const toggleLog = (habitId: string, dateStr: string) => {
    if (!user) return;
    
    // dateStr should be YYYY-MM-DD
    const existingLog = userLogs.find(l => l.habitId === habitId && l.date === dateStr);
    
    if (existingLog) {
      setAllLogs(allLogs.map(l => 
        l.id === existingLog.id ? { ...l, completed: !l.completed } : l
      ));
    } else {
      const newLog: HabitLog = {
        id: crypto.randomUUID(),
        habitId,
        userId: user.id,
        date: dateStr,
        completed: true
      };
      setAllLogs([...allLogs, newLog]);
    }
  };

  const getLogForDate = (habitId: string, dateStr: string) => {
    return userLogs.find(l => l.habitId === habitId && l.date === dateStr);
  };

  // Compute Streak for a habit
  const calculateStreak = (habitId: string) => {
    const logs = userLogs.filter(l => l.habitId === habitId && l.completed);
    if (!logs.length) return 0;

    const sortedDates = logs
      .map(l => new Date(l.date))
      .sort((a, b) => b.getTime() - a.getTime());

    let currentStreak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let checkDate = today;

    // Check if missed today, maybe keep yesterday's streak
    const hasToday = sortedDates.some(d => isSameDay(d, today));
    if (!hasToday) {
      checkDate = subDays(today, 1);
    }

    for (let i = 0; i < sortedDates.length; i++) {
      if (isSameDay(sortedDates[i], checkDate)) {
        currentStreak++;
        checkDate = subDays(checkDate, 1);
      } else {
        break;
      }
    }

    return currentStreak;
  };

  const getBestUserStreak = () => {
    let maxStreak = 0;
    userHabits.forEach(h => {
      const streak = calculateStreak(h.id);
      if (streak > maxStreak) maxStreak = streak;
    });
    return maxStreak;
  };

  return {
    habits: userHabits,
    logs: userLogs,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleLog,
    getLogForDate,
    calculateStreak,
    getBestUserStreak
  };
}
