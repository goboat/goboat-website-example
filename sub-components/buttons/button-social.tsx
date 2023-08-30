import Image from 'next/image';
import Link from 'next/link';

import { SpacingValue } from '../../styles/Theme';
import { SocialButton, SocialButtonIcon } from './style';
import { ButtonAlign } from './button';

export enum SocialPlatforms {
  facebook = 'facebook',
  instagram = 'instagram',
  linkedin = 'linkedin',
}

const iconPaths = {
  facebook: '/icons/d06.svg',
  instagram: '/icons/d05.svg',
  linkedin: '/icons/d07.svg',
};

interface SocialButtonProps {
  align: ButtonAlign;
  marginTop: SpacingValue;
  marginBottom: SpacingValue;
  platform: SocialPlatforms;
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

const ButtonSocial = (props: SocialButtonProps) => {
  const { align, link, text, platform, marginTop, marginBottom, onClick, className } =
    props;

  const iconPath = iconPaths[platform];

  const buttonText = text ?? '';

  return (
    <Link href={link.url}>
      <a rel={link.rel} target={link.target}>
        <SocialButton
          align={align}
          marginTop={marginTop}
          marginBottom={marginBottom}
          onClick={onClick}
          className={className}
        >
          <SocialButtonIcon>
            <Image
              src={iconPath}
              layout="responsive"
              width="20px"
              height="20px"
              alt={`${platform} icon`}
            />
          </SocialButtonIcon>
          {buttonText}
        </SocialButton>
      </a>
    </Link>
  );
};

export default ButtonSocial;
