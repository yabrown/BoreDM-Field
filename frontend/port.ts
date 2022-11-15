import { Platform } from "react-native"

export const PORT = 'http://' + (Platform.OS === 'android' ? '10.0.2.2' : 'boredm-field.onrender.com/')
