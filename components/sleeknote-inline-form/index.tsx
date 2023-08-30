import React from 'react';

interface SleeknoteInlineFormProps {
  campaignId: string;
}

/**
 * Sleeknote integration is very simple
 * Sleeknote script needs to be loaded via GTM
 * Then campaign ID referenced on an empty div
 * And the script will do the rest
 */
const SleeknoteInlineForm = (props: SleeknoteInlineFormProps) => {
  const { campaignId } = props;

  if (!campaignId) {
    console.warn('Campaign ID missing for Sleeknote Inline Form');
    return null;
  }

  return <div id={campaignId} />;
};

export default SleeknoteInlineForm;
