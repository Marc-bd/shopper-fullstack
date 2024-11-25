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
exports.RideController = void 0;
const common_1 = require("@nestjs/common");
const ride_service_1 = require("./ride.service");
const RequestEstimateRideDTO_1 = require("./dtos/RequestEstimateRideDTO");
const SaveRideDTO_1 = require("./dtos/SaveRideDTO");
let RideController = class RideController {
    constructor(rideService) {
        this.rideService = rideService;
    }
    async estimateRoute(requestData) {
        return await this.rideService.estimate(requestData);
    }
    async confirmRide(requestData) {
        return this.rideService.saveRide(requestData);
    }
    async getRidesByCustomer(customerId, driverId) {
        return await this.rideService.getRidesByCustomer(customerId, driverId);
    }
};
exports.RideController = RideController;
__decorate([
    (0, common_1.Post)('estimate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RequestEstimateRideDTO_1.RequestEstimateRideDTO]),
    __metadata("design:returntype", Promise)
], RideController.prototype, "estimateRoute", null);
__decorate([
    (0, common_1.Patch)('confirm'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SaveRideDTO_1.SaveRideDTO]),
    __metadata("design:returntype", Promise)
], RideController.prototype, "confirmRide", null);
__decorate([
    (0, common_1.Get)(':customer_id'),
    __param(0, (0, common_1.Param)('customer_id')),
    __param(1, (0, common_1.Query)('driver_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RideController.prototype, "getRidesByCustomer", null);
exports.RideController = RideController = __decorate([
    (0, common_1.Controller)('ride'),
    __metadata("design:paramtypes", [ride_service_1.RideService])
], RideController);
//# sourceMappingURL=ride.controller.js.map