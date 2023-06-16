import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { File as FileType, Movie } from '../types/types';
import { User } from '../firebase/autentication';
import { addDoc, collection, getFirestore } from '@firebase/firestore';
import { f } from '../firebase/firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from '@firebase/storage';

export const File = () => {

    const [CardUri, setCardUri] = useState<string>('');
    const [MovieUri, setMovieUri] = useState<string>('');
    const [Title, setTitle] = useState<string>('');

    const handleUpload = async () => {

        try
        {
            const card = await UploadCard();

            console.log(card);
    
            const movie = await UploadMovie();
    
            console.log(movie);
    
            const File:Movie = {
                IdUser: User?.uid,
                CardFilename: card?.FileName as string,
                CardDownloadUrl: card?.FileUrl as string,
                MovieDownloadUrl: movie?.FileUrl as string,
                MovieFilename: movie?.FileName as string,
                Title: Title
            }
    
            const archivesRef = collection(getFirestore(f),'archives');
    
            addDoc(archivesRef,File);
    
            console.log("Upload!");
        }
        catch(errors)
        {
            alert('Erro ao enviar upload!');
        }
    };

    const UploadCard = async () => {
        try {
            const storage = getStorage(f);
            const response = await fetch(CardUri);
            const blob = await response.blob();
            const filename = CardUri.substring(CardUri.lastIndexOf('/') + 1);
            const Storageref =  ref(storage, 'images/' + filename);

            await uploadBytes(Storageref, blob);
            const downloadURL = await getDownloadURL(Storageref);
            console.log('Arquivo enviado com sucesso!');
            console.log('URL de download:', downloadURL);
            const FileCard:FileType = {
                FileName: filename,
                FileUrl: downloadURL
            }
            console.log('File uploaded and saved to Firestore successfully.');
            return FileCard;
          } catch (error) {
            console.log('Error uploading file:', error);
          }
    }

    const UploadMovie = async () => {
        try {
            const storage = getStorage(f);
            const response = await fetch(MovieUri);
            const blob = await response.blob();
            const filename = MovieUri.substring(MovieUri.lastIndexOf('/') + 1);
            const Storageref = ref(storage, 'images/' + filename);

            await uploadBytes(Storageref, blob);
            const downloadURL = await getDownloadURL(Storageref);
            console.log('Arquivo enviado com sucesso!');
            console.log('URL de download:', downloadURL);
            const FileMovie:FileType = {
                FileName: filename,
                FileUrl: downloadURL
            }
            console.log('File uploaded and saved to Firestore successfully.');
            return FileMovie;
          } catch (error) {
            console.log('Error uploading file:', error);
          }
    }

    const pickMovie = async () => {
        try {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        });
        if (!result.canceled) {
            setMovieUri(result.assets[0].uri);
        }
        } catch (error) {
        console.log('Error picking file:', error);
        }
    };

    const pickCard = async () => {
        try {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
        });
        if (!result.canceled) {
            setCardUri(result.assets[0].uri);
        }
        } catch (error) {
        console.log('Error picking file:', error);
        }
    };

    return(
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                placeholder='Titulo'
                onChangeText={text => setTitle(text)}
            />
            <Text style={{color:'#48D951'}}>File</Text>
            <Text style={{color:'#48D951'}}>{CardUri !== '' ? "Arquivo Selecionado" : "Selecione um arquivo"}</Text>
            <TouchableOpacity
                onPress={pickCard}
                style={styles.btn}
            >
                <Text style={styles.btntext}>Buscar Card</Text>
            </TouchableOpacity>
            <Text style={{color:'#48D951'}}>{MovieUri !== '' ? "Arquivo Selecionado" : "Selecione um arquivo"}</Text>
            <TouchableOpacity
                onPress={pickMovie}
                style={styles.btn}
            >
                <Text style={styles.btntext}>Buscar Filme</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={handleUpload}
                style={styles.btn}
            >
                <Text style={styles.btntext}>UPLOAD</Text>
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
        width: '85%',
        marginTop: 15,
    },
  });