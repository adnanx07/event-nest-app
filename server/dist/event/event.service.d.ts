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
export declare class EventService {
    private readonly eventRepository;
    constructor(eventRepository: Repository<Event>);
    create(createEventDto: CreateEventDto, files: any): Promise<Event>;
    findAll(options: FindAllOptions): Promise<{
        data: Event[];
        total: number;
    }>;
    findOne(id: number): Promise<Event>;
    update(id: number, updateEventDto: UpdateEventDto): Promise<Event>;
    remove(id: number): Promise<void>;
}
export {};
