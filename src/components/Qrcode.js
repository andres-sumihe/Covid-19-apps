import * as React from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';

import QrMask from '../../assets/qrscan.svg'
import { widthPercentageToDP } from 'react-native-responsive-screen';

export default class BarcodeScannerExample extends React.Component {
  state = {
    hasCameraPermission: null,
    scanned: false,
  };

  static navigationOptions = {
    title: 'Qrcode'
  }

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission === null) {
      return <Text></Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
          width: '100%',
          zIndex: 10000000,
        }}>
        {/* <TouchableOpacity activeOpacity={1} style={{ flex: 4, backgroundColor: 'rgba(0,0,0,0.5)', height:'100%' }} onPress={() => this.props.closeQr()}></TouchableOpacity> */}
        <View style={{ flex: 7, width: '100%', height: '100%', justifyContent: "center", alignItems: 'center', backgroundColor: '#d5322e' }}>
          <View style={{ paddingBottom: 45, backgroundColor: 'white', width: '90%', height: '90%', borderRadius: 20, overflow: 'hidden', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 20 }}>
            <View style={{ width: '100%', overflow: 'hidden', alignItems: 'center', paddingBottom: 5 }}>
              {
                this.state.scanned ?
                  <View style={{ flexDirection: 'row' }}>
                    <Text>Harap Tunggu</Text>
                  </View>
                  :
                  <Text style={{ fontSize: 16, color: "#d5322e" }}>Scan <Text style={{ fontWeight: '700' }}>Qrcode</Text> Kartu Keluarga</Text>
              }
            </View>
            <View style={{ zIndex: 1000, width: widthPercentageToDP('75%'), height: widthPercentageToDP('75%'), overflow: 'hidden', borderRadius: 20, justifyContent: "center", alignItems: "center" }}>
              <View style={{ width: '100%', height: '100%', position: 'absolute', zIndex: 1000000, overflow: 'hidden' }} />
              <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                style={{ width: 500, height: 500, }} />

              {/* <View style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0)', position: 'absolute', }} /> */}
              <View style={{ width: '110%', height: '110%', position: 'absolute' }}>
                <QrMask
                  width='100%'
                  height='100%'
                />
              </View>
            </View>
          </View>

        </View>

      </View>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true });
    this.props.onScanned(data)
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    // this.props.onScanned(data)
  };
}
