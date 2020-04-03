import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Main from './src/screens/Main'
import Login from './src/screens/Login/Login'
import AnggotaKeluarga from './src/screens/AnggotaKeluarga/AnggotaKeluarga'
import TambahAnggotaKeluarga from './src/screens/AnggotaKeluarga/TambahAnggotaKeluarga'
import TambahKK from './src/screens/AnggotaKeluarga/TambahKK'
import TambahPenduduk from './src/screens/Penduduk/TambahPenduduk';
import TambahKepalaKeluarga from './src/screens/AnggotaKeluarga/TambahKepalaKeluarga';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LupaPassword from './src/screens/Login/LupaPassword';
import PinConfirm from './src/screens/Login/PinConfirm';
import ResetPassword from './src/screens/Login/ResetPassword';
import CameraApp from './src/components/CameraApp';

console.disableYellowBox = true
const MainNavigator = createStackNavigator({
  
  Login: { screen: Login,
    navigationOptions: () => ({
      headerShown: false,
    })
  },
  Main: { screen: Main,
    navigationOptions: () => ({
      headerShown: false,
    })
  },
  AnggotaKeluarga: { screen: AnggotaKeluarga,
    navigationOptions: () => ({
      headerShown: false,
    })
  },
  TambahAnggotaKeluarga: { screen: TambahAnggotaKeluarga,
    navigationOptions: () => ({
      headerShown: false,
    })
  },
  TambahKK: { screen: TambahKK,
    navigationOptions: () => ({
      headerShown: false,
    })
  },
  TambahPenduduk: { screen: TambahPenduduk,
    navigationOptions: () => ({
      headerShown: false,
    })
  },
  TambahKepalaKeluarga: { screen: TambahKepalaKeluarga,
    navigationOptions: () => ({
      headerShown: false,
    })
  },
  // Login Section
  LupaPassword: { screen: LupaPassword,
    navigationOptions: () => ({
      headerShown: false,
    })
  },
  PinConfirm: { screen: PinConfirm,
    navigationOptions: () => ({
      headerShown: false,
    })
  },
  ResetPassword: { screen: ResetPassword,
    navigationOptions: () => ({
      headerShown: false,
    })
  },
  CameraApp: { screen: CameraApp,
    navigationOptions: () => ({
      headerShown: false,
    })
  },
  
});
const App = createAppContainer(MainNavigator);
export default App


const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


