import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import AppBar from './src/components/AppBar';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};
const Institutions : React.FC<Props> = ({navigation}) =>{
  return (
    <View style={styles.page}>
      
      <Text>This is the Institutions Page</Text>
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


export default Institutions;