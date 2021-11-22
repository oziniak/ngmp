import { Prisma, PrismaClient } from ".prisma/client";
import { Service } from "typedi";
import { db } from "../db";

@Service()
export class UserModel {
  private db: PrismaClient;

  constructor() {
    this.db = db;
  }

  getAll() {
    return this.db.user.findMany({
      where: { isDeleted: false },
      // include: { groups: true }, // for testing purpose
    });
  }

  getOne(id: string) {
    return this.db.user.findUnique({ where: { id: Number(id) } });
  }

  softDelete(id: string) {
    return this.db.user.update({
      where: { id: Number(id) },
      data: { isDeleted: true },
    });
  }

  create(userDto: Prisma.UserCreateInput) {
    return this.db.user.create({
      data: userDto,
    });
  }

  update(id: string, user: Prisma.UserUpdateInput) {
    return this.db.user.update({
      where: { id: Number(id) },
      data: user,
    });
  }

  getByLogin(login: string, limit: number) {
    return this.db.user.findMany({
      where: { login: { contains: login } },
      ...(limit && { take: limit }),
    });
  }
}
