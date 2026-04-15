import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAppSelector } from "@/lib/hooks/hooks";
import Loader from "@/components/Layout/Loader/Loader";
 
const withPermissionCheck = (WrappedComponent: React.ComponentType) => {
  const HOC = (props: any) => {
    const [loading, setLoading] = useState(true); // State to track loading status
    const router = useRouter();
    const pathname = usePathname();
    const permissionsState = useAppSelector((state) => state.permissions);
    const permissions = permissionsState.permissions;

    useEffect(() => {
      const currentRoute = pathname.split("/")[1];

      const modulePermission = permissions?.find(
        (permission: any) => permission.moduleSlug === currentRoute
      );

      if (modulePermission && !modulePermission.moduleValue) {
        toast.error("No access for this route");
        router.push("/");
      } else {
        setLoading(false);  
      }
    }, [permissions, pathname, router]);

     if (loading) {
      return <Loader />;
    }

    return <WrappedComponent {...props} />;
  };

  return HOC;
};

export default withPermissionCheck;
