import React from 'react';
import {Text, ScrollView, Image, StyleSheet} from 'react-native';

const ArticleScreen = ({route}) => {
  const {articleData} = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{uri: articleData.urlToImage}}
        style={styles.articleImage}
      />
      <Text style={styles.articleTitle}>{articleData.title}</Text>
      <Text style={styles.articleSource}>{articleData.source.name}</Text>
      <Text style={styles.articleContent}>{articleData.content}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  articleImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
    color: '#000',
  },
  articleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  articleSource: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 10,
  },
  articleContent: {
    fontSize: 18,
  },
});

export default ArticleScreen;
