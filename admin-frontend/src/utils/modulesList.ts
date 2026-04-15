export type ModulePermissions = {
    moduleName: string;
    moduleValue: boolean;
    view: boolean;
    edit: boolean;
    add: boolean;
    delete: boolean;
  };
  
  export const initialPermissions: ModulePermissions[] = [
    { moduleName: 'Sub-admin Management', moduleValue: false, view: false, edit: false, add: false, delete: false },
    { moduleName: 'Categories Management', moduleValue: false, view: false, edit: false, add: false, delete: false },
    { moduleName: 'Media Management', moduleValue: false, view: false, edit: false, add: false, delete: false },
    { moduleName: 'Short Code Management', moduleValue: false, view: false, edit: false, add: false, delete: false },
    { moduleName: 'Notification', moduleValue: false, view: false, edit: false, add: false, delete: false },
    { moduleName: 'Seo Management', moduleValue: false, view: false, edit: false, add: false, delete: false },
    { moduleName: 'Pages Management', moduleValue: false, view: false, edit: false, add: false, delete: false },
    { moduleName: 'Templates Management', moduleValue: false, view: false, edit: false, add: false, delete: false },
  ];
  