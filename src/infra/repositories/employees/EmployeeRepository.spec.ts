import { Sequelize } from "sequelize-typescript";
import Employee from "../../../domain/employees/entities/Employee";
import EmployeeRepository from "./EmployeesRepository";
import EmployeeModel from "./EmployeeModel";
import Address from "../../../domain/employees/valueObjects/address";

const CPF1 = "33004726017";
const CPF2 = "73942858045";
const createAddress = () => new Address("Street", 1000, "18000100", "São Paulo");
const createEmployee = (id: string, cpf: string, name: string) => {
    if (!name) {
      name = "Employe " + id;
    }

    return new Employee(id, "Employe " + id, cpf, "2737787428", "1990-01-01", id + "@gmail.com", "1199887766", createAddress(), "department", "job title", true, "4820b1e7-c85d-4fa9-8606-737a3dc83477");
}

describe("Employee repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([EmployeeModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a employee", async () => {
    const employeeRepository = new EmployeeRepository();
    const id = "123";
    const employee = createEmployee(id, CPF1, null);
    await employeeRepository.create(employee);

    const employeeModel = await EmployeeModel.findOne({ where: { id: id } });

    expect(employeeModel.toJSON()).toStrictEqual({
      id: id,
      name: employee.name,
      cpf: employee.cpf,
      rg: employee.rg,
      birthday: employee.birthday,
      email: employee.email,
      phone: employee.phone,
      street: employee.address.street,
      number: employee.address.number,
      zipcode: employee.address.zip,
      city: employee.address.city,
      department: employee.department,
      jobTitle: employee.jobTitle,
      active: employee.isActive(),
      companyId: employee.companyId
    });
  });

  it("should update a employee", async () => {
    const employeeRepository = new EmployeeRepository();

    const id = "123";
    const employee = createEmployee(id, CPF1, "Employee 1");
    const employeeUpdated = createEmployee(id, CPF1, "Employee 1 Updated");

    await employeeRepository.create(employee);
    await employeeRepository.update(employeeUpdated);

    const employeeModel = await EmployeeModel.findOne({ where: { id: id } });

    expect(employeeModel.toJSON()).toStrictEqual({
      id: id,
      name: employeeUpdated.name,
      cpf: employeeUpdated.cpf,
      rg: employeeUpdated.rg,
      birthday: employeeUpdated.birthday,
      email: employeeUpdated.email,
      phone: employeeUpdated.phone,
      street: employeeUpdated.address.street,
      number: employeeUpdated.address.number,
      zipcode: employeeUpdated.address.zip,
      city: employeeUpdated.address.city,
      department: employee.department,
      jobTitle: employee.jobTitle,
      active: employeeUpdated.isActive(),
      companyId: employeeUpdated.companyId
    });
  });

  it("should find a employee", async () => {
    const employeeRepository = new EmployeeRepository();
    
    const id = "123";
    const employee = createEmployee(id, CPF1, "Employee 1");
    
    await employeeRepository.create(employee);

    const employeeResult = await employeeRepository.find(employee.id);

    expect(employee).toStrictEqual(employeeResult);
  });

  it("should throw an error when employee is not found", async () => {
    const employeeRepository = new EmployeeRepository();

    expect(async () => {
      await employeeRepository.find("456ABC");
    }).rejects.toThrow("Employee not found");
  });

  it("should find all employee", async () => {
    const employeeRepository = new EmployeeRepository();
    
    const id1 = "123";
    const employee1 = createEmployee(id1, CPF1, "Employee 1");

    const id2 = "456";
    const employee2 = createEmployee(id2, CPF2, "Employee 2");

    await employeeRepository.create(employee1);
    await employeeRepository.create(employee2);

    const employees = await employeeRepository.findAll();

    expect(employees).toHaveLength(2);
    expect(employees).toContainEqual(employee1);
    expect(employees).toContainEqual(employee2);
  });
});