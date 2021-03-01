import React, { Component } from "react";
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  Image,
  ActivityIndicator,
} from "react-native";

export default class App extends Component {
  state = {
    data: [],
    page: 5,
    isLoading: false,
    isListEnd: false, //For List End No Extra Api Call
  };

  componentDidMount() {
    this.setState({ isLoading: true }, this.getData);
  }

  getData = () => {
    //if block for No extra APi Call
    console.log("Api Call");
    const apiURL =
      "https://jsonplaceholder.typicode.com/photos?_limit=1000&_page=" +
      this.state.page;
    fetch(apiURL)
      .then((res) => res.json())
      .then((response) => {
        this.setState({
          data: this.state.data.concat(response),
          isLoading: false,
        });
      });
  };

  renderRow = ({ item }) => {
    return (
      <View style={styles.itemRow}>
        <Image source={{ uri: item.url }} style={styles.image} />
        <Text style={styles.itemText}>{item.title}</Text>
        <Text style={styles.itemText}>{item.id}</Text>
      </View>
    );
  };

  handleLoadMoreData = () => {
    this.setState({ page: this.state.page + 1, isLoading: true }, this.getData);
  };

  renderFooter = () => {
    return this.state.isLoading ? (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    ) : null;
  };

  render() {
    return (
      <FlatList
        style={styles.container}
        data={this.state.data}
        renderItem={this.renderRow}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={this.handleLoadMoreData}
        onEndReachedThreshold={0.5}
        ListFooterComponent={this.renderFooter}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    backgroundColor: "#f5fcff",
  },

  itemRow: {
    borderBottomColor: "#ccc",
    marginBottom: 10,
    borderBottomWidth: 1,
  },
  itemText: {
    fontSize: 16,
    padding: 5,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },

  loader: {
    backgroundColor: "red",
    marginTop: 10,
    alignItems: "center",
  },
});
