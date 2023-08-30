import { useEffect } from 'react';
import { StyledCookiePolicy } from './style';

declare global {
  interface Window {
    legal: any;
  }
}
interface OpenLiProps {
  agreementKey?: number;
}

const waitForLegal = (callback: () => void) => {
  if (window['legal']) {
    callback();
  } else {
    setTimeout(() => {
      waitForLegal(callback);
    }, 100);
  }
};

const OpenLi = (props: OpenLiProps) => {
  useEffect(() => {
    waitForLegal(() => {
      window.legal.document('#cookie-policy-container', props.agreementKey);
    });
  }, [props.agreementKey]);

  if (!props.agreementKey) {
    return (
      <div>
        Please enter openli agreement key in block options to render cookie policy
      </div>
    );
  }

  return <StyledCookiePolicy id="cookie-policy-container" />;
};

export default OpenLi;
