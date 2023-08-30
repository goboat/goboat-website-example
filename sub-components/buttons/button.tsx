import Link from 'next/link';

import { SpacingValue } from '../../styles/Theme';
import { PrimaryButton, SecondaryButton } from './style';

export enum ButtonType {
  primary = 'primary',
  secondary = 'secondary',
}

export enum ButtonSize {
  full = 'full',
  large = 'large',
  medium = 'medium',
  small = 'small',
  extraSmall = 'extraSmall',
  link = 'link',
}

export enum ButtonAlign {
  left = 'left',
  center = 'center',
  right = 'right',
}

export interface ButtonProps {
  visualType?: ButtonType;
  size?: ButtonSize;
  align?: ButtonAlign;
  marginTop?: SpacingValue;
  marginBottom?: SpacingValue;
  text?: string;
  link?: {
    url: string;
    title?: string;
    rel?: string;
    target?: string;
  };
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: string;
  disabled?: boolean;
  htmlType?: string;
}

const Button = (props: ButtonProps) => {
  const {
    visualType = ButtonType.primary,
    size = ButtonSize.large,
    align = ButtonAlign.left,
    marginTop = SpacingValue.small,
    marginBottom = SpacingValue.small,
    text,
    link,
    className,
    htmlType = 'button',
    ...rest
  } = props;

  const buttonText = text ?? '';

  const Button = visualType === ButtonType.secondary ? SecondaryButton : PrimaryButton;

  const onClick = () => {
    if (props.disabled) {
      return null;
    }
    if (props.onClick) {
      return props.onClick();
    }
  };

  if (link?.url) {
    // sometimes we have problems with links containing &amp; or u0026amp; instead of just &
    const url = String(link.url)
      .replace(/&amp;/g, '&')
      .replace(/u0026amp;/g, '&');
    return (
      <Link href={url}>
        <a rel={link.rel} target={link.target}>
          <Button
            size={size}
            align={align}
            marginTop={marginTop}
            marginBottom={marginBottom}
            onClick={onClick}
            className={className}
            dangerouslySetInnerHTML={{ __html: buttonText }}
            {...rest}
          />
        </a>
      </Link>
    );
  }

  return (
    <Button
      size={size}
      align={align}
      marginTop={marginTop}
      marginBottom={marginBottom}
      onClick={onClick}
      className={className}
      dangerouslySetInnerHTML={{ __html: buttonText }}
      {...rest}
    />
  );
};

export default Button;
