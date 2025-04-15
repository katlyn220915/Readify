import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import storeFiles from "@/server-actions/store/storeFiles";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;
  const id: string | null = data.get("id") as string | null;
  if (!file || !id)
    return NextResponse.json({ success: false }, { status: 400 });

  const headersList = headers();
  const uuid = headersList.get("X-user-UUID");
  if (!uuid) return NextResponse.json({ success: false }, { status: 403 });

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const store = storeFiles();
    const downloadURL = await store.storeEpub(
      buffer,
      `/${uuid}/books/${id}/${id}.png`
    );

    return NextResponse.json(
      { success: true, data: { downloadURL } },
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
  }
}
