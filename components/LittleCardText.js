import { StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { View } from "react-native";

export const LittleCardText = (props) => {
    return (
        <View>
            <Text h4 style={styles.titleTitle}>{props.title}</Text>
            <Text style={styles.titleArtist}>Artiste(s) • {props.artists}</Text>
            <Text style={styles.titleItalic}>Album • {props.album}</Text>
            <Text style={styles.titleItalic}>Genre • {props.genre}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
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