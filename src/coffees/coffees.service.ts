import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffees } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  private coffees: Coffees[] = [
    {
      id: 1,
      name: '111',
      price: 100,
      description: '黑咖啡',
    },
  ];

  create(createCoffeeDto: CreateCoffeeDto) {
    let id = new Date().getTime();

    this.coffees.push({ ...createCoffeeDto, id });

    return createCoffeeDto;
  }

  findAll() {
    return this.coffees;
  }

  findOne(id: number) {
    let findOne = this.coffees.find((coffee) => coffee.id === id);

    if (!findOne) {
      throw new HttpException(`#${id} Coffee not found`, HttpStatus.FORBIDDEN);
    }

    return findOne;
  }

  update(id: number, updateCoffeeDto: UpdateCoffeeDto) {
    let findIndex = this.coffees.findIndex((coffee) => coffee.id === id);
    if (!(findIndex > -1)) {
      throw new HttpException(`#${id} Coffee not found`, HttpStatus.FORBIDDEN);
    }

    this.coffees[findIndex] = {
      ...this.coffees[findIndex],
      ...updateCoffeeDto,
    };

    return `This action updates a #${id} coffee`;
  }

  remove(id: number) {
    // 通过id删除coffees
    let findIndex = this.coffees.findIndex((coffee) => coffee.id === id);
    if (!(findIndex > -1)) {
      throw new HttpException(`#${id} Coffee not found`, HttpStatus.FORBIDDEN);
    }
    this.coffees.splice(findIndex, 1);
    return `This action removes a #${id} coffee`;
  }
}
