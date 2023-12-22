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

  findOne(id: string) {
    return this.coffeeModel.findOne({ _id: id }).exec();
  }

  async findOneByName(name: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const queryOptions = name
      ? this.coffeeModel.findOne({ name: { $regex: new RegExp(name, 'i') } })
      : {};

    const query = this.coffeeModel.find(queryOptions);

    query.skip(skip).limit(limit).sort({ _id: 'desc' });

    // 执行查询并获取列表
    const list = await query.exec();

    // 获取总记录数
    const total = await this.coffeeModel.countDocuments(queryOptions);

    let reslut = { list, total };

    if (!Array.isArray(list)) {
      reslut.list = [list];
    }

    return reslut;
  }

  update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeeModel.findByIdAndUpdate({ _id: id }, updateCoffeeDto);
  }

  remove(id: string): Promise<any> {
    return this.coffeeModel.deleteOne({ _id: id });
  }
}
