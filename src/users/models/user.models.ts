import { Column, HasMany, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column
  name: string;

  @Column
  phone: string;

  @Column
  local: string;

  @Column
  service: string;

  @Column
  department: string;

  // @HasMany(() => Basket, {
  //   onDelete: 'CASCADE',
  //   onUpdate: 'CASCADE',
  // })
  // basket: Basket[];
}
