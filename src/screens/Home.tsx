import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import {AppStyles} from '../styles/index';
import { onSnapshot, collection, getFirestore } from '@firebase/firestore';
import { f } from '../firebase/firebase';
import { useEffect, useState } from 'react';
import { Movie } from '../types/types';

//https://picsum.photos/seed/696/200/100

export function Home(){
    const [Movies, SetMovies] = useState<Array<Movie>>([]);
    
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

    
    
    return(
        <View style={styles.container}>
            {
                Movies.map((movie, index) => (
                    <View key={index}>
                        <Image
                            style={{ width: 130, height: 191, marginBottom: 30 }}
                            source={movie.CardDownloadUrl}
                            placeholder={blurhash}
                            contentFit="cover"
                            transition={1000}   
                        />
                    </View>
                ))
            }
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
    image: {
        padding: 20,
        height: '15%',
        width: '50%',
      },
    block:{
        backgroundColor: '#ccccc',
        height: 190,
        width: 130
    }
  });
  