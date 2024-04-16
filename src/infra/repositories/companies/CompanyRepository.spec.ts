import { Sequelize } from "sequelize-typescript";
import Company from "../../../domain/company/entities/Company";
import CompanyRepository from "./CompanyRepository";
import CompanyModel from "./CompanyModel";

describe("Company repository test", () => {
  let sequelize: Sequelize;

  const CNPJ: string = "24723196000100";
  const CNPJ_2: string = "10969246000120";

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CompanyModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a company", async () => {
    const companyRepository = new CompanyRepository();
    const company = new Company("123", "Company Name", CNPJ, true);
    await companyRepository.create(company);

    const companyModel = await CompanyModel.findOne({ where: { id: "123" } });

    expect(companyModel.toJSON()).toStrictEqual({
      id: "123",
      name: company.name,
      cnpj: company.cnpj,
      active: company.isActive(),
    });
  });

  it("should update a company", async () => {
    const companyRepository = new CompanyRepository();
    const company = new Company("123", "Company Name", CNPJ, true);
    const companyUpdate = new Company("123", "Company Name Updated", CNPJ, false);

    await companyRepository.create(company);
    await companyRepository.update(companyUpdate);

    const companyModel = await CompanyModel.findOne({ where: { id: "123" } });

    expect(companyModel.toJSON()).toStrictEqual({
      id: "123",
      name: companyUpdate.name,
      cnpj: companyUpdate.cnpj,
      active: companyUpdate.isActive(),
    });
  });

  it("should find a company", async () => {
    const companyRepository = new CompanyRepository();
    const company = new Company("123", "Company Name", CNPJ, true);
    
    await companyRepository.create(company);

    const customerResult = await companyRepository.find(company.id);

    expect(company).toStrictEqual(customerResult);
  });

  it("should throw an error when company is not found", async () => {
    const companyRepository = new CompanyRepository();

    expect(async () => {
      await companyRepository.find("ID_NOT_EXISTS");
    }).rejects.toThrow("Company not found");
  });

  it("should find all companies", async () => {
    const companyRepository = new CompanyRepository();

    const company = new Company("123", "Company Name", CNPJ, true);
    const company2 = new Company("456", "Company Name 2", CNPJ_2, false);

    await companyRepository.create(company);
    await companyRepository.create(company2);

    const companies = await companyRepository.findAll();

    expect(companies).toHaveLength(2);
    expect(companies).toContainEqual(company);
    expect(companies).toContainEqual(company2);
  });
});