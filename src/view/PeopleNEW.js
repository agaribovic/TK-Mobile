import React, { Component } from "react";
import { Text, View, FlatList, TouchableOpacity, Image } from "react-native";
import { SafeAreaView, StackViewTransitionConfigs } from "react-navigation";
import RNModal from '../components/RNModal'
import { getUsers } from "../service";
import { ListItem, SearchBar } from 'react-native-elements';
import Button from '../components/button'
import moment from "moment";
import { Permissions, ImagePicker } from "expo"
import TextInputApollo from '../components/TextInputApollo'
import { updateUsers } from '../service'
import AVATAR from "../../assets/profile.jpg"
import DateTimePicker from "react-native-modal-datetime-picker";
import Spinner from '../components/spinner'
import ModalMenu from '../components/modalMenu'
const RenderItem = () => <View style={styles.separator} />;

export default class People extends Component {
  constructor(props) {
    super(props)

    this.state = {
      users: [],
      isOpen: false,
      user: {},
      image: null,
      showOptions: false,
      hasCameraPermission: null,
      edit: false,
      newfirstname: '',
      newlastname: '',
      newposition: '',
      newemail: '',
      clickedID: '',
      error: null,
      isDateTimePickerVisible: false, 
      parsedDate: null,
      filterText: '',
      loading:false
      

    };
    this.arrayholder = []
  }

  componentDidMount() { //async za font
    // await Font.loadAsync({
    //   'Monserrat': require('../../assets/fonts/Montserrat-Black.ttf'),
    // });
    this.setState({loading:true})
    console.log(this.state.isDateTimePickerVisible)

    getUsers().then(users => {
      this.setState({
        users: users.data,
        // image: config.imageUrl+users.image+'.jpg'
        newfirstname: '',
        newlastname: '',
        newposition: '',
        newemail: '',
        clickedID: '',
      });
      this.setState({loading:false})

      this.arrayholder = users.data
    });
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };

