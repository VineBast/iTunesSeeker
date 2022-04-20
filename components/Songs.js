import { View, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux"
import { Card, Text, Rating } from 'react-native-elements';
import { songsSelector } from "./songsSlice"

const Songs = () => {
    const songs = useSelector(songsSelector);

    return (
        <View style={styles.container}>
            <FlatList
                data={songs}
                extraData={songs}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Card>
                        <Text h4 style={styles.titleTitle}>{item.song.trackName}</Text>
                        <Text style={styles.titleArtist}>Artiste(s) • {item.song.artistName}</Text>
                        <Text style={styles.titleAlbum}>Album • {item.song.collectionName}</Text>
                        <Rating
                            type='custom'
                            readonly
                            startingValue={item.song.rate}
                            imageSize={25}
                            ratingCount={10}
                            size={10}
                            ratingColor='#FFE656'
                        />
                    </Card>
                )} />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    titleTitle: {
        color: '#8EDBBE'
    },
    titleArtist: {
        fontSize: 16
    },
    titleAlbum: {
        fontStyle: 'italic'
    }
});

export default Songs;