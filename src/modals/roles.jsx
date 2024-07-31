import { mongoose } from "@/app/api/routes/route"

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Role name is required'],
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

const Roles = mongoose.models?.roles || mongoose.model("roles", roleSchema);

export default Roles;