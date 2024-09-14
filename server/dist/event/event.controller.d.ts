import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';
export declare class EventController {
    private readonly eventService;
    constructor(eventService: EventService);
    create(createEventDto: CreateEventDto, files: any): Promise<Event>;
    findAll(page?: number, limit?: number, sort?: string, order?: 'ASC' | 'DESC', name?: string, startDate?: string, endDate?: string, category?: string, search?: string): Promise<{
        data: Event[];
        total: number;
    }>;
    findOne(id: string): Promise<Event>;
    update(id: string, updateEventDto: UpdateEventDto): Promise<Event>;
    remove(id: string): Promise<void>;
}
