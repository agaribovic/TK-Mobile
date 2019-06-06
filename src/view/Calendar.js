import React, { Component } from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { getTasks } from "../service";
import { Agenda } from "react-native-calendars";
import Spinner from '../components/spinner'

export default class Calendar extends Component {
  state = {
    navigationOptions: this.props.navigation.state.params,
    items: [],
    newItems:{},
    loading:false
  };

  componentDidMount() {

    this.setState({loading:true})
    getTasks(
      this.state.navigationOptions).then(items => {
      this.setState({
        //OVO JE HARD CODED DA GETA PODATKE IZ DECEMBRA 2017 GODINE, I OK JE NE DIRAJ
        items: items.data,
        loading:false
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

  loadItems(day) { // mzoda treba dodat mehaniku da se ubacuju prazni entries
      //  setTimeout(() => {
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
    // console.log(this.state.newItems)
    if(this.state.loading) return <Spinner animation={'Calendar'}></Spinner>
    else return (
      <View style={{ flex: 1 }}>
        <Agenda
          items={this.state.newItems}
          loadItemsForMonth={this.loadItems.bind(this)}
          selected={"2017-11-12"}// 12.11. kareem brindle ima unesenih taskova, inace kalendar loada prazno, treba napravit empty entries
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
