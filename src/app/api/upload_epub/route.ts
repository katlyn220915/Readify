import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

import storeFiles from "@/server-actions/store/storeFiles";
import writeFileToLocal from "@/utils/writeData";

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
    store.storeEpub(uuid, timestemp, buffer);

    // writeFileToLocal(buffer, timestemp, uuid, (success) => {
    //   if (success) {
    //     console.log("Server: Write file to local successful");
    //   } else {
    //     console.log("Server: Write file to local fail");
    //   }
    // });

    return NextResponse.json(
      { success: true, data: { id: timestemp } },
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
  }
}
