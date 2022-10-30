import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import {
  EEmailConfirmation,
  EResetPassword,
  ESignupPage,
  ETermsCheckbox,
  ETicketSystem,
} from '../interfaces/general-settings.interfaces';

@Entity({ name: 'general_settings' })
export class GeneralSetting {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ default: null })
  logo: string;

  @Column({ default: null })
  favicon: string;

  @Column()
  panel_name: string;

  @Column()
  timezone: string;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  currency_format: number;

  @Column()
  rates_rounding: number;

  @Column()
  service_name_format: string;

  @Column({ type: 'enum', enum: ETicketSystem })
  ticket_system: ETicketSystem;

  @Column()
  max_pending_tickets_per_user: number;

  @Column({ type: 'enum', enum: ESignupPage })
  signup_page: ESignupPage;

  @Column({ type: 'enum', enum: EEmailConfirmation })
  email_confirmation: EEmailConfirmation;

  @Column({ type: 'enum', enum: ETermsCheckbox })
  terms_checkbox: ETermsCheckbox;

  @Column({ type: 'enum', enum: EResetPassword })
  reset_password: EResetPassword;

  @Column()
  minimum_dripfeed_interval: number;

  @Column({ type: 'text' })
  custom_header_code: string;

  @Column({ type: 'text' })
  custom_footer_code: string;

  @Column()
  updated_at: Date;
}
