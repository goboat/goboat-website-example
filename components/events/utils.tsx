export const formatDate = (date: string) => {
  const formatToGlobal = date?.split('/').reverse().join('-');
  const event = new Date(formatToGlobal);
  return event.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
};

export const truncateDescription = (text: string) => {
  if (text?.length > 245) {
    return text?.substring(0, 245) + '…';
  }
  return text;
};

interface FilterType {
  'date.day': {
    $gte: string;
  };
  'location.city': string;
}

export const getFilter = (filterString: 'all' | 'upcoming', selectedCities: string[]) => {
  const filter: Partial<FilterType> = {};
  let date = new Date();
  // if filter string is all, still only go back 1 year in order to avoid confusion about
  // which year an event took place
  if (filterString === 'all') {
    date.setFullYear(date.getFullYear() - 1);
  }
  filter['date.day'] = {
    $gte: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
      date.getDate()
    ).padStart(2, '0')}`,
  };

  if (selectedCities.length) {
    filter['location.city'] = selectedCities[0];
  }

  return filter;
};
