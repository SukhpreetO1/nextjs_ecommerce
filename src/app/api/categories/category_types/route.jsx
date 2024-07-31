import { NextResponse, connect, Category_Types } from "@/app/api/routes/route";
connect();
export async function GET() {
    try {
        const category_types = await Category_Types.aggregate([
            {
                $lookup: {
                    from: "category_headings",
                    localField: "category_heading_id",
                    foreignField: "_id",
                    as: "category_heading"
                }
            },
            {
                $addFields: {
                    category_heading_id: { $arrayElemAt: ["$category_heading", 0] }
                }
            },
            {
                $unset: "category_heading"
            },
        ]);
        return NextResponse.json({ category_types });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function POST (request) {
    try {
        const reqBody = await request.json();        
        const { name, category_heading_id } = reqBody;
        const categoryTypes = new Category_Types({ name, category_heading_id });
        const category_type = await categoryTypes.save();
        return NextResponse.json({ category_type });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}