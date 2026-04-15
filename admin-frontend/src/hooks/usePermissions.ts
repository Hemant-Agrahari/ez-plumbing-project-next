import { getTokenCookie } from "@/helper/auth";
import { useAppSelector } from "@/lib/hooks/hooks";

type Permission = {
  moduleSlug: string;
  view: boolean;
  add: boolean;
  edit: boolean;
  delete: boolean;
};

export const usePermissions = (moduleSlug: string) => {
  const permissions = useAppSelector((state) => state.permissions.permissions);
  const role = getTokenCookie('role'); // Retrieve role from cookie

  const hasPermission = (action: keyof Omit<Permission, 'moduleSlug'>) => {
    // If the role is 'admin', all permissions are true
    if (role === 'admin') {
      return true;
    }
    // Otherwise, check the actual permissions
    return permissions.some(
      (perm) => perm.moduleSlug === moduleSlug && perm[action]
    );
  };

  return {
    canView: hasPermission('view'),
    canAdd: hasPermission('add'),
    canEdit: hasPermission('edit'),
    canDelete: hasPermission('delete'),
  };
};
