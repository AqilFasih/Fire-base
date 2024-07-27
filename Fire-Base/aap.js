  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";
  import { getAuth ,
    onAuthStateChanged ,
    createUserWithEmailAndPassword ,
    signInWithEmailAndPassword,
    signOut,
 } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

  const firebaseConfig = {
    apiKey: "AIzaSyDLmrW6tPZXMh04Kek_xX8K637j5rUjaPY",
    authDomain: "my-first-project-d7ce8.firebaseapp.com",
    projectId: "my-first-project-d7ce8",
    storageBucket: "my-first-project-d7ce8.appspot.com",
    messagingSenderId: "78377673965",
    appId: "1:78377673965:web:0dc26af199abba675498e4",
    measurementId: "G-H18JV4QG6K"
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);


  const signup_email = document.getElementById("signup_email");
  const signup_password = document.getElementById("signup_password");
  const signup_btn = document.getElementById("signup_btn");
  
  const signin_email = document.getElementById("signin_email");
  const signin_password = document.getElementById("signin_password");
  const signin_btn = document.getElementById("signin_btn");

  const user_email = document.getElementById("user_email");
  const logout_btn = document.getElementById("logout_btn");
  

  const auth_container =document.getElementById("auth_container");
  const user_container =document.getElementById("user_container");


  signup_btn.addEventListener("click", createUserAccount);
  signin_btn.addEventListener("click",signIn);
  logout_btn.addEventListener("click", logout);

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("user is logged in==>");
    const uid = user.uid;
    auth_container.style.display = "none";
    user_container.style.display = "block";
    user_email.innerText = user.email;
    // ...
  } else {
    console.log("user is not logged in==>  ");
    auth_container.style.display = "block";
    user_container.style.display = "none";
  }
});

function createUserAccount(){
    // console.log('email=>',signup_email.value)
    // console.log('password=>',signup_password.value)
    createUserWithEmailAndPassword(
        auth, 
        signup_email.value, 
        signup_password.value)
  .then((userCredential) => {
    
    const user = userCredential.user;
    console.log("user=>", user);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
    // ..
  });

}

function signIn(){
    // console.log('email=>',signin_email.value)
    // console.log('password=>',signin_password.value)
    signInWithEmailAndPassword(auth, signin_email.value, signin_password.value)
  .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log("user");
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
  });

}

 function logout(){
    signOut(auth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
      
 }