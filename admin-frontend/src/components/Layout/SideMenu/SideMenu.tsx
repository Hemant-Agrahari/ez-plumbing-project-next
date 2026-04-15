"use client";

import type { NextPage } from "next";
import { useEffect } from "react";
import styles from "./SideMenu.module.css";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getTokenCookie, removeAllCookies } from "@/helper/auth";
import Button from "@/components/UI/Button";
import { useAppSelector, useAppDispatch } from "@/lib/hooks/hooks";
import { fetchPages } from "@/lib/features/pagesSlice/pagesSlice";
import { MenuList } from "@/utils/sidebar/menuList";

export type SideMenuType = {
  className?: string;
};

const SideMenu: NextPage<SideMenuType> = ({ className = "" }) => {
  const pathname = usePathname();
  const role = getTokenCookie('role'); // Retrieve role from cookie
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { pages, status } = useAppSelector((state) => state.pages);
  const permissions = useAppSelector((state) => state.permissions.permissions);
  // console.log(permissions);

  const handleLogout = () => {
    removeAllCookies();
    router.push("/login");
  };

  const combinedMenuItems = [
    ...MenuList.map((item: any) => ({
      ...item,
    })),
    ...pages.map((page: any) => ({
      name: page.title,
      link: `/${page.slug}`,
      icon: "/images/seo-management-icon.svg",
    })),

  ];
  // const filteredMenuItems = combinedMenuItems
  //   .filter((item) => {
  //     if (role === 'admin') return true;
  //     if (item.name === "Sub-admin Management") return false;
  //     const slug = item.link.startsWith('/') ? item.link.substring(1) : item.link;
  //     const permission = permissions.find((perm) => perm.moduleSlug === slug);
  //     return permission ? permission.moduleValue : false;
  //   });
  const canAddPages = permissions?.some(
    (perm) => perm.moduleSlug === 'pages-management' && perm.add
  );
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPages());
    }
  }, [status, dispatch]);
  return (
    <div className={[styles.rectangleParent, className].join(" ")}>
      <div className={styles.frameChild} />
      <img
        className={styles.frameItem}
        loading="lazy"
        alt=""
        src="/images/ais-cms-side-logo.png"
        width="127"
        height="54"
      />
      <div className={[styles.management, className].join(" ")}>
        <Link
          href="/"
          className={`${pathname === '/' ? styles.actions : styles.actions1}`}
        >
          <img
            className={styles.ucreateDashboardIcon}
            alt=""
            src="/images/ucreatedashboard.svg"
          />
          <div className={styles.dashboard}>Dashboard</div>
        </Link>

        {/* service static page */}




        {combinedMenuItems.map((item, index) => (
          <Link
            href={item.link}
            className={`${pathname === item.link ? styles.actions : styles.actions1
              }`}
            key={index}
          >
            <img
              className={styles.ucreateDashboardIcon}
              alt=""
              src={item.icon}
            />
            <div className={styles.dashboard}>{item.name}</div>
          </Link>
        ))}
      </div>
      <div className={[styles.logout, className].join(" ")}>
        {/* {canAddPages && (
          <>
            <button className={styles.buttons}>
              <div className={styles.logoutIcon}>
                <img className={styles.plusIcon} alt="" src="/images/plus.svg" />
              </div>
              <div className={styles.addPages}>
                <Button
                  className={styles.addPages}
                  text="Add Pages"
                  link="/add-page"
                />
              </div>
            </button>
            <div className={styles.divider} />
          </>
        )} */}
        <button className={styles.buttons1} onClick={() => handleLogout()}>
          <div className={styles.logOut01Wrapper}>
            <img
              className={styles.logOut01Icon}
              alt=""
              src="/images/logout01.svg"
            />
          </div>
          <div>
            <Button handle={() => handleLogout()} className={styles.logOut} text="Log Out" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default SideMenu;
