import { useEffect, useRef } from 'react';
import anime from 'animejs';

const ANIMATION_DURATION = 200;
const EASING = 'easeOutQuad';

const COLLABSED_STATE =
  'M9.14286 1L17 8.93043M17 8.93043L9.14286 17M17 8.93043L1 8.93043';
const EXPANDED_STATE =
  'M17.1425 1L24.9996 8.93044M24.9996 8.93044L17.1425 17M24.9996 8.93044L1 8.93044';

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
      width="27"
      height="18"
      viewBox="0 0 27 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        ref={pathRef}
        d="M9.14286 1L17 8.93043M17 8.93043L9.14286 17M17 8.93043L1 8.93043"
        stroke="#333233"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default AnimatedArrow;
