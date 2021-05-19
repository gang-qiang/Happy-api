declare module 'egg' {
  interface Application {
    Sequelize: SequelizeStatic
    model: Sequelize
  }
}

declare module 'sequelize' {
  interface Model<TInstance, TAttributes> {
    fillable(): string[];
    hidden(): string[];
    visible(): string[];
    getAttributes(): string[];
    findAttribute(attribute: string): object | undefined;

    getDataValue(key: string): any;

    setDataValue(key: string, value: any): void;
  }
}
