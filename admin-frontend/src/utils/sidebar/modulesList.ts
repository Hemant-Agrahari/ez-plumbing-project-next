export type ModulePermissions = {
  moduleName: string;
  moduleSlug: string;
  moduleValue: boolean;
  view: boolean;
  edit: boolean;
  add: boolean;
  delete: boolean;
};

export const initialPermissions: ModulePermissions[] = [
  { moduleName: 'Sub-admin Management', moduleSlug: "sub-admin-management", moduleValue: false, view: false, edit: false, add: false, delete: false },
  { moduleName: 'Categories Management', moduleSlug: "categories-management", moduleValue: false, view: false, edit: false, add: false, delete: false },
  { moduleName: 'Media Management', moduleSlug: "media-management", moduleValue: false, view: false, edit: false, add: false, delete: false },
  { moduleName: 'Short Code Management', moduleSlug: "short-code-management", moduleValue: false, view: false, edit: false, add: false, delete: false },
  { moduleName: 'Notification', moduleSlug: "notification", moduleValue: false, view: false, edit: false, add: false, delete: false },
  { moduleName: 'Seo Management', moduleSlug: "seo-management", moduleValue: false, view: false, edit: false, add: false, delete: false },
  { moduleName: 'Pages Management', moduleSlug: "pages-management", moduleValue: false, view: false, edit: false, add: false, delete: false },
  { moduleName: 'Template Management', moduleSlug: "template-management", moduleValue: false, view: false, edit: false, add: false, delete: false },
];
