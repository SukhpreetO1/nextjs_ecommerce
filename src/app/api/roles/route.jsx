import { NextResponse, connect, Roles } from "@/app/api/routes/route";

connect();

export async function POST() {
    try {
        const adminRole = await Roles.findOne({ name: "Admin" });
        if (!adminRole) {
            const adminRoleData = new Roles({ name: "Admin" });
            const adminRoleDataSaved = await adminRoleData.save();
        }
        
        const superAdminRole = await Roles.findOne({ name: "Super Admin" });
        if (!superAdminRole) {
            const superAdminRoleData = new Roles({ name: "Super Admin" });
            const superAdminRoleDataSaved = await superAdminRoleData.save();
        }

        const userRole = await Roles.findOne({ name: "User" });
        if (!userRole) {
            const userRoleData = new Roles({ name: "User" });
            const userRoleDataSaved = await userRoleData.save();
        }
        return NextResponse.json({ _id: userRole._id });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}