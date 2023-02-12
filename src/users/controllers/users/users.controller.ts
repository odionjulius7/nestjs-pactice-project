import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
  ParseBoolPipe,
  ParseIntPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { createUserDto } from 'src/users/DTOs/CreateUser.dto';
import { ValidateCreateUserPipe } from 'src/users/pipe/validate-create-user.pipe';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getUsers() {
    return this.userService.fetchUsers();
  }

  @Post('create')
  @UsePipes(new ValidationPipe())
  createUser(@Body(ValidateCreateUserPipe) userData: createUserDto) {
    console.log(userData.age.toPrecision());
    return this.userService.createUsers(userData);
  }

  @Get('posts')
  getUsersPosts() {
    return [
      {
        userName: 'Julius',
        emil: 'odionjulius7@gmail.com',
        post: [
          {
            id: 1,
            title: 'post 1',
          },
          {
            id: 2,
            title: 'post ',
          },
        ],
      },
    ];
  }

  @Get('posts/comments')
  getUsersPostsComments() {
    return [
      {
        id: 1,
        title: 'post 1',
        comments: [],
      },
    ];
  }

  @Get(':id')
  ggetUserById(@Param('id', ParseIntPipe) id: number) {
    console.log(id);
    const user = this.userService.fetchUserById(id);
    // if the user id doesn't exist/ or is null
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
      // nest will throw in a customised error for u
    }
    return user;
  }

  @Get(':id/:postId')
  ggetUserPostById(@Param('id') id: string, @Param('postId') postId: string) {
    console.log({
      userid: id,
      postid: postId,
    });
    return { id, postId };
  }

  //   @Get('')
  //   getUsersBySort(@Query('sortAsc', ParseBoolPipe) sortAsc: boolean) {
  //     console.log(sortAsc);
  //     return [{ userName: 'Julius', emil: 'odionjulius7@gmail.com' }];
  //   }
}
//
// @Controller('users')
// export class UsersController {
//   //   @Get()
//   //   getUsers() {
//   //     return [{ userName: 'Julius', emil: 'odionjulius7@gmail.com' }];
//   //   }

//   @Get('posts')
//   getUsersPosts() {
//     return [
//       {
//         userName: 'Julius',
//         emil: 'odionjulius7@gmail.com',
//         post: [
//           {
//             id: 1,
//             title: 'post 1',
//           },
//           {
//             id: 2,
//             title: 'post ',
//           },
//         ],
//       },
//     ];
//   }

//   @Get('posts/comments')
//   getUsersPostsComments() {
//     return [
//       {
//         id: 1,
//         title: 'post 1',
//         comments: [],
//       },
//     ];
//   }

//   // making post request the expressjs way
//   // @Post()
//   // createUser(@Req() request: Request, @Res() response: Response) {
//   //     console.log(request.body)
//   //     response.send('create')
//   // }

//   // posting the nestjs way(typescript)
//   @Post('create')
//   @UsePipes(new ValidationPipe())
//   createUser(@Body() userData: createUserDto) {
//     console.log(userData);
//     return {};
//   }

//   //   getting route params the expressjs way
//   //   @Get(':id')
//   //   ggetUserById(@Req() request: Request, @Res() response: Response) {
//   //     console.log(request.params);
//   //     response.send('');
//   //   }

//   // BEGIN ROUTE PARAM

//   // getting user id the nestjs way
//   //   @Get(':id')
//   //   ggetUserById(@Param('id') id: string) {
//   //     // we type annotating the arqument sent
//   //     // which is id most be string
//   //     console.log(id);
//   //     return { id };
//   //   }
//   @Get(':id')
//   ggetUserById(@Param('id', ParseIntPipe) id: number) {
//     // we type annotating the arqument sent
//     // which is id most be string
//     console.log(id);
//     return { id };
//   }

//   //  getting a user post by the post id & the user id
//   @Get(':id/:postId')
//   ggetUserPostById(@Param('id') id: string, @Param('postId') postId: string) {
//     console.log({
//       userid: id,
//       postid: postId,
//     });
//     return { id, postId };
//   }

//   // END ROUTE PARAM

//   // BEGIN QUERY PARAM

//   //   @Get('')
//   //   getUsersBySort(@Query('sortBy') sortBy: string) {
//   //     console.log(sortBy);
//   //     return [{ userName: 'Julius', emil: 'odionjulius7@gmail.com' }];
//   //   }
//   @Get('')
//   getUsersBySort(@Query('sortAsc', ParseBoolPipe) sortAsc: boolean) {
//     console.log(sortAsc);
//     return [{ userName: 'Julius', emil: 'odionjulius7@gmail.com' }];
//   }
//   // END QUERY PARAM
// }
