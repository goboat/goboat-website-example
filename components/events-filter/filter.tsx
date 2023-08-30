import React from 'react';
import useLocalize from '../../hooks/use-localize';
import { Localization } from '../../lib/localizations';
import { FilterWrapper, Input, Label } from './style';

interface EventsFilterProp {
  filter: 'all' | 'upcoming';
  setFilter: React.Dispatch<React.SetStateAction<'all' | 'upcoming'>>;
  loading: boolean;
  className?: string;
}

const EventsFilter = (props: EventsFilterProp) => {
  const localize = useLocalize();
  return (
    <FilterWrapper className={props.className}>
      <div>
        <Input
          type="radio"
          id="upcoming"
          name="filter"
          value="Upcoming"
          onChange={() => props.setFilter('upcoming')}
          checked={props.filter === 'upcoming'}
          disabled={props.loading}
        />
        <Label htmlFor="upcoming">{localize(Localization.eventsUpcoming)}</Label>
      </div>
      <div>
        <Input
          type="radio"
          id="all"
          name="filter"
          value="allEvents"
          onChange={() => props.setFilter('all')}
          checked={props.filter === 'all'}
          disabled={props.loading}
        />
        <Label htmlFor="all">{localize(Localization.eventsAll)}</Label>
      </div>
    </FilterWrapper>
  );
};

export default EventsFilter;
