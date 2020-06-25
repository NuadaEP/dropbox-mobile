import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import AsyncStorage from "@react-native-community/async-storage";

import api from "../../services/api";

import styles from "./styles";
import logo from "../../assets/logo.png";

export default class Main extends Component {
  state = {
    newBox: "",
    loading: false,
  };

  async componentDidMount() {
    const box = await AsyncStorage.getItem("@RocketBox: box");

    if (box) {
      this.props.navigation.navigate("Box");
    }
  }

  handleSignIn = async () => {
    try {
      this.setState({ loading: true });

      const response = await api.post("boxes", {
        title: this.state.newBox,
      });

      await AsyncStorage.setItem("@RocketBox: box", response.data._id);

      this.props.navigation.navigate("Box");
    } catch (error) {
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={logo} />
        <TextInput
          style={styles.input}
          placeholder="Crie uma box"
          placeholderTextColor="#999"
          autoCapitalize="none"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          value={this.state.newBox}
          onChangeText={(text) => this.setState({ newBox: text })}
        />

        <TouchableOpacity onPress={this.handleSignIn} style={styles.button}>
          {this.state.loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}> Criar </Text>
          )}
        </TouchableOpacity>
      </View>
    );
  }
}
