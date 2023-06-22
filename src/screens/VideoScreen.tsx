import { ResizeMode } from "expo-av";
import Video from "expo-av/build/Video";
import { useRef, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { set } from "firebase/database";
import { AppStyles } from "../styles";
import { Image } from 'expo-image';

export interface VideoScreenProps {
  UrlVideo: string;
}

export type RootStackParamList = {
  VideoScreen: { UrlVideo: string };
  Home: undefined;
  Adicionar: undefined;
  Profile: undefined;
};

type VideoScreenRouteProp = RouteProp<RootStackParamList, 'VideoScreen'>;
type VideoScreenNavigationProp = StackNavigationProp<RootStackParamList, 'VideoScreen'>;


export interface VideoScreenProps {
  route: VideoScreenRouteProp;
  navigation: VideoScreenNavigationProp;
}

export const VideoScreen = ({route,navigation}:VideoScreenProps) => {
    const nav = useNavigation<VideoScreenNavigationProp>();
    const {UrlVideo} = route.params;
    const video = useRef(null);
    const [status, setStatus] = useState<any>({});
    const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
    
    return (
        <View style={styles.container}>
          {UrlVideo === '' ? (
            <>
              <Image
                  style={{ width: '100%', height: 200, marginBottom: 30 }}
                  source={require("../assets/empty.png")}
                  placeholder={blurhash}
                  contentFit="none"
                  transition={1000}   
              />
              <Text style={AppStyles.TitleG}>Não a nada para ver!</Text>
            </>
          ) : (
            <>
              <Video
                ref={video}
                source={{
                  uri: UrlVideo,
                }}
                style={styles.video}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                isLooping={false}
                onPlaybackStatusUpdate={status => setStatus(() => status)}
              />
            </> 
            )}
          </View>
      );


}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#1A2E40',
    },
    video: {
      flex: 1,
      alignSelf: 'stretch'
    }
});