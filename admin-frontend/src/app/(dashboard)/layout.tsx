"use client"
import { useEffect } from "react";
import styles from "./page.module.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import SideMenu from "@/components/Layout/SideMenu/SideMenu";

import { useDispatch } from "react-redux";
import { requestHandler } from "@/helper/requestHandler";
import { asyncHandler } from "@/utils/asyncHandler";
import { setPermissions } from "@/lib/features/permissionsSlice/permissionSlice";
import withPermissionCheck from "@/components/CommonComponents/withPermissionCheck";
 function RootLayout({ children }: any) {


  const dispatch = useDispatch();

  const fetchPermissions = async () => {
    const response = await requestHandler('/getSessionData', {}, 'get');
 
    if (response.status === 200) {
      dispatch(setPermissions(response.data));
    } else {
      console.error('Failed to fetch permissions');
    }
  };

  useEffect(() => {
    asyncHandler(fetchPermissions)();
  }, [dispatch]);
  // console.log(children);
  
  return (
    <>
      <div className={styles.dashboard}>
        <SideMenu />
        <div className="w-100">
          <div className={styles.main}>{children}</div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}
export default withPermissionCheck(RootLayout);
