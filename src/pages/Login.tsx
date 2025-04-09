import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};
const Login : React.FC<Props> = ({navigation}) =>{
  return (
    <View style={styles.page}>
      
      <Text>This is the Login Page</Text>
      <Button
        title="Press me to switch to Landing"
        onPress={()=>{navigation.navigate('Landing')}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  page:{
    flex:1,
    paddingTop:20
  },
  
});


export default Login;