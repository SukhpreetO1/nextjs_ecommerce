import { NextResponse, connect, Categories } from "@/app/api/routes/route";
connect();

export async function GET() {
    try {
        const categories = await Categories.findOne({});
        return NextResponse.json({ categories });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { name } = reqBody;
        const categoryData = new Categories({ name });
        const categories = await categoryData.save();
        return NextResponse.json({ categories });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}