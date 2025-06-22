'use client';

import React, { useEffect, useState } from 'react';

interface ProgressBarProps {
  progress: number; // 0-100
  label?: string;
  color?: 'green' | 'blue' | 'red' | 'yellow' | 'purple';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  showPercentage?: boolean;
}

export default function ProgressBar({ 
  progress, 
  label, 
  color = 'green', 
  size = 'md', 
  animated = true,
  showPercentage = true 
}: ProgressBarProps) {
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setDisplayProgress(progress);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setDisplayProgress(progress);
    }
  }, [progress, animated]);

  const getColorStyles = () => {
    const colors = {
      green: 'from-green-500 to-green-600',
      blue: 'from-blue-500 to-blue-600',
      red: 'from-red-500 to-red-600',
      yellow: 'from-yellow-500 to-yellow-600',
      purple: 'from-purple-500 to-purple-600'
    };
    return colors[color];
  };

  const getSizeStyles = () => {
    const sizes = {
      sm: 'h-2',
      md: 'h-4',
      lg: 'h-6'
    };
    return sizes[size];
  };

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          {showPercentage && (
            <span className="text-sm font-bold text-gray-600">{Math.round(displayProgress)}%</span>
          )}
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${getSizeStyles()}`}>
        <div
          className={`progress-bar ${getColorStyles()} ${getSizeStyles()} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${displayProgress}%` }}
        />
      </div>
    </div>
  );
}

// Componente para múltiplas barras de progresso
export function ProgressBarGroup({ items }: { 
  items: Array<{ 
    label: string; 
    progress: number; 
    color?: ProgressBarProps['color']; 
  }> 
}) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <ProgressBar
          key={index}
          label={item.label}
          progress={item.progress}
          color={item.color}
          size="md"
          animated={true}
        />
      ))}
    </div>
  );
}

// Componente para estatísticas com progress bar
export function StatsProgressCard({ 
  title, 
  value, 
  maxValue, 
  color = 'green' 
}: { 
  title: string; 
  value: number; 
  maxValue: number; 
  color?: ProgressBarProps['color']; 
}) {
  const progress = (value / maxValue) * 100;

  return (
    <div className="glass p-6 rounded-2xl shadow-lg card-glow hover-3d">
      <h3 className="text-lg font-bold text-gray-800 mb-4">{title}</h3>
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl font-bold text-gray-900">{value}</span>
        <span className="text-sm text-gray-600">de {maxValue}</span>
      </div>
      <ProgressBar
        progress={progress}
        color={color}
        size="md"
        animated={true}
        showPercentage={false}
      />
    </div>
  );
} 