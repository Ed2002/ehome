import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../src/screens/Home';
import { Profile } from '../src/screens/Profile';
import { File } from '../src/screens/File';
import { NavigationContainer } from '@react-navigation/native';
import {Feather} from '@expo/vector-icons';
import { Login } from '../src/screens/Login';

const {Navigator,Screen} = createBottomTabNavigator();

export function Routes(){

    const auth = false;

    return(
        <NavigationContainer>
            {!auth ? (
                <Login/>
            ) : (
                <Navigator screenOptions={{
                    headerShown: false,
                    tabBarInactiveBackgroundColor: '#58A664',
                    tabBarInactiveTintColor: '#ffffff',
                    tabBarActiveBackgroundColor: '#48D951',
                    tabBarActiveTintColor: '#ffffff',
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
                </Navigator>
            )}
        </NavigationContainer>
    );
}
