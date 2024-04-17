export interface InputCreateEmployeeDTO {
    name: string,
    cpf: string,
    rg: string,
    birthday: string,
    email: string,
    phone: string,
    department: string,
    jobTitle: string,
    active: boolean,
    address: {
      street: string;
      city: string;
      number: number;
      zip: string;
    },
    companyId: string
  }
  
  export interface OutputCreateEmployeeDTO {
    id: string,
    name: string,
    cpf: string,
    rg: string,
    birthday: string,
    email: string,
    phone: string,
    department: string,
    jobTitle: string,
    active: boolean,
    address: {
      street: string;
      city: string;
      number: number;
      zip: string;
    },
    companyId: string
  }