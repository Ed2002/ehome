import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SingUp, SingIn } from '../firebase/autentication';
export function Login(){
    const [Email,SetEmail] = useState<string>('');
    const [Password,SetPassword] = useState<string>('');
    

    return(
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                placeholder='Email'
                onChangeText={text => SetEmail(text)}
            />
            <TextInput
                style={styles.textInput}
                placeholder='Senha'
                secureTextEntry
                onChangeText={text => SetPassword(text)}
            />
            <TouchableOpacity
                onPress={()=>{
                    SingIn(Email,Password);
                }}
                style={styles.btn}
                
            >
                <Text style={styles.btntext}>Entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={()=>{
                    SingUp(Email,Password);
                }}
                style={styles.btnoutline}
            >
                <Text style={styles.btntextoutline}>Registrar</Text>
            </TouchableOpacity>
            <StatusBar style="dark" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1A2E40',
      color: '#48D951',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textInput: {
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
        width: '85%',
        height: 45,
        padding: 10,
        marginBottom: 10,
    },
    btn: {
        backgroundColor: '#48D951',
        height: 40,
        width: '85%'
    },
    btnoutline:{
        marginTop: 10,
        borderWidth: 2,
        borderColor: '#48D951',
        height: 40,
        width: '85%'
    },
    btntextoutline:{
        color: '#48D951',
        fontSize: 20,
        marginTop: 5,
        textAlign: 'center',
    },
    btntext:{
        color: '#FFFFFF',
        fontSize: 20,
        marginTop: 5,
        textAlign: 'center',
    }
  });