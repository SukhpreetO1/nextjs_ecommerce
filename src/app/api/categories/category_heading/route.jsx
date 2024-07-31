import { NextResponse, connect, Category_Heading } from "@/app/api/routes/route";
connect();
export async function GET() {
    try {
        const category_heading = await Category_Heading.find({});
        return NextResponse.json({ category_heading });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function POST(request) {
    try {
        const reqBody = await request.json();        
        const { name } = reqBody;
        const categoryHeading = new Category_Heading({ name });
        const category_heading = await categoryHeading.save();
        return NextResponse.json({ category_heading });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}