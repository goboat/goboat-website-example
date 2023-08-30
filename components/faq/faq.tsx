import { FaqItem, FaqItemProps } from './faq-item';
import { GridOptionValue, RenderedSectionProps } from '../section/types';
import { SpacingValue } from '../../styles/Theme';
import Column from '../section/column';
import { FaqSection, FaqSectionHeading } from './style';

export type FaqProps = {
  questions: FaqItemProps[];
  heading: string;
  hash: string;
};

const sectionProps: RenderedSectionProps = {
  template: [{ width: 3 }, { width: 9 }],
  marginBottom: SpacingValue.none,
  marginTop: SpacingValue.none,
  paddingBottom: SpacingValue.none,
  paddingTop: SpacingValue.none,
  gridOptions: {
    left: GridOptionValue.normal,
    right: GridOptionValue.normal,
  },
};

const Faq = (props: FaqProps) => {
  return (
    <FaqSection {...sectionProps}>
      <Column>
        <FaqSectionHeading margin={SpacingValue.medium}>
          {props.heading}
        </FaqSectionHeading>
      </Column>

      <Column>
        {props.questions.map((item, i) => (
          <FaqItem {...item} key={item.id} />
        ))}
      </Column>
    </FaqSection>
  );
};

export default Faq;
