import { UnorderedList } from './style';
import FeaturedListDesktopEntry from './featured-list-desktop-entry';
import { Entry } from '../types';

interface FeaturedTipsListProps {
  tips: Entry[];
  current: Entry;
  onHover: (tip: Entry) => void;
  onLeave: () => void;
  style?: object;
}

const FeaturedListDesktopList = ({
  tips,
  current,
  onHover,
  onLeave,
  style,
}: FeaturedTipsListProps) => {
  return (
    <UnorderedList style={style}>
      {tips.map((tip) => (
        <FeaturedListDesktopEntry
          key={tip.key}
          tip={tip}
          current={current}
          onHover={onHover}
          onLeave={onLeave}
        />
      ))}
    </UnorderedList>
  );
};

export default FeaturedListDesktopList;
