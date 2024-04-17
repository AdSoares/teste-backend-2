import UpdateEmployeeUseCase from "./UpdateEmployeeUseCase";

const input = {
    id: "123",
    name: "Employe 123", 
    cpf: "33004726017", 
    rg: "2737787428", 
    birthday: "1990-01-01", 
    email: "123@gmail.com", 
    phone: "1199887766", 
    department: "department", 
    jobTitle: "job title", 
    active: true,
    address: {
        street: 'Street',
        city: 'São Paulo',
        number: 1000,
        zip: '18000100',
    },
    companyId: '4820b1e7-c85d-4fa9-8606-737a3dc83477'
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe('Create Employee unit tests', () => {
  it('should create a employee', async () => {
    const employeeRepository = MockRepository();
    const updateEmployeeUseCase = new UpdateEmployeeUseCase(employeeRepository);

    const output = await updateEmployeeUseCase.execute(input);

    expect(output).toEqual({
        id: input.id,
        name: input.name,
        cpf: input.cpf, 
        rg: input.rg, 
        birthday: input.birthday, 
        email: input.email, 
        phone: input.phone, 
        department: input.department, 
        jobTitle: input.jobTitle, 
        active: input.active,
        address: {
            street: input.address.street,
            number: input.address.number,
            zip: input.address.zip,
            city: input.address.city
        },
        companyId: input.companyId
    })
  });

  it('should throw an error when name is missing', async () => {
    const employeeRepository = MockRepository();
    const createEmployeeUseCase = new UpdateEmployeeUseCase(employeeRepository);

    input.name = '';

    await expect(createEmployeeUseCase.execute(input)).rejects.toThrow('Name is required');
  });

  it('should throw an error when street is missing', async () => {
    const employeeRepository = MockRepository();
    const createEmployeeUseCase = new UpdateEmployeeUseCase(employeeRepository);

    input.address.street = '';

    await expect(createEmployeeUseCase.execute(input)).rejects.toThrow('Street is required');
  });
});