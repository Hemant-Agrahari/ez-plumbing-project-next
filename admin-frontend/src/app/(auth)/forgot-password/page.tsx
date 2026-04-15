 import styles from "../login/page.module.css";
import ForgotPassword from "@/components/Auth/ForgotPassword";
import aisLogo from "@/../public/images/ais-logo.png"
 import aisBg from "@/../public/images/ais-cms-bg.png"
import Image from "next/image";

const Page = () => {
  return (
    <div className={styles.login}>
      <div className={styles.sideContainer}>
        <Image
          className={styles.loginChild}
          alt=""
          src={aisBg}
           width="960"
        height="891"
        />
        <Image 
        className={styles.logoIcon}
        alt="Ais"
        src={aisLogo}
           width="403"
        height="171"
        />

      </div>
      <div className={styles.loginWrapper}>
        <ForgotPassword />
      </div>
    </div>
  );
};

export default Page;
