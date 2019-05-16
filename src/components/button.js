import React, { Component } from "react";
import { TouchableOpacity, Text } from "react-native";

export default class Button extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={[{ width: this.props.width }, styles.buttonStyle]}>
        <Text style={styles.textStyle}>{this.props.children}</Text>
      </TouchableOpacity>
    );
  }
}
const styles = {
  textStyle: {
    textAlign: "center",
    color: "#0a59a9"
    // color :"#222",
    // fontSize: 14,
    // fontWeight: '600',
    // paddingTop: 10,
    // paddingBottom: 10
  },
  buttonStyle: {
    backgroundColor: "#ffffff",
    paddingVertical: 15,
    marginBottom: 20,
    marginLeft: 50,
    marginRight: 50,
    borderRadius: 12
    // backgroundColor: '#f2f2f2',
    // borderRadius: 2,
    // borderWidth: 1,
    // borderColor: '#e1e1ea',
    // paddingLeft: 10,
    // paddingRight: 10
  }
};
