"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const event_entity_1 = require("./entities/event.entity");
let EventService = class EventService {
    constructor(eventRepository) {
        this.eventRepository = eventRepository;
    }
    async create(createEventDto, files) {
        const event = this.eventRepository.create(createEventDto);
        if (files && files.length > 0) {
            event.images = files.map((file) => file.path);
        }
        return this.eventRepository.save(event);
    }
    async findAll(options) {
        const queryBuilder = this.eventRepository.createQueryBuilder('event');
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
        queryBuilder.skip((options.page - 1) * options.limit).take(options.limit);
        const [data, total] = await queryBuilder.getManyAndCount();
        return { data, total };
    }
    async findOne(id) {
        const event = await this.eventRepository.findOneBy({ id });
        if (!event) {
            throw new common_1.NotFoundException(`Event with ID ${id} not found`);
        }
        return event;
    }
    async update(id, updateEventDto) {
        const event = await this.eventRepository.preload(Object.assign({ id }, updateEventDto));
        if (!event) {
            throw new common_1.NotFoundException(`Event with ID ${id} not found`);
        }
        return this.eventRepository.save(event);
    }
    async remove(id) {
        const result = await this.eventRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Event with ID ${id} not found`);
        }
    }
};
EventService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(event_entity_1.Event)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EventService);
exports.EventService = EventService;
//# sourceMappingURL=event.service.js.map