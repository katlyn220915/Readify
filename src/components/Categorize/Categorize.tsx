import React from "react";
import styles from "./Categorize.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faArchive,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";

export default function Categorize({
  isMouseEnter,
}: {
  isMouseEnter: boolean;
}) {
  return (
    <>
      {isMouseEnter && (
        <div className={styles.categorize_container}>
          <button className={styles.btn_add_tag}>
            <FontAwesomeIcon icon={faEllipsis} className="icon" />
          </button>
          <div className={styles.categorize_box}>
            <button>
              <FontAwesomeIcon icon={faBookOpen} className="icon" />
            </button>
            <button>
              <FontAwesomeIcon icon={faClock} className="icon" />
            </button>
            <button>
              <FontAwesomeIcon icon={faArchive} className="icon" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
