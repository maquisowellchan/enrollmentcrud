import * as React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native';
import styles from '../Styles/styles';
import { useState, useEffect } from 'react';

export default function Login({ navigation }){
    
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
      fetch('http://10.0.2.2:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Invalid credentials');
          }
        })
        .then(data => {
          const { token } = data;
          navigation.navigate('Home');
        })
        .catch(error => {
          Alert.alert('Login Error', error.message, [
            {
              text: 'Go Back',
              onPress: () => navigation.navigate('Login'),
            },
          ]);
        });
    };
      

    return (
        <>
        <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          
        <View style={styles.container}>
            <View style={styles.logocontainer}>
                <Image source={require('../../assets/image/r6background.png')}
                style={styles.logo} />
            </View>
            <View style={{marginTop:10}}>
                <Text style={{textAlign:'center', fontSize:22, fontWeight:'800', color:'#3B8AC4'}}>Welcome to CRUD Application</Text>
            </View>
            <View style={styles.textinputcontainer}>
                <Text style={[{alignSelf: 'flex-start', marginLeft: '10%', color:'#242324', fontWeight:'400'}]}>Email</Text>
                <TextInput value={email} onChangeText={text => setEmail(text)} placeholder='youremail@gmail.com' style={styles.textinput} />
            </View>
            <View style={{marginTop:20, alignItems:'center'}}>
                <Text style={[{alignSelf: 'flex-start', marginLeft: '10%', color:'#242324', fontWeight:'400'}]}>Password</Text>
                <TextInput value={password} onChangeText={text => setPassword(text)} placeholder='********' style={styles.textinput} />
            </View>
            <View style={{alignItems: 'center', marginTop: '10%'}}>
                <TouchableOpacity
                style={styles.button3}
                onPress={()=>{
                    navigation.navigate('Home');
                    handleLogin() }}>
                <Text style={[{fontSize: 20, fontWeight:'bold', color:'white'},{textAlign:'center'}]}>Login</Text>
                </TouchableOpacity>
                </View>
                <View>
                    <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, width:300, alignSelf:'center' }} />
                </View>
                <View style={{alignItems: 'center', marginTop: '4%'}}>
                <TouchableOpacity
                style={styles.button2}
                onPress={()=>{
                    navigation.navigate('SignIn') }}>
                <Text style={[{fontSize: 20, fontWeight:'bold', color:'white'},{textAlign:'center'}]}>Sign In</Text>
                </TouchableOpacity>
                </View>
        </View>
        
        </KeyboardAvoidingView>
        
        </>
    )
}