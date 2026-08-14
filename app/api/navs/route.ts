import { NextResponse } from "next/server";
import { parseNavOutline } from "@/lib/nav-outline";
import {
  createSharedNav,
  isSharedNavStoreConfigured,
  listSharedNavs,
} from "@/lib/shared-navs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic"; // always hit Redis / file store; never cache the library list

export async function GET() {
  const navs = await listSharedNavs();
  return NextResponse.json(
    {
      navs,
      configured: isSharedNavStoreConfigured(),
    },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    },
  );
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  const name =
    typeof body === "object" &&
    body &&
    "name" in body &&
    typeof (body as { name: unknown }).name === "string"
      ? (body as { name: string }).name
      : "";
  const outline =
    typeof body === "object" &&
    body &&
    "outline" in body &&
    typeof (body as { outline: unknown }).outline === "string"
      ? (body as { outline: string }).outline
      : "";

  const parsed = parseNavOutline(outline);
  if (!parsed.ok) {
    return NextResponse.json(
      { message: "Invalid outline", errors: parsed.errors },
      { status: 400 },
    );
  }

  const result = await createSharedNav(name, outline);
  if (!result.ok) {
    return NextResponse.json(
      { message: result.message },
      { status: result.status },
    );
  }

  return NextResponse.json({ nav: result.nav }, { status: 201 });
}
