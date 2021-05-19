// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportAbnormal from '../../../app/service/abnormal';
import ExportDemands from '../../../app/service/demands';
import ExportEndProducts from '../../../app/service/endProducts';
import ExportFiles from '../../../app/service/files';
import ExportNotice from '../../../app/service/notice';
import ExportPerformance from '../../../app/service/performance';
import ExportProducts from '../../../app/service/products';
import ExportSessions from '../../../app/service/sessions';
import ExportUsers from '../../../app/service/users';

declare module 'egg' {
  interface IService {
    abnormal: AutoInstanceType<typeof ExportAbnormal>;
    demands: AutoInstanceType<typeof ExportDemands>;
    endProducts: AutoInstanceType<typeof ExportEndProducts>;
    files: AutoInstanceType<typeof ExportFiles>;
    notice: AutoInstanceType<typeof ExportNotice>;
    performance: AutoInstanceType<typeof ExportPerformance>;
    products: AutoInstanceType<typeof ExportProducts>;
    sessions: AutoInstanceType<typeof ExportSessions>;
    users: AutoInstanceType<typeof ExportUsers>;
  }
}
