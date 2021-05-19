// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportDemandProductRelationships from '../../../app/model/demandProductRelationships';
import ExportDemandUserRelationships from '../../../app/model/demandUserRelationships';
import ExportDemands from '../../../app/model/demands';
import ExportEndFrontRelationships from '../../../app/model/endFrontRelationships';
import ExportEndProducts from '../../../app/model/endProducts';
import ExportProducts from '../../../app/model/products';
import ExportUsers from '../../../app/model/users';

declare module 'egg' {
  interface IModel {
    DemandProductRelationships: ReturnType<typeof ExportDemandProductRelationships>;
    DemandUserRelationships: ReturnType<typeof ExportDemandUserRelationships>;
    Demands: ReturnType<typeof ExportDemands>;
    EndFrontRelationships: ReturnType<typeof ExportEndFrontRelationships>;
    EndProducts: ReturnType<typeof ExportEndProducts>;
    Products: ReturnType<typeof ExportProducts>;
    Users: ReturnType<typeof ExportUsers>;
  }
}
