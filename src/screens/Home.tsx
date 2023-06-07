import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import {AppStyles} from '../styles/index';

//https://picsum.photos/seed/696/200/100

export function Home(){
    const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
    return(
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={require("../assets/upgrade.png")}
                placeholder={blurhash}
                contentFit="cover"
                transition={1000}   
            />
            <Text style={AppStyles.TitleW}>Curta mais hoje mesmo!</Text>
            <Text style={AppStyles.ParagraphG}>Seja Premium</Text>
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
  