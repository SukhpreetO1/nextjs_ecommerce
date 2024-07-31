import { NextResponse, connect, User, Privacy_Policy } from "@/app/api/routes/route";

connect();

export async function GET() {
    try {
        const privacy_policy = await Privacy_Policy.findOne({});
        return NextResponse.json({ privacy_policy });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
