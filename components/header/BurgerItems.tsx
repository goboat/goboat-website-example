import { Key } from 'react';
import { useRouter } from 'next/router';

import { locales } from '../../lib/config';
import LanguageSelect from './LanguageSelect';
import {
  DrawerLayout,
  SecondaryNav,
  SecondaryTitle,
  SecondaryWrapper,
  SubLink,
} from './style';

interface BurgerItemsProps {
  burgerItems: any;
  toggleBurgerMenuDisplay: () => void;
}

const BurgerItems = (props: BurgerItemsProps) => {
  const { burgerItems, toggleBurgerMenuDisplay } = props;

  const { asPath } = useRouter();

  const reorderLocaleWithinLink = (url: string) => {
    const isURLFromArticle = /^\/articles\//.test(url);

    if (locales?.length > 1 && isURLFromArticle) {
      const slug = url.replace(/^\//, '').split('/');
      const removedLocale = slug.splice(1, 1);
      slug.splice(0, 0, removedLocale[0]);
      return `/${slug.join('/')}`;
    }

    return url;
  };

  return (
    <DrawerLayout>
      {/* invisible language select to center the menu items */}
      <LanguageSelect mobile={false} disabled />

      <SecondaryWrapper>
        {burgerItems.map((item: { ID: Key; title: string; children: any[] }) => (
          <SecondaryNav key={item?.ID}>
            <SecondaryTitle>{item?.title}</SecondaryTitle>
            {item?.children.map((child: { url: string; ID: Key; title: string }) => (
              <SubLink
                href={reorderLocaleWithinLink(child.url)}
                isActive={asPath === reorderLocaleWithinLink(child.url)}
                onClick={() => toggleBurgerMenuDisplay()}
                key={child?.ID}
              >
                {child?.title}
              </SubLink>
            ))}
          </SecondaryNav>
        ))}
      </SecondaryWrapper>

      <LanguageSelect
        mobile={false}
        toggleBurgerMenuDisplay={() => toggleBurgerMenuDisplay()}
      />
    </DrawerLayout>
  );
};

export default BurgerItems;
