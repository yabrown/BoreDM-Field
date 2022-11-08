import { View, Text } from "react-native";

const Project = ({route}) => {
  return (
    <View>
      <Text>{route.params.name}</Text>
    </View>
  );
}

export default Project;