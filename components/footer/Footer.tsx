import Image from 'next/image';

import useLocale from '../../hooks/use-locale';
import { Link } from '../../sub-components/Text';
import useFrontPageLink from '../../hooks/use-front-page-link';
import {
  Container,
  TopLayer,
  FooterList,
  GroupTitle,
  StyledFooterLink,
  BottomWrapper,
  Cookies,
  Copyright,
  SocialsList,
} from './style';
import { useContext } from 'react';
import GeneralOptionsContext from '../../lib/general-options-context';
import { useTheme } from 'styled-components';

interface Socials {
  name: string;
  link: {
    url: string;
    title: string;
  };
}

const FooterLink = ({ children, link, target, className }: any) => {
  return (
    <li className={className}>
      <StyledFooterLink href={link} target={target}>
        {children}
      </StyledFooterLink>
    </li>
  );
};

const SocialMedia = ({ socials }: any) => {
  const theme = useTheme();

  const socialPlatforms = (socialName: string) => {
    if (theme.name === 'GOBOAT_EXCLUSIVE') {
      switch (socialName) {
        case 'linkedin':
          return '/icons/d07-c.svg';
        case 'instagram':
          return '/icons/d05-c.svg';
        case 'facebook':
          return '/icons/d06-c.svg';
        default:
          '';
      }
    }

    switch (socialName) {
      case 'linkedin':
        return '/icons/d07.svg';
      case 'instagram':
        return '/icons/d05.svg';
      case 'facebook':
        return '/icons/d06.svg';
      default:
        '';
    }
  };

  const icons = Array.isArray(socials)
    ? socials.map((social: Socials) => {
        const socialPath = socialPlatforms(social?.name);
        if (socialPath) {
          return (
            <li key={social?.link?.url}>
              <Link href={social?.link?.url}>
                <Image
                  src={socialPath}
                  alt={social?.link?.title}
                  width={24}
                  height={24}
                />
              </Link>
            </li>
          );
        }
      })
    : null;

  return <SocialsList>{icons}</SocialsList>;
};

const BottomLayer = ({ socials }: any) => {
  const activeLocale = useLocale();
  const { frontPageLink } = useFrontPageLink();
  const { translations } = useContext(GeneralOptionsContext);
  const theme = useTheme();

  const cookieText =
    translations?.footer_cookie_link_text?.[activeLocale] ?? 'Cookie settings';
  const copyrightText =
    translations?.footer_copyright_text?.[activeLocale] ?? 'All rights reserved';

  const logo =
    theme.name === 'GOBOAT_EXCLUSIVE' ? '/gb-connect-white.png' : '/logo-menu-clean.svg';

  return (
    <BottomWrapper>
      <SocialMedia socials={socials} />
      <Link href={frontPageLink} style={{ justifySelf: 'end' }}>
        <Image
          src={logo}
          alt="GoBoat Logo"
          width={theme.name === 'GOBOAT_EXCLUSIVE' ? 130 : 130}
          height={theme.name === 'GOBOAT_EXCLUSIVE' ? 45 : 32}
        />
      </Link>
      <Cookies data-legalmonster="show-cookie-settings">{cookieText}</Cookies>
      <Copyright>{`Copyright © ${new Date().getFullYear()} GoBoat. ${copyrightText}`}</Copyright>
    </BottomWrapper>
  );
};

const Footer = ({ footer, socials }: any) => {
  const locale = useLocale();
  const lists = footer?.[`text_links_${locale}`] || [];

  return (
    <Container>
      <TopLayer>
        {lists?.map((list: any, index: string) => (
          <FooterList key={index}>
            <GroupTitle>{list?.category}</GroupTitle>
            {Array.isArray(list?.links)
              ? list.links.map((item: any) => (
                  <FooterLink
                    key={item?.link?.url}
                    link={item?.link?.url}
                    target={item?.link?.target || null}
                  >
                    {item?.link?.title}
                  </FooterLink>
                ))
              : null}
          </FooterList>
        ))}
      </TopLayer>
      <BottomLayer socials={socials} />
    </Container>
  );
};

export default Footer;
