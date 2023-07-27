import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';

// Replace 'YOUR_NEWSAPI_API_KEY' with your actual NewsAPI API key
const API_KEY = '484d550c2164462b967d23c0b4ef77ca';
const NEWS_API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [newsData, setNewsData] = useState([]);

  // Get the navigation object using the useNavigation hook
  const navigation = useNavigation();

  // Fetch news data when the component mounts
  useEffect(() => {
    fetchNewsData();
  }, []);

  // Function to fetch news data from NewsAPI
  const fetchNewsData = async () => {
    try {
      const response = await axios.get(NEWS_API_URL);
      setNewsData(response.data.articles);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching news data:', error);
      setIsLoading(false);
    }
  };

  // Render individual news item in the list
  const renderNewsItem = ({item}) => {
    const handlePress = () => {
      navigation.navigate('Article', {articleData: item});
    };
    return (
      <TouchableOpacity onPress={handlePress}>
        <View style={styles.newsItemContainer}>
          <FastImage
            source={{uri: item.urlToImage}}
            style={styles.newsImage}
            resizeMode={FastImage.resizeMode.cover}
          />
          <Text style={styles.newsHeadline}>{item.title}</Text>
          <Text style={styles.newsSource}>{item.source.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  // Render loading indicator if data is still being fetched
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={newsData}
        renderItem={renderNewsItem}
        keyExtractor={item => item.url}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newsItemContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
  },
  newsImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  newsHeadline: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  newsSource: {
    color: 'gray',
  },
});

export default HomeScreen;
