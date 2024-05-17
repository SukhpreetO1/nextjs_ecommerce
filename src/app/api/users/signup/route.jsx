import { User, NextResponse, bcrypt, connect } from "@/app/api/routes/route";

connect();

export async function POST(request) {
    try {
        const reqBody = await request.json();        
        const { first_name, last_name, email, username, date_of_birth, mobile_number, gender, hobbies, password, role_id } = reqBody;

        const existingUser = await User.findOne({
            $or: [
                { email },
                { username },
                { mobile_number }
            ]
        });

        if (existingUser) {
            if (existingUser.email === email) {
                return NextResponse.json({ error: "Email already exits. Please choose a different email." }, { status: 500 });
            } else if (existingUser.username === username) {
                return NextResponse.json({ error: "Username already exits. Please choose a different username." }, { status: 500 });
            } else if (existingUser.mobile_number === mobile_number) {
                return NextResponse.json({ error: "Mobile number already registered." }, { status: 500 });
            }
        }

        // hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            first_name,
            last_name,
            email,
            username,
            role_id,
            date_of_birth,
            mobile_number,
            gender,
            hobbies,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        return NextResponse.json({ message: "Registered Successfully.", success: true, savedUser }) 
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}