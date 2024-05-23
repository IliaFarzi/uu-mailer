import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class EmailLog extends Document {
  @Prop()
  data: string;

  @Prop()
  template: string;

  @Prop()
  timeSent: Date;

  @Prop()
  status: string;
}

export const EmailLogSchema = SchemaFactory.createForClass(EmailLog);