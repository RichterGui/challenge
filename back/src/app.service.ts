import { Injectable } from '@nestjs/common';
import { DataModel } from './models/Data';
import 'dotenv/config';
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_URL);
@Injectable()
export class AppService {
  getHello(): any {
    const allRegisters = DataModel.find().exec();
    return allRegisters;
  }

  postData(
    localidade: string,
    frequencia: string,
    keyword: string,
    scrapResult: string,
  ): any {
    const insertData = DataModel.create({
      localidade: localidade,
      frequencia: frequencia,
      keyword: keyword,
      scrapResult: scrapResult,
    });

    return insertData;
  }
}
