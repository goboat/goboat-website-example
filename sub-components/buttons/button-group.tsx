import Button, { ButtonProps } from './button';
import { ButtonGroupContainer } from './style';

export enum ButtonGroupAlignment {
  left = 'start',
  center = 'center',
  right = 'end',
}

interface ButtonGroupProps {
  buttonGroupBlocks: ButtonProps[];
  align: ButtonGroupAlignment;
}

const ButtonGroup = (props: ButtonGroupProps) => {
  const { buttonGroupBlocks, align } = props;

  const buttons =
    buttonGroupBlocks.length > 0
      ? buttonGroupBlocks.map((b, index) => {
          return (
            <Button
              key={index}
              visualType={b.visualType}
              size={b.size}
              marginTop={b.marginTop}
              marginBottom={b.marginBottom}
              text={b.text}
              link={b.link}
              className={b.className}
            />
          );
        })
      : null;

  return <ButtonGroupContainer align={align}>{buttons}</ButtonGroupContainer>;
};

export default ButtonGroup;
