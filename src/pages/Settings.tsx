import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export function Settings() {
  const { user, updateUser } = useAuth();
  
  // Profile state
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [profileMsg, setProfileMsg] = useState({ text: '', type: '' });

  // Password state
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState({ text: '', type: '' });

  // Settings
  const showStreaks = user?.settings?.showStreaks !== false; // default true

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    // Check if email already used by someone else
    const usersStr = localStorage.getItem('habitTracker_users');
    const users = usersStr ? JSON.parse(usersStr) : [];
    
    if (email !== user.email && users.some((u: any) => u.email === email && u.id !== user.id)) {
      setProfileMsg({ text: 'Email is already taken', type: 'error' });
      return;
    }

    updateUser({
      ...user,
      name,
      email,
      phone
    });
    setProfileMsg({ text: 'Profile updated successfully', type: 'success' });
    setTimeout(() => setProfileMsg({ text: '', type: '' }), 3000);
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (user.password !== oldPassword) {
      setPasswordMsg({ text: 'Old password is incorrect', type: 'error' });
      return;
    }

    if (newPassword.length < 6) {
      setPasswordMsg({ text: 'New password must be at least 6 characters', type: 'error' });
      return;
    }

    updateUser({
      ...user,
      password: newPassword
    });
    
    setOldPassword('');
    setNewPassword('');
    setPasswordMsg({ text: 'Password updated successfully', type: 'success' });
    setTimeout(() => setPasswordMsg({ text: '', type: '' }), 3000);
  };

  const toggleStreaks = () => {
    if (!user) return;
    updateUser({
      ...user,
      settings: {
        ...user.settings,
        showStreaks: !showStreaks
      }
    });
  };

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-10">
      <header>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">Settings</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">Manage your account preferences and settings.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
          {/* Profile Card */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Data</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                {profileMsg.text && (
                  <div className={`p-3 rounded-sm text-sm ${profileMsg.type === 'error' ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400' : 'bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400'}`}>
                    {profileMsg.text}
                  </div>
                )}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
                  <Input 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
                  <Input 
                    type="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Phone Number</label>
                  <Input 
                    type="tel" 
                    value={phone} 
                    onChange={e => setPhone(e.target.value)} 
                  />
                </div>
                <div className="pt-2">
                  <Button type="submit" className="w-full sm:w-auto">Save Profile</Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Preferences Card */}
          <Card>
            <CardHeader>
              <CardTitle>Dashboard Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100">Show Streaks</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Display your best streak on the dashboard</p>
                </div>
                <button
                  type="button"
                  onClick={toggleStreaks}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                    showStreaks ? 'bg-violet-500 dark:bg-violet-500' : 'bg-slate-200 dark:bg-slate-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      showStreaks ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          {/* Password Card */}
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordUpdate} className="space-y-4">
                {passwordMsg.text && (
                  <div className={`p-3 rounded-sm text-sm ${passwordMsg.type === 'error' ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400' : 'bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400'}`}>
                    {passwordMsg.text}
                  </div>
                )}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Old Password</label>
                  <Input 
                    type="password" 
                    value={oldPassword} 
                    onChange={e => setOldPassword(e.target.value)} 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">New Password</label>
                  <Input 
                    type="password" 
                    value={newPassword} 
                    onChange={e => setNewPassword(e.target.value)} 
                    required 
                  />
                </div>
                <div className="pt-2">
                  <Button type="submit" variant="default" className="w-full sm:w-auto">Update Password</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
