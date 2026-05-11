import { useMemo } from 'react';
import { format } from 'date-fns';
import { Target, Zap, LayoutList, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useHabits } from '@/hooks/useHabits';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { StatCard } from '@/components/dashboard/StatCard';
import { HabitListItem } from '@/components/dashboard/HabitListItem';

export function Dashboard() {
  const { user } = useAuth();
  const { habits, logs, toggleLog, getLogForDate, getBestUserStreak } = useHabits();

  const today = new Date();
  const todayStr = format(today, 'yyyy-MM-dd');
  const dayOfWeek = today.getDay(); // 0 is Sunday

  const todaysHabits = useMemo(() => {
    return habits.filter(h => h.isDaily || h.daysOfWeek.includes(dayOfWeek));
  }, [habits, dayOfWeek]);

  const stats = useMemo(() => {
    const todaysLogs = todaysHabits.map(h => {
      const log = getLogForDate(h.id, todayStr);
      return log?.completed || false;
    });

    const completedToday = todaysLogs.filter(Boolean).length;
    const totalToday = todaysHabits.length;
    const completionRate = totalToday === 0 ? 0 : Math.round((completedToday / totalToday) * 100);

    return {
      totalHabits: habits.length,
      bestStreak: getBestUserStreak(),
      completionRate,
      completedToday,
      totalToday
    };
  }, [habits.length, todaysHabits, getLogForDate, todayStr, getBestUserStreak]);

  const remainingActivities = todaysHabits.filter(h => !getLogForDate(h.id, todayStr)?.completed);

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-10">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">Dashboard</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">Welcome back, {user?.name}. Here's your progress.</p>
      </header>

      {/* Top Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard 
          title="Total Habits" 
          value={stats.totalHabits} 
          icon={<LayoutList className="w-5 h-5" />}
        />

        {user?.settings?.showStreaks !== false && (
          <StatCard 
            title="Best Streak" 
            value={`${stats.bestStreak} 🔥`}
            icon={<Zap className="w-5 h-5 text-orange-500" />}
          />
        )}

        <StatCard 
          title="Completion Rate (Today)" 
          value={`${stats.completionRate}%`}
          subtitle={`${stats.completedToday} of ${stats.totalToday} completed`}
          icon={<Target className="w-5 h-5 text-violet-500" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Record */}
        <Card className="flex flex-col transition-all">
          <CardHeader className="pb-4 border-b border-slate-900 dark:border-slate-100 relative">
            <CardTitle>Today's Habits</CardTitle>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Quick record for {format(today, 'MMM do, yyyy')}</p>
          </CardHeader>
          <CardContent className="pt-6 flex-1 bg-slate-50/50 dark:bg-slate-900/30">
            {todaysHabits.length === 0 ? (
              <div className="text-center py-10 px-4">
                <Target className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4 opacity-50" />
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">No habits scheduled for today.</p>
              </div>
            ) : (
              <ul className="space-y-4">
                {todaysHabits.map(habit => {
                  const log = getLogForDate(habit.id, todayStr);
                  return (
                    <HabitListItem 
                      key={habit.id}
                      habit={habit}
                      isCompleted={!!log?.completed}
                      onToggle={() => toggleLog(habit.id, todayStr)}
                    />
                  );
                })}
              </ul>
            )}
          </CardContent>
        </Card>

        {/* Remaining Activities */}
        <Card className="flex flex-col transition-all">
          <CardHeader className="pb-4 border-b border-slate-900 dark:border-slate-100">
            <CardTitle>Remaining Activities</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 flex-1 bg-slate-50/50 dark:bg-slate-900/30">
            {remainingActivities.length === 0 ? (
              <div className="text-center py-10 px-4">
                <div className="inline-flex w-14 h-14 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-full items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <p className="text-slate-600 dark:text-slate-300 font-medium">All caught up for today! 🎉</p>
                <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">Great job maintaining your habits.</p>
              </div>
            ) : (
              <ul className="space-y-3">
                {remainingActivities.map(habit => (
                  <li 
                    key={`rem-${habit.id}`}
                    className="flex justify-between items-center p-3.5 bg-rose-50 dark:bg-rose-500/10 text-rose-900 dark:text-rose-200 rounded-sm border border-rose-100 dark:border-rose-500/20"
                  >
                    <span className="font-medium text-sm">{habit.name}</span>
                    {habit.description && (
                      <span className="text-xs opacity-70 truncate max-w-[50%] ml-4">{habit.description}</span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
