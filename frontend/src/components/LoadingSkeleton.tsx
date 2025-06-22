'use client';

import React from 'react';

interface SkeletonProps {
  type?: 'card' | 'text' | 'button' | 'avatar';
  className?: string;
}

export default function LoadingSkeleton({ type = 'card', className = '' }: SkeletonProps) {
  const getSkeletonStyles = () => {
    const baseStyles = "skeleton rounded";
    
    switch (type) {
      case 'card':
        return `${baseStyles} h-48 w-full ${className}`;
      case 'text':
        return `${baseStyles} h-4 w-full ${className}`;
      case 'button':
        return `${baseStyles} h-10 w-24 ${className}`;
      case 'avatar':
        return `${baseStyles} h-12 w-12 rounded-full ${className}`;
      default:
        return `${baseStyles} h-4 w-full ${className}`;
    }
  };

  return <div className={getSkeletonStyles()}></div>;
}

// Componente para múltiplos skeletons
export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="space-y-4">
            <div className="skeleton h-6 w-3/4 rounded"></div>
            <div className="grid grid-cols-2 gap-3">
              <div className="skeleton h-4 w-full rounded"></div>
              <div className="skeleton h-4 w-full rounded"></div>
              <div className="skeleton h-4 w-full rounded"></div>
              <div className="skeleton h-4 w-full rounded"></div>
            </div>
            <div className="flex gap-2">
              <div className="skeleton h-8 w-1/2 rounded"></div>
              <div className="skeleton h-8 w-1/2 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Componente para skeleton de estatísticas
export function StatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-gray-200 text-center">
          <div className="skeleton h-12 w-16 mx-auto rounded mb-2"></div>
          <div className="skeleton h-6 w-24 mx-auto rounded"></div>
        </div>
      ))}
    </div>
  );
} 