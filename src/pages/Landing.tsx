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

import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

import {
  Colors,
  Header,
} from 'react-native/Libraries/NewAppScreen';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const Landing: React.FC<Props> = ({ navigation }) =>{
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    
  };

  return (
    
      <View style={styles.page}>
        <Text>This is the Landing Page</Text>
        <Button
        title='Go to Home'
        onPress={()=>navigation.navigate('Home')}
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


export default Landing;
