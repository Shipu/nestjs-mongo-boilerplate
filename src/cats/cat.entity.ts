import { Table, Column, Model } from 'sequelize-typescript';

@Table({ tableName: 'cats' })
export class Cat extends Model {
  @Column
  name: string;

  @Column
  age: number;

  @Column
  breed: string;
}
