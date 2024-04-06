import { mongoose } from "@/app/api/routes/route"

const genderSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Name is required'],
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

const Gender = mongoose.models && mongoose.models.gender ? mongoose.models.gender : mongoose.model("gender", genderSchema);

export default Gender;