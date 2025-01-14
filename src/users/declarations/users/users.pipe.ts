import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class UsersPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(metadata);
    return value;
  }
}
export interface Response<T> {
  statusCode: number;
  message: string;
  data: T;
}

// @Injectable()
// export class TransformInterceptor<T>
//   implements NestInterceptor<T, Response<T>> {
//   intercept(
//     context: ExecutionContext,
//     next: CallHandler,
//   ): Observable<Response<T>> {
//     return next
//       .handle()
//       .pipe(
//         map((data) => ({
//           statusCode: context.switchToHttp().getResponse().statusCode,
//           message: data.message,
//           data: {
//             result: data.result,
//             meta: {} // if this is supposed to be the actual return then replace {} with data.result
//           }
//         })),
//       );
//   }
// }
