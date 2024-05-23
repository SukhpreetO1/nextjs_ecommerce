import { Categories, NextResponse, connect, Category_Heading, Category_Types } from "@/app/api/routes/route";
connect();

export async function DELETE(req, {params}) {
    try {
        const categories = await Categories.findByIdAndDelete(params.id);
        return NextResponse.json({ categories });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function GET(req, {params}){
    try {
        const category_heading = await Category_Heading.findById(params.id);
        const category_types = await Category_Types.find({ category_heading_id: category_heading._id });
        return NextResponse.json({ category_types });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function PUT(req, {params}) {
    try {
        const reqBody = await req.json();        
        const { name, status } = reqBody;
        const categories = await Categories.findByIdAndUpdate(params.id, {name, status});
        return NextResponse.json({ categories }); 
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}