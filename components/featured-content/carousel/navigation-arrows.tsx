import Image from 'next/image';
import { ArrowContainer, ArrowIcon } from './style';

interface NavigationArrowsProps {
  onNext: () => void;
  onPrev: () => void;
  arrowWidth: number;
  arrowHeight: number;
  platform: string;
}

const NavigationArrows = (props: NavigationArrowsProps) => {
  const { onNext, onPrev, arrowWidth, arrowHeight, platform } = props;

  return (
    <ArrowContainer platform={platform}>
      <ArrowIcon onClick={onPrev}>
        <Image src="/d13.svg" width={arrowWidth} height={arrowHeight} alt="Arrow left" />
      </ArrowIcon>
      <ArrowIcon onClick={onNext}>
        <Image src="/d12.svg" width={arrowWidth} height={arrowHeight} alt="Arrow right" />
      </ArrowIcon>
    </ArrowContainer>
  );
};

export default NavigationArrows;
