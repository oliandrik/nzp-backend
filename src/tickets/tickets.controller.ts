import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TicketDto } from './dto/ticket.dto';
import { Ticket } from './entities/ticket.entity';
import { TicketsService } from './tickets.service';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get()
  async getAllTickets(): Promise<Ticket[]> {
    return await this.ticketsService.findAll();
  }

  @Get('search-by-id/')
  async searchById(@Query() query) {
    return await this.ticketsService.byId(query.id);
  }

  @Get('search-by-subject/')
  async searchBySubject(@Query() query) {
    return await this.ticketsService.bySubject(query.subject);
  }

  @Get('search-by-client/')
  async searchByClient(@Query() query) {
    return await this.ticketsService.byClient(query.client);
  }

  @Get(':id')
  async getTicketmById(@Param('id') id): Promise<Ticket> {
    return await this.ticketsService.byId(id);
  }

  @Post()
  async createTicket(@Body() body: TicketDto) {
    return await this.ticketsService.create(body);
  }

  @Put(':id')
  async updateTicket(@Param('id') id, @Body() body: TicketDto) {
    return await this.ticketsService.update(id, body);
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
