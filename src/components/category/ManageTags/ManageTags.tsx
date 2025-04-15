import TagAction from "@/components/common/TagAction/TagAction";
import useTag from "@/hooks/createTag/useTag";

import styles from "./ManageTags.module.css";

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
