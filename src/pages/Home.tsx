import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';

import {
  Button,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  Header,
} from 'react-native/Libraries/NewAppScreen';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const Home: React.FC<Props> = ({ navigation }) =>{
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };


  const safePadding = '5%';

  return (
    <View style={styles.page}>
      
      <Text>This is the Home Page</Text>
      <Button
      title='Go to login'
      onPress={()=>navigation.navigate('Login')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page:{
    flex:1,
    paddingTop:20
  },
  
});

export default Home;
