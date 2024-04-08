import { Category_Types, NextResponse, connect } from "@/app/api/routes/route";
connect();

export async function DELETE(req, {params}) {
    try {
        const category_type = await Category_Types.findByIdAndDelete(params.id);
        return NextResponse.json({ category_type });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function GET(req, {params}){
    try {
        const category_type = await Category_Types.findById(params.id);
        return NextResponse.json({ category_type });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function PUT(req, {params}) {
    try {
        const reqBody = await req.json();        
        const { name, status } = reqBody;
        const category_type = await Category_Types.findByIdAndUpdate(params.id, {name, status});
        return NextResponse.json({ category_type }); 
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}