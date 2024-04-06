import { mongoose } from "@/app/api/routes/route"

const categoryHeadingSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Name is required'],
        unique: true
    },
    status: {
        type: Number,
        default: 1,
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

const Category_Heading = mongoose.models && mongoose.models.category_heading ? mongoose.models.category_heading : mongoose.model("category_heading", categoryHeadingSchema);

export default Category_Heading;