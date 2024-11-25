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
exports.DriverEntity = void 0;
const typeorm_1 = require("typeorm");
const feedback_entity_1 = require("../feedback/feedback.entity");
const ride_entity_1 = require("../ride/ride.entity");
let DriverEntity = class DriverEntity {
};
exports.DriverEntity = DriverEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], DriverEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, unique: true }),
    __metadata("design:type", String)
], DriverEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], DriverEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], DriverEntity.prototype, "vehicle", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => feedback_entity_1.FeedbackEntity, (feedback) => feedback.driver, {
        cascade: true,
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", feedback_entity_1.FeedbackEntity)
], DriverEntity.prototype, "feedback", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'float' }),
    __metadata("design:type", Number)
], DriverEntity.prototype, "ratePerKm", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'int' }),
    __metadata("design:type", Number)
], DriverEntity.prototype, "minimumKm", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ride_entity_1.RideEntity, (ride) => ride.driver),
    __metadata("design:type", Array)
], DriverEntity.prototype, "rides", void 0);
exports.DriverEntity = DriverEntity = __decorate([
    (0, typeorm_1.Entity)('drivers')
], DriverEntity);
//# sourceMappingURL=driver.entity.js.map