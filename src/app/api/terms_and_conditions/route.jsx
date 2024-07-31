import { NextResponse, connect, User, Terms_and_conditions } from "@/app/api/routes/route";

connect();

export async function GET() {
    try {
        const terms_and_conditions = await Terms_and_conditions.findOne({});
        return NextResponse.json({ terms_and_conditions });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
