import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  Pressable,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import {styles} from './ChatListStyleSheet';
import {images} from '../../constants/constants';

const ChatList = ({navigation}) => {
  const MY_PHONE_NUM = '8750012375';

  const [activeChats, setActiveChats] = useState([]);
  const [phoneNum, setPhoneNum] = useState('');
  const [modalShown, setModalShown] = useState(false);

  useEffect(() => {
    firestore()
      .collection('Chats')
      .where('type', '==', 'one-to-one')
      .where('participants', 'array-contains', MY_PHONE_NUM)
      .onSnapshot(querySnapshot => {
        if (!querySnapshot.empty) {
          let tempActiveChats = [];
          querySnapshot.forEach(documentSnapshot => {
            tempActiveChats.push(documentSnapshot);
          });
          setActiveChats(tempActiveChats);
          console.log(activeChats);
        }
      });
  }, []);

  const ListHeader = () => {
    return (
      <View style={styles.headerStyles}>
        <Text style={styles.headerTextStyles}>Firebase Chat</Text>
      </View>
    );
  };

  const checkUserExistence = async () => {
    const querySnapshot = await firestore()
      .collection('Users')
      .where('phone_num', '==', phoneNum)
      .get();

    if (querySnapshot.empty) {
      console.log("User doesn't exist");
      return false;
    } else {
      console.log('User exists');
      return true;
    }
  };

  const checkChatExistence = async () => {
    const querySnapshot = await firestore()
      .collection('Chats')
      .where('type', '==', 'one-to-one')
      .where('participants', '==', [phoneNum && MY_PHONE_NUM].sort())
      .get();

    if (querySnapshot.empty) {
      console.log("Chat doesn't exist");
      return null;
    } else {
      console.log('Chat Exists');
      let docID = null;
      querySnapshot.forEach(documentSnapshot => {
        docID = documentSnapshot.id;
        console.log('Document ID', docID);
      });
      return docID;
    }
  };

  const createNewChat = async () => {
    if (await checkUserExistence()) {
      const chatID = await checkChatExistence();
      if (chatID) {
        console.log('Chat already exists...');
        navigation.navigate('ChatScreen', {chatID});
      } else {
        console.log('Creating new chat...');
        const docRef = await firestore()
          .collection(`Chats`)
          .add({
            participants: [MY_PHONE_NUM, phoneNum].sort(),
            type: 'one-to-one',
          });

        navigation.navigate('ChatScreen', {chatID: docRef.id});
      }

      //   firestore()
      //     .collection('Chats')
      //     .add({participants: [MY_PHONE_NUM, phoneNum]})
      //     .then(() => console.log('Chat created!'));
    } else {
      alert("User doesn't exist");
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={activeChats}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={styles.chatFlatListStyles}
        renderItem={({item, index}) => {
          console.log(item, 'item');

          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ChatScreen', {chatID: item.id});
              }}
              style={styles.chatCardContainerStyles}>
              <Text style={styles.chatCardTextStyles}>
                {item?.data().participants.filter(x => x != MY_PHONE_NUM)}
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      <TouchableOpacity
        onPress={() => setModalShown(true)}
        style={styles.fabButtonStyles}>
        <Image
          resizeMode="cover"
          source={images.new_chat_fab}
          style={styles.fabIconStyles}
        />
      </TouchableOpacity>
      <Modal
        visible={modalShown}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalShown(false)}>
        <View style={styles.modalContainerStyles}>
          <View style={styles.modalTextInputContainerStyles}>
            <View>
              <Text style={styles.modalTextInputLabelStyles}>
                Enter Phone Number to start chat
              </Text>
              <TextInput
                placeholder="Phone Number"
                onChangeText={setPhoneNum}
                style={styles.modalTextInputStyles}
              />
            </View>

            <View style={styles.modalButtonContainerStyles}>
              <Pressable
                onPress={() => setModalShown(false)}
                style={styles.modalButtonStyles}>
                <Text style={styles.modalButtonTextStyles}>Cancel</Text>
              </Pressable>
              <Pressable
                onPress={createNewChat}
                style={styles.modalButtonStyles}>
                <Text style={styles.modalButtonTextStyles}>Ok</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ChatList;
