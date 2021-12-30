import { Prisma } from "@prisma/client";
import { Service } from "typedi";
import { UserModel } from "../models/user-model";

@Service()
export class UserService {
  constructor(private userModel: UserModel) {}

  getAll() {
    return this.userModel.getAll();
  }

  getByLogin(
    login: string,
    limit: number,
    config: { password: boolean } = { password: false }
  ) {
    return this.userModel.getByLogin(login, limit, config);
  }

  getOne(id: string) {
    return this.userModel.getOne(id);
  }

  softDelete(id: string) {
    return this.userModel.softDelete(id);
  }

  create(user: Prisma.UserCreateInput) {
    return this.userModel.create(user);
  }

  updateUser(id: string, user: Prisma.UserUpdateInput) {
    return this.userModel.update(id, user);
  }
}
