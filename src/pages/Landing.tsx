import React,{useState} from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';


import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Landing'>;
};

const Landing: React.FC<Props> = ({ navigation }) =>{
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    
  };
  const [Loading,setLoading]=useState(false);
  const navigateHome=()=>{
    console.log("navigateHome called");
    setLoading(true);
    navigation.navigate('Login');
    setLoading(false);
  }
  return (
    <ImageBackground source={require("../../assets/pictures/HealthBackground2.jpg")} style={{flex:1}}>
      <View style={styles.page}>

        <Image
          
          source={require("../../assets/pictures/hospital-logo3.png")}
          style = {{ width: 200, height: 200 }}
        />

        <View style={styles.imageContainer}>
          <Text style={styles.title}>Health</Text>
        </View>
        <View style={{height:5}}></View>
        
        <TouchableOpacity style={styles.proceedButton}>
          <Text 
          style={{color:"white", fontSize:20}}
          onPress={()=>navigateHome()}
          >Get Started</Text>
        </TouchableOpacity>

        <View style={{height:30}}></View>
        {Loading?<TouchableOpacity
        onPress={()=>{console.log('Doing nothing')}}
        style={styles.loadingModal}>
          <ActivityIndicator size={'large'} color={'#000959'}/>
        </TouchableOpacity>:null}
      </View>
      </ImageBackground>
  );
}

const styles = StyleSheet.create({
  page:{
    flex:1,
    flexDirection:"column",
    paddingTop:20,
    justifyContent:"center",
    alignItems:'center',
  },
  imageContainer:{
    flexDirection:"row",
    justifyContent:'center',

  },
  proceedButton:{
    flexDirection:'row',
    backgroundColor:"#000959",
    width:200,
    borderRadius:20,
    justifyContent:"center",
  },
  title:{
    fontSize:30,
    fontWeight:"700",
    color:"red",

  },
  loadingModal:{
    flexDirection:'column',
    justifyContent:"center",
    position:'absolute',
    height:'80%',
    width:'80%',
    top: '15%',
    left: '10%',
    backgroundColor:'transparent',
    alignItems:'center',
  },
  
});


export default Landing;
