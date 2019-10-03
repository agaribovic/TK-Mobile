import React, { Component } from 'react';
import {
  Text,
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import CloseIcon from '../assets/pics/close.png'
import CloseRoundedIcon from '../assets/pics/rounded_close.png';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class RNModal extends Component {
  render() {
    const { 
      children,
      visible,
      onClose,
      title,
      titleStyle,
      closeIcon,
      contentStyle,
      closeIconStyle, 
      style,
      closeIconRounded
     } = this.props;
    const { containerStyle, innerContainerStyle } = styles;
    return (
    <View>
      <Modal animationType="none" onRequestClose={() => { }} transparent visible={visible}
      swipeDirection={this.props.swipeDirection}
      onSwipe={this.props.onSwipe}
      >
        <View style={containerStyle}>
          <View style={[ innerContainerStyle, style ]}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Text style={[styles.titleStyle, titleStyle]}>{title}</Text>
            </View>
           
            </View>
            <View style={[styles.contentStyle, contentStyle]}>
              {children}
            </View>
          </View>
        </View>
      </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  containerStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  innerContainerStyle: {
    height: height * 0.7,
    width: width * 0.87,
    backgroundColor: 'white',
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 20
  },
  header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
  },
  headerLeft: {
      alignItems: 'flex-start',
      justifyContent: 'center',
      margin: 20
  },
  titleStyle: {
    fontWeight: 'bold'
  },
  headerRight: {
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      margin: 20
  },
  closeIcon: {
    width: 30,
    height: 30
  },
  contentStyle: {
    marginLeft: 20, 
    marginRight: 20
  }
});

export default RNModal; 