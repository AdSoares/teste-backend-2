import { Sequelize } from "sequelize-typescript"
import Employee from "../../../../domain/employees/entities/Employee";
import Address from "../../../../domain/employees/valueObjects/address";
import CustomerRepository from "../../../../infra/repositories/employees/EmployeesRepository";
import EmployeeModel from "../../../../infra/repositories/employees/EmployeeModel";
import FindEmployeeUseCase from "./FindEmployeeUseCase";

describe('Test find employee use case', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([EmployeeModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should find a employee', async () => {
    const employeeRepository = new CustomerRepository();
    const useCase = new FindEmployeeUseCase(employeeRepository);
    
    const address = new Address("Street", 1000, "18000100", "São Paulo");
    const employee = new Employee("123", "Employe 123", "33004726017", "2737787428", "1990-01-01", "123@gmail.com", "1199887766", address, "department", "job title", true, "4820b1e7-c85d-4fa9-8606-737a3dc83477");

    const employeeCreated = await employeeRepository.create(employee);

    const input = {
      id: '123'
    };

    const output = {
        id: "123",
        name: "Employe 123", 
        cpf: "33004726017", 
        rg: "2737787428", 
        birthday: "1990-01-01", 
        email: "123@gmail.com", 
        phone: "1199887766", 
        department: "department", 
        jobTitle: "job title", 
        active: true,
        address: {
          street: 'Street',
          city: 'São Paulo',
          number: 1000,
          zip: '18000100',
        },
        companyId: '4820b1e7-c85d-4fa9-8606-737a3dc83477'
      }

    const result = await useCase.execute(input);

    expect(result).toEqual(output);
  })
})