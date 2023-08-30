import { locales } from '../lib/config';
import page from './page';
import article from './article';
import event from './event/event';
import waiverPage from './waiver';

export default function getRoute(slug: string = '') {
  // if multilingual, articles page is at /da/articles/my-article
  // otherwise, just /articles/my-article
  const articleRegexp = new RegExp(
    `${locales.length > 1 ? `/(${locales.join('|')})` : ''}/articles/([^/]+/?$)`
  );
  const eventRegexp = new RegExp(
    `${locales.length > 1 ? `/(${locales.join('|')})` : ''}/events/([^/]+/?$)`
  );
  const waiverRegexp = new RegExp(
    `${locales.length > 1 ? `/(${locales.join('|')})` : ''}/waivers/([^/]+/?$)`
  );

  if (articleRegexp.test(slug)) {
    return article;
  } else if (eventRegexp.test(slug)) {
    return event;
  } else if (waiverRegexp.test(slug)) {
    return waiverPage;
  } else {
    return page;
  }
}

export const pages = {
  page,
  article,
  event,
  waiverPage,
};
