import Company from '@domain/company/entities/Company';
import RepositoryInterface from '@domain/@shared/repositories/RepositoryInterface';

export default interface CompanyRepositoryInterface
  extends RepositoryInterface<Company> { }