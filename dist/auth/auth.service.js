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
exports.AuthService = void 0;
const bcrypt = require("bcrypt");
const client_entity_1 = require("../clients/entities/client.entity");
const client_interfaces_1 = require("../clients/interfaces/client.interfaces");
const user_entity_1 = require("../users/entities/user.entity");
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_2 = require("@nestjs/typeorm");
const roles_interfaces_1 = require("./interfaces/roles.interfaces");
let AuthService = class AuthService {
    constructor(clientRepository, userRepository, jwtService) {
        this.clientRepository = clientRepository;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async signUp(signUp) {
        if (!signUp.terms) {
            throw new common_1.BadRequestException('to Register you need to agree to the privacy policy');
        }
        const oldUser = await this.clientRepository.findOneBy({
            email: signUp.email,
        });
        if (oldUser) {
            throw new common_1.BadRequestException('User with this email is already in system');
        }
        const { email, password, username, terms } = signUp;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.clientRepository.create({
            username,
            email,
            password: hashedPassword,
            terms,
            balance: 0.0,
            spent: 0.0,
            discount: 0.0,
            rank: client_interfaces_1.EClientRank.NEW,
            status: client_interfaces_1.EClientStatus.ACTIVE,
            avatar: null,
            gender: client_interfaces_1.EClientGender.OTHER,
            role: roles_interfaces_1.ERoles.CLIENT,
            created_at: new Date(),
            updated_at: new Date(),
            lastAuth: new Date(),
        });
        console.log(user, ' user');
        const tokens = await this.issueTokenPair(String(user.id));
        return (this.clientRepository.save(user), Object.assign({ message: 'User was created', user: this.returnUserFields(user) }, tokens));
    }
    async signUpAdmin(signUp) {
        const oldUser = await this.clientRepository.findOneBy({
            email: signUp.email,
        });
        if (oldUser) {
            throw new common_1.BadRequestException('User with this email is already in system');
        }
        const { email, password } = signUp;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.userRepository.create({
            email,
            password: hashedPassword,
            role: roles_interfaces_1.ERoles[signUp.role],
        });
        const tokens = await this.issueTokenPair(String(user.id));
        return (this.userRepository.save(user), Object.assign({ message: 'sign up andmin', user: this.returnUserFields(user) }, tokens));
    }
    async signIn(signIn) {
        const user = await this.validateUser(signIn);
        const payload = { email: user.email, id: user.id };
        return {
            message: 'Successfully authenticated',
            accessToken: this.jwtService.sign(payload),
        };
    }
    async validateUser(signIn) {
        const { email, password } = signIn;
        const user = (await this.clientRepository.findOne({ where: { email: email } })) ||
            (await this.userRepository.findOne({ where: { email: email } }));
        if (!user) {
            throw new common_1.UnauthorizedException('We cannot find account with this email address');
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw new common_1.UnauthorizedException('Check your password');
        }
        return user;
    }
    async issueTokenPair(userId) {
        const data = { id: userId };
        const refreshToken = await this.jwtService.signAsync(data, {
            expiresIn: '1d',
        });
        const accessToken = await this.jwtService.signAsync(data, {
            expiresIn: '1h',
        });
        return { refreshToken, accessToken };
    }
    returnUserFields(user) {
        return {
            id: user.id,
            email: user.email,
        };
    }
    async changePassword(client, id) {
        const user = await this.clientRepository.findOne({ where: { id: id } });
        if (!user) {
            throw new common_1.BadRequestException('Invalid');
        }
        const isValidPassword = await bcrypt.compare(client.currentPassword, user.password);
        if (!isValidPassword) {
            throw new common_1.UnauthorizedException('The current password is incorrect');
        }
        const hashedPassword = await bcrypt.hash(client.newPassword, 10);
        return (await this.clientRepository.update({ id }, { password: hashedPassword, updated_at: new Date() }),
            { message: `Your password was successfully updated` });
    }
    async sendNewPassword(payload) {
        const user = await this.clientRepository.findOne({
            where: { email: payload.email },
        });
        if (!user) {
            throw new common_1.BadRequestException('User is not found');
        }
        let generatedPassword = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
        const charactersLength = characters.length;
        for (let i = 0; i < 9; i++) {
            generatedPassword += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        const hashedPassword = await bcrypt.hash(generatedPassword, 10);
        return (await this.clientRepository.update({ id: user.id }, { password: hashedPassword, updated_at: new Date() }),
            { message: `here you can see your new password ${generatedPassword}` });
    }
    decodedJwtAccessToken(token) {
        return this.jwtService.decode(token);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(client_entity_1.Client)),
    __param(1, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map