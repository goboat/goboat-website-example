import styled from 'styled-components';

import { ListItem, listItemCss } from '../../sub-components/Text';

const UnorderedList = styled.ul`
  margin: 0;
`;

const OrderedList = styled.ol`
  margin: 0;
`;

const Wrapper = styled.div`
  ${listItemCss}
`;

const getListComponent = (tag: string) => {
  switch (tag) {
    case 'ul':
      return UnorderedList;
    case 'ol':
      return OrderedList;
    default:
      return UnorderedList;
  }
};

const List = (props: any) => {
  const { children, className, tag } = props;
  const ListComponent = getListComponent(tag);

  if (props.html) {
    try {
      return <Wrapper dangerouslySetInnerHTML={{ __html: props.html }} />;
    } catch (error) {
      console.error(error);
      return null;
    }
  } else if (Array.isArray(props.children)) {
    return (
      <ListComponent className={className}>
        {children.map((listItem: any) => (
          <ListItem key={listItem}>{listItem}</ListItem>
        ))}
      </ListComponent>
    );
  }
  return null;
};

export default List;
