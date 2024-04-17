import { Sequelize } from 'sequelize-typescript';
import EmployeeModel from '../repositories/employees/EmployeeModel';
import CompanyModel from '../repositories/companies/CompanyModel';
import { DataTypes } from 'sequelize';
import CompanyRepository from '../repositories/companies/CompanyRepository';
import Company from '@domain/company/entities/Company';

export let sequelize: Sequelize;

export class Database {

    async setupDb() {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false
        });

        sequelize.addModels([EmployeeModel, CompanyModel]);

        // CompanyModel.init(
        //     {
        //       id: {
        //         type: DataTypes.STRING,
        //         allowNull: false,
        //         primaryKey: true
        //       },
        //       name: {
        //         type: DataTypes.STRING,
        //         allowNull: false,
        //       },
        //       cnpj: {
        //         type: DataTypes.STRING,
        //         allowNull: false,
        //       },
        //       active: {
        //         type: DataTypes.BOOLEAN,
        //         allowNull: false,
        //       },
        //     },
        //     {
        //       sequelize,
        //       modelName: 'CompanyModel',
        //     }
        //   );

        // EmployeeModel.init(
        //     {
        //         id: {
        //             type: DataTypes.STRING,
        //             allowNull: false,
        //             primaryKey: true
        //         },
        //             name: {
        //             type: DataTypes.STRING,
        //             allowNull: false,
        //         },
        //             cpf: {
        //             type: DataTypes.STRING,
        //             allowNull: false,
        //         },
        //         rg: {
        //             type: DataTypes.STRING,
        //             allowNull: false,
        //         },
        //         birthday: {
        //             type: DataTypes.STRING,
        //             allowNull: false,
        //         },
        //         email: {
        //             type: DataTypes.STRING,
        //             allowNull: true,
        //         },
        //         phone: {
        //             type: DataTypes.STRING,
        //             allowNull: true,
        //         },
        //         street: {
        //             type: DataTypes.STRING,
        //             allowNull: false,
        //         },
        //         number: {
        //             type: DataTypes.NUMBER,
        //             allowNull: false,
        //         },
        //         zipcode: {
        //             type: DataTypes.STRING,
        //             allowNull: false,
        //         },
        //         city: {
        //             type: DataTypes.STRING,
        //             allowNull: false,
        //         },
        //         department: {
        //             type: DataTypes.STRING,
        //             allowNull: false,
        //         },
        //         jobTitle: {
        //             type: DataTypes.STRING,
        //             allowNull: false,
        //         },
        //         active: {
        //             type: DataTypes.BOOLEAN,
        //             allowNull: false,
        //         },
        //         companyId: {
        //           type: DataTypes.INTEGER,
        //           allowNull: false,
        //         }
        //     },
        //     {
        //       sequelize,
        //       modelName: 'EmployeeModel',
        //     }
        //   );

        EmployeeModel.belongsTo(CompanyModel, {
            foreignKey: 'companyId',
            onDelete: 'CASCADE', // Delete employee when company is deleted
        });
        
        await sequelize.sync();

        await this.createDefaultCompanies();
    }

    async createDefaultCompanies() {
        const companyRepository = new CompanyRepository();

        const company1 = new Company("4820b1e7-c85d-4fa9-8606-737a3dc83477", "Company 001", "80175055000171", true);       
        companyRepository.create(company1);

        const company2 = new Company("51437a95-ba8f-4530-9ec4-e592fa8b7449", "Company 002", "79178269000112", true);       
        companyRepository.create(company2);

        const companies = companyRepository.findAll();

        console.log("Companies created: ");
        (await companies).forEach(c => console.log(JSON.stringify(c)));
    }
}