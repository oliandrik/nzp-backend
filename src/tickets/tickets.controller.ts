import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Ticket } from './entities/ticket.entity';
import { TicketsService } from './tickets.service';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get()
  async getAllTickets(): Promise<Ticket[]> {
    return await this.ticketsService.findAll();
  }

  @Get(':id')
  async getConversation(@Param('id') id) {
    return await this.ticketsService.getConversation(id);
  }

  @Post()
  async createTicket(@Body() body) {
    return await this.ticketsService.create(body);
  }

  @Delete('bulk-delete')
  async bulkDelete(@Body() body) {
    return await this.ticketsService.bulkDelete(body.ids);
  }

  @Delete(':id')
  async deleteTicket(@Param('id') id) {
    return await this.ticketsService.deleteOne(id);
  }
}
