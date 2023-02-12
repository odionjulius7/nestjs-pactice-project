import { Injectable } from '@nestjs/common';
import { CreateUserType } from 'src/utils/types';

@Injectable()
export class UsersService {
  private fakeUsers = [
    { userName: 'Julius', emil: 'odionjulius7@gmail.com' },
    {
      username: 'ooooo',
      email: 'example100gmail.com',
    },
  ];
  fetchUsers() {
    return this.fakeUsers;
  }

  createUsers(userDtails: CreateUserType) {
    // fakeUsers here represent data from our database
    return this.fakeUsers.push(userDtails);
    // return;
  }

  fetchUserById(id: number) {
    return { id, username: 'james12', email: 'example@gmail.com' };
  }
}
