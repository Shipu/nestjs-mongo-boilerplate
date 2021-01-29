import { JoiSchema } from 'nestjs-joi';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as Joi from 'joi';

export class CatDto {
  @JoiSchema(Joi.string().required())
  name!: string;

  @JoiSchema(Joi.number().required())
  age!: number;

  @JoiSchema(Joi.string().required())
  breed!: string;
}
