import {
  EEmailConfirmation,
  EResetPassword,
  ESignupPage,
  ETermsCheckbox,
  ETicketSystem,
} from '../interfaces/general-settings.interfaces';

export class GeneralSettingDto {
  id: bigint;
  logo: string;
  favicon: string;
  panel_name: string;
  timezone: string;
  currency_format: number;
  rates_rounding: number;
  service_name_format: string;
  ticket_system: ETicketSystem;
  max_pending_tickets_per_user: number;
  signup_page: ESignupPage;
  email_confirmation: EEmailConfirmation;
  terms_checkbox: ETermsCheckbox;
  reset_password: EResetPassword;
  minimum_dripfeed_interval: number;
  custom_header_code: string;
  custom_footer_code: string;
}
