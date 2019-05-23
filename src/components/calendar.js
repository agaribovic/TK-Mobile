import { Calendar } from 'react-native-calendars';
import { View } from 'react-native';
import React from 'react';

export default class Example extends React.Component {
  
  render() {
    const currentDate=new Date().getFullYear() + '-' + new Date().getMonth() +'-'+new Date().getDay()
    const minDate=(new Date().getFullYear()-1) + '-' + new Date().getMonth() +'-'+new Date().getDay()
    const maxDate=(new Date().getFullYear()-1) + '-' + new Date().getMonth() +'-'+new Date().getDay()
    return (
      <View style={{ paddingTop: 50, flex: 1 }}>
        <Calendar
          // Initially visible month. Default = Date()
          current={this.currentDate}

          // current={}
          // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
          minDate={this.minDate}
          // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
          maxDate={this.maxDate}
          // Handler which gets executed on day pres\s. Default = undefined
          onDayPress={day => {
            console.log('selected day', day);
          }}
          // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
          monthFormat={'dd MM yyyy'}
          // Handler which gets executed when visible month changes in calendar. Default = undefined
          onMonthChange={month => {
            console.log('month changed', month);
          }}
          // Hide month navigation arrows. Default = false
          hideArrows={true}
          // Do not show days of other months in month page. Default = false
          hideExtraDays={true}
          // If hideArrows=false and hideExtraDays=false do not swich month when tapping on greyed out
          // day from another month that is visible in calendar page. Default = false
          disableMonthChange={true}
          // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
          firstDay={1}
        />
      </View>
    );
  }
}

const styles = {
  container:{
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0C72CC',

  }
}
