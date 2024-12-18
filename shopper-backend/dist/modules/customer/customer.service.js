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
exports.CustomerService = void 0;
const common_1 = require("@nestjs/common");
const customer_entity_1 = require("./customer.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let CustomerService = class CustomerService {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    async seedCustomers() {
        const mockedCustomers = [
            { name: 'Pedro' },
            { name: 'Amanda' },
            { name: 'Sergio' },
            { name: 'Camila' },
            { name: 'Juliana' },
            { name: 'Marina' },
            { name: 'Marcos' },
            { name: 'Felipe' },
        ];
        const existingCustomers = await this.customerRepository.find({
            select: ['name'],
        });
        const existingCustomerNames = existingCustomers.map((customer) => customer.name);
        for (const customer of mockedCustomers) {
            if (!existingCustomerNames.includes(customer.name)) {
                const newCustomer = this.customerRepository.create(customer);
                await this.customerRepository.save(newCustomer);
            }
        }
    }
    async onModuleInit() {
        await this.seedCustomers();
    }
    getAllCustomers() {
        return this.customerRepository.find();
    }
};
exports.CustomerService = CustomerService;
exports.CustomerService = CustomerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(customer_entity_1.CustomerEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CustomerService);
//# sourceMappingURL=customer.service.js.map