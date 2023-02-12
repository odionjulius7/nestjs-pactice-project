import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { AnotherMiddleware } from './middleware/another/another.middleware';
import { ExampleMiddleware } from './middleware/example/example.middleware';
import { UsersService } from './services/users/users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // configure routes the middleware will apply to
    // consumer.apply(ExampleMiddleware).forRoutes('users');
    // if u want to apply to all route
    // consumer.apply(ExampleMiddleware).forRoutes('UsersController');
    //   Or an explicit path(method)
    consumer
      .apply(ExampleMiddleware)
      .forRoutes(
        {
          path: 'users',
          method: RequestMethod.GET,
        },
        {
          path: 'users/:id',
          method: RequestMethod.GET,
        },
      )
      .apply(AnotherMiddleware)
      .forRoutes(
        // either to all routes or to some specific one like here
        {
          path: 'users',
          method: RequestMethod.GET,
        },
        {
          path: 'users/:id',
          method: RequestMethod.GET,
        },
      );
  }
}

// We can apply more that one middleware for validation and authorization
