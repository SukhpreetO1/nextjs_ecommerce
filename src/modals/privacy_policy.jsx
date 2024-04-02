import { mongoose } from "@/app/api/routes/route"

const privacyPolicySchema = new mongoose.Schema({
    details: {
        type: String,
        require: [true, 'Details is required'],
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

const Privacy_Policy = mongoose.models && mongoose.models.privacy_policy ? mongoose.models.privacy_policy : mongoose.model("privacy_policy", privacyPolicySchema);

export default Privacy_Policy;