import { Prisma, PrismaClient } from ".prisma/client";
import { Service } from "typedi";
import { db } from "../db";

const publicUserInfo = {
  id: true,
  login: true,
  age: true,
};

@Service()
export class UserModel {
  private db: PrismaClient;

  constructor() {
    this.db = db;
  }

  getAll() {
    return this.db.user.findMany({
      where: { isDeleted: false },
      select: publicUserInfo,
      // include: { groups: true }, // for testing purpose
    });
  }

  getOne(id: string) {
    return this.db.user.findUnique({
      where: { id: Number(id) },
      select: publicUserInfo,
    });
  }

  softDelete(id: string) {
    return this.db.user.update({
      where: { id: Number(id) },
      data: { isDeleted: true },
      select: publicUserInfo,
    });
  }

  create(userDto: Prisma.UserCreateInput) {
    return this.db.user.create({
      data: userDto,
      select: publicUserInfo,
    });
  }

  update(id: string, user: Prisma.UserUpdateInput) {
    return this.db.user.update({
      where: { id: Number(id) },
      data: user,
      select: publicUserInfo,
    });
  }

  getByLogin(login: string, limit: number, config: { password: boolean }) {
    return this.db.user.findMany({
      where: { login: { contains: login } },
      select: { ...publicUserInfo, ...config },
      ...(limit && { take: limit }),
    });
  }
}
