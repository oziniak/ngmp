import { v4 } from "uuid";
import { User } from "./types";
import usersData from "./users.json";

let users: User[] | null = null;
export function getAllUsers() {
  if (!users) {
    users = usersData.sort(({ login: l1 }, { login: l2 }) =>
      l1.localeCompare(l2)
    );
  }

  return users;
}

export function findUser(id: string, users = getAllUsers()) {
  return users.find(({ id: uId }) => id === uId);
}

export function createUser(userDto: Partial<User>): User {
  const newUser = { ...userDto, id: v4(), isDeleted: false } as User;
  users?.push(newUser);
  return newUser;
}

export function updateUser(id: string, userDto: Partial<User>): User | null {
  const user = findUser(id);
  if (!user) {
    return null;
  }
  const updatedUser = Object.assign(user, userDto);
  return updatedUser;
}
