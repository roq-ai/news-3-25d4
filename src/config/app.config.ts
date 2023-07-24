interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Owner'],
  customerRoles: [],
  tenantRoles: ['Editor', 'Translator', 'Administrator', 'Owner'],
  tenantName: 'Publisher',
  applicationName: 'news 3',
  addOns: ['chat', 'notifications', 'file'],
};
