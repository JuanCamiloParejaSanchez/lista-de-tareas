'use client';

interface ProgressBarProps {
  completed: number;
  total: number;
  className?: string;
  showPercentage?: boolean;
}

export default function ProgressBar({ completed, total, className = '', showPercentage = true }: ProgressBarProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-slate-800 dark:text-slate-300">
          Progreso
        </span>
        {showPercentage && (
          <span className="text-sm font-medium text-slate-800 dark:text-slate-300">
            {percentage}%
          </span>
        )}
      </div>
      
      <div className="w-full bg-slate-300 dark:bg-slate-700 rounded-full h-3 overflow-hidden shadow-inner-glow">
        <div 
          className="h-full bg-gradient-success rounded-full transition-all duration-500 ease-out shadow-glow animate-pulse-slow"
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mt-2">
        <span>{completed} completadas</span>
        <span>{total - completed} pendientes</span>
      </div>
    </div>
  );
} 