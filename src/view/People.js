
import React, { Component } from "react";
import { Text, View, FlatList, TouchableOpacity,Image } from "react-native";
import { SafeAreaView, StackViewTransitionConfigs } from "react-navigation";
import RNModal from '../components/RNModal'
import Modal  from 'react-native-modalbox'
import { getUsers } from "../service";
import { ListItem } from 'react-native-elements';
import Button  from '../components/button'
import moment from "moment";
import config from '../../config'
import { Permissions, ImagePicker} from "expo"
import TextInputApollo from '../components/TextInputApollo'
import {updateUsers} from '../service'
import AVATAR from "../../assets/profile.jpg"
import { Font } from 'expo';

const RenderItem = () => <View style={styles.separator} />;

export default class People extends Component {
  state = {
    users: [],
    isOpen: false,
    user: {},
    image: null,
    showOptions: false,
    hasCameraPermission: null,
    edit: false,
    newfirstname:'',
    newlastname:'',
    newposition:'',
    newemail:'',
    clickedID:''

  };

   componentDidMount() { //async za font
    // await Font.loadAsync({
    //   'Monserrat': require('../../assets/fonts/Montserrat-Black.ttf'),
    // });
    getUsers().then(users => {
      this.setState({
        users: users.data,
        // image: config.imageUrl+users.image+'.jpg'
        newfirstname:'',
        newlastname:'',
        newposition:'',
        newemail:'',
        clickedID:''
      });
    });
  }
  _refresh = () => {
    this.componentDidMount()
  }
  _pickImage = async (data) => {
    this._loadPermissions();
    if (data) {
      let imageData = await ImagePicker.launchImageLibraryAsync({
        base64: true,
        allowsEditing: false,
        quality: 0.5
      });
      console.log("Data: ", imageData)
      this.setState({
        image: `data:image/png;base64,${imageData.base64}`
      })
    } else { 
      let imageData = await ImagePicker.launchCameraAsync({
        base64: true,
        allowsEditing: false,
        quality: 0.5
      })
      console.log("Data: ", imageData);
      this.setState({
        image: `data:image/png;base64,${imageData.base64}`
      })  
    }
  }

