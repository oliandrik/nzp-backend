"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EServiceType = exports.EServiceStatus = exports.EServiceLinkDuplicate = exports.EServiceCancel = exports.EServiceDripFeed = exports.EServiceMode = void 0;
var EServiceMode;
(function (EServiceMode) {
    EServiceMode[EServiceMode["AUTO"] = 1] = "AUTO";
    EServiceMode[EServiceMode["MANUAL"] = 2] = "MANUAL";
})(EServiceMode = exports.EServiceMode || (exports.EServiceMode = {}));
var EServiceDripFeed;
(function (EServiceDripFeed) {
    EServiceDripFeed[EServiceDripFeed["ALLOWED"] = 1] = "ALLOWED";
    EServiceDripFeed[EServiceDripFeed["DISALLOWED"] = 2] = "DISALLOWED";
})(EServiceDripFeed = exports.EServiceDripFeed || (exports.EServiceDripFeed = {}));
var EServiceCancel;
(function (EServiceCancel) {
    EServiceCancel[EServiceCancel["ALLOWED"] = 1] = "ALLOWED";
    EServiceCancel[EServiceCancel["DISALLOWED"] = 2] = "DISALLOWED";
})(EServiceCancel = exports.EServiceCancel || (exports.EServiceCancel = {}));
var EServiceLinkDuplicate;
(function (EServiceLinkDuplicate) {
    EServiceLinkDuplicate[EServiceLinkDuplicate["ACCEPT"] = 1] = "ACCEPT";
    EServiceLinkDuplicate[EServiceLinkDuplicate["DENY"] = 2] = "DENY";
})(EServiceLinkDuplicate = exports.EServiceLinkDuplicate || (exports.EServiceLinkDuplicate = {}));
var EServiceStatus;
(function (EServiceStatus) {
    EServiceStatus[EServiceStatus["ENABLED"] = 1] = "ENABLED";
    EServiceStatus[EServiceStatus["DISABLED"] = 2] = "DISABLED";
})(EServiceStatus = exports.EServiceStatus || (exports.EServiceStatus = {}));
var EServiceType;
(function (EServiceType) {
    EServiceType[EServiceType["DEFAULT"] = 1] = "DEFAULT";
    EServiceType[EServiceType["PACKAGE"] = 2] = "PACKAGE";
    EServiceType[EServiceType["CUSTOM_COMMENTS"] = 3] = "CUSTOM_COMMENTS";
    EServiceType[EServiceType["CUSTOM_COMMENTS_PACKAGE"] = 4] = "CUSTOM_COMMENTS_PACKAGE";
    EServiceType[EServiceType["SUBSCRIPTION_RESELLING"] = 5] = "SUBSCRIPTION_RESELLING";
    EServiceType[EServiceType["COMMENT_LIKES"] = 6] = "COMMENT_LIKES";
    EServiceType[EServiceType["MENTIONS_USER_FOLLOWERS"] = 7] = "MENTIONS_USER_FOLLOWERS";
    EServiceType[EServiceType["MENTIONS_MEDIA_LIKERS"] = 8] = "MENTIONS_MEDIA_LIKERS";
    EServiceType[EServiceType["INVITES_FROM_GROUPS"] = 9] = "INVITES_FROM_GROUPS";
    EServiceType[EServiceType["SUBSCRIPTION"] = 10] = "SUBSCRIPTION";
    EServiceType[EServiceType["MENTIONS_CUSTOM_LIST"] = 11] = "MENTIONS_CUSTOM_LIST";
    EServiceType[EServiceType["MENTIONS_WITH_HASHTAGS"] = 12] = "MENTIONS_WITH_HASHTAGS";
    EServiceType[EServiceType["MENTIONS_HASHTAG"] = 13] = "MENTIONS_HASHTAG";
    EServiceType[EServiceType["POLL"] = 14] = "POLL";
    EServiceType[EServiceType["COMMENT_REPLIES"] = 15] = "COMMENT_REPLIES";
})(EServiceType = exports.EServiceType || (exports.EServiceType = {}));
//# sourceMappingURL=service.interfaces.js.map