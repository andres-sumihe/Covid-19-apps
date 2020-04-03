import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar, StyleSheet, KeyboardAvoidingView, Picker, Switch } from 'react-native';
import { Entypo, Feather, AntDesign, SimpleLineIcons, FontAwesome } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {TextField} from 'react-native-material-textfield';
import { LinearGradient } from 'expo-linear-gradient'
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import { Surface } from 'react-native-paper'
import TambahCard from './TambahCard';
import { Button,SearchBar } from 'react-native-elements';
import {Modalize} from 'react-native-modalize';
import Qrcode from '../../components/Qrcode'
import { normalize } from '../../components/ResponsiveFontSize';
import RNPickerSelect from 'react-native-picker-select'


export default class TambahKK extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchText: '',
      filter: 'Semua',
      action:'',
      baru: "Baru",
      switchA: undefined,
      showHeader: true,
      modalTitle:'',
      rt:'',
      rw:'',
      kodePos:'',
      data: [
        {
          id:"1",
          name:"Dewi Kinasih",
          noKK:"3209302307890007",
        },
        {
          id:"2",
          name:"Dewi Kinasih",
          noKK:"3209302307890007",
        },
        {
          id:"3",
          name:"Dewi Kinasih",
          noKK:"3209302307890007",
        },
        
      ],
      provinsiData: [
        {"label":"Provinsi","value":"Provinsi" },
        {"label":"data","value":"data"},
        {"label":"data","value":"data"}
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
      provinsi: "",
      kabKota: "Kabupaten/ Kota",
      kecamatan: "Kecamatan",
      desa: "Desa/ Kelurahan",
      kodepos: "Kode Pos",
      listViewData: Array(20).fill('').map((_, i) => `item #${i}`),
      qrON: false
    }
  }


  componentDidMount(){
      this.setState({action: this.props.navigation.getParam("action")})
      if(this.props.navigation.getParam("action") == "Edit"){
        this.setState({baru: ""})
      }else{
          this.setState({baru: "Baru"})
      } 
  }


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

  renderQR = () => {
    return(
      // <View style={{height: heightPercentageToDP('100%')}}>
        <View style={{height: wp('100%')}}>
          <Qrcode /> 
        </View>
      // </View>
      )
  }
