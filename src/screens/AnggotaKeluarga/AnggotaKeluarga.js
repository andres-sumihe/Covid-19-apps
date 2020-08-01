import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar, StyleSheet, Image } from 'react-native';
import { Entypo, Feather, AntDesign, SimpleLineIcons, FontAwesome } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient'
import { SearchBar } from 'react-native-elements';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import { Surface } from 'react-native-paper'
import TambahCard from './TambahCard';
import { Modalize } from 'react-native-modalize';
import RadioGroup from 'react-native-radio-buttons-group';
import { normalize } from '../../components/ResponsiveFontSize'



export default class AnggotaKeluarga extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchText: '',
      filter: 'Semua',
      show: true,
      optionsOn:true,
      radioActive:1,
      namaWillDeleted:'',
      noKTPWillDeleted:'',
      posisiWillDeleted:'',
      imageWillDeleted:null,
      confirm: false,
      data: [
        {
          id:"1",
          uri:require('../../../assets/images/photo4.png'),
          name:"Satrio Umar",
          noKK:"3209302307890007",
          keanggotaan: "Suami"
        },
        {
          id:"2",
          uri:require('../../../assets/images/photo5.png'),
          name:"Dewi Kinasi",
          noKK:"3209302307890007",
          keanggotaan: "Istri"
        },
        {
          id:"3",
          uri:require('../../../assets/images/photo6.png'),
          name:"Maemunah",
          noKK:"3209302307890007",
          keanggotaan: "Anak"
        },

      ],
      dataRadio: [
        {
          id:1,
          label: 'Badan terasa demam',
          color: '#d5322e',
          size: 16,
          ya: false,
          tidak: true,
        },
        {
          id:2,
          label: 'Sedang batuk / pilek',
          color: '#d5322e',
          size: 16,
          ya: false,
          tidak: true,
        },
        {
            id:3,
            label: 'Kesulitan bernafas atau sesak nafas',
            color: '#d5322e',
            size: 16,
            ya: false,
            tidak: true,
        },
        {
            id:4,
            label: 'Sedang mengalami nyeri tenggorokan',
            color: '#d5322e',
            size: 16,
            ya: false,
            tidak: true,
        },
        {
          id:5,
            label: 'Badan terasa sakit atau nyeri',
            color: '#d5322e',
            size: 16,
            ya: false,
            tidak: true,
        },
        
    // ],
    //   dataRadio2: [
        {
          id:6,
          label: 'Menggunakan Transportasi Umum',
          color: '#d5322e',
          size: 16,
          ya: false,
          tidak: true,
        },
        {
          id:7,
          label: 'Menjaga jarak dengan orang lain minimal 1 meter',
          color: '#d5322e',
          size: 16,
          ya: false,
          tidak: true,
        },
        {
          id:8,
            label: 'Keluar rumah menggunakan masker',
            color: '#d5322e',
            size: 16,
            ya: false,
            tidak: true,
        },
        {
          id:9,
            label: 'Berjabat tangan dengan orang lain',
            color: '#d5322e',
            size: 16,
            ya: false,
            tidak: true,
        },
        {
          id:10,
            label: 'Cuci tangan pakai sabun',
            color: '#d5322e',
            size: 16,
            ya: false,
            tidak: true,
        },
        {
          id:11,
            label: 'Pernah pergi atau tinggal di luar negeri',
            color: '#d5322e',
            size: 16,
            ya: false,
            tidak: true,
        },
        {
          id:12,
            label: 'Pernah pergi atau tinggal di daerah terinfeksi',
            color: '#d5322e',
            size: 16,
            ya: false,
            tidak: true,
        },
    ],
      listViewData: Array(20).fill('').map((_, i) => `item #${i}`),
    }
    this.rows = [];
    this.selectedRow;
  }

  
  modal = React.createRef();
  renderContent = () => {
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
            <Text style={{color: "white"}}>Hubungan Anggota Keluarga</Text>
        </View>
        <View style={{height:20}}></View>
        <View style={styles.content_row}>
          
        </View>

        
        <View style={{justifyContent: 'center',alignItems: 'center',height:80}}>
        <TouchableOpacity 
            onPress={this.closeModal}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical:7,
              borderRadius:5, 
              paddingHorizontal:20, 
              backgroundColor:'grey', 
              width:'40%'}}>
            <Text style={{color: 'white', fontSize: normalize(14)}}>Tambahkan</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  openModal = () => {

    if (this.modal.current) {
      this.selectedRow.closeRow();
      this.modal.current.open();
    }
  };

  closeModal = () => {
    this.setState({confirm:true})
    if (this.modal.current) {
      this.modal.current.close();
    }
  };

  onPress = data => this.setState({ dataRadio: data });
  onPress2 = data2 => this.setState({ dataRadio2: data2 });
  handleHapusButton = (name, noKK, keanggotaan, uri)=>{
    this.setState({
      namaWillDeleted: name,
      noKTPWillDeleted: noKK,
      posisiWillDeleted: keanggotaan,
      imageWillDeleted: uri,
      confirm:true
    });
    this.selectedRow.closeRow();
  }

  handleTambahAnggota = () => {
    if(this.selectedRow != null){this.selectedRow.closeRow();}
    this.props.navigation.navigate("TambahAnggotaKeluarga")
  }
  onChange = (e, value) => { 
    const {dataRadio} = this.state;
    dataRadio[value].ya = !dataRadio[value].ya 
    this.setState({dataRadio})
    console.log([value].id + " / "+ dataRadio[value].ya)
  }
  render() {
    let selectedButton = this.state.dataRadio.find(e => e.selected == true);
    selectedButton = selectedButton ? selectedButton.value : this.state.dataRadio[0].label;
    const Confirm = () => {
      return(
        <View style={styles.popupContainer}>
          <View style={styles.infoContainer}>
            <View style={styles.fotoContainer}>
                <View style={{overflow:'hidden',width:140, height:140, borderColor:'#d5322e', borderWidth:3, borderRadius:100, padding:2, alignItems: "center", justifyContent:"center"}}>
                    {/* <View style={{width:'100%', height:'100%', borderRadius:100, overflow: "hidden", justifyContent:'center', alignItems: 'center',}}> */}
                        <Image source={this.state.imageWillDeleted} style={{width:138, height:138}} resizeMode="cover" styl/>
                    {/* </View> */}
                </View>
            </View>
            <View style={styles.profileContainer}>
              <Text style={{fontWeight:'700', fontSize: normalize(20)}}>{this.state.namaWillDeleted}</Text>
              <Text style={{fontSize: normalize(15)}}>{this.state.noKTPWillDeleted}</Text>
              <Text style={{fontSize: normalize(15)}}>{this.state.posisiWillDeleted}</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.batalButton} onPress={()=> this.setState({confirm: false})}>
                    <Text >Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.hapusButton}>
                    <Text style={{color:'white'}}>Hapus</Text>
              </TouchableOpacity>
          </View>
        </View>
      )}
    return (
      <View style={{ flex: 1, flexDirection:"column", paddingTop: StatusBar.currentHeight }}>
 
        <View style={{height: StatusBar.currentHeight, width: '100%', position: "absolute", backgroundColor: '#d5322e'}} />
        <View style={{height: 50, width: "100%", flexDirection: 'row', alignItems: 'center', }}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Entypo name='chevron-left' color='#d5322e' size={24} style={{ paddingLeft: 10 }} />
          </TouchableOpacity>
          <Text style={{ paddingLeft: 10, fontSize: normalize(15), color: "#d5322e", fontWeight: '500' }}>{'Deteksi Dini Covid-19'}</Text>
          
        </View>
        <View style={{ height: hp('1%') }}>
          <LinearGradient
            colors={['rgba(0,0,0,0.1)', 'transparent']}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              height: hp('1%'),
            }} />
        </View>
        <ScrollView scrollEnabled style={{width:'100%', height:'100%'}} contentContainerStyle={{alignItems: 'center'}}>
          <View style={{paddingHorizontal:20,paddingVertical:10, backgroundColor:'grey', width:'100%' }}>
            <Text style={{color: 'white'}}>Gejala Yang Dirasakan</Text>
          </View>
        {this.state.dataRadio.map((item,index)=>{
            if(item.id <= 5){
            return (
              <View key={item.id} style={{flexDirection:'row',borderBottomWidth:1, borderBottomColor: '#ccc', marginVertical:5,paddingVertical:5, width: wp('100%')-40,justifyContent:'space-between', alignItems: 'center',}} onPress={()=> this.setState({radioActive: item.id})}>
                <View style={{width:'70%'}}>
                  <Text style={{fontSize:normalize(12)}}>{item.label}</Text>
                </View>
                <View style={{justifyContent: 'center', flexDirection:'row', alignItems:'center'}}>
                  <TouchableOpacity onPress={()=> this.setState(prevState => ({
                                    dataRadio: prevState.dataRadio.map(
                                      obj => (obj).id === item.id ? Object.assign(obj, {ya: true, tidak: false}) :obj)
                                  }))}
                      style={{borderWidth:1,borderColor: item.ya ? '#d5322e':'black', borderRadius:16, width:16, height:16, marginRight:5, justifyContent: 'center',alignItems: 'center',}}>
                    {item.ya ? <View style={{backgroundColor:'#d5322e', width: 10, height: 10, borderRadius: 10}}/> :null}
                  </TouchableOpacity>
                  <Text style={{fontSize:normalize(12)}}>Ya</Text>
                </View>
                <View style={{justifyContent: 'center', flexDirection:'row', alignItems:'center'}}>
                  <TouchableOpacity onPress={()=> this.setState(prevState => ({
                                    dataRadio: prevState.dataRadio.map(
                                      obj => (obj).id === item.id ? Object.assign(obj, {ya: false, tidak: true}) :obj)
                                  }))}
                      style={{borderWidth:1,borderColor: item.tidak ? '#d5322e':'black', borderRadius:16, width:16, height:16, marginRight:5, justifyContent: 'center',alignItems: 'center',}}>
                    {item.tidak ? <View style={{backgroundColor:'#d5322e', width: 10, height: 10, borderRadius: 10}}/> :null}
                  </TouchableOpacity>
                  <Text style={{fontSize:normalize(12)}}>Tidak</Text>
                </View>
              </View>
            )} 
          })}
          <View style={{paddingHorizontal:20,paddingVertical:10, backgroundColor:'grey', width:'100%' }}>
            <Text style={{color: 'white'}}>Riwayat Mobilitas</Text>
          </View>
          {this.state.dataRadio.map((item,index)=>{
              if(item.id > 5){
              return (
                <View key={item.id} style={{flexDirection:'row',borderBottomWidth:1, borderBottomColor: '#ccc', marginVertical:5,paddingVertical:5, width: wp('100%')-40,justifyContent:'space-between', alignItems: 'center',}} onPress={()=> this.setState({radioActive: item.id})}>
                  <View style={{width:'70%'}}>
                    <Text style={{fontSize:normalize(12)}}>{item.label}</Text>
                  </View>
                  <View style={{justifyContent: 'center', flexDirection:'row', alignItems:'center'}}>
                    <TouchableOpacity onPress={()=> this.setState(prevState => ({
                                      dataRadio: prevState.dataRadio.map(
                                        obj => (obj).id === item.id ? Object.assign(obj, {ya: true, tidak: false}) :obj)
                                    }))}
                        style={{borderWidth:1,borderColor: item.ya ? '#d5322e':'black', borderRadius:16, width:16, height:16, marginRight:5, justifyContent: 'center',alignItems: 'center',}}>
                      {item.ya ? <View style={{backgroundColor:'#d5322e', width: 10, height: 10, borderRadius: 10}}/> :null}
                    </TouchableOpacity>
                    <Text style={{fontSize:normalize(12)}}>Ya</Text>
                  </View>
                  <View style={{justifyContent: 'center', flexDirection:'row', alignItems:'center'}}>
                    <TouchableOpacity onPress={()=> this.setState(prevState => ({
                                      dataRadio: prevState.dataRadio.map(
                                        obj => (obj).id === item.id ? Object.assign(obj, {ya: false, tidak: true}) :obj)
                                    }))}
                        style={{borderWidth:1,borderColor: item.tidak ? '#d5322e':'black', borderRadius:16, width:16, height:16, marginRight:5, justifyContent: 'center',alignItems: 'center',}}>
                      {item.tidak ? <View style={{backgroundColor:'#d5322e', width: 10, height: 10, borderRadius: 10}}/> :null}
                    </TouchableOpacity>
                    <Text style={{fontSize:normalize(12)}}>Tidak</Text>
                  </View>
                </View>
              )} 
              })}
        </ScrollView>

          <View style={{position: 'absolute',bottom:0, width:"100%",height:40, justifyContent:'center', alignItems: 'center',position: 'absolute',bottom:0, backgroundColor:'#d5322e'}}>
            <TouchableOpacity >
                <Text style={{fontSize: normalize(13), fontWeight: "700", color:'white' }}>Simpan</Text>
            </TouchableOpacity>
          </View>
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
    backgroundColor: '#d4322e',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',

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
    height:250,

  },
  content_row: {
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal:20,
    paddingTop:20,
    width:'90%',
    flexWrap:'wrap',
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
    height:hp('40%'),
    flexDirection:'column',
    backgroundColor: 'white',
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
    backgroundColor:'#d4322e',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
