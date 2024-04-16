import Company from "../../../domain/company/entities/Company";
import CompanyRepositoryInterface from "../../../domain/company/repositories/CompanyRepositoryInterface";
import CompanyModel from "./CompanyModel";

export default class CompanyRepository implements CompanyRepositoryInterface {
  async create(entity: Company): Promise<void> {
    await CompanyModel.create({
      id: entity.id,
      name: entity.name,
      cnpj: entity.cnpj,
      active: entity.isActive()
    });
  }

  async update(entity: Company): Promise<void> {
    await CompanyModel.update(
      {
        name: entity.name,
        cnpj: entity.cnpj,
        active: entity.isActive()
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }

  async find(id: string): Promise<Company> {
    let companyModel;
    try {
      companyModel = await CompanyModel.findOne({
        where: {
          id,
        },
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error("Company not found");
    }

    const company = new Company(id, companyModel.name, companyModel.cnpj, companyModel.active);
    return company;
  }

  async findAll(): Promise<Company[]> {
    const companyModels = await CompanyModel.findAll();

    const companies = companyModels.map((cm) => {
      return new Company(cm.id, cm.name, cm.cnpj, cm.active);
    });

    return companies;
  }
}