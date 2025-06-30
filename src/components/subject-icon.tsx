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
  type LucideProps,
} from 'lucide-react';
import type { ComponentType } from 'react';

export const iconMap: { [key: string]: ComponentType<LucideProps> } = {
  Calculator,
  FlaskConical,
  ScrollText,
  BookOpen,
  Palette,
  Music,
  Code,
  LineChart,
  Languages,
  Globe,
};

interface SubjectIconProps extends LucideProps {
  iconName: string;
}

export function SubjectIcon({ iconName, ...props }: SubjectIconProps) {
  const IconComponent = iconMap[iconName];

  if (!IconComponent) {
    return null;
  }

  return <IconComponent {...props} />;
}
