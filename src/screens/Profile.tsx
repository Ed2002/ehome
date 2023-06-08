import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Logout, User } from '../firebase/autentication';
import { AppStyles } from '../styles';
import { Timestamp } from 'firebase/firestore';

export function Profile(){
    return(
        <View style={styles.container}>
            <Text style={AppStyles.TitleG}>Logado Como</Text>
            <Text style={AppStyles.TitleW}>{User?.email}</Text>
            <TouchableOpacity
                onPress={()=>{
                    Logout();
                }}
                style={styles.btn}
                
            >
                <Text style={styles.btntext}>SAIR</Text>
            </TouchableOpacity>
            <StatusBar style="inverted" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1A2E40',
      alignItems: 'center',
      justifyContent: 'center',
    },
    btntext:{
        color: '#FFFFFF',
        fontSize: 20,
        marginTop: 5,
        textAlign: 'center',
    },
    btn: {
        backgroundColor: '#48D951',
        height: 40,
        width: '85%',
        marginTop: 15,
    },
  });
  