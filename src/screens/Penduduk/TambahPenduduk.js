import React, { Component,useState } from 'react';
import {Platform,View, Text, StyleSheet, Image, TouchableOpacity, StatusBar, ScrollView, Picker, Keyboard, KeyboardAvoidingView, DatePickerAndroid, BackHandler, Alert} from 'react-native';
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
import { getRegionals, getRegional } from '../../api/regionals';
import { getJobs, getJob } from '../../api/jobs';
import { getCountries } from '../../api/countries';
import { getEthnics, getEthnic } from '../../api/ethnics';
import { getZones, getZone } from '../../api/zones';
import { storePeoples, updatePeople, deletePeople } from '../../api/peoples';



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
        modal2Title:'',
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
          sesuaiKKConfirm: "Tidak",
          jenisKependudukan: "Penduduk Asli/Tetap",
          difabel:"Tidak Ada",
          tempatTinggalCOnfirm: "Ya",
          provinsi: "",
          kabKota: "Kabupaten/ Kota",
          kecamatan: "Kecamatan",
          desa: "Desa/ Kelurahan",
          kodepos: "Kode Pos",
          agama: "Islam",
          blood: "Tidak Tahu",
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
          camera: false,
          regionals: {
              provinceID: null,
              districtID: null,
              subdistrictID: null,
              villageID: null,
              zoneID: null,
              province: '',
              district: '',
              subdistrict: '',
              villageID: '',
              zoneID: '',
              data: []
          },
          jobs: {
              jobID: null,
              name: '',
              data: []
          },
          countries: {
              countryID: null,
              name: '',
              data: []
          },
          ethnics: {
              ethnicID: null,
              name: '',
              data: []
          },
          familyID: null,
          name: null,
          residence: {
              provinceID: null,
              districtID: null,
              subdistrictID: null,
              villageID: null,
              zoneID: null,
              dusunID: null,
              rwID: null,
              rtID: null,
              dusun: '',
              rw: '',
              rt: '',
              province: '',
              district: '',
              subdistrict: '',
              villageID: '',
              zoneID: '',
              data: []
          },
          religion: 'Islam',
          education: 'Tidak/Belum Sekolah/TK/Paud',
          familyID: '',
          name: '',
          NIK: '',
          KK: '',
          type: 'Penduduk Asli/Tetap',
          disability: 'Tidak ada',
          marital: "Belum Kawin",
            officeID: '7f15509afee8f299216aa0e8cf9b5865',
            query: '',
            loading: false,
            loadingPeople: false,
          peopleID: ''
        };

  }
  
  componentDidUpdate(){
    //   this.handleSimpan()
  }

  assignPeople = () => {
      this.setState({loadingPeople: true})
      const {people} = this.props.navigation.state.params
      let {residence, regionals, jobs, ethnics, countries, familyID, name, religion, education, NIK, KK,type, disability, marital, peopleID, tanggalLahir, jenisKelamin, blood} = this.state
      residence.provinceID = people.provinceID
      residence.districtID = people.districtID
      residence.subdistrictID = people.subdistrictID
      residence.villageID = people.villageID
      residence.zoneID = people.zoneID
    
      regionals.districtID = people.birthlocationID
      jobs.jobID = people.jobID
      ethnics.ethnicID = people.ethnicID
      console.log(ethnics, people.ethnicID)
      countries.countryID = people.countryID
      familyID = people.familyID
      name = people.name
      religion = people.religion
      education = people.education
      NIK = people.NIK
      KK = people.KK
      type = people.type
      disability = people.disability==null?'Tidak Ada':people.disability
      marital = people.marital
      peopleID = people.peopleID
      tanggalLahir = people.birthdate
      jenisKelamin = people.gender=='L'?'Laki-laki':'Perempuan'
      blood = people.blood?people.blood:'Tidak Tahu'
      KK = people.KK
      console.log(people)
      console.log('assign',people.name,blood,disability,people.NIK)
      console.log(people.NIK)
      this.nameref.setValue(name)
      this.nikref.setValue(NIK)
      this.kkref.setValue(KK)
      this.setState({ 
          residence, 
          regionals, 
          jobs, 
          ethnics, 
          countries, 
          familyID, 
          name, 
          religion, 
          education, 
          NIK, 
          type, 
          disability, 
          marital, 
          peopleID, 
          tanggalLahir, 
          jenisKelamin,
          blood,
          KK
        }, ()=>this.getKelahiran(people.birthlocationID))
  }

  getKelahiran = async (birthloc) => {
    const {regionals} = this.state
    const district = await getRegional(birthloc)
    const province = await getRegional(district.parentID)
    regionals.district=district.name
    regionals.province=province.name
    regionals.districtID=district.regionalID
    regionals.provinceID=province.regionalID
    this.setState({regionals})
    console.log(district)
    this.getInfo()
  }

  getInfo = async () => {
      const {residence, jobs, ethnics} = this.state
      const province = await getRegional(residence.provinceID)
      const district = await getRegional(residence.districtID)
      const subdistrict = await getRegional(residence.subdistrictID)
      const village = await getRegional(residence.villageID)
      residence.province = province.name
      residence.district = district.name
      residence.subdistrict = subdistrict.name
      residence.village = village.name
      
      this.setState({ residence, jobs, ethnics })
      console.log('rt',residence.zoneID)
    //   const rt = await getZone(residence.zoneID)
    //   const rw = await getZone(rt.parentID)
    //   const dusun = await getZone(rw.parentID)
    //   residence.dusun = dusun.name
      residence.provinceID = province.regionalID
      residence.districtID = district.regionalID
      residence.subdistrictID = subdistrict.regionalID
    //   residence.rw = rw.name
    //   residence.rt = rt.name
      residence.villageID = village.regionalID
    //   residence.dusunID = dusun.zoneID
    //   residence.rwID = rw.zoneID
    //   residence.rtID = rt.zoneID
      try{
          const job = await getJob(jobs.jobID)
          jobs.name=job.name
      }catch(err){

      }
      try{
          const ethnic = await getEthnic(ethnics.ethnicID)
          ethnics.name = ethnic.name
      }catch(err){

      }
      this.setState({residence, jobs, ethnics})
      this.setState({ peopleLoading: false })
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
            this.assignPeople()
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

    fetchRegional = async (parentID, r, title) => {
        this.setState({loading: true})
        const {residence, regionals} = this.state
        if(r) parentID = residence.provinceID
        if(title=='Provinsi'){
            parentID = null
        }
        const res = await getRegionals(parentID, this.state.query)
        if(r){
            residence.data = res.data.rows
            this.setState({residence})
        }else{
            regionals.data = res.data.rows
            this.setState({regionals})
        }
        console.log(res.meta)
        this.setState({loading: false})
    }

    fetchJobs = async () => {
        const { jobs } = this.state
        const res = await getJobs()
        jobs.data = res.data.rows
        this.setState({jobs})
    }

    fetchCountries = async () => {
        const {countries} = this.state
        const res = await getCountries()
        countries.data = res.data.rows
        console.log(res.meta.message)
        this.setState(countries)
    }

    fetchEthnics = async () => {
        const {ethnics} = this.state
        const res = await getEthnics()
        ethnics.data = res.data.rows
        this.setState({ethnics})
    }

    fetchSubdistrict = async () => {
        const {residence} = this.state
        const res = await getRegionals(residence.districtID, this.state.query)
        residence.data = res.data.rows
        this.setState({residence})
    }
    fetchVillage = async () => {
        const {residence} = this.state
        const res = await getRegionals(residence.subdistrictID, this.state.query)
        residence.data = res.data.rows
        this.setState({residence})
    }
    fetchZone = async (parentID) => {
        const {residence} = this.state
        let res
        res = await getZones(parentID)
        residence.data = res.data.rows
        this.setState({residence})
    }

    renderContent = () => {
        return (
            <View style={styles.content}>
              <View style={{ borderBottomColor: '#eee', borderBottomWidth: 1 }}>
                <SearchBar
                    onChangeText={search => {
                            this.setState({ query: search }); 
                            const {modalTitle} = this.state
                            if(modalTitle == 'Pilih Provinsi'){
                                this.fetchRegional()
                            }
                        }}
                                    containerStyle={{
                    width: '100%', backgroundColor: 'white', borderBottomColor: 'transparent',
                    borderTopColor: 'transparent', height:40, justifyContent:'center',
                }}
                    inputContainerStyle={{ backgroundColor: 'transparent' }}
                    inputStyle={{fontSize:14}}
                    placeholder="Cari .."
                    value={this.state.query}
                />
              </View>
                {!this.state.loading && this.state.regionals.data.map((item, index) => {
                    return(
                        <TouchableOpacity onPress={()=>{
                            const {modalTitle, regionals} = this.state
                            if(modalTitle.indexOf('Provinsi')>-1){
                                regionals.provinceID = item.regionalID
                                regionals.province = item.name
                            }else if(modalTitle.indexOf('Kota')>-1){
                                regionals.districtID = item.regionalID
                                regionals.district = item.name
                            }
                            regionals.data = []
                            this.setState({regionals})
                            this.closeModal()
                        }} style={{paddingHorizontal: 24, paddingVertical: 12}}>
                            <Text>{item.name}</Text>
                        </TouchableOpacity>
                    )
                })}
                {this.state.jobs.data.map((item, index) => {
                    return(
                        <TouchableOpacity onPress={() => {
                            const { modalTitle, jobs } = this.state
                            jobs.jobID = item.jobID
                            jobs.name = item.name
                            jobs.data = []
                            this.setState({ jobs })
                            this.closeModal()
                        }} style={{ paddingHorizontal: 24, paddingVertical: 12 }}>
                            <Text>{item.name}</Text>
                        </TouchableOpacity>
                    )
                })}

                {this.state.countries.data.map((item, index) => {
                    return(
                        <TouchableOpacity onPress={() => {
                            const { modalTitle, countries } = this.state
                            countries.countryID = item.countryID
                            countries.name = item.name
                            countries.data = []
                            this.setState({ countries })
                            this.closeModal()
                        }} style={{ paddingHorizontal: 24, paddingVertical: 12 }}>
                            <Text>{item.name}</Text>
                        </TouchableOpacity>
                    )
                })}

                {this.state.ethnics.data.map((item, index) => {
                    return(
                        <TouchableOpacity onPress={() => {
                            const { modalTitle, ethnics } = this.state
                            ethnics.ethnicID = item.ethnicID
                            ethnics.name = item.name
                            ethnics.data = []
                            this.setState({ ethnics })
                            this.closeModal()
                        }} style={{ paddingHorizontal: 24, paddingVertical: 12 }}>
                            <Text>{item.name}</Text>
                        </TouchableOpacity>
                    )
                })}
                {this.state.residence.data.map((item, index) => {
                    return(
                        <TouchableOpacity onPress={() => {
                            const { modalTitle, residence } = this.state
                            if (modalTitle.indexOf('Provinsi') > -1) {
                                residence.provinceID = item.regionalID
                                residence.province = item.name
                            } else if (modalTitle.indexOf('Kota') > -1) {
                                residence.districtID = item.regionalID
                                residence.district = item.name
                            } else if(modalTitle.indexOf('Kecamatan')>-1){
                                residence.subdistrictID = item.regionalID
                                residence.subdistrict = item.name
                            } else if(modalTitle.indexOf('Desa') >-1){
                                residence.villageID = item.regionalID
                                residence.village = item.name
                            }else if(modalTitle.indexOf('Dusun') >-1){
                                console.log(item.zoneID)
                                residence.dusunID = item.zoneID
                                residence.dusun = item.name
                            }else if(modalTitle.indexOf('RW') >-1){
                                residence.rwID = item.zoneID
                                residence.rw = item.name
                            }else if(modalTitle.indexOf('RT') >-1){
                                residence.rtID = item.zoneID
                                residence.rt = item.name
                            }

                            this.setState({ residence })
                            this.closeModal()
                        }} style={{ paddingHorizontal: 24, paddingVertical: 12 }}>
                            <Text>{item.name}</Text>
                        </TouchableOpacity>
                    )
                })}

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

                if(item.id == 1){
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
              }
              
            })}
            <View style={{width:'100%', height:130, flexWrap:'wrap'}}>
            {this.state.golonganDaraData.map((item,index)=>{
                if(item.id != 1){
                return (
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
              <TouchableOpacity onPress={()=>{
                  const modal2Title = this.state.modal2Title
                  console.log(modal2Title)
                  if(modal2Title.indexOf('Darah')>-1){
                    const bloodType = this.state.golonganDaraData.filter((item, index) => (item.id == this.state.radioActive))[0]
                    console.log(bloodType)
                    this.setState({blood: bloodType.value})
                  }
                  else if(modal2Title.indexOf('Agama')>-1){
                    const religion = this.state.agamaData.filter((item, index) => (item.id==this.state.radioActive))[0].value
                    this.setState({religion})
                  }else if(modal2Title.indexOf('Pernikahan')>-1){
                      const marital = this.state.statusData.filter((item, index) => (item.id==this.state.radioActive))[0].value
                      this.setState({marital})
                  }else if(modal2Title.indexOf('Kependudukan')>-1){
                      const type = this.state.jenisKependudukanData.filter((item, index) => (item.id==this.state.radioActive))[0].value
                      this.setState({type})
                  }else if(modal2Title.indexOf('Difabel')>-1){
                      const disability = this.state.difabelData.filter((item, index) => (item.id==this.state.radioActive))[0].value
                      this.setState({disability})
                  }else if(modal2Title.indexOf('Pendidikan')>-1){
                      const education = this.state.pendidikanData.filter((item, index) => (item.id==this.state.radioActive))[0].value
                      this.setState({education})
                  }
                  this.closeModal2()
              }} style={{justifyContent: 'center',alignItems: 'center',paddingVertical:7,borderRadius:5, paddingHorizontal:20, backgroundColor:'grey', width:'40%'}}>
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
      openModal = (e, residence) => {
        this.setState({modalTitle:e})
        this.setState({showHeader: false})
        if (this.modal.current) {
          this.modal.current.open();
        }
        if(e.indexOf('Provinsi')>-1){
            this.fetchRegional(null, residence, 'Provinsi')
        }else if(e.indexOf('Kota')>-1){
            this.fetchRegional(this.state.regionals.provinceID, residence, 'Kota')
        }else if(e.indexOf('Pekerjaan')>-1){
            this.fetchJobs()
        }else if(e.indexOf('Negara')>-1){
            this.fetchCountries()
        }else if(e.indexOf('Suku')>-1){
            this.fetchEthnics()
        }else if(e.indexOf('Kecamatan')>-1){
            this.fetchSubdistrict()
        }else if(e.indexOf('Desa') >-1 ){
            this.fetchVillage()
        }else if(e.indexOf('Dusun')>-1){
            this.fetchZone(null)
        }else if(e.indexOf('RW')){
            this.fetchZone(this.state.residence.dusunID)
        }else if(e.indexOf('RT')){
            this.fetchZone(this.state.residence.rtID)
        }
      };
      
      closeModal = () => {
        const {regionals, jobs, countries, ethnics, residence} = this.state
        regionals.data = []
        jobs.data = []
        countries.data = []
        ethnics.data = []
        residence.data = []
        console.log(residence)
        this.setState({showHeader: true, regionals, jobs, countries, ethnics, residence, query: ''})
        console.log(this.state.modalTitle)
        if (this.modal.current) {
          this.modal.current.close();
        }
      };
      openModal2 = (modal2Title) => {
          this.setState({modal2Title}, ()=>{
              this.modal2.current.open();
          })
        //   console.log(this.state.modal2Title)
        // this.setState({showHeader: false})
        // if (this.modal2.current) {
        // }
      };
      
      closeModal2 = () => {
        this.setState({showHeader: true})
        console.log(this.state.modalTitle)
        if (this.modal2.current) {
          this.modal2.current.close();
        }
      };

      handleDelete = async () => {
        Alert.alert(
            'Hapus penduduk',
            'Anda yakin ingin menghapus penduduk?',
            [
                {text: 'Yakin', onPress: this.hapusPenduduk},
                {text: 'Batal'}
            ]
        )
      }

      hapusPenduduk = async () => {
        console.log('delete',this.state.peopleID)
        const response = await deletePeople(this.state.peopleID)
        Alert.alert(
            response.meta.code == 200?'Sukses':'Gagal',
            response.meta.message
        )
        if(response.meta.code == 200){
            this.props.navigation.state.params.refresh()
            this.props.navigation.goBack(null)
        }
      }

      handleSimpan = async () => {
        const{
            residence,
            regionals,
            marital,
            name,
            blood,
            familyID,
            NIK,
            KK,
            jobs,
            ethnics,
            countries,
            religion,
            disability,
            type,
            officeID,
            education,
            tanggalLahir: birthdate,
            jenisKelamin: gender
        } = this.state
        const{
            provinceID,
            districtID,
            subdistrictID,
            villageID,
            zoneID,
        } = residence
        const{
            districtID: birthlocationID
        } = regionals
        const{
            jobID
        } = jobs
        const{
            ethnicID
        } = ethnics
        var{
            name: country
        } = countries
        if(!country){
            country='Indonesia'
        }
        const body = {
            officeID,
            familyID: null,
            provinceID,
            districtID,
            subdistrictID,
            villageID,
            zoneID: residence.rtID,
            birthlocationID,
            jobID,
            ethnicID,
            NIK,
            KK,
            name,
            religion,
            marital,
            country,
            blood,
            education,
            gender: gender=='Laki-laki'?'L':'P',
            disability: disability.indexOf('Tidak')>-1?null:disability,
            type,
            birthdate,
            nationality: country=='Indonesia'?'WNI':'WNA'
        }
        let response 
        if(this.state.peopleID){
            body.peopleID = this.state.peopleID
            response = await updatePeople(body)
        }else{
            response= await storePeoples(JSON.stringify(body))
        }
        if(response.meta.code == '200'){
            Alert.alert(
                'Sukses',
                response.meta.message
            )
            this.props.navigation.state.params.refresh()
            if(!this.state.peopleID){
                this.props.navigation.goBack(null)
            }
        }else{
            Alert.alert(
                'Gagal!',
                response.meta.message
            )
        }
      }


      onChangeCalendar = (event, selectedDate) => {
        const currentDate = selectedDate || this.state.date
        const year = currentDate.getFullYear()
        const month = (currentDate.getMonth()+1)<10?`0${currentDate.getMonth()}`:currentDate.getMonth()
        const date = currentDate.getDate()<10?`0${currentDate.getDate()}`:currentDate.getDate()
        const formatted = `${year}-${month}-${date}`
        this.setState({tanggalLahir: formatted, show: false})
      }


  render() {
    const {regionals, residence} = this.state
    if(this.state.peopleLoading){
        return(
            <View/>
        )
    }
    return (
        
        <View style={{ flex: 1, flexDirection:"column"}}>
            <View style={{height: StatusBar.currentHeight, width: '100%',position:'absolute', backgroundColor: '#d5322e'}} />
            <View style={{height: 50, width: "100%", flexDirection: 'row', alignItems: 'center', marginTop:StatusBar.currentHeight }}>
                <TouchableOpacity onPress={this.state.showHeader?() =>this.props.navigation.goBack()
                    : this.closeModal}>
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
                {/* <View style={{width:"90%"}}> */}
                    {/* <View style={{flex:1, justifyContent: 'center', alignItems: 'center',marginBottom:0, marginTop:20}}>
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
                            
                    </View> */}
                {/* </View> */}
                <View style={{width:"90%", marginTop: 10}}>
                    <View style={{flex:1, justifyContent: 'center'}}>
                        <TextField
                            value={this.state.KK}
                            ref={ref=>this.kkref=ref}
                            label="Nomor Kartu Keluarga"
                            keyboardType='numeric'
                            textColor='grey'
                            fontSize={normalize(14)}
                            activeLineWidth={1}
                            baseColor='gray'
                            selectionColor='grey'
                            tintColor='#d5322e'
                            lineWidth={1}
                            contentInset={{label: 0, top:4, input:1}}
                            onChangeText={(KK) => this.setState({ KK })} 
                            />
                        
                    </View>
                </View>
                <View style={{width:"90%", marginTop: 10}}>
                    <View style={{flex:1, justifyContent: 'center'}}>
                        <TextField
                            value={this.state.NIK}
                            ref={ref=>this.nikref=ref}
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
                                    onChangeText={(NIK) => this.setState({ NIK })} 
                            />
                        
                    </View>
                </View>

                <View style={{width:"90%"}}>
                    <View style={{flex:1, justifyContent: 'center', marginBottom:15}}>
                        <TextField
                            value={this.state.name}
                            ref={ref=>this.nameref=ref}
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
                            onChangeText={ (name) => this.setState({ name })} 
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
                                <Text style={{bottom:5,left:1, position: 'absolute', color:'grey', fontSize:normalize(14)}}>{regionals.provinceID?regionals.province:'Provinsi Kelahiran'}</Text>   
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* KABUPATEN KOTA */}
                    <View style={{width:"100%"}}>
                        <View style={{flex:1, justifyContent: 'center', marginBottom:20}}>
                            <TouchableOpacity onPress={()=>this.openModal('Pilih Kabupaten / Kota')} style={{borderBottomWidth:1, borderColor:'grey', height:30}}>
                                <Text style={{bottom:5,left:1, position: 'absolute', color:'grey', fontSize:normalize(14)}}>{regionals.districtID?regionals.district:'Kabupaten / Kota Kelahiran'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>:null}

                {this.state.konfirmNegara == "Luar Negeri" ? <View style={{width:"90%"}}>
                    <View style={{flex:1, justifyContent: 'center', marginBottom:15}}>
                        <TouchableOpacity onPress={()=>this.openModal('Pilih Negara')} style={{borderBottomWidth:1, borderColor:'grey', height:30}}>
                                    <Text style={{ bottom: 5, left: 1, position: 'absolute', color: 'grey', fontSize: normalize(14) }}>{this.state.countries.countryID ? this.state.countries.name : 'Negara Kelahiran'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>:null}
                
                <View style={{width:"90%"}}>
                    <View style={{flex:1, justifyContent: 'center', marginBottom:15}}>
                    {/* <Text style={{position: 'absolute',top:-10, color:'grey',fontSize: normalize(12)}}>Tempat Tinggal Sesuai KK</Text>
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
                        </View> */}
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
                            <TouchableOpacity onPress={()=>this.openModal('Pilih Provinsi', true)} style={{borderBottomWidth:1, borderColor:'grey', height:30}}>
                                <Text style={{bottom:5,left:1, position: 'absolute', color:'grey', fontSize:normalize(14)}}>{residence.provinceID?residence.province:'Provinsi Tempat Tinggal'}</Text>   
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* KABUPATEN KOTA */}
                    <View style={{width:"100%"}}>
                        <View style={{flex:1, marginBottom:15}}>
                            <TouchableOpacity onPress={()=>this.openModal('Pilih Kabupaten / Kota',true)} style={{borderBottomWidth:1, borderColor:'grey', height:30}}>
                                <Text style={{bottom:5,left:1, position: 'absolute', color:'grey', fontSize:normalize(14)}}>{residence.district?residence.district:'Kabupaten / Kota Tempat Tinggal'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* KECAMATAN */}
                    <View style={{width:"100%"}}>
                        <View style={{flex:1, justifyContent: 'center', marginBottom:15}}>
                            <TouchableOpacity onPress={()=>this.openModal('Pilih Kecamatan', true)} style={{borderBottomWidth:1, borderColor:'grey', height:30}}>
                                            <Text style={{ bottom: 5, left: 1, position: 'absolute', color: 'grey', fontSize: normalize(14) }}>{residence.subdistrict ? residence.subdistrict:'Kecamatan Tempat Tinggal'}</Text>   
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* DESA KELURAHAN */}
                    <View style={{width:"100%"}}>
                        <View style={{flex:1, justifyContent: 'center', marginBottom:15}}>
                            <TouchableOpacity onPress={()=>this.openModal('Pilih Desa', true)} style={{borderBottomWidth:1, borderColor:'grey', height:30}}>
                                <Text style={{bottom:5,left:1, position: 'absolute', color:'grey', fontSize:normalize(14)}}>{residence.village?residence.village:'Desa / Kelurahan Tempat Tinggal'}</Text>   
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* Dusun */}
                    {/* <View style={{width:"100%"}}>
                        <View style={{flex:1, justifyContent: 'center', marginBottom:10}}>
                            <TouchableOpacity onPress={()=>this.openModal('Pilih Dusun/Dukuh/Sebutan Lain', true)} style={{borderBottomWidth:1, borderColor:'grey', height:30}}>
                                <Text style={{bottom:5,left:1, position: 'absolute', color:'grey', fontSize:normalize(14)}}>{residence.dusun?residence.dusun:'Dusun/Dukuh/Sebutan Lain'}</Text>   
                            </TouchableOpacity>
                        </View>
                    </View> */}
                            {/* RT / RW / KODE POS */}
                    <View style={{flex:1, alignItems: 'center', justifyContent:'space-between',flexDirection:'row',}}>
                    <View style={{width:'30%', padding:2, justifyContent: 'center',}}>
                        <TextField
                            label={residence.rt?residence.rt:'RT'}
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

                        {/* <TouchableOpacity onPress={()=>this.openModal('Pilih RT', true)} style={{flex:1, position: "absolute", right:0}}>
                            <FontAwesome name="search" size={16} color="grey" />
                        </TouchableOpacity> */}
                    </View>
                    <View style={{width:'30%', padding:2,justifyContent: 'center',}}>
                        <TextField
                            label={residence.rw?residence.rw:'RW'}
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
                            />

                        {/* <TouchableOpacity onPress={()=>this.openModal('Pilih RW', true)} style={{flex:1, position: "absolute", right:0}}>
                            <FontAwesome name="search" size={16} color="grey" />
                        </TouchableOpacity> */}
                    </View>
                    <View style={{width:'30%', padding:2,justifyContent: 'center',}}>
                        <TextField
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
                            />
                            
                        {/* <TouchableOpacity onPress={()=>this.openModal('Pilih Kode Pos', true)} style={{flex:1, position: "absolute", right:0}}>
                            <FontAwesome name="search" size={16} color="grey" />
                        </TouchableOpacity> */}
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
                                        value={this.state.jenisKelamin}
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
                                            <Text style={{bottom:5,left:1, position: 'absolute', color:'grey', fontSize:normalize(12)}}>{this.state.blood}</Text>   
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
                                            <Text style={{bottom:5,left:1, position: 'absolute', color:'grey', fontSize:normalize(12)}}>{this.state.religion}</Text>   
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
                                            <Text style={{bottom:5,left:1, position: 'absolute', color:'grey', fontSize:normalize(12)}}>{this.state.marital}</Text>   
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
                                    <Text style={{bottom:5,left:1, position: 'absolute', color:'grey', fontSize:normalize(12)}}>{this.state.type}</Text>   
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
                                    <Text style={{bottom:5,left:1, position: 'absolute', color:'grey', fontSize:normalize(12)}}>{this.state.disability}</Text>   
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    {/* PEKERJAAN */}
                    <View style={{width:"100%"}}>
                        <View style={{flex:1, justifyContent: 'center', marginBottom:15}}>
                            <TouchableOpacity onPress={()=>this.openModal('Pilih Pekerjaan')} style={{borderBottomWidth:1, borderColor:'grey', height:30}}>
                                <Text style={{bottom:5,left:1, position: 'absolute', color:'grey', fontSize:normalize(12)}}>{this.state.jobs.jobID?this.state.jobs.name:'Pekerjaan'}</Text>   
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* Pendidikan */}
                    <View style={{width:"100%"}}>
                        <View style={{flex:1, justifyContent: 'center', marginBottom:15}}>
                            <TouchableOpacity onPress={()=>this.openModal2('Pilih Pendidikan')} style={{borderBottomWidth:1, borderColor:'grey', height:30}}>
                                <Text style={{bottom:5,left:1, position: 'absolute', color:'grey', fontSize:normalize(12)}}>{this.state.education?this.state.education:'Pendidikan'}</Text>   
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* Suku */}
                    <View style={{width:"100%"}}>
                        <View style={{flex:1, justifyContent: 'center', marginBottom:15}}>
                            <TouchableOpacity onPress={()=>this.openModal('Pilih Suku')} style={{borderBottomWidth:1, borderColor:'grey', height:30}}>
                                <Text style={{bottom:5,left:1, position: 'absolute', color:'grey', fontSize:normalize(14)}}>{this.state.ethnics.ethnicID?this.state.ethnics.name:'Suku'}</Text>   
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{width:"100%", alignItems: 'center',marginBottom:30}}>
                        <View style={styles.conteinerPhoto}>
                            <View style={styles.photo}>
                                <Image source={this.state.uri} style={{width:'100%', height: '100%'}} resizeMode="cover"/>
                            </View>
                        </View>
                        {/* <TouchableOpacity 
                            onPress={()=>this.props.navigation.navigate("CameraApp")}
                            style={styles.buttonPhoto} 
                            activeOpacity={0.5}>
                            <Text style={{fontSize:normalize(14)}}>{this.state.titleButtonPhoto}</Text>
                        </TouchableOpacity> */}
                        
                    {this.state.action == "Tambah" ? null:
                        <TouchableOpacity onPress={this.handleDelete} style={{height:wp('10%'), width:'55%', backgroundColor:'#d4322e', justifyContent: 'center', alignItems: 'center', borderRadius:5}}>
                            <Text style={{color:'white'}}>Hapus Penduduk</Text>
                        </TouchableOpacity>}
                    </View>
                </View>

            </ScrollView>
            <TouchableOpacity style={{width:'100%', height:40, justifyContent: 'center', alignItems: 'center', backgroundColor:'#d5322e'}} onPress={this.handleSimpan}>
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

