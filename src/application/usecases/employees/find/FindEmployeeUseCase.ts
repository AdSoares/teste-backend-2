import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import EmployeesRepositoryInterface from '@domain/employees/repositories/EmployeesRepositoryInterface';
import { InputFindEmployeeDTO, OutputFindEmployeeDTO } from './FindEmployeeDto';

@injectable()
class FindEmployeeUseCase {
  private employeeRepository: EmployeesRepositoryInterface;

  constructor(
    @inject('EmployeesRepository')
    employeesRepository: EmployeesRepositoryInterface) { 
      this.employeeRepository = employeesRepository;
    }

  public async execute(input: InputFindEmployeeDTO): Promise<OutputFindEmployeeDTO> {
    const emplopyee = await this.employeeRepository.find(input.id);

    return {
      id: emplopyee.id,
      name: emplopyee.name,
      cpf: emplopyee.cpf,
      rg: emplopyee.rg,
      birthday: emplopyee.birthday,
      email: emplopyee.email,
      phone: emplopyee.phone,
      department: emplopyee.department,
      jobTitle: emplopyee.jobTitle,
      active: emplopyee.isActive(),
      address: {
        street: emplopyee.address.street,
        city: emplopyee.address.city,
        number: emplopyee.address.number,
        zip: emplopyee.address.zip
      },
      companyId: emplopyee.companyId
    }
  }
}

export default FindEmployeeUseCase;