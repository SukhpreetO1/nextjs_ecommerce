import { NextResponse, connect } from "@/app/api/routes/route";
import { cookies } from 'next/headers'
connect();

export async function GET(request) {
    try {
        cookies().delete('current_user_token')
        return NextResponse.json({ message: "Cookie removed successfully" });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}