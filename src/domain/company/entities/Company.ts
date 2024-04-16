import Entity from '../../@shared/entities/entity.abstract';
import { CNPJService } from '../services/CNPJService';

export default class Employee extends Entity {

  private _name: string = "";
  private _cnpj: string = "";
  private _active: boolean;

  constructor(id: string, name: string, cnpj: string, active: boolean) {
    super();
    this._id = id
    this._name = name;
    this._cnpj = CNPJService.clear(cnpj);
    this._active = active;
    this.validate();
  }

  get name(): string {
    return this._name;
  }

  get cnpj(): string {
    return this._cnpj;
  }

  isActive(): boolean {
    return this._active;
  }

  validate(): void {
    if(!this._id || !this._id.trim()) {
      throw new Error('Id is required');
    }
    if(!this._name || !this._name.trim()) {
      throw new Error('Name is required');
    }
    if(!this._cnpj || !this._cnpj.trim()) {
      throw new Error('Cnpj is required');
    }
    if(!CNPJService.validate(this._cnpj)) {
      throw new Error('Cnpj is invalid');
    }
  }
  
  activate() {
    this.validate();
    this._active = true;
  }
}