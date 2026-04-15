import type { NextPage } from "next";
import styles from "./DashboardStats.module.css";

export type GroupComponentType = {
  className?: string;
  icon?: string;
  prop?: string;
  text?: string;
};

const DashboardStats: NextPage<GroupComponentType> = ({
  className = "",
  icon,
  prop,
  text,
}) => {
  return (
    <div className={[styles.rectangleParents, className].join(" ")}>
      {/* <div className={styles.frameChilds} /> */}
      <div className={styles.frameWrappers}>
        <img
          className={styles.frameItems}
          loading="lazy"
          alt=""
          src={icon}
        />
      </div>
      <div className={styles.frameParents}>
        <div className={styles.parents}>
          <div className={styles.divs}>{prop}</div>
          <div className={styles.superscriptWrappers}>
            <h3 className={styles.superscripts}>+</h3>
          </div>
        </div>
        <div className={styles.franchise}>{text}</div>
      </div>
    </div>
  );
};

export default DashboardStats;
