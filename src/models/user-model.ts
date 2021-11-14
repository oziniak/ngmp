import { PrismaClient } from ".prisma/client";
import { Service } from "typedi";
import { db } from "../db";
import { UserDto } from "../types";

@Service()
export class UserModel {
  private db: PrismaClient;

  constructor() {
    this.db = db;
  }

  getAll() {
    return this.db.user.findMany({ where: { isDeleted: false } });
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

  create(userDto: UserDto) {
    return this.db.user.create({
      data: userDto,
    });
  }

  update(id: string, user: UserDto) {
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
