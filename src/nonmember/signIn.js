import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; 
import { checkEmail, checkPass } from './checkAuth.js'; 

const signInPage = document.getElementById('signIn');
const signUpPage = document.getElementById('signUp');
const mainPages = document.getElementById('mainPages'); 

const auth = getAuth(); 

const initialUserInfo = ({
    email: '',
    password: '',
})


var userInfo = ({
    email: '',
    password: '',
})


export const GoSignUp = () => {
    signInPage.style.display = 'none';
    signUpPage.style.display = 'inline-block'; 
    mainPages.style.display = 'none'; 
}

export const handleSignIn = () => {
    var currentUser = null; 
    userInfo.email = document.getElementById('signIn_email').value;
    userInfo.password = document.getElementById('signIn_pass').value; 
    //console.log(userInfo)
    if (checkEmail(userInfo.email) && checkPass(userInfo.password)) {
        signInWithEmailAndPassword(auth, userInfo.email, userInfo.password)
            .then((userCredential) => {
                alert('You are now logged in. \n Welcome back.')
                currentUser = userCredential.user; 
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorCode + ': ' + errorMessage); 
            });
    }
    return currentUser; 
}


export const renderSignInPage = () => {
    const element = "<div id = 'signInContainer'>" +
        "<h1 id = 'title'>Sign into your account</h1>" +
        "<div id = 'innerContainer'>" + 
            "<div id = 'inputField'>" +
            "<h2>Email</h2>" +
            "<input type = 'text' id = 'signIn_email' class = 'textInput'>" +
            "</div>" +
            "<div id = 'inputField'>" +
            "<h2>Password</h2>" +
            "<input type = 'text' id = 'signIn_pass' class = 'textInput'>" +
            "</div>" +
        "</div>" + 
        "<div id = 'buttonContainer' ><br />" +
        "<button id = 'signInButton'>Sign In</button>" +
        "</div>" +
        "<div id = 'secondQuestContainer'>" +
            "<h2>Don't have an account?</h2>" +
            "<button id = 'goSignUpButton'>Sign Up</button>" +
        "</div>" +
        "</div>"

    return element; 
}
