import { User, NextResponse, jwt, connect } from "@/app/api/routes/route";

connect();

export async function POST(request) {
    try {
        const reqBody = await request.json();        
        const { fullname, email } = reqBody;

        const existingUser = await User.findOne({
            $or: [
                { email }
            ]
        });

        if (existingUser) {
            if (existingUser.email === email) {
                return NextResponse.json({ error: "Email already exits. Please choose a different email." }, { status: 500 });
            }
        }

        const tokenData = {
            email: email
        }

        const token = await jwt.sign(tokenData, process.env.NEXT_PUBLIC_TOKEN_SECRET, {expiresIn: "30min"})

        const [first_name, last_name] = fullname.split(' ');
        const newUser = new User({
            first_name : first_name,
            last_name : last_name,
            email : email,
            username : "",
            date_of_birth : "",
            mobile_number : "",
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