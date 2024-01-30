import * as bcrypt from 'bcryptjs';

export const hashPasswordUtil = async (password: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};
