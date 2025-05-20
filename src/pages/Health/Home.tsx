import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';
import HomeScreenTile from '../../components/HomeScreenTile';
import AppBar from '../../components/AppBar';

import doctorImage from '../../../assets/pictures/health-image4.jpg';
import InstitutionsImage from '../../../assets/pictures/Institutions3.jpg';
import calendarImage from '../../../assets/pictures/calendar2.jpg';
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
import NavBar from '../../components/NavBar';

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
    <>
    <StatusBar barStyle="dark-content"/>
    <View style={{paddingTop:safePadding}}>
    <AppBar navigation={navigation} title={"Home"}></AppBar>
    <ScrollView>
    <View style={styles.page}>
      
      <HomeScreenTile 
      navigation = {navigation}
      page = {'Appointments'}
      imageSource = {calendarImage}
      title = {'Appointments'}
      paragraph={'Manage your schedule with ease—view upcoming appointments or book time with a doctor in seconds.'}
      ></HomeScreenTile>

      <HomeScreenTile 
      navigation = {navigation}
      page = {'Institutions'}
      imageSource = {InstitutionsImage}
      title = {'Institutions'}
      paragraph={'Discover nearby medical institutions at a glance and easily add new ones to your list for quick access.'}
      ></HomeScreenTile>

      <HomeScreenTile 
      navigation = {navigation}
      page = {'Landing'}
      imageSource = {doctorImage}
      title = {'Temp'}
      paragraph={'Please ignore this!'}
      ></HomeScreenTile>
    </View>
    </ScrollView>
    </View>
    <NavBar navigation={navigation}></NavBar>
    </>
  );
}

const styles = StyleSheet.create({
  page:{
    flex:1,
    paddingTop:5,
    flexDirection: 'column',
    alignItems: 'center',
    gap:10,
    paddingBottom: 110,
  },
  
});

export default Home;
