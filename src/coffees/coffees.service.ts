import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './schemas/coffee.schema';

@Injectable()
export class CoffeesService {
  constructor(@InjectModel(Coffee.name) private coffeeModel: Model<Coffee>) {}

  async create(createCoffeeDto: CreateCoffeeDto) {
    const createCoffee = new this.coffeeModel(createCoffeeDto);
    await createCoffee.save();

    return true;
  }

  async findAll() {
    return await this.coffeeModel.find().exec();
  }

  findOne(id: number) {
    return 'findOne';
  }

  update(id: number, updateCoffeeDto: UpdateCoffeeDto) {
    return `This action updates a #${id} coffee`;
  }

  remove(id: number) {
    return `This action removes a #${id} coffee`;
  }
}
