import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { ListItem } from '../../../sub-components/Text';
import AnimatedArrow from './AnimatedArrow';
import { Entry } from '../types';

interface EntryProps {
  tip: Entry;
  current: Entry;
  onHover: (tip: Entry) => void;
  onLeave: () => void;
}

const FeaturedListDesktopEntry = ({ tip, current, onHover, onLeave }: EntryProps) => {
  const listItemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const listItem = listItemRef.current;

    if (listItem) {
      listItem.addEventListener('mouseenter', () => onHover(tip));
      listItem.addEventListener('mouseleave', () => onLeave());

      return () => {
        listItem.removeEventListener('mouseenter', () => onHover(tip));
        listItem.removeEventListener('mouseleave', () => onLeave());
      };
    }
  }, [tip, onHover, onLeave]);

  return (
    <Link href={tip.content.adjusted_permalink || tip.key}>
      <a>
        <ListItem
          key={tip.key}
          style={{ marginBottom: '8px', cursor: 'pointer' }}
          ref={listItemRef}
        >
          <AnimatedArrow
            isExpanded={tip.key === current.key}
            style={{ marginRight: '10.67px', verticalAlign: 'middle' }}
          />
          {tip.content.post_title}
        </ListItem>
      </a>
    </Link>
  );
};

export default FeaturedListDesktopEntry;
