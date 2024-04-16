import Address from '../valueObjects/address';
import Employee from './Employee';

const EmployeeIndexProp = {
    Ignore: -1,
    Id: 0,
    Name: 1,
    Cpf: 2,
    Rg: 3,
    Birthday: 4,
    Email: 5,
    Phone: 6,
    Address: 7,
    Department: 8,
    JobTitle: 9,
    Active: 10
}

const createAddress = (): Address => {
    return new Address("Address", 1000, "00001-001", "City");
}

const CreateEmployeeMissingProperty = (indexPropertyMissing: number): Employee => {
    const propertiesValues: string[] = ['1', 'John Doe', '12345678901', '1234567', '1990-01-01', '11 98844-5500', 'johndoetest@gmail.com', 'Address', 'Department', 'Job Title'];
    let address: Address = createAddress();
    
    if (indexPropertyMissing > EmployeeIndexProp.Ignore) {
        propertiesValues[indexPropertyMissing] = '';
    }

    if (indexPropertyMissing == EmployeeIndexProp.Address){
        address = null;
    }

    return new Employee(propertiesValues[EmployeeIndexProp.Id], 
        propertiesValues[EmployeeIndexProp.Name], 
        propertiesValues[EmployeeIndexProp.Cpf],
        propertiesValues[EmployeeIndexProp.Rg],
        propertiesValues[EmployeeIndexProp.Birthday],
        propertiesValues[EmployeeIndexProp.Email],
        propertiesValues[EmployeeIndexProp.Phone],
        address,
        propertiesValues[EmployeeIndexProp.Department],
        propertiesValues[EmployeeIndexProp.JobTitle],
        true)
}

describe('Employee unit tests', () => {

  describe('Create new instance', () => {

    it("should throw error when ID is empty", () => {
        expect(() => {
            let employee = CreateEmployeeMissingProperty(EmployeeIndexProp.Id);
        }).toThrowError("Id is required");
    });

    it("should throw error when ID is empty", () => {
        expect(() => {
            let employee = CreateEmployeeMissingProperty(EmployeeIndexProp.Id);
        }).toThrowError("Id is required");
    });

    it("should throw error when ID is empty", () => {
        expect(() => {
            let employee = CreateEmployeeMissingProperty(EmployeeIndexProp.Id);
        }).toThrowError("Id is required");
    });

    it("should throw error when Name is empty", () => {
        expect(() => {
            let employee = CreateEmployeeMissingProperty(EmployeeIndexProp.Name);
        }).toThrowError("Name is required");
    });

    it("should throw error when Cpf is empty", () => {
        expect(() => {
            let employee = CreateEmployeeMissingProperty(EmployeeIndexProp.Cpf);
        }).toThrowError("Cpf is required");
    });

    it("should throw error when RG is empty", () => {
        expect(() => {
            let employee = CreateEmployeeMissingProperty(EmployeeIndexProp.Rg);
        }).toThrowError("Rg is required");
    });

    it("should throw error when Birthday is empty", () => {
        expect(() => {
            let employee = CreateEmployeeMissingProperty(EmployeeIndexProp.Birthday);
        }).toThrowError("Birthday is required");
    });

    it("should throw error when Address is empty", () => {
        expect(() => {
            let employee = CreateEmployeeMissingProperty(EmployeeIndexProp.Address);
        }).toThrowError("Address is required");
    });

    it("should throw error when Department is empty", () => {
        expect(() => {
            let employee = CreateEmployeeMissingProperty(EmployeeIndexProp.Department);
        }).toThrowError("Department is required");
    });

    it("should throw error when Job Title is empty", () => {
        expect(() => {
            let employee = CreateEmployeeMissingProperty(EmployeeIndexProp.JobTitle);
        }).toThrowError("Job Title is required");
    });

    it('should throw an error if neither phone nor email is filled', () => {
      expect(() => {
        new Employee('1', 'John Doe', '12345678901', '1234567', '1990-01-01', '', '', createAddress(), 'Department', 'Job Title', true);
      }).toThrowError('Phone or Email must be filled.');
    });
  });

  describe('activate', () => {
    it('should activate the employee if all validations pass', () => {
      let employee = CreateEmployeeMissingProperty(EmployeeIndexProp.Ignore);
      
      employee.inactivate();
      expect(employee.isActive()).toBe(false);
      employee.activate();
      expect(employee.isActive()).toBe(true);
    });
  });
});
