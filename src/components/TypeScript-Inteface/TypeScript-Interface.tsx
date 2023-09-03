export interface AddonTSInterface {
    name: string;
    description: string;
    addonId: string;
    logo: string;
    downloads: number;
    rating: number;
    status: string;
    createdOn: string | Date;
    targetIDE: string;
    downloadLink: string;
    company: string;
    featured: boolean;
  }

  export const getValidAddonProps = (addon: AddonTSInterface): AddonsDetailsProps => {
    const validProps = {
      name: addon.name,
      addonId: addon.addonId,
      downloads: addon.downloads,
      rating: addon.rating,
      status: addon.status,
      description: addon.description,
      createdOn: addon.createdOn,
      company: addon.company,
      logo: addon.logo,
    };
    return validProps;
  };

  export interface UserTSInterface {
    id: string;
    username: string;
    email: string;
    phoneNumber: string;
    role: string;
    blockedStatus: boolean;
  }
  
  export interface AuthContextDataTSInterface {
    loggedInUser: User;
    allUsers: User[];
  }
  export interface PropsTSForCopyRightFile {
    [key: string]: any;
  }
  export interface AddonsContextProviderProps {
    children: ReactNode;
  }
  export interface PropsForAddonsTableRowMenu {
    addonId: string;
  }

  export interface CardInvertedColorsProps {
    child: string;
    count: number;
  }