import { View, Text, StyleSheet } from 'react-native';

const Header = () => {
  return(
      <View style={styles.headerView}>
          <Text style={{fontWeight:'800', fontSize: 50, color: 'black'}}>BORE<Text style={{ fontWeight: '800', color: 'grey' }}>
          DM</Text> <Text style={{ fontWeight: '400' }}>Field</Text></Text>
      </View>
  );
}

const showViews = 0
const styles = StyleSheet.create({
  headerView: {
    height: 100, 
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderWidth: showViews,
    borderColor: 'red'
  },
})

export default Header;