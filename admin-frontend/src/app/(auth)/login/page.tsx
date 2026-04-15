import Login from "@/components/Auth/Login";
import styles from "./page.module.css";
import Image from "next/image";
 import aisLogo from "@/../public/images/ais-logo.png"
 import aisBg from "@/../public/images/ais-cms-bg.png"

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
        <Login />
      </div>
    </div>
  );
};

export default Page;
