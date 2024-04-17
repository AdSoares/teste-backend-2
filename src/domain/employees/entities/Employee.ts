import Entity from '../../@shared/entities/entity.abstract';
import Address from '../valueObjects/address';

export default class Employee extends Entity {

  private _name: string = "";
  private _cpf: string = "";
  private _rg: string = "";
  private _birthday: string = "";
  private _email: string = "";
  private _phone: string = "";
  private _address: Address = null;
  private _department: string = "";
  private _jobTitle: string = "";
  private _active: boolean = false;
  private _companyId: string = "";

  constructor(id: string, 
    name: string, 
    cpf: string,
    rg: string,
    birthday: string,
    email: string,
    phone: string,
    address: Address,
    department: string,
    jobTitle: string,
    active: boolean,
    companyId: string) {
      super();
      this._id = id
      this._name = name;
      this._cpf = cpf;
      this._rg = rg;
      this._birthday = birthday;
      this._email = email;
      this._phone = phone;
      this._address = address;
      this._department = department;
      this._jobTitle = jobTitle;
      this._active = active;
      this._companyId = companyId;
      this.validate();
  }

  get name(): string {
    return this._name;
  }

  get cpf(): string {
    return this._cpf;
  }

  get rg(): string {
    return this._rg;
  }

  get birthday(): string {
    return this._birthday;
  }

  get email(): string {
    return this._email;
  }

  get phone(): string {
    return this._phone;
  }

  get address(): Address {
    return this._address;
  }

  get department(): string {
    return this._department;
  }

  get jobTitle(): string {
    return this._jobTitle;
  }

  get companyId(): string {
    return this._companyId;
  }

  private validateRequired(value: string, propertyName: string): void {
    if (!this.existsContent(value)) {
      throw new Error(`${propertyName} is required.`);
    }
  }

  private existsContent(value: string): boolean {
    return value && value.trim() !== '';
  }

  validate(): void {
    this.validateRequired(this._id, 'Id');
    this.validateRequired(this._name, 'Name');
    this.validateRequired(this._cpf, 'Cpf');
    this.validateRequired(this._rg, 'Rg');
    this.validateRequired(this._birthday, 'Birthday');
    this.validateRequired(this._department, 'Department');
    this.validateRequired(this._jobTitle, 'Job Title');

    if (!this._address) {
      throw new Error(`Address is required.`);
    }

    if (!this.existsContent(this._phone) && !this.existsContent(this._email)) {
      throw new Error(`Phone or Email must be filled.`);
    }
  }
  
  activate() {
    this._active = true;
  }

  inactivate() {
    this._active = false;
  }

  isActive(): boolean {
    return this._active;
  }
}