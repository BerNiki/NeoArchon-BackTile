# ADR 0001 — Authentication & Token Strategy

## Status

Accepted

## Context

We are building Modern Archon, a web + mobile game. We need a secure, scalable auth approach with token rotation, revocation, and key rotation while enabling SPA usage and mobile clients.

## Decision

- Use EdDSA (Ed25519) via `jose` for signing tokens (default). Fallback: `RS256` for external interoperability.
- Access tokens: JWT signed, TTL 15 minutes.
- Refresh tokens: JWT signed, TTL 14 days, rotate on refresh. RT `jti` hashed and stored in DB for revocation & replay protection.
- Expose public keys via `/.well-known/jwks.json`.
- Password hashing with `argon2id`.
- Web cookie policy: `HttpOnly`, `SameSite=Lax`, `Secure` in production.
- Mobile: store RT in secure storage; AT remains in memory.
- Logging, rate-limiting, and monitoring required for auth endpoints.

## Consequences

- Short AT = less risk on token leak.
- RT rotation + server-stored jti hash prevents replay attacks.
- JWKS enables key rotation and scalable verification across services.
- Slight complexity added to refresh flow vs stateless RTs, but much safer.
