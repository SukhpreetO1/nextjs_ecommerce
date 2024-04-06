import { mongoose } from "@/app/api/routes/route"

const categoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Name is required'],
        unique: true
    },
    category_heading_id: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'category_heading',
    },
    category_type_id: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'category_types',
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

const Categories = mongoose.models && mongoose.models.categories ? mongoose.models.categories : mongoose.model("categories", categoriesSchema);

export default Categories;