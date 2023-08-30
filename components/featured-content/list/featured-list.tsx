import FeaturedListDesktop from './featured-list-desktop';
import FeaturedListMobile from './featured-list-mobile';
import OnlyMobile from '../../only-mobile';
import OnlyDesktop from '../../only-desktop';
import { FeaturedContentProps } from '../types';

const FeaturedList = (props: FeaturedContentProps) => {
  return (
    <>
      <OnlyMobile>
        <FeaturedListMobile {...props} />;
      </OnlyMobile>

      <OnlyDesktop>
        <FeaturedListDesktop {...props} />;
      </OnlyDesktop>
    </>
  );
};

export default FeaturedList;
