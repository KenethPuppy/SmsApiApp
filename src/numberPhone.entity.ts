import { model, Schema, Types } from 'mongoose'

export interface INumberPhone {
  phoneNumber: number;
  country: string;
  operator: string;
}

export const NumberPhoneSchema = new Schema<INumberPhone>( {
    phoneNumber: Number,
    country: String,
    operator: String,
}
)

export const NumberPhoneModel = model<INumberPhone>('NumberPhone', NumberPhoneSchema);