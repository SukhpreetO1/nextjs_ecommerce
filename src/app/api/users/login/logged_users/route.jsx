import { NextResponse, connect, jwt } from "@/app/api/routes/route";

connect();

export async function GET(request) {
    try {
        const tokenWithQuotes = await request.cookies.get('current_user_token');
        if (!tokenWithQuotes) {
            return NextResponse.json({ decodedToken: "" });
        }
        const token = tokenWithQuotes.value.replace(/^"|"$/g, '');
        const decodedToken = jwt.decode(token);
        return NextResponse.json({ decodedToken });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
