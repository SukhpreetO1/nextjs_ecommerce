import { mongoose } from "@/app/api/routes/route";

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    username: {
        type: String,
        unique: true,
    },
    role_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'roles',
    },
    date_of_birth: {
        type: Date,
    },
    mobile_number: {
        type: String,
        unique: true,
    },
    gender: {
        type: String,
    },
    hobbies: {
        type: [String],
    },
    password: {
        type: String,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.models?.users || mongoose.model("users", userSchema);

export default User;