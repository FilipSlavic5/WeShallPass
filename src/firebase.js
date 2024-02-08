import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage'; // Import Firebase Storage


import Filter from 'bad-words';
import { ref, onUnmounted, computed } from 'vue';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkEeVHJuMwhMzAfrUj9CAxZZe_aBMamgU",
  authDomain: "chat-app-d3f4f.firebaseapp.com",
  databaseURL: "https://chat-app-d3f4f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "chat-app-d3f4f",
  storageBucket: "chat-app-d3f4f.appspot.com",
  messagingSenderId: "1067946294827",
  appId: "1:1067946294827:web:fa1151719485c6ae40f46e"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();
const messagesCollection = firestore.collection('messages');
const messagesQuery = messagesCollection.orderBy('createdAt', 'desc').limit(100);
const storage = firebase.storage(); // Initialize Firebase Storage
const filter = new Filter();

export function useAuth() {
  const user = ref(null);
  const unsubscribe = auth.onAuthStateChanged((_user) => (user.value = _user));
  onUnmounted(unsubscribe);
  const isLogin = computed(() => user.value !== null);

  const signInWithEmailAndPassword = async (email, password) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error('Error during email/password sign-in:', error);
      throw error;
    }
  };

  const signOut = () => auth.signOut();

  const registerUser = async (name, familyName, email, username, password) => {
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // Add custom user data to Firestore (adjust as needed)
      const userRef = firestore.collection('users').doc(user.uid);
      await userRef.set({
        name,
        familyName,
        email,
        username,
      });

      // Send email verification (optional)
      await user.sendEmailVerification();

      return user;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };

  return {
    user,
    isLogin,
    signInWithEmailAndPassword,
    signOut,
    registerUser,
  };
}

export function useChat() {
  const messages = ref([]);
  const unsubscribe = messagesQuery.onSnapshot((snapshot) => {
    messages.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })).reverse();
  });
  onUnmounted(unsubscribe);

  const { user, isLogin } = useAuth();
  const sendMessage = (text) => {
    if (!isLogin.value) return;
    const { photoURL, uid, displayName } = user.value;
    messagesCollection.add({
      userName: displayName,
      userId: uid,
      userPhotoURL: photoURL,
      text: filter.clean(text),
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  return { messages, sendMessage };
}
export { storage }; // Export Firebase Storage for use in other parts of your application