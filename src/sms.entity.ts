import { model, Schema, Types } from 'mongoose'

export interface ISms {
    phone: number;
    phoneFrom: string;
    text: string;
}

export const SmsSchema = new Schema<ISms>({
    phone: Number,
    phoneFrom: String,
    text: String,
})

export const SmsModel = model<ISms>('Sms', SmsSchema)