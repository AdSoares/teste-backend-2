import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import Address from "../../../../domain/employees/valueObjects/address";
import Employee from '@domain/employees/entities/Employee';
import EmployeesRepositoryInterface from '@domain/employees/repositories/EmployeesRepositoryInterface';
import { InputListEmployeeDTO, OutputListEmployeeDTO } from "./ListEmployeeDto";

@injectable()
class ListEmployeeUseCase {
  private employeeRepository: EmployeesRepositoryInterface;

  constructor(
    @inject('EmployeesRepository')
    employeeRepository: EmployeesRepositoryInterface) {
        this.employeeRepository = employeeRepository;
  }

  async execute(input: InputListEmployeeDTO): Promise<OutputListEmployeeDTO> {
    const employees = await this.employeeRepository.findAll();

    return OutputMapper.toOutput(employees);
  }
}

class OutputMapper {
  static toOutput(employee: Employee[]): OutputListEmployeeDTO {
    return {
        employees: employee.map((e) => ({
            id: e.id,
            name: e.name,
            cpf: e.cpf,
            rg: e.rg,
            birthday: e.birthday,
            email: e.email,
            phone: e.phone,
            department: e.department,
            jobTitle: e.jobTitle,
            active: e.isActive(),
            address: {
                street: e.address.street,
                number: e.address.number,
                zip: e.address.zip,
                city: e.address.city,
            },
            companyId: e.companyId
        })),
    }
  }
}

export default ListEmployeeUseCase;