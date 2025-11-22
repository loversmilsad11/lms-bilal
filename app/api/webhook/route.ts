import { NextResponse } from "next/server";
import crypto from "crypto";
import { env } from "@/lib/env";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    if (!env.CHARGILY_SECRET_KEY) {
      return NextResponse.json(
        { error: "Chargily secret key not configured" },
        { status: 500 }
      );
    }

    const signature = req.headers.get("signature");

    // If there's no signature, return 400
    if (!signature) {
      return NextResponse.json(
        { error: "No signature provided" },
        { status: 400 }
      );
    }

    // Get the raw payload
    const payload = await req.text();

    // Calculate the signature
    const computedSignature = crypto
      .createHmac("sha256", env.CHARGILY_SECRET_KEY)
      .update(payload)
      .digest("hex");

    // If signatures don't match, return 403
    if (computedSignature !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
    }

    // Parse the JSON payload
    const event = JSON.parse(payload);

    // Handle different event types
    switch (event.type) {
      case "checkout.paid":
        const checkout = event.data;
        console.log("Payment successful:", checkout);
        
        // Update enrollment status to Active
        if (checkout.metadata?.enrollmentId) {
          try {
            await prisma.enrollment.update({
              where: {
                id: checkout.metadata.enrollmentId,
              },
              data: {
                status: "Active",
                updatedAt: new Date(),
              },
            });
            console.log(`Enrollment ${checkout.metadata.enrollmentId} activated successfully`);
          } catch (error) {
            console.error("Error updating enrollment:", error);
            // Don't return error, webhook should still return 200
          }
        } else {
          console.warn("No enrollmentId found in checkout metadata");
        }
        break;

      case "checkout.failed":
        const failedCheckout = event.data;
        console.log("Payment failed:", failedCheckout);
        
        // Optionally update enrollment status to Cancelled or keep as Pending
        if (failedCheckout.metadata?.enrollmentId) {
          try {
            await prisma.enrollment.update({
              where: {
                id: failedCheckout.metadata.enrollmentId,
              },
              data: {
                status: "Cancelled",
                updatedAt: new Date(),
              },
            });
            console.log(`Enrollment ${failedCheckout.metadata.enrollmentId} marked as cancelled`);
          } catch (error) {
            console.error("Error updating enrollment:", error);
          }
        }
        break;

      default:
        console.log("Unhandled event type:", event.type);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
