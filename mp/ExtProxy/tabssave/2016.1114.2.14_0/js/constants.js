// URLs
const UNINSTALL_URL = "http://c306.net/whygo.html?src=dT&utm_source=dT%20for%20chrome&utm_medium=chrome_projects&utm_content=uninstall&utm_campaign=chrome_projects";
const UPDATE_NOTES_URL = "https://c306.net/apps/updates/app/clutterfree/?src=dT&utm_source=dT%20for%20chrome&utm_medium=chrome_projects&utm_content=extensionupdated&utm_campaign=chrome_projects"
const DONATE_URL = "https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=GD2XSXXL34SDG";


// From workhorse
const INIT = "init";
const SUSPENDERPREFIX = "chrome-extension://klbibkeccnjlkjkiokjodocebajanakg/suspended.html#uri=";
const MIN_DUPLICATES_NOTIFICATION_DISPLAY = 20;//20; //min weekly closed to show notification
const MIN_SHOW_STATS_PAGE = 30;//30; //min total closed to show stats link & button

const TRAILING_SLASH_REGEX = /^(\S+?)(\/)((?:(?:#|\?)\S+)?$)/;


// From bgscript
const OFF_COLOUR = [232, 88, 69, 255];
const ON_COLOUR = [10, 187, 10, 255];


// From stats
const MIN_TOTALS_DISPLAY_NOTIFICATION = 1; //min total needed to show a totals item
const MIN_GRAPH_ITEMS = 5; // min line items needed to show a graph
const GRAPH_WEEK_THRESHOLD = 3; //if >=3 weeks of data, show weekly graph, else show daily
const MAX_DOMAIN_ARR_ROWS = 9; //max 10 rows = limiter is 9


// Icons
const NOTIFICATION_ICON_URL = chrome.runtime.getURL("/img/dt128.png");


// Notification IDs
const WEEKLY_STATS_NOTIFICATION_ID = "weeklyStatsNotification";
const EXTENSION_UPDATED_NOTIFICATION_ID = "extensionUpdatedNotification";
const PREVIOUS_DUPLICATES_REMOVED_NOTIFICATION_ID = "previousDuplicatesRemovedNotification";
const DUPLICATES_FOUND_NOTIFICATION_ID = "duplicatesFoundNotification";
const URL_WHITELISTED_NOTIFICATION_ID = "urlWhitelistedNotification";
const TABS_RESTORED_NOTIFICATION_ID = "tabsRestoredNotification";


// Storage
const SYNC_STORAGE_NAME = "sync";
const LOCAL_STORAGE_NAME = "local";


// Default settings
const DEFAULT_WHITELIST = ["chrome://newtab","about:blank","chrome://extensions"];
const DEFAULT_STARTSTATE = "on";
const DEFAULT_SHOWCONTEXTMENU = "duplicate,whitelist,moveToLast";
const DEFAULT_BROWSERACTION = "popup";
const DEFAULT_ORIGINALTABBEHAVIOUR = "justSwitch";
const DEFAULT_REFRESHORIGINAL = false;
const DEFAULT_IGNOREHASH = false;
const DEFAULT_ALLOWDUPLICATESACROSSWINDOWS = false;
const DEFAULT_SHOWNOTIFICATIONS = true;
const DEFAULT_SYNCSTORAGE = false;
const DEFAULT_MOVETABTOWINDOWEND = false;
const DEFAULT_DONATED = false;
const DEFAULT_CLOSED_DUPLICATES = [];


// GA Track
const GA_EXTENSION_PAGE_TRACK = "extension_page_opened";
const GA_DONATED_TRACK = "donated";
const GA_BROWSER_ACTION_BUTTON_TRACK = "browser_action_button_action";
const GA_BROWSER_ACTION_CONTEXT_MENU_TRACK = "browser_action_context_menu_action";
const GA_PAGE_CONTEXT_MENU_TRACK = "page_context_menu_action";
const GA_NOTIFICATION_TRACK = "notification_action";
const GA_POPUP_TRACK = "popup_action";
const GA_SETTINGS_CHANGED_TRACK = "settings_changed_action";

const GA_OPTION_PAGE_LINKS_TRACK = "options_page_links_action";
const GA_POPUP_PAGE_LINKS_TRACK = "popup_page_links_action";


// TODO: Replace button_ with _button
const BUTTON_SHOW_STATS = "show_stats_button";
const BUTTON_DONATE = "donate_button";
const BUTTON_SHOW_CHANGES = "showChanges_button";
const BUTTON_CLOSE_DUPLICATES = "close_duplicates_button";
const BUTTON_KEEP_DUPLICATES = "keep_duplicates_button";
const BUTTON_OPEN_OPTIONS = "open_options_button";


// GA Actions
const ACTION_TOGGLE_EXTENSION_STATE = "toggle_extension_state";
const ACTION_DUPLICATE_TAB = "duplicate_tab";
const ACTION_ADD_TO_WHITELIST = "add_to_whitelist";
const ACTION_RESTORE_LOST_TABS = "restore_lost_tabs";
const ACTION_CLOSE_PRE_EXISTING_DUPLICATES = "close_pre_existing_duplicates";
const ACTION_MOVE_TO_LAST = "move_to_last";

const ACTION_OPEN_SETTINGS = "open_settings";
const ACTION_SHOW_CHANGES = "show_changes";
const ACTION_SHOW_STATS = "show_stats";

const ACTION_OPTIONS_PAGE_OPEN = "options_page";
const ACTION_POPUP_PAGE_OPEN = "popup_page";
const ACTION_ABOUT_PAGE_OPEN = "about_page";
const ACTION_STATS_PAGE_OPEN = "stats_page";

const ACTION_WHITELIST_ADD = "whitelist_add";
const ACTION_WHITELIST_REMOVE = "whitelist_remove";

const ACTION_DONATED = "donated";

// GA Settings
const SETTING_START_STATE = "start_state";
const SETTING_SHOW_CONTEXT_MENU = "show_context_menu";
const SETTING_BROWSER_ACTION = "browser_action";
const SETTING_ORIGINAL_TAB_BEHAVIOUR = "original_tab_behaviour";
const SETTING_IGNORE_HASH = "ignore_hash";
const SETTING_ALLOW_DUPLICATES_ACROSS_WINDOWS = "allow_duplicates_across_windows";
const SETTING_SHOW_NOTIFICATIONS = "show_notifications";
const SETTING_REFRESH_ORIGINAL = "refresh_original";
const SETTING_MOVE_TAB_TO_WINDOW_END = "move_tab_to_window_end";
const SETTING_SYNC_STORAGE = "sync_storage";
const SETTING_WHITELIST_MODIFIED = "whitelist_modified";
