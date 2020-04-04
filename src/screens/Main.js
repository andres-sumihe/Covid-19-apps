import React, { Component, useRef } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, ScrollView, Keyboard, KeyboardAvoidingView, Platform , Dimensions} from 'react-native';
import {FontAwesome, MaterialCommunityIcons, AntDesign, Entypo, EvilIcons, Ionicons} from '@expo/vector-icons'
import {TextField} from 'react-native-material-textfield'
import KTP from '../components/KTP';
import KK from '../components/KK';
import { Surface } from 'react-native-paper';
import {Modalize} from 'react-native-modalize'
import ChangePassword from '../components/ChangePassword';
import { LinearGradient } from 'expo-linear-gradient';
import RNPickerSelect from 'react-native-picker-select';
import Qrcode from '../components/Qrcode'
import MapView, { PROVIDER_GOOGLE, Marker, Callout, GooglePlacesAutocomplete } from 'react-native-maps';
// @ts-ignore
// import GetLocation from 'react-native-get-location';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import Logo from '../../assets/Covid-19.svg'
import Call from '../../assets/telkom.svg'
import {Linking} from 'react-native'

import { widthPercentageToDP as wp, heightPercentageToDP}  from 'react-native-responsive-screen';
import { normalize } from '../components/ResponsiveFontSize';

export default class Main extends Component {

