import _ from 'lodash';
import { db } from './initializeFirebase.js';
import './mystyle.css'; 
import { renderSignInPage, GoSignUp, handleSignIn } from './nonmember/signIn.js'
import { renderSignUpPage, GoSignIn, handleSignUp } from './nonmember/signUp.js'; 
import { renderToDo } from './member/Todo.js'; 
import { getAuth, onAuthStateChanged } from 'firebase/auth'; 
import { renderSignOutButton, handleSignOut } from './member/signOutButton.js';
import { renderAdminPanel } from './member/adminPanel.js'; 
import { renderAddProj, openAddProjectPanel, closeAddProjectPanel, handleAddProject, getProjectList } from './member/addProject.js';
import {
    renderAddTaskPanel,
    openAddTaskPanel,
    closeAddTaskPanel,
    renderProjectCategory,
    handleAddTask,
    fillTaskSelection,
    renderSecAddTaskPanel,
    handleSecondaryAddTask, 
    closeSecAddTaskPanel, 
 } from './member/addTask.js'; 
import { fillProjectList, retrieveProjectList, retrieveProjectNamesList, fillProjectNamesList} from './getProjectList.js'; 
import { displayProjects, displayToday, displayWeek, displayMonth } from './member/display/toggleDisplay.js'; 
import { renderProjects } from './member/display/displayProject.js';
import { AddFuncToSecButtons } from './member/renderSecAddTaskButtons.js';
import { renderTaskPanel } from './member/display/displayTask/renderTaskPanel.js';
import { closeDisplayTask, loadDisplayTaskDom } from './member/display/displayTask/displayTaskLogic.js';

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

//render DOM 

/*code for admin panel of the main pages*/
document.getElementById('side-panel').innerHTML = renderAdminPanel()

/*code for add project panel*/
const AddProjectPanel = document.getElementById('addProjectPanel');
AddProjectPanel.innerHTML = renderAddProj();

/*code for add task panel*/
const addTaskPanel = document.getElementById('addTaskPanel');
addTaskPanel.innerHTML = renderAddTaskPanel();


//code for Secondary Add Task Panel 
const SecAddTaskPanel = document.getElementById('SecondaryAddTaskPanel');
SecAddTaskPanel.innerHTML = renderSecAddTaskPanel(); 

//renders the panel that displays individual task details
const displayTask = document.getElementById('displayTaskPanel');
displayTask.innerHTML = renderTaskPanel();

//render the Display Task Panel that shows the user the individual task of a project
const displayTaskPanel = document.getElementById('displayTaskPanel');
//displayTaskPanel.appendChild(renderTaskPanel());
//loadDisplayTaskDom(); 

export const mainApp = (function () {
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            signInPage.style.display = 'inline-block';
            mainPages.style.display = 'none';
        }
        else {
            (async function () { await fillProjectNamesList()})(); 

            signInPage.style.display = 'none';
            signUpPage.style.display = 'none';
            mainPages.style.display = 'inline-block';
            fillProjectList();


              /**admin panel */
            document.getElementById('signOutButton').addEventListener('click', handleSignOut)
            document.getElementById('Admin_addProjectButton').addEventListener('click', openAddProjectPanel)



            document.getElementById('CancelAddProjectButton').addEventListener('click', closeAddProjectPanel);
            document.getElementById('addProjectButton').addEventListener('click', handleAddProject);



            const OpenTaskButton = document.getElementById('Admin_addTaskButton');
            //OpenTaskButton.addEventListener('click', openAddTaskPanel);

            const AddTaskButton = document.getElementById('addTaskButton'); 
            //AddTaskButton.addEventListener('click', handleAddTask)

            document.getElementById('CancelAddTaskButton').addEventListener('click', closeAddTaskPanel);

            //display task panel
            //const displayTask_closeButt = document.getElementById('displayTask_closeButton');
            //displayTask_closeButt.addEventListener('click', closeDisplayTask); 

            //renders the 'select' tag element of the Add Task Panel under Assign Project Category
            (async function () { document.getElementById('AssignProject').appendChild(await renderProjectCategory()) })();

            //add events to each button of the admin panel for displaying the tasks 
            
            document.getElementById('adminProjectButton').addEventListener('click', displayProjects);
            document.getElementById('adminTodayButton').addEventListener('click', displayToday);
            document.getElementById('adminWeekButton').addEventListener('click', displayWeek);
            document.getElementById('adminMonthButton').addEventListener('click', displayMonth);


            OpenTaskButton.addEventListener('click', openAddTaskPanel);
            AddTaskButton.addEventListener('click', handleAddTask)
            AddFuncToSecButtons();
            renderProjects();
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




