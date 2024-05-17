import { mongoose } from "@/app/api/routes/route";

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        require: [true, 'First name is required'],
    },
    last_name: {
        type: String,
        require: [true, 'Last name is required'],
    },
    email: {
        type: String,
        require: [true, 'Email is required'],
        unique: true,
    },
    username: {
        type: String,
        require: [true, 'First name is required'],
        unique: true,
    },
    role_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'roles',
    },
    date_of_birth: {
        type: Date,
        require: [true, 'Date of birth is required'],
    },
    mobile_number: {
        type: String,
        require: [true, 'Mobile number is required'],
        unique: true,
    },
    gender: {
        type: String,
        require: [true, 'Gender is required'],
    },
    hobbies: {
        type: [String],
        require: [true, 'Hobby is required'],
    },
    password: {
        type: String,
        require: [true, 'Password is required'],
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