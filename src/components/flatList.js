import React, { Component } from "react";
import { View, Text } from "react-native";
import FlatListItem from './flatListItem'

export default class FlatList extends Component {

    state = {
      loading: false,
      data: [],
    //   page: 1,
    //   seed: 1,
    //   error: null,
    //   refreshing: false,
    };
  
  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    // const { page, seed } = this.state;
    const url = this.props.url;
    this.setState({ loading: true });
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
        //   data: page === 1 ? res.results : [...this.state.data, ...res.results],
        //   error: res.error || null,
          data:res,
          loading: false,
        //   refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {/* <FlatListItem text="listitem"/> */}
        {/* {this.props.content.map(row => (
              <Text>{row[0]}</Text>
            ))} */}
      </View>
    );
  }
}