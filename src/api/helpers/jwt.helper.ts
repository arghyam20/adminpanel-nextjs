import { jwtVerify, SignJWT, type JWTPayload } from "jose";

export interface JwtHelperOptions {
  secret: string;
  expiresIn?: string;
}

function encodeSecret(secret: string) {
  return new TextEncoder().encode(secret);
}

export async function signJwt<T extends JWTPayload>(payload: T, options: JwtHelperOptions) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(options.expiresIn ?? "15m")
    .sign(encodeSecret(options.secret));
}

export async function verifyJwt<T extends JWTPayload>(token: string | undefined, secret: string) {
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, encodeSecret(secret));
    return payload as T;
  } catch {
    return null;
  }
}
