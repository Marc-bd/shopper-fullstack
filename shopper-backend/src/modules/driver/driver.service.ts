import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DriverEntity } from './driver.entity';
import { Repository } from 'typeorm';
import { FeedbackEntity } from '../feedback/feedback.entity';
import { RequestGetDriverDTO } from './dtos/RequestGetDriverDTO';

@Injectable()
export class DriverService implements OnModuleInit {
  constructor(
    @InjectRepository(DriverEntity)
    private driverRepository: Repository<DriverEntity>,
    @InjectRepository(FeedbackEntity)
    private feedbackRepository: Repository<FeedbackEntity>,
  ) {}

  async onModuleInit() {
    await this.createMockDrivers();
  }

  private async createMockDrivers() {
    const mockDrivers = [
      {
        name: 'Homer Simpson',
        description:
          'Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).',
        vehicle: 'Plymouth Valiant 1973 rosa e enferrujado',
        ratePerKm: 2.5,
        minimumKm: 1,
        feedback: {
          rating: 2,
          review:
            'Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.',
        },
      },
      {
        name: 'Dominic Toretto',
        description:
          'Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.',
        vehicle: 'Dodge Charger R/T 1970 modificado',
        ratePerKm: 5.0,
        minimumKm: 5,
        feedback: {
          rating: 4,
          review:
            'Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!',
        },
      },
      {
        name: 'James Bond',
        description:
          'Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.',
        vehicle: 'Aston Martin DB5 clássico',
        ratePerKm: 10.0,
        minimumKm: 10,
        feedback: {
          rating: 5,
          review:
            'Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.',
        },
      },
    ];

    for (const driverData of mockDrivers) {
      const existingDriver = await this.driverRepository.findOne({
        where: { name: driverData.name },
        relations: ['feedback'],
      });

      if (existingDriver) {
        continue;
      }

      const feedback = this.feedbackRepository.create(driverData.feedback);

      const driver = this.driverRepository.create({
        name: driverData.name,
        description: driverData.description,
        vehicle: driverData.vehicle,
        ratePerKm: driverData.ratePerKm,
        minimumKm: driverData.minimumKm,
        feedback,
      });

      await this.driverRepository.save(driver);
    }
  }

  public async getAvaiableDrivers(distance: number) {
    const allDrivers = await this.driverRepository.find({
      relations: ['feedback'],
    });

    if (allDrivers.length > 0) {
      return allDrivers
        .map((driver) =>
          driver.minimumKm <= distance
            ? {
                id: driver.id,
                name: driver.name,
                description: driver.description,
                vehicle: driver.vehicle,
                review: {
                  rating: `${driver.feedback.rating}/5`,
                  comment: driver.feedback.review,
                },
                value: (driver.ratePerKm * distance) / 1000,
              }
            : undefined,
        )
        .filter(Boolean)
        .sort((a, b) => a.value - b.value);
    }

    return [];
  }

  public async getAllDrivers(): Promise<RequestGetDriverDTO[]> {
    const data = await this.driverRepository.find();

    if (data.length > 0) {
      return data.map((driver) => ({
        id: driver.id,
        name: driver.name,
      }));
    } else {
      return [];
    }
  }
}