  searchFilterFunction = text => {
    this.setState({
      filterText: text,
    });

    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.firstName.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      users: newData,
    });
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Search Employees..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.filterText}
      />
    );
  };

  showDateTimePicker = () => {
    console.log('klikno')
    this.setState({ isDateTimePickerVisible: true });
  };
  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };
  handleDatePicked = date => {
    const select = moment(date).format("DD MM YYYY");
    this.setState({
      parsedDate: select,
      date
    });
    this.hideDateTimePicker();
  };

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
        image: `data:image/png;base64,${imageData.base64}`,
        showOptions: false
      })

    } else {
      let imageData = await ImagePicker.launchCameraAsync({
        base64: true,
        allowsEditing: false,
        quality: 0.2
      })
      console.log("Data: ", imageData);
      this.setState({
        image: `data:image/png;base64,${imageData.base64}`,
        showOptions: false
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
    this.setState({ isOpen: true, user: user, image: user.image, clickedID: user._id, newemail: user.email, newfirstname: user.firstName, newlastname: user.lastName, newposition: user.position });
  };
  _onPicturePress = user => {
    // console.log(user.firstName + 'editing profile');
  };
  closeModal = () => {
    this.setState({ 
      isOpen: false,
      user: {},
      parsedDate: null,
      date: null });
  };
  _pickImageHandler = () => {
    this.setState({ showOptions: !this.state.showOptions })
  }
  handleSubmit = () => {
    const person = {
      // _id:this.state.clickedID || undefined,
      firstName: this.state.newfirstname || undefined,
      lastName: this.state.newlastname || undefined,
      position: this.state.newposition || undefined,
      email: this.state.newemail || undefined,
      image: this.state.image || undefined
    };

    updateUsers(this.state.clickedID, person).then(data => {
      this.closeModal();
      this._refresh()
    });
  };

  openCalendar = () => {
    const month = moment(this.state.date).month();
    // console.log("TCL: People -> openCalendar -> this.state.date", this.state.date)
    const year = moment(this.state.date).year();
    const day = moment(this.state.date).day();//dodo
    this.closeModal();
    console.log('=============================================')
    this.props.navigation.navigate("Calendar", {
      id: this.state.user._id,
      month: month + 1,
      year,
      day
    });
  };

  formatDate = (badDate) => {
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
  onEditClick = () => {
    if (!this.state.edit) {
      this.setState({ edit: true });
    } else {
      this.setState({ edit: false });
    }
  };
  _keyExtractor = (item, index) => item._id;

  
  render() {
    // console.log(this.state)
    const { navigate } = this.props.navigation
    const { itemWrapper, firstName, avatar, profileWrapper, cameraWrapper } = styles;
    const { image, parsedDate } = this.state;
    const birthday = moment(this.state.user.birthday).format("MMMM Do YYYY");
    if(this.state.loading)return <Spinner animation={'LoadingCircle'}></Spinner>
    else return (
      <SafeAreaView style={styles.all}>
        <FlatList
          extraData={this.state.refresh}
          keyExtractor={this._keyExtractor}
          data={this.state.users}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => this._onPress(item)}>
              {item.image && (
                <ListItem
                  style={styles.listItem}
                  leftAvatar={{
                    title: item.firstName,
                    source: { uri: item.image }
                  }}
                  linearGradientProps={{
                    colors: ["#86c5f9", "#0C72CC"],
                    start: [1, 0],
                    end: [0.2, 0]
                  }}
                  titleStyle={{ color: "white", fontWeight: "bold" }}
                  title={item.firstName}
                  subtitle={item.position}
                  subtitleStyle={{ color: "white" }}
                  chevronColor="white"
                  chevron
                />
              )}
              {!item.image && (
                <ListItem
                  style={styles.listItem}
                  leftAvatar={{
                    title: item.firstName,
                    source: { AVATAR }
                  }}
                  linearGradientProps={{
                    colors: ["#86c5f9", "#0C72CC"],
                    start: [1, 0],
                    end: [0.2, 0]
                  }}
                  titleStyle={{ color: "white", fontWeight: "bold" }}
                  title={item.firstName}
                  subtitle={item.position}
                  subtitleStyle={{ color: "white" }}
                  chevronColor="white"
                  chevron
                />
              )}
            </TouchableOpacity>
          )}

        />
        <View style={styles.modalView}>
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
          <View id="MODAL">
            <View style={styles.modalHeader} id="HEADER">
            <ModalMenu></ModalMenu>
            <Text style={{ paddingBottom: 10 }}>
                {this.state.user.firstName + " " + this.state.user.lastName}
              </Text>
              <Text>X</Text>
              </View>
            <View style={styles.modalMain} id="SLIKAIDATETIMEPICKER">

            {this.state.image ? (
                <TouchableOpacity
                  onPress={this._pickImageHandler}
                  style={{ paddingBottom: 10 }}
                >
                  <Image
                    source={{ uri: this.state.image }}
                    style={avatar}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={this._pickImageHandler}
                  style={{ paddingBottom: 10 }}
                >
                  <Image
                    source={require("../../assets/profile.jpg")}
                    style={avatar}
                  />
                </TouchableOpacity>
              )}


              {!parsedDate ? (
                 <TouchableOpacity>
                <Button onPress={this.showDateTimePicker}  style={styles.Button}>
                  <Text style={styles.buttonText}>Show Datepicker</Text>
                </Button>
                </TouchableOpacity>
              ) : (
                <View>
                  <View>
                    <Text>{parsedDate}</Text>
                  </View>
                  <View>
                  <TouchableOpacity>
                    <Button onPress={this.openCalendar} style={styles.Button}>
                      <Text style={styles.buttonText}>Open calendar</Text>
                    </Button>
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <Button onPress={this.showDateTimePicker} style={styles.Button}>
                      <Text style={styles.buttonText}>Pick another date</Text>
                    </Button>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              <DateTimePicker
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this.handleDatePicked}
                onCancel={this.hideDateTimePicker}
              />
                   {this.state.showOptions && (
                <View style={cameraWrapper}>
                 
                  <TouchableOpacity>
                    <Button
                      color="#841584"
                      style={styles.btn2}
                      onPress={() => this._pickImage(true)}
                    >
                      <Text>Upload from gallery</Text>
                    </Button>
                  </TouchableOpacity>
                </View>
              )}
              </View><View />
            <View style={styles.modalInformation} id="INPUTFIELDS">
              {!this.state.edit && (
                <Button onPress={this.onEditClick} style={styles.Button}>
                  <Text style={styles.textStyle}>Edit this profile</Text>
                </Button>
              )}
              {!this.state.edit && (
                <View>
                  <Text>
                    Name: {this.state.user.firstName}{" "}
                    {this.state.user.lastName}
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
                    onChangeText={value =>
                      this.setState({ newemail: value })
                    }
                  />
                  {/* <Button onClick={this.closeModal}>
                <Text>Close</Text>
              </Button> */}
                </View>
              )}
              {this.state.edit && (
                <View style={styles.inln}>
                  <Button onPress={this.onEditClick} style={styles.Button}>
                    <Text style={styles.buttonText}>Dismiss</Text>
                  </Button>
                  <Button onPress={this.handleSubmit} style={styles.Button}>
                    <Text style={styles.buttonText}>Submit</Text>
                  </Button>
                </View>
              )}
            </View>
            <View style={styles.modalButtons} id="BUTTONS"></View>
          </View>   
        </RNModal>
        </View>
        </SafeAreaView>
    );
  }
}

const styles = {
  all: {
    marginTop: 23,
  },
  listContainer: {
    backgroundColor: '#0a59a9'
  },

  listItem: {
    backgroundColor: '#0a59a9',
    borderBottomColor: 'white',
    borderBottomWidth: 0.5,
  },
  itemWrapper: {
    padding: 15,
    backgroundColor: '#0a59a9'
  },
  firstName: {
    fontSize: 16,
    fontWeight: "500"
  },
  separator: {
    backgroundColor: "white"
  },
  image: {
    alignSelf: 'center',
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
    width: 200,
    height: 30,
    backgroundColor: 'rgba(255,255,255,0.7)',
    marginBottom: 10,
    color: 'black',
    paddingHorizontal: 10,
    borderRadius: 12,
    borderColor: "black",
    borderWidth: 0.5
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 25
  },
  inln: {

  },
  profileWrapper: {
    marginTop: -20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  informationWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    textAlign: "center",
    color: "white",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  Button: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a59a9',
    width: 130,
    height: 35,
    borderRadius: 20,
    alignItems: 'center',
  },
  btn2: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#55a6f6',
    width: 130,
    height: 35,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 20
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    paddingLeft: 20,
    paddingRight: 20
  },
  inln: {
    flexDirection: "row"
  },

  modalView:{

  },
  modalHeader:{
    Flex:1,
    flexDirection: "row",
    justifyContent: 'space-between',
    marginLeft:20,
    marginRight:20
  }
};