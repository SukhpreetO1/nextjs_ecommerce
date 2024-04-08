import { mongoose } from "@/app/api/routes/route"

const termsAndConditionsSchema = new mongoose.Schema({
    details: {
        type: String,
        required: [true, 'Details is required'],
        unique: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

const Terms_and_conditions = mongoose.models && mongoose.models.terms_and_conditions ? mongoose.models.terms_and_conditions : mongoose.model("terms_and_conditions", termsAndConditionsSchema);

export default Terms_and_conditions;