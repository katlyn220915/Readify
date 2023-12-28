import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

import storeFiles from "@/server-actions/store/storeFiles";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  console.log(data);
  if (!data) return NextResponse.json({ success: false }, { status: 400 });
}
