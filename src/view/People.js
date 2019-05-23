import React, { Component } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView, StackViewTransitionConfigs } from "react-navigation";
import  RNModal  from '../components/RNModal';//
import { getUsers } from "../service";
import { Avatar } from 'react-native-elements';
import { ListItem } from 'react-native-elements';
import Button from '../components/button'
import moment from "moment";
import config from '../../config';
import TextInputApollo from '../components/TextInputApollo'

const RenderItem = () => <View style={styles.separator} />;

export default class People extends Component {
  state = {
    users: [],
    modalVisible: false,
    user: {},
    edit: false
  };

  componentDidMount() {
    getUsers().then(users => {
      this.setState({
        users: users.data
      });
    });
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

  onEditClick= () => {
    if(!this.state.edit){
    this.setState({edit : true});
    }else{
      this.setState({edit : false});
    }
  };
   _keyExtractor = (item, index) => item._id;

  render() {
    const { itemWrapper, firstName } = styles;
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
                leftAvatar={{
                  title: item.firstName,
                  source: { uri: config.imageUrl + item.firstName + ".jpg" },
                  // showEditButton: true
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
          <View>
            {/* <Text>{this.state.user.firstName}</Text>
            <Text>{birthday}</Text> */}
            <TouchableOpacity onPress={() => this._onPicturePress(this.state.user)}>
            <Avatar
            rounded
              style={styles.image}
              source={{
                uri: config.imageUrl + this.state.user.firstName + ".jpg"
              }}
              showEditButton
            />
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
  itemWrapper: {
    padding: 15
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
    // flex: 1,
    // marginLeft:65,
    alignSelf:'center',
    // width: 150,
    // height: 150,
    // borderRadius: 40,
    // justifyContent: 'center',
    // alignItems: 'center',
    // resizeMode: 'contain'
    width: 150,
    height: 150,
    borderRadius: 150 ,
    overflow: "hidden",
    //borderWidth: 3,
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
   }
};