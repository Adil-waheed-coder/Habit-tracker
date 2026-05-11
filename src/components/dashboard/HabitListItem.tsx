import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import { Habit } from '@/types';

interface HabitListItemProps {
  habit: Habit;
  isCompleted: boolean;
  onToggle: () => void;
}

export const HabitListItem: React.FC<HabitListItemProps> = ({ habit, isCompleted, onToggle }) => {
  return (
    <li className="flex items-center justify-between p-3 md:p-4 border-2 border-slate-900 dark:border-slate-100 rounded-sm bg-white dark:bg-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] dark:shadow-[4px_4px_0px_0px_rgba(241,245,249,1)] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(241,245,249,1)] transition-all group">
      <div className="flex items-center gap-4 cursor-pointer flex-1" onClick={onToggle}>
        <button
          className="text-slate-300 dark:text-slate-600 hover:text-violet-600 dark:hover:text-violet-400 transition-colors focus:outline-none"
          aria-label={isCompleted ? "Mark incomplete" : "Mark complete"}
        >
          {isCompleted ? (
            <CheckCircle2 className="w-6 h-6 text-violet-600 dark:text-violet-400" />
          ) : (
            <Circle className="w-6 h-6 group-hover:text-violet-400" />
          )}
        </button>
        <div>
          <p
            className={`font-medium transition-colors ${
              isCompleted
                ? 'text-slate-400 dark:text-slate-500 line-through'
                : 'text-slate-900 dark:text-slate-100'
            }`}
          >
            {habit.name}
          </p>
          {habit.description && (
            <p className={`text-xs mt-0.5 ${isCompleted ? 'text-slate-400 dark:text-slate-600' : 'text-slate-500 dark:text-slate-400'}`}>
              {habit.description}
            </p>
          )}
        </div>
      </div>
    </li>
  );
}
