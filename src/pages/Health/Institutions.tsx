import React from 'react';
import { 
  View, 
  StyleSheet,
  StatusBar,
  Dimensions 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';
import AppBar from '../../../src/components/AppBar';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const Institutions: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Home'>>();
  
  // Sample institutions data
  const institutions = [
    {
      id: 1,
      name: 'City General Hospital',
      latitude: 37.78825,
      longitude: -122.4324,
    },
    {
      id: 2,
      name: 'Downtown Medical Center',
      latitude: 37.7749,
      longitude: -122.4194,
    },
    {
      id: 3,
      name: 'Westside Clinic',
      latitude: 37.773972,
      longitude: -122.431297,
    },
  ];

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <View style={styles.page}>
      <AppBar navigation={navigation} title="Institutions" />
        
        {/* <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: 37.7749,
            longitude: -122.4194,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          {institutions.map((institution) => (
            <Marker
              key={institution.id}
              coordinate={{
                latitude: institution.latitude,
                longitude: institution.longitude,
              }}
              title={institution.name}
              description="Healthcare Institution"
              pinColor="#000959" // Custom marker color
            />
          ))}
        </MapView> */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingTop:20,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default Institutions;