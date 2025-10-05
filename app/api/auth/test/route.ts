import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    // Test database connection
    const client = await clientPromise;
    const db = client.db();

    // Test if we can access the users collection
    const users = db.collection("users");
    const userCount = await users.countDocuments();

    return NextResponse.json({
      success: true,
      message: "Database connection successful",
      userCount,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Database test error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          error: "Email and password are required",
        },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();
    const users = db.collection("users");

    const user = await users.findOne({ email });

    return NextResponse.json({
      success: true,
      userFound: !!user,
      email: email,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Auth test error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
