import { Service } from "typedi";
import { UserModel } from "../models/user-model";
import { UserDto } from "../types";

@Service()
export class UserService {
  constructor(private userModel: UserModel) {}

  getAll() {
    return this.userModel.getAll();
  }

  getByLogin(login: string, limit: number) {
    return this.userModel.getByLogin(login, limit);
  }

  getOne(id: string) {
    return this.userModel.getOne(id);
  }

  softDelete(id: string) {
    return this.userModel.softDelete(id);
  }

  create(user: UserDto) {
    return this.userModel.create(user);
  }

  updateUser(id: string, user: UserDto) {
    return this.userModel.update(id, user);
  }
}
