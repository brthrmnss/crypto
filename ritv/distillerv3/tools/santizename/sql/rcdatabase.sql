/*
Date: 2012-01-19 22:10:32
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `banned_ips`
-- ----------------------------
DROP TABLE IF EXISTS `banned_ips`;
CREATE TABLE `banned_ips` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ipAddress` varchar(30) NOT NULL,
  `dateBanned` TIMESTAMP NOT NULL,
  `banType` varchar(30) NOT NULL,
  `banNotes` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of banned_ips
-- ----------------------------

-- ----------------------------
-- Table structure for `file`
-- ----------------------------
DROP TABLE IF EXISTS `file`;
CREATE TABLE `file` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `originalFilename` varchar(255) NOT NULL,
  `shortUrl` varchar(255) DEFAULT NULL,
  `fileType` varchar(50) DEFAULT NULL,
  `extension` varchar(10) DEFAULT NULL,
  `fileSize` int(11) DEFAULT NULL,
  `localFilePath` varchar(255) DEFAULT NULL,
  `ipAddress` varchar(30),
  `serverName` varchar(30),
  `machineName` varchar(30),
  `userId` int(11) DEFAULT NULL,
  `totalDownload` int(11) DEFAULT NULL,
  `uploadedIP` varchar(50) DEFAULT NULL,
  `uploadedDate` DATE NULL DEFAULT NULL,
  `statusId` int(2) DEFAULT NULL,
  `visits` int(11) DEFAULT '0',
  `lastAccessed` DATE NULL DEFAULT NULL,
  `deleteHash` varchar(32) DEFAULT NULL,
   `fileName`  varchar(32) DEFAULT NULL,
    `episodeNumber` int(11) DEFAULT '0',
      `seasonNumber` int(11) DEFAULT '0',
        `imdb_id` varchar(32) DEFAULT NULL,
           `imdb_series_id` varchar(32) DEFAULT NULL,

  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=700 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of file
-- ----------------------------

-- ----------------------------
-- Table structure for `file_status`
-- ----------------------------
DROP TABLE IF EXISTS `file_status`;
CREATE TABLE `file_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `label` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of file_status
-- ----------------------------
INSERT INTO file_status VALUES ('1', 'active');
INSERT INTO file_status VALUES ('2', 'user removed');
INSERT INTO file_status VALUES ('3', 'admin removed');
INSERT INTO file_status VALUES ('4', 'copyright removed');
INSERT INTO file_status VALUES ('5', 'system expired');

-- ----------------------------
-- Table structure for `language`
-- ----------------------------
DROP TABLE IF EXISTS `language`;
CREATE TABLE `language` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `languageName` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of language
-- ----------------------------
INSERT INTO language VALUES ('1', 'English (en)');

-- ----------------------------
-- Table structure for `payment_log`
-- ----------------------------
DROP TABLE IF EXISTS `payment_log`;
CREATE TABLE `payment_log` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `user_id` INT(11),
    `order_id` INT(11),
    `username` VARCHAR(255),
    `payment_hash` varchar(64) NOT NULL,
    `status` enum('note','error','complete','waiting_confirmation','insufficient_amount','error:unknown_transaction','error:incorrect_secret','error:order_not_open','error:data_incongruent') COLLATE utf8_unicode_ci NOT NULL,
    `amount` INT(11) DEFAULT NULL,
    `amount_usd` FLOAT(9,2) DEFAULT NULL,
    `amount_btc` FLOAT(9,9) DEFAULT NULL,
    `currency_code` VARCHAR(3) NOT NULL,
    `description` TEXT NOT NULL,
    `request_log` TEXT NOT NULL,
    `createdAt` DATETIME,
    `updatedAt` DATETIME,
    PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
-- ----------------------------
-- Records of payment_log
-- ----------------------------

-- ----------------------------
-- Table structure for `premium_order`
-- ----------------------------
DROP TABLE IF EXISTS `premium_order`;
CREATE TABLE `premium_order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT 1,
  `payment_sequence` int(11) NOT NULL,
  `payment_hash` varchar(64) NOT NULL,
  `days` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `amount_usd` FLOAT(9,2) NOT NULL,
  `amount_btc` FLOAT(9,9) NOT NULL DEFAULT 0,
  `amount_paid` int(11) DEFAULT 0,
  `order_status` enum('pending','cancelled','completed','forwarded','expired','verifying','paid','recording','recorded') NOT NULL,
  `bitcoin_address` VARCHAR(36) NOT NULL,
  `secret` VARCHAR(256) NOT NULL,
  `callback_url` VARCHAR(256) NOT NULL,
  `expireAt` DATETIME NOT NULL,
  `createdAt` DATETIME,
  `updatedAt` DATETIME,
  `date_created` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of premium_order
-- ----------------------------

-- ----------------------------
-- Table structure for `btc_payment_addresses`
-- ----------------------------
DROP TABLE IF EXISTS `btc_payment_addresses`;
CREATE TABLE `btc_payment_addresses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `btc_address` VARCHAR(36),
  `private_key` VARCHAR(64),
  `index` int(11),
  `status` enum('reserved','available','frozen','parked','error','sweepable') default 'available',
  `sweepable` BOOLEAN default 0,
  `gen_count` int(11) default 0,
  `use_count` int(11) default 0,
  `createdAt` DATETIME,
  `updatedAt` DATETIME,
  PRIMARY KEY (`id`),
  UNIQUE (`btc_address`,`private_key`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of premium_order
-- ----------------------------



-- ----------------------------
-- Table structure for `sessions`
-- ----------------------------
DROP TABLE IF EXISTS `sessions`;
CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `data` text COLLATE utf8_unicode_ci NOT NULL,
  `updated_on` DATETIME NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of sessions
-- ----------------------------

-- ----------------------------
-- Table structure for `site_config`
-- ----------------------------
DROP TABLE IF EXISTS `site_config`;
CREATE TABLE `site_config` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `config_key` varchar(100) NOT NULL,
  `config_value` text NOT NULL,
  `config_description` varchar(255) NOT NULL,
  `availableValues` varchar(255) NOT NULL,
  `config_type` varchar(30) NOT NULL,
  `config_group` varchar(100) NOT NULL DEFAULT 'Default',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of site_config
-- ----------------------------
INSERT INTO site_config VALUES ('32', 'cost_for_7_days_premium', '4.99', 'The cost for 7 days premium access. Without any curency symbol. i.e. 4.99', '', 'integer', 'Premium Pricing');
INSERT INTO site_config VALUES ('2', 'redirect_delay_seconds', '60', 'How long to wait before redirecting if Meta Delay Redirect', '', 'integer', 'Default');
INSERT INTO site_config VALUES ('21', 'language_show_key', 'translation', 'Show translation value or key. (use \'key\' to debug translations, \'translation\' to show actual translated value)', '[\'key\',\'translation\']', 'select', 'Language');
INSERT INTO site_config VALUES ('4', 'page_extension', 'html', 'Whether to use html or php front-end page extensions', '[\"html\", \"php\"]', 'select', 'Page Options');
INSERT INTO site_config VALUES ('5', 'date_time_format', 'd/m/Y H:i:s', 'Date time format in php', '', 'string', 'Local');
INSERT INTO site_config VALUES ('6', 'date_format', 'd/m/Y', 'Date format in php', '', 'string', 'Local');
INSERT INTO site_config VALUES ('7', 'site_name', 'File Upload Script', 'Site name', '', 'string', 'Page Options');
INSERT INTO site_config VALUES ('9', 'site_theme', 'blue_v2', 'Site template theme', '[\"blue_v2\"]', 'select', 'Page Options');
INSERT INTO site_config VALUES ('10', 'max_files_per_day', '50', 'Spam protect: Max files a user IP address can create per day. Leave blank for unlimited.', '', 'integer', 'File Uploads');
INSERT INTO site_config VALUES ('11', 'date_time_format_js', '%d-%m-%Y %H:%i', 'Date time format in javascript', '', 'string', 'Local');
INSERT INTO site_config VALUES ('33', 'cost_for_30_days_premium', '9.99', 'The cost for 30 days premium access. Without any curency symbol. i.e. 9.99', '', 'integer', 'Premium Pricing');
INSERT INTO site_config VALUES ('15', 'advert_site_footer', '<a target=\"_blank\" href=\"http://www.dreamhost.com/r.cgi?606181\"><img height=\"60\" width=\"468\" src=\"http://images.dreamhost.com/rewards/468x60-b.gif\" alt=\"468x60\"/></a>', 'Site footer ads across the site (html)', '', 'textarea', 'Adverts');
INSERT INTO site_config VALUES ('16', 'advert_delayed_redirect_top', '<a target=\"_blank\" href=\"http://www.dreamhost.com/r.cgi?606181\"><img height=\"60\" width=\"468\" src=\"http://images.dreamhost.com/rewards/468x60-d.gif\" alt=\"468x60\"/></a>', 'Delayed redirect top advert (html)', '', 'textarea', 'Adverts');
INSERT INTO site_config VALUES ('18', 'advert_delayed_redirect_bottom', '<a target=\"_blank\" href=\"http://www.dreamhost.com/r.cgi?606181\"><img height=\"60\" width=\"468\" src=\"http://images.dreamhost.com/rewards/468x60-c.gif\" alt=\"468x60\"/></a>', 'Delayed redirect bottom advert (html)', '', 'textarea', 'Adverts');
INSERT INTO site_config VALUES ('19', 'report_abuse_email', 'abuse@yoursite.com', 'Email address for which all abuse reports are sent.', '', 'string', 'Page Options');
INSERT INTO site_config VALUES ('20', 'site_language', 'English (en)', 'Site language for text conversions <a href=\'manage_languages.php\'>(manage languages)</a>', 'SELECT languageName AS itemValue FROM language ORDER BY languageName', 'select', 'Language');
INSERT INTO site_config VALUES ('31', 'next_check_for_file_removals', '1327013029', 'System value. The next time to delete any files which haven\'t recently been accessed. DATE. Do not edit.', '', 'integer', 'System');
INSERT INTO site_config VALUES ('23', 'stats_only_count_unique', 'yes', 'Revisits in the same day, by the same IP address will not be counted on stats.', '[\"yes\", \"no\"]', 'select', 'Default');
INSERT INTO site_config VALUES ('24', 'default_email_address_from', 'email@yoursite.com', 'The default email address to send emails from.', '', 'string', 'Page Options');
INSERT INTO site_config VALUES ('25', 'default_email_address_from', 'email@yoursite.com', 'The email address new account registrations will be sent from.', '', 'string', 'Default');
INSERT INTO site_config VALUES ('26', 'free_user_max_upload_filesize', '104857600', 'The max upload filesize for free users (in bytes)', '', 'integer', 'Free User Settings');
INSERT INTO site_config VALUES ('27', 'premium_user_max_upload_filesize', '1073741824', 'The max upload filesize for premium users (in bytes)', '', 'integer', 'Premium User Settings');
INSERT INTO site_config VALUES ('28', 'accepted_upload_file_types', '', 'The file extensions which are permitted. Leave blank for all. Separate by semi-colon. i.e. .jpg;.gif;.doc;', '', 'string', 'File Uploads');
INSERT INTO site_config VALUES ('29', 'free_user_upload_removal_days', '60', 'The amount of days after non-active files are removed for free users. Leave blank for unlimited.', '', 'integer', 'Free User Settings');
INSERT INTO site_config VALUES ('30', 'premium_user_upload_removal_days', '', 'The amount of days after non-active files are removed for paid users. Leave blank for unlimited.', '', 'integer', 'Premium User Settings');
INSERT INTO site_config VALUES ('34', 'cost_for_90_days_premium', '19.99', 'The cost for 90 days premium access. Without any curency symbol. i.e. 19.99', '', 'integer', 'Premium Pricing');
INSERT INTO site_config VALUES ('35', 'cost_for_180_days_premium', '34.99', 'The cost for 180 days premium access. Without any curency symbol. i.e. 34.99', '', 'integer', 'Premium Pricing');
INSERT INTO site_config VALUES ('36', 'cost_for_365_days_premium', '59.99', 'The cost for 365 days premium access. Without any curency symbol. i.e. 59.99', '', 'integer', 'Premium Pricing');
INSERT INTO site_config VALUES ('37', 'cost_currency_symbol', '$', 'The symbol to use for currency. i.e. $', '[\"$\", \"£\", \"€\"]', 'string', 'Premium Pricing');
INSERT INTO site_config VALUES ('38', 'cost_currency_code', 'USD', 'The currency code for the current currency. i.e. USD', '[\"USD\", \"GBP\", \"EUR\"]', 'select', 'Premium Pricing');
INSERT INTO site_config VALUES ('39', 'paypal_payments_email_address', 'paypal@yoursite.com', 'The PayPal email account you wish to receive payments at.', '', 'string', 'Premium Pricing');
INSERT INTO site_config VALUES ('40', 'free_user_max_download_speed', '50000', 'Maximum download speed for free/non-users, in bytes per second. i.e. 50000. Use 0 for unlimited. ', '', 'integer', 'Free User Settings');
INSERT INTO site_config VALUES ('41', 'premium_user_max_download_speed', '0', 'Maximum download speed for premium users, in bytes per second. i.e. 50000. Use 0 for unlimited. ', '', 'integer', 'Premiuim User Settings');
INSERT INTO site_config VALUES ('42', 'email_method', 'php', 'The method for sending emails via the script.', '[\"php\",\"smtp\"]', 'select', 'Email Settings');
INSERT INTO site_config VALUES ('43', 'email_smtp_host', 'mail.yoursite.com', 'Your SMTP host if you\'ve selected SMTP email method. (leave blank is email_method = php)', '', 'string', 'Email Settings');
INSERT INTO site_config VALUES ('44', 'email_smtp_port', '25', 'Your SMTP port if you\'ve selected SMTP email method. (Normally 25)', '', 'integer', 'Email Settings');
INSERT INTO site_config VALUES ('45', 'email_smtp_requires_auth', 'no', 'Whether your SMTP server requires authentication.', '[\"yes\",\"no\"]', 'select', 'Email Settings');
INSERT INTO site_config VALUES ('46', 'email_smtp_auth_username', '', 'Your SMTP username if SMTP auth is required.', '', 'string', 'Email Settings');
INSERT INTO site_config VALUES ('47', 'email_smtp_auth_password', '', 'Your SMTP password if SMTP auth is required.', '', 'string', 'Email Settings');

-- ----------------------------
-- Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(65) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(65) COLLATE utf8_unicode_ci NOT NULL,
  `level` enum('free user','invited','neophite','paid user','admin','test') COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(65) COLLATE utf8_unicode_ci DEFAULT NULL,
  `lastlogindate` DATETIME DEFAULT NULL,
  `lastloginip` varchar(32) COLLATE utf8_unicode_ci,
  `status` enum('active','pending','disabled','suspended') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'active',
  `title` varchar(10) COLLATE utf8_unicode_ci,
  `firstname` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `lastname` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `createdAt` DATETIME,
  `updatedAt` DATETIME,
  `createdip` varchar(15) COLLATE utf8_unicode_ci DEFAULT NULL,
  `lastPaymentSequence` int(11) DEFAULT 0,
  `lastPayment` DATETIME DEFAULT NULL,
  `paidExpiryDate` DATETIME DEFAULT NULL,
  `paymentTracker` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `passwordResetHash` varchar(64) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `identifier` varchar(32) COLLATE utf8_unicode_ci DEFAULT '',
  `apikey` varchar(32) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO users VALUES ('1', 'admin', '5f4dcc3b5aa765d61d8327deb882cf99', 'admin', 'email@yoursite.com', null, '192.168.2.100', 'active', 'Mr', 'Admin', 'User', '2011-12-27 13:45:22' ,NOW(), 'local', '0', null, null, 'no_payment_tracker', 'no_password_reset_hash', 'i_admin', 'no_api_key');
INSERT INTO users VALUES ('2', 'test', '5f4dcc3b5aa765d61d8327deb882cf99', 'test', 'email@yoursite.com', null, '192.168.2.100', 'active', 'Mr', 'test', 'user', '2011-12-27 13:45:22' ,NOW(), 'local', '0', null, NOW(), 'no_payment_tracker', 'no_password_reset_hash', 'i_test', 'no_api_key');

DROP TABLE IF EXISTS `file_folder`;
CREATE TABLE `file_folder` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `folderName` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for `file_server`
-- ----------------------------
DROP TABLE IF EXISTS `file_server`;
CREATE TABLE `file_server` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `serverLabel` varchar(100) NOT NULL,
  `serverType` enum('remote','local') DEFAULT NULL,
  `ipAddress` varchar(15) NOT NULL,
  `connectionMethod` enum('ftp') NOT NULL DEFAULT 'ftp',
  `ftpPort` int(11) NOT NULL DEFAULT '21',
  `ftpUsername` varchar(50) NOT NULL,
  `ftpPassword` varchar(50) DEFAULT NULL,
  `statusId` int(11) NOT NULL DEFAULT '1',
  `storagePath` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `statusId` (`statusId`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for `file_server_status`
-- ----------------------------
DROP TABLE IF EXISTS `file_server_status`;
CREATE TABLE `file_server_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `label` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for `file_imdb_info`
-- ----------------------------
DROP TABLE IF EXISTS `file_imdb_info`;
CREATE TABLE `file_imdb_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `file_id` int(11),
  `name` varchar(255),
  `year` varchar(255),
  `series` varchar(255),
  `season` varchar(255),
  `episode` varchar(255),
  `imbd_id` INT(32),
  `country` varchar(64),
  `rating` varchar(16),
  `genre` varchar(32),
  `desc` text,
  `image` varchar(255),
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of file_server_status
-- ----------------------------
INSERT INTO `file_server_status` VALUES ('1', 'disabled');
INSERT INTO `file_server_status` VALUES ('2', 'active');
INSERT INTO `file_server_status` VALUES ('3', 'read only');

-- ----------------------------
-- Records of file_server
-- ----------------------------
ALTER TABLE `file` ADD `folderId` INT( 11 ) NULL DEFAULT NULL;

INSERT INTO `site_config` (`config_key`, `config_value`, `config_description`, `availableValues`, `config_type`, `config_group`) VALUES ('file_url_show_filename', 'no', 'Show the original filename on the end of the generated url.', '[\"yes\",\"no\"]', 'select', 'File Uploads');

ALTER TABLE `file`
ADD COLUMN `serverId`  int(11) DEFAULT 1 AFTER `folderId`;


ALTER TABLE `file_folder`
ADD COLUMN `isPublic`  int(1) NOT NULL DEFAULT 0 AFTER `folderName`,
ADD COLUMN `accessPassword`  varchar(32) NULL AFTER `isPublic`;


UPDATE `site_config` SET `config_group` = 'Premium User Settings' WHERE `site_config`.`id` =41;
UPDATE `site_config` SET availableValues = REPLACE(availableValues, '\'', '"');
ALTER TABLE `language` ADD `isLocked` INT( 1 ) NOT NULL;
UPDATE `language` SET `isLocked` = '1' WHERE `language`.`id` =1;
ALTER TABLE `language` ADD `flag` VARCHAR( 20 ) NOT NULL;
UPDATE `language` SET `flag` = 'us' WHERE `language`.`id` =1;

ALTER TABLE `users` ADD INDEX ( `username` );
ALTER TABLE `banned_ips` ADD INDEX ( `ipAddress` );
ALTER TABLE `file` ADD INDEX ( `shortUrl` );
ALTER TABLE `file` ADD INDEX ( `originalFilename` );
ALTER TABLE `file` ADD INDEX ( `fileSize` );
ALTER TABLE `file` ADD INDEX ( `visits` );
ALTER TABLE `file` ADD INDEX ( `lastAccessed` );
ALTER TABLE `file` ADD INDEX ( `extension` );
ALTER TABLE `site_config` ADD INDEX ( `config_key` );

UPDATE `site_config` SET `availableValues` = 'SELECT serverLabel AS itemValue FROM file_server LEFT JOIN file_server_status ON file_server.statusId = file_server_status.id WHERE statusId=2 ORDER BY serverLabel' WHERE `config_key` = 'default_file_server';

INSERT INTO `site_config` (`id`, `config_key`, `config_value`, `config_description`, `availableValues`, `config_type`, `config_group`) VALUES (NULL, 'reserved_usernames', 'admin|administrator|localhost|support|billing|sales|payments', 'Any usernames listed here will be blocked from the main registration. Pipe separated list.', '', 'string', 'Default');

ALTER TABLE `language` ADD `isActive` INT( 1 ) NOT NULL DEFAULT '1' AFTER `isLocked`;

UPDATE `site_config` SET `config_description` = 'Site language for text conversions <a href="translation_manage.php">(manage languages)</a>' WHERE `config_key` = 'site_language';

INSERT INTO `site_config` (`id`, `config_key`, `config_value`, `config_description`, `availableValues`, `config_type`, `config_group`) VALUES (NULL, 'show_multi_language_selector', 'hide', 'Whether to show or hide the multi language selector on the site.', '["hide","show"]', 'select', 'Language');

ALTER TABLE `file_server` DROP `connectionMethod`;
ALTER TABLE `file_server` CHANGE `serverType` `serverType` ENUM( 'remote', 'local', 'ftp', 'sftp' ) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL;
UPDATE `file_server` SET `serverType` = 'ftp' WHERE `serverType` = 'remote';

ALTER TABLE `file_server` ADD `sftpHost` VARCHAR( 255 ) NOT NULL AFTER `ftpPassword` ,
ADD `sftpPort` INT(11) NOT NULL DEFAULT '22' AFTER `sftpHost` ,
ADD `sftpUsername` VARCHAR( 50 ) NOT NULL AFTER `sftpPort` ,
ADD `sftpPassword` VARCHAR( 50 ) NOT NULL AFTER `sftpUsername`;

DROP TABLE IF EXISTS `plugin`;
CREATE TABLE `plugin` (
`id` INT( 11 ) NOT NULL AUTO_INCREMENT PRIMARY KEY ,
`plugin_name` VARCHAR( 150 ) NOT NULL ,
`folder_name` VARCHAR( 100 ) NOT NULL ,
`plugin_description` VARCHAR( 255 ) NOT NULL ,
`is_installed` INT( 1 ) NOT NULL DEFAULT '0',
`date_installed` TIMESTAMP NOT NULL
) ENGINE = MYISAM;

ALTER TABLE `plugin` ADD `plugin_settings` TEXT NOT NULL;
ALTER TABLE `plugin` ADD `plugin_enabled` INT( 1 ) NOT NULL DEFAULT '1';

ALTER TABLE `file` ADD `adminNotes` TEXT NOT NULL;

ALTER TABLE `file` ADD INDEX ( `userId` );
ALTER TABLE `file` ADD INDEX ( `statusId` );

INSERT INTO `site_config` (`id`, `config_key`, `config_value`, `config_description`, `availableValues`, `config_type`, `config_group`) VALUES (NULL, 'free_user_max_remote_urls', '5', 'The maximum remote urls a non/free user can specify at once.', '', 'integer', 'Free User Settings');
INSERT INTO `site_config` (`id`, `config_key`, `config_value`, `config_description`, `availableValues`, `config_type`, `config_group`) VALUES (NULL, 'premium_user_max_remote_urls', '50', 'The maximum remote urls a paid user can specify at once.', '', 'integer', 'Free User Settings');

ALTER TABLE `file` CHANGE `fileSize` `fileSize` BIGINT( 15 ) NULL DEFAULT NULL;
INSERT INTO `plugin` VALUES(NULL, 'PayPal Payment Integration', 'paypal', 'Accept payments using PayPal.', 1, NOW(), '{"paypal_email":"paypal@yoursite.com"}', 1);
UPDATE plugin p, site_config c SET p.plugin_settings = CONCAT('{"paypal_email":"', c.config_value, '"}') WHERE c.config_key = 'paypal_payments_email_address' AND p.folder_name = 'paypal';

INSERT INTO `site_config` (`id`, `config_key`, `config_value`, `config_description`, `availableValues`, `config_type`, `config_group`) VALUES (NULL, 'free_user_max_concurrent_uploads', '50', 'The maximum amount of files that can be uploaded at the same time for free users.', '', 'integer', 'Free User Settings');
INSERT INTO `site_config` (`id`, `config_key`, `config_value`, `config_description`, `availableValues`, `config_type`, `config_group`) VALUES (NULL, 'premium_user_max_concurrent_uploads', '100', 'The maximum amount of files that can be uploaded at the same time for paid users.', '', 'integer', 'Premium User Settings');

INSERT INTO `site_config` (`id`, `config_key`, `config_value`, `config_description`, `availableValues`, `config_type`, `config_group`) VALUES (NULL, 'register_form_show_captcha', 'no', 'Whether to display the captcha on the site registration form.', '["yes","no"]', 'select', 'Captcha');

DELETE FROM site_config WHERE config_key='paypal_payments_email_address';

INSERT INTO `site_config` (`id`, `config_key`, `config_value`, `config_description`, `availableValues`, `config_type`, `config_group`) VALUES (NULL, 'downloads_track_current_downloads', 'yes', 'Whether to track current downloads/connections in the admin area. Note: This should be enabled if you also want to limit concurrent download connections.', '["yes","no"]', 'select', 'File Downloads');

UPDATE `site_config` SET `config_description` = 'The maximum concurrent downloads a non/free user can do at once. Set to 0 (zero) for no limit. Note: Ensure the \'downloads_track_current_downloads\' is also set to ''yes'' to enable this.' WHERE `site_config`.`config_key` = 'free_user_max_download_threads';

INSERT INTO `site_config` (`id`, `config_key`, `config_value`, `config_description`, `availableValues`, `config_type`, `config_group`) VALUES (NULL, 'paid_user_max_download_threads', '0', 'The maximum concurrent downloads a paid user can do at once. Set to 0 (zero) for no limit. Note: Ensure the \'downloads_track_current_downloads\' is also set to \'yes\' to enable this.', '', 'integer', 'Premium User Settings');

INSERT INTO `site_config` (`id`, `config_key`, `config_value`, `config_description`, `availableValues`, `config_type`, `config_group`) VALUES (NULL, 'free_user_wait_between_downloads', '0', 'How long a free user must wait between downloads, in seconds. Set to 0 (zero) to disable. Note: Ensure the \'downloads_track_current_downloads\' is also set to \'yes\' to enable this.', '', 'integer', 'Free User Settings');

ALTER TABLE `file_server` CHANGE `ipAddress` `ipAddress` VARCHAR( 255 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL;

ALTER TABLE `file_server` CHANGE `serverType` `serverType` ENUM('remote','local','ftp','sftp','direct') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL;
ALTER TABLE `file_server`  ADD `fileServerDomainName` VARCHAR(255) NULL,  ADD `scriptPath` VARCHAR(150) NULL;
ALTER TABLE `file` ADD `accessPassword` VARCHAR( 32 ) NULL;

-- DROP TABLE IF EXISTS `session_transfer`;
-- CREATE TABLE `session_transfer` (`id` INT(11) NULL, `transfer_key` VARCHAR(32) NOT NULL, `session_id` VARCHAR(32) NOT NULL, PRIMARY KEY (`id`)) ENGINE = MyISAM;
-- ALTER TABLE `session_transfer`  ADD `date_added` TIMESTAMP NOT NULL;
-- ALTER TABLE `session_transfer` ADD INDEX ( `date_added` );
-- ALTER TABLE `session_transfer` ADD INDEX ( `session_id` );
-- ALTER TABLE `session_transfer` ADD INDEX ( `transfer_key` );
-- ALTER TABLE `session_transfer` CHANGE `id` `id` INT( 11 ) NOT NULL AUTO_INCREMENT;
