import { useEffect, useRef, useState } from 'react';
import { StyledBookLink } from './style';
import Link from 'next/link';
import { SmallText } from '../../sub-components/Text';
import { SpacingValue } from '../../styles/Theme';
import OnlyMobile from '../only-mobile';
import Image from 'next/image';
import OnlyDesktop from '../only-desktop';
import AnimatedArrow from './AnimatedArrow';

interface BookLinkProps {
  bookingLink: string;
  buttonText: string;
  arrowSize: number;
  gap: number;
}

const BookLink = (props: BookLinkProps) => {
  const { bookingLink, buttonText, arrowSize, gap } = props;

  const [linkHover, setLinkHover] = useState(false);
  const linkRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const link = linkRef.current;

    if (link) {
      link.addEventListener('mouseenter', () => setLinkHover(true));
      link.addEventListener('mouseleave', () => setLinkHover(false));

      return () => {
        link.removeEventListener('mouseenter', () => setLinkHover(true));
        link.removeEventListener('mouseleave', () => setLinkHover(false));
      };
    }
  }, []);

  return (
    <StyledBookLink>
      <Link href={bookingLink}>
        <a>
          <span style={{ display: 'flex', alignItems: 'center' }} ref={linkRef}>
            <SmallText
              bold
              margin={SpacingValue.none}
              style={{ lineHeight: 1.3, marginRight: `${gap}px` }}
            >
              {buttonText}
            </SmallText>

            <OnlyMobile>
              <Image
                src="/d15.svg"
                width={arrowSize}
                height={arrowSize}
                alt="Arrow right"
              />
            </OnlyMobile>

            <OnlyDesktop>
              <AnimatedArrow isExpanded={linkHover} style={{ verticalAlign: 'middle' }} />
            </OnlyDesktop>
          </span>
        </a>
      </Link>
    </StyledBookLink>
  );
};

export default BookLink;
