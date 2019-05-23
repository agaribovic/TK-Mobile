
import React, { Component } from "react";
import { Text, View, FlatList, TouchableOpacity,Image } from "react-native";
import { SafeAreaView, StackViewTransitionConfigs } from "react-navigation";
import  RNModal  from '../components/RNModal';//
import { getUsers } from "../service";
// import { Avatar } from 'react-native-elements';
import { ListItem } from 'react-native-elements';
import {Button } from '../components/button'
import moment from "moment";
import config from '../../config'
import { Permissions, ImagePicker} from "expo"
import TextInputApollo from '../components/TextInputApollo'



const RenderItem = () => <View style={styles.separator} />;

export default class People extends Component {
  state = {
    users: [],
    modalVisible: false,
    user: {},
    image: null,
    showOptions: false,
    hasCameraPermission: null,
    edit: false
  };

  componentDidMount() {
    getUsers().then(users => {
      this.setState({
        users: users.data,
        // image: config.imageUrl+users.image+'.jpg'
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
    console.log(user);
    this.setState({ modalVisible: true, user: user });
  };
  _onPicturePress = user => {
    console.log(user.firstName + 'editing profile');
  };
  closeModal = () => {
    this.setState({ modalVisible: false, user: {} });
  };
  _pickImageHandler = () => {
    this.setState({ showOptions: !this.state.showOptions})
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
          visible={this.state.modalVisible}
          onClose={this.closeModal}
          closeIconRounded
        >
          <View style={profileWrapper}>
           
            {/* <TouchableOpacity
              onPress={() => this._onPicturePress(this.state.user)}
            > */}
            {/* <Avatar
                rounded
                style={styles.image}
                source={{
                  uri: config.imageUrl + this.state.user.firstName + ".jpg"
                }}
                showEditButton
              /> */}
            {/* </TouchableOpacity> */}
            {image ? (
              <TouchableOpacity onPress={this._pickImageHandler}>
                <Image source={{ uri: image }} style={avatar} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={this._pickImageHandler}>
                <Image
                  source={require('../../assets/profile.jpg')}
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
                  <Text>Camera Roll</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this._pickImage(true)}>
                  <Text>Image Library</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View>
            <Text>Text fields here</Text>
            {/* <Button onPress={() => navigate('Profile', {name: this.state.user})}></Button> */}
            <TouchableOpacity>
              <Text
                onPress={() => {
                  navigate("Calendar", { name: this.state.user });
                }}
              >
                Open calendar
              </Text>
            </TouchableOpacity>
          </View>
          {!this.state.edit &&
          <Button onPress={this.onEditClick}>Swap to edit</Button>
          }
          {!this.state.edit &&
          <View>
            <Text>Name: {this.state.user.firstName} {this.state.user.lastName}</Text>
            <Text>Position: {this.state.user.position}</Text>
            <Text>Email: {this.state.user.email}</Text>
          </View>
          }
          {this.state.edit &&
          <Button onPress={this.onEditClick}>Swap to info</Button>
          }
          {this.state.edit &&
          <View>
            <TextInputApollo
            style={styles.input}
            placeholder={this.state.user.firstName +' '+ this.state.user.lastName}
            />
            <TextInputApollo
            style={styles.input}
            placeholder={this.state.user.position}
            />
            <TextInputApollo
            style={styles.input}
            placeholder={this.state.user.email}
            />
          </View>
          }
        </RNModal>
      </SafeAreaView>
    );
  }
}

const styles = {
  listContainer:{
    backgroundColor:'#0a59a9'
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
    color:'#fff',
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
    alignItems: 'center'
  }

};