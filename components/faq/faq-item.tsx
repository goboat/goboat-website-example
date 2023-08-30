import { useContext, useEffect, useRef, useState } from 'react';
import { SpacingValue } from '../../styles/Theme';
import { Text, TextColor } from '../../sub-components/Text';
import { FaqContext } from '../faq-collection/context';
import ArrowIcon from '../icons/faq-arrow';
import {
  FaqItemWrapper,
  FaqQuestion,
  FaqArrow,
  FaqHeading,
  FaqAnswer,
  ANSWER_TRANSITION_HEIGHT,
  VisibilityIcon,
} from './style';

export type FaqItemProps = {
  answer: string;
  question: string;
  id: string;
};

// a little magic as we are in fact searching in html and can get hits from tags
// ie br can match <br/>
// will not cover every case but should be good enough
function getFaqSearchRegExp(searchString: string) {
  const regex = new RegExp(`([^<]|^)(${searchString})`, 'ig');

  return regex;
}

function highlight(answer: string, searchString?: string) {
  if (!searchString) return answer;

  const regex = getFaqSearchRegExp(searchString);

  const highlighted = answer.replace(regex, (_, ...rest) => {
    return `${rest[0]}<span class="highlight-match">${rest[1]}</span>`;
  });

  return highlighted;
}

export const FaqItem = (props: FaqItemProps) => {
  const { answer, question, id } = props;

  const [isActive, setIsActive] = useState(false);

  const { searchString } = useContext(FaqContext);

  useEffect(() => {
    if (searchString) {
      const regex = getFaqSearchRegExp(searchString);

      const isMatch = regex.test(answer);
      if (isMatch && !isActive) {
        setIsActive(true);
      } else if (!isMatch && isActive) {
        answerRef.current?.classList.remove('answer-open');
        setTimeout(() => {
          setIsActive(false);
        }, 0);
      }
    } else {
      answerRef.current?.classList.remove('answer-open');
      setTimeout(() => {
        setIsActive(false);
      }, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchString]);

  const answerRef = useRef<HTMLDivElement>(null);

  // open scroll into view if using anchor link
  useEffect(() => {
    if (window.location.hash.slice(1) === props.id) {
      setTimeout(() => {
        setIsActive(true);
        answerRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onQuestionClick = () => {
    answerRef.current?.classList.remove('answer-open');
    // set timeout so we wait for class to be removed, needed for animation
    setTimeout(() => {
      setIsActive(!isActive);
    }, 0);
  };

  const answerProps = {
    onTransitionEnd: () => {
      if (answerRef.current) {
        const { maxHeight } = getComputedStyle(answerRef.current);
        if (maxHeight === `${ANSWER_TRANSITION_HEIGHT}px`) {
          answerRef.current.classList.add('answer-open');
        }
      }
    },
    ref: answerRef,
  };

  const open = isActive;

  return (
    <FaqItemWrapper open={open} key={id} id={id}>
      <FaqQuestion onClick={onQuestionClick}>
        <FaqArrow>
          <ArrowIcon />
        </FaqArrow>

        <FaqHeading open={open}>{question}</FaqHeading>
        <VisibilityIcon open={open} />
      </FaqQuestion>

      <FaqAnswer {...answerProps}>
        <Text
          dangerouslySetInnerHTML={{ __html: highlight(answer, searchString) }}
          margin={SpacingValue.small}
          color={TextColor.secondary}
        />
      </FaqAnswer>
    </FaqItemWrapper>
  );
};
