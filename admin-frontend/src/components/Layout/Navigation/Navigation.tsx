"use client"
import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";
import styles from "./Navigation.module.scss";
import { usePathname, useRouter } from "next/navigation";
import { removeAllCookies, removeTokenCookie } from "@/helper/auth";
import Link from "next/link";

export type NavigationType = {
  className?: string;
  profile?: string;
  user01?: string;
  bell01?: string;

  /** Style props */
  propAlignSelf?: CSSProperties["alignSelf"];
  propPosition?: CSSProperties["position"];
  propWidth?: CSSProperties["width"];
  propTop?: CSSProperties["top"];
};

const Navigation: NextPage<NavigationType> = ({
  className = "",
  profile,
  user01,
  bell01,
  propAlignSelf,
  propPosition,
  propWidth,
  propTop,
}) => {
  const navigationStyle: CSSProperties = useMemo(() => {
    return {
      alignSelf: propAlignSelf,
      position: propPosition,
      width: propWidth,
      top: propTop,
    };
  }, [propAlignSelf, propPosition, propWidth, propTop]);
  const pathname = usePathname();
  const router = useRouter(); // Access the Next.js router instance

  const handleLogout = () => {
    removeAllCookies(); // Remove the authentication token
    router.push("/login"); // Redirect to the login page
  };
  return (
    <header className={styles.sidebar}>
      <div
        className={[styles.navigation, className].join(" ")}
        style={navigationStyle}
      >
        <div className={styles.profilePicture} />
        <div className={styles.profileLabel}>
          <a className={styles.profile}>{profile}</a>
        </div>
        <div className={styles.userActions}>
          <div className={styles.iconsParent}>
            <div className={styles.icons} />
            <Link href="/admin-profile">
              <img
                className={styles.user01Icon}
                loading="lazy"
                alt=""
                src={user01}
              />
            </Link>
          </div>
          <div className={styles.rectangleParent}>
            <div className={styles.frameChild} />
            <Link href="/notification">
              <img
                className={styles.bell01Icon}
                loading="lazy"
                alt=""
                src={bell01}
              />
            </Link>
          </div>
          <div className={styles.rectangleGroup}>
            <div className={styles.frameItem} />
            <img className={styles.logOut01Icon} onClick={() => handleLogout()} alt="" src="/images/logout01-1.svg" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
