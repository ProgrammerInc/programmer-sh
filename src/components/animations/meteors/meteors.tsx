import { cn } from '@/lib/utils';
import { StarsBackground } from '..';

export interface MeteorsProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  number?: number;
  className?: string;
  withStars?: boolean;
}

export const Meteors = ({ color, number, className, withStars = true }: MeteorsProps) => {
  const meteors = new Array(number || 50).fill(true);
  const meteorClassName = color ? `before:from-[${color}]` : 'before:from-[--terminal-prompt]';
  const meteorsHtml = meteors.map((el, idx) => (
    <span
      key={'meteor' + idx}
      className={cn(
        'animate-meteor-effect absolute top-1/2 left-1/2 rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]',
        "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:to-transparent",
        meteorClassName,
        className
      )}
      style={{
        top: 0,
        left: Math.floor(Math.random() * (1920 - -1920) + -1920) + 'px',
        animationDelay: Math.random() * (0.8 - 0.2) + 0.2 + 's',
        animationDuration: Math.floor(Math.random() * (10 - 2) + 2) + 's'
      }}
    ></span>
  ));

  if (withStars) {
    return (
      <div className="meteors-container">
        {meteorsHtml}
        <StarsBackground className="stars-background" />
      </div>
    );
  }

  return <div className="meteors-container">{meteorsHtml}</div>;
};

export default Meteors;
