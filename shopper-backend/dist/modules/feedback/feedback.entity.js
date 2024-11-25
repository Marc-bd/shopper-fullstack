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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackEntity = void 0;
const typeorm_1 = require("typeorm");
const driver_entity_1 = require("../driver/driver.entity");
let FeedbackEntity = class FeedbackEntity {
    constructor() {
        this.maxRating = 5;
    }
};
exports.FeedbackEntity = FeedbackEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], FeedbackEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: 5, update: false }),
    __metadata("design:type", Number)
], FeedbackEntity.prototype, "maxRating", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], FeedbackEntity.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], FeedbackEntity.prototype, "review", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => driver_entity_1.DriverEntity, (driver) => driver.feedback),
    __metadata("design:type", driver_entity_1.DriverEntity)
], FeedbackEntity.prototype, "driver", void 0);
exports.FeedbackEntity = FeedbackEntity = __decorate([
    (0, typeorm_1.Entity)('feedbacks')
], FeedbackEntity);
//# sourceMappingURL=feedback.entity.js.map