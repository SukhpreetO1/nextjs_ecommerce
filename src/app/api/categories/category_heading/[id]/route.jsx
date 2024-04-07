import { Category_Heading, NextResponse, connect } from "@/app/api/routes/route";
connect();

export async function DELETE(req, {params}) {
    try {
        const category_heading = await Category_Heading.findByIdAndDelete(params.id);
        return NextResponse.json({ category_heading });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function GET(req, {params}){
    try {
        const category_heading = await Category_Heading.findById(params.id);
        return NextResponse.json({ category_heading });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function PUT(req, {params}) {
    try {
        const reqBody = await req.json();        
        console.log(reqBody);
        const { name, status } = reqBody;
        const category_heading = await Category_Heading.findByIdAndUpdate(params.id, {name, status});
        return NextResponse.json({ category_heading }); 
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}