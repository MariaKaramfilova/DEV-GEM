import { createTheme } from "@mui/material";

export const HOME_PATH: string = "/home";
export const FILTER_ADDONS_PATH = "/addons/:filter";
export const NUM_WORDS_IN_CARDS = 170;
export const NUM_CARDS_IN_HOMEPAGE = 3;
export const MESSAGE_FOR_TOP_DOWNLOAD_ADDONS = 'No top downloads to show!';
export const MESSAGE_FOR_TOP_RELATED_ADDONS = 'No top related addons to show!';
export const MESSAGE_FOR_NEW_ADDONS = 'No new addons to show!';

export const AVATAR_API_URL = "https://api.dicebear.com/6.x/personas/jpg?seed=";
export const MY_ADDONS_PATH = "my-addons";
export const URL_TO_EXTERNAL_DEFAULT_PROF_PIC = "https://shorturl.at/jtQ19";
export const DEFAULT_PROF_PIC_DIR = "../../assets/basic_avatar.png";
export const LOG_IN_PATH = "/log-in";
export const FORGOT_PASSWORD_PATH = "/forgot-password";
export const SIGN_UP_PATH = "/sign-up";
export const DETAILED_ADDON_VIEW_ID_PATH = "/detailed-addon-view/";
export const EDIT_ADDON_ID_PATH = "/edit-addon/:id";
export const EDIT_ADDON_PATH = "/edit-addon";
export const ACCOUNT_SETTINGS = "Account Settings";
export const ADMIN = "admin";
export const ACCOUNT_SETTING_PATH = "/account-settings";
export const ADMIN_PANEL_PATH = 'admin-panel-view';
export const ADMIN_INBOX_PATH = '/admin-inbox';

// About registration and login forms.
export const LOG_IN = "Log in";
export const SIGN_UP = "Sign up";

export const CREATE_ADDON_PATH: string = "/create-addon";
export const SUCCESS_UPLOAD_PATH: string = "/success-upload";
export const TAGS = 'tags';
export const IDEs = 'IDEs';
export const INVALID_NAME = 'Addon name must be between 3 and 30 symbols.';
export const INVALID_FILE = 'Please add a source file.';
export const INVALID_ORIGIN_LINK = 'Invalid origin link.';
export const INVALID_DESCRIPTION = 'You should add a description between 10 and 3000 symbols.';
export const INVALID_TAG = 'You must add at least one tag.';
export const INVALID_IDE = 'You must add target IDE.';
export const INVALID_COMPANY = 'Company name cannot be more than 50 symbols long.';
export const SUCCESS_UPLOAD_MESSAGE = "Congrats, you just uploaded a new addon!";
export const GITHUB_TOKEN = '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';
export const GITHUB_PRIVATE_KEY = 'SHA256:q8IMXLvvEBu6DMo1LRNpqYlavgH6u/pQyDgZqELcugE=';
export const DUPLICATE_FILE = 'This file name already exists in our database, please upload a new one.'
export const DUPLICATE_NAME = 'Name already exist. Add a unique name.'
export const INVALID_VERSION_INFO = 'Enter a valid version info between 10 and 40 symbols.'
export const INVALID_VERSION = 'Enter a valid version. Valid format example: 1.0.5'
export const DUPLICATE_VERSION = 'This version already exists. Add a new one.'
export const GITHUB_REPO_NAME = 'Addonis';
export const GITHUB_OWNER_NAME = 'MariaKaramfilova';

export const theme = createTheme({
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: "##ECECEC", // Set your default background color here
          },
        },
      },
    },
  });
export const ADMIN_WORD = 'admin';

export const CREATED_ON = 'createdOn';

export const SIMPLE_DATE_FORMAT = 'D MMM YYYY';

export const ASC = 'asc';
export const DESC = 'desc';

export const ADDONS_PER_PAGE = 7;
