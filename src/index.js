import _ from 'lodash';
import { db } from './initializeFirebase.js';
import './mystyle.css'; 
import { renderSignInPage, GoSignUp, handleSignIn } from './nonmember/signIn.js'
import { renderSignUpPage, GoSignIn, handleSignUp } from './nonmember/signUp.js'; 
import { renderToDo } from './member/Todo.js'; 
import { getAuth, onAuthStateChanged } from 'firebase/auth'; 
import { renderSignOutButton, handleSignOut } from './member/signOutButton.js';
import { renderAdminPanel } from './member/adminPanel.js'; 
import { renderAddProj } from './member/addProject.js';

//for watching the html file 
require('./home.html')

const auth = getAuth();
var token = ''; 
var currentUser = null; 
const signInPage = document.getElementById('signIn');
const signUpPage = document.getElementById('signUp'); 
const mainPages = document.getElementById('mainPages'); 


/*sign in page code*/
signInPage.innerHTML = renderSignInPage()
signUpPage.innerHTML = renderSignUpPage();
//signInPage.appendChild(renderSignOutButton());
mainPages.appendChild(renderToDo());

export const mainApp = (function () {
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            signInPage.style.display = 'inline-block';
            mainPages.style.display = 'none';
        }
        else {
            signInPage.style.display = 'none';
            signUpPage.style.display = 'none';
            mainPages.style.display = 'inline-block';
        }
    })
})();

const goSignInButt = document.getElementById('goSignInButton');
const goSignUpButt = document.getElementById('goSignUpButton'); 
const signUpButt = document.getElementById('signUpButton');
const signInButt = document.getElementById('signInButton'); 

goSignInButt.addEventListener('click', GoSignIn);
goSignUpButt.addEventListener('click', GoSignUp);
signInButt.addEventListener('click', function () {
    currentUser = handleSignIn(); 
})



/*code for admin panel of the main pages*/
document.getElementById('side-panel').innerHTML = renderAdminPanel();
/**admin panel */


document.getElementById('signOutButton').addEventListener('click', handleSignOut)


/*code for add project panel*/
const AddProjectPanel = document.getElementById('addProjectPanel'); 
AddProjectPanel.innerHTML = renderAddProj();