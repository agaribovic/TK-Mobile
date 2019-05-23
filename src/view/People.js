
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

  componentDidMount() {
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
  console.log("TCL: People -> user", user)
  this.setState({ isOpen: false, user: '',clickedID:'', newemail:'',newfirstname:'',newlastname:'',newposition:''});
    this.setState({ isOpen: true, user: user,clickedID:user._id, newemail:user.email,newfirstname:user.firstName,newlastname:user.lastName,newposition:user.position});
  };
  _onPicturePress = user => {
    console.log(user.firstName + 'editing profile');
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
      email:this.state.newemail || undefined
    };
    
      updateUsers(this.state.clickedID, person).then(data => {
        console.log("TCL: People -> handleSubmit -> person", person)
        console.log("TCL: People -> handleSubmit -> this.state.clickedID", this.state.clickedID)
        console.log("TCL: People -> handleSubmit -> data", data.data)
           this.closeModal();
          // onClose()
        
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
    console.log(this.state)
    const {navigate}=this.props.navigation
    const { itemWrapper, firstName, avatar, profileWrapper, cameraWrapper} = styles;
    const { image } = this.state;
    const birthday = moment(this.state.user.birthday).format("MMMM Do YYYY");
    return (
      <SafeAreaView>
        <FlatList
          keyExtractor={this._keyExtractor}
          data={this.state.users}
          ItemSeparatorComponent={RenderItem}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => this._onPress(item)}>
              <ListItem
                style={styles.listItem}
                leftAvatar={{
                  title: item.firstName,
                  source: { uri: config.imageUrl + item.firstName + ".jpg" }
                }}
                title={item.firstName}
                subtitle={item.position}
                chevron
              />
            </TouchableOpacity>
          )}
        />
        <RNModal
          visible={this.state.isOpen}
          onClose={this.closeModal}
          swipeToClose={false}
          swipeDirection={"down"}
          swipeArea={20} // The height in pixels of the swipeable area, window height by default
          swipeThreshold={50} // The threshold to reach in pixels to close the modal
          backdropOpacity={0.1}
          closeIconRounded
        >
          <View style={profileWrapper}>
            {image ? (
              <TouchableOpacity onPress={this._pickImageHandler}>
                <Image
                  source={{
                    uri: config.imageUrl + item.firstName + ".jpg"
                  }}
                  style={avatar}
                />
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
                <TouchableOpacity onPress={() => this._pickImage(false)}>
                  <Button
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                  >
                    <Text>Camera Roll</Text>
                  </Button>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this._pickImage(true)}>
                  <Text>Image Library</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View>
          </View>
          {!this.state.edit && (
            <Button onPress={this.onEditClick}>Edit this profile</Button>
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
              <Button onPress={this.onEditClick}>Dismiss</Button>
              <Button onPress={this.handleSubmit}>Submit</Button>
            </View>
          )}
        </RNModal>
      </SafeAreaView>
    );
  }
}

const styles = {
  listContainer:{
    backgroundColor:'#0a59a9'
  },
  modalView:{
    // backgroundColor:'#0a59a9'
  },
  listItem:{
    backgroundColor:'#0a59a9'
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
    height: 1,
    backgroundColor: "#222"
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
    justifyContent: 'center', 
    alignItems: 'center',
    // marginTop:100,
  }

};