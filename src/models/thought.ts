import { Schema, model, Document } from 'mongoose';
import reactionSchema from './reaction.js';

interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: typeof reactionSchema[];
  reactionCount: number;
}

const thoughtSchema = new Schema<IThought>({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp: Date) => new Date(timestamp)
  },
  username: {
    type: String,
    required: true
  },
  reactions: [reactionSchema]
  }, {
  toJSON: {
    virtuals: true,
    getters: true
  },
  id: false
});

// Virtual for retrieving reaction count
thoughtSchema.virtual('reactionCount').get(function(this: IThought) {
  return this.reactions.length;
});

const Thought = model<IThought>('Thought', thoughtSchema);

export default Thought;
