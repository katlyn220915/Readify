import styles from "./MoreActionList.module.css";

/* Custom_hook */
import { useAppSelector } from "@/hooks/redux/hooks";

export default function MoreActionList() {
  return (
    <ul className={styles.more_action}>
      <li>Delete this book</li>
    </ul>
  );
}
