import type { CSSProperties, HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

type LiquidGlassCardProps = HTMLAttributes<HTMLDivElement> & {
  blurIntensity?: 'sm' | 'md' | 'lg';
  borderRadius?: string;
  glowIntensity?: 'none' | 'sm' | 'md';
  shadowIntensity?: 'none' | 'sm' | 'md';
};

const blurMap = {
  sm: '14px',
  md: '22px',
  lg: '32px',
};

const glowMap = {
  none: 'transparent',
  sm: 'rgba(96, 165, 250, 0.2)',
  md: 'rgba(96, 165, 250, 0.34)',
};

const shadowMap = {
  none: 'none',
  sm: '0 18px 55px rgba(0, 0, 0, 0.24)',
  md: '0 24px 80px rgba(0, 0, 0, 0.34)',
};

export const LiquidGlassCard = ({
  blurIntensity = 'md',
  borderRadius = '18px',
  glowIntensity = 'sm',
  shadowIntensity = 'sm',
  className,
  style,
  children,
  ...props
}: LiquidGlassCardProps) => {
  const liquidStyle = {
    '--glass-blur': blurMap[blurIntensity],
    '--glass-radius': borderRadius,
    '--glass-glow': glowMap[glowIntensity],
    '--glass-shadow': shadowMap[shadowIntensity],
    ...style,
  } as CSSProperties;

  return (
    <div
      className={cn(
        'liquid-glass-card relative overflow-hidden border border-white/15 bg-white/[0.07] backdrop-saturate-150',
        className
      )}
      style={liquidStyle}
      {...props}
    >
      {children}
    </div>
  );
};
