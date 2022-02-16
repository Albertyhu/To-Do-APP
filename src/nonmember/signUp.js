import firebase from 'firebase/compat/app'; 
import { doc, setDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword} from 'firebase/auth'; 
import { checkAllPass, checkEmail, checkFirst, checkLast, getUserInfo } from './checkAuth.js'; 
import { db } from '../initializeFirebase.js';

const signInPage = document.getElementById('signIn');
const signUpPage = document.getElementById('signUp');
const mainPages = document.getElementById('mainPages'); 


const initialUserInfo = ({
    firstName: '', 
    lastName: '', 
    email: '', 
    password: '', 
    confirmPass: '', 
})


var userInfo = ({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPass: '',
})

export const GoSignIn = () => {
    signInPage.style.display = 'inline-block';
    signUpPage.style.display = 'none';
    mainPages.style.display = 'inline-block';
}

const auth = getAuth(); 

export const handleSignUp = () => {
    userInfo.firstName = document.getElementById('fName').value; 
    userInfo.lastName = document.getElementById('Last_Name').value; 
    userInfo.email = document.getElementById('emailAddress').value;
    userInfo.password = document.getElementById('password_input').value; 
    userInfo.confirmPass = document.getElementById('confirmPassword').value; 
    console.log(userInfo)
    if (checkFirst(userInfo.firstName) && checkLast(userInfo.lastName) && checkEmail(userInfo.email) && checkAllPass(userInfo.password, userInfo.confirmPass)) {
        createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password).then(async (userCredentials) => {
            await setDoc(doc(db, 'users', auth.currentUser.uid), {
                email: userInfo.email, 
                first_name: userInfo.firstName, 
                last_name: userInfo.lastName 
            })
            alert('Your account has been created.')
            getUserInfo(userInfo.firstName, userInfo.email, auth.currentUser.uid)
        })
            .catch((error) => {
                if (error.code === 'auth/email-already-in-use') {
                    alert("The email you typed is already in use.")
                }
                else
                  alert(error.code + ": " + error.message)
            })
    }
}

export const renderSignUpPage = () => {
    const element = "<div id = 'signInContainer'>" +
        "<h1 id = 'title'>Create a new account</h1>" + 
        "<div id = 'innerContainer'>" + 
            "<div id = 'inputField' >" +
                "<h2>First Name</h2>" + 
                "<input type = 'text' id = 'fName' class = 'textInput'>" + 
            "</div>" + 
            "<div id = 'inputField'>" +
                "<h2>Last Name</h2>" +
                "<input type = 'text' id = 'Last_Name' class = 'textInput'>" +
            "</div>" + 
            "<div id = 'inputField'>" +
                "<h2>Email</h2>" +
                "<input type = 'text' id = 'emailAddress' class = 'textInput'>" +
            "</div>" + 
            "<div id = 'inputField'>" +
                "<h2>Password</h2>" +
                "<input type = 'text' id = 'password_input' class = 'textInput'>" +
            "</div>" + 
            "<div id = 'inputField'>" +
                "<h2>Confirm password</h2>" +
                "<input type = 'text' id = 'confirmPassword' class = 'textInput'>" +
            "</div>" + 
        "</div><br />" + 
        "<div id = 'buttonContainer' >" + 
            "<button id = 'signUpButton'>Sign Up</button>" + 
        "</div>" +
        "<div id = 'secondQuestContainer'>" + 
            "<h2>Already have an account?</h2>" + 
            "<button id = 'goSignInButton'>Sign In</button>" + 
        "</div>" + 
    "</div>"

    return element;
}