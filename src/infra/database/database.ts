import { Sequelize } from 'sequelize-typescript';
import EmployeeModel from '../repositories/employees/EmployeeModel';
import CompanyModel from '../repositories/companies/CompanyModel';

export let sequelize: Sequelize;

export class Database {

    async setupDb() {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false
        });

        sequelize.addModels([EmployeeModel, CompanyModel]);
        await sequelize.sync();
    }
}