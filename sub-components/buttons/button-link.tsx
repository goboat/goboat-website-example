import Link from 'next/link';

import { SpacingValue } from '../../styles/Theme';
import { LinkButton } from './style';
import { ButtonAlign } from './button';

interface LinkButtonProps {
  align: ButtonAlign;
  marginTop: SpacingValue;
  marginBottom: SpacingValue;
  link: {
    url: string;
    title?: string;
    rel?: string;
    target?: string;
  };
  text?: string;
  onClick?: () => void;
  className?: string;
}

const ButtonLink = (props: LinkButtonProps) => {
  const { align, link, text, marginTop, marginBottom, onClick, className } = props;

  const buttonText = text ?? '';

  return (
    <Link href={link.url}>
      <a rel={link.rel} target={link.target}>
        <LinkButton
          align={align}
          marginTop={marginTop}
          marginBottom={marginBottom}
          onClick={onClick}
          className={className}
          dangerouslySetInnerHTML={{ __html: buttonText }}
        />
      </a>
    </Link>
  );
};

export default ButtonLink;
