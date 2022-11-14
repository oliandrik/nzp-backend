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
exports.ChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
class ChatGateway {
    constructor(chatService, authService, userService) {
        this.chatService = chatService;
        this.authService = authService;
        this.userService = userService;
    }
    async handleSendMessage(client, payload) {
        await this.chatService.createMessage(payload);
        this.server.emit('recMessage', payload);
    }
    async handleConnection(socket) {
        const client = (await this.authService.decodedJwtAccessToken(socket.handshake.headers.authorization));
        const user = await this.userService.byId(socket.handshake.headers.to);
        if (client && user) {
            socket.join(client.id + '-' + user.id);
            this.server.to(client.id + '-' + user.id).emit('message', 'hello guys');
        }
    }
    handleDisconnect(client) {
        console.log('on disconnect');
    }
    async sendMessageTo(clientId, userId, message) {
        return this.server.to(clientId + '-' + userId).emit('message', message);
    }
}
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", Object)
], ChatGateway.prototype, "server", void 0);
exports.ChatGateway = ChatGateway;
//# sourceMappingURL=chat.gateway.js.map