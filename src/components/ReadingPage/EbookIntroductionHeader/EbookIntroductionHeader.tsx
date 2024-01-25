import styles from "./EbookIntroductionHeader.module.css";
import TagAction from "@/components/Common/TagAction/TagAction";
import { useAppSelector } from "@/hooks/redux/hooks";

const EbookIntroductionHeader = () => {
  const { currentBook } = useAppSelector((state) => state.read);
  return (
    <div className={styles.book_intro}>
      <h2 className={styles.book_intro_title}>{currentBook?.title}</h2>
      <div className={styles.book_intro_bottom}>
        <span className={styles.book_intro_author}>{currentBook?.author}</span>
        <span className={styles.book_intro_tags}>
          {currentBook?.tags.map((tag) => (
            <TagAction
              key={tag.id}
              onAction={() => {}}
              tag={tag}
              mode="search"
            />
          ))}
        </span>
      </div>
    </div>
  );
};

export default EbookIntroductionHeader;
