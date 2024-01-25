import styles from "./ManageTags.module.css";

import TagAction from "@/components/Common/TagAction/TagAction";
import useTag from "@/hooks/createTag/useTag";

export const ManageTags = () => {
  const { allUserTags } = useTag();

  return (
    <div className={styles.tags}>
      {allUserTags.map((tag) => (
        <TagAction key={tag.id} tag={tag} mode="edit" onAction={() => {}} />
      ))}
    </div>
  );
};
