interface SleeknoteProps {
  formId: string | undefined;
}

const SleeknoteForm = (props: SleeknoteProps) => {
  const { formId } = props;

  if (!formId) return null;

  return <div id={formId}></div>;
};

export default SleeknoteForm;
