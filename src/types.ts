export type User = {
  // id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
  // groups?: any[];
};

export type Permissions =
  | "READ"
  | "WRITE"
  | "DELETE"
  | "SHARE"
  | "UPLOAD_FILES";

export type Group = { id: string; name: string; permissions: Permissions[] };

export type UserDto = Omit<User, "id" | "isDeleted">;
