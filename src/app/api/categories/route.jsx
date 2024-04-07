import { NextResponse, connect, Categories } from "@/app/api/routes/route";

connect();

export async function GET(request) {
    try {
        const categories = await Categories.findOne({});
        return NextResponse.json({ categories });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}