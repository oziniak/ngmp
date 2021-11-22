import { Service } from "typedi";
import { GroupModel } from "../models/group-model";
import { Group } from "../types";

@Service()
export class GroupService {
  constructor(private groupModel: GroupModel) {}

  getAll() {
    return this.groupModel.getAll();
  }

  getOne(id: string) {
    return this.groupModel.getOne(id);
  }

  delete(id: string) {
    return this.groupModel.delete(id);
  }

  create(user: Group) {
    return this.groupModel.create(user);
  }

  update(id: string, group: Partial<Group>) {
    return this.groupModel.update(id, group);
  }
}
