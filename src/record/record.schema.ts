import * as mongoose from 'mongoose';
const { Schema } = mongoose;

export const RecordSchema = new Schema({
  name: String,
  gender: String,
  email: String,
  mobile: String,
  technologies: String,
  profile: String,
});
