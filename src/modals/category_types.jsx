import { mongoose } from "@/app/api/routes/route"

const categoryTypesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    category_heading_id : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'category_headings',
    },
    status: {
        type: Number,
        default: 1, // 1 for active, 2 for inactive
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

const Category_Types = mongoose.models?.category_types || mongoose.model("category_types", categoryTypesSchema);

export default Category_Types;