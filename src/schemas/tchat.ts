import { Schema, model, Types, models } from 'mongoose';

const TChatSchema = new Schema({
  chatId: { type: Number, required: true, unique: true },
  companyId: { type: Types.ObjectId, required: true, unique: true },
});

export default models.Chats || model('TCart', TChatSchema);
