import React from 'react';
import LottieView from 'lottie-react-native';
import Karam from '../assets/animations/karam.json'
import LoadingCircle from '../assets/animations/circle.json'
import Calendar from '../assets/animations/calendar.json'
export default class BasicExample extends React.Component {
  render() {
    if(this.props.animation=='LoadingCircle')
    return <LottieView source={LoadingCircle} autoPlay loop />;
    else if(this.props.animation=='Calendar')
    return <LottieView source={Calendar} autoPlay loop />;
  }
}