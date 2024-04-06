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