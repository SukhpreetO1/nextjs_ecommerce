import { NextResponse, connect, Category_Heading } from "@/app/api/routes/route";

connect();

export async function GET(request) {
    try {
        const category_heading = await Category_Heading.find({});
        return NextResponse.json({ category_heading });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
