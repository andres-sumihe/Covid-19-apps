import React, { Component,useState } from 'react';
import {Platform,View, Text, StyleSheet, Image, TouchableOpacity, StatusBar, ScrollView, Picker, Keyboard, KeyboardAvoidingView, DatePickerAndroid, BackHandler} from 'react-native';
import {EvilIcons, Entypo, FontAwesome} from '@expo/vector-icons';
import {
    TextField,
} from 'react-native-material-textfield';
import ButtonControl from './Button';
import { LinearGradient } from 'expo-linear-gradient'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {Modalize} from 'react-native-modalize'
import { SearchBar } from 'react-native-elements';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { normalize } from '../../components/ResponsiveFontSize';
import RNPickerSelect from 'react-native-picker-select';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import CameraApp from '../../components/CameraApp';
import {
  handleAndroidBackButton,
  removeAndroidBackButtonHandler
} from '../../components/EpicFunction';



export default class TambahPenduduk extends Component {
  constructor(props) {
    super(props);
    this.state = {
        radioActive:1,
        keyboardAvoidingViewOffset:100,
        baru: 'Baru',
        search:'',
        active: 1,
        action:'',
        switchA: undefined,
        showHeader: true,
        modalTitle:null,
        modal2title:null,
        searchText: '',
        modal2Key: new Date().getTime(), 
        titleButtonPhoto: '',
        uri:'',
        filter:'Semua',
         provinsiData: [
            {"provinsi":"Provinsi Lahir" }, {"provinsi":"data"},{"provinsi":"data"}
          ],
          kabKotaData: [
            {"kabKota":"Kabupaten/ Kota" }, {"kabKota":"data"},{"kabKota":"data"}
          ],
          kecamatanData: [
            {"kecamatan":"Kecamatan" }, {"kecamatan":"data"},{"kecamatan":"data"}
          ],
          desaData: [
            {"desa":"Desa" }, {"desa":"data"},{"desa":"data"}
          ],
          kodeposData: [
            {"kodePos":"Kode Pos" }, {"kodePos":"data"},{"kodePos":"data"}
          ],
          pekerjaanData: [
            {label:"Programmer", value:"Programmer" }, 
            {label:"data", value:"data"},
            {label:"data", value:"data"}
          ],
          jenisKelaminData: [
            {"jenisKelamin":"Laki-Laki" }, {"jenisKelamin":"Perempuan"},
          ],
          golonganDaraData: [
            {
                id:1,
                label:"Tidak Tahu", 
                value:"Tidak Tahu", 
                color:'#d5322e',
                size:16
            }, 
            {
                id:2,
                label:"A", 
                value:"A",
                color:'#d5322e',
                size:16
            },
            {
                id:3,
                label:"B", 
                value:"B",
                color:'#d5322e',
                size:16
            },
            {
                id:4,
                label:"AB", 
                value:"AB", 
                color:'#d5322e',
                size:16
            },
            {
                id:5,
                label:"O", 
                value:"O",
                color:'#d5322e',
                size:16
            },
            {
                id:6,
                label:"A+", 
                value:"A+",
                color:'#d5322e',
                size:16
            },
            {
                id:7,
                label:"B+", 
                value:"B+",
                color:'#d5322e',
                size:16
            },
            {
                id:8,
                label:"AB+", 
                value:"AB+",
                color:'#d5322e',
                size:16
            },
            {
                id:9,
                label:"O+", 
                value:"O+",
                color:'#d5322e',
                size:16
            },
            {
                id:10,
                label:"A-", 
                value:"A-",
                color:'#d5322e',
                size:16
            },
            {
                id:11,
                label:"B-", 
                value:"B-",
                color:'#d5322e',
                size:16
            },
            
            {
                id:12,
                label:"AB-", 
                value:"AB-",
                color:'#d5322e',
                size:16
            },
            
            {
                id:13,
                label:"O-", 
                value:"O-",
                color:'#d5322e',
                size:16

            },
       
        ],
          pendidikanData: [
            {   
                id: 1,
                label:"Tidak/Belum Sekolah/TK/Paud", 
                value:"Tidak/Belum Sekolah/TK/Paud", 
                size: 16,
            color: '#d5322e',}
            , 
            {   
                id: 2,
                label:"Belum Tamat SD/Sederajat", 
                value:"Belum Tamat SD/Sederajat",
                size: 16,
                color: '#d5322e',
            },
            {   
                id: 3,
                label:"SD/Sederajat", 
                value:"SD/Sederajat",
                size: 16,
                color: '#d5322e',
            },
            {   
                id: 4,
                label:"SLTP/Sederajat", 
                value:"SLTP/Sederajat",
                size: 16,
                color: '#d5322e',
            },
            {   
                id: 5,
                label:"SLTA/Sederajat", 
                value:"SLTA/Sederajat",
                size: 16,
                color: '#d5322e',
            },
            {   
                id: 6,
                label:"Diploma I/II", 
                value:"Diploma I/II",
                size: 16,
                color: '#d5322e',
            },
            {   
                id: 7,
                label:"Akademi/Diploma III/Sarjana Muda", 
                value:"Akademi Diploma III/Sarjana Muda",
                size: 16,
                color: '#d5322e',
            },
            {   
                id: 8,
                label:"Diploma IV/Strata I", 
                value:"Diploma IV/Strata I",
                size: 16,
                color: '#d5322e',
            },
            {   
                id: 9,
                label:"Strata II", 
                value:"Strata II",
                size: 16,
                color: '#d5322e',
            },
            {   
                id: 10,
                label:"Strata III", 
                value:"Strata III",
                size: 16,
                color: '#d5322e',
            },
          ],

          agamaData: [
            {
                id: 1,
                label:"Islam",
                value:"Islam",
                color:'#d5322e',
                size: 16
            }, 

                {
                id: 2,
                label:"Kristen",
                value:"Kristen",
                color:'#d5322e',
                size: 16
            },

                {
                id: 3,
                label:"Katolik",
                value:"Katolik",
                color:'#d5322e',
                size: 16
            },

                {
                id: 4,
                label:"Hindu",
                value:"Hindu",
                color:'#d5322e',
                size: 16
            },

                {
                id: 5,
                label:"Buddha",
                value:"Buddha",
                color:'#d5322e',
                size: 16
            },

                {
                id: 6,
                label:"Khonghucu",
                value:"Khonghucu",
                color:'#d5322e',
                size: 16
            },

                {
                id: 7,
                label:"Penghayat Kepercayaan",
                value:"Penghayat Kepercayaan",
                color:'#d5322e',
                size: 16
            },

                {
                id: 8,
                label:"Lainnya",
                value:"Lainnya",
                color:'#d5322e',
                size: 16
            },

            ],
          jenisKependudukanData: [
            {
                id: 1,
                label:"Penduduk Asli/Tetap",
                value:"Penduduk Asli/Tetap",
                color:'#d5322e',
                size: 16
             } , 

                {
                id: 2,
                label:"Pendatang Domisili",
                value:"Pendatang Domisili",
                color:'#d5322e',
                size: 16
            },

                {
                id: 3,
                label:"Pindahan",
                value:"Pindahan",
                color:'#d5322e',
                size: 16
            },

            ],
          difabelData: [
            {
                id: 1,
                label:"Tidak Ada", 
                value:"Tidak Ada",
            color:'#d5322e',
            size: 16
            }, 

                {
                id: 2,
                label:"Fisik", 
                value:"Fisik",
                color:'#d5322e',
                size: 16
            },

                {
                id: 3,
                label:"Tuna Netra/Buta", 
                value:"Tuna Netra/Buta",
                color:'#d5322e',
                size: 16
            },

                {
                id: 4,
                label:"Tuna Rungu/Tuli", 
                value:"Tuna Rungu/Tuli",
                color:'#d5322e',
                size: 16
            },

                {
                id: 5,
                label:"Mental/Jiwa", 
                value:"Mental/Jiwa",
                color:'#d5322e',
                size: 16
            },

                {
                id: 6,
                label:"Fisik dan Mental", 
                value:"Fisik dan Mental",
                color:'#d5322e',
                size: 16
            },

                {
                id: 7,
                label:"Lainnya", 
                value:"Lainnya",
                color:'#d5322e',
                size: 16
            },

            ],
          statusData: [
            {
                id: 1,
                label:"Belum Kawin", 
                value:"Belum Kawin" ,   
                color:'#d5322e',
                size: 16
            }, 

                {
                id: 2,
                label:"Kawin", 
                value:"Kawin",
                color:'#d5322e',
                size: 16
            },

                {
                id: 3,
                label:"Cerai Hidup", 
                value:"Cerai Hidup",
                color:'#d5322e',
                size: 16
            },

                {
                id: 4,
                label:"Cerai Mati", 
                value:"Cerai Mati",
                color:'#d5322e',
                size: 16
            },

            ],
          pilihTempatLahir: [
             {"label":"Indonesia","value":"Indonesia"},
             {"label":"Luar Negeri","value":"Luar Negeri"}
          ],
          sesuaiKK: [
             {"sesuai":"Ya"},{"sesuai":"Tidak"}
          ],
          tempatTinggal: [
             {"dimana":"Ya"},{"dimana":"Tidak"}
          ],
          konfirmNegara: "Indonesia",
          sesuaiKKConfirm: "Ya",
          jenisKependudukan: "Penduduk Asli/Tetap",
          difabel:"Tidak Ada",
          tempatTinggalCOnfirm: "Ya",
          provinsi: "",
          kabKota: "Kabupaten/ Kota",
          kecamatan: "Kecamatan",
          desa: "Desa/ Kelurahan",
          kodepos: "Kode Pos",
          agama: "Islam",
          Status: "Belum Kawin",
          golonganDarah: "Tidak Tahu",
          pekerjaan: "Kode Pos",
          pendidikan:"",
          jenisKelamin: "Laki-laki",
          date: new Date(),
          show:false,
          mode: 'date',
          tanggalLahir: ['Tanggal Lahir'],
          marginKey: 5,
          lainnyaOn: false,
          agamaPilihan: null,
          hasPermission: null,
          camera: false
        };

  }
 
