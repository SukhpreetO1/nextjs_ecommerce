import { User, NextResponse, bcrypt, connect, jwt, Roles, USER_DASHBOARD, ADMIN_DASHBOARD } from "@/app/api/routes/route";

connect();

export async function POST(request) {
    try {
        const reqBody = await request.json();        
        const { email, password } = reqBody;

        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({ error: "User not found" }, { status: 500 });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword){
            return NextResponse.json({ error: "Invalid password" }, { status: 500 });
        }

        const role = await Roles.findOne({ _id: user.role_id });
        if (!role) {
            return NextResponse.json({ error: "Role not found" }, { status: 500 });
        }

        const tokenData = {
            id: user._id,
            email: user.email,
            role_name: role.name
        }

        const token = await jwt.sign(tokenData, process.env.NEXT_PUBLIC_TOKEN_SECRET, {expiresIn: "10min"})

        let redirectUrl;
        if(tokenData.role_name === "Super Admin"){
            redirectUrl = ADMIN_DASHBOARD;
        } else if (tokenData.role_name === "Admin") {
            redirectUrl = ADMIN_DASHBOARD;
        } else if (tokenData.role_name === "Users") {
            redirectUrl = USER_DASHBOARD;
        }
        return NextResponse.json({ token, redirectUrl });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}