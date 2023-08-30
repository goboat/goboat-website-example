import { useMemo } from 'react';
import { useTheme } from 'styled-components';

import useStore from './use-store';

// We shoudl maybe delete the unused options as only 'isMobile' is in use
/* const useBreakpoint = () => {
  const viewport = useStore((state) => state.viewport);

  const mobile = viewport.width < breakpoints.tablet;
  const tablet = viewport.width >= breakpoints.tablet && viewport.width < breakpoints.desktop;
  const desktop = viewport.width >= breakpoints.desktop && viewport.width < breakpoints.desktopLarge;
  const desktopLarge = viewport.width >= breakpoints.desktopLarge;
  const extendedGrid = viewport.width >= breakpoints.extendedGrid;

  // Memoize to prevent unnecessary updates
  const isMobile = useMemo(() => mobile, [mobile]);
  const isTablet = useMemo(() => tablet, [tablet]);
  const isDesktop = useMemo(() => desktop, [desktop]);
  const isDesktopLarge = useMemo(() => desktopLarge, [desktopLarge]);
  const isExtendedGrid = useMemo(() => extendedGrid, [extendedGrid]);

  return { isMobile, isTablet, isDesktop, isDesktopLarge, isExtendedGrid };
}; */

const useBreakpoint = () => {
  const viewport = useStore((state) => state.viewport);
  const theme = useTheme();

  const mobile = viewport.width < theme.breakpoints.tablet;

  // Memoize to prevent unnecessary updates
  const isMobile = useMemo(() => mobile, [mobile]);

  return { isMobile };
};

export default useBreakpoint;
