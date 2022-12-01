import { View, Text, StyleSheet } from 'react-native';
import { Button as PaperButton} from 'react-native-paper';
import { PORT } from '../env';

const Header = () => {
  return(
      <View style={styles.headerView}>
          <Text style={{fontWeight:'800', fontSize: 50, color: 'black'}}>BORE<Text style={{ fontWeight: '800', color: 'grey' }}>
          DM</Text> <Text style={{ fontWeight: '400' }}>Field</Text></Text>
          <ReseedButton/>
      </View>
  );
}

const ReseedButton = ( ) => {
  const onPress = async () => {
      try {
          let fetched = await fetch(`${PORT}/reseedDB`, {
              method: 'GET', // or 'PUT'
              headers: {
                  'Content-Type': 'application/json',
              },
          })
          let status = await fetched.status
          console.log("sent reseed request to backend, status:", status);
      } catch(error) {
              console.error('Error:', error);
          }
  }
  return (
  <PaperButton onPress={onPress} mode="elevated" style={{backgroundColor:"red"}} labelStyle={{fontSize: 20, color: "white" }}>Reseed DB</PaperButton> 
  );
}
const showViews = 0
const styles = StyleSheet.create({
  headerView: {
    height: 100, 
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderWidth: showViews,
    borderColor: 'red',
    marginLeft: '2%',
    marginTop: '2%',
  },
})

export default Header;