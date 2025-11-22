import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import { error } from "console";

export async function GET() {
  try {
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.CHARGILY_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: 1000,
        currency: "dzd",
        success_url: "http://localhost:3000/payment/success",
      }),
    };

    const response = await fetch(
      "https://pay.chargily.net/test/api/v2/checkouts",
      options
    );

    // التحقق من نجاح الطلب قبل قراءة JSON
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Chargily API error:", errorText);
      return NextResponse.json(
        { error: "فشل الاتصال بـ Chargily API" },
        { status: response.status }
      );
    }

    const data = await response.json();

    console.log("✅ Checkout URL:", data?.checkout_url);

    // إرجاع الاستجابة الناجحة
    return NextResponse.json({ data });
  } catch (err: unknown) {
    console.error("❌ Error in GET /api route:", err);

    // إرجاع استجابة في حال وقوع أي خطأ
    return NextResponse.json(
      { error: "حدث خطأ أثناء معالجة الطلب", details: error.name },
      { status: 500 }
    );
  }
}
