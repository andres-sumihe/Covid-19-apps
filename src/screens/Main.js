import React, { Component, useRef } from 'react';
import {Alert, View, Text, StyleSheet, StatusBar, TouchableOpacity, ScrollView, Keyboard, BackHandler, Platform , Dimensions} from 'react-native';
import {FontAwesome,FontAwesome5, MaterialCommunityIcons, AntDesign, Entypo, EvilIcons, Ionicons, Feather} from '@expo/vector-icons'
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
import dataRS from '../../RS_RUJUKAN.json'

import Logo from '../../assets/Covid-19.svg'
import Call from '../../assets/telkom.svg'
import {Linking} from 'react-native'

import { widthPercentageToDP as wp, heightPercentageToDP as hp}  from 'react-native-responsive-screen';
import { normalize } from '../components/ResponsiveFontSize';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick= this.handleBackButtonClick.bind(this)
    this.state = {
        detailHospitals: false,
        namaRSUD: '',
        phoneRSUD: '',
        alamatRSUD:'',
        posisiSekarang: true,
        location: null,
        errorMessage: null,
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
  handleBackButtonClick = () => {
    this.setState({setLocation: false})
    BackHandler.removeEventListener('hardwareBackPress',this.handleBackButtonClick);
    return true
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
        <View style={{height:hp('16%'), width:wp('100%'), backgroundColor:'white'}}>
            <TouchableOpacity 
                    onPress={()=>this.props.navigation.navigate("TambahPenduduk",{action: "Edit"})}
                    style={{
                    backgroundColor:'white',
                    width: "100%", 
                    justifyContent: 'flex-start',
                    paddingLeft:20,
                    height:hp('8%'), 
                    alignItems: 'center', 
                    paddingVertical:5,
                    flexDirection:'row' 
                        }}>
                <View style={{width:'12%'}}>
                    <FontAwesome color='grey' name="id-card" style={{}} size={20} />
                </View>
                <View style={{width:'80%'}}>
                    <Text style={{ paddingLeft: 5, color: 'grey', textAlign: 'left', }}>  Biodata</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity 
                    onPress={()=>this.props.navigation.navigate("Login")}
                    style={{ 
                    width: "100%", 
                    justifyContent: 'flex-start',
                    paddingLeft:20,
                    height:hp('8%'), 
                    alignItems: 'center', 
                    paddingVertical:5,
                    flexDirection:'row' 
                        }}>
                <View style={{width:'12%'}}>
                    <AntDesign color='grey' name="logout" style={{}} size={20} />
                </View>
                <View style={{width:'80%'}}>
                    <Text style={{ paddingLeft: 5, color: 'grey', textAlign: 'left', }}>Logout</Text>
                </View>
            </TouchableOpacity>
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
        markLat: latitude,  
        markLong: longitude
    });
    }

    handleMapOpen =()=>{
        // console.log(this.state.location.coords.latitude)
        if(this.state.location === null){
            Alert.alert(
                'GPS / Lokasi tidak ditemukan',
                'untuk mengatasi masalah ini, silahkan nyalakan GPS dan coba lagi, atau lanjut tanpa GPS',
                [
                  {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                  {text: 'Lanjut', onPress: () => {
                        this.setState({
                            posisiSekarang: false,
                            setLocation: true
                        })
                  }},
                ],
                { cancelable: false }
            )
        } else {
            const lat = this.state.location.coords.latitude
            const long = this.state.location.coords.longitude
            this.setState({
                markLat: lat,
                markLong: long,
                setLocation: true,
                positionSekarang: true,
            })
        }
    }
    Confirm = () => {
        return(
          <View style={styles.popupContainer}>
            <View style={styles.infoContainer}>
                <FontAwesome5 name="hospital" size={50} />
                <Text style={{fontWeight:'700', fontSize: normalize(20),textAlign: 'center',marginBottom:5}}>{this.state.namaRSUD}</Text>
                <TouchableOpacity 
                        onPress={()=>{Linking.openURL(`${this.state.phoneRSUD}`)}}
                        style={{flexDirection: "row", justifyContent: 'center',alignItems:'center',borderWidth:1, borderRadius:5, overflow: 'hidden',}}>
                    <View style={{justifyContent: 'center',alignItems: 'center', padding:3, backgroundColor:'#ccc', width:40}}>
                        <Feather name="phone-call" size={18} />
                    </View>
                    <Text style={{fontSize: normalize(15),textAlign: 'center', paddingHorizontal:5}}>{this.state.phoneRSUD != ''?this.state.phoneRSUD.slice(4):'02213212'}</Text>
                </TouchableOpacity>
                <Text style={{fontSize: normalize(15), textAlign: 'center',marginVertical:5}}>{this.state.alamatRSUD}</Text>
              </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.batalButton} onPress={()=> this.setState({detailHospitals: false})}>
                      <Text>Batal</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.hapusButton} onPress={()=>Linking.openURL(`https://www.google.com/maps/dir//${this.state.namaRSUD}`)}>
                      <Text style={{color:'white'}}>Petujuk Arah</Text>
                </TouchableOpacity>
            </View>
          </View>
        )}
   
    showMap = () => {
        return(
            <View style={{zIndex: 99, position: 'absolute'}}>
                <StatusBar hidden />
                {/* <Ionicons name='ios-arrow-back' size={35} style={{color: 'red', position: 'absolute', zIndex: 999, top : 25, left: 10, backgroundColor: '#fbfb', paddingVertical: 2, paddingHorizontal: 15, borderRadius: 5, }} onPress={()=> this.setState({setLocation:false})}/> */}
                {this.state.detailHospitals ? this.Confirm(): null}
                <MapView  
                    provider={PROVIDER_GOOGLE}
                    style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height,}}
                    onRegionChange={ (region, latitude, longitude) => this.onRegionChange(region, latitude, longitude)}
                    region={{
                        latitude: this.state.markLat,
                        longitude: this.state.markLong,
                        latitudeDelta: 0.0621,
                        longitudeDelta: 0.0521,
                    }}>
                    {dataRS.map((item, i)=>(
                        <MapView.Marker
                            key={i}
                            title={item.namaRSUD}
                            onPress={()=> this.handleOpenDetail(item.namaRSUD, item.telephone, item.alamatRSUD)}
                        
                            coordinate={item.petunjukArahRSUD}
                                // {/* {console.log(item.namaRSUD + ": "+parseFloat(item.petunjukArahRSUD.latitude)+" || "+parseFloat(item.petunjukArahRSUD.longitude))}  */}
                        >
                            <FontAwesome5 name="hospital" size={34} color="#d5322e" />
                        </MapView.Marker>
                    ))}
                    {this.state.posisiSekarang?<MapView.Marker
                        title={'Lokasi Anda'}
                        pinColor={'#0288d1'}
                        // onPress={this.setState}
                        coordinate={{latitude: this.state.markLat, longitude: this.state.markLong}}
                        // draggable
                        // onDragEnd={(e) => this.onMarkerDragEnd(e.nativeEvent.coordinate)}
                    >
                    
                    </MapView.Marker> :null}   
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


  handleOpenDetail = (nama, phone, alamat)=> {
      this.setState({detailHospitals:true, namaRSUD: nama, phoneRSUD: phone, alamatRSUD: alamat})
  }

    componentDidMount() {
        this.setState({mode: this.props.navigation.getParam("privilages")})
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        
        this.keyboardHideListener = Keyboard.addListener(Platform.OS === 'android' ? 'keyboardDidHide': 'keyboardWillHide', this.keyboardHideListener.bind(this));
        this.keyboardShowListener = Keyboard.addListener(Platform.OS === 'android' ? 'keyboardDidShow': 'keyboardWillShow', this.keyboardShowListener.bind(this));
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
              errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
          } else {
            this._getLocationAsync();
          }
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
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
    //   console.log(text)
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
                <Text style={{fontSize:normalize(14), paddingRight:10, color: 'white'}}>Dewi Kinasih</Text>
                <MaterialCommunityIcons name="account-outline" size={24} color="white" />
                
            </View>
                </TouchableOpacity>
        </View>

        <View style={styles.main}>
            <View style={styles.daerah}>
                <View>
                    <Text style={{fontSize: normalize(16), color:'white'}}>JAWA TENGAH</Text>
                    <Text style={{fontSize: normalize(16), color:'white'}}>KAB. SEMARANG</Text>
                </View>
                <View style={{alignItems: 'flex-end',}}>
                    <Text style={{fontSize: normalize(15), color:'white'}}>BANDUNGAN</Text>
                    <Text style={{fontSize: normalize(22), color:'white'}}>JIMBARAN</Text>
                </View>
            </View>
    
            {this.state.mode  == 'admin' ? <View style={styles.search}>
                <View style={{flex:1}}>
                    <FontAwesome name="search" size={16} color="grey" />
                </View>
                <View style={{flex:9, justifyContent: 'center', paddingRight:4}}>
                    <TouchableOpacity style={{justifyContent:'center'}}
                        activeOpacity={1}
                        onPress={()=> this.props.navigation.navigate("TambahAnggotaKeluarga", {privilages: this.state.mode,title:"Daftar Warga"})}>
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
            <View style={{position: "absolute",top:hp('10%'),borderTopWidth:1, borderTopColor:'#ccc', width:wp('85%'), justifyContent: 'center',alignItems: 'center',padding:10,}}> 
                <Text style={{color:'white', textAlign:'center',fontSize:normalize(15)}}>
                    Mari Bersama Kita Cegah Penyebaran Virus Corona
                </Text>
            </View>
            }
                {this.state.mode == 'admin' ?
                <View style={{position:'absolute',top:hp('21%'),borderRadius:5,marginTop:-10,justifyContent:'center', alignItems: 'center',width:wp('55%'), height:30, backgroundColor:'#ff9800'}}>
                    <Text style={{fontSize: normalize(15), color:'white', fontWeight:'100'}}>Pencatatan Non Penduduk</Text>
                </View>
                :
                <TouchableOpacity onPress={()=> this.props.navigation.navigate("AnggotaKeluarga")} 
                    style={{position:'absolute',top:hp('21%'),borderRadius:5,marginTop:-10,justifyContent:'center', alignItems: 'center',width:wp('55%'), height:30, backgroundColor:'#ff9800'}}>
                    <Text style={{fontSize: normalize(15), color:'white', fontWeight:'100'}}>Deteksi Dini Covid-19</Text>
                </TouchableOpacity>
            
                }
            
            <View style={styles.itemContainer}>
                <ScrollView style={{width:'100%', }} contentContainerStyle={{justifyContent:'center', alignItems:'center'}} showsVerticalScrollIndicator={false}>
                <View style={{backgroundColor:'red', marginTop:50}}>
                        <LinearGradient
                            colors={['white','white', 'transparent', 'transparent','transparent','transparent','transparent',]}
                            style={{ width: '100%', height: '50%', position: 'absolute', top: 0 }}
                        />
                        <LinearGradient
                            colors={['transparent', 'transparent','transparent','transparent','transparent','white', 'white']}
                            style={{ width: '100%', height: '50%', position: 'absolute', bottom: 0 }}
                        />
                        <LinearGradient
                            start={[0, 0]}
                            end={[1, 0]}
                            colors={['white','white','transparent', 'transparent','transparent','transparent', 'transparent']}
                            style={{ width: '50%', height: '100%', position: 'absolute', left: 0}}
                        />
                        <LinearGradient
                            start={[0, 0]} end={[1, 0]}
                            colors={['transparent', 'transparent','transparent','transparent', 'transparent','white', 'white']}
                            style={{ width: '50%', height: '100%', position: 'absolute', right: 0 }}
                        />

                    <View style={[styles.rowKey]}>
                        
                        <TouchableOpacity activeOpacity={1} onPress={()=> this.props.navigation.navigate("TambahAnggotaKeluarga", {privilages: this.state.mode, title:"Daftar Warga Rentan"})} style={styles.button}>
                            <Text style={styles.textButton}>85</Text>
                            <Text style={styles.textKeterangan}>Rentan</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} onPress={()=> this.props.navigation.navigate("TambahAnggotaKeluarga", {privilages: this.state.mode, title:"Daftar ODP"})} style={styles.button}>
                            <Text style={styles.textButton}>15</Text>
                            <Text style={styles.textKeterangan}>ODP</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} onPress={()=> this.props.navigation.navigate("TambahAnggotaKeluarga", {privilages: this.state.mode, title:"Daftar Warga PDP"})} style={styles.button}>
                            <Text style={styles.textButton}>5</Text>
                            <Text style={styles.textKeterangan}>PDP</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} onPress={()=> this.props.navigation.navigate("TambahAnggotaKeluarga", {privilages: this.state.mode, title:"Daftar Warga Positif"})} style={styles.button}>
                            <Text style={styles.textButton}>20</Text>
                            <Text style={styles.textKeterangan}>Positif</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.rowKey}>
                        <TouchableOpacity activeOpacity={1} onPress={()=> this.props.navigation.navigate("TambahAnggotaKeluarga", {privilages: this.state.mode, title:"Daftar Warga Keluar"})} style={styles.button}>
                            <Text style={styles.textButton}>120</Text>
                            <Text style={styles.textKeterangan}>Warga Keluar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} onPress={()=> this.props.navigation.navigate("TambahAnggotaKeluarga", {privilages: this.state.mode, title:"Daftar Warga Masuk"})} style={styles.button}>
                            <Text style={styles.textButton}>4</Text>
                            <Text style={styles.textKeterangan}>Warga Masuk</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} onPress={()=> this.props.navigation.navigate("TambahAnggotaKeluarga", {privilages: this.state.mode, title:"Daftar Warga Tamu Luar"})} style={styles.button}>
                            <Text style={styles.textButton}>120</Text>
                            <Text style={styles.textKeterangan}>Tamu Luar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} onPress={()=> this.props.navigation.navigate("TambahAnggotaKeluarga", {privilages: this.state.mode, title:"Daftar Pemudik"})} style={styles.button}>
                            <Text style={styles.textButton}>23</Text>
                            <Text style={styles.textKeterangan}>Pemudik</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                </ScrollView>
            </View>
        </View>
                <View style={{ position: 'absolute',bottom:hp('10%'),alignSelf:'center',flexDirection:'row',marginTop:20,backgroundColor: '#0288d1',alignItems: 'center',height:40, width:wp('80'), borderRadius:5, overflow: 'hidden',}}>
                    <TouchableOpacity onPress={()=>this.handleMapOpen()} style={{width:'50%',backgroundColor:'#0288d1', justifyContent: 'center',alignItems: 'center',}}>
                        <Text style={{color:'white'}}>FasKes Terdekat</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> console.log('Pesan Apa Pak/Mbak?')} style={{width:'50%', height:'100%',backgroundColor:'#d5322e', justifyContent: 'center',alignItems: 'center',}}>
                        <Text style={{color:'white'}}>Pesan Sembako</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={()=>{Linking.openURL(`tel:${this.state.phoneNumber}`)}} style={{position: 'absolute',bottom:0,marginTop:20, width:'100%', alignItems: 'center', flexDirection:'row', justifyContent:'center', backgroundColor: '#d5322e'}}>
                        <View>
                            <Call width={50} height={50} color="white"/>
                        </View>
                        <Text style={{fontSize:18, color:'white', fontWeight:'700'}}>Panggilan Darurat</Text>
                </TouchableOpacity>
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
            {/* {this.Confirm()} */}

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
        // height:hp('56%'),
        height:hp('56%'),
        top:-hp('19%'),
        zIndex:-1000,
        borderBottomLeftRadius:1000,
        borderBottomRightRadius:1000,

    },
    header:{
        flex:1,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'space-between',
        // backgroundColor:'white'
    },
    profil: {
        height:35,
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
        position: "absolute",
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
        maxHeight:40,
        flexDirection:'row',
        alignItems: 'center',
        paddingHorizontal:10,
        paddingVertical:5,
        backgroundColor:'white',
        borderRadius:10,
        width:'85%',
        flex:1,
        position: "absolute",
        top:hp('10%')
    },

    itemContainer: {
        flex:8,
        marginTop:20,
        alignItems:'center',
        position: 'absolute',
        top:hp('20%')
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
        width: wp('24.25%'),
        paddingVertical:8,
        margin: 1,
        marginBottom:0,
        marginRight:0,
        alignItems: 'center',
        justifyContent: 'center',
        height: hp('15%')
    },
    rowKey: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    textButton: {
        color: '#d5322e',
        textAlign: 'center',
        fontSize: 30,
        fontWeight:'bold'
    },
    textKeterangan: {
        color: '#d5322e',
        textAlign: 'center',
        fontSize: 12,
        fontWeight:'100',
        marginTop:-4
    },
    popupContainer: {
        position:'absolute',
        height:hp('100%'),
        width:wp('100%'),
        backgroundColor:'rgba(0,0,0,0.5)',
        flex:1,
        zIndex:1000000000000,
        justifyContent:"center",
        alignItems: 'center',
        padding:5,

      },
    
      infoContainer: {
        width:wp('65%'),
        minHeight:hp('30%'),
        flexDirection:'column',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius:5,
        borderTopRightRadius: 5,
        padding:3,
      },
      buttonContainer: {
        height:40,
        backgroundColor: 'white',
        borderRadius:5,
        width:wp('70%'),
        flexDirection:'row',
        overflow:"hidden"
      },
      fotoContainer: {
        flex:7,
        justifyContent: 'center',
        alignItems: 'center',
      },
      profileContainer: {
        flex:3,
        alignItems: 'center',
        marginTop:-30
      },
      batalButton: {
        flex:1,
        backgroundColor:'#ccc',
        justifyContent: 'center',
        alignItems: 'center',
      },
      hapusButton:{
        flex:1,
        backgroundColor:'#d4322e',
        justifyContent: 'center',
        alignItems: 'center',
      }
    
})