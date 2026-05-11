import React, { useEffect, useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';

export function StorageWarning() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleLimitReached = () => {
      setIsVisible(true);
      // Auto-hide after 8 seconds
      setTimeout(() => setIsVisible(false), 8000);
    };

    window.addEventListener('storageLimitReached', handleLimitReached as EventListener);
    return () => window.removeEventListener('storageLimitReached', handleLimitReached as EventListener);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-start gap-4 rounded-2xl bg-rose-500 p-4 text-white shadow-xl max-w-sm animate-in slide-in-from-bottom-5">
      <AlertTriangle className="w-6 h-6 shrink-0" />
      <div className="flex-1">
        <h3 className="font-bold">Storage Limit Reached</h3>
        <p className="text-sm text-rose-100 mt-1">
          You've used up your 5MB local storage allowance. Please clear some habits or logs.
        </p>
      </div>
      <button 
        onClick={() => setIsVisible(false)}
        className="text-rose-200 hover:text-white transition-colors"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}
