import * as bcrypt from 'bcrypt';

export const passwordHasher = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt();

  return bcrypt.hash(password, salt);
};
