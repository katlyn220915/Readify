import styles from "./CreateTagBtn.module.css";

const CreateTagBtn = ({
  onCreateTag,
  newTagText,
}: {
  onCreateTag: () => void;
  newTagText: string;
}) => {
  return (
    <p className={styles.btn_create_tag} onClick={() => onCreateTag()}>
      <span>Create tag</span>
      <span className={styles.new_tag}>{newTagText}</span>
    </p>
  );
};

export default CreateTagBtn;
