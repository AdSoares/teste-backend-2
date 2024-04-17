import { Model, Table, PrimaryKey, Column } from 'sequelize-typescript';

@Table({
  tableName: "employee",
  timestamps: false,
})
export default class EmployeeModel extends Model {

  @PrimaryKey
  @Column
  declare id: string;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare cpf: string;

  @Column({ allowNull: false })
  declare rg: string;

  @Column({ allowNull: false })
  declare birthday: string;

  @Column({ allowNull: true })
  declare email: string;

  @Column({ allowNull: true })
  declare phone: string;

  @Column({ allowNull: false })
  declare street: string;

  @Column({ allowNull: false })
  declare number: number;

  @Column({ allowNull: false })
  declare zipcode: string;

  @Column({ allowNull: false })
  declare city: string;

  @Column({ allowNull: false })
  declare department: string;

  @Column({ allowNull: false })
  declare jobTitle: string;

  @Column({ allowNull: false })
  declare active: boolean;

  @Column({ allowNull: false })
  declare companyId: string;
}