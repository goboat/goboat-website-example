import React, { useEffect } from 'react';

interface ActiveCampaignFormProps {
  attrs: {
    formId: string;
  };
}

const ActiveCampaignForm = (props: ActiveCampaignFormProps) => {
  const { formId } = props.attrs;

  useEffect(() => {
    const script = document.createElement('script');

    script.src = `https://goboat.activehosted.com/f/embed.php?id=${formId}`;
    script.async = true;

    document.body.appendChild(script);
  }, []);

  return <div className={`_form_${props.attrs.formId}`} />;
};

export default ActiveCampaignForm;
