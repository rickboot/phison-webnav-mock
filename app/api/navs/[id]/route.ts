import { NextResponse } from "next/server";
import { getSharedNav } from "@/lib/shared-navs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const nav = await getSharedNav(id);
  if (!nav) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }
  return NextResponse.json(
    { nav },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}
