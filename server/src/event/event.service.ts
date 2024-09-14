import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

interface FindAllOptions {
  page: number;
  limit: number;
  sort: string;
  order: 'ASC' | 'DESC';
  name?: string;
  startDate?: string;
  endDate?: string;
  category?: string;
  search?: string;
}

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async create(createEventDto: CreateEventDto, files: any): Promise<Event> {
    const event = this.eventRepository.create(createEventDto);

    if (files && files.length > 0) {
      event.images = files.map((file) => file.path);
    }

    return this.eventRepository.save(event);
  }

  async findAll(
    options: FindAllOptions,
  ): Promise<{ data: Event[]; total: number }> {
    const queryBuilder = this.eventRepository.createQueryBuilder('event');

    // Apply filters
    if (options.name) {
      queryBuilder.andWhere('event.name LIKE :name', {
        name: `%${options.name}%`,
      });
    }
    if (options.startDate) {
      queryBuilder.andWhere('event.startDate >= :startDate', {
        startDate: options.startDate,
      });
    }
    if (options.endDate) {
      queryBuilder.andWhere('event.endDate <= :endDate', {
        endDate: options.endDate,
      });
    }
    if (options.search) {
      queryBuilder.andWhere('event.name LIKE :search', {
        search: `%${options.search}%`,
      });
    }

    queryBuilder.orderBy(`event.${options.sort}`, options.order);

    // Apply pagination
    queryBuilder.skip((options.page - 1) * options.limit).take(options.limit);

    const [data, total] = await queryBuilder.getManyAndCount();

    return { data, total };
  }

  async findOne(id: number): Promise<Event> {
    const event = await this.eventRepository.findOneBy({ id });
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return event;
  }

  async update(id: number, updateEventDto: UpdateEventDto): Promise<Event> {
    const event = await this.eventRepository.preload({
      id,
      ...updateEventDto,
    });
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return this.eventRepository.save(event);
  }

  async remove(id: number): Promise<void> {
    const result = await this.eventRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
  }
}
