import 'reflect-metadata';
import { container } from 'tsyringe';

import EmployeesRepositoryInterface from '@domain/employees/repositories/EmployeesRepositoryInterface';
import EmployeesRepository from '@infra/repositories/employees/EmployeesRepository';
import CompaniesRepositoryInterface from '@domain/company/repositories/CompanyRepositoryInterface';
import CompaniesRepository from '@infra/repositories/companies/CompanyRepository';

container.registerSingleton<EmployeesRepositoryInterface>(
  'EmployeesRepository',
  EmployeesRepository
);

// container.registerSingleton<CompaniesRepositoryInterface>(
//   CompaniesRepository,
// );
