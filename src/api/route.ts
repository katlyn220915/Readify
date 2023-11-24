import { NextResponse } from "next/server";

//name post as post method
export async function POST(request: Request) {
  //get data from request body
  const data = await request.json();

  return NextResponse.json(data);
}
