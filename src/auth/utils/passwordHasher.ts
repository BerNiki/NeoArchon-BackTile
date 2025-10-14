import argon2 from 'argon2';

export const passwordHasher = async (plain: string) =>
  await argon2.hash(plain, {
    type: argon2.argon2id,
    timeCost: Number(process.env.ARGON2_TIME_COST ?? 3),
    memoryCost: Number(process.env.ARGON2_MEMORY_COST ?? 65536),
    parallelism: Number(process.env.ARGON2_PARALLELISM ?? 2),
  });

export const verifyPassword = async (hash: string, plain: string) =>
  await argon2.verify(hash, plain);
