import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GeneralSetting } from './entities/general-settings.entity';
import {
  EEmailConfirmation,
  EResetPassword,
  ESignupPage,
  ETermsCheckbox,
  ETicketSystem,
} from './interfaces/general-settings.interfaces';

@Injectable()
export class GeneralSettingsService {
  constructor(
    @InjectRepository(GeneralSetting)
    private readonly generalSettingRepository: Repository<GeneralSetting>,
  ) {}

  async createSettings(body) {
    return await this.generalSettingRepository.insert({
      ...body,
      // logo: null,
      // favicon: null,
      // panel_name: faker.random.words(),
      // timezone: faker.date.toString(),
      // currency_format: faker.datatype.number(),
      // rates_rounding: faker.datatype.number(),
      // service_name_format: faker.random.words(),
      // ticket_system:
      //   Math.random() < 0.5 ? ETicketSystem.ENABLED : ETicketSystem.DISABLED,
      // max_pending_tickets_per_user: faker.datatype.number(),
      // signup_page:
      //   Math.random() < 0.5 ? ESignupPage.ENABLED : ESignupPage.DISABLED,
      // email_confirmation:
      //   Math.random() < 0.5
      //     ? EEmailConfirmation.ENABLED
      //     : EEmailConfirmation.DISABLED,
      // terms_checkbox:
      //   Math.random() < 0.5 ? ETermsCheckbox.ENABLED : ETermsCheckbox.DISABLED,
      // reset_password:
      //   Math.random() < 0.5 ? EResetPassword.ENABLED : EResetPassword.DISABLED,
      // minimum_dripfeed_interval: faker.datatype.number({ max: 45 }),
      // custom_header_code: `<meta name="trustpilot-one-time-domain-verification-id" content="87c42309-7533-47b8-b387-3d091cb60fd8"/>
      // <meta name="verification" content="c1cfeec59bfb6542fe307b75a93841" />`,
      // custom_footer_code: `<!-- Global site tag (gtag.js) - Google Analytics -->
      // <script async src="https://www.googletagmanager.com/gtag/js?id=UA-173985278-1"></script>`,
      updated_at: new Date(),
    });
  }

  async saveChages(id, body) {
    return await this.generalSettingRepository.update(
      { id },
      { ...body, updated_at: new Date() },
    );
  }
}
