import * as SecureStore from 'expo-secure-store';

async function saveToken(token: string) {
  await SecureStore.setItemAsync('token', token);
}

async function getToken() {
  let result = await SecureStore.getItemAsync('token');
  return result;
}

async function deleteToken() {
  await SecureStore.deleteItemAsync('token');
}

export {
  saveToken,
  getToken,
  deleteToken,
}