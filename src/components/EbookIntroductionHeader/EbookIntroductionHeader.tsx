import styles from "./EbookIntroductionHeader.module.css";
import { useAppSelector } from "@/hooks/redux/hooks";

const EbookIntroductionHeader = () => {
  const { currentBook } = useAppSelector((state) => state.read);
  return (
    <div className={styles.book_intro}>
      <h2 className={styles.book_intro_title}>{currentBook?.title}</h2>
      <p className={styles.book_intro_autor}>{currentBook?.author}</p>
    </div>
  );
};

export default EbookIntroductionHeader;
