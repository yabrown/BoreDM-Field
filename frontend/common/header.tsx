import { View, Text, StyleSheet } from 'react-native';

const Header = () => {
  return(
      <View style={styles.headerView}>
          <Text style={{fontWeight:'800', fontSize: 50, color: 'black'}}>BORE<Text style={{ fontWeight: '800', color: 'grey' }}>
          DM</Text> <Text style={{ fontWeight: '400' }}>Field</Text></Text>
          {/* <ReseedButton/> */}
      </View>
  );
}

const showViews = 0
const styles = StyleSheet.create({
  headerView: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: showViews,
    borderColor: 'red',
    marginLeft: 10,
    marginBottom: 5,
  },
})

export default Header;