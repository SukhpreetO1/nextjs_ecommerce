import { User, NextResponse, bcrypt, connect, jwt } from "@/app/api/routes/route";

connect();

export async function POST(request) {
    try {
        const reqBody = await request.json();        
        const { email, password } = reqBody;

        console.log(reqBody);

        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({ error: "User not found" }, { status: 500 });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword){
            return NextResponse.json({ error: "Invalid password" }, { status: 500 });
        }

        const tokenData = {
            id: user._id,
            email: user.email
        }

        const token = await jwt.sign(tokenData, process.env.NEXT_PUBLIC_TOKEN_SECRET, {expiresIn: "10min"})
        const response = NextResponse.json({ message: "Login successfully", success: true });
        response.cookies.set("token", token)
        return response
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}