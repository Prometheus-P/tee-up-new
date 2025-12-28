'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ComponentPropsWithoutRef } from 'react';

interface AnimatedGradientProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Gradient colors
   */
  colors?: string[];
  /**
   * Animation speed in seconds
   * @default 5
   */
  speed?: number;
}

export function AnimatedGradient({
  children,
  className,
  colors = ['#0A362B', '#B39A68', '#1976D2'],
  speed = 5,
  ...props
}: AnimatedGradientProps) {
  // Use standard style tag with dangerouslySetInnerHTML to avoid 'jsx' prop error
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl',
        className
      )}
      {...props}
    >
      <div
        className="absolute inset-0 animate-gradient opacity-30"
        style={{
          background: `linear-gradient(-45deg, ${colors.join(', ')})`,
          backgroundSize: '400% 400%',
          animation: `gradient ${speed}s ease infinite`,
        }}
      />
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      ` }} />
      <div className="relative z-10">{children}</div>
    </div>
  );
}