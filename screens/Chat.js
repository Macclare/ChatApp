import React, { useLayoutEffect, useCallback} from 'react';
import { GiftedChat }  from 'react-native-gifted-chat';
import {collection, addDoc, orderBy, query, onSnapshot} from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { useNavigation } from '@react-navigation/native';
import colors from '../colors';
import {AntDesign} from '@expo/vector-icons';
import {TouchableOpacity} from 'react-native';


export default function Chat() {
    const [messages, setMessages] = React.useState([]);
    const navigation = useNavigation();

    const signOutUser = () => {
        signOut(auth).catch((error) => alert(error.message));
    };
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={signOutUser} style={{marginRight: 15}}>
                <AntDesign name="logout" size={24} color={colors.gray} style={{marginRight: 15}} onPress={signOutUser}/>
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    useLayoutEffect(() => {

        const collectionRef = collection(db, 'chats');
        const q = query(collectionRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, querySnapshot => {
        console.log('querySnapshot unsusbscribe');
          setMessages(
            querySnapshot.docs.map(doc => ({
              _id: doc.data()._id,
              createdAt: doc.data().createdAt.toDate(),
              text: doc.data().text,
              user: doc.data().user
            }))
          );
        });
    return unsubscribe;
      }, []);

    const handleSend = useCallback((messages = []) => {
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, messages)
        );
        // setMessages([...messages, ...messages]);
        const { _id, createdAt, text, user } = messages[0];    
        addDoc(collection(db, 'chats'), {
          _id,
          createdAt,
          text,
          user
        });
      }, []);
    return(
        <GiftedChat
        messages={messages}
        showAvatarForEveryMessage={false}
        showUserAvatar={false}
        onSend={(messages)=> handleSend(messages)}
        messagesContainerStyle={{
            backgroundColor: colors.lightGray,
        }}
        textInputStyle={{
            color: colors.black,
            backgroundColor: colors.lightGray,
        }}
        user={{
            _id: auth.currentUser?.email,
            avatar: "https://i.pinimg.com/originals/91/9d/04/919d04f01e672cdd85bd56a2c5d12185.jpg"
        }}/>
    )
}