  _loadPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
    this.setState({
      hasCameraPermission: status === "granted"
    })
  }
  _onPress = user => {
  // console.log("TCL: People -> user", user)
  // this.setState({ isOpen: false, user: '',clickedID:'', newemail:'',newfirstname:'',newlastname:'',newposition:''});
    this.setState({ isOpen: true, user: user, image:user.image,clickedID:user._id, newemail:user.email,newfirstname:user.firstName,newlastname:user.lastName,newposition:user.position});
  };
  _onPicturePress = user => {
    // console.log(user.firstName + 'editing profile');
  };
  closeModal = () => {
    this.setState({ isOpen: false, user: {} });
  };
  _pickImageHandler = () => {
    this.setState({ showOptions: !this.state.showOptions})
  }
  handleSubmit=()=>{
    const person = {
      // _id:this.state.clickedID || undefined,
      firstName: this.state.newfirstname || undefined,
      lastName: this.state.newlastname || undefined,
      position:this.state.newposition || undefined,
      email:this.state.newemail || undefined,
      image: this.state.image || undefined
    };
    
      updateUsers(this.state.clickedID, person).then(data => {
           this.closeModal();
           this._refresh()
      });
  };
     
  
  formatDate = (badDate) =>{
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
    let date = new Date(badDate)

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
  

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }
  onEditClick= () => {
    if(!this.state.edit){
    this.setState({edit : true});
    }else{
      this.setState({edit : false});
    }
  };
   _keyExtractor = (item, index) => item._id;

  render() {
    // console.log(this.state)
    const {navigate}=this.props.navigation
    const { itemWrapper, firstName, avatar, profileWrapper, cameraWrapper} = styles;
    const { image } = this.state;
    const birthday = moment(this.state.user.birthday).format("MMMM Do YYYY");
    return (
      <SafeAreaView style={styles.all}>
        <FlatList
          extraData={this.state.refresh}
          keyExtractor={this._keyExtractor}
          data={this.state.users}
          ItemSeparatorComponent={RenderItem}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => this._onPress(item)}>
              {item.image && 
               <ListItem
               style={styles.listItem}
               leftAvatar={{
                 title: item.firstName,
                 source :{ uri: item.image}
               }}
               linearGradientProps={{
                colors: ['#86c5f9','#2196f3'],
                start: [1, 0],
                end: [0.2, 0],
              }}
              titleStyle={{ color: 'white', fontWeight: 'bold' }}
               title={item.firstName}
               subtitle={item.position}
               subtitleStyle={{ color: 'white' }}
               chevronColor="white"
               chevron
             />}
             {!item.image && 
             <ListItem
             style={styles.listItem}
             leftAvatar={{
               title: item.firstName,
               source:{ AVATAR}
              }}
             title={item.firstName}
             subtitle={item.position}
             chevron
           />
            }
              
            </TouchableOpacity>
          )}
        />
        <RNModal
          visible={this.state.isOpen}
          refresh={this.refresh}
          onClose={this.closeModal}
          swipeToClose={false}
          swipeDirection={"down"}
          swipeArea={20} // The height in pixels of the swipeable area, window height by default
          swipeThreshold={50} // The threshold to reach in pixels to close the modal
          backdropOpacity={0.1}
          closeIconRounded
        >
          <View style={styles.modalView}>
          <View style={profileWrapper}>
            {this.state.image ? (
              <TouchableOpacity onPress={this._pickImageHandler}>
                <Image source={{ uri: this.state.image }} style={avatar} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={this._pickImageHandler}>
                <Image
                  source={require("../../assets/profile.jpg")}
                  style={avatar}
                />
              </TouchableOpacity>
            )}
            <Text>
              {this.state.user.firstName + " " + this.state.user.lastName}
            </Text>
        
            {this.state.showOptions && (
              <View style={cameraWrapper}>
                <TouchableOpacity >
                  <Button color="#841584" onPress={() => this._pickImage(false)}>
                  <Text>Camera roll</Text>
                  </Button>
                </TouchableOpacity>
                <TouchableOpacity >
                <Button color="#841584" onPress={() => this._pickImage(true)}>
                    <Text>Upload from gallery</Text>
                  </Button>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View />
          <View style={styles.informationWrapper}>
          {!this.state.edit && (
            <Button onPress={this.onEditClick} style={styles.Button}>Edit this profile</Button>
          )}
          {!this.state.edit && (
            <View>
              <Text>
                Name: {this.state.user.firstName} {this.state.user.lastName}
              </Text>
              <Text>Position: {this.state.user.position}</Text>
              <Text>Email: {this.state.user.email}</Text>
              <Text>Gender: {this.state.user.gender}</Text>
              <Text>
                Hired: {this.formatDate(this.state.user.beginDate)}
              </Text>
            </View>
          )}

          {this.state.edit && (
            <View>
              <Text>First name:</Text>
              <TextInputApollo
                style={styles.input}
                value={this.state.newfirstname}
                onChangeText={value =>
                  this.setState({ newfirstname: value })
                }
              />
              <Text>Last name:</Text>
              <TextInputApollo
                style={styles.input}
                value={this.state.newlastname}
                onChangeText={value =>
                  this.setState({ newlastname: value })
                }
              />
              <Text>Position:</Text>
              <TextInputApollo
                style={styles.input}
                value={this.state.newposition}
                onChangeText={value =>
                  this.setState({ newposition: value })
                }
              />
              <Text>Email:</Text>
              <TextInputApollo
                style={styles.input}
                value={this.state.newemail}
                onChangeText={value => this.setState({ newemail: value })}
              />
              {/* <Button onClick={this.closeModal}>
                <Text>Close</Text>
              </Button> */}
            </View>
          )}
          {this.state.edit && (
            <View>
              <Button onPress={this.onEditClick} style={styles.Button}><Text style={styles.buttonText}>Dismiss</Text></Button>
              <Button onPress={this.handleSubmit}style={styles.Button}><Text style={styles.buttonText}>Submit</Text></Button>
            </View>
          )}
          </View>
          </View>
        </RNModal>
      </SafeAreaView>
    );
  }
}

const styles = {
  all:{
    marginTop:23,
    // backgroundColor:'#0a59a9'
  },
  listContainer:{
    backgroundColor:'#0a59a9'
  },
  modalView:{
    // backgroundColor:'#0a59a9'
    // flex:1,
    // flexDirection:'column'
  },
  listItem:{
    backgroundColor:'#0a59a9',
    borderBottomColor: 'white',
    borderBottomWidth: 0.5,
    // fontFamily:'Monserrat'
  },
  itemWrapper: {
    padding: 15,
    backgroundColor:'#0a59a9'
  },
  firstName: {
    fontSize: 16,
    fontWeight: "500"
  },
  separator: {
    // height: 1,
    backgroundColor: "white"
  },
  image: {
    alignSelf:'center',
    width: 180,
    height: 180
   },
   cameraWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20
  },
  input: {
    width:200,
    height:30,
    backgroundColor:'rgba(255,255,255,0.7)',
    marginBottom:10,
    color:'black',
    paddingHorizontal:10,
    borderRadius:12,
    borderColor:"black",
    borderWidth: 0.5
   },
   avatar: {
    width: 100, 
    height: 100,
    borderRadius: 25
  },
  profileWrapper: {
    // flex:0.35,
    marginTop:-20,
    justifyContent: 'center', 
    alignItems: 'center',
    // marginTop:100,
  },
  informationWrapper:{
    // flex:0.65,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  btn:{

  },
  Button:{
    marginRight:40,
    marginLeft:40,
    marginTop:10,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#1E6738',
    borderRadius:10,
    borderWidth: 1,
    // borderColor: '#fff'
  },
  buttonText:{
      color:'black',
      textAlign:'center',
      paddingLeft : 10,
      paddingRight : 10
  }
};