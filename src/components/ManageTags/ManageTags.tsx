import React from "react";
import styles from "./ManageTags.module.css";
import useTag from "@/hooks/createTag/useTag";
import TagAction from "../TagAction/TagAction";

export default function ManageTags() {
  const { allUserTags } = useTag();

  return (
    <div
      className={styles.manageTags_field}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={styles.tags}>
        {allUserTags.map((tag) => (
          <TagAction key={tag.id} tag={tag} mode="edit" onAction={() => {}} />
        ))}
      </div>
    </div>
  );
}
