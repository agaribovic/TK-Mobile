import React, { Component } from "react";
import { TouchableOpacity, Text } from "react-native";

export default class Button extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        // style={[{ width: this.props.width }, styles.buttonStyle]}>
        style = {this.props.style}>
        <Text style={styles.textStyle}>{this.props.children}</Text>
      </TouchableOpacity>     
    );
  }
}
const styles = {
  textStyle: {
    textAlign: "center",
    color: "#0a59a9"
  },
  buttonStyle: {
    backgroundColor: "#ffffff",
    paddingVertical: 15,
    marginBottom: 20,
    marginLeft: 50,
    marginRight: 50,
    borderRadius: 12
   }
};
