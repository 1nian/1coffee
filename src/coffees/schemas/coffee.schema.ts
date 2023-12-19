import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CoffeeDocument = HydratedDocument<Coffee>;

@Schema()
export class Coffee {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  description: string;
}

export const CoffeeSchema = SchemaFactory.createForClass(Coffee);
