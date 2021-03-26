import * as mongoose from 'mongoose';
const { Schema } = mongoose;

export const RecordSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    required: true,
  },

  mobile: {
    type: String,
    required: true,
  },
  technologies: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
    required: true,
  },
});
