import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const userData = useSelector(state => state.authReducer.userData);

  const db = firestore();

  useEffect(() => {
    const unsubscribe = db.collection('ChatList').onSnapshot(snapshot => {
      const updatedMessages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log('snapshot', snapshot);
      setMessages(updatedMessages);
    });

    return () => unsubscribe();
  }, []);

  const handleSendMessage = async () => {
    if (inputText) {
      try {
        await db.collection('ChatList').add({
          name: inputText,
          email:'babar@yopmail.com',
          photo:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaXaKH9Q7gVGHSc2_IK3mOhpEaiULsMGxwRUe2nL4b&s'
        });
        setInputText('');
      } catch (error) {
        console.error('Error sending message: ', error);
      }
    }
  };

  const renderMessage = ({item}) => {
    console.log('item===',item);
    return (
      <View style={[styles.messageContainer]}>
        <View style={styles.imageContainer}>

        </View>
        <Text style={[styles.sender]}>{item.name}</Text>
        {/* <Text style={styles.messageText}>{item.text}</Text> */}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messageList}
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message"
          value={inputText}
          onChangeText={text => setInputText(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  messageList: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  messageContainer: {
    marginBottom: 16,
  },
  sender: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 8,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 16,
  },
  sendButton: {
    marginLeft: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#2196f3',
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  imageContainer:{}
});

export default ChatScreen;
