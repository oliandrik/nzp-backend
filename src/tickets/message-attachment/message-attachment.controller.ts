import { Controller } from '@nestjs/common';
import { MessageAttachmentService } from './message-attachment.service';

@Controller('message-attachment')
export class MessageAttachmentController {
  constructor(
    private readonly messageAttachmentService: MessageAttachmentService,
  ) {}
}
