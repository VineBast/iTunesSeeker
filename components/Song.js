import { useState } from "react";
import { useRoute } from '@react-navigation/native';
import { Card, Text, Button } from 'react-native-elements';
import { View, StyleSheet, StatusBar } from "react-native"
import { Rating } from 'react-native-ratings';
import { useDispatch } from "react-redux";
import { add } from "./songsSlice";

const Song = ({ navigation }) => {
    const dispatch = useDispatch();
    const route = useRoute();
    const [song] = useState(route.params);
    const [rate, setRate] = useState('');

    const addSong = () => {
        song.rate = rate;
        dispatch(add(song));        
        navigation.navigate("HomeStack");
    }

    return (
        <View>
            <Card>
                <Card.Title ><Text h4 style={styles.titleTitle}>{song.trackName}</Text></Card.Title>
                <Card.Divider />
                <Card.Image source={{ uri: song.artworkUrl100 }} />
                <View style={styles.button}>
                    <Button title="Ajouter à la liste"
                        buttonStyle={styles.buttonStyle}
                        onPress={addSong} 
                    />
                </View>
                <Card.Divider />
                <Text style={styles.titleBold}>Artistes :</Text>
                <Text style={styles.details}>{song.artistName}</Text>
                <Text style={styles.titleBold}>Genre :</Text>
                <Text style={styles.details}>{song.primaryGenreName}</Text>
                <Text style={styles.titleBold}>Album :</Text>
                <Text style={styles.details}>{song.collectionName}</Text>
                <Text style={styles.titleBold}>Note :</Text>
                <Rating
                    style={styles.padding3}
                    type='custom'
                    imageSize={25}
                    ratingCount={10}
                    size={10}
                    defaultRating={5}
                    onFinishRating={setRate}
                    ratingColor='#FFE656'
                />                
            </Card>
            <StatusBar syle='auto' />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    padding3: {
        padding: 3
    },
    buttonStyle: {
        backgroundColor: '#8EDBBE',
        borderRadius: 5,
    },
    button: {
        padding: 2,
    },
    titleBold: {
        fontWeight: 'bold',
        fontSize: 15
    },
    details: {
        padding: 3,
        color: 'grey'
    }
});

export default Song;