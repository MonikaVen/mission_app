import * as React from 'react';
import { Button, StyleSheet, TextInput, Image } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import axios from 'axios';


export default function TabOneScreen() {
  const [messageState, setMessageState] = React.useState('')
  const [value, onChangeText] = React.useState('');
  const [message, setMessage] = React.useState({ value});
  const [history, setHistory] = React.useState({});
  const sendMessage = () => {
    setMessage({value})
    setHistory({history: message})
    axios.post('http://ec2-52-15-90-21.us-east-2.compute.amazonaws.com:3000/earth', message).then((res) => console.log(res));
  } 
  function retrieveMessage() {
    setMessageState('Retrieving message...');
    setTimeout(()=> axios.get('http://esa-archive.hellomars.co:3000/earth').then((res)=> setMessageState(res.data)), 5000)
  }
  return (
    <View style={styles.container}>
      <View style={styles.container2}>
      <Image source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Earth_Western_Hemisphere_transparent_background.png'}}
        style={{width: 100, height: 100}} />
      <Image source={{uri: 'https://i.dlpng.com/static/png/6474802_preview.png'}}
        style={{width: 90, height: 90}} />
      </View>

      <TextInput 
        placeholder="Type message for Earth"
        onChangeText={text => onChangeText(text)}
        value={value}
        blurOnSubmit={true}
      />
      <Text>{history.history}</Text>
      <Text>{messageState}</Text>
      <View style={styles.container2}>
        <Button title="Connection Earth" onPress={retrieveMessage} style={styles.item}></Button>
        <Button title="Message Earth" onPress={sendMessage} style={styles.item}></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start' // if you want to fill rows left to right
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  item: {
    width: '40%', // is 50% of container width
    padding: '5em',
  }
});
