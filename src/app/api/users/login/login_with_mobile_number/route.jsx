import { User, NextResponse, jwt, connect } from "@/app/api/routes/route";
connect();

export async function POST(request) {
    try {
        const reqBody = await request.json();        
        const { phoneNumber } = reqBody;

        const existingUser = await User.findOne({
            $or: [
                { phoneNumber }
            ]
        });

        if (existingUser) {
            if (existingUser.phoneNumber === phoneNumber) {
                return NextResponse.json({ error: "Mobile number already exits. Please choose a different mobile number." }, { status: 500 });
            }
        }

        const tokenData = {
            phoneNumber: phoneNumber
        }

        const token = await jwt.sign(tokenData, process.env.NEXT_PUBLIC_TOKEN_SECRET, {expiresIn: "30min"})

        const newUser = new User({
            first_name : "",
            last_name : "",
            email : "",
            username : "",
            date_of_birth : "",
            mobile_number : phoneNumber,
            gender : "",
            hobbies : "",
            password : ""
        });

        const savedUser = await newUser.save();
        return NextResponse.json({ message: "Registered Successfully.", success: true, savedUser, token }) 
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}