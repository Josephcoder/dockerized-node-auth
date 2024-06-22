import bcrypt from "bcryptjs";

export class Password {
  static async toHash(password: string) {
    const hashedPassword = await bcrypt.hash(password, 12);

    return hashedPassword;
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    const isEqual = await bcrypt.compare(suppliedPassword, storedPassword);
    return isEqual;
  }
}
