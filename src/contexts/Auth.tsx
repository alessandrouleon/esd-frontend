import { UserToken } from "../services/localStorage";

function signOut() {
  UserToken.removeLocalStorageToken();
  UserToken.removeLocalStorageName();
  window.location.href = "/";
}

export { signOut };
