import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar, StyleSheet, Alert, KeyboardAvoidingView } from 'react-native';
import { Entypo, Feather, AntDesign, SimpleLineIcons, FontAwesome } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient'
import {TextField} from 'react-native-material-textfield';
import { SearchBar } from 'react-native-elements';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import { Surface, Button } from 'react-native-paper'
import TambahCard from './TambahCard';
import { Modalize } from 'react-native-modalize';
import RadioGroup from 'react-native-radio-buttons-group';
import { normalize } from '../../components/ResponsiveFontSize';
import RNDateTimePicker from '@react-native-community/datetimepicker';


export default class TambahAnggotaKeluarga extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // STATE ON MODAL 2 OPEN
      nameOnEdit:'',
      kkOnEdit:'',
      searchText: '',
      filter: 'Semua',
      show: true,
      radioActive:1,
      namaWillDeleted:'',
      noKTPWillDeleted:'',
      posisiWillDeleted:'',
      imageWillDeleted:null,
      selectedPosition:'Kepala Keluarga',
      positif: true,
      conirm:false,
      showButton:false,
      title:'',
      mode:'',
      monitoringType:'',
      data: [
        {
          id:"1",
          uri:require('../../../assets/images/ic2.png'),
          name:"Satrio Umar",
          noKK:"3209302307890007",
          keanggotaan: "Suami"
        },
        {
          id:"2",
          uri:require('../../../assets/images/ic1.png'),
          name:"Dewi Kinasi",
          noKK:"3209302307890007",
          keanggotaan: "Istri"
        },
        {
          id:"3",
          uri:require('../../../assets/images/ic3.png'),
          name:"Maemunah",
          noKK:"3209302307890007",
          keanggotaan: "Anak"
        },
        
      ],
      dataRadio: [
        {
          id:1,
          label: 'Antar Desa Dalam Kecamatan',
          color: '#d5322e',
          size: 16,
        },
        {
          id:2,
          label: 'Antar Kecamatan Dalam Kabupaten / Kota',
          color: '#d5322e',
          size: 16,
        },
        {
            id:3,
            label: 'Antar Kabupaten / Kota Dalam Provinsi',
            color: '#d5322e',
            size: 16,
        },
        {
            id:4,
            label: 'Antar Provinsi',
            color: '#d5322e',
            size: 16,
        },
    ],
      dataRadio2: [
        {
          id:1,
          label: 'Dari Desa Dalam Kecamatan',
          color: '#d5322e',
          size: 16,
        },
        {
          id:2,
          label: 'Dari Kecamatan Dalam Kabupaten / Kota',
          color: '#d5322e',
          size: 16,
        },
        {
            id:3,
            label: 'Dari Kabupaten / Kota Dalam Provinsi',
            color: '#d5322e',
            size: 16,
        },
        {
            id:4,
            label: 'Dari Provinsi',
            color: '#d5322e',
            size: 16,
        },
      ],
        showCalendar:false,
        date: new Date(),
        mode: 'date',
        tanggalLahir: ['Pilih Tanggal'],
      listViewData: Array(20).fill('').map((_, i) => `item #${i}`),
    }
    this.rows = [];
    this.selectedRow;
  }

  componentDidMount(){
    this.setState({title: this.props.navigation.getParam("title"),mode: this.props.navigation.getParam("privilages")})
    if(this.props.navigation.getParam("title") == "Daftar Warga"){
      this.setState({showButton: true})
    }else{
        this.setState({baru: false})
    } 
  }
  modal = React.createRef();
  modal2 = React.createRef();
  renderQR = () => {
    return(
      <View style={[styles.content, {height:hp('25%')}]}>
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
          <Text style={{color: "white"}}>Pilih Jenis Monitoring Warga</Text>
      </View>
      <View style={{height:50}}></View>
      <View style={{width:'100%', justifyContent:'center', alignItems: 'center',}}>
        <View style={{width:wp('80%'), justifyContent:'space-between', flexDirection:'row'}}>
        <TouchableOpacity 
            onPress={()=> this.openModal("Keluar Desa")}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical:7,
              borderRadius:5, 
              // paddingHorizontal:20, 
              backgroundColor:'#4caf50', 
              width:wp('18%'),
              height:wp('18%')}}>
            <Text style={{color: 'white',fontSize: normalize(13)}}>Keluar</Text>
            <Text style={{color: 'white',fontSize: normalize(13)}}>Desa</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={()=> this.openModal("Masuk Desa")}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical:7,
              borderRadius:5, 
              // paddingHorizontal:20, 
              backgroundColor:'#0288d1', 
              width:wp('18%'),
              height:wp('18%')}}>
            <Text style={{color: 'white',fontSize: normalize(13)}}>Masuk</Text>
            <Text style={{color: 'white',fontSize: normalize(13)}}>Desa</Text>
          </TouchableOpacity>
          <TouchableOpacity 
              onPress={this.handlePositifButton}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical:7,
                borderRadius:5, 
                backgroundColor:'#ff9800', 
                width:wp('18%'),
                height:wp('18%')}}>
              <Text style={{color: 'white', fontSize: normalize(14)}}>PDP</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={this.handlePositifButton}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical:7,
                borderRadius:5, 
                backgroundColor:'#d5322e', 
                width:wp('18%'),
                height:wp('18%')}}>
              <Text style={{color: 'white', fontSize: normalize(14)}}>Positif</Text>
            </TouchableOpacity>
        </View>
            
            
      </View>
    </View>
      )
  }
  renderContentMobilitas = () => {
    return (
      <View style={styles.content}>
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
            <Text style={{color: "white"}}>Pilih Jenis Mobilitas Warga</Text>
        </View>
        <View style={{height:20}}></View>
        <View style={styles.content_row}>
        { this.state.monitoringType  == "Keluar Desa"?
          this.state.dataRadio.map((item,index)=>{
            return (
              <TouchableOpacity key={item.id} style={{flexDirection:'row', margin:5, width:'100%'}} 
                  onPress={()=> this.setState({
                    radioActive: item.id,
                    selectedPosition: item.label,
                    })}>
                <View style={{borderWidth:1,borderColor: this.state.radioActive== item.id ? '#d5322e':'black', borderRadius:18, width:18, height:18, marginRight:10, justifyContent: 'center',alignItems: 'center',}}>
                  {this.state.radioActive== item.id ? <View style={{backgroundColor:'#d5322e', width: 12, height: 12, borderRadius: 12}}/> :null}
                </View>

                <View>
                  <Text>{item.label}</Text>
                </View>
              </TouchableOpacity>
            )
          })
        :
        this.state.dataRadio2.map((item,index)=>{
            return (
              <TouchableOpacity key={item.id} style={{flexDirection:'row', margin:5, width:'100%'}} 
                  onPress={()=> this.setState({
                    radioActive: item.id,
                    selectedPosition: item.label,
                    })}>
                <View style={{borderWidth:1,borderColor: this.state.radioActive== item.id ? '#d5322e':'black', borderRadius:18, width:18, height:18, marginRight:10, justifyContent: 'center',alignItems: 'center',}}>
                  {this.state.radioActive== item.id ? <View style={{backgroundColor:'#d5322e', width: 12, height: 12, borderRadius: 12}}/> :null}
                </View>

                <View>
                  <Text>{item.label}</Text>
                </View>
              </TouchableOpacity>
            )
          })

          }

        </View>
        <View style={{width:'85%', alignSelf:"center"}}>
            <TextField
              // value={rt}
              label='Tuliskan Keperluan Mobilitasnya'
              keyboardType='default'
              textColor='grey'
              fontSize={normalize(14)}
              baseColor='gray'
              selectionColor='grey'
              tintColor='#d5322e'
              lineWidth={1}
              activeLineWidth={1}
              containerStyle={{width:'100%',backgroundColor:'transparent'}}
              contentInset={{label: 0, top:4, input:1}}
              // onChangeText={ (username) => this.setState({ username })} 
              />
        </View>
        {this.state.monitoringType  == "Keluar Desa"?
            <View style={{width:'85%', alignSelf:"center"}}>
              <Text style={{position: 'absolute',top:-5, color:'grey',fontSize: normalize(12)}}>Rencana Kembali</Text>
              <TouchableOpacity onPress={()=>this.setState({showCalendar: true})} style={{borderBottomWidth:1, borderColor:'grey', height:30}}>
                  <Text style={{bottom:5,left:1, position: 'absolute', color:'grey', fontSize:normalize(14)}}>{this.state.tanggalLahir}</Text>   
              </TouchableOpacity>      
            </View>
        :null}

        <View style={{justifyContent: 'center',alignItems: 'center',height:80}}>
          <TouchableOpacity 
            onPress={this.handleInOutButton}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical:7,
              borderRadius:5, 
              marginTop:this.state.monitoringType  == "Keluar Desa"? -15:0,
              paddingHorizontal:20, 
              backgroundColor:'grey', 
              width:'40%'}}>
            <Text style={{color: 'white', fontSize: normalize(14)}}>Tetapkan</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };


  openModal = (e) => {
    this.setState({monitoringType: e})
    if (this.modal.current) {
      if(this.selectedRow != null){this.selectedRow.closeRow();}
      this.modal.current.open();
    }
  };
  handlePositifButton = () => {
    this.setState({confirm: true})
  }
  handleInOutButton = () => {
    this.props.navigation.navigate("AnggotaKeluarga")
  }
  closeModal = (e) => {
    if (this.modal.current) {
      this.modal.current.close();
    }
  };
  openModal2 = (name, noKK) => {
    this.setState({nameOnEdit: name, kkOnEdit: noKK})
    // this.setState({showHeader: false})
    if (this.modal2.current) {
      this.modal2.current.open();
    }
  };
  
  closeModal2 = () => {
    this.setState({showHeader: true})
    this.setState({show: !this.state.show})
    console.log(this.state.modalTitle)
    if (this.modal2.current) {
      this.modal2.current.close();
    }
  };
  
  onPress = data => this.setState({ dataRadio: data });
  onPress2 = data2 => this.setState({ dataRadio2: data2 });

  handleTambahPenduduk = ()=>{
    if(this.selectedRow != null){this.selectedRow.closeRow();}
    this.props.navigation.navigate("TambahPenduduk", {action:"Tambah"})
  }

  onChangeCalendar = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.date
    const formatted = `${currentDate.getDate()} / ${currentDate.getMonth()+1} / ${currentDate.getFullYear()}`
    this.setState({tanggalLahir: formatted, showCalendar: false})
  }
  render() {
    let selectedButton = this.state.dataRadio.find(e => e.selected == true);
    selectedButton = selectedButton ? selectedButton.value : this.state.dataRadio[0].label;
    const Confirm = () => {
      return(
        <KeyboardAvoidingView enabled behavior="padding" style={styles.popupContainer}>
          <View style={styles.infoContainer}>
              <Text style={{fontSize: normalize(16), marginTop:10}}>{this.state.kkOnEdit}</Text>
              <Text style={{fontWeight:'700', fontSize: normalize(20), marginBottom:10}}>{this.state.nameOnEdit}</Text>

              <TextField
              // value={rt}
              label='Nama Pelapor'
              keyboardType='default'
              textColor='grey'
              fontSize={normalize(14)}
              baseColor='gray'
              selectionColor='grey'
              tintColor='#d5322e'
              lineWidth={1}
              activeLineWidth={1}
              containerStyle={{width:'100%',backgroundColor:'transparent'}}
              contentInset={{label: 0, top:4, input:1}}
              // onChangeText={ (username) => this.setState({ username })} 
              />

              <View style={{flex:1, marginBottom:20, width:'100%'}}>
                  <TouchableOpacity onPress={()=>this.setState({showCalendar: true})} style={{borderBottomWidth:1, borderColor:'grey', height:30}}>
                      <Text style={{bottom:5,left:1, position: 'absolute', color:'grey', fontSize:normalize(14)}}>{this.state.tanggalLahir}</Text>   
                  </TouchableOpacity>
              </View>
              {/* <Text style={{fontSize: normalize(15)}}>{this.state.selectedPosition}</Text> */}
          </View>
          <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.batalButton} onPress={()=> this.setState({confirm: false})}>
                    <Text >Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.hapusButton}>
                    <Text style={{color:'white'}}>Tetapkan</Text>
              </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      )}
    return (
      <View style={{ flex: 1, flexDirection:"column", paddingTop: StatusBar.currentHeight }}>
        <View style={{height: StatusBar.currentHeight, width: '100%', position: "absolute", backgroundColor: '#d5322e'}} />
        <View style={{height: 50, width: "100%", flexDirection: 'row', alignItems: 'center', borderBottomWidth:1, borderBottomColor: '#ccc'}}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Entypo name='chevron-left' color='#d5322e' size={24} style={{ paddingLeft: 10 }} />
          </TouchableOpacity>
          <Text style={{ paddingLeft: 10, fontSize: normalize(15), color: "#d5322e", fontWeight: '500' }}>{this.state.title}</Text>
        </View>
       
        <View style={{flex:9}}>
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
          <ScrollView style={{marginBottom:80}}>
            {this.state.data.map((item, index) => {
              return this.state.mode === 'admin' && this.state.title== 'Daftar Warga' ?<SwipeRow 
                  ref={(c) => { this.rows[item.id] = c }}
                  onRowPress={()=>this.openModal2(item.name, item.noKK)}
                  onRowDidOpen={()=> this.setState({activeRow: item.id})}
                  onRowOpen={() => {
                    if (this.selectedRow && this.selectedRow !== this.rows[item.id]) { this.selectedRow.closeRow(); }
                    this.selectedRow = this.rows[item.id]
                  }}
                  rightOpenValue={-100} style={styles.standalone} key={item.id} >

                <View style={styles.standaloneRowBack}>
                  <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', width:50, height:'100%', backgroundColor:'#ff9800'}}
                      onPress={()=> this.props.navigation.navigate("TambahPenduduk", {action:'Edit', uri: JSON.stringify(item.uri)})}>
                        <FontAwesome name='pencil' size={24} color='white' />
                  </TouchableOpacity>
                  <TouchableOpacity
                    // onPress={{}}
                    style={{ alignItems: 'center', justifyContent: 'center',width:50, height:'100%', }}>
                    <FontAwesome name='trash-o' size={24} color='white' />
                  </TouchableOpacity>
                </View>
                    <TambahCard uri={item.uri}  name={item.name} noKK={item.noKK} />
              </SwipeRow>
              :
              <SwipeRow 
                  ref={(c) => { this.rows[item.id] = c }}
                  onRowDidOpen={()=> this.setState({activeRow: item.id})}
                  onRowOpen={() => {
                    if (this.selectedRow && this.selectedRow !== this.rows[item.id]) { this.selectedRow.closeRow(); }
                    this.selectedRow = this.rows[item.id]
                  }}
                  rightOpenValue={-50} style={styles.standalone} key={item.id} >
                <View style={styles.standaloneRowBack}>
                  <TouchableOpacity
                    // onPress={{}}
                    style={{ alignItems: 'center', justifyContent: 'center',width:50, height:'100%', }}>
                    <FontAwesome name='trash-o' size={24} color='white' />
                  </TouchableOpacity>
                </View>
                    <TambahCard uri={item.uri}  name={item.name} noKK={item.noKK} />
              </SwipeRow>
            })
            }

          </ScrollView>
          {this.state.showButton?<View style={{ bottom:10, right:10,position: 'absolute', flexDirection:"row", alignItems: 'center',}}>
            <Surface style={{right:-10,height:30, width:100, paddingRight:10, paddingLeft:10, justifyContent: 'center', alignItems: 'center', backgroundColor:'orange', borderTopStartRadius:10, borderBottomStartRadius:10}}>
              <Text style={{fontSize:10, color:'white'}}>Tambah KTP Baru</Text>
            </Surface>
            <Surface style={{ elevation:0,width:60,height:60, justifyContent:'center', alignItems: 'center', borderRadius:30,backgroundColor:'#0288d1'}}>
              <TouchableOpacity onPress={this.handleTambahPenduduk}>
                  <FontAwesome name="plus" size={30} color="white"/>
              </TouchableOpacity>
            </Surface>
          </View>:null}
        </View>

          {this.state.confirm ? <Confirm />:null}

          <Modalize ref={this.modal2} handleStyle={{display:"none"}} 
                adjustToContentHeight
                // avoidKeyboardLikeIOS
                // keyboardAvoidingBehavior="padding"
                // keyboardAvoidingOffset={50}
                key={this.state.modal2Key} 
                onClosed={()=> this.setState({showHeader: true, modal2Key: new Date().getTime()} )}>
                    {this.renderQR()}
            </Modalize> 
            <Modalize ref={this.modal} adjustToContentHeight 
                avoidKeyboardLikeIOS
                keyboardAvoidingBehavior="padding"
                keyboardAvoidingOffset={20}
                handleStyle={{display:"none"}}
                onClose={()=> this.setState({show: !this.state.show})}
                onOpen={this.closeModal2}>

                  {this.renderContentMobilitas()}

            </Modalize>

          {this.state.showCalendar && 
            <RNDateTimePicker
                onBlur={()=>this.setState({showCalendar: false})}
                value={this.state.date}
                mode={this.state.mode}
                minimumDate={new Date()}
                is24Hour={true}
                display="calendar"
                onChange={this.onChangeCalendar}
                onClose={()=>this.setState({showCalendar: false})}
            />}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  standaloneRowFront: {
    alignItems: 'center',
    backgroundColor: '#493f3f',
    justifyContent: 'center',
    height:50
  },
  standaloneRowBack: {
    alignItems: 'center',
    backgroundColor: '#d5322e',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    // paddingRight:15
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#ddd',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: '#d5322e',
    right: 0,
  },
  controls: {
    alignItems: 'center',
    marginBottom: 30,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5,
  },
  switch: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    paddingVertical: 10,
    width: 100,
  },
  content: {
    flex:1,
    height: normalize(250),

  },
  content_row: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal:20,
    paddingTop:20,
    width:wp('80%'),
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
  },

  infoContainer: {
    width:wp('65%'),
    height:hp('30%'),
    flexDirection:'column',
    backgroundColor: 'white',
    alignItems:'center',
    padding:10,
    borderTopLeftRadius:5,
    borderTopRightRadius: 5,

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
    backgroundColor:'#4caf50',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
