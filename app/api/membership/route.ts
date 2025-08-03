import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import Membership from "@/models/Membership";

export async function POST(req: Request) {
  await connectDB();

  try {
    const body = await req.json();

    const {
      name,
      email,
      gender,
      phone,
      address,
      postcode,
      photoConsent,
      membershipType,
      agreeToConduct,
    } = body;

    // Validation
    if (
      !name ||
      !email ||
      photoConsent === null ||
      !membershipType ||
      !agreeToConduct
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create membership with initial payment status
    const newMember = await Membership.create({
      name,
      email,
      gender,
      phone,
      address,
      postcode,
      photoConsent,
      membershipType,
      agreeToConduct,
      paymentStatus: "Pending", // 👈 Add initial payment status
    });

    return NextResponse.json(
      {
        message: "Membership created",
        data: newMember,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Membership submission failed:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
