import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../src/screens/Home';
import { Profile } from '../src/screens/Profile';
import { File } from '../src/screens/File';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import {Feather} from '@expo/vector-icons';
import { Login } from '../src/screens/Login';
import { useEffect, useState } from 'react';
import {getAuth, onAuthStateChanged } from "@firebase/auth";
import { f } from '../src/firebase/firebase';
import { SetUser } from '../src/firebase/autentication';
import { RootStackParamList, VideoScreen } from '../src/screens/VideoScreen';


type VideoScreenRouteProp = RouteProp<RootStackParamList, 'VideoScreen'>;


const {Navigator,Screen} = createBottomTabNavigator<RootStackParamList>();

export function Routes(){

    const [SingIn,SetSingIn] = useState<boolean>(false);

    onAuthStateChanged(getAuth(f), user => {
        if(user)
        {
            console.log(user);
            SetSingIn(true);
            SetUser(user);
        }
    });


    return(
        <NavigationContainer>
            {!SingIn ? (
                <Login/>
            ) : (
                <>
                <Navigator screenOptions={{
                    headerShown: false,
                    tabBarInactiveBackgroundColor: '#58A664',
                    tabBarInactiveTintColor: '#ffffff',
                    tabBarActiveBackgroundColor: '#48D951',
                    tabBarActiveTintColor: '#ffffff'
                }}>
                    <Screen name="Home" component={Home} options={{
                        tabBarIcon: ({size, color}) => <Feather name='home' size={size} color={color}/>,
                    }}/>
                    <Screen name="Adicionar" component={File} options={{
                        tabBarIcon: ({size, color}) => <Feather name='plus' size={size} color={color}/>,
                    }}/>
                    <Screen name="Profile" component={Profile} options={{
                        tabBarIcon: ({size, color}) => <Feather name='user' size={size} color={color}/>
                    }}/>
                    <Screen name="VideoScreen"   component={VideoScreen as any} initialParams={{UrlVideo: ''}} options={{ 
                        tabBarIcon: ({size, color}) => <Feather name='film' size={size} color={color}/>    
                    }}/>
                </Navigator>
                </>
            )}
        </NavigationContainer>
    );
}
