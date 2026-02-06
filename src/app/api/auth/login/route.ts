import { NextResponse } from "next/server";
import { beUrl } from "@/lib/be";
import { ACCESS_COOKIE, REFRESH_COOKIE, ACCESS_MAX_AGE, REFRESH_MAX_AGE } from "@/lib/auth";
import { LoginResponse } from "@/types/login/LoginResponse";


export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body?.email || !body?.password) {
    return NextResponse.json({ message: "email y password son requeridos" }, { status: 400 });
  }

  const beRes = await fetch(beUrl("/auth/login"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ usr_txt_email: body.email, usr_txt_password: body.password }),
  });

  if (!beRes.ok) {
    const err = await beRes.json().catch(() => ({}));
    return NextResponse.json(
      { message: err?.message ?? "Credenciales inválidas" },
      { status: beRes.status }
    );
  }

  const data = (await beRes.json()) as LoginResponse;

  const res = NextResponse.json({ ok: true });

  res.cookies.set(ACCESS_COOKIE, data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: data.expiresIn ?? ACCESS_MAX_AGE,
  });

  res.cookies.set(REFRESH_COOKIE, data.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: data.rtk_dat_expires_at ?? REFRESH_MAX_AGE,
  });

  return res;
}