import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  TextInput,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {hpx, nf, wp, wpx} from '../constants/constants';

const ChatScreen = ({navigation, route}) => {
  const {chatID} = route.params;

  const MY_PHONE_NUM = '8750012375';

  const [receiver, setReceiver] = useState('');
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  // Fetch Receiver Phone Number
  useEffect(() => {
    const asyncFunc = async () => {
      const documentSnapshot = await firestore()
        .collection(`Chats`)
        .doc(chatID)
        .get();

      setReceiver(
        ...documentSnapshot.data().participants.filter(x => x != MY_PHONE_NUM),
      );
    };

    asyncFunc();
  }, []);

  // Check for changes in collection
  useEffect(() => {
    firestore()
      .collection(`Chats/${chatID}/Messages`)
      .orderBy('timestamp', 'desc')
      .onSnapshot(querySnapshot => {
        let tempMessage = [];
        querySnapshot.forEach(documentSnapshot => {
          tempMessage.push(documentSnapshot.data());
        });
        setMessageList(tempMessage);
      });
  }, []);

  const handleSendMessage = () => {
    console.log('inside send message');
    if (message) {
      firestore().collection(`Chats/${chatID}/Messages`).add({
        sender: MY_PHONE_NUM,
        receiver,
        message: message,
        timestamp: new firestore.Timestamp.now(),
      });

      setMessage('');
    } else {
      alert('Cannot send empty message');
    }
  };

  console.log(messageList);

  return (
    <View style={styles.container}>
      <View style={styles.headerStyles}>
        <Text style={styles.headerTextStyles}>{receiver}</Text>
      </View>
      <FlatList
        inverted
        style={{width: '100%'}}
        contentContainerStyle={{alignItems: 'flex-end'}}
        data={messageList}
        renderItem={({item, index}) => {
          console.log(index, item.sender);

          return (
            <View
              style={[
                styles.chatBubbleContainerStyles,
                {
                  alignItems:
                    item.sender == MY_PHONE_NUM ? 'flex-end' : 'flex-start',
                },
              ]}>
              <View style={[styles.chatBubbleStyles]}>
                {console.log(item.message)}
                <Text style={styles.messageTextStyles}>{item.message}</Text>
              </View>
            </View>
          );
        }}
      />
      <View style={styles.textInputContainer}>
        <TextInput
          returnKeyType="send"
          onSubmitEditing={handleSendMessage}
          style={styles.textInputStyles}
          onChangeText={setMessage}
          value={message}
        />
        <Text onPress={handleSendMessage} style={styles.sendButtonStyles}>
          Send
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'black',
  },

  headerStyles: {
    height: 60,
    width: '100%',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },

  headerTextStyles: {
    fontSize: 24,
    color: 'white',
  },

  chatBubbleContainerStyles: {
    width: wp(100),
    marginBottom: hpx(5),
  },

  chatBubbleStyles: {
    maxWidth: wp(80),
    borderRadius: 15,
    padding: 10,
    marginHorizontal: wpx(5),
    backgroundColor: '#E35F24',
  },

  messageTextStyles: {
    fontSize: 16,
  },

  textInputContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: 5,
  },

  textInputStyles: {
    flex: 0.9,
    borderRadius: 15,
    minHeight: 50,
    backgroundColor: 'rgba(175, 175, 175, 0.8)',
    paddingHorizontal: 15,
  },

  sendButtonStyles: {
    color: '#E35F24',
    fontSize: nf(18),
    fontWeight: 'bold',
  },
});

export default ChatScreen;
