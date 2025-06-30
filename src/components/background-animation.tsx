'use client';

import { cn } from '@/lib/utils';
import {
  BookOpen,
  Calculator,
  Code,
  FlaskConical,
  Globe,
  Languages,
  LineChart,
  Music,
  Palette,
  ScrollText,
} from 'lucide-react';
import React from 'react';

const icons = [
  { Icon: Calculator, className: 'left-[10%] w-16 h-16 animate-[float_18s_ease-in-out_infinite]' },
  { Icon: FlaskConical, className: 'left-[20%] w-8 h-8 animate-[float_12s_ease-in-out_infinite_2s]' },
  { Icon: ScrollText, className: 'left-[30%] w-10 h-10 animate-[float_20s_ease-in-out_infinite_4s]' },
  { Icon: BookOpen, className: 'left-[40%] w-20 h-20 animate-[float_22s_ease-in-out_infinite]' },
  { Icon: Palette, className: 'left-[50%] w-12 h-12 animate-[float_16s_ease-in-out_infinite_1s]' },
  { Icon: Music, className: 'left-[60%] w-8 h-8 animate-[float_28s_ease-in-out_infinite_3s]' },
  { Icon: Code, className: 'left-[70%] w-24 h-24 animate-[float_15s_ease-in-out_infinite]' },
  { Icon: LineChart, className: 'left-[80%] w-10 h-10 animate-[float_25s_ease-in-out_infinite_5s]' },
  { Icon: Languages, className: 'left-[90%] w-16 h-16 animate-[float_14s_ease-in-out_infinite_2s]' },
  { Icon: Globe, className: 'left-[5%] w-14 h-14 animate-[float_24s_ease-in-out_infinite_6s]' },
  { Icon: Calculator, className: 'left-[85%] w-6 h-6 animate-[float_30s_ease-in-out_infinite_3s]' },
  { Icon: BookOpen, className: 'left-[25%] w-12 h-12 animate-[float_19s_ease-in-out_infinite_5s]' },
];

export function BackgroundAnimation() {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10"
      aria-hidden="true"
    >
      <div className="relative w-full h-full">
        {icons.map(({ Icon, className }, index) => (
          <div
            key={index}
            className={cn('absolute text-primary/20 bottom-[-10rem]', className)}
          >
            <Icon className="w-full h-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
