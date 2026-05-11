import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ListTodo, Settings, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { Button } from './ui/Button';
import { ThemeToggle } from './ThemeToggle';
import { useState } from 'react';

export function Layout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Habits', path: '/habits', icon: ListTodo },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      {/* Mobile Topbar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-slate-900 border-b-2 border-slate-900 dark:border-slate-100 flex items-center justify-between px-4 z-20">
        <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">HabitTracker</h1>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={() => setMobileOpen(!mobileOpen)} className="dark:text-slate-300">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Sidebar Overlay */}
      {mobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-30"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-slate-900 border-r-2 border-slate-900 dark:border-slate-100 flex flex-col transition-transform duration-300 lg:static lg:translate-x-0",
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">HabitTracker</h1>
          <div className="hidden lg:block">
            <ThemeToggle />
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-1.5 pt-4 lg:pt-0">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-sm text-sm font-semibold transition-all duration-200",
                  isActive
                    ? "bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-100"
                )}
              >
                <Icon className={cn("w-5 h-5", isActive ? "text-violet-600 dark:text-violet-400" : "text-slate-400 dark:text-slate-500")} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t-2 border-slate-900 dark:border-slate-100 mt-auto">
          <div className="flex items-center gap-3 mb-4 px-3">
            <div className="w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-500/20 flex flex-shrink-0 items-center justify-center text-violet-700 dark:text-violet-300 font-bold text-lg">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="text-sm font-semibold text-slate-900 dark:text-slate-200 truncate pr-2">
              {user?.name}
            </div>
          </div>
          <Button 
            variant="ghost" 
            className="w-full justify-start text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:text-slate-400 dark:hover:bg-rose-500/10 dark:hover:text-rose-400"
            onClick={logout}
          >
            <LogOut className="w-5 h-5 mr-3 opacity-70" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto pt-16 lg:pt-0 dark:bg-slate-950">
        <div className="container mx-auto h-full min-h-screen">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
