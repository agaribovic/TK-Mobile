// import React, { Component } from "react";
// import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
// import { getTasks } from "../service";
// import { Agenda } from "react-native-calendars";

// export default class Calendar extends Component {
//   state = {
//     navigationOptions: this.props.navigation.state.params,
//     items: []
//   };
//   componentDidMount() {
//     getTasks(this.state.navigationOptions).then(items => {
//       this.setState({
//         items: items.data
//       });
//     });
//   }
//   renderEmptyDate() {
//     return (
//       <View style={styles.emptyDate}>
//         <Text>This is empty date!</Text>
//       </View>
//     );
//   }

//   rowHasChanged(r1, r2) {
//     return r1.name !== r2.name;
//   }

//   timeToString(time) {
//     const date = new Date(time);
//     return date.toISOString().split("T")[0];
//   }

//   loadItems(day) {
//     setTimeout(() => {
//       for (let i = -15; i < 85; i++) {
//         const time = day.timestamp + i * 24 * 60 * 60 * 1000;
//         const strTime = this.timeToString(time);
//         if (!this.state.items[strTime]) {
//           this.state.items[strTime] = [];
//           const numItems = Math.floor(Math.random() * 5);
//           for (let j = 0; j < numItems; j++) {
//             this.state.items[strTime].push({
//               name: "Item for " + strTime,
//               height: Math.max(50, Math.floor(Math.random() * 150))
//             });
//           }
//         }
//       }
//       const newItems = {};
//       Object.keys(this.state.items).forEach(key => {
//         newItems[key] = this.state.items[key];
//       });
//       this.setState({
//         items: newItems
//       });
//     }, 1000);
//     // console.log(`Load Items for ${day.year}-${day.month}`);
//   }

//   renderItem(item) {
//     return (
//       <View style={[styles.item, { height: 50 }]}>
//         <TouchableOpacity onPress={() => console.log(item)}>
//           <Text>{item.name}</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   render() {
//     console.log(this.state.items);
//     return (
//       <View style={{ flex: 1 }}>
//         <Agenda
//           items={{
//             "2017-05-22": [{ text: "item 1 - any js object" }],
//             "2017-05-23": [{ text: "item 2 - any js object" }],
//             "2017-05-24": [],
//             "2017-05-25": [
//               { text: "item 3 - any js object" },
//               { text: "any js object" }
//             ]
//           }}
//           loadItemsForMonth={this.loadItems.bind(this)}
//           selected={"2017-05-16"}
//           renderItem={this.renderItem.bind(this)}
//           renderEmptyDate={this.renderEmptyDate.bind(this)}
//           rowHasChanged={this.rowHasChanged.bind(this)}
//           style={{ marginTop: 20 }}
//           // markingType={'period'}
//           // markedDates={{
//           //    '2017-05-08': {textColor: '#666'},
//           //    '2017-05-09': {textColor: '#666'},
//           //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
//           //    '2017-05-21': {startingDay: true, color: 'blue'},
//           //    '2017-05-22': {endingDay: true, color: 'gray'},
//           //    '2017-05-24': {startingDay: true, color: 'gray'},
//           //    '2017-05-25': {color: 'gray'},
//           //    '2017-05-26': {endingDay: true, color: 'gray'}}}
//           // monthFormat={'yyyy'}
//           // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
//           //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
//         />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   item: {
//     backgroundColor: "white",
//     flex: 1,
//     borderRadius: 5,
//     padding: 10,
//     marginRight: 10,
//     marginTop: 17
//   },
//   emptyDate: {
//     height: 15,
//     flex: 1,
//     paddingTop: 30
//   }
// });

import React, { Component } from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { getTasks } from "../service";
import { Agenda } from "react-native-calendars";

export default class Calendar extends Component {
  state = {
    navigationOptions: this.props.navigation.state.params,
    items: [],
    newItems:{}
  };

  componentDidMount() {
    getTasks(this.state.navigationOptions).then(items => {
      this.setState({
        //OVO JE HARD CODED DA GETA PODATKE IZ DECEMBRA 2017 GODINE, I OK JE NE DIRAJ
        items: items.data
      });
    });
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  }

  loadItems(day) {
    // setTimeout(() => {
      let date = "";
      let desc = "";
      let newItems={}
      this.state.items.forEach(element => {
        date = element.year + "-" + element.month + "-" + element.day;
        element.tasks.forEach(task => {
          desc = `[${task.hours}] hours ` + task.description;
          const strTime = date;
          newItems[strTime] = [{text: desc}]
          this.setState({
            newItems: newItems
          });
        });
      });
    // }, 1000);
  }
  renderItem(item) {
    return (
      <View style={[styles.item, { height: 100 }]}>
        <TouchableOpacity>
          <Text>{item.text}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    console.log(this.state.newItems)
    return (
      <View style={{ flex: 1 }}>
        <Agenda
          items={this.state.newItems}
          //           items={{
          //   '2017-05-22': [{text: 'item 1 - any js object'}],
          //   '2017-05-23': [{text: 'item 2 - any js object'}],
          //   '2017-05-24': [],
          //   '2017-05-25': [{text: 'item 3 - any js object'},{text: 'any js object'}]
          // }}
          loadItemsForMonth={this.loadItems.bind(this)}
          selected={"2017-12-16"}
          renderItem={this.renderItem.bind(this)}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
          style={{ marginTop: 20 }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  }
});
