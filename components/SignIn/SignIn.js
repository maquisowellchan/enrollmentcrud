import * as React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from '../Styles/styles';
import { useState, useEffect } from 'react';

export default function SignIn({ navigation }){

    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
      fetch('http://10.0.2.2:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          password,
        }),
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Registration failed');
          }
        })
        .then(data => {
          const { token } = data;
        })
        .catch(error => {
          Alert.alert('Error', error.message);
        });
    };
    
    return(
        <>
        <View>
            <View style={{marginTop:75, marginLeft:25}}> 
                <Text style={{fontWeight:'600',fontSize:25,}}>Sign Up</Text>
                <Text style={{fontSize:16}}>It's quick and easy</Text>
            </View>
            <View style={{marginTop:10}}>
                <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, width:350, alignSelf:'center' }} />
            </View>
            <View style={{marginTop:75, alignItems:'center', justifyContent:'space-evenly', flexDirection:'column'}}>
                <TextInput value={firstname} onChangeText={text => setFirstname(text)} placeholder='First Name' style={[styles.textinput, { marginBottom: 15 }]}/>
                <TextInput value={lastname} onChangeText={text => setLastname(text)} placeholder='Last Name' style={[styles.textinput, { marginBottom: 15 }]}/>
                <TextInput value={email} onChangeText={text => setEmail(text)} placeholder='Email' style={[styles.textinput, { marginBottom: 15 }]}/>
                <TextInput value={password} onChangeText={text => setPassword(text)} placeholder='Password' style={[styles.textinput, { marginBottom: 15 }]}/>
            </View>
            <View style={{alignItems: 'center', marginTop: '6%'}}>
                <TouchableOpacity
                style={styles.button2}
                onPress={()=>{
                    navigation.navigate('Home');
                    handleRegister() }}>
                <Text style={[{fontSize: 20, fontWeight:'bold', color:'white'},{textAlign:'center'}]}>Sign Up</Text>
                </TouchableOpacity>
                </View>
        </View>
        </>
    )
}