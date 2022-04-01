import { SearchBar, Tab, TabView, Card, Text } from 'react-native-elements';
import { FlatList, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { Rating } from 'react-native-ratings';

const createRequest = (search) => {
    return ('https://itunes.apple.com/search?term=' + search + '&attribute=mixTerm&country=fr&sort=popular&limit=20');
}

const Home = ({ navigation }) => {
    const route = useRoute();
    const [index, setIndex] = useState(0);
    const [search, onChangeSearch] = useState('');
    const [songsList, setSongsList] = useState([]);
    const [songs, setSongs] = useState([]);

    const findRequest = async () => {
        let req = await fetch(createRequest(search));
        let songInfos = await req.json();
        setSongsList(songInfos);
        console.log(songsList);
    }

    useEffect(() => {
        if (search) {
            findRequest();
        } else {
            setSongsList([]);
        }
    }, [search]);

    useEffect(() => {
        if (route.params) {
            let song = route.params;
            console.log(song);
            let id = songs.length;
            setSongs([...songs, {
                id: id,
                title: song.trackName,
                image: song.artworkUrl100,
                genre: song.primaryGenreName,
                album: song.collectionName,
                artistes: song.artistName,
                rate: song.rate
            }])
        }
    }, [route])

    return (
        <View style={styles.container}>
            <Tab
                value={index}
                onChange={(e) => setIndex(e)}
                indicatorStyle={{
                    backgroundColor: 'white',
                    height: 3,
                }}
                variant="primary">
                <Tab.Item
                    title=""
                    titleStyle={{ fontSize: 12 }}
                    containerStyle={{ backgroundColor: '#8EDBBE' }}
                    icon={{ name: 'search', type: 'ionicon', color: 'white', size: 30 }}
                />
                <Tab.Item
                    title=""
                    titleStyle={{ fontSize: 12 }}
                    containerStyle={{ backgroundColor: '#8EDBBE' }}
                    icon={{ name: 'musical-notes', type: 'ionicon', color: 'white', size: 30 }}
                />
                <Tab.Item
                    title=""
                    titleStyle={{ fontSize: 12 }}
                    containerStyle={{ backgroundColor: '#8EDBBE' }}
                    icon={{ name: 'logo-github', type: 'ionicon', color: 'white', size: 30 }}
                />
            </Tab>
            <TabView value={index} onChange={setIndex} animationType="spring">
                <TabView.Item style={styles.tabItem}>
                    <View>
                        <SearchBar
                            placeholder='Recherche par titre et/ou artiste...'
                            round='true'
                            value={search}
                            onChangeText={onChangeSearch}
                            containerStyle={{ backgroundColor: 'white', padding: 5, width: '100%' }}
                            inputContainerStyle={{ backgroundColor: 'white' }}
                            lightTheme='true'
                        />
                        {Object.keys(songsList).length > 0 ? <FlatList
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
                        /> : <Text />}
                    </View>
                </TabView.Item>
                <TabView.Item style={styles.tabItem}>
                    <View>
                        {Object.keys(songs).length > 0 ? <FlatList
                            data={songs}
                            extraData={songs}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <Card>
                                    <Text h4 style={styles.titleTitle}>{item.title}</Text>
                                    <Text style={styles.titleArtist}>Artiste(s) • {item.artistes}</Text>
                                    <Text style={styles.titleAlbum}>Album • {item.album}</Text>
                                    <Rating
                                        type='custom'
                                        readonly
                                        startingValue={item.rate}
                                        imageSize={25}
                                        ratingCount={10}
                                        size={10}
                                        ratingColor='#FFE656'
                                    />
                                </Card>

                            )}
                        /> : <Text />}
                    </View>
                </TabView.Item>
                <TabView.Item style={styles.tabItem}>
                </TabView.Item>
            </TabView>
        </View>

    );
}

const styles = StyleSheet.create({
    tabItem: {
        backgroundColor: '#fff',
        width: '100%',

    },
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