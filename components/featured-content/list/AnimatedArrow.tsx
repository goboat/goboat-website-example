import { useEffect, useRef } from 'react';
import anime from 'animejs';

const ANIMATION_DURATION = 300;
const EASING = 'linear';

const COLLABSED_STATE = 'M11.7054 1L23 12.4M23 12.4L11.7054 24M23 12.4H0';
const EXPANDED_STATE = 'M15.7054 1L27 12.4M27 12.4L15.7054 24M27 12.4H4';

const animateArrow = (ref: SVGPathElement | null, state: string) => {
  anime({
    targets: ref,
    d: state,
    duration: ANIMATION_DURATION,
    easing: EASING,
  });
};

interface AnimatedArrowProps {
  isExpanded: boolean;
  style?: object;
}

const AnimatedArrow = ({ isExpanded, style }: AnimatedArrowProps) => {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (isExpanded) {
      animateArrow(pathRef.current, EXPANDED_STATE);
    } else {
      animateArrow(pathRef.current, COLLABSED_STATE);
    }
  }, [isExpanded]);

  return (
    <svg
      style={style}
      width="18.67"
      height="16.67"
      viewBox="0 0 28 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        ref={pathRef}
        d="M11.7054 1L23 12.4M23 12.4L11.7054 24M23 12.4H0"
        stroke="#333233"
        strokeWidth="1.41235"
      />
      <path d="M22.6212 12.4045H0" stroke="#333233" strokeWidth="1.41235" />
    </svg>
  );
};

export default AnimatedArrow;
