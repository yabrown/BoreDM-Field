import { Platform } from "react-native"

export const PORT = 'http://' + (Platform.OS === 'android' ? '10.0.2.2' : 'localhost:4000')
export const AUTH0_CLIENT_ID = 'aiq9QyoZeHEOwwLOBFn6J2VreMrht9rn';