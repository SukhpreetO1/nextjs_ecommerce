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
            name:user.first_name != '' ? user.first_name : '',
            email: user.email,
            role_name: role.name
        }

        const token = await jwt.sign(tokenData, process.env.NEXT_PUBLIC_TOKEN_SECRET, {expiresIn: "30min"})

        let redirectUrl;
        let token_name;
        if(tokenData.role_name === "Super Admin"){
            redirectUrl = ADMIN_DASHBOARD;
            token_name = "current_super_admin_token"
        } else if (tokenData.role_name === "Admin") {
            redirectUrl = ADMIN_DASHBOARD;
            token_name = "current_admin_token"
        } else if (tokenData.role_name === "User") {
            redirectUrl = USER_DASHBOARD;
            token_name = "current_user_token"
        }
        return NextResponse.json({ token, redirectUrl, token_name });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}