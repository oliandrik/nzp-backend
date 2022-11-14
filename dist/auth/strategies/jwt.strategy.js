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
exports.JwtStrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const clients_service_1 = require("../../clients/clients.service");
const users_service_1 = require("../../users/users.service");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(clientService, userService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjdkMTEyYjFhZWIwODhmNjUyZDIwMWQiLCJpYXQiOjE2NTIzNjM1NjMsImV4cCI6MTY1MjM2NzE2M30.xcLp-Fg3uh4IQF3OftsK6TWiHSmN5xBJf3E3UA6U44A',
        });
        this.clientService = clientService;
        this.userService = userService;
    }
    async validate(payload) {
        const user = (await this.clientService.byEmail(payload.email)) ||
            (await this.userService.byEmail(payload.email));
        if (!user) {
            throw new common_1.UnauthorizedException('Error Authorize');
        }
        return user;
    }
};
JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [clients_service_1.ClientsService,
        users_service_1.UsersService])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;
//# sourceMappingURL=jwt.strategy.js.map