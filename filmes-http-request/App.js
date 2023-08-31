import { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Filmes from './src/Filmes';

import api from './src/services/api';
import { ActivityIndicator } from '@react-native-material/core';

export default class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      filmes: [],
      loading: true
    };
  }



  async componentDidMount() {
    try {
      const response = await api.get("/r-api/?api=filmes");
      this.setState({
        filmes: response.data,
        loading: false
      });
    } catch (error) {
      alert("falha de requisição HTTP: " + error);
    }
  }

  render() {

    if (this.state.loading) {
      return(
        <View style={{alignItems: 'center', justifyContent:'center', flex:1}}>
          <ActivityIndicator color='#09A6FF' size={40} />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>

          <FlatList
            data={this.state.filmes}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => <Filmes data={item} />}
          />

        </View>
      );
    }


  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
});
