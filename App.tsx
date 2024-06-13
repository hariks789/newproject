/* eslint-disable no-catch-shadow */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {Chat} from '@pubnub/chat';
import React, {useEffect, useState} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import {getKeys} from './keys';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [chatInstance, setChat] = useState<Chat>();
  const [error, setError] = useState('');

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  async function init() {
    try {
      const config = await getKeys();

      const chat = await Chat.init({
        ...config,
      });

      console.log('chat', chat);

      if (!chat) {
        return;
      }

      setChat(chat);
    } catch (err) {
      console.log(err);
      setError(JSON.stringify(err));
    }
  }

  useEffect(() => {
    // Temp flag for turning off authnz

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
      </ScrollView>
      <View style={styles.sectionContainer}>
        {/* <Text style={styles.sectionDescription}>{JSON.stringify(config)}</Text> */}

        <Text style={styles.sectionDescription}>{error ? error : null}</Text>
        <Text style={styles.sectionDescription}>
          Connected User ID:{' '}
          {chatInstance ? chatInstance?.currentUser.id : null}
        </Text>
      </View>
      <Button title="Start Init" onPress={init} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    margin: 32,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'center',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
