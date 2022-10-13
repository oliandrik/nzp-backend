import { ServiceCategory } from 'src/service-categories/entities/service-categories.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

export enum ModeService {
  auto = 'auto',
  manual = 'manual',
}

export enum DripFeedService {
  allowed = 'allowed',
  disallowed = 'disallowed',
}

export enum CancelService {
  allowed = 'allowed',
  disallowed = 'disallowed',
}

export enum LinkDuplicateService {
  accept = 'accept',
  deny = 'deny',
}

export enum StatusService {
  enabled = 'enabled',
  disabled = 'disabled',
}

export enum TypeService {
  default = 'default',
  package = 'package',
  custom_comments = 'custom comments',
  custom_comments_package = 'custom comments package',
  subscription_reselling = 'subscription reselling',
  comment_likes = 'comment likes',
  mentions_user_followers = 'mentions user followers',
  mentions_media_likers = 'mentions media likers',
  invites_from_groups = 'invites from groups',
  subscription = 'subscription',
  mentions_custom_list = 'mentions custom list',
  mentions_with_hashtags = 'mentions with hashtags',
  mentions_hastag = 'mentions hastag',
  poll = 'poll',
  comment_replies = 'comment replies',
}

@Entity({ name: 'services' })
export class Service {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  service_name: string;

  @Column({ default: null })
  category: string;

  @Column({ type: 'enum', enum: StatusService })
  status: StatusService;

  @Column({ type: 'enum', enum: TypeService })
  type: TypeService;

  @Column({ type: 'enum', enum: ModeService })
  mode: ModeService;

  @Column({ default: null })
  provider: string;

  @Column({ default: null })
  service: string;

  @Column({ type: 'enum', enum: DripFeedService })
  drip_feed: DripFeedService;

  @Column({ type: 'enum', enum: CancelService })
  cancel: CancelService;

  @Column()
  rate_per: number;

  @Column()
  min_order: number;

  @Column()
  max_order: number;

  @Column({ type: 'enum', enum: LinkDuplicateService })
  link_duplicate: LinkDuplicateService;

  @Column()
  increment: number;

  @Column()
  overflow: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  // (1 service can have one service)

  // @ManyToOne(
  //   () => ServiceCategory,
  //   (serviceCategory) => serviceCategory.services,
  // )
  // category: ServiceCategory;
}
