import { View, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux"
import { Card, Rating } from 'react-native-elements';
import { filteredSongsSelector } from "./songsSlice"
import { ButtonFilter } from "./ButtonFilter";
import { LittleCardText } from "./LittleCardText";

const Songs = () => {
    const songs = useSelector(filteredSongsSelector);

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <ButtonFilter
                    title={"Rock Only"}
                    dispatch={"Rock"}
                />
                <ButtonFilter
                    title={"Tous"}
                    dispatch={"all"}
                />
            </View>
            <FlatList
                data={songs}
                extraData={songs}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Card>
                        <LittleCardText
                            title={item.song.trackName}
                            artists={item.song.artistName}
                            album={item.song.collectionName}
                            genre={item.song.primaryGenreName}
                        />
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
    row: {
        justifyContent: "center",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    titleTitle: {
        color: '#8EDBBE'
    },
    titleArtist: {
        fontSize: 16
    },
    titleItalic: {
        fontStyle: 'italic'
    }
});

export default Songs;