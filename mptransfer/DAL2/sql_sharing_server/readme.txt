Why: Enables multiple servers ina  cluster to share configuration



/usr/sbin/node /media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/sql_sharing_server/sql_sharing_server_tests_bulk_config.js
10.211.55.4 ip address
10.211.55.4 ip address
>>>*>  SQLSharingServer init  started server on 9991 (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/sql_sharing_server/sql_sharing_server.js:37:14)
>>>*>  SQLSharingServer identify  ip address 127.0.0.1:9991 (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/sql_sharing_server/sql_sharing_server.js:999:14)
....
....
undefined 'self peers' [ { b: ':9992' },
  { c: '127.0.0.1:9993' },
  { a: '127.0.0.1' },
  linkedToPeer: { b: { b: ':9992' }, c: { c: '127.0.0.1:9993' } } ]
>>>*>  SQLSharingServer identify a a foundPeerEntryForSelf true 2 :9992,127.0.0.1:9993 (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/sql_sharing_server/sql_sharing_server.js:1034:14)
DEPRECATION WARNING: The logging-option should be either a function or false. Default: console.log
10.211.55.4 ip address
>>>*>  SQLSharingServer init  started server on 9992 (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/sql_sharing_server/sql_sharing_server.js:37:14)
>>>*>  SQLSharingServer identify  ip address 127.0.0.1:9992 (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/sql_sharing_server/sql_sharing_server.js:999:14)
undefined 'self peers' [ { a: '127.0.0.1:9991' },
  { b: '' },
  linkedToPeer: { a: { a: '127.0.0.1:9991' } } ]
>>>*>  SQLSharingServer identify b b foundPeerEntryForSelf true 1 127.0.0.1:9991 (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/sql_sharing_server/sql_sharing_server.js:1034:14)
DEPRECATION WARNING: The logging-option should be either a function or false. Default: console.log
....
10.211.55.4 ip address
....
....
>>>*>  SQLSharingServer init  started server on 9993 (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/sql_sharing_server/sql_sharing_server.js:37:14)
>>>*>  SQLSharingServer identify  ip address 127.0.0.1:9993 (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/sql_sharing_server/sql_sharing_server.js:999:14)
undefined 'self peers' [ { a: '127.0.0.1:9991' },
  { d: '127.0.0.1:9994' },
  { c: '127.0.0.1' },
  linkedToPeer: { a: { a: '127.0.0.1:9991' }, d: { d: '127.0.0.1:9994' } } ]
>>>*>  SQLSharingServer identify c c foundPeerEntryForSelf true 2 127.0.0.1:9991,127.0.0.1:9994 (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/sql_sharing_server/sql_sharing_server.js:1034:14)
DEPRECATION WARNING: The logging-option should be either a function or false. Default: console.log
10.211.55.4 ip address
>>>*>  SQLSharingServer init  started server on 9994 (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/sql_sharing_server/sql_sharing_server.js:37:14)
>>>*>  SQLSharingServer identify  ip address 127.0.0.1:9994 (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/sql_sharing_server/sql_sharing_server.js:999:14)
undefined 'self peers' [ { c: '127.0.0.1:9993' },
  { e: '127.0.0.1:9995' },
  { d: '127.0.0.1' },
  linkedToPeer: { c: { c: '127.0.0.1:9993' }, e: { e: '127.0.0.1:9995' } } ]
>>>*>  SQLSharingServer identify d d foundPeerEntryForSelf true 2 127.0.0.1:9993,127.0.0.1:9995 (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/sql_sharing_server/sql_sharing_server.js:1034:14)
DEPRECATION WARNING: The logging-option should be either a function or false. Default: console.log
....
....
10.211.55.4 ip address
>>>*>  SQLSharingServer init  started server on 9995 (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/sql_sharing_server/sql_sharing_server.js:37:14)
>>>*>  SQLSharingServer identify  ip address 127.0.0.1:9995 (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/sql_sharing_server/sql_sharing_server.js:999:14)
undefined 'self peers' [ { d: '127.0.0.1:9994' },
  { e: '127.0.0.1' },
  linkedToPeer: { d: { d: '127.0.0.1:9994' } } ]
....
>>>*>  SQLSharingServer identify e e foundPeerEntryForSelf true 1 127.0.0.1:9994 (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/sql_sharing_server/sql_sharing_server.js:1034:14)
DEPRECATION WARNING: The logging-option should be either a function or false. Default: console.log
10.211.55.4
 ip address free space
10.211.55.4
 ip address free space
10.211.55.4
 ip address free space
10.211.55.4
 ip address free space
10.211.55.4
 ip address free space
10.211.55.4
 ip address free space
