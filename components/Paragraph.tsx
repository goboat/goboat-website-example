import { Text, SmallText } from '../sub-components/Text';

const getParagraphComponent = (fontSize: string) => {
  switch (fontSize) {
    case 'large':
      return Text;
    case 'normal':
      return Text;
    case 'small':
      return SmallText;
    default:
      return Text;
  }
};

const Paragraph = (props: any) => {
  const ParagraphComponent = getParagraphComponent(props.fontSize);

  // use dangerouslySetInnterHTML instead of children
  // so we can support bold, italic, links etc
  const paragraphProps = {
    ...props,
    dangerouslySetInnerHTML: { __html: props.children },
  };

  delete paragraphProps.children;

  return <ParagraphComponent {...paragraphProps} />;
};

export default Paragraph;
