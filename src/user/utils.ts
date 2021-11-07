import { User } from "./types";

function filterBy(s: string = "") {
  return function (data: User[]) {
    return data.filter((item) => item.login.includes(s));
  };
}

function limitBy(limit: number = Infinity) {
  return function (data: User[]) {
    return data.slice(0, limit);
  };
}

export function getAutoSuggestUsers(loginSubst: string, limit: number) {
  return (users: User[]) => limitBy(limit)(filterBy(loginSubst)(users));
}