    state = {
        location: null,
        errorMessage: null
    }
  constructor(props) {
    super(props);
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
    this.state = {
        keyboardAvoidingViewOffset: 0,
        open:false,
        hide: true,
        keyboardOn: false,
        keyboardOnPadding: 300,
        filter:'No. KK',
        phoneNumber: '911',
        mode: 'user',
        setLocation: false,
        markLat: null,
        markLong: null,
        mapRegion: '',
        data: [
            {
                id:1,
                title:'Jumlah KK',
                count:'205K'
            },
            {
                id:2,
                title:'Total Penduduk',
                count:'85K'
            },  
            {
                id:3,
                title:'Laki-Laki',
                count:'2019K'
            },
            {
                id:4,
                title:'Perempuan',
                count:'3115K'
            },
            
        ]
    };
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  modal = React.createRef();
  modal2 = React.createRef();
  renderQR = () => {
    return(
      // <View style={{height: heightPercentageToDP('100%')}}>
        <View style={{height: wp('100%')}}>
          <Qrcode /> 
        </View>
      // </View>
      )
  }
  renderContent = () => {
    return (
      

        <View style={[styles.content, {height: 300}]}>
          <View style={{
              paddingHorizontal:30, 
              paddingVertical:5, 
              borderBottomRightRadius:5,
              justifyContent: 'center', 
              alignItems: 'center',
              backgroundColor:'#d5322e',
              position: "absolute",
              top:0,
              left:0,
              zIndex:100
              }}>
            <Text style={{color: "white"}}>Ganti Password</Text>
          </View>
          <View style={styles.containerChangePassword}>
                <View style={styles.rowView}>
                    <Entypo name='key' size={16} color='#b5b5b5' style={{ position: 'absolute', top: 12, left: -20 }} />
                    <TextField
                        label='Password Lama'
                        textColor='grey'
                        baseColor='black'
                        selectionColor='#d5322e'
                        tintColor='#d5322e'
                        lineWidth={1}
                        activeLineWidth={1}
                        contentInset={{ label: -2, top: 1, input: 1 }}
                        secureTextEntry={true}
                        fontSize={12}

                        />
                </View>


                <View style={styles.rowView}>
                    <EvilIcons name='lock' size={24} color='#b5b5b5' style={{ position: 'absolute', top: 10, left: -25 }} />
                    <TextField
                        label='Password Baru'
                        textColor='grey'
                        baseColor='black'
                        selectionColor='#d5322e'
                        tintColor='#d5322e'
                        lineWidth={1}
                        activeLineWidth={1}
                        contentInset={{ label: -2, top: 1, input: 1 }}
                        secureTextEntry={true}
                        fontSize={12}

                    />
                </View>
                <View style={styles.rowView}>
                    <EvilIcons name='lock' size={24} color='#b5b5b5' style={{ position: 'absolute', top: 10, left: -25 }} />
                    <TextField
                        label='Konfirmasi Password'
                        textColor='grey'
                        baseColor='black'
                        selectionColor='#d5322e'
                        tintColor='#d5322e'
                        lineWidth={1}
                        activeLineWidth={1}
                        contentInset={{ label: -2, top: 1, input: 1 }}
                        secureTextEntry={true}
                        fontSize={12}

                        />
                </View>
                <TouchableOpacity 
                        onPress={()=>this.props.navigation.navigate("Login")}
                        style={{ backgroundColor: "#0288d1", 
                        width: "100%", 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                                alignItems: 'center', 
                                marginTop:20,
                                marginBottom:20,
                                paddingVertical:5,
                                flexDirection:'row' 
                            }}>
                    <AntDesign color='white' name="logout" style={{}} size={24} />
                    <Text style={{ paddingLeft: 5, color: 'white', textAlign: 'center', }}>Logout</Text>
                </TouchableOpacity>

            </View>
                <View style={{width: '113%', backgroundColor: '#d5322e', position: "absolute", bottom:0, height:40, justifyContent: 'center', alignItems: 'center', }}>
                    <Text style={{color:'white', fontWeight:'700', fontSize:normalize(15)}}>Simpan</Text>
                </View>
        </View>
    );
  };
  onMarkerDragEnd = (coor) => {
    const lat = coor.latitude
    const lng = coor.longitude
    this.setState({markLat: lat, markLong: lng})
    console.log(lat, lng)
    }

    onRegionChange(region, latitude, longitude) {
        this.setState({
        mapRegion: region,
        markLat: latitude || this.state.markLat,
        markLong: longitude || this.state.markLong
    });
    }

    handleMapOpen =()=>{
        // console.log(this.state.location.coords.latitude)
        const lat = this.state.location.coords.latitude
        const long = this.state.location.coords.longitude
        this.setState({
            markLat: lat,
            markLong: long,
            setLocation: true
        })
    }

    showMap = () => {
        return(
            <View style={{zIndex: 99, position: 'absolute'}}>
                
                <Ionicons name='ios-arrow-back' size={35} style={{color: 'red', position: 'absolute', zIndex: 999, top : 25, left: 10, backgroundColor: '#fbfb', paddingVertical: 2, paddingHorizontal: 15, borderRadius: 5, }} onPress={()=> this.setState({setLocation:false})}/>
                
                <MapView  
                    provider={PROVIDER_GOOGLE}
                    style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height,}}
                    region={{
                        latitude: this.state.markLat,
                        longitude: this.state.markLong,
                        latitudeDelta: 0.0621,
                        longitudeDelta: 0.0521,
                        // markLat: -6.995522,
                        // markLong: 110.435393,
                    }}
                    // onPress={(e) => this.onMarkerDragEnd(e.nativeEvent.coordinate)}
                >
                    
                    <Marker
                        title={'Lokasi Anda'}
                        // onPress={this.setState}
                        coordinate={{latitude: this.state.markLat, longitude: this.state.markLong}}
                        // draggable
                        // onDragEnd={(e) => this.onMarkerDragEnd(e.nativeEvent.coordinate)}
                    >
                        
                    </Marker>
                </MapView>
            </View>
        )
    }
  openModal = () => {
    if (this.modal.current) {
      this.modal.current.open();
    }
  };

  closeModal = () => {
    if (this.modal.current) {
      this.modal.current.close();
    }
  };
  openModal2 = (e) => {
    this.setState({modal2Title: e})
    // this.setState({showHeader: false})
    if (this.modal2.current) {
      this.modal2.current.open();
    }
  };
  
  closeModal2 = () => {
    this.setState({showHeader: true})
    console.log(this.state.modalTitle)
    if (this.modal2.current) {
      this.modal2.current.close();
    }
  };

    componentDidMount() {
        
        this.keyboardHideListener = Keyboard.addListener(Platform.OS === 'android' ? 'keyboardDidHide': 'keyboardWillHide', this.keyboardHideListener.bind(this));
        this.keyboardShowListener = Keyboard.addListener(Platform.OS === 'android' ? 'keyboardDidShow': 'keyboardWillShow', this.keyboardShowListener.bind(this));
    }
    componentWillUnmount() {
        this.keyboardHideListener.remove()
        this.setState({keyboardAvoidingViewOffset: 0})
    }
    keyboardHideListener() {
        this.setState({
            keyboardAvoidingViewOffset: -StatusBar.currentHeight
        });
    }
    keyboardShowListener() {
        this.setState({
            keyboardAvoidingViewOffset: 0
        });
    }
  render() {
    let { keyboardAvoidingViewOffset } = this.state
    let text = 'Waiting..';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
    //   text = JSON.stringify(this.state.location);
      text = this.state.location.coords.latitude
      console.log(text)
    }
    return (
      <View style={styles.container}>
        <View style={styles.backgroundTop}>
          <LinearGradient
            colors={['red', '#d5322e']}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              height: 150,
            }}
          />
        </View>
        <View style={styles.header}>
            <View style={{flexDirection:'row', justifyContent: 'center', alignItems: 'center', paddingLeft: wp('7.5%')}} >
              <Logo width={150} height={150} />
            </View>
                <TouchableOpacity onPress={this.openModal}>
            <View style={styles.profil}>
                <Text style={{fontSize:16, paddingRight:10, color: 'white'}}>Dewi Kinasih</Text>
                <MaterialCommunityIcons name="account-outline" size={24} color="white" />
                
            </View>
                </TouchableOpacity>
        </View>

        <View style={styles.main}>
            <View style={styles.daerah}>
                <View>
                    <Text style={{fontSize: 18, color:'white'}}>JAWA TENGAH</Text>
                    <Text style={{fontSize: 18, color:'white'}}>KAB. SEMARANG</Text>
                </View>
                <View style={{alignItems: 'flex-end',}}>
                    <Text style={{fontSize: 16, color:'white'}}>BANDUNGAN</Text>
                    <Text style={{fontSize: 24, color:'white'}}>JIMBARAN</Text>
                </View>
            </View>
    
            {this.state.mode  == 'admin' ? <View style={styles.search}>
                <TouchableOpacity style={{flex:1}}>
                    <FontAwesome name="search" size={20} color="grey" />
                </TouchableOpacity>
                <View style={{flex:9, justifyContent: 'center', paddingRight:4}}>
                    <TouchableOpacity style={{justifyContent:'center'}}
                        activeOpacity={1}
                        onPress={()=> this.props.navigation.navigate("TambahAnggotaKeluarga", {title:"Daftar Warga"})}>
                        <Text style={{color: 'grey', fontSize:normalize(15)}}>Cari No. Kartu Tanda Penduduk</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={this.openModal2} style={{
                    paddingHorizontal:4,
                    flexDirection:'row',
                    alignItems: 'center',}}>
                    <AntDesign name="qrcode" size={24} color="grey" />
                </TouchableOpacity>
            </View>
            :
            <View style={{borderTopWidth:1, borderTopColor:'#ccc', width:wp('85%'), justifyContent: 'center',alignItems: 'center',padding:10}}> 
                <Text style={{color:'white', textAlign:'center',fontSize:normalize(18)}}>
                    Mari Bersama Kita Cegah Penyebaran Virus Corona
                </Text>
            </View>
            }

            <View style={styles.itemContainer}>
                {this.state.mode == 'admin' ?
                <View style={{borderRadius:5,marginTop:10,justifyContent:'center', alignItems: 'center',width:wp('55%'), height:30, backgroundColor:'#ff9800'}}>
                    <Text style={{fontSize: 18, color:'white', fontWeight:'100'}}>Pencatatan Non Penduduk</Text>
                </View>
                :
                <TouchableOpacity onPress={()=> this.props.navigation.navigate("AnggotaKeluarga")} 
                    style={{borderRadius:5,marginTop:-10,justifyContent:'center', alignItems: 'center',width:wp('55%'), height:30, backgroundColor:'#ff9800'}}>
                    <Text style={{fontSize: 18, color:'white', fontWeight:'100'}}>Deteksi Dini Covid-19</Text>
                </TouchableOpacity>
            
                }
                <View style={{backgroundColor:'red', marginTop:10}}>
                        
                        <LinearGradient
                            colors={['white','white', 'transparent', 'transparent']}
                            style={{ width: '100%', height: '50%', position: 'absolute', top: 0 }}
                        />
                        <LinearGradient

                            colors={['transparent', 'transparent','white', 'white']}
                            style={{ width: '100%', height: '50%', position: 'absolute', bottom: 0 }}
                        />
                        <LinearGradient
                            start={[0, 0]}
                            end={[1, 0]}
                            colors={['white','white', 'transparent', 'transparent']}
                            style={{ width: '50%', height: '100%', position: 'absolute', left: 0}}
                        />
                        <LinearGradient
                            start={[0, 0]} end={[1, 0]}
                            colors={['transparent', 'transparent', 'white', 'white']}
                            style={{ width: '50%', height: '100%', position: 'absolute', right: 0 }}
                        />

                    <View style={styles.rowKey}>
                        
                        <TouchableOpacity activeOpacity={1} onPress={()=> this.props.navigation.navigate("TambahAnggotaKeluarga", {title:"Daftar Warga Keluar"})} style={styles.button}>
                            <Text style={styles.textButton}>85</Text>
                            <Text style={styles.textKeterangan}>Warga Keluar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} onPress={()=> this.props.navigation.navigate("TambahAnggotaKeluarga", {title:"Daftar Warga Masuk"})} style={styles.button}>
                            <Text style={styles.textButton}>15</Text>
                            <Text style={styles.textKeterangan}>Warga Masuk</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} onPress={()=> this.props.navigation.navigate("TambahAnggotaKeluarga", {title:"Daftar Tamu Luar"})} style={styles.button}>
                            <Text style={styles.textButton}>5</Text>
                            <Text style={styles.textKeterangan}>Tamu Luar</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.rowKey}>
                        <TouchableOpacity activeOpacity={1} onPress={()=> this.props.navigation.navigate("TambahAnggotaKeluarga", {title:"Daftar Warga Terindikasi"})} style={styles.button}>
                            <Text style={styles.textButton}>20</Text>
                            <Text style={styles.textKeterangan}>Terindikasi</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} onPress={()=> this.props.navigation.navigate("TambahAnggotaKeluarga", {title:"Daftar Warga Rentan"})} style={styles.button}>
                            <Text style={styles.textButton}>120</Text>
                            <Text style={styles.textKeterangan}>Warga Rentan</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} onPress={()=> this.props.navigation.navigate("TambahAnggotaKeluarga", {title:"Daftar Warga Positif"})} style={styles.button}>
                            <Text style={styles.textButton}>0</Text>
                            <Text style={styles.textKeterangan}>Positif</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity onPress={()=>this.handleMapOpen()} style={{marginTop:20,backgroundColor: '#0288d1',justifyContent: 'center',alignItems: 'center', paddingVertical:10, width:wp('80')}}>
                    <Text style={{color:'white'}}>Lihat Fasilitas Kesehatan Terdekat</Text>
                </TouchableOpacity>

                <View style={{marginTop:20, width:'100%', justifyContent: 'center',alignItems: 'center',}}>
                    <TouchableOpacity onPress={()=>{Linking.openURL(`tel:${this.state.phoneNumber}`)}}>
                        <Call width={70} height={70} />
                    </TouchableOpacity>
                    <Text style={{fontSize:18, color:'#d5322e', fontWeight:'700'}}>Panggilan Darurat</Text>
                </View>
                <ScrollView style={{width:'100%'}} showsVerticalScrollIndicator={false}>

                </ScrollView>
            </View>
        </View>
          <Modalize ref={this.modal} 
            adjustToContentHeight
            avoidKeyboardLikeIOS
            keyboardAvoidingBehavior="padding" 
            keyboardAvoidingOffset={keyboardAvoidingViewOffset}
            panGestureEnabled={false}
            handleStyle={{display:'none'}}
            handlePosition="inside"
            onClose={()=> this.setState({hide: !this.state.hide})}
            onOpen={()=> this.setState({hide: !this.state.hide})}>
                {this.renderContent()}
          </Modalize>
          <Modalize ref={this.modal2} handleStyle={{display:"none"}} 
                adjustToContentHeight
                avoidKeyboardLikeIOS
                keyboardAvoidingBehavior="padding"
                keyboardAvoidingOffset={50}
                key={this.state.modal2Key} 
                onClosed={()=> this.setState({showHeader: true, modal2Key: new Date().getTime()} )}>
                    {this.renderQR()}
            </Modalize> 
            {this.state.setLocation ? this.showMap() : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:StatusBar.currentHeight,
        
    },
    backgroundTop:{
        backgroundColor:"#d5322e",
        position:'absolute',
        alignSelf:'center',
        width:'200%',
        height:358,
        top:-100,
        zIndex:-1000,
        borderBottomLeftRadius:1000,
        borderBottomRightRadius:1000,

    },
    header:{
        flex:1,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'space-between'
    },
    profil: {
        height:45,
        paddingLeft:20,
        paddingRight:10,
        backgroundColor:'#c21704',
        borderBottomLeftRadius:15,
        borderTopLeftRadius:15,
        flexDirection:'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    main: {
        flex:9,
        alignItems: 'center',
    },
    daerah: {
        flex:1.5,
        flexDirection:'row',
        width:'85%',
        justifyContent:'space-between',
        alignItems: 'center',
    },
    statistik_title: {
        fontSize:12,
        color:'white'
    },
    statistik_count: {
        fontSize:18,
        color:'white',
        fontWeight:'bold'
    },

    conteiner_statistik: {
        alignItems:'center',
        justifyContent: 'center',
    },
    search: {
        maxHeight:35,
        flexDirection:'row',
        alignItems: 'center',
        paddingHorizontal:10,
        paddingVertical:-5,
        backgroundColor:'white',
        borderRadius:10,
        width:'85%',
        flex:1
    },

    itemContainer: {
        flex:8,
        marginTop:20,
        alignItems:'center'
    },
    content: {
        // padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flex:1,

        // marginBottom:10
      },
      containerChangePassword: {
        height: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'column',
        width:'80%'
        
    },

    icon: {
        fontSize: 30,
        paddingRight: 15,
        position: 'absolute',
        bottom: 0
    },
    iconKey: {
        fontSize: 18,
        paddingRight: 18,
        paddingLeft: 5,
        position: 'absolute',

    },
    rowView: {
        width: '100%',
        height: 50,
        paddingBottom: 50,
        marginBottom: -5,
        top: 0,
        // flexDirection: 'row',
        // alignItems: 'center'
    },
    circle: {
        backgroundColor: 'transparent',
        height: 500,
        width: 500,
        position: 'absolute',
        bottom: -400,
        borderRadius: 400
    },
    button: {
        backgroundColor: 'white',
        color: 'white',
        width: wp('33%'),
        paddingVertical:10,
        margin: 1,
        marginBottom:0,
        marginRight:0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    rowKey: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    textButton: {
        color: '#d5322e',
        textAlign: 'center',
        fontSize: 60,
        fontWeight:'bold'
    },
    textKeterangan: {
        color: '#d5322e',
        textAlign: 'center',
        fontSize: 15,
        fontWeight:'100',
        marginTop:-8
    }
    
})