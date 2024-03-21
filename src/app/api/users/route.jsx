import { User, NextResponse, connect, bcryptjs } from "@/app/api/routes/route";

connect();

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { first_name, last_name, email, username, date_of_birth, mobile_number, gender, hobbies, password } = reqBody;

        console.log(reqBody);

        const existingUser = await User.findOne({
            $or: [
                { email },
                { username },
                { mobile_number }
            ]
        });

        // hashing password
        const salt = await bcryptjs.genSalt(15);
        const hashedPassword = await bcryptjs.hash(password, salt);

        if (existingUser) {
            console.log(existingUser);
            if (existingUser.email === email) {
                return NextResponse.json({ error: "Email already registered" }, { status: 500 });
            } else if (existingUser.username === username) {
                return NextResponse.json({ error: "Username already taken" }, { status: 500 });
            } else if (existingUser.mobile_number === mobile_number) {
                return NextResponse.json({ error: "Mobile number already registered" }, { status: 500 });
            }
        }

        const newUser = new User({
            first_name,
            last_name,
            email,
            username,
            date_of_birth,
            mobile_number,
            gender,
            hobbies,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        console.log(savedUser);

        return NextResponse.json({ message: "New user created successfully.", success: true, savedUser }) 
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

}