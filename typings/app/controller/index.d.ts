// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAbnormal from '../../../app/controller/abnormal';
import ExportDemands from '../../../app/controller/demands';
import ExportEndProducts from '../../../app/controller/endProducts';
import ExportFiles from '../../../app/controller/files';
import ExportHome from '../../../app/controller/home';
import ExportPerformance from '../../../app/controller/performance';
import ExportProducts from '../../../app/controller/products';
import ExportSessions from '../../../app/controller/sessions';
import ExportUsers from '../../../app/controller/users';

declare module 'egg' {
  interface IController {
    abnormal: ExportAbnormal;
    demands: ExportDemands;
    endProducts: ExportEndProducts;
    files: ExportFiles;
    home: ExportHome;
    performance: ExportPerformance;
    products: ExportProducts;
    sessions: ExportSessions;
    users: ExportUsers;
  }
}
