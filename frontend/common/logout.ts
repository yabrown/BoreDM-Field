import { deleteToken } from '../utils/secureStore';

export const logout = async (setIsLoggedIn: (bool: boolean) => void) => {
  await deleteToken();
  setIsLoggedIn(false);
};
