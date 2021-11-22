import { Prisma, PrismaClient } from ".prisma/client";
import { Service } from "typedi";
import { db } from "../db";

@Service()
export class GroupModel {
  private db: PrismaClient;

  constructor() {
    this.db = db;
  }

  getAll() {
    return this.db.group.findMany();
  }

  getOne(id: string) {
    return this.db.group.findUnique({ where: { id: Number(id) } });
  }

  delete(id: string) {
    return this.db.group.delete({ where: { id: Number(id) } });
  }

  create(data: Prisma.GroupCreateInput) {
    return this.db.group.create({ data });
  }

  update(id: string, data: Prisma.GroupUpdateInput) {
    return this.db.group.update({
      where: { id: Number(id) },
      data,
    });
  }
}
