import mongoose from 'mongoose';

const DataSchema = new mongoose.Schema(
  {
    localidade: String,
    frequencia: String,
    keyword: String,
    scrapResult: String,
  },
  { timestamps: true },
);

export const DataModel = mongoose.model('Data', DataSchema);
