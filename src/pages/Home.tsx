import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import HomeScreenTile from '../components/HomeScreenTile';


import doctorImage from '../../assets/pictures/calendar3.jpeg';
import doctorImage2 from '../../assets/pictures/calendar.jpeg';
import doctorImage3 from '../../assets/pictures/calendar2.jpg';
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
      title='Go to Landing'
      onPress={()=>navigation.navigate('Landing')}
      />
      <HomeScreenTile 
      navigation = {navigation}
      page = {'Landing'}
      imageSource = {doctorImage2}
      title = {'Appointments'}
      paragraph={'We are here to help you, with whateever you need!'}
      ></HomeScreenTile>

      <HomeScreenTile 
      navigation = {navigation}
      page = {'Landing'}
      imageSource = {doctorImage}
      title = {'Appointments'}
      paragraph={'We are here to help you, with whateever you need!'}
      ></HomeScreenTile>

      <HomeScreenTile 
      navigation = {navigation}
      page = {'Landing'}
      imageSource = {doctorImage3}
      title = {'Appointments'}
      paragraph={'We are here to help you, with whateever you need!'}
      ></HomeScreenTile>
    </View>

  );
}

const styles = StyleSheet.create({
  page:{
    flex:1,
    paddingTop:20,
    flexDirection: 'column',
    alignItems: 'center',
  },
  
});

export default Home;
