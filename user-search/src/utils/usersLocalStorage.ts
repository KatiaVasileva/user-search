import { User } from "../interfaces/User";

export function saveUsersToLocalStorage(users: Array<User>) {
  window.localStorage.setItem("users", JSON.stringify(users));
}

export function getUsersFromLocalStorage() {
  try {
    const users = window.localStorage.getItem("users");
    if (!users) {
      return [];
    }
    return JSON.parse(users);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
    }
  }
}

export function removeUsersFromLocalStorage() {
  window.localStorage.removeItem("users");
}

export function saveTotalCountToLocalStorage(count: number) {
  window.localStorage.setItem("count", JSON.stringify(count));
}

export function getTotalCountFromLocalStorage() {
  try {
    const count = window.localStorage.getItem("count");
    if (!count) {
      return 0;
    }
    return JSON.parse(count);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
    }
  }
}

export function removeTotalCountFromLocalStorage() {
  window.localStorage.removeItem("count");
}

export function saveQueryToLocalStorage(query: String) {
    window.localStorage.setItem("query", JSON.stringify(query));
  }
  
  export function getQueryFromLocalStorage() {
    try {
      const query = window.localStorage.getItem("query");
      if (!query) {
        return "";
      }
      return JSON.parse(query);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
      }
    }
  }
  
  export function removeQueryFromLocalStorage() {
    window.localStorage.removeItem("query");
  }
