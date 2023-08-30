import { StatusBar } from 'expo-status-bar';
import { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppBar } from "@react-native-material/core";

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      numero: 0,
      btn: 'START',
      last: null
    };

    //Variavel do timer do relogio
    this.timer = null;

    this.start = this.start.bind(this);
    this.clear = this.clear.bind(this);
  }

  start() {

    if (this.timer != null) {
      clearInterval(this.timer);
      this.timer = null;

      this.setState({ btn: 'START' })

    } else {

      this.timer = setInterval(() => {
        this.setState({ numero: this.state.numero + 0.1 })
      }, 100);

      this.setState({ btn: 'STOP' })
    }
  }

  clear() {
    if (this.timer != null) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.setState({
      last: this.state.numero,
      numero: 0,
      btn: 'START'
    })
  }


  render() {
    return (
      <View style={styles.container}>

        <View style={{ flex: 1, height:40 }}>
          <AppBar title="Cronometro" color='white' />
        </View>
        
        
        <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
          <Image
            source={require('./src/cronometro.png')}
            style={styles.cronometro}
          />

          <Text style={styles.timer}>{this.state.numero.toFixed(1)}</Text>


          <View style={styles.btnArea}>
            <TouchableOpacity style={styles.btn} onPress={this.start}>
              <Text style={styles.btnTexto}>{this.state.btn}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={this.clear}>
              <Text style={styles.btnTexto}>Clear</Text>
            </TouchableOpacity>
          </View>


          <View style={styles.lastArea}>
            <Text style={styles.last}>
              {this.state.last > 0 ? 'Último tempo: ' + this.state.last.toFixed(1) : ''}
            </Text>
          </View>
      
        </View>
      </View>



    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00aeef',
    //alignItems: 'center',
    //justifyContent: 'center',
  },

  timer: {
    marginTop: -160,
    color: '#FFF',
    fontSize: 65,
    fontWeight: 'bold'
  },

  btnArea: {
    flexDirection: 'row',
    marginTop: 80,
    height: 40
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    height: 40,
    margin: 17,
    borderRadius: 9
  },
  btnTexto: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00aeef'
  },
  lastArea: {
    marginTop: 40,
  },

  last: {
    fontSize: 25,
    fontStyle: 'italic',
    color: '#FFF'
  }
});
