import { NextResponse, connect, Roles } from "@/app/api/routes/route";

connect();

export async function POST() {
    try {
        const name = "User";
        const role_name = await Roles.findOne({ name });
        if (!role_name) {
            const roleData = new Roles({ name });
            const role_data = await roleData.save();
            return NextResponse.json({ _id: role_data._id });
        } else {
            return NextResponse.json({ _id: role_name._id });
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}