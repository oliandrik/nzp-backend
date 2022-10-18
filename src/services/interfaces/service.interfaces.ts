export enum EModeService {
  AUTO = 1,
  MANUAL = 2,
}

export enum EDripFeedService {
  ALLOWED = 1,
  DISALLOWED = 2,
}

export enum ECancelService {
  ALLOWED = 1,
  DISALLOWED = 2,
}

export enum ELinkDuplicateService {
  ACCEPT = 1,
  DENY = 2,
}

export enum EStatusService {
  ENABLED = 1,
  DISABLED = 2,
}

export enum ETypeService {
  DEFAULT = 1,
  PACKAGE = 2,
  CUSTOM_COMMENTS = 3,
  CUSTOM_COMMENTS_PACKAGE = 4,
  SUBSCRIPTION_RESELLING = 5,
  COMMENT_LIKES = 6,
  MENTIONS_USER_FOLLOWERS = 7,
  MENTIONS_MEDIA_LIKERS = 8,
  INVITES_FROM_GROUPS = 9,
  SUBSCRIPTION = 10,
  MENTIONS_CUSTOM_LIST = 11,
  MENTIONS_WITH_HASHTAGS = 12,
  MENTIONS_HASHTAG = 13,
  POLL = 14,
  COMMENT_REPLIES = 15,
}