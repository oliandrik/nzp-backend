import { Injectable } from '@nestjs/common';

@Injectable()
export class GatewayService {
  private connectedUsers = [];
  private allUsers = [];

  userConnected(user) {
    const filteredUsers = this.allUsers.filter((u) => u.id === user.id);
    if (filteredUsers.length == 0) {
      this.allUsers.push(user);
    } else {
      user = filteredUsers[0];
    }
    this.connectedUsers.push(user);
    console.log('Connected Users', this.connectedUsers);
  }
}