  componentDidMount(){
      
       this.setState({
           action: this.props.navigation.getParam("action")        
        });
       if(this.props.navigation.getParam("action") == "Edit"){
           this.setState({
               baru: "",
               titleButtonPhoto:"Ganti Foto",
               uri: this.props.navigation.getParam("uri")
            })
            console.log("INI URI: "+ this.props.navigation.getParam("uri"))
       }else{
           this.setState({baru: "Baru", titleButtonPhoto:"Ambil Foto"})
       } 
       this.keyboardHideListener = Keyboard.addListener(Platform.OS === 'android' ? 'keyboardDidHide': 'keyboardWillHide', this.keyboardHideListener.bind(this));
       this.keyboardShowListener = Keyboard.addListener(Platform.OS === 'android' ? 'keyboardDidShow': 'keyboardWillShow', this.keyboardShowListener.bind(this));
    }
    
    componentWillUnmount() {
        this.keyboardHideListener.remove()
        this.keyboardShowListener.remove()

    }
    keyboardHideListener() {
        this.setState({
            keyboardAvoidingViewOffset: 0
        });
    }
    keyboardShowListener() {
        this.setState({
            keyboardAvoidingViewOffset: 65
        });
    }

    Imag

    renderContent = () => {
        return (
          
       
            <View style={styles.content}>
              <View style={{ borderBottomColor: '#eee', borderBottomWidth: 1 }}>
                <SearchBar
                    onChangeText={search => {this.setState({ searchText: search }); }}
                                    containerStyle={{
                    width: '100%', backgroundColor: 'white', borderBottomColor: 'transparent',
                    borderTopColor: 'transparent', height:40, justifyContent:'center',
                }}
                    inputContainerStyle={{ backgroundColor: 'transparent' }}
                    inputStyle={{fontSize:14}}
                    placeholder="Cari .."
                    value={this.state.searchText}
                />
              </View>
            </View>
        );
      };

