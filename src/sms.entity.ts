import { model, Schema, Types } from 'mongoose'

export interface ISms {
    phone: string;
    phoneFrom: string;
    text: string;
}

export const SmsSchema = new Schema<ISms>({
    phone: String,
    phoneFrom: String,
    text: String,
})

export const SmsModel = model<ISms>('Sms', SmsSchema)