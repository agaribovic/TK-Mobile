import React, { Component } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView, StackViewTransitionConfigs } from "react-navigation";
import { RNModal } from "rn-start-elements";
import { getUsers } from "../service";
import { Avatar } from 'react-native-elements';
import { ListItem } from 'react-native-elements';

import moment from "moment";
import config from '../../config'
const RenderItem = () => <View style={styles.separator} />;

export default class People extends Component {
  state = {
    users: [],
    modalVisible: false,
    user: {}
  };

  componentDidMount() {
    getUsers().then(users => {
      this.setState({
        users: users.data
      });
    });
  }
  _onPress = user => {
    // console.log(user);
    this.setState({ modalVisible: true, user: user });
  };
  _onPicturePress = user => {
    console.log(user.firstName + 'editing profile');
  };
  closeModal = () => {
    this.setState({ modalVisible: false, user: {} });
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
          <View><Text>Text fields here</Text></View>
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
    width: 180,
    height: 180,
    
    // justifyContent: 'center',
    // alignItems: 'center',
    // resizeMode: 'contain'
   }
};