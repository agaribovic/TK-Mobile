// import React from "react";
// import { Text, View, Button,TouchableOpacity } from "react-native";
// import Menu, { MenuItem, MenuDivider, Position } from "react-native-enhanced-popup-menu";
 
// const ModalMenu = (props) => {
//   let textRef = React.createRef();
//   let menuRef = null;
 
//   const setMenuRef = ref => menuRef = ref;
//   const hideMenu = () => menuRef.hide();
//   const showMenu = () => menuRef.show(textRef.current, stickTo = Position.BOTTOM_CENTER);
//   const onPress = () => {
//     showMenu();
//   }
 
//   return (
//     <View style={{ alignItems: "center", backgroundColor: "white" }}>
//       <TouchableOpacity>
//         <Text style={styles.dots} onPress={onPress}>
//           ...
//         </Text>
//       </TouchableOpacity>

//       <Menu ref={setMenuRef}>
//         <MenuItem onPress={hideMenu}>Edit profile</MenuItem>
//         <MenuItem onPress={() => this._pickImage(false)}>
//           >Upload a photo
//         </MenuItem>
//         <MenuItem onPress={hideMenu} disabled>
//           Pick a photo from gallery
//         </MenuItem>
//         {/* <MenuDivider /> */}
//         <MenuItem onPress={hideMenu}>Close</MenuItem>
//       </Menu>
//     </View>
//   );
// };
// const styles = {
//     dots: {
//       fontSize: 40,
//     }
   
// }
// export default ModalMenu;
import React from 'react';
 
import { View, Text } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
 
class ModalMenu extends React.PureComponent {
  _menu = null;
 
  setMenuRef = ref => {
    this._menu = ref;
  };
 
  hideMenu = () => {
    this._menu.hide();
  };
 
  showMenu = () => {
    this._menu.show();
  };
  editUser=()=>{
    this.props.edit()
    this._menu.hide();
  }
  showDate=()=>{
    this.props.showDate()
    this._menu.hide()
  }
  camera=()=>{
    this.props.pic(false)
    this._menu.hide()
  }
  gallery=()=>{
    this.props.pic(true)
    this._menu.hide()
  }
  render() {
    return (
      // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View>
        <Menu
          ref={this.setMenuRef}
          button={<Text onPress={this.showMenu} style={{fontSize:40}}>...</Text>}
        >
          <MenuItem onPress={this.editUser}>Edit user</MenuItem>
          <MenuItem onPress={this.showDate}>See calendar</MenuItem>
          <MenuItem onPress={this.camera}>Take a new photo</MenuItem>
          <MenuItem onPress={this.gallery}>Upload from gallery</MenuItem>
        </Menu>
      </View>
    );
  }
}
 
export default ModalMenu;