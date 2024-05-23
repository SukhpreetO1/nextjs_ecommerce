import { mongoose } from "@/app/api/routes/route";

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, 'First name is required'],
    },
    last_name: {
        type: String,
        required: [true, 'Last name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    username: {
        type: String,
        required: [true, 'First name is required'],
        unique: true,
    },
    role_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'roles',
    },
    date_of_birth: {
        type: Date,
        required: [true, 'Date of birth is required'],
    },
    mobile_number: {
        type: String,
        required: [true, 'Mobile number is required'],
        unique: true,
    },
    gender: {
        type: String,
        required: [true, 'Gender is required'],
    },
    hobbies: {
        type: [String],
        required: [true, 'Hobby is required'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
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

const User = mongoose.models && mongoose.models.users ? mongoose.models.users : mongoose.model("users", userSchema);

export default User;