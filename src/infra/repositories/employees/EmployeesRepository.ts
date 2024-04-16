import Address from "@domain/employees/valueObjects/address";
import Employee from "../../../domain/employees/entities/Employee";
import EmployeeRepositoryInterface from "../../../domain/employees/repositories/EmployeesRepositoryInterface";
import EmployeeModel from "./EmployeeModel";

export default class EmployeeRepository implements EmployeeRepositoryInterface {
  async create(entity: Employee): Promise<void> {
    await EmployeeModel.create({    
      id: entity.id,
      name: entity.name,
      cpf: entity.cpf,
      rg: entity.rg,
      birthday: entity.birthday,
      email: entity.email,
      phone: entity.phone,
      street: entity.address.street,
      number: entity.address.number, 
      zipcode: entity.address.zip, 
      city: entity.address.city,
      department: entity.department,
      jobTitle: entity.jobTitle,
      active: entity.isActive()
    });
  }

  async update(entity: Employee): Promise<void> {
    await EmployeeModel.update(
      {
        name: entity.name,
        cpf: entity.cpf,
        rg: entity.rg,
        birthday: entity.birthday,
        email: entity.email,
        phone: entity.phone,
        street: entity.address.street,
        number: entity.address.number, 
        zipcode: entity.address.zip, 
        city: entity.address.city,
        department: entity.department,
        jobTitle: entity.jobTitle,
        active: entity.isActive()
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }

  async find(id: string): Promise<Employee> {
    let employeeModel;
    try {
      employeeModel = await EmployeeModel.findOne({
        where: {
          id,
        },
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error("Employee not found");
    }

    const employee = new Employee(id, 
      employeeModel.name,
      employeeModel.cpf,
      employeeModel.rg,
      employeeModel.birthday.toString(),
      employeeModel.email,
      employeeModel.phone,
      new Address(employeeModel.street, employeeModel.number, employeeModel.zipcode, employeeModel.city),
      employeeModel.department,
      employeeModel.jobTitle,
      employeeModel.active);
    return employee;
  }

  async findAll(): Promise<Employee[]> {
    const employeeModels = await EmployeeModel.findAll();

    const employees = employeeModels.map((e) => {
      return new Employee(e.id, 
        e.name,
        e.cpf,
        e.rg,
        e.birthday.toString(),
        e.email,
        e.phone,
        new Address(e.street, e.number, e.zipcode, e.city),
        e.department,
        e.jobTitle,
        e.active)
    });

    return employees;
  }
}