import { Heading1, Heading2, Heading3 } from '../sub-components/Text';

const getHeadingComponent = (tag: string) => {
  switch (tag) {
    case 'h1':
      return Heading1;
    case 'h2':
      return Heading2;
    case 'h3':
      return Heading3;
    default:
      return Heading1;
  }
};

const Heading = (props: any) => {
  const HeadingComponent = getHeadingComponent(props.tag);

  // use dangerouslySetInnterHTML instead of children
  // so we can support bold, italic, links etc
  const headingProps = {
    ...props,
    dangerouslySetInnerHTML: { __html: String(props.children).trim() },
  };

  delete headingProps.children;

  return <HeadingComponent {...headingProps} />;
};

export default Heading;
