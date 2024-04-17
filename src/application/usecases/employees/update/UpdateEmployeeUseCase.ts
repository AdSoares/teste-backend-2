import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import EmployeesRepositoryInterface from '@domain/employees/repositories/EmployeesRepositoryInterface';
import { InputUpdateEmployeeDTO, OutputUpdateEmployeeDTO} from './UpdateEmployeeDto';
import Address from "../../../../domain/employees/valueObjects/address";
import Employee from '@domain/employees/entities/Employee';

@injectable()
class UpdateEmployeeUseCase {
  private employeeRepository: EmployeesRepositoryInterface;

  constructor(
    @inject('EmployeesRepository')
    employeeRepository: EmployeesRepositoryInterface) {
    this.employeeRepository = employeeRepository;
  }

  public async execute(input: InputUpdateEmployeeDTO): Promise<OutputUpdateEmployeeDTO> {

    const employee = new Employee(input.id,
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
        input.active,
        input.companyId
    );

    await this.employeeRepository.update(employee);

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
      },
      companyId: employee.companyId
    }
  }
}

export default UpdateEmployeeUseCase;
