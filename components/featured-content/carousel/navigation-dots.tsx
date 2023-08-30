import { NavigationDot, NavigationDotsContainer } from './style';

interface NavigationDotsProps {
  total: number;
  selectedSlide: number;
}

const NavigationDots = ({ total, selectedSlide }: NavigationDotsProps) => {
  const dots = [...Array(total)];

  return (
    <NavigationDotsContainer>
      {dots.map((v, i) => (
        <NavigationDot key={i} isSelected={i === selectedSlide} />
      ))}
    </NavigationDotsContainer>
  );
};

export default NavigationDots;
