import { Categories, NextResponse, connect } from "@/app/api/routes/route";
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
        const categories = await Categories.findById(params.id);
        return NextResponse.json({ categories });
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