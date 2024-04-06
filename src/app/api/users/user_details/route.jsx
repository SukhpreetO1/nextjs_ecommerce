import { NextResponse, connect, User, Role } from "@/app/api/routes/route";

connect();

export async function GET(request) {
    try {
        const data = await User.aggregate([
            {
                $lookup: {
                    from: "roles",
                    localField: "role_id",
                    foreignField: "_id",
                    as: "role"
                }
            },
            {
                $addFields: {
                    role_id: { $arrayElemAt: ["$role", 0] }
                }
            },
            {
                $unset: "role"
            },
        ]);
        return NextResponse.json({ data });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
