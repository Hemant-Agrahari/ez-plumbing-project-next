"use client"
import Navigation from "@/components/Layout/Navigation/Navigation";
import styles from "./page.module.scss";
import GroupComponent from "@/components/CommonComponents/DashboardStats";
export default function Home() {
  
  return (
    <>
      <Navigation
        profile="Dashboard"
        user01="/images/user01.svg"
        bell01="/images/bell01.svg" />
      <div className="main">
        <div className={styles.frameParents}>

          <GroupComponent
            icon="/images/group-1000001315.svg"
            prop="20"
            text="Blogs"
          />
          <GroupComponent
            icon="/images/group-1000001320.svg"
            prop="5"
            text="Jobs Opened"
          />
          <GroupComponent
            icon="/images/group-1000001321.svg"
            prop="20"
            text="Franchise"
          />
          <GroupComponent
            icon="/images/group-1000001322.svg"
            prop="100"
            text="Resume Written"
          />
        </div>
      </div>
    </>
  );
}
