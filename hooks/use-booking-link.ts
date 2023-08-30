import { useContext } from 'react';

import GeneralOptionsContext from '../lib/general-options-context';
import useLocale from './use-locale';

const useBookingLink = () => {
  const generalOptions = useContext(GeneralOptionsContext);
  const bookingHost = generalOptions?.bookingSystemUrl || 'https://booking.goboat.io';
  const country = generalOptions?.country;
  const location = generalOptions?.location;
  const locale = useLocale();

  let link = `${bookingHost}/booking`;

  const queryParams = [];

  if (country) queryParams.push(['country', country]);

  if (locale) queryParams.push(['lang', locale]);

  if (location?.shop_id) queryParams.push(['selected', location.shop_id]);

  // If query params, add them to the booking link
  if (queryParams.length > 0) {
    link = link + '?' + queryParams.map((param) => param.join('=')).join('&');
  }

  return link;
};

export default useBookingLink;
