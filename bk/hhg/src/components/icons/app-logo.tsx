
import Link from 'next/link';
import type { FC } from 'react';

// appName prop is no longer used as the name is fixed based on the image.
interface AppLogoProps {}

export const AppLogo: FC<AppLogoProps> = () => {
  return (
    <Link href="/" className="flex flex-col items-start group">
      <span className="text-3xl font-bold text-primary group-hover:text-accent transition-colors">
        Harmony
      </span>
      <span className="text-xs font-medium text-foreground/70 -mt-1 tracking-wider uppercase group-hover:text-accent/80 transition-colors">
        Hotel Group
      </span>
    </Link>
  );
};
