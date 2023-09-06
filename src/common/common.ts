import { createTheme } from "@mui/material";

export const HOME_PATH: string = "/home";
export const FILTER_ADDONS_PATH = "/addons/:filter";
export const NUM_WORDS_IN_CARDS = 140;
export const NUM_CARDS_IN_HOMEPAGE = 3;
export const LOADING_MORE_ADDONS = 3;
export const MESSAGE_FOR_TOP_DOWNLOAD_ADDONS = 'No top downloads to show!';
export const MESSAGE_FOR_TOP_RELATED_ADDONS = 'No top related addons to show!';
export const MESSAGE_FOR_FEATURED_ADDONS = 'No top featured addons to show!';
export const MESSAGE_FOR_NEW_ADDONS = 'No new addons to show!';
export const MESSAGE_FOR_BLOCK_USER = 'You are blocked for breaking our platform rules!';
export const MESSAGE_FOR_UNBLOCK_USER =  'You are unblocked and can now take advantage of everything on our platform!';
export const MESSAGE_FOR_MAKE_ADMIN = 'Congratulations! You have been granted administrative rights!';
export const MIN_LETTERS_NOTIFICATION = 10;
export const ADMIN_CHAT_PATH = '/admin-chat';

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
export const CHECKOUT_PATH_ID = '/checkout/:addon';
export const CHECKOUT_PATH = '/checkout/';
export const USER_NOTIFICATION = '/user-notification'

// About registration and login forms.
export const LOG_IN = "Log in";
export const SIGN_UP = "Sign up";

export const CREATE_ADDON_PATH: string = "/create-addon";
export const SUCCESS_UPLOAD_PATH: string = "/success-upload";
export const TAGS = 'tags';
export const IDEs = 'IDEs';
export const INVALID_NAME = 'Addon name must be between 3 and 30 symbols.';
export const INVALID_FILE = 'Please add a source file.';
export const INVALID_ORIGIN_LINK = 'Invalid origin link. Add a valid GitHub repo link.';
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
export const INVALID_FILE_TYPE = "Invalid file type!";
export const EMPTY_FILE = "Cannot upload empty file!";
export const MAX_FILE_SIZE = "Max file size is 10MB";
export const GITHUB_REPO_NAME = 'Addonis';
export const GITHUB_OWNER_NAME = 'MariaKaramfilova';
/**10 MB * 2^20 bytes/MB */
export const tenMB = 10 * 2**20;

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

export const MIN_ADDON_NAME_LEN = 3;
export const MAX_ADDON_NAME_LEN = 30;

export const MIN_ADDON_DESCR_LEN = 10;
export const MAX_ADDON_DESCR_LEN = 3000;

export const MAX_COMPANY_LEN = 50;

export const IMAGE_DIR_GITHUB = 'Image';

export const MIN_FIRST_LAST_NAME_LEN = 4;
export const MAX_FIRST_LAST_NAME_LEN = 32;

export const MIN_PASSWORD_LEN = 6;
export const AT = "@";
export const DOT = '.';

export const MIN_USERNAME_LEN = 2;
export const MAX_USERNAME_LEN = 20;

export const INVALID_FIRST_NAME = "First name should be between 4 and 32 symbols";
export const INVALID_LAST_NAME = "Last name should be between 4 and 32 symbols";
export const INVALID_PASSWORDS_MATCH = "Please check if your passwords match!";
export const INVALID_PASSWORD_LEN = "Password should be more than 6 characters!";
export const INVALID_EMAIL = "Email is not valid!";
export const INVALID_USERNAME_LEN = "Add a valid username between between 2 and 20 symbols.";
export const DUPLICATE_EMAIL = "This Email is already in use!";
export const DUPLICATE_USERNAME = "This Username already exists!";
export const INVALID_PHONE = 'Add a valid phone number in the following format: +359x xxxx xxxx';
export const DUPLICATE_PHONE = 'This phone number already exist in our database. Add a new one.';

export enum OrderSteps {
  shipping = "Order address",
  payment = "Payment details",
  review = "Review your order",
}