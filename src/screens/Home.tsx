import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Modal, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Image } from 'expo-image';
import {AppStyles} from '../styles/index';
import { onSnapshot, collection, getFirestore } from '@firebase/firestore';
import { f } from '../firebase/firebase';
import { useEffect, useState } from 'react';
import { Movie } from '../types/types';
import {Feather} from '@expo/vector-icons';
import { VideoScreen } from './VideoScreen';
import { useNavigation } from '@react-navigation/native';
import {VideoScreenProps} from './VideoScreen'
import { StackNavigationProp } from '@react-navigation/stack';

//https://picsum.photos/seed/696/200/100


type RootStackParamList = {
  // ... outras rotas ...
  VideoScreen: { UrlVideo: string };
};

type VideoScreenNavigationProp = StackNavigationProp<RootStackParamList, 'VideoScreen'>;

export function Home(){
    const [Movies, SetMovies] = useState<Array<Movie>>([]);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [showVideoScreen, setShowVideoScreen] = useState(false);
    
    const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
    
    const db = getFirestore(f);
    const archivesCollectionRef = collection(db, 'archives');

    useEffect(() => {

        const unsubscribe = onSnapshot(archivesCollectionRef, (querySnapshot) => {
            const moviesData: Movie[] = [];
            querySnapshot.forEach((doc) => {
                const movieData = doc.data() as Movie;
                moviesData.push(movieData);
                console.log(doc.data());
            });
            SetMovies(moviesData);
          }, (error) => {
            console.log('Erro ao buscar documentos:', error);
          });

        return () => unsubscribe();
    },[]);

    const openModal = (movie: Movie) => {
        setSelectedMovie(movie);
      };
    
    const closeModal = () => {
        setSelectedMovie(null);
        setShowVideoScreen(false);
    };

    
    const navigation = useNavigation<VideoScreenNavigationProp>();
    
    const openVideoScreen = () => {
        navigation.navigate('VideoScreen',{ UrlVideo: selectedMovie?.MovieDownloadUrl as string});
        //nav.navigation.navigate('VideoScreen',{ UrlVideo: selectedMovie?.MovieDownloadUrl as string });
    };

    
    return(
      <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
              {
                  Movies.map((movie, index) => (
                      <View key={index}>
                          <TouchableOpacity onPress={() => openModal(movie)}>
                              <Image
                                  style={{ width: 130, height: 191, marginBottom: 30 }}
                                  source={movie.CardDownloadUrl}
                                  placeholder={blurhash}
                                  contentFit="cover"
                                  transition={1000}   
                              />
                          </TouchableOpacity>
                      </View>
                  ))
              }

              <Modal visible={selectedMovie !== null} onRequestClose={closeModal}>
                  {selectedMovie && (
                      <View style={styles.modalContent}>
                      <Text style={AppStyles.TitleG}>{selectedMovie.Title}</Text>
                      <Image
                              style={{ width: 130, height: 191, marginBottom: 30, marginTop: 30 }}
                              source={selectedMovie.CardDownloadUrl}
                              placeholder={blurhash}
                              contentFit="cover"
                              transition={1000}   
                          />
                      <TouchableOpacity
                          style={styles.btn}
                          onPress={openVideoScreen}
                      >
                          <Feather name='play' style={{fontSize: 35, color: '#ffff', textAlign: 'center', marginTop: 6, marginLeft: 5}}/>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.DeleteButton}>
                          <Text style={styles.DeleteButtonText}>Excluir</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                          <Text style={styles.closeButtonText}>Fechar</Text>
                      </TouchableOpacity>
                      </View>
                  )}
              </Modal>

              <StatusBar style="inverted" />
          </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1A2E40',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#1A2E40',
      overflowY: 'visible',
      
    },
    scrollView: {
      backgroundColor: '#1A2E40',
      marginTop: 50,
    },
    image: {
        padding: 20,
        height: '15%',
        width: '50%',
      },
    block:{
        backgroundColor: '#ccccc',
        height: 190,
        width: 130
    },
    modalContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1A2E40',
      },
      modalImage: {
        width: 300,
        height: 300,
      },
      DeleteButton: {
        marginTop: 20,
        backgroundColor: '#D70202',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
      },
      DeleteButtonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16,
      },
      closeButton: {
        marginTop: 20,
        backgroundColor: '#ffffff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
      },
      closeButtonText: {
        color: '#D70202',
        fontWeight: 'bold',
        fontSize: 16,
      },
      btntext:{
        color: '#FFFFFF',
        fontSize: 20,
        marginTop: 5,
        textAlign: 'center',
    },
    btn: {
        backgroundColor: '#48D951',
        height: 50,
        width: 50,
        borderRadius: 50,
        textAlign: 'center',
    },
  });
  