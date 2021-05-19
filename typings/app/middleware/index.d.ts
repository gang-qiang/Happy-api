// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCheckAuth from '../../../app/middleware/checkAuth';
import ExportErrorHandler from '../../../app/middleware/errorHandler';

declare module 'egg' {
  interface IMiddleware {
    checkAuth: typeof ExportCheckAuth;
    errorHandler: typeof ExportErrorHandler;
  }
}
