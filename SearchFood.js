import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default class SearchFood extends React.Component {
  constructor() {
    super();
    this.state = {
      foodString: "",
      response: "",
    };
  }
  fetchFood = async () => {
    var link1 = "https://api.edamam.com/api/food-database/v2/parser?ingr=";
    var link2 = "&app_id=52d8ccd5&app_key=b2d772a5059f588db0ec00e0a06c16f5";
    var link3 = this.state.foodString.split();
    for (var i in link3) {
      if (i === " ") {
        i = "%20";
      }
    }
    var link = link1 + link3 + link2;

    var response = await fetch(link);
    var responseJSON = await response.json();
    // var responseJSON = await JSON.parse(response);
    console.log(responseJSON);

    this.setState({
      response: responseJSON.parsed[0].food.nutrients,
    });
    console.log(this.state.response);
  };
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{ backgroundColor: "red" }}
          placeholder={this.foodString}
          value={this.foodString}
          onChangeText={(text) => {
            this.setState({
              foodString: text,
            });
          }}
        />
        <TouchableOpacity onPress={this.fetchFood} backgroundColor="purple">
          <Text>Search</Text>
        </TouchableOpacity>
        {/* {this.state.response?
        this.state.response.map((item, index) => { */}
        {this.state.response ? (
        
          <View>
            <Text>Energy {this.state.response.ENERC_KCAL}</Text>
            <Text>Carbohydrate {this.state.response.CHOCDF}</Text>
            <Text>Fat {this.state.response.FAT}</Text>
            <Text>Fibre {this.state.response.FIBTG}</Text>
            <Text>Protein {this.state.response.PROCNT}</Text>
          </View>
        ) : 
        null}

        <TouchableOpacity>
          <Text>Add</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
