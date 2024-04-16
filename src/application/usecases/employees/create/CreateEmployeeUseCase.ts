import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import EmployeesRepositoryInterface from '@domain/employees/repositories/EmployeesRepositoryInterface';
import { InputCreateEmployeeDTO, OutputCreateEmployeeDTO} from './CreateEmployeeDto';
import Address from "../../../../domain/employees/valueObjects/address";
import Employee from '@domain/employees/entities/Employee';
import { v4 as uuidv4 } from 'uuid';

@injectable()
class CreateEmployeeUseCase {
  private employeeRepository: EmployeesRepositoryInterface;

  constructor(
    @inject('EmployeesRepository')
    employeeRepository: EmployeesRepositoryInterface) {
    this.employeeRepository = employeeRepository;
  }

  public async execute(input: InputCreateEmployeeDTO): Promise<OutputCreateEmployeeDTO> {

    const employee = new Employee(uuidv4(),
        input.name, 
        input.cpf,
        input.rg,
        input.birthday,
        input.email,
        input.phone,
        new Address(
            input.address.street,
            input.address.number,
            input.address.zip,
            input.address.city
        ),
        input.department,
        input.jobTitle,
        input.active
    );

    await this.employeeRepository.create(employee);

    return {
      id: employee.id,
      name: employee.name,
      cpf: employee.cpf,
      rg: employee.rg,
      birthday: employee.birthday,
      email: employee.email,
      phone: employee.phone,
      department: employee.department,
      jobTitle: employee.jobTitle,
      active: employee.isActive(),
      address: {
        street: employee.address.street,
        number: employee.address.number,
        zip: employee.address.zip,
        city: employee.address.city
      }
    }
  }
}

export default CreateEmployeeUseCase;
