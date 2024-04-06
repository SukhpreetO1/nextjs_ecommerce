import { NextResponse, connect, Category_Types } from "@/app/api/routes/route";

connect();

export async function GET(request) {
    try {
        const category_types = await Category_Types.find({});
        return NextResponse.json({ category_types });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
