import { Platform } from "react-native"

export const PORT = 'http://' + (Platform.OS === 'android' ? 'boredm-field.onrender.com' : 'boredm-field.onrender.com')