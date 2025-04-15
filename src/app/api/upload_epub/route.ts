import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import storeFiles from "@/server-actions/store/storeFiles";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;
  if (!file) return NextResponse.json({ success: false }, { status: 400 });

  const headersList = headers();
  const uuid = headersList.get("X-user-UUID");
  if (!uuid) return NextResponse.json({ success: false }, { status: 403 });

  const timestemp = String(Date.now());

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const store = storeFiles();
    const storePromise = store.storeEpub(
      buffer,
      `/${uuid}/books/${timestemp}/${timestemp}.epub`
    );
    const downloadURL = await Promise.race([
      storePromise,
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timeout")), 5000)
      ),
    ]);

    return NextResponse.json(
      { success: true, data: { downloadURL, id: timestemp } },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      { error: true, message: "Upload time out" },
      { status: 403 }
    );
  }
}
