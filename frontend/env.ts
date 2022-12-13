import { Platform } from "react-native"

// To run deployed:
//export const PORT = 'http://' + (Platform.OS === 'android' ? 'boredm-field.onrender.com' : 'boredm-field.onrender.com')

// To run locally:
// export const PORT = 'https://boredm-field.onrender.com'
export const PORT ='http://' + (Platform.OS === 'android' ? '10.0.2.2:4000' : 'localhost:4000')