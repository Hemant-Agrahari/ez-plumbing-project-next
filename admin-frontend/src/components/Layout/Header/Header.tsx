import type { NextPage } from "next";
import styles from "./Header.module.css";

export type HeaderType = {
  className?: string;
};

const Header: NextPage<HeaderType> = ({ className = "" }) => {
  return (
    <header className={[styles.header, className].join(" ")}>
      <div className={styles.titleContainer}>
        <div className={styles.titleContainerChild} />
        <div className={styles.titleWrapper}>
          <a className={styles.blogs}>Blogs</a>
        </div>
        <div className={styles.search}>
          <img
            className={styles.groupIcon}
            loading="lazy"
            alt=""
            src="/group.svg"
          />
          <img
            className={styles.searchInputIcon}
            loading="lazy"
            alt=""
            src="/vector2.svg"
          />
          <div className={styles.filters}>
            <img
              className={styles.groupIcon1}
              loading="lazy"
              alt=""
              src="/group-1.svg"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
