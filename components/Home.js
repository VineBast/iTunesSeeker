import { SearchBar, Card, Text } from 'react-native-elements';
import { FlatList, StyleSheet, View, TouchableOpacity, StatusBar, TextInput } from 'react-native';
import { useEffect, useState } from 'react';

const createRequest = (search) => {
    return ('https://itunes.apple.com/search?term=' + search + '&attribute=mixTerm&country=fr&sort=popular&limit=20');
}

const Home = ({ navigation }) => {
    const [search, onChangeSearch] = useState('');
    const [songsList, setSongsList] = useState([]);

    const findRequest = async () => {
        let req = await fetch(createRequest(search));
        let songInfos = await req.json();
        setSongsList(songInfos);
    }

    useEffect(() => {
        if (search) {
            findRequest();
        } else {
            setSongsList([]);
        }
    }, [search]);

    return (
        <View style={styles.container}>
            <View>
                <SearchBar
                    placeholder='Rechercher par titre et/ou artiste...'
                    round='true'
                    value={search}
                    onChangeText={onChangeSearch}
                    containerStyle={{ backgroundColor: 'white', width: '100%' }}
                    inputContainerStyle={{ backgroundColor: 'white' }}
                    lightTheme='true'
                />
                <FlatList
                    data={songsList.results}
                    extraData={songsList.results}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Détails", item)}>
                            <Card>
                                <Text h4 style={styles.titleTitle}>{item.trackName}</Text>
                                <Text style={styles.titleArtist}>Artiste(s) • {item.artistName}</Text>
                                <Text style={styles.titleAlbum}>Album • {item.collectionName}</Text>
                            </Card>
                        </TouchableOpacity>
                    )}
                />
            </View>
            <StatusBar syle='auto' />
        </View>

    );
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

export default Home;