import React, { useState } from 'react';
import { Plus, LayoutGrid, List, Trash2, CalendarDays } from 'lucide-react';
import { useHabits } from '@/hooks/useHabits';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function ManageHabits() {
  const { habits, addHabit, deleteHabit } = useHabits();
  
  const [view, setView] = useState<'grid' | 'table'>('grid');
  
  // Form state
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isDaily, setIsDaily] = useState(true);
  const [selectedDays, setSelectedDays] = useState<number[]>([]);

  const handleToggleDay = (dayIndex: number) => {
    setSelectedDays(prev => 
      prev.includes(dayIndex) 
        ? prev.filter(d => d !== dayIndex)
        : [...prev, dayIndex]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addHabit({
      name,
      description,
      isDaily,
      daysOfWeek: selectedDays
    });

    // Reset
    setName('');
    setDescription('');
    setIsAdding(false);
    setIsDaily(true);
    setSelectedDays([]);
  };

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-8">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">Manage Habits</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">Create and organize your tracking items.</p>
        </div>
        <Button onClick={() => setIsAdding(!isAdding)} size="lg" className="w-full sm:w-auto">
          <Plus className="w-5 h-5 mr-2" />
          {isAdding ? 'Cancel' : 'New Habit'}
        </Button>
      </header>

      {isAdding && (
        <Card className="mb-8 overflow-hidden bg-violet-50/50 dark:bg-slate-900">
          <div className="h-1 bg-violet-500 w-full border-b-2 border-slate-900 dark:border-slate-100" />
          <CardHeader>
            <CardTitle>Create New Habit</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
              <div className="space-y-2">
                <label className="text-sm font-medium">Habit Name</label>
                <Input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Read 10 pages"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Description (Optional)</label>
                <Input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Fiction or non-fiction"
                />
              </div>

              <div className="space-y-3 pt-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Schedule</label>
                <div className="flex gap-6 items-center bg-white dark:bg-slate-950 p-3 rounded-sm border border-slate-200 dark:border-slate-800">
                  <label className="flex items-center gap-2 text-sm cursor-pointer select-none dark:text-slate-300">
                    <input 
                      type="radio" 
                      checked={isDaily} 
                      onChange={() => setIsDaily(true)}
                      className="text-violet-600 focus:ring-violet-600 h-4 w-4 border-slate-300 dark:border-slate-700 dark:bg-slate-900"
                    />
                    Apply to Daily Schedule
                  </label>
                  <label className="flex items-center gap-2 text-sm cursor-pointer select-none dark:text-slate-300">
                    <input 
                      type="radio" 
                      checked={!isDaily} 
                      onChange={() => setIsDaily(false)}
                      className="text-violet-600 focus:ring-violet-600 h-4 w-4 border-slate-300 dark:border-slate-700 dark:bg-slate-900"
                    />
                    Specific Days
                  </label>
                </div>

                {!isDaily && (
                  <div className="flex flex-wrap gap-2 mt-3 p-3 bg-white dark:bg-slate-950 rounded-sm border-2 border-slate-900 dark:border-slate-100">
                    {DAYS_OF_WEEK.map((day, index) => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => handleToggleDay(index)}
                        className={`px-3.5 py-1.5 text-xs font-semibold rounded-full border-2 transition-all ${
                          selectedDays.includes(index) 
                            ? 'bg-violet-600 text-white border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] dark:border-slate-100 dark:shadow-[2px_2px_0px_0px_rgba(241,245,249,1)] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(241,245,249,1)] active:translate-y-1 active:shadow-[0px_0px_0px_0px_rgba(15,23,42,1)]' 
                            : 'bg-white text-slate-800 border-slate-300 hover:border-slate-900 hover:-translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] dark:bg-slate-900 dark:text-slate-200 dark:border-slate-700 dark:hover:border-slate-100 dark:hover:shadow-[2px_2px_0px_0px_rgba(241,245,249,1)]'
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4">
                <Button type="submit">Save Habit</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="flex items-center justify-between mb-4 border-b-2 border-slate-900 dark:border-slate-100 pb-4">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Your Habits</h2>
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-sm">
          <button
            onClick={() => setView('grid')}
            className={`p-2 rounded-sm transition-all ${view === 'grid' ? 'bg-white border-2 border-slate-900 text-violet-600 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] dark:border-slate-100 dark:shadow-[2px_2px_0px_0px_rgba(241,245,249,1)] dark:bg-slate-950 dark:text-violet-400' : 'text-slate-500 hover:text-slate-900 border-2 border-transparent dark:text-slate-400 dark:hover:text-slate-200'}`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setView('table')}
            className={`p-2 rounded-sm transition-all ${view === 'table' ? 'bg-white border-2 border-slate-900 text-violet-600 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] dark:border-slate-100 dark:shadow-[2px_2px_0px_0px_rgba(241,245,249,1)] dark:bg-slate-950 dark:text-violet-400' : 'text-slate-500 hover:text-slate-900 border-2 border-transparent dark:text-slate-400 dark:hover:text-slate-200'}`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {habits.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 border-2 border-slate-900 dark:border-slate-100 rounded-sm border-dashed">
          <CalendarDays className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 dark:text-white">No habits yet</h3>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Get started by creating your first habit above.</p>
        </div>
      ) : (
        <>
          {view === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {habits.map(habit => (
                <Card key={habit.id} className="transition-all hover:-translate-y-1">
                  <CardHeader className="flex flex-row items-start justify-between pb-2">
                    <CardTitle className="text-lg truncate pl-1" title={habit.name}>{habit.name}</CardTitle>
                    <button 
                      onClick={() => deleteHabit(habit.id)}
                      className="text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors bg-slate-50 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/50 p-2 rounded-sm"
                      title="Delete habit"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </CardHeader>
                  <CardContent>
                    {habit.description && (
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-3 truncate pl-1">{habit.description}</p>
                    )}
                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 pl-1">
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wider mb-3">Schedule</p>
                      {habit.isDaily ? (
                        <span className="inline-block px-3 py-1 bg-violet-100 dark:bg-violet-500/10 text-violet-800 dark:text-violet-400 text-xs font-medium rounded-full">
                          Daily
                        </span>
                      ) : (
                        <div className="flex flex-wrap gap-1.5">
                          {habit.daysOfWeek.map(d => (
                            <span key={d} className="inline-block px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium rounded-sm">
                              {DAYS_OF_WEEK[d]}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 border-2 text-left border-slate-900 dark:border-slate-100 rounded-sm overflow-hidden shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] dark:shadow-[4px_4px_0px_0px_rgba(241,245,249,1)]">
              <table className="w-full">
                <thead className="bg-slate-50 dark:bg-slate-950 border-b-2 border-slate-900 dark:border-slate-100 text-xs uppercase text-slate-500 dark:text-slate-500 tracking-wider">
                  <tr>
                    <th className="px-6 py-4 font-medium text-left">Habit Name</th>
                    <th className="px-6 py-4 font-medium text-left">Description</th>
                    <th className="px-6 py-4 font-medium text-left">Schedule</th>
                    <th className="px-6 py-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm">
                  {habits.map(habit => (
                    <tr key={habit.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">{habit.name}</td>
                      <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{habit.description || '-'}</td>
                      <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                        {habit.isDaily ? (
                          <span className="inline-block px-2.5 py-1 bg-violet-100 dark:bg-violet-500/10 text-violet-800 dark:text-violet-400 text-xs font-medium rounded-full">Daily</span>
                        ) : habit.daysOfWeek.map(d => DAYS_OF_WEEK[d]).join(', ')}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => deleteHabit(habit.id)}
                          className="text-rose-500 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300 font-medium bg-rose-50 dark:bg-rose-500/10 px-3 py-1.5 rounded-sm transition-colors"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}
