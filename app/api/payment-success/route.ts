import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import Participant from "@/models/Participants";
import Membership from "@/models/Membership";
import { sendEmail } from "@/lib/SendMail";
export async function POST(req: Request) {
  try {
    const { referenceId, referenceType } = await req.json();
    await connectDB();

    // ✅ Case: Donation (no referenceId or referenceType)
    if (!referenceId || !referenceType) {
      return NextResponse.json({
        success: true,
        message: "Donation received. No update required.",
      });
    }

    let updated;
    let emailSent = false; // track email sent status
    switch (referenceType) {
      case "participant":
        updated = await Participant.findByIdAndUpdate(
          referenceId,
          { paymentStatus: "Paid" },
          { new: true }
        );

        if (updated.email) {
          try {
            await sendEmail(
              updated.email,
              "Participant Payment Confirmation",
              `<h1>Thank you for your participant payment!</h1>
              <p>Your Booking is confirmed see you at the event!</p>`
            );
            emailSent = true;
          } catch (error) {
            console.error("Failed to send email:", error);
            emailSent = false;
          }
        }
        if (!updated) {
          return NextResponse.json(
            { success: false, message: "Participant not found" },
            { status: 404 }
          );
        }
        break;

      case "membership":
        updated = await Membership.findByIdAndUpdate(
          referenceId,
          { paymentStatus: "Paid" },
          { new: true }
        );
        if (!updated) {
          return NextResponse.json(
            { success: false, message: "Membership not found" },
            { status: 404 }
          );
        }

        try {
          if (updated.email) {
            try {
              await sendEmail(
                updated.email,
                `${referenceType} Payment Confirmation`,
                `<h1>Thank you for your payment!</h1><p>Your ${referenceType}  is confirmed.</p>`
              );
              emailSent = true;
            } catch (error) {
              console.error("Failed to send email:", error);
              emailSent = false;
            }
          }
        } catch (error) {
          console.error("Failed to send email:", error);
        }

        break;

      default:
        return NextResponse.json(
          { success: false, message: "Invalid reference type" },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      message: `${referenceType} payment updated successfully.`,
    });
  } catch (err) {
    console.error("❌ Error updating payment status:", err);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
