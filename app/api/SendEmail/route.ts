import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/SendMail";

export async function POST(request: Request) {
  const { to, subject, html } = await request.json();

  if (!to || !subject || !html) {
    return NextResponse.json(
      { success: false, error: "Missing fields" },
      { status: 400 }
    );
  }

  try {
    await sendEmail(to, subject, html);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("SendMail API error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