      renderContentPendidikan = () => {
        return (
          <View style={styles.contentRadio}>
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
                <Text style={{color: "white"}}>{this.state.modal2Title}</Text>
            </View>
            <View style={{height:20}}></View>
            <View style={this.state.modal2Title == "Pilih Golongan Darah" ? styles.content_golongan_darah:styles.content_row}>
            {this.state.modal2Title == "Pilih Pendidikan"?this.state.pendidikanData.map((item,index)=>{
                return (
                  <TouchableOpacity style={{flexDirection:'row', margin:5, width:'100%'}} onPress={()=> this.setState({radioActive: item.id})}>
                    <View style={{borderWidth:1,borderColor: this.state.radioActive== item.id ? '#d5322e':'black', borderRadius:18, width:18, height:18, marginRight:10, justifyContent: 'center',alignItems: 'center',}}>
                      {this.state.radioActive== item.id ? <View style={{backgroundColor:'#d5322e', width: 12, height: 12, borderRadius: 12}}/> :null}
                    </View>

                    <View>
                      <Text>{item.label}</Text>
                    </View>
                  </TouchableOpacity>
                )
              }):null}
            {this.state.modal2Title == "Pilih Agama" ? 
            
            <View style={{flexDirection:'row', width:'100%', height:140}}>
                <View style={{width:'50%'}}>
                {this.state.agamaData.map((item,index)=>{
                    if(item.id <= 5){return (
                    <TouchableOpacity style={{flexDirection:'row', margin:5, width:'100%'}} onPress={()=> this.setState({radioActive: item.id})}>
                        <View style={{borderWidth:1,borderColor: this.state.radioActive== item.id ? '#d5322e':'black', borderRadius:18, width:18, height:18, marginRight:10, justifyContent: 'center',alignItems: 'center',}}>
                        {this.state.radioActive== item.id ? <View style={{backgroundColor:'#d5322e', width: 12, height: 12, borderRadius: 12}}/> :null}
                        </View>

                        <View>
                        <Text>{item.label}</Text>
                        </View>
                    </TouchableOpacity>
                    )
                }})}
                </View>
                {/* Right */}
                <View style={{width:'50%'}}>
                {this.state.agamaData.map((item,index)=>{
                    if(item.id > 5){return (
                    <TouchableOpacity style={{flexDirection:'row', margin:5, width:'100%'}} onPress={()=> this.setState({radioActive: item.id})}>
                        <View style={{borderWidth:1,borderColor: this.state.radioActive== item.id ? '#d5322e':'black', borderRadius:18, width:18, height:18, marginRight:10, justifyContent: 'center',alignItems: 'center',}}>
                        {this.state.radioActive== item.id ? <View style={{backgroundColor:'#d5322e', width: 12, height: 12, borderRadius: 12}}/> :null}
                        </View>

                        <View>
                        <Text>{item.label}</Text>
                        </View>
                    </TouchableOpacity>
                    )
                }})}
                {/* textfield masukan agama */}
                {this.state.radioActive == 8 ? 
                <View style={{width:"100%"}}>
                    <View style={{flex:1, justifyContent: 'center', marginBottom:15, marginLeft:8}}>
                        <TextField
                            // value={username}
                            label='Masukkan Agama'
                            keyboardType='default'
                            textColor='grey'
                            fontSize={normalize(12)}
                            activeLineWidth={1}
                            baseColor='gray'
                            selectionColor='grey'
                            tintColor='#d5322e'
                            lineWidth={1}
                            contentInset={{label: 0, top:4, input:1}}
                            // onChangeText={ (username) => this.setState({ username })} 
                            />
                    </View>
                </View>:null}
                </View>
            </View>
              
              :null}
            {this.state.modal2Title == "Pilih Golongan Darah" ? 
            <View> 
            {this.state.golonganDaraData.map((item,index)=>{
                if(item.id == 1){return (
                  <TouchableOpacity style={{flexDirection:'row', margin:5, width:'100%'}} onPress={()=> this.setState({radioActive: item.id})}>
                    <View style={{borderWidth:1,borderColor: this.state.radioActive== item.id ? '#d5322e':'black', borderRadius:18, width:18, height:18, marginRight:10, justifyContent: 'center',alignItems: 'center',}}>
                      {this.state.radioActive== item.id ? <View style={{backgroundColor:'#d5322e', width: 12, height: 12, borderRadius: 12}}/> :null}
                    </View>

                    <View>
                      <Text>{item.label}</Text>
                    </View>
                  </TouchableOpacity>
                )
              }
              
            })}
            <View style={{width:'100%', height:130, flexWrap:'wrap'}}>
            {this.state.golonganDaraData.map((item,index)=>{
                if(item.id != 1){return (
                  <TouchableOpacity style={{flexDirection:'row', margin:5, width:wp('32%')}} onPress={()=> this.setState({radioActive: item.id})}>
                    <View style={{borderWidth:1,borderColor: this.state.radioActive== item.id ? '#d5322e':'black', borderRadius:18, width:18, height:18, marginRight:10, justifyContent: 'center',alignItems: 'center',}}>
                      {this.state.radioActive== item.id ? <View style={{backgroundColor:'#d5322e', width: 12, height: 12, borderRadius: 12}}/> :null}
                    </View>

                    <View>
                      <Text>{item.label}</Text>
                    </View>
                  </TouchableOpacity>
                )
              }
              
            })}
                
            </View>
            </View>
              :null}
            {this.state.modal2Title == "Pilih Status Pernikahan" ? this.state.statusData.map((item,index)=>{
                return (
                  <TouchableOpacity style={{flexDirection:'row', margin:5, width:'100%'}} onPress={()=> this.setState({radioActive: item.id})}>
                    <View style={{borderWidth:1,borderColor: this.state.radioActive== item.id ? '#d5322e':'black', borderRadius:18, width:18, height:18, marginRight:10, justifyContent: 'center',alignItems: 'center',}}>
                      {this.state.radioActive== item.id ? <View style={{backgroundColor:'#d5322e', width: 12, height: 12, borderRadius: 12}}/> :null}
                    </View>

                    <View>
                      <Text>{item.label}</Text>
                    </View>
                  </TouchableOpacity>
                )
              }):null}
            {this.state.modal2Title == "Pilih Difabel" ? this.state.difabelData.map((item,index)=>{
                return (
                  <TouchableOpacity style={{flexDirection:'row', margin:5, width:'100%'}} onPress={()=> this.setState({radioActive: item.id})}>
                    <View style={{borderWidth:1,borderColor: this.state.radioActive== item.id ? '#d5322e':'black', borderRadius:18, width:18, height:18, marginRight:10, justifyContent: 'center',alignItems: 'center',}}>
                      {this.state.radioActive == item.id ? <View style={{backgroundColor:'#d5322e', width: 12, height: 12, borderRadius: 12}}/> :null}
                    </View>

                    <View>
                      <Text>{item.label}</Text>
                    </View>
                  </TouchableOpacity>
                )
              }):null}
            {this.state.modal2Title == "Pilih Jenis Kependudukan" ? this.state.jenisKependudukanData.map((item,index)=>{
                return (
                  <TouchableOpacity style={{flexDirection:'row', margin:5, width:'100%'}} onPress={()=> this.setState({radioActive: item.id})}>
                    <View style={{borderWidth:1,borderColor: this.state.radioActive== item.id ? '#d5322e':'black', borderRadius:18, width:18, height:18, marginRight:10, justifyContent: 'center',alignItems: 'center',}}>
                      {this.state.radioActive == item.id ? <View style={{backgroundColor:'#d5322e', width: 12, height: 12, borderRadius: 12}}/> :null}
                    </View>

                    <View>
                      <Text>{item.label}</Text>
                    </View>
                  </TouchableOpacity>
                )
              }):null}
            </View>
            <View style={{justifyContent: 'center',alignItems: 'center',height:80}}>
              <TouchableOpacity style={{justifyContent: 'center',alignItems: 'center',paddingVertical:7,borderRadius:5, paddingHorizontal:20, backgroundColor:'grey', width:'40%'}}>
                <Text style={{color: 'white', fontSize: normalize(14)}}>Tetapkan</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      };
      modal = React.createRef();
      modal2 = React.createRef();

      openImagePicker = () => {
        
      }
      openModal = (e) => {
        this.setState({modalTitle:e})
        this.setState({showHeader: false})
        if (this.modal.current) {
          this.modal.current.open();
        }
      };
      
      closeModal = () => {
        this.setState({showHeader: true})
        console.log(this.state.modalTitle)
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

      onChangeCalendar = (event, selectedDate) => {
        const currentDate = selectedDate || this.state.date
        const formatted = `${currentDate.getDate()} / ${currentDate.getMonth()+1} / ${currentDate.getFullYear()}`
        this.setState({tanggalLahir: formatted, show: false})
      }


  render() {
      
    return (
        
        <View style={{ flex: 1, flexDirection:"column"}}>
            <View style={{height: StatusBar.currentHeight, width: '100%',position:'absolute', backgroundColor: '#d5322e'}} />
            <View style={{height: 50, width: "100%", flexDirection: 'row', alignItems: 'center', marginTop:StatusBar.currentHeight }}>
                <TouchableOpacity onPress={this.state.showHeader?() => this.props.navigation.goBack(): this.closeModal}>
                    <Entypo name={'chevron-left'} color='#d5322e' size={24} style={{ paddingLeft: 10 }} />
                </TouchableOpacity>
                <Text style={{ paddingLeft: 10, fontSize: normalize(15), color: "#d5322e", fontWeight: '500' }}>{this.state.showHeader? this.state.action + ' Penduduk ' +this.state.baru:this.state.modalTitle}</Text>
            </View>
        <View style={{flex:9}}>
            <View style={{ height: hp('1%') }}>
                <LinearGradient
                    colors={['rgba(0,0,0,0.1)', 'transparent']}
                    style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    height: hp('1%'),
                    }}
                />
            </View>
        
       
        {/* <View style={{flex:9,}}> */}
            <KeyboardAvoidingView style={{flex:9}} 
                // enabled={this.state.showHeader? true:false} 
                enabled
                behavior="height" 
                keyboardVerticalOffset={75}>
        <ScrollView style={{}} contentContainerStyle={{justifyContent: 'center',alignItems: 'center',}}>
                <View style={{width:"90%"}}>
                    <View style={{flex:1, justifyContent: 'center', alignItems: 'center',marginBottom:0, marginTop:20}}>
                        <View style={{
                                zIndex: 1000,
                                borderRadius:5,
                                borderColor: '#d5322e',
                                borderWidth:1,
                                position: 'absolute',
                                top:-15, 
                                backgroundColor: 'white', 
                                paddingHorizontal:10, 
                                paddingVertical:5}}>

                            <Text style={{color:'grey'}}>Nomor Kartu Keluarga</Text>
                        </View>
                        <View style={{width:'80%', backgroundColor:'#d5322e',borderWidth:1,borderRadius:10, borderColor:'#d5322e', height:60, justifyContent: 'center', alignItems:'center'}}>
                            <Text style={{fontSize: normalize(24), fontWeight:'700',color:'white', paddingTop:5}}>1234567890987654</Text>
                        </View>
                            
                    </View>
                </View>
                <View style={{width:"90%", marginTop: 10}}>
                    <View style={{flex:1, justifyContent: 'center'}}>
                        <TextField
                            // value={username}
                            label="No. Kartu Tanda Penduduk"
                            keyboardType='numeric'
                            textColor='grey'
                            fontSize={normalize(14)}
                            activeLineWidth={1}
                            baseColor='gray'
                            selectionColor='grey'
                            tintColor='#d5322e'
                            lineWidth={1}
                            contentInset={{label: 0, top:4, input:1}}
                            // onChangeText={ (username) => this.setState({ username })} 
                            />
                        
                    </View>
                </View>

                <View style={{width:"90%"}}>
                    <View style={{flex:1, justifyContent: 'center', marginBottom:15}}>
                        <TextField
                            // value={username}
                            label='Nama Lengkap'
                            keyboardType='default'
                            textColor='grey'
                            fontSize={normalize(14)}
                            activeLineWidth={1}
                            baseColor='gray'
                            selectionColor='grey'
                            tintColor='#d5322e'
                            lineWidth={1}
                            contentInset={{label: 0, top:4, input:1}}
                            // onChangeText={ (username) => this.setState({ username })} 
                            />
                    </View>
                </View>
                <View style={{width:"90%"}}>
                    <View style={{flex:1, justifyContent: 'center', marginBottom:15}}>
                        <Text style={{position: 'absolute',top:-10, color:'grey',fontSize: normalize(12)}}>Negara Kelahiran</Text>
                        <View style={{borderBottomWidth:1, borderColor:'grey'}}>
                            <RNPickerSelect 
                                placeholder={{} }
                                useNativeAndroidPickerStyle={false}
                                style={{
                                    inputAndroid:{
                                        backgroundColor:'transparent',
                                        color:'grey',
                                        fontSize:12
                                    },
                                    placeholder:{
                                        color: 'grey'
                                    },
                                    iconContainer: {
                                        right:0
                                    }
                                }}
                                Icon={()=> {
                                    return <Entypo name='chevron-down' color='grey' size={20} style={{ paddingRight:0  }} />
                                }}
                                onValueChange={(value)=> this.setState({konfirmNegara: value})}
                                items={[
                                    {label: 'Indonesia', value: 'Indonesia'},
                                    {label: 'Luar Negeri',value: 'Luar Negeri'}
                                 ]}
                            />
                        </View>
                    </View>
                </View>
                {this.state.konfirmNegara == "Indonesia" ?
                <View style={{width:"90%"}}>
                    {/* Provinsi */}
                    <View style={{width:"100%"}}>
                        <View style={{flex:1, justifyContent: 'center', marginBottom:15}}>
                            <TouchableOpacity onPress={()=>this.openModal('Pilih Provinsi')} style={{borderBottomWidth:1, borderColor:'grey', height:30}}>
                                <Text style={{bottom:5,left:1, position: 'absolute', color:'grey', fontSize:normalize(14)}}>Provinsi Kelahiran</Text>   
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* KABUPATEN KOTA */}
                    <View style={{width:"100%"}}>
                        <View style={{flex:1, justifyContent: 'center', marginBottom:20}}>
                            <TouchableOpacity onPress={()=>this.openModal('Pilih Kabupaten / Kota')} style={{borderBottomWidth:1, borderColor:'grey', height:30}}>
                                <Text style={{bottom:5,left:1, position: 'absolute', color:'grey', fontSize:normalize(14)}}>Kabupaten / Kota Kelahiran</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>:null}

                {this.state.konfirmNegara == "Luar Negeri" ? <View style={{width:"90%"}}>
                    <View style={{flex:1, justifyContent: 'center', marginBottom:15}}>
                        <TouchableOpacity onPress={()=>this.openModal('Pilih Negara')} style={{borderBottomWidth:1, borderColor:'grey', height:30}}>
                            <Text style={{bottom:5,left:1, position: 'absolute', color:'grey', fontSize:normalize(14)}}>Negara Kelahiran</Text>
                        </TouchableOpacity>
                    </View>
                </View>:null}
                
                <View style={{width:"90%"}}>
                    <View style={{flex:1, justifyContent: 'center', marginBottom:15}}>
                    <Text style={{position: 'absolute',top:-10, color:'grey',fontSize: normalize(12)}}>Tempat Tinggal Sesuai KK</Text>
                        <View style={{borderBottomWidth:1, borderColor:'grey'}}>
                            <RNPickerSelect 
                                placeholder={{}}
                                useNativeAndroidPickerStyle={false}
                                style={{
                                    inputAndroid:{
                                        backgroundColor:'transparent',
                                        color:'grey',
                                        fontSize:12
                                    },
                                    placeholder:{
                                        color: 'grey'
                                    },
                                    iconContainer: {
                                        right:0
                                    }
                                }}
                                Icon={()=> {
                                    return <Entypo name='chevron-down' color='grey' size={20} style={{ paddingRight:0  }} />
                                }}
                                onValueChange={(value)=> this.setState({sesuaiKKConfirm: value})}
                                items={[
                                    {label: 'Ya', value: 'Ya'},
                                    {label: 'Tidak',value: 'Tidak'}
                                 ]}
                            />
                        </View>
                    </View>
                </View>

                {/* confirm tempat */}
                {this.state.sesuaiKKConfirm == "Ya" ?
                    null
                :<View style={{width:"90%"}}>
                    <View style={{flex:1, justifyContent: 'center', marginBottom:20}}>
                    <Text style={{position: 'absolute',top:-10, color:'grey',fontSize: normalize(12)}}>Tinggal Dalam Negeri</Text>
                        <View style={{borderBottomWidth:1, borderColor:'grey'}}>
                            <RNPickerSelect 
                                placeholder={{} }
                                useNativeAndroidPickerStyle={false}
                                style={{
                                    inputAndroid:{
                                        backgroundColor:'transparent',
                                        color:'grey',
                                        fontSize:12
                                    },
                                    placeholder:{
                                        color: 'grey'
                                    },
                                    iconContainer: {
                                        right:0
                                    }
                                }}
                                Icon={()=> {
                                    return <Entypo name='chevron-down' color='grey' size={20} style={{ paddingRight:0  }} />
                                }}
                                onValueChange={(value)=> this.setState({tempatTinggalCOnfirm: value})}
                                items={[
                                    {label: 'Ya', value: 'Ya'},
                                    {label: 'Tidak',value: 'Tidak'}
                                 ]}
                            />
                        </View>
                    </View>
                </View>}
                {(this.state.tempatTinggalCOnfirm == "Ya" && this.state.sesuaiKKConfirm == "Tidak") ?
                        <View style={{width:"90%"}}>
                        {/* Provinsi */}
                    <View style={{width:"100%"}}>
                        <View style={{flex:1, justifyContent: 'center', marginBottom:15}}>
                            <TouchableOpacity onPress={()=>this.openModal('Pilih Provinsi')} style={{borderBottomWidth:1, borderColor:'grey', height:30}}>
                                <Text style={{bottom:5,left:1, position: 'absolute', color:'grey', fontSize:normalize(14)}}>Provinsi Tempat Tinggal</Text>   
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* KABUPATEN KOTA */}
                    <View style={{width:"100%"}}>
                        <View style={{flex:1, marginBottom:15}}>
                            <TouchableOpacity onPress={()=>this.openModal('Pilih Kabupaten / Kota')} style={{borderBottomWidth:1, borderColor:'grey', height:30}}>
                                <Text style={{bottom:5,left:1, position: 'absolute', color:'grey', fontSize:normalize(14)}}>Kabupaten / Kota Tempat Tinggal</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* KECAMATAN */}
                    <View style={{width:"100%"}}>
                        <View style={{flex:1, justifyContent: 'center', marginBottom:15}}>
                            <TouchableOpacity onPress={()=>this.openModal('Pilih Kecamatan')} style={{borderBottomWidth:1, borderColor:'grey', height:30}}>
                                <Text style={{bottom:5,left:1, position: 'absolute', color:'grey', fontSize:normalize(14)}}>Kecamatan Tempat Tinggal</Text>   
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* DESA KELURAHAN */}
                    <View style={{width:"100%"}}>
                        <View style={{flex:1, justifyContent: 'center', marginBottom:15}}>
                            <TouchableOpacity onPress={()=>this.openModal('Pilih Desa')} style={{borderBottomWidth:1, borderColor:'grey', height:30}}>
                                <Text style={{bottom:5,left:1, position: 'absolute', color:'grey', fontSize:normalize(14)}}>Desa / Kelurahan Tempat Tinggal</Text>   
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* Dusun */}
                    <View style={{width:"100%"}}>
                        <View style={{flex:1, justifyContent: 'center', marginBottom:10}}>
                            <TouchableOpacity onPress={()=>this.openModal('Pilih Dusun/Dukuh/Sebutan Lain')} style={{borderBottomWidth:1, borderColor:'grey', height:30}}>
                                <Text style={{bottom:5,left:1, position: 'absolute', color:'grey', fontSize:normalize(14)}}>Dusun/Dukuh/Sebutan Lain</Text>   
                            </TouchableOpacity>
                        </View>
                    </View>
                            {/* RT / RW / KODE POS */}
                    <View style={{flex:1, alignItems: 'center', justifyContent:'space-between',flexDirection:'row',}}>
                    <View style={{width:'30%', padding:2, justifyContent: 'center',}}>
                        <TextField
                            // value={rt}
                            label='RT'
                            keyboardType='numeric'
                            textColor='grey'
                            fontSize={normalize(14)}
                            baseColor='gray'
                            selectionColor='grey'
                            tintColor='#d5322e'
                            lineWidth={1.1}
                            activeLineWidth={1.1}
                            containerStyle={{width:'100%',backgroundColor:'transparent'}}
                            contentInset={{label: 0, top:4, input:1}}
                            // onChangeText={ (username) => this.setState({ username })} 
                            />

                        <TouchableOpacity onPress={()=>this.openModal('Pilih RT')} style={{flex:1, position: "absolute", right:0}}>
                            <FontAwesome name="search" size={16} color="grey" />
                        </TouchableOpacity>
                    </View>
                    <View style={{width:'30%', padding:2,justifyContent: 'center',}}>
                        <TextField
                            // value={rw}
                            label='RW'
                            keyboardType='numeric'
                            textColor='grey'
                            fontSize={normalize(14)}
                            baseColor='gray'
                            selectionColor='grey'
                            tintColor='#d5322e'
                            lineWidth={1.1}
                            activeLineWidth={1.1}
                            containerStyle={{width:'100%', backgroundColor:'transparent'}}
                            inputContainerStyle={{width:'100%',}}
                            contentInset={{label: 0, top:4, input:1}}
                            // onChangeText={ (username) => this.setState({ username })} 
                            />

                        <TouchableOpacity onPress={()=>this.openModal('Pilih RW')} style={{flex:1, position: "absolute", right:0}}>
                            <FontAwesome name="search" size={16} color="grey" />
                        </TouchableOpacity>
                    </View>
                    <View style={{width:'30%', padding:2,justifyContent: 'center',}}>
                        <TextField
                            // value={kodePos}
                            label='Kode Pos'
                            keyboardType='numeric'
                            textColor='grey'
                            fontSize={normalize(14)}
                            baseColor='gray'
                            selectionColor='grey'
                            tintColor='#d5322e'
                            lineWidth={1.1}
                            activeLineWidth={1.1}
                            containerStyle={{width:'100%',backgroundColor:'transparent'}}
                            contentInset={{label: 0, top:4, input:1}}
                            // onChangeText={ (username) => this.setState({ username })} 
                            />
                            
                        <TouchableOpacity onPress={()=>this.openModal('Pilih Kode Pos')} style={{flex:1, position: "absolute", right:0}}>
                            <FontAwesome name="search" size={16} color="grey" />
                        </TouchableOpacity>
                    </View>
                </View>
                        {/* <View style={{width:"90%"}}> */}
                            <View style={{flex:1, justifyContent: 'center', marginBottom:5}}>
                                <TextField
                                    // value={username}
                                    label='Nama Jalan'
                                    keyboardType='default'
                                    textColor='grey'
                                    fontSize={normalize(14)}
                                    activeLineWidth={1.1}
                                    baseColor='gray'
                                    selectionColor='grey'
                                    tintColor='#d5322e'
                                    lineWidth={1.1}
                                    contentInset={{label: 0, top:4, input:1}}
                                    // onChangeText={ (username) => this.setState({ username })} 
                                    />
                                    
                            </View>
                            <View style={{flex:1, justifyContent: 'center', marginBottom:5}}>
                                <TextField
                                    // value={username}
                                    label='Nomor Rumah'
                                    keyboardType='default'
                                    textColor='grey'
                                    fontSize={normalize(14)}
                                    activeLineWidth={1}
                                    baseColor='gray'
                                    selectionColor='grey'
                                    tintColor='#d5322e'
                                    lineWidth={1}
                                    contentInset={{label: 0, top:4, input:1}}
                                    // onChangeText={ (username) => this.setState({ username })} 
                                    />
                                    
                            </View>
                        {/* </View> */}
                    </View>

                :null}

                {this.state.sesuaiKKConfirm == "Tidak" && this.state.tempatTinggalCOnfirm == "Tidak" ? <View style={{width:"90%"}}>
                    <View style={{flex:1, justifyContent: 'center', marginBottom:15}}>
                        <TouchableOpacity onPress={()=>this.openModal('Pilih Negara')} style={{borderBottomWidth:1, borderColor:'grey', height:30}}>
                            <Text style={{bottom:5,left:1, position: 'absolute', color:'grey', fontSize:normalize(14)}}>Negara Tempat Tinggal</Text>
                        </TouchableOpacity>
                    </View>
                </View>:null}

                <View style={{width:"90%"}}>
                    <View style={{flex:1, justifyContent: 'center', marginBottom:20}}>
                        <TouchableOpacity onPress={()=>this.setState({show: true})} style={{borderBottomWidth:1, borderColor:'grey', height:30}}>
                            <Text style={{bottom:5,left:1, position: 'absolute', color:'grey', fontSize:normalize(14)}}>{this.state.tanggalLahir}</Text>   
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{width:"90%"}}>
                    <View style={{flex:1, alignItems: 'center', justifyContent:'space-between',flexDirection:'row', marginBottom:5}}>
                        <View style={{width:'46%'}}>
                            {/* Jenis Kelamin */}
                            <View style={{width:"100%"}}>
                                <View style={{flex:1, justifyContent: 'center', marginBottom:15}}>
                                <Text style={{position: 'absolute',top:-10, color:'grey',fontSize: normalize(12)}}>Jenis Kelamin</Text>
                                    <View style={{borderBottomWidth:1, borderColor:'grey'}}>
                                    <RNPickerSelect 
                                        placeholder={{}}
                                        useNativeAndroidPickerStyle={false}
                                        style={{
                                            inputAndroid:{
                                                backgroundColor:'transparent',
                                                color:'grey',
                                                fontSize:12
                                            },
                                            placeholder:{
                                                color: 'grey'
                                            },
                                            iconContainer: {
                                                right:0
                                            }
                                        }}
                                        Icon={()=> {
                                            return <Entypo name='chevron-down' color='grey' size={20} style={{ paddingRight:0  }} />
                                        }}
                                        onValueChange={(value)=> this.setState({jenisKelamin: value})}
                                        items={[
                                            {label: 'Laki-laki', value: 'Laki-laki'},
                                            {label: 'Perempuan',value: 'Perempuan'}
                                        ]}
                                    />
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{width:'46%'}}>
                            {/* Golongan Darah */}
                            <View style={{width:"100%"}}>
                                <View style={{flex:1, justifyContent: 'center', marginBottom:15}}>
                                <Text style={{position: 'absolute',top:-10, color:'grey',fontSize: normalize(12)}}>Golongan Darah</Text>
                                    <View style={{borderBottomWidth:1, borderColor:'grey'}}>
                                        <TouchableOpacity onPress={()=>this.openModal2('Pilih Golongan Darah')} style={{height:28}}>
                                            <Text style={{bottom:5,left:1, position: 'absolute', color:'grey', fontSize:normalize(12)}}>Tidak Tahu</Text>   
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    
                    <View style={{flex:1, alignItems: 'center', justifyContent:'space-between',flexDirection:'row', marginBottom:5}}>
                        <View style={{width:'46%'}}>
                            {/* Agama */}
                            <View style={{width:"100%"}}>
                                <View style={{flex:1, justifyContent: 'center', marginBottom:10}}>
                                <Text style={{position: 'absolute',top:-10, color:'grey',fontSize: normalize(12)}}>Agama</Text>
                                    <View style={{borderBottomWidth:1, borderColor:'grey'}}>
                                        <TouchableOpacity onPress={()=>this.openModal2('Pilih Agama')} style={{height:28}}>
                                            <Text style={{bottom:5,left:1, position: 'absolute', color:'grey', fontSize:normalize(12)}}>Islam</Text>   
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                        
                        <View style={{width:'46%'}}>
                            {/* Status */}
                            <View style={{width:"100%"}}>
                                <View style={{flex:1, justifyContent: 'center', marginBottom:10}}>
                                <Text style={{position: 'absolute',top:-10, color:'grey',fontSize: normalize(12)}}>Status Pernikahan</Text>
                                    <View style={{borderBottomWidth:1, borderColor:'grey'}}>
                                        <TouchableOpacity onPress={()=>this.openModal2('Pilih Status Pernikahan')} style={{height:28}}>
                                            <Text style={{bottom:5,left:1, position: 'absolute', color:'grey', fontSize:normalize(12)}}>Belum Kawin</Text>   
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    {this.state.agama == "Lainnya" ?
                        <View style={{width:"100%"}}>
                            <View style={{flex:1, justifyContent: 'center', marginBottom:15}}>
                                <TextField
                                    // value={username}
                                    label='Masukkan Agama'
                                    keyboardType='default'
                                    textColor='grey'
                                    fontSize={normalize(12)}
                                    activeLineWidth={1}
                                    baseColor='gray'
                                    selectionColor='grey'
                                    tintColor='#d5322e'
                                    lineWidth={1}
                                    contentInset={{label: 0, top:4, input:1}}
                                    // onChangeText={ (username) => this.setState({ username })} 
                                    />
                            </View>
                        </View>
                        : null}
                    {/* Jenis Kependudukan */}
                    <View style={{width:"100%"}}>
                        <View style={{flex:1, justifyContent: 'center', marginBottom:15}}>
                        <Text style={{position: 'absolute',top:-10, color:'grey',fontSize: normalize(12)}}>Jenis Kependudukan</Text>
                            <View style={{borderBottomWidth:1, borderColor:'grey'}}>
                                <TouchableOpacity onPress={()=>this.openModal2('Pilih Jenis Kependudukan')} style={{height:28}}>
                                    <Text style={{bottom:5,left:1, position: 'absolute', color:'grey', fontSize:normalize(12)}}>Penduduk Asli/Tetap</Text>   
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    {/* Difabel */}
                    <View style={{width:"100%"}}>
                        <View style={{flex:1, justifyContent: 'center', marginBottom:15}}>
                        <Text style={{position: 'absolute',top:-10, color:'grey',fontSize: normalize(12)}}>Difabel</Text>
                            <View style={{borderBottomWidth:1, borderColor:'grey'}}>
                                <TouchableOpacity onPress={()=>this.openModal2('Pilih Difabel')} style={{height:28}}>
                                    <Text style={{bottom:5,left:1, position: 'absolute', color:'grey', fontSize:normalize(12)}}>Tidak Ada</Text>   
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    {/* PEKERJAAN */}
                    <View style={{width:"100%"}}>
                        <View style={{flex:1, justifyContent: 'center', marginBottom:15}}>
                            <TouchableOpacity onPress={()=>this.openModal('Pilih Pekerjaan')} style={{borderBottomWidth:1, borderColor:'grey', height:30}}>
                                <Text style={{bottom:5,left:1, position: 'absolute', color:'grey', fontSize:normalize(12)}}>Pekerjaan</Text>   
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* Pendidikan */}
                    <View style={{width:"100%"}}>
                        <View style={{flex:1, justifyContent: 'center', marginBottom:15}}>
                            <TouchableOpacity onPress={()=>this.openModal2('Pilih Pendidikan')} style={{borderBottomWidth:1, borderColor:'grey', height:30}}>
                                <Text style={{bottom:5,left:1, position: 'absolute', color:'grey', fontSize:normalize(12)}}>Pendidikan</Text>   
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* Suku */}
                    <View style={{width:"100%"}}>
                        <View style={{flex:1, justifyContent: 'center', marginBottom:15}}>
                            <TouchableOpacity onPress={()=>this.openModal('Pilih Suku')} style={{borderBottomWidth:1, borderColor:'grey', height:30}}>
                                <Text style={{bottom:5,left:1, position: 'absolute', color:'grey', fontSize:normalize(14)}}>Suku</Text>   
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* <View style={{width:"100%", alignItems: 'center',marginBottom:30}}>
                        <View style={styles.conteinerPhoto}>
                            <View style={styles.photo}>
                                <Image source={this.state.uri} style={{width:'100%', height: '100%'}} resizeMode="cover"/>
                            </View>
                        </View>
                        <TouchableOpacity 
                            onPress={()=>this.props.navigation.navigate("CameraApp")}
                            style={styles.buttonPhoto} 
                            activeOpacity={0.5}>
                            <Text style={{fontSize:normalize(14)}}>{this.state.titleButtonPhoto}</Text>
                        </TouchableOpacity> 
                        
                    {this.state.action == "Tambah" ? null:
                        <TouchableOpacity style={{height:wp('10%'), width:'55%', backgroundColor:'#d4322e', justifyContent: 'center', alignItems: 'center', borderRadius:5}}>
                            <Text style={{color:'white'}}>Hapus Penduduk</Text>
                        </TouchableOpacity>}
                    </View> */}
                </View>

            </ScrollView>
            <TouchableOpacity style={{width:'100%', height:40, justifyContent: 'center', alignItems: 'center', backgroundColor:'#d5322e'}}>
                <Text style={{fontWeight:'700', fontSize:normalize(16), color:'white'}}>Simpan</Text>
            </TouchableOpacity>
            </KeyboardAvoidingView>
        {/* </View> */}

            
            <Modalize ref={this.modal} onClosed={()=> this.setState({showHeader: true})}
                key={this.state.modal2Key}
                avoidKeyboardLikeIOS={false}
                handleStyle={{display:"none"}}
                onClose={()=> this.setState({hide: !this.state.hide})}
                onOpen={()=> this.setState({hide: !this.state.hide})}>
                    {this.renderContent()}
            </Modalize>  
             
            </View>
            {this.state.show && 
            <RNDateTimePicker
                onBlur={()=>this.setState({show: false})}
                value={this.state.date}
                mode={this.state.mode}
                maximumDate={new Date()}
                is24Hour={true}
                display="calendar"
                onChange={this.onChangeCalendar}
                onClose={()=>this.setState({show: false})}
            />}

            <Modalize ref={this.modal2} handleStyle={{display:"none"}} 
                adjustToContentHeight
                avoidKeyboardLikeIOS
                keyboardAvoidingBehavior="padding"
                keyboardAvoidingOffset={50}
                key={this.state.modal2Key} 
                onClosed={()=> this.setState({showHeader: true, modal2Key: new Date().getTime()} )}>
                    {this.renderContentPendidikan()}
            </Modalize> 
            {this.state.camera?
            <View style={{position:'absolute', height:hp('100%'), width:wp('100%'),}}>
                <CameraApp />
            </View>
            :null}
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
    main:{
        flexDirection: "row",
        justifyContent:'space-between',
        alignItems:'center',
        padding: 10,
        backgroundColor:'white',
        borderBottomWidth:1,
        borderBottomColor:'#eee'
    },
    buttonSave: {
        alignSelf: 'center',
        width: '95%',
        height: 40,
        backgroundColor: 'green',
        elevation: 4,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
    },


    content: {
        height:hp('100%'),
        flex:1,
        width:'100%',
    },
    contentRadio: {
        flex:1,
        width:'100%',
    },
    
    content_row: {
        flexDirection:'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal:20,
        paddingTop:20,
        width:'90%',
        flexWrap:'wrap',
        },

    content_golongan_darah:{
        flexDirection:'column',
        alignItems: 'center',
        paddingHorizontal:20,
        paddingTop:20,
        width:'100%',
        height: 180,
        flexWrap:'wrap',
    },
    conteinerPhoto: {
        width:'50%',
        height:wp('50%'),
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: '#ccc',
        flexDirection:'column',
        borderTopRightRadius:5,
        borderTopLeftRadius:5,
        borderBottomRightRadius:5,
        borderBottomLeftRadius:5
    },
    buttonPhoto:{
        height:wp('10%'),
        width:'55%',
        backgroundColor: '#ff9800',
        justifyContent:'center',
        alignItems: 'center',
        marginBottom:20,
        borderRadius:5, 
    },
    photo: {
        flex:8
    }

})

