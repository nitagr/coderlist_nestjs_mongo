import { Document } from 'mongoose';

export interface Record extends Document {
  readonly name: string;
  readonly gender: string;
  readonly email: string;
  readonly mobile: string;
  readonly technologies: string;
  readonly profile: string;
}
