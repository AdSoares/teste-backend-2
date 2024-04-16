export interface InputListEmployeeDTO {}
  
type EmployeeDto = {
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
  }
}

export interface OutputListEmployeeDTO {
  employees: EmployeeDto[];
}