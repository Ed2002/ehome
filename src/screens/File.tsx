import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export const File = () => {
    return(
        <View style={styles.container}>
            <Text style={{color:'#48D951'}}>File</Text>
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
  });