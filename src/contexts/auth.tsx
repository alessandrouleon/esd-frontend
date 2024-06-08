import { UserToken } from "../services/LocalStorage";

function signOut() {
  UserToken.removeLocalStorageToken();
  UserToken.removeLocalStorageName();
  window.location.href = "/";
}

export { signOut };
