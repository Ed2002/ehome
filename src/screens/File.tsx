import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export const File = () => {

    const [fileUri, setFileUri] = useState<string>('');

    const pickFile = async () => {
        try {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
        });
        if (!result.canceled) {
            setFileUri(result.assets[0].uri);
        }
        } catch (error) {
        console.log('Error picking file:', error);
        }
    };

    return(
        <View style={styles.container}>
            <Text style={{color:'#48D951'}}>File</Text>
            <Text style={{color:'#48D951'}}>{fileUri !== '' ? "Arquivo Selecionado" : "Selecione um arquivo"}</Text>
            <TouchableOpacity
                onPress={pickFile}
                style={styles.btn}
            >
                <Text style={styles.btntext}>Buscar Arquivo</Text>
            </TouchableOpacity>
            <StatusBar style="inverted" />
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