//   Read THIS!!!!
//   CHANGE HEADER WHEN MODALS OPEN AND THE TITLE IS INHERITANCE FROM THE MODALS TITLE
  modal = React.createRef(); 
  qrcodeModal = React.createRef(); 
  
  openModal = (e) => {
    this.setState({modalTitle:e})
    this.setState({showHeader: false})
    if (this.modal.current) {
      this.modal.current.open();
    }
  };
  
  closeModal = () => {
    this.setState({showHeader: true})
    if (this.modal.current) {
      this.modal.current.close();
    }
  };
  openModalQR = () => {
    if (this.qrcodeModal.current) {
      this.qrcodeModal.current.open();
    }
  };
  
  closeModalQR = () => {
    if (this.qrcodeModal.current) {
      this.qrcodeModal.current.close();
    }
  };
  
  render() {
    let {kodePos, rt, rw} =  this.state;
    return (
      
      <View style={{flex:1,flexDirection:"column", }}>
      <View style={{height: StatusBar.currentHeight, width: '100%', position: "absolute", backgroundColor: '#0288d1'}} />

        <View style={{height:70, width: "100%", flexDirection: 'row', alignItems: 'center', paddingTop: StatusBar.currentHeight }}>
          
          <TouchableOpacity onPress={this.state.showHeader?() => this.props.navigation.goBack(): this.closeModal}>
            <Entypo name={'chevron-left'} color='#0288d1' size={24} style={{ paddingLeft: 10 }} />
          </TouchableOpacity>
          <Text style={{ paddingLeft: 10, fontSize: normalize(15), color: "#0288d1", fontWeight: '500' }}>{this.state.showHeader? this.state.action + ' Kartu Keluarga '+this.state.baru:this.state.modalTitle}</Text>
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
        <KeyboardAvoidingView style={{flex:9}}  
        behavior="padding" 
        keyboardVerticalOffset={70}
        enabled>
          <ScrollView style={{}} contentContainerStyle={{justifyContent: 'center',alignItems: 'center',}}>
            <View style={{width:"90%"}}>
                <View style={{flex:1, justifyContent: 'center', marginBottom:5}}>
                    <TextField
                        // value={username}
                        label='No. Kartu Keluarga'
                        keyboardType='numeric'
                        textColor='grey'
                        fontSize={normalize(14)}
                        baseColor='gray'
                        selectionColor='grey'
                        tintColor='#0288d1'
                        lineWidth={1.1}
                        activeLineWidth={1.1}
                        contentInset={{label: 0, top:4, input:1}}
                        // onChangeText={ (username) => this.setState({ username })} 
                        />
                    <View style={{position:"absolute", alignSelf: 'flex-end',flexDirection:'row', alignItems: 'center',}}>
                        {/* <Text style={{fontSize:normalize(14), color:'grey'}}>KK Sementara</Text>
                        <Switch
                              value={this.state.switchA}
                              color='#0288d1'
                              onValueChange={() => { this.setState({ switchA: !this.state.switchA }); }}
                              /> */}
                    </View>
                </View>
            </View>

            <View style={{width:"90%"}}>
                {/* Provinsi */}
                <View style={{width:"100%"}}>
                    <View style={{flex:1, justifyContent: 'center', marginBottom:15}}>
                        <TouchableOpacity onPress={()=>this.openModal('Pilih Provinsi')} style={{borderBottomWidth:1, borderColor:'grey', height:30}}>
                            <Text style={{bottom:5,left:1, position: 'absolute', color:'grey', fontSize:normalize(14)}}>Provinsi</Text>   
                        </TouchableOpacity>
                    </View>
                </View>
                {/* KABUPATEN KOTA */}
                <View style={{width:"100%"}}>
                    <View style={{flex:1, marginBottom:15}}>
                        <TouchableOpacity onPress={()=>this.openModal('Pilih Kabupaten / Kota')} style={{borderBottomWidth:1, borderColor:'grey', height:30}}>
                            <Text style={{bottom:5,left:1, position: 'absolute', color:'grey', fontSize:normalize(14)}}>Kabupaten / Kota</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* KECAMATAN */}
                <View style={{width:"100%"}}>
                    <View style={{flex:1, justifyContent: 'center', marginBottom:15}}>
                        <TouchableOpacity onPress={()=>this.openModal('Pilih Kecamatan')} style={{borderBottomWidth:1, borderColor:'grey', height:30}}>
                            <Text style={{bottom:5,left:1, position: 'absolute', color:'grey', fontSize:normalize(14)}}>Kecamatan</Text>   
                        </TouchableOpacity>
                    </View>
                </View>
                {/* DESA KELURAHAN */}
                <View style={{width:"100%"}}>
                    <View style={{flex:1, justifyContent: 'center', marginBottom:15}}>
                        <TouchableOpacity onPress={()=>this.openModal('Pilih Desa')} style={{borderBottomWidth:1, borderColor:'grey', height:30}}>
                            <Text style={{bottom:5,left:1, position: 'absolute', color:'grey', fontSize:normalize(14)}}>Desa / Kelurahan</Text>   
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Dusun  */}
                <View style={{width:"100%"}}>
                    <View style={{flex:1, justifyContent: 'center', marginBottom:15}}>
                        <TouchableOpacity onPress={()=>this.openModal('Pilih Dusun/Dukuh/Sebutan Lain')} style={{borderBottomWidth:1, borderColor:'grey', height:30}}>
                            <Text style={{bottom:5,left:1, position: 'absolute', color:'grey', fontSize:normalize(14)}}>Dusun/Dukuh/Sebutan Lain</Text>   
                        </TouchableOpacity>
                    </View>
                </View>
                {/* RT / RW */}
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
                            tintColor='#0288d1'
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
                            tintColor='#0288d1'
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
                            tintColor='#0288d1'
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

                <View style={{flex:1, justifyContent: 'center', marginBottom:5}}>
                    <TextField
                        // value={username}
                        label='Alamat Lengkap'
                        keyboardType='default'
                        textColor='grey'
                        fontSize={normalize(14)}
                        activeLineWidth={1.1}
                        baseColor='gray'
                        selectionColor='grey'
                        tintColor='#0288d1'
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
                        activeLineWidth={1.1}
                        baseColor='gray'
                        selectionColor='grey'
                        tintColor='#0288d1'
                        lineWidth={1.1}
                        contentInset={{label: 0, top:4, input:1}}
                        // onChangeText={ (username) => this.setState({ username })} 
                        />
                        
                </View>
                {/* KODE POS */}
                {/* <View style={{width:"100%"}}>
                    <View style={{flex:1, justifyContent: 'center', marginBottom:15}}>
                        <TouchableOpacity onPress={()=>this.openModal('Pilih Kode Pos')} style={{borderBottomWidth:1, borderColor:'grey', height:30}}>
                            <Text style={{bottom:5,left:1, position: 'absolute', color:'grey', fontSize:normalize(14)}}>Kode Pos</Text>   
                        </TouchableOpacity>
                    </View>
                </View> */}

                <TouchableOpacity onPress={this.openModalQR}
                  style={{height:50, width:'100%', backgroundColor:'#ff9800', justifyContent: 'center', alignItems: 'center', marginBottom:10}}>
                    <Text style={{color:'white'}}>Scan QRCode Kartu Keluarga</Text>
                </TouchableOpacity>

                {this.state.action == "Tambah" ? null:
                <TouchableOpacity onPress={()=> this.props.navigation.navigate("AnggotaKeluarga")} 
                  style={{height:50, width:'100%', backgroundColor:'#d7d7d7' , justifyContent: 'center', alignItems: 'center', marginBottom:20}}>
                    <Text style={{color:'#0288d1'}}>Daftar Anggota Keluarga</Text>
                </TouchableOpacity>}
                {this.state.action == "Tambah" ? null:
                <TouchableOpacity style={{backgroundColor: '#d4322e',width:'40%', alignSelf: 'center',paddingVertical:7, borderRadius:5,justifyContent: 'center',alignItems: 'center', marginBottom:50}}>
                    <Text style={{color:'white'}}>Hapus Kartu Keluarga</Text>
                </TouchableOpacity>}

                
            </View>

          </ScrollView>
          </KeyboardAvoidingView>
        
          <Modalize ref={this.modal} adjustToContentHeight onClosed={()=> this.setState({showHeader: true})}
          handleStyle={{display:"none"}}
          avoidKeyboardLikeIOS={false}
            onClose={()=> this.setState({hide: !this.state.hide})}
            onOpen={()=> this.setState({hide: !this.state.hide})}>
                {this.renderContent()}
          </Modalize>
          
              
              <TouchableOpacity style={{height:50, width:'100%', backgroundColor:'#0288d1', justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{color:'white', fontSize:normalize(16), fontWeight:"700"}}>Simpan</Text>
              </TouchableOpacity>
              {/*  */}
        </View>
              <Modalize ref={this.qrcodeModal}
                handleStyle={{display:"none"}}
                adjustToContentHeight
                // onClose={()=> this.setState({hide: !this.state.hide})}
                // onOpen={()=> this.setState({hide: !this.state.hide})}
                >
                    {this.renderQR()}
              </Modalize>
        </View>
      
    )
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },

  content: {
      height:hp('100%'),
      flex:1,
      width:'100%',
  }
 
});
