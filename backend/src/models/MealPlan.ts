import mongoose, { Schema, Document } from 'mongoose';

export interface IMealPlan extends Document {
    date: Date;
    meals: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }[];
}

const MealPlanSchema: Schema = new Schema({
    date: { type: Date, required: true },
    meals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
});

export default mongoose.model<IMealPlan>('MealPlan', MealPlanSchema);
