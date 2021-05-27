
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyANyp5g20igP7fXzaEn0ES4QB2RKggP5c0",
    authDomain: "fir-250ab.firebaseapp.com",
    projectId: "fir-250ab",
    storageBucket: "fir-250ab.appspot.com",
    messagingSenderId: "551063393278",
    appId: "1:551063393278:web:feced994eb5a2889c826af"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

var provider = new firebase.auth.GoogleAuthProvider();

let email = 'bayvas@mail.ru',
password = 'admin123';

//firebase.auth().signInWithEmailAndPassword(email, password)
//  .then((userCredential) => {
//    console.log('good work man');
//    var user = userCredential.user;
//    // ...
//  })
//  .catch((error) => {
//    console.log('something went wrong');
//    var errorCode = error.code;
//    var errorMessage = error.message;
//  });

$('#auth').on('submit', (function(e) {
    e.preventDefault();
    $('#info').html('');
    let email = $('#username').val();
    let password = $('#password').val();
    firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    console.log('good work man');
    var user = userCredential.user;
    // ...
        $('#info').html('logged in');
        localStorage.setItem('user', JSON.stringify(user));

  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    $('#info').html(errorCode + " " + errorMessage);
  });

}));

$('#getobject').on('click', function(e) {
    e.preventDefault();
    let lsuser = localStorage.getItem('user');
    if (lsuser == null) {
        console.log('no user');
        return;
    }
    var user = JSON.parse(lsuser);
    $('#user').html(user.email);
    console.log(user);
});

$('#google').on('click', function(e) {
    e.preventDefault();

    var provider = new firebase.auth.GoogleAuthProvider();

    provider.addScope('profile');

    firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });


    console.log('signin google');
});