Executing (default): CREATE TABLE IF NOT EXISTS `Invite_Campaigns` (`id` INTEGER(11) NOT NULL , `name` VARCHAR(255), `creatorip` VARCHAR(255), `creator` VARCHAR(255), `datecreated` DATETIME NOT NULL, `dateupdated` DATETIME NOT NULL, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB COLLATE utf8_general_ci;
Executing (default): CREATE TABLE IF NOT EXISTS `Invite_Campaigns` (`id` INTEGER(11) NOT NULL , `name` VARCHAR(255), `creatorip` VARCHAR(255), `creator` VARCHAR(255), `datecreated` DATETIME NOT NULL, `dateupdated` DATETIME NOT NULL, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB COLLATE utf8_general_ci;
Executing (default): CREATE TABLE IF NOT EXISTS `Invite_Campaigns` (`id` INTEGER(11) NOT NULL , `name` VARCHAR(255), `creatorip` VARCHAR(255), `creator` VARCHAR(255), `datecreated` DATETIME NOT NULL, `dateupdated` DATETIME NOT NULL, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB COLLATE utf8_general_ci;
Executing (default): CREATE TABLE IF NOT EXISTS `Invite_Campaigns` (`id` INTEGER(11) NOT NULL , `name` VARCHAR(255), `creatorip` VARCHAR(255), `creator` VARCHAR(255), `datecreated` DATETIME NOT NULL, `dateupdated` DATETIME NOT NULL, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB COLLATE utf8_general_ci;
Executing (default): CREATE TABLE IF NOT EXISTS `Invite_Campaigns` (`id` INTEGER(11) NOT NULL , `name` VARCHAR(255), `creatorip` VARCHAR(255), `creator` VARCHAR(255), `datecreated` DATETIME NOT NULL, `dateupdated` DATETIME NOT NULL, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB COLLATE utf8_general_ci;
Executing (default): CREATE TABLE IF NOT EXISTS `Invite_Campaigns` (`id` INTEGER(11) NOT NULL , `name` VARCHAR(255), `creatorip` VARCHAR(255), `creator` VARCHAR(255), `datecreated` DATETIME NOT NULL, `dateupdated` DATETIME NOT NULL, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB COLLATE utf8_general_ci;
Executing (default): CREATE TABLE IF NOT EXISTS `Invite_Campaigns` (`id` INTEGER(11) NOT NULL , `name` VARCHAR(255), `creatorip` VARCHAR(255), `creator` VARCHAR(255), `datecreated` DATETIME NOT NULL, `dateupdated` DATETIME NOT NULL, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB COLLATE utf8_general_ci;
Executing (default): CREATE TABLE IF NOT EXISTS `Invite_Campaigns` (`id` INTEGER(11) NOT NULL , `name` VARCHAR(255), `creatorip` VARCHAR(255), `creator` VARCHAR(255), `datecreated` DATETIME NOT NULL, `dateupdated` DATETIME NOT NULL, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB COLLATE utf8_general_ci;
Executing (default): CREATE TABLE IF NOT EXISTS `Invite_Campaigns` (`id` INTEGER(11) NOT NULL , `name` VARCHAR(255), `creatorip` VARCHAR(255), `creator` VARCHAR(255), `datecreated` DATETIME NOT NULL, `dateupdated` DATETIME NOT NULL, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB COLLATE utf8_general_ci;
Executing (default): CREATE TABLE IF NOT EXISTS `Invite_Campaigns` (`id` INTEGER(11) NOT NULL , `name` VARCHAR(255), `creatorip` VARCHAR(255), `creator` VARCHAR(255), `datecreated` DATETIME NOT NULL, `dateupdated` DATETIME NOT NULL, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB COLLATE utf8_general_ci;
Executing (default): SHOW INDEX FROM `Invite_Campaigns`
Executing (default): SHOW INDEX FROM `Invite_Campaigns`
Executing (default): SHOW INDEX FROM `Invite_Campaigns`
Executing (default): SHOW INDEX FROM `Invite_Campaigns`
Executing (default): SHOW INDEX FROM `Invite_Campaigns`
Executing (default): SHOW INDEX FROM `Invite_Campaigns`
Executing (default): SHOW INDEX FROM `Invite_Campaigns`
Executing (default): SHOW INDEX FROM `Invite_Campaigns`
Executing (default): SHOW INDEX FROM `Invite_Campaigns`
Executing (default): SHOW INDEX FROM `Invite_Campaigns`
Executing (default): CREATE TABLE IF NOT EXISTS `Invites` (`id` INTEGER(11) NOT NULL , `invite_code` VARCHAR(255), `level` ENUM('FREE USER', 'INVITED', 'NEOPHITE', 'PAID USER', 'ADMIN'), `email` VARCHAR(255), `forumname` VARCHAR(255), `joindate` DATETIME, `trialExpire` DATETIME, `creatorip` VARCHAR(255), `creator` VARCHAR(255), `datecreated` DATETIME NOT NULL, `dateupdated` DATETIME NOT NULL, `InviteCampaignId` INTEGER(11), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`InviteCampaignId`) REFERENCES `Invite_Campaigns` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB COLLATE utf8_general_ci;
Executing (default): CREATE TABLE IF NOT EXISTS `Invites` (`id` INTEGER(11) NOT NULL , `invite_code` VARCHAR(255), `level` ENUM('FREE USER', 'INVITED', 'NEOPHITE', 'PAID USER', 'ADMIN'), `email` VARCHAR(255), `forumname` VARCHAR(255), `joindate` DATETIME, `trialExpire` DATETIME, `creatorip` VARCHAR(255), `creator` VARCHAR(255), `datecreated` DATETIME NOT NULL, `dateupdated` DATETIME NOT NULL, `InviteCampaignId` INTEGER(11), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`InviteCampaignId`) REFERENCES `Invite_Campaigns` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB COLLATE utf8_general_ci;
Executing (default): CREATE TABLE IF NOT EXISTS `Invites` (`id` INTEGER(11) NOT NULL , `invite_code` VARCHAR(255), `level` ENUM('FREE USER', 'INVITED', 'NEOPHITE', 'PAID USER', 'ADMIN'), `email` VARCHAR(255), `forumname` VARCHAR(255), `joindate` DATETIME, `trialExpire` DATETIME, `creatorip` VARCHAR(255), `creator` VARCHAR(255), `datecreated` DATETIME NOT NULL, `dateupdated` DATETIME NOT NULL, `InviteCampaignId` INTEGER(11), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`InviteCampaignId`) REFERENCES `Invite_Campaigns` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB COLLATE utf8_general_ci;
Executing (default): CREATE TABLE IF NOT EXISTS `Invites` (`id` INTEGER(11) NOT NULL , `invite_code` VARCHAR(255), `level` ENUM('FREE USER', 'INVITED', 'NEOPHITE', 'PAID USER', 'ADMIN'), `email` VARCHAR(255), `forumname` VARCHAR(255), `joindate` DATETIME, `trialExpire` DATETIME, `creatorip` VARCHAR(255), `creator` VARCHAR(255), `datecreated` DATETIME NOT NULL, `dateupdated` DATETIME NOT NULL, `InviteCampaignId` INTEGER(11), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`InviteCampaignId`) REFERENCES `Invite_Campaigns` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB COLLATE utf8_general_ci;
Executing (default): CREATE TABLE IF NOT EXISTS `Invites` (`id` INTEGER(11) NOT NULL , `invite_code` VARCHAR(255), `level` ENUM('FREE USER', 'INVITED', 'NEOPHITE', 'PAID USER', 'ADMIN'), `email` VARCHAR(255), `forumname` VARCHAR(255), `joindate` DATETIME, `trialExpire` DATETIME, `creatorip` VARCHAR(255), `creator` VARCHAR(255), `datecreated` DATETIME NOT NULL, `dateupdated` DATETIME NOT NULL, `InviteCampaignId` INTEGER(11), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`InviteCampaignId`) REFERENCES `Invite_Campaigns` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB COLLATE utf8_general_ci;
Executing (default): CREATE TABLE IF NOT EXISTS `Invites` (`id` INTEGER(11) NOT NULL , `invite_code` VARCHAR(255), `level` ENUM('FREE USER', 'INVITED', 'NEOPHITE', 'PAID USER', 'ADMIN'), `email` VARCHAR(255), `forumname` VARCHAR(255), `joindate` DATETIME, `trialExpire` DATETIME, `creatorip` VARCHAR(255), `creator` VARCHAR(255), `datecreated` DATETIME NOT NULL, `dateupdated` DATETIME NOT NULL, `InviteCampaignId` INTEGER(11), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`InviteCampaignId`) REFERENCES `Invite_Campaigns` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB COLLATE utf8_general_ci;
Executing (default): CREATE TABLE IF NOT EXISTS `Invites` (`id` INTEGER(11) NOT NULL , `invite_code` VARCHAR(255), `level` ENUM('FREE USER', 'INVITED', 'NEOPHITE', 'PAID USER', 'ADMIN'), `email` VARCHAR(255), `forumname` VARCHAR(255), `joindate` DATETIME, `trialExpire` DATETIME, `creatorip` VARCHAR(255), `creator` VARCHAR(255), `datecreated` DATETIME NOT NULL, `dateupdated` DATETIME NOT NULL, `InviteCampaignId` INTEGER(11), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`InviteCampaignId`) REFERENCES `Invite_Campaigns` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB COLLATE utf8_general_ci;
Executing (default): CREATE TABLE IF NOT EXISTS `Invites` (`id` INTEGER(11) NOT NULL , `invite_code` VARCHAR(255), `level` ENUM('FREE USER', 'INVITED', 'NEOPHITE', 'PAID USER', 'ADMIN'), `email` VARCHAR(255), `forumname` VARCHAR(255), `joindate` DATETIME, `trialExpire` DATETIME, `creatorip` VARCHAR(255), `creator` VARCHAR(255), `datecreated` DATETIME NOT NULL, `dateupdated` DATETIME NOT NULL, `InviteCampaignId` INTEGER(11), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`InviteCampaignId`) REFERENCES `Invite_Campaigns` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB COLLATE utf8_general_ci;
Executing (default): CREATE TABLE IF NOT EXISTS `Invites` (`id` INTEGER(11) NOT NULL , `invite_code` VARCHAR(255), `level` ENUM('FREE USER', 'INVITED', 'NEOPHITE', 'PAID USER', 'ADMIN'), `email` VARCHAR(255), `forumname` VARCHAR(255), `joindate` DATETIME, `trialExpire` DATETIME, `creatorip` VARCHAR(255), `creator` VARCHAR(255), `datecreated` DATETIME NOT NULL, `dateupdated` DATETIME NOT NULL, `InviteCampaignId` INTEGER(11), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`InviteCampaignId`) REFERENCES `Invite_Campaigns` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB COLLATE utf8_general_ci;
Executing (default): CREATE TABLE IF NOT EXISTS `Invites` (`id` INTEGER(11) NOT NULL , `invite_code` VARCHAR(255), `level` ENUM('FREE USER', 'INVITED', 'NEOPHITE', 'PAID USER', 'ADMIN'), `email` VARCHAR(255), `forumname` VARCHAR(255), `joindate` DATETIME, `trialExpire` DATETIME, `creatorip` VARCHAR(255), `creator` VARCHAR(255), `datecreated` DATETIME NOT NULL, `dateupdated` DATETIME NOT NULL, `InviteCampaignId` INTEGER(11), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`InviteCampaignId`) REFERENCES `Invite_Campaigns` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB COLLATE utf8_general_ci;
Executing (default): SHOW INDEX FROM `Invites`
Executing (default): SHOW INDEX FROM `Invites`
Executing (default): SHOW INDEX FROM `Invites`
Executing (default): SHOW INDEX FROM `Invites`
Executing (default): SHOW INDEX FROM `Invites`
Executing (default): SHOW INDEX FROM `Invites`
Executing (default): SHOW INDEX FROM `Invites`
Executing (default): SHOW INDEX FROM `Invites`
Executing (default): SHOW INDEX FROM `Invites`
Executing (default): SHOW INDEX FROM `Invites`
Executing (default): CREATE TABLE IF NOT EXISTS `users` (`id` INTEGER NOT NULL auto_increment , `username` VARCHAR(255) NOT NULL, `password` VARCHAR(255), `level` ENUM('FREE USER', 'INVITED', 'NEOPHITE', 'PAID USER', 'ADMIN'), `email` VARCHAR(255), `lastlogindate` DATETIME, `lastloginip` VARCHAR(255), `status` ENUM('ACTIVE', 'PENDING', 'DISABLED', 'SUSPENDED') NOT NULL DEFAULT 'active', `title` VARCHAR(255), `firstname` VARCHAR(255) DEFAULT '', `lastname` VARCHAR(255) DEFAULT '', `createdip` VARCHAR(255), `lastPayment` DATETIME DEFAULT NULL, `paidExpiryDate` DATETIME DEFAULT NULL, `paymentTracker` VARCHAR(255) DEFAULT '', `passwordResetHash` VARCHAR(255) DEFAULT '', `identifier` VARCHAR(255) DEFAULT '', `apikey` VARCHAR(255) DEFAULT '', PRIMARY KEY (`id`)) ENGINE=InnoDB COLLATE utf8_general_ci;
Executing (default): CREATE TABLE IF NOT EXISTS `users` (`id` INTEGER NOT NULL auto_increment , `username` VARCHAR(255) NOT NULL, `password` VARCHAR(255), `level` ENUM('FREE USER', 'INVITED', 'NEOPHITE', 'PAID USER', 'ADMIN'), `email` VARCHAR(255), `lastlogindate` DATETIME, `lastloginip` VARCHAR(255), `status` ENUM('ACTIVE', 'PENDING', 'DISABLED', 'SUSPENDED') NOT NULL DEFAULT 'active', `title` VARCHAR(255), `firstname` VARCHAR(255) DEFAULT '', `lastname` VARCHAR(255) DEFAULT '', `createdip` VARCHAR(255), `lastPayment` DATETIME DEFAULT NULL, `paidExpiryDate` DATETIME DEFAULT NULL, `paymentTracker` VARCHAR(255) DEFAULT '', `passwordResetHash` VARCHAR(255) DEFAULT '', `identifier` VARCHAR(255) DEFAULT '', `apikey` VARCHAR(255) DEFAULT '', PRIMARY KEY (`id`)) ENGINE=InnoDB COLLATE utf8_general_ci;
Executing (default): CREATE TABLE IF NOT EXISTS `users` (`id` INTEGER NOT NULL auto_increment , `username` VARCHAR(255) NOT NULL, `password` VARCHAR(255), `level` ENUM('FREE USER', 'INVITED', 'NEOPHITE', 'PAID USER', 'ADMIN'), `email` VARCHAR(255), `lastlogindate` DATETIME, `lastloginip` VARCHAR(255), `status` ENUM('ACTIVE', 'PENDING', 'DISABLED', 'SUSPENDED') NOT NULL DEFAULT 'active', `title` VARCHAR(255), `firstname` VARCHAR(255) DEFAULT '', `lastname` VARCHAR(255) DEFAULT '', `createdip` VARCHAR(255), `lastPayment` DATETIME DEFAULT NULL, `paidExpiryDate` DATETIME DEFAULT NULL, `paymentTracker` VARCHAR(255) DEFAULT '', `passwordResetHash` VARCHAR(255) DEFAULT '', `identifier` VARCHAR(255) DEFAULT '', `apikey` VARCHAR(255) DEFAULT '', PRIMARY KEY (`id`)) ENGINE=InnoDB COLLATE utf8_general_ci;
Executing (default): CREATE TABLE IF NOT EXISTS `users` (`id` INTEGER NOT NULL auto_increment , `username` VARCHAR(255) NOT NULL, `password` VARCHAR(255), `level` ENUM('FREE USER', 'INVITED', 'NEOPHITE', 'PAID USER', 'ADMIN'), `email` VARCHAR(255), `lastlogindate` DATETIME, `lastloginip` VARCHAR(255), `status` ENUM('ACTIVE', 'PENDING', 'DISABLED', 'SUSPENDED') NOT NULL DEFAULT 'active', `title` VARCHAR(255), `firstname` VARCHAR(255) DEFAULT '', `lastname` VARCHAR(255) DEFAULT '', `createdip` VARCHAR(255), `lastPayment` DATETIME DEFAULT NULL, `paidExpiryDate` DATETIME DEFAULT NULL, `paymentTracker` VARCHAR(255) DEFAULT '', `passwordResetHash` VARCHAR(255) DEFAULT '', `identifier` VARCHAR(255) DEFAULT '', `apikey` VARCHAR(255) DEFAULT '', PRIMARY KEY (`id`)) ENGINE=InnoDB COLLATE utf8_general_ci;
Executing (default): CREATE TABLE IF NOT EXISTS `users` (`id` INTEGER NOT NULL auto_increment , `username` VARCHAR(255) NOT NULL, `password` VARCHAR(255), `level` ENUM('FREE USER', 'INVITED', 'NEOPHITE', 'PAID USER', 'ADMIN'), `email` VARCHAR(255), `lastlogindate` DATETIME, `lastloginip` VARCHAR(255), `status` ENUM('ACTIVE', 'PENDING', 'DISABLED', 'SUSPENDED') NOT NULL DEFAULT 'active', `title` VARCHAR(255), `firstname` VARCHAR(255) DEFAULT '', `lastname` VARCHAR(255) DEFAULT '', `createdip` VARCHAR(255), `lastPayment` DATETIME DEFAULT NULL, `paidExpiryDate` DATETIME DEFAULT NULL, `paymentTracker` VARCHAR(255) DEFAULT '', `passwordResetHash` VARCHAR(255) DEFAULT '', `identifier` VARCHAR(255) DEFAULT '', `apikey` VARCHAR(255) DEFAULT '', PRIMARY KEY (`id`)) ENGINE=InnoDB COLLATE utf8_general_ci;
Executing (default): CREATE TABLE IF NOT EXISTS `users` (`id` INTEGER NOT NULL auto_increment , `username` VARCHAR(255) NOT NULL, `password` VARCHAR(255), `level` ENUM('FREE USER', 'INVITED', 'NEOPHITE', 'PAID USER', 'ADMIN'), `email` VARCHAR(255), `lastlogindate` DATETIME, `lastloginip` VARCHAR(255), `status` ENUM('ACTIVE', 'PENDING', 'DISABLED', 'SUSPENDED') NOT NULL DEFAULT 'active', `title` VARCHAR(255), `firstname` VARCHAR(255) DEFAULT '', `lastname` VARCHAR(255) DEFAULT '', `createdip` VARCHAR(255), `lastPayment` DATETIME DEFAULT NULL, `paidExpiryDate` DATETIME DEFAULT NULL, `paymentTracker` VARCHAR(255) DEFAULT '', `passwordResetHash` VARCHAR(255) DEFAULT '', `identifier` VARCHAR(255) DEFAULT '', `apikey` VARCHAR(255) DEFAULT '', PRIMARY KEY (`id`)) ENGINE=InnoDB COLLATE utf8_general_ci;
Executing (default): CREATE TABLE IF NOT EXISTS `users` (`id` INTEGER NOT NULL auto_increment , `username` VARCHAR(255) NOT NULL, `password` VARCHAR(255), `level` ENUM('FREE USER', 'INVITED', 'NEOPHITE', 'PAID USER', 'ADMIN'), `email` VARCHAR(255), `lastlogindate` DATETIME, `lastloginip` VARCHAR(255), `status` ENUM('ACTIVE', 'PENDING', 'DISABLED', 'SUSPENDED') NOT NULL DEFAULT 'active', `title` VARCHAR(255), `firstname` VARCHAR(255) DEFAULT '', `lastname` VARCHAR(255) DEFAULT '', `createdip` VARCHAR(255), `lastPayment` DATETIME DEFAULT NULL, `paidExpiryDate` DATETIME DEFAULT NULL, `paymentTracker` VARCHAR(255) DEFAULT '', `passwordResetHash` VARCHAR(255) DEFAULT '', `identifier` VARCHAR(255) DEFAULT '', `apikey` VARCHAR(255) DEFAULT '', PRIMARY KEY (`id`)) ENGINE=InnoDB COLLATE utf8_general_ci;
Executing (default): CREATE TABLE IF NOT EXISTS `users` (`id` INTEGER NOT NULL auto_increment , `username` VARCHAR(255) NOT NULL, `password` VARCHAR(255), `level` ENUM('FREE USER', 'INVITED', 'NEOPHITE', 'PAID USER', 'ADMIN'), `email` VARCHAR(255), `lastlogindate` DATETIME, `lastloginip` VARCHAR(255), `status` ENUM('ACTIVE', 'PENDING', 'DISABLED', 'SUSPENDED') NOT NULL DEFAULT 'active', `title` VARCHAR(255), `firstname` VARCHAR(255) DEFAULT '', `lastname` VARCHAR(255) DEFAULT '', `createdip` VARCHAR(255), `lastPayment` DATETIME DEFAULT NULL, `paidExpiryDate` DATETIME DEFAULT NULL, `paymentTracker` VARCHAR(255) DEFAULT '', `passwordResetHash` VARCHAR(255) DEFAULT '', `identifier` VARCHAR(255) DEFAULT '', `apikey` VARCHAR(255) DEFAULT '', PRIMARY KEY (`id`)) ENGINE=InnoDB COLLATE utf8_general_ci;
Executing (default): CREATE TABLE IF NOT EXISTS `users` (`id` INTEGER NOT NULL auto_increment , `username` VARCHAR(255) NOT NULL, `password` VARCHAR(255), `level` ENUM('FREE USER', 'INVITED', 'NEOPHITE', 'PAID USER', 'ADMIN'), `email` VARCHAR(255), `lastlogindate` DATETIME, `lastloginip` VARCHAR(255), `status` ENUM('ACTIVE', 'PENDING', 'DISABLED', 'SUSPENDED') NOT NULL DEFAULT 'active', `title` VARCHAR(255), `firstname` VARCHAR(255) DEFAULT '', `lastname` VARCHAR(255) DEFAULT '', `createdip` VARCHAR(255), `lastPayment` DATETIME DEFAULT NULL, `paidExpiryDate` DATETIME DEFAULT NULL, `paymentTracker` VARCHAR(255) DEFAULT '', `passwordResetHash` VARCHAR(255) DEFAULT '', `identifier` VARCHAR(255) DEFAULT '', `apikey` VARCHAR(255) DEFAULT '', PRIMARY KEY (`id`)) ENGINE=InnoDB COLLATE utf8_general_ci;
Executing (default): CREATE TABLE IF NOT EXISTS `users` (`id` INTEGER NOT NULL auto_increment , `username` VARCHAR(255) NOT NULL, `password` VARCHAR(255), `level` ENUM('FREE USER', 'INVITED', 'NEOPHITE', 'PAID USER', 'ADMIN'), `email` VARCHAR(255), `lastlogindate` DATETIME, `lastloginip` VARCHAR(255), `status` ENUM('ACTIVE', 'PENDING', 'DISABLED', 'SUSPENDED') NOT NULL DEFAULT 'active', `title` VARCHAR(255), `firstname` VARCHAR(255) DEFAULT '', `lastname` VARCHAR(255) DEFAULT '', `createdip` VARCHAR(255), `lastPayment` DATETIME DEFAULT NULL, `paidExpiryDate` DATETIME DEFAULT NULL, `paymentTracker` VARCHAR(255) DEFAULT '', `passwordResetHash` VARCHAR(255) DEFAULT '', `identifier` VARCHAR(255) DEFAULT '', `apikey` VARCHAR(255) DEFAULT '', PRIMARY KEY (`id`)) ENGINE=InnoDB COLLATE utf8_general_ci;
Executing (default): SHOW INDEX FROM `users`
Executing (default): SHOW INDEX FROM `users`
Executing (default): SHOW INDEX FROM `users`
Executing (default): SHOW INDEX FROM `users`
Executing (default): SHOW INDEX FROM `users`
Executing (default): SHOW INDEX FROM `users`
Executing (default): SHOW INDEX FROM `users`
Executing (default): SHOW INDEX FROM `users`
Executing (default): SHOW INDEX FROM `users`
Executing (default): SHOW INDEX FROM `users`
Executing (default): CREATE TABLE IF NOT EXISTS `aTables` (`id` INTEGER(10) NOT NULL auto_increment , `name` VARCHAR(255), `desc` VARCHAR(255), `user_id` VARCHAR(255), `imdb_id` VARCHAR(255), `content_id` VARCHAR(255), `progress` VARCHAR(255), `source_node` VARCHAR(255), `id_timestamp` VARCHAR(255), `updated_by_source` VARCHAR(255), `global_updated_at` DATETIME NOT NULL, `version` VARCHAR(255), `deleted` TINYINT(1), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB COLLATE utf8_general_ci;
Executing (default): CREATE TABLE IF NOT EXISTS `aTables` (`id` INTEGER(10) NOT NULL auto_increment , `name` VARCHAR(255), `desc` VARCHAR(255), `user_id` VARCHAR(255), `imdb_id` VARCHAR(255), `content_id` VARCHAR(255), `progress` VARCHAR(255), `source_node` VARCHAR(255), `id_timestamp` VARCHAR(255), `updated_by_source` VARCHAR(255), `global_updated_at` DATETIME NOT NULL, `version` VARCHAR(255), `deleted` TINYINT(1), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB COLLATE utf8_general_ci;
Executing (default): CREATE TABLE IF NOT EXISTS `bTables` (`id` INTEGER(10) NOT NULL auto_increment , `name` VARCHAR(255), `desc` VARCHAR(255), `user_id` VARCHAR(255), `imdb_id` VARCHAR(255), `content_id` VARCHAR(255), `progress` VARCHAR(255), `source_node` VARCHAR(255), `id_timestamp` VARCHAR(255), `updated_by_source` VARCHAR(255), `global_updated_at` DATETIME NOT NULL, `version` VARCHAR(255), `deleted` TINYINT(1), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB COLLATE utf8_general_ci;
Executing (default): CREATE TABLE IF NOT EXISTS `bTables` (`id` INTEGER(10) NOT NULL auto_increment , `name` VARCHAR(255), `desc` VARCHAR(255), `user_id` VARCHAR(255), `imdb_id` VARCHAR(255), `content_id` VARCHAR(255), `progress` VARCHAR(255), `source_node` VARCHAR(255), `id_timestamp` VARCHAR(255), `updated_by_source` VARCHAR(255), `global_updated_at` DATETIME NOT NULL, `version` VARCHAR(255), `deleted` TINYINT(1), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB COLLATE utf8_general_ci;
Executing (default): CREATE TABLE IF NOT EXISTS `cTables` (`id` INTEGER(10) NOT NULL auto_increment , `name` VARCHAR(255), `desc` VARCHAR(255), `user_id` VARCHAR(255), `imdb_id` VARCHAR(255), `content_id` VARCHAR(255), `progress` VARCHAR(255), `source_node` VARCHAR(255), `id_timestamp` VARCHAR(255), `updated_by_source` VARCHAR(255), `global_updated_at` DATETIME NOT NULL, `version` VARCHAR(255), `deleted` TINYINT(1), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB COLLATE utf8_general_ci;
Executing (default): CREATE TABLE IF NOT EXISTS `cTables` (`id` INTEGER(10) NOT NULL auto_increment , `name` VARCHAR(255), `desc` VARCHAR(255), `user_id` VARCHAR(255), `imdb_id` VARCHAR(255), `content_id` VARCHAR(255), `progress` VARCHAR(255), `source_node` VARCHAR(255), `id_timestamp` VARCHAR(255), `updated_by_source` VARCHAR(255), `global_updated_at` DATETIME NOT NULL, `version` VARCHAR(255), `deleted` TINYINT(1), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB COLLATE utf8_general_ci;
Executing (default): CREATE TABLE IF NOT EXISTS `dTables` (`id` INTEGER(10) NOT NULL auto_increment , `name` VARCHAR(255), `desc` VARCHAR(255), `user_id` VARCHAR(255), `imdb_id` VARCHAR(255), `content_id` VARCHAR(255), `progress` VARCHAR(255), `source_node` VARCHAR(255), `id_timestamp` VARCHAR(255), `updated_by_source` VARCHAR(255), `global_updated_at` DATETIME NOT NULL, `version` VARCHAR(255), `deleted` TINYINT(1), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB COLLATE utf8_general_ci;
Executing (default): CREATE TABLE IF NOT EXISTS `eTables` (`id` INTEGER(10) NOT NULL auto_increment , `name` VARCHAR(255), `desc` VARCHAR(255), `user_id` VARCHAR(255), `imdb_id` VARCHAR(255), `content_id` VARCHAR(255), `progress` VARCHAR(255), `source_node` VARCHAR(255), `id_timestamp` VARCHAR(255), `updated_by_source` VARCHAR(255), `global_updated_at` DATETIME NOT NULL, `version` VARCHAR(255), `deleted` TINYINT(1), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB COLLATE utf8_general_ci;
Executing (default): CREATE TABLE IF NOT EXISTS `eTables` (`id` INTEGER(10) NOT NULL auto_increment , `name` VARCHAR(255), `desc` VARCHAR(255), `user_id` VARCHAR(255), `imdb_id` VARCHAR(255), `content_id` VARCHAR(255), `progress` VARCHAR(255), `source_node` VARCHAR(255), `id_timestamp` VARCHAR(255), `updated_by_source` VARCHAR(255), `global_updated_at` DATETIME NOT NULL, `version` VARCHAR(255), `deleted` TINYINT(1), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB COLLATE utf8_general_ci;
Executing (default): SHOW INDEX FROM `aTables`
Executing (default): SHOW INDEX FROM `aTables`
Executing (default): SHOW INDEX FROM `bTables`
Executing (default): SHOW INDEX FROM `bTables`
Executing (default): SHOW INDEX FROM `cTables`
Executing (default): SHOW INDEX FROM `cTables`
Executing (default): SHOW INDEX FROM `dTables`
Executing (default): SHOW INDEX FROM `eTables`
Executing (default): SHOW INDEX FROM `eTables`
Executing (default): CREATE TABLE IF NOT EXISTS `dTables` (`id` INTEGER(10) NOT NULL auto_increment , `name` VARCHAR(255), `desc` VARCHAR(255), `user_id` VARCHAR(255), `imdb_id` VARCHAR(255), `content_id` VARCHAR(255), `progress` VARCHAR(255), `source_node` VARCHAR(255), `id_timestamp` VARCHAR(255), `updated_by_source` VARCHAR(255), `global_updated_at` DATETIME NOT NULL, `version` VARCHAR(255), `deleted` TINYINT(1), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB COLLATE utf8_general_ci;
Executing (default): SHOW INDEX FROM `dTables`
Connection has been established successfully.
table ready
Connection has been established successfully.
table ready
Connection has been established successfully.
table ready
Connection has been established successfully.
table ready
Connection has been established successfully.
table ready
blocking is  true for c
Executing (default): DELETE FROM `aTables`
>>>*>  /media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/sql_sharing_server/sql_sharing_server js:1574:26 a all records destroyed (undefined
Executing (default): DELETE FROM `bTables`
>>>*>  /media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/sql_sharing_server/sql_sharing_server js:1574:26 b all records destroyed (undefined
Executing (default): DELETE FROM `cTables`
>>>*>  /media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/sql_sharing_server/sql_sharing_server js:1574:26 c all records destroyed (undefined
Executing (default): DELETE FROM `dTables`
>>>*>  /media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/sql_sharing_server/sql_sharing_server js:1574:26 d all records destroyed (undefined
Executing (default): DELETE FROM `eTables`
>>>*>  /media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/sql_sharing_server/sql_sharing_server js:1574:26 e all records destroyed (undefined
>>>*>  syncPeer  b syninc peer 127.0.0.1:9991 (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/sql_sharing_server/sql_sharing_server.js:649:26)
>>>*>  Object getCount [as handle] a who is request from b (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/sql_sharing_server/sql_sharing_server.js:550:18)
Executing (default): SELECT count(*) AS `count` FROM `aTables` AS `aTable`;
Issue with:http://127.0.0.1:9991/count
>>>*>  Object onQuickRequestResponse [as fx2] http://127.0.0.1:9991/count (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/node_modules/shelpers/lib/EasyRemoteTester.js:90:26)
Executing (default): SELECT `id`, `name`, `desc`, `user_id`, `imdb_id`, `content_id`, `progress`, `source_node`, `id_timestamp`, `updated_by_source`, `global_updated_at`, `version`, `deleted`, `createdAt`, `updatedAt` FROM `aTables` AS `aTable` ORDER BY `global_updated_at`, `DESC` LIMIT 1000;
>>>*>  Object onQuickRequestResponse [as fx2] http://127.0.0.1:9991/getNextPage?a=b__a&of=0 (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/node_modules/shelpers/lib/EasyRemoteTester.js:90:26)
Executing (default): SELECT count(*) AS `count` FROM `bTables` AS `bTable`;
>>>*>  allDone  b all records synced (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/sql_sharing_server/sql_sharing_server.js:654:26)
Executing (default): INSERT INTO `aTables` (`id`,`name`,`source_node`,`id_timestamp`,`global_updated_at`,`createdAt`,`updatedAt`) VALUES (NULL,'test new','a','Sun Jan 24 2016 21:52:59 GMT-0500 (EST)_0.633336768951267_0.002477402100339532','2016-01-25 02:52:59','2016-01-25 02:52:59','2016-01-25 02:52:59');
>>>*>  /media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/sql_sharing_server/sql_sharing_server js:1335:26 a all records created 1 (undefined
Executing (default): DELETE FROM `aTables`
>>>*>  /media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/sql_sharing_server/sql_sharing_server js:1574:26 a all records destroyed (undefined
Executing (default): DELETE FROM `bTables`
>>>*>  /media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/sql_sharing_server/sql_sharing_server js:1574:26 b all records destroyed (undefined
Executing (default): DELETE FROM `cTables`
>>>*>  /media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/sql_sharing_server/sql_sharing_server js:1574:26 c all records destroyed (undefined
Executing (default): DELETE FROM `dTables`
>>>*>  /media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/sql_sharing_server/sql_sharing_server js:1574:26 d all records destroyed (undefined
Executing (default): DELETE FROM `eTables`
>>>*>  /media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/sql_sharing_server/sql_sharing_server js:1574:26 e all records destroyed (undefined
>>>*>  Object getCount [as handle] b who is request from  (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/sql_sharing_server/sql_sharing_server.js:550:18)
Executing (default): SELECT count(*) AS `count` FROM `bTables` AS `bTable`;
Issue with:http://127.0.0.1:9992/count
>>>*>  Object onQuickRequestResponse [as fx2] http://127.0.0.1:9992/count (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/node_modules/shelpers/lib/EasyRemoteTester.js:90:26)
>>>*>  Object getCount [as handle] b who is request from  (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/sql_sharing_server/sql_sharing_server.js:550:18)
Executing (default): SELECT count(*) AS `count` FROM `bTables` AS `bTable`;
>>>*>  self startNextMethod [as _onTimeout] ***Chain Complete TestInSync (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/node_modules/shelpers/lib/PromiseHelperV3.js:57:30)
>>>*>  Object onQuickRequestResponse [as fx2] http://127.0.0.1:9992/count (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/node_modules/shelpers/lib/EasyRemoteTester.js:90:26)
Issue with:http://127.0.0.1:9992/count
>>>*>  self startNextMethod [as _onTimeout] ***Chain Complete TestInSync (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/node_modules/shelpers/lib/PromiseHelperV3.js:57:30)
>>>*>  Object getCount [as handle] b who is request from  (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/sql_sharing_server/sql_sharing_server.js:550:18)
Executing (default): SELECT count(*) AS `count` FROM `bTables` AS `bTable`;
>>>*>  Object onQuickRequestResponse [as fx2] http://127.0.0.1:9992/count (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/node_modules/shelpers/lib/EasyRemoteTester.js:90:26)
Issue with:http://127.0.0.1:9992/count
>>>*>  self startNextMethod [as _onTimeout] ***Chain Complete TestInSync (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/node_modules/shelpers/lib/PromiseHelperV3.js:57:30)
>>>*>  Object getCount [as handle] b who is request from  (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/sql_sharing_server/sql_sharing_server.js:550:18)
Executing (default): SELECT count(*) AS `count` FROM `bTables` AS `bTable`;
Issue with:http://127.0.0.1:9992/count
>>>*>  Object onQuickRequestResponse [as fx2] http://127.0.0.1:9992/count (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/node_modules/shelpers/lib/EasyRemoteTester.js:90:26)
>>>*>  self startNextMethod [as _onTimeout] ***Chain Complete TestInSync (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/node_modules/shelpers/lib/PromiseHelperV3.js:57:30)
>>>*>  Object getCount [as handle] b who is request from  (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/sql_sharing_server/sql_sharing_server.js:550:18)
Executing (default): SELECT count(*) AS `count` FROM `bTables` AS `bTable`;
Issue with:http://127.0.0.1:9992/count
>>>*>  Object onQuickRequestResponse [as fx2] http://127.0.0.1:9992/count (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/node_modules/shelpers/lib/EasyRemoteTester.js:90:26)
---------->counts counts on start { a: { count: 0 },
  b: { count: 0 },
  c: { count: 0 },
  d: { count: 0 },
  e: { count: 0 } }
>>>*>  self startNextMethod [as _onTimeout] ***Chain Complete TestInSync (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/node_modules/shelpers/lib/PromiseHelperV3.js:57:30)
>>>*>  verifySyncPeer  b verifying peer 127.0.0.1:9991 (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/sql_sharing_server/sql_sharing_server.js:846:26)
>>>*>  Object getCount [as handle] a who is request from b (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/sql_sharing_server/sql_sharing_server.js:550:18)
Executing (default): SELECT count(*) AS `count` FROM `aTables` AS `aTable`;
>>>*>  Object onQuickRequestResponse [as fx2] http://127.0.0.1:9991/count (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/node_modules/shelpers/lib/EasyRemoteTester.js:90:26)
Issue with:http://127.0.0.1:9991/count
Executing (default): SELECT `id`, `name`, `desc`, `user_id`, `imdb_id`, `content_id`, `progress`, `source_node`, `id_timestamp`, `updated_by_source`, `global_updated_at`, `version`, `deleted`, `createdAt`, `updatedAt` FROM `aTables` AS `aTable` ORDER BY `global_updated_at`, `DESC` LIMIT 1000;
>>>*>  Object onQuickRequestResponse [as fx2] http://127.0.0.1:9991/getNextPage?a=b__a&of=0 (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/node_modules/shelpers/lib/EasyRemoteTester.js:90:26)
>>>*>  verifySync  b verifying b 0 127.0.0.1:9991 0 (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/sql_sharing_server/sql_sharing_server.js:973:22)
true
>>>*>  allDone  b all records verified (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/sql_sharing_server/sql_sharing_server.js:855:26)
>>>*>  Object onQuickRequestResponse [as fx2] http://127.0.0.1:9992/verifySync (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/node_modules/shelpers/lib/EasyRemoteTester.js:90:26)
Issue with:http://127.0.0.1:9992/verifySync
>>>*>  Object atomicAction [as handle] c c block (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/sql_sharing_server/sql_sharing_server.js:362:22)
{ [Error: ETIMEDOUT] code: 'ETIMEDOUT' }
response is null
Issue with:http://127.0.0.1:9991/atomicAction?0=a&type=update
>>>*>  Object onQuickRequestResponse [as fx2] http://127.0.0.1:9991/atomicAction?0=a&type=update (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/node_modules/shelpers/lib/EasyRemoteTester.js:90:26)
>>>*>  self startNextMethod [as _onTimeout] ***Chain Complete Commit atomic on peers (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/node_modules/shelpers/lib/PromiseHelperV3.js:57:30)
{ [Error: ESOCKETTIMEDOUT] code: 'ESOCKETTIMEDOUT' }
response is null
Executing (default): SELECT `id`, `name`, `desc`, `user_id`, `imdb_id`, `content_id`, `progress`, `source_node`, `id_timestamp`, `updated_by_source`, `global_updated_at`, `version`, `deleted`, `createdAt`, `updatedAt` FROM `bTables` AS `bTable` WHERE (`bTable`.`id_timestamp` = 'Sun Jan 24 2016 21:52:58 GMT-0500 (EST)_0.15028579835779965_0.2215316544752568' AND `bTable`.`source_node` = 'b');
>>>*>  Object onQuickRequestResponse [as fx2] http://127.0.0.1:9993/atomicAction?0=c&type=update (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/node_modules/shelpers/lib/EasyRemoteTester.js:90:26)
Issue with:http://127.0.0.1:9993/atomicAction?0=c&type=update
>>>*>  null <anonymous> b found existing records (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/sql_sharing_server/sql_sharing_server.js:1231:30)
Executing (default): INSERT INTO `bTables` (`id`,`name`,`source_node`,`id_timestamp`,`global_updated_at`,`createdAt`,`updatedAt`) VALUES (NULL,'yyy2','b','Sun Jan 24 2016 21:52:58 GMT-0500 (EST)_0.15028579835779965_0.2215316544752568','2016-01-25 02:52:58','2016-01-25 02:53:05','2016-01-25 02:53:05');
>>>*>  /media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/sql_sharing_server/sql_sharing_server js:1292:34 b all records created 1 (undefined
>>>*>  upserted  b return b (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/sql_sharing_server/sql_sharing_server.js:483:30)
done2 update b
>>>*>  Object onQuickRequestResponse [as fx2] http://127.0.0.1:9992/atomicAction (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/node_modules/shelpers/lib/EasyRemoteTester.js:90:26)
>>>*>  self startNextMethod [as _onTimeout] ***Chain Complete Purge records on peers (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/node_modules/shelpers/lib/PromiseHelperV3.js:57:30)
Executing (default): SELECT `id`, `name`, `desc`, `user_id`, `imdb_id`, `content_id`, `progress`, `source_node`, `id_timestamp`, `updated_by_source`, `global_updated_at`, `version`, `deleted`, `createdAt`, `updatedAt` FROM `aTables` AS `aTable` WHERE (`aTable`.`id_timestamp` = 'Sun Jan 24 2016 21:52:58 GMT-0500 (EST)_0.15028579835779965_0.2215316544752568' AND `aTable`.`source_node` = 'b');
Issue with:http://127.0.0.1:9992/atomicAction
>>>*>  null <anonymous> a found existing records (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/sql_sharing_server/sql_sharing_server.js:1231:30)
Executing (default): INSERT INTO `aTables` (`id`,`name`,`source_node`,`id_timestamp`,`global_updated_at`,`createdAt`,`updatedAt`) VALUES (NULL,'yyy2','b','Sun Jan 24 2016 21:52:58 GMT-0500 (EST)_0.15028579835779965_0.2215316544752568','2016-01-25 02:52:58','2016-01-25 02:53:05','2016-01-25 02:53:05');
done2 update a
>>>*>  /media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/sql_sharing_server/sql_sharing_server js:1292:34 a all records created 1 (undefined
>>>*>  upserted  a return a (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/sql_sharing_server/sql_sharing_server.js:483:30)
>>>*>  Object atomicAction [as handle] c c block (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/sql_sharing_server/sql_sharing_server.js:362:22)
>>>*>  Object onQuickRequestResponse [as fx2] http://127.0.0.1:9991/atomicAction?0=a&type=update (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/node_modules/shelpers/lib/EasyRemoteTester.js:90:26)
{ [Error: ETIMEDOUT] code: 'ETIMEDOUT' }
response is null
Issue with:http://127.0.0.1:9991/atomicAction?0=a&type=update
>>>*>  self startNextMethod [as _onTimeout] ***Chain Complete Commit atomic on peers (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/node_modules/shelpers/lib/PromiseHelperV3.js:57:30)
Executing (default): SELECT `id`, `name`, `desc`, `user_id`, `imdb_id`, `content_id`, `progress`, `source_node`, `id_timestamp`, `updated_by_source`, `global_updated_at`, `version`, `deleted`, `createdAt`, `updatedAt` FROM `bTables` AS `bTable` WHERE (`bTable`.`id_timestamp` = 'Sun Jan 24 2016 21:52:58 GMT-0500 (EST)_0.006601016037166119_0.513677337905392' AND `bTable`.`source_node` = 'b');
{ [Error: ESOCKETTIMEDOUT] code: 'ESOCKETTIMEDOUT' }
response is null
Issue with:http://127.0.0.1:9993/atomicAction?0=c&type=update
>>>*>  Object onQuickRequestResponse [as fx2] http://127.0.0.1:9993/atomicAction?0=c&type=update (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/node_modules/shelpers/lib/EasyRemoteTester.js:90:26)
>>>*>  null <anonymous> b found existing records (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/sql_sharing_server/sql_sharing_server.js:1231:30)
Executing (default): INSERT INTO `bTables` (`id`,`name`,`source_node`,`id_timestamp`,`global_updated_at`,`createdAt`,`updatedAt`) VALUES (NULL,'yyy2','b','Sun Jan 24 2016 21:52:58 GMT-0500 (EST)_0.006601016037166119_0.513677337905392','2016-01-25 02:52:58','2016-01-25 02:53:08','2016-01-25 02:53:08');
>>>*>  /media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/sql_sharing_server/sql_sharing_server js:1292:34 b all records created 1 (undefined
>>>*>  upserted  b return b (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/sql_sharing_server/sql_sharing_server.js:483:30)
>>>*>  Object onQuickRequestResponse [as fx2] http://127.0.0.1:9992/atomicAction (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/node_modules/shelpers/lib/EasyRemoteTester.js:90:26)
done2 update b
Issue with:http://127.0.0.1:9992/atomicAction
>>>*>  self startNextMethod [as _onTimeout] ***Chain Complete Purge records on peers (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/node_modules/shelpers/lib/PromiseHelperV3.js:57:30)
Executing (default): SELECT `id`, `name`, `desc`, `user_id`, `imdb_id`, `content_id`, `progress`, `source_node`, `id_timestamp`, `updated_by_source`, `global_updated_at`, `version`, `deleted`, `createdAt`, `updatedAt` FROM `aTables` AS `aTable` WHERE (`aTable`.`id_timestamp` = 'Sun Jan 24 2016 21:52:58 GMT-0500 (EST)_0.006601016037166119_0.513677337905392' AND `aTable`.`source_node` = 'b');
>>>*>  null <anonymous> a found existing records (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/sql_sharing_server/sql_sharing_server.js:1231:30)
Executing (default): INSERT INTO `aTables` (`id`,`name`,`source_node`,`id_timestamp`,`global_updated_at`,`createdAt`,`updatedAt`) VALUES (NULL,'yyy2','b','Sun Jan 24 2016 21:52:58 GMT-0500 (EST)_0.006601016037166119_0.513677337905392','2016-01-25 02:52:58','2016-01-25 02:53:08','2016-01-25 02:53:08');
done2 update a
>>>*>  /media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/sql_sharing_server/sql_sharing_server js:1292:34 a all records created 1 (undefined
>>>*>  upserted  a return a (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/sql_sharing_server/sql_sharing_server.js:483:30)
>>>*>  Object atomicAction [as handle] c c block (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/sql_sharing_server/sql_sharing_server.js:362:22)
{ [Error: ETIMEDOUT] code: 'ETIMEDOUT' }
>>>*>  Object onQuickRequestResponse [as fx2] http://127.0.0.1:9991/atomicAction?0=a&type=delete (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/node_modules/shelpers/lib/EasyRemoteTester.js:90:26)
response is null
Issue with:http://127.0.0.1:9991/atomicAction?0=a&type=delete
>>>*>  self startNextMethod [as _onTimeout] ***Chain Complete Commit atomic on peers (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/node_modules/shelpers/lib/PromiseHelperV3.js:57:30)
Executing (default): SELECT `id`, `name`, `desc`, `user_id`, `imdb_id`, `content_id`, `progress`, `source_node`, `id_timestamp`, `updated_by_source`, `global_updated_at`, `version`, `deleted`, `createdAt`, `updatedAt` FROM `bTables` AS `bTable` WHERE `bTable`.`id_timestamp` IN ('Sun Jan 24 2016 21:52:58 GMT-0500 (EST)_0.15028579835779965_0.2215316544752568');
{ [Error: ESOCKETTIMEDOUT] code: 'ESOCKETTIMEDOUT' }
response is null
Executing (default): DELETE FROM `bTables` WHERE `id_timestamp` IN ('Sun Jan 24 2016 21:52:58 GMT-0500 (EST)_0.15028579835779965_0.2215316544752568')
>>>*>  Object onQuickRequestResponse [as fx2] http://127.0.0.1:9993/atomicAction?0=c&type=delete (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/node_modules/shelpers/lib/EasyRemoteTester.js:90:26)
Issue with:http://127.0.0.1:9993/atomicAction?0=c&type=delete
>>>*>  Object onQuickRequestResponse [as fx2] http://127.0.0.1:9992/atomicAction (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/node_modules/shelpers/lib/EasyRemoteTester.js:90:26)
Issue with:http://127.0.0.1:9992/atomicAction
>>>*>  self startNextMethod [as _onTimeout] ***Chain Complete Purge records on peers (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/node_modules/shelpers/lib/PromiseHelperV3.js:57:30)
Executing (default): SELECT `id`, `name`, `desc`, `user_id`, `imdb_id`, `content_id`, `progress`, `source_node`, `id_timestamp`, `updated_by_source`, `global_updated_at`, `version`, `deleted`, `createdAt`, `updatedAt` FROM `aTables` AS `aTable` WHERE `aTable`.`id_timestamp` IN ('Sun Jan 24 2016 21:52:58 GMT-0500 (EST)_0.15028579835779965_0.2215316544752568');
Executing (default): DELETE FROM `aTables` WHERE `id_timestamp` IN ('Sun Jan 24 2016 21:52:58 GMT-0500 (EST)_0.15028579835779965_0.2215316544752568')
Executing (default): SELECT count(*) AS `count` FROM `aTables` AS `aTable`;
>>>*>  Object getCount [as handle] b who is request from  (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/sql_sharing_server/sql_sharing_server.js:550:18)
Executing (default): SELECT count(*) AS `count` FROM `bTables` AS `bTable`;
Issue with:http://127.0.0.1:9992/count
>>>*>  Object onQuickRequestResponse [as fx2] http://127.0.0.1:9992/count (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/node_modules/shelpers/lib/EasyRemoteTester.js:90:26)
>>>*>  self startNextMethod [as _onTimeout] ***Chain Complete TestInSync (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/node_modules/shelpers/lib/PromiseHelperV3.js:57:30)
>>>*>  Object getCount [as handle] b who is request from  (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/sql_sharing_server/sql_sharing_server.js:550:18)
Issue with:http://127.0.0.1:9992/count
Executing (default): SELECT count(*) AS `count` FROM `bTables` AS `bTable`;
>>>*>  Object onQuickRequestResponse [as fx2] http://127.0.0.1:9992/count (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/node_modules/shelpers/lib/EasyRemoteTester.js:90:26)
>>>*>  self startNextMethod [as _onTimeout] ***Chain Complete TestInSync (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/node_modules/shelpers/lib/PromiseHelperV3.js:57:30)
>>>*>  Object getCount [as handle] b who is request from  (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/sql_sharing_server/sql_sharing_server.js:550:18)
Executing (default): SELECT count(*) AS `count` FROM `bTables` AS `bTable`;
>>>*>  Object onQuickRequestResponse [as fx2] http://127.0.0.1:9992/count (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/node_modules/shelpers/lib/EasyRemoteTester.js:90:26)
Issue with:http://127.0.0.1:9992/count
>>>*>  self startNextMethod [as _onTimeout] ***Chain Complete TestInSync (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/node_modules/shelpers/lib/PromiseHelperV3.js:57:30)
>>>*>  Object getCount [as handle] b who is request from  (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/sql_sharing_server/sql_sharing_server.js:550:18)
Executing (default): SELECT count(*) AS `count` FROM `bTables` AS `bTable`;
>>>*>  Object onQuickRequestResponse [as fx2] http://127.0.0.1:9992/count (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/node_modules/shelpers/lib/EasyRemoteTester.js:90:26)
Issue with:http://127.0.0.1:9992/count
>>>*>  self startNextMethod [as _onTimeout] ***Chain Complete TestInSync (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/node_modules/shelpers/lib/PromiseHelperV3.js:57:30)
>>>*>  Object getCount [as handle] b who is request from  (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/sql_sharing_server/sql_sharing_server.js:550:18)
Executing (default): SELECT count(*) AS `count` FROM `bTables` AS `bTable`;
Issue with:http://127.0.0.1:9992/count
>>>*>  Object onQuickRequestResponse [as fx2] http://127.0.0.1:9992/count (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/node_modules/shelpers/lib/EasyRemoteTester.js:90:26)
---------->counts undefined { a: { count: 1 },
  b: { count: 1 },
  c: { count: 1 },
  d: { count: 1 },
  e: { count: 1 } }
>>>*>  self startNextMethod [as _onTimeout] ***Chain Complete TestInSync (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/node_modules/shelpers/lib/PromiseHelperV3.js:57:30)
>>>*>  verifySyncPeer  b verifying peer 127.0.0.1:9991 (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/sql_sharing_server/sql_sharing_server.js:846:26)
>>>*>  Object getCount [as handle] a who is request from b (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/sql_sharing_server/sql_sharing_server.js:550:18)
Executing (default): SELECT count(*) AS `count` FROM `aTables` AS `aTable`;
>>>*>  Object onQuickRequestResponse [as fx2] http://127.0.0.1:9991/count (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/node_modules/shelpers/lib/EasyRemoteTester.js:90:26)
Issue with:http://127.0.0.1:9991/count
Executing (default): SELECT `id`, `name`, `desc`, `user_id`, `imdb_id`, `content_id`, `progress`, `source_node`, `id_timestamp`, `updated_by_source`, `global_updated_at`, `version`, `deleted`, `createdAt`, `updatedAt` FROM `aTables` AS `aTable` ORDER BY `global_updated_at`, `DESC` LIMIT 1000;
>>>*>  Object onQuickRequestResponse [as fx2] http://127.0.0.1:9991/getNextPage?a=b__a&of=0 (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/node_modules/shelpers/lib/EasyRemoteTester.js:90:26)
Executing (default): SELECT `id`, `name`, `desc`, `user_id`, `imdb_id`, `content_id`, `progress`, `source_node`, `id_timestamp`, `updated_by_source`, `global_updated_at`, `version`, `deleted`, `createdAt`, `updatedAt` FROM `aTables` AS `aTable` ORDER BY `global_updated_at`, `DESC` LIMIT 1, 1000;
>>>*>  Object onQuickRequestResponse [as fx2] http://127.0.0.1:9991/getNextPage?a=b__a&of=1 (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/node_modules/shelpers/lib/EasyRemoteTester.js:90:26)
Executing (default): SELECT `id`, `name`, `desc`, `user_id`, `imdb_id`, `content_id`, `progress`, `source_node`, `id_timestamp`, `updated_by_source`, `global_updated_at`, `version`, `deleted`, `createdAt`, `updatedAt` FROM `bTables` AS `bTable` WHERE `bTable`.`global_updated_at` >= '2016-01-25 02:52:58' AND (`bTable`.`global_updated_at` <= '2016-01-25 02:52:58') ORDER BY `global_updated_at`, `DESC`;
>>>*>  verifySync  b verifying b 1 127.0.0.1:9991 1 (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/sql_sharing_server/sql_sharing_server.js:973:22)
true
>>>*>  allDone  b all records verified (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/sql_sharing_server/sql_sharing_server.js:855:26)
>>>*>  Object onQuickRequestResponse [as fx2] http://127.0.0.1:9992/verifySync (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/node_modules/shelpers/lib/EasyRemoteTester.js:90:26)
Issue with:http://127.0.0.1:9992/verifySync
>>>*>  self startNextMethod [as _onTimeout] ***Chain Complete Test Channel Server basics (/media/psf/Dropbox/projects/ritv2/videoproject/Code/node_scripts/node_modules/shelpers/lib/PromiseHelperV3.js:57:30)
