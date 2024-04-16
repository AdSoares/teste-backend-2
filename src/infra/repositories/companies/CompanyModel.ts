import { Model, Table, PrimaryKey, Column } from 'sequelize-typescript';

@Table({
  tableName: "company",
  timestamps: false,
})
export default class CompanyModel extends Model {

  @PrimaryKey
  @Column
  declare id: string;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare cnpj: string;

  @Column({ allowNull: false })
  declare active: boolean;
}