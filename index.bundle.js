"use strict";
(self["webpackChunkwebpack_template"] = self["webpackChunkwebpack_template"] || []).push([["index"],{

/***/ "./src/components/randGen.js":
/*!***********************************!*\
  !*** ./src/components/randGen.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateCode": () => (/* binding */ generateCode)
/* harmony export */ });
const alpha = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const generateCode = num => {
  var code = '';

  for (var i = 0; i < num; i++) {
    code += alpha[Math.floor(Math.random() * 62)];
  }

  return code;
};

/***/ }),

/***/ "./src/getProjectList.js":
/*!*******************************!*\
  !*** ./src/getProjectList.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "returnAuth": () => (/* binding */ returnAuth),
/* harmony export */   "fillProjectList": () => (/* binding */ fillProjectList),
/* harmony export */   "fillProjectNamesList": () => (/* binding */ fillProjectNamesList),
/* harmony export */   "retrieveProjectList": () => (/* binding */ retrieveProjectList),
/* harmony export */   "retrieveProjectNamesList": () => (/* binding */ retrieveProjectNamesList),
/* harmony export */   "getTaskListByProjectID": () => (/* binding */ getTaskListByProjectID),
/* harmony export */   "delProject": () => (/* binding */ delProject),
/* harmony export */   "toggleCheckBox": () => (/* binding */ toggleCheckBox)
/* harmony export */ });
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/auth */ "./node_modules/firebase/auth/dist/index.esm.js");
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/firestore */ "./node_modules/firebase/firestore/dist/index.esm.js");
/* harmony import */ var _initializeFirebase_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./initializeFirebase.js */ "./src/initializeFirebase.js");
/* harmony import */ var _member_display_displayProject_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./member/display/displayProject.js */ "./src/member/display/displayProject.js");




const auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_0__.getAuth)();
const returnAuth = () => {
  return auth;
};
var ProjectList = [];
var ProjectNamesList = [];
const fillProjectList = async () => {
  ProjectList = [];
  const q = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.query)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.collection)(_initializeFirebase_js__WEBPACK_IMPORTED_MODULE_2__.db, 'project', auth.currentUser.uid, "ProjectList"));
  const snapshot = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.getDocs)(q);
  snapshot.forEach(data => {
    ProjectList.push(data.id);
  });
};
const fillProjectNamesList = async () => {
  while (ProjectNamesList.length > 0) {
    ProjectNamesList.pop();
  }

  const q = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.query)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.collection)(_initializeFirebase_js__WEBPACK_IMPORTED_MODULE_2__.db, 'project', auth.currentUser.uid, 'ProjectList'), (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.orderBy)('title', 'asc'));
  const snapshot = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.getDocs)(q).then(async data => {
    data.forEach(async snap => {
      const obj = {
        id: snap.id,
        title: snap.data().title
      };
      ProjectNamesList.push(obj);
    });
  }); //console.log(ProjectNamesList.length)
};
const retrieveProjectList = () => {
  return ProjectList;
};
const retrieveProjectNamesList = async () => {
  //  await fillProjectNamesList()
  //  console.log(ProjectNamesList)
  return ProjectNamesList;
};
const getTaskListByProjectID = async projectID => {
  const q = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.query)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.collection)(_initializeFirebase_js__WEBPACK_IMPORTED_MODULE_2__.db, 'task', auth.currentUser.uid, 'TaskList'), (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.where)('ProjectID', '==', projectID));
  var arr = [];
  await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.getDocs)(q).then(data => {
    /*
    const snapshot = data.forEach(snap => {
        return {
            ProjectID: snap.data().ProjectID, 
            deadline: snap.data().deadline, 
            description: snap.data().description, 
            status: snap.data().status, 
            title: snap.data().title, 
            urgency: snap.data().urgency, 
        }
    })
    */
    data.forEach(snap => {
      if (snap.exists()) {
        // arr.push(snap.data())
        const obj = {
          id: snap.id,
          ProjectID: snap.data().ProjectID,
          deadline: snap.data().deadline,
          description: snap.data().description,
          status: snap.data().status,
          title: snap.data().title,
          urgency: snap.data().urgency,
          dateCreated: snap.data().dateCreated,
          isFinished: snap.data().isFinished
        };
        arr.push(obj);
      }
    });
  }).catch(e => {
    console.log(e.message);
  });

  if (arr.length !== 0) {
    return arr;
  } else return [];
};
const delProject = async ID => {
  var taskList = [];
  const q = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.query)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.collection)(_initializeFirebase_js__WEBPACK_IMPORTED_MODULE_2__.db, 'task', auth.currentUser.uid, 'TaskList'), (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.where)('ProjectID', '==', ID));
  const snapshot = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.getDocs)(q).then(data => {
    data.forEach(snap => {
      taskList.push(snap.id);
    });
  });
  taskList.forEach(async item => {
    await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.deleteDoc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.doc)(_initializeFirebase_js__WEBPACK_IMPORTED_MODULE_2__.db, 'task', auth.currentUser.uid, 'TaskList', item));
  });
  await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.deleteDoc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.doc)(_initializeFirebase_js__WEBPACK_IMPORTED_MODULE_2__.db, 'project', auth.currentUser.uid, 'ProjectList', ID)).then(async data => {
    //location.reload();
    (0,_member_display_displayProject_js__WEBPACK_IMPORTED_MODULE_3__.removeProj)(ID);
  });
};
const toggleCheckBox = async (taskID, boolValue) => {
  const docRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.doc)(_initializeFirebase_js__WEBPACK_IMPORTED_MODULE_2__.db, 'task', auth.currentUser.uid, 'TaskList', taskID);

  if (boolValue) {
    await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.updateDoc)(docRef, {
      isFinished: true,
      status: 'Done'
    });
  } else {
    await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.updateDoc)(docRef, {
      isFinished: false,
      status: 'Ongoing'
    });
  }
};

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mainApp": () => (/* binding */ mainApp)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _initializeFirebase_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./initializeFirebase.js */ "./src/initializeFirebase.js");
/* harmony import */ var _mystyle_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mystyle.css */ "./src/mystyle.css");
/* harmony import */ var _nonmember_signIn_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nonmember/signIn.js */ "./src/nonmember/signIn.js");
/* harmony import */ var _nonmember_signUp_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./nonmember/signUp.js */ "./src/nonmember/signUp.js");
/* harmony import */ var _member_Todo_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./member/Todo.js */ "./src/member/Todo.js");
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! firebase/auth */ "./node_modules/firebase/auth/dist/index.esm.js");
/* harmony import */ var _member_signOutButton_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./member/signOutButton.js */ "./src/member/signOutButton.js");
/* harmony import */ var _member_adminPanel_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./member/adminPanel.js */ "./src/member/adminPanel.js");
/* harmony import */ var _member_addProject_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./member/addProject.js */ "./src/member/addProject.js");
/* harmony import */ var _member_addTask_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./member/addTask.js */ "./src/member/addTask.js");
/* harmony import */ var _getProjectList_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./getProjectList.js */ "./src/getProjectList.js");
/* harmony import */ var _member_display_toggleDisplay_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./member/display/toggleDisplay.js */ "./src/member/display/toggleDisplay.js");
/* harmony import */ var _member_display_displayProject_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./member/display/displayProject.js */ "./src/member/display/displayProject.js");
/* harmony import */ var _member_renderSecAddTaskButtons_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./member/renderSecAddTaskButtons.js */ "./src/member/renderSecAddTaskButtons.js");
/* harmony import */ var _member_display_displayTask_renderTaskPanel_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./member/display/displayTask/renderTaskPanel.js */ "./src/member/display/displayTask/renderTaskPanel.js");
/* harmony import */ var _member_display_displayTask_displayTaskLogic_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./member/display/displayTask/displayTaskLogic.js */ "./src/member/display/displayTask/displayTaskLogic.js");
















 //for watching the html file 

__webpack_require__(/*! ./home.html */ "./src/home.html");

const auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_6__.getAuth)();
var token = '';
var currentUser = null;
const signInPage = document.getElementById('signIn');
const signUpPage = document.getElementById('signUp');
const mainPages = document.getElementById('mainPages');
/*sign in page code*/

signInPage.innerHTML = (0,_nonmember_signIn_js__WEBPACK_IMPORTED_MODULE_3__.renderSignInPage)();
signUpPage.innerHTML = (0,_nonmember_signUp_js__WEBPACK_IMPORTED_MODULE_4__.renderSignUpPage)(); //signInPage.appendChild(renderSignOutButton());

mainPages.appendChild((0,_member_Todo_js__WEBPACK_IMPORTED_MODULE_5__.renderToDo)()); //render DOM 

/*code for admin panel of the main pages*/

document.getElementById('side-panel').innerHTML = (0,_member_adminPanel_js__WEBPACK_IMPORTED_MODULE_8__.renderAdminPanel)();
/*code for add project panel*/

const AddProjectPanel = document.getElementById('addProjectPanel');
AddProjectPanel.innerHTML = (0,_member_addProject_js__WEBPACK_IMPORTED_MODULE_9__.renderAddProj)();
/*code for add task panel*/

const addTaskPanel = document.getElementById('addTaskPanel');
addTaskPanel.innerHTML = (0,_member_addTask_js__WEBPACK_IMPORTED_MODULE_10__.renderAddTaskPanel)(); //code for Secondary Add Task Panel 

const SecAddTaskPanel = document.getElementById('SecondaryAddTaskPanel');
SecAddTaskPanel.innerHTML = (0,_member_addTask_js__WEBPACK_IMPORTED_MODULE_10__.renderSecAddTaskPanel)(); //renders the panel that displays individual task details

const displayTask = document.getElementById('displayTaskPanel');
displayTask.innerHTML = (0,_member_display_displayTask_renderTaskPanel_js__WEBPACK_IMPORTED_MODULE_15__.renderTaskPanel)(); //render the Display Task Panel that shows the user the individual task of a project

const displayTaskPanel = document.getElementById('displayTaskPanel'); //displayTaskPanel.appendChild(renderTaskPanel());
//loadDisplayTaskDom(); 

const mainApp = function () {
  (0,firebase_auth__WEBPACK_IMPORTED_MODULE_6__.onAuthStateChanged)(auth, user => {
    if (!user) {
      signInPage.style.display = 'inline-block';
      mainPages.style.display = 'none';
    } else {
      (async function () {
        await (0,_getProjectList_js__WEBPACK_IMPORTED_MODULE_11__.fillProjectNamesList)();
      })();

      signInPage.style.display = 'none';
      signUpPage.style.display = 'none';
      mainPages.style.display = 'inline-block';
      (0,_getProjectList_js__WEBPACK_IMPORTED_MODULE_11__.fillProjectList)();
      /**admin panel */

      document.getElementById('signOutButton').addEventListener('click', _member_signOutButton_js__WEBPACK_IMPORTED_MODULE_7__.handleSignOut);
      document.getElementById('Admin_addProjectButton').addEventListener('click', _member_addProject_js__WEBPACK_IMPORTED_MODULE_9__.openAddProjectPanel);
      document.getElementById('CancelAddProjectButton').addEventListener('click', _member_addProject_js__WEBPACK_IMPORTED_MODULE_9__.closeAddProjectPanel);
      document.getElementById('addProjectButton').addEventListener('click', _member_addProject_js__WEBPACK_IMPORTED_MODULE_9__.handleAddProject);
      const OpenTaskButton = document.getElementById('Admin_addTaskButton'); //OpenTaskButton.addEventListener('click', openAddTaskPanel);

      const AddTaskButton = document.getElementById('addTaskButton'); //AddTaskButton.addEventListener('click', handleAddTask)

      document.getElementById('CancelAddTaskButton').addEventListener('click', _member_addTask_js__WEBPACK_IMPORTED_MODULE_10__.closeAddTaskPanel); //display task panel
      //const displayTask_closeButt = document.getElementById('displayTask_closeButton');
      //displayTask_closeButt.addEventListener('click', closeDisplayTask); 
      //renders the 'select' tag element of the Add Task Panel under Assign Project Category

      (async function () {
        document.getElementById('AssignProject').appendChild(await (0,_member_addTask_js__WEBPACK_IMPORTED_MODULE_10__.renderProjectCategory)());
      })(); //add events to each button of the admin panel for displaying the tasks 


      document.getElementById('adminProjectButton').addEventListener('click', _member_display_toggleDisplay_js__WEBPACK_IMPORTED_MODULE_12__.displayProjects);
      document.getElementById('adminTodayButton').addEventListener('click', _member_display_toggleDisplay_js__WEBPACK_IMPORTED_MODULE_12__.displayToday);
      document.getElementById('adminWeekButton').addEventListener('click', _member_display_toggleDisplay_js__WEBPACK_IMPORTED_MODULE_12__.displayWeek);
      document.getElementById('adminMonthButton').addEventListener('click', _member_display_toggleDisplay_js__WEBPACK_IMPORTED_MODULE_12__.displayMonth);
      OpenTaskButton.addEventListener('click', _member_addTask_js__WEBPACK_IMPORTED_MODULE_10__.openAddTaskPanel);
      AddTaskButton.addEventListener('click', _member_addTask_js__WEBPACK_IMPORTED_MODULE_10__.handleAddTask);
      (0,_member_renderSecAddTaskButtons_js__WEBPACK_IMPORTED_MODULE_14__.AddFuncToSecButtons)();
      (0,_member_display_displayProject_js__WEBPACK_IMPORTED_MODULE_13__.renderProjects)();
    }
  });
}();
const goSignInButt = document.getElementById('goSignInButton');
const goSignUpButt = document.getElementById('goSignUpButton');
const signUpButt = document.getElementById('signUpButton');
const signInButt = document.getElementById('signInButton');
goSignInButt.addEventListener('click', _nonmember_signUp_js__WEBPACK_IMPORTED_MODULE_4__.GoSignIn);
goSignUpButt.addEventListener('click', _nonmember_signIn_js__WEBPACK_IMPORTED_MODULE_3__.GoSignUp);
signInButt.addEventListener('click', function () {
  currentUser = (0,_nonmember_signIn_js__WEBPACK_IMPORTED_MODULE_3__.handleSignIn)();
});

/***/ }),

/***/ "./src/initializeFirebase.js":
/*!***********************************!*\
  !*** ./src/initializeFirebase.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "db": () => (/* binding */ db)
/* harmony export */ });
/* harmony import */ var firebase_compat_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/compat/app */ "./node_modules/firebase/compat/app/dist/index.esm.js");
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/firestore */ "./node_modules/firebase/firestore/dist/index.esm.js");

 // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCL_P-cvDN5AMTtGGqjZahbLugs06Kr4L0",
  authDomain: "to-do-list---javascript.firebaseapp.com",
  projectId: "to-do-list---javascript",
  storageBucket: "to-do-list---javascript.appspot.com",
  messagingSenderId: "323621901012",
  appId: "1:323621901012:web:9ea149fbbf3cc8aece6141"
}; // Initialize Firebase

const app = firebase_compat_app__WEBPACK_IMPORTED_MODULE_0__["default"].initializeApp(firebaseConfig);
const db = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.getFirestore)();


/***/ }),

/***/ "./src/member/Todo.js":
/*!****************************!*\
  !*** ./src/member/Todo.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderToDo": () => (/* binding */ renderToDo)
/* harmony export */ });
/* harmony import */ var _signOutButton_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./signOutButton.js */ "./src/member/signOutButton.js");
 //import { renderAdminPanel } from './adminPanel.js';

const renderToDo = () => {
  const element = document.createElement('div');
  element.innerHTML = "<div id = 'member-innerContainer'>" + "<div id = 'center_container'>" + "<div id = 'side-panel'></div>" + "<div id = 'output-panel'>" + "<div id = 'displayContainer'>" + "<div id = 'displayProjectCon'>" + "<h2>Projects</h2>" + "<div id = 'displayProjectsContent'></div>" + "</div>" + "<div id = 'displayTodayCon'>" + "<h2>Today's Tasks</h2>" + "<div id = 'displayTodayContent'></div>" + "</div>" + "<div id = 'displayWeekCon'>" + "<h2>This Week's Tasks</h2>" + "<div id = 'displayWeekContent'></div>" + "</div>" + "<div id = 'displayMonthCon'>" + "<h2>This Month's Tasks</h2>" + "<div id = 'displayMonthContent'></div>" + "</div>" + "<div id = 'displaySingleProject'>" + "</div>" + "<div id = 'displaySingleTask'>" + "</div>" + "</div>" + "</div >" + "<div id = 'addProjectPanel'></div>" + "<div id = 'addTaskPanel'></div>" + "<div id = 'SecondaryAddTaskPanel'></div>" + "<div id = 'displayTaskPanel'></div>" + "</div>" + "</div>";
  "<span id = 'empty'></span>"; //    element.appendChild(renderSignOutButton());

  return element;
};

/***/ }),

/***/ "./src/member/addProject.js":
/*!**********************************!*\
  !*** ./src/member/addProject.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderAddProj": () => (/* binding */ renderAddProj),
/* harmony export */   "getProjectList": () => (/* binding */ getProjectList),
/* harmony export */   "openAddProjectPanel": () => (/* binding */ openAddProjectPanel),
/* harmony export */   "closeAddProjectPanel": () => (/* binding */ closeAddProjectPanel),
/* harmony export */   "handleAddProject": () => (/* binding */ handleAddProject)
/* harmony export */ });
/* harmony import */ var firebase_compat_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/compat/app */ "./node_modules/firebase/compat/app/dist/index.esm.js");
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/auth */ "./node_modules/firebase/auth/dist/index.esm.js");
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/firestore */ "./node_modules/firebase/firestore/dist/index.esm.js");
/* harmony import */ var _initializeFirebase_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../initializeFirebase.js */ "./src/initializeFirebase.js");
/* harmony import */ var _components_randGen_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/randGen.js */ "./src/components/randGen.js");
/* harmony import */ var _getProjectList_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../getProjectList.js */ "./src/getProjectList.js");
/* harmony import */ var _display_displayProject_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./display/displayProject.js */ "./src/member/display/displayProject.js");
/* harmony import */ var _addTask_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./addTask.js */ "./src/member/addTask.js");









const auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.getAuth)();
const InitProjectInfo = {
  title: '',
  deadline: '',
  status: ''
};
var projectInfo = {
  title: '',
  deadline: '',
  status: ''
};
const statusOptions = ['Ongoing', 'Done', 'Put on hold'];
const renderAddProj = () => {
  const element = "<h1 style = 'margin-top: 50px;'>Add Project</h1>" + "<div id = 'addProjectPanelContainer'>" + "<div id = 'inputField'>" + "<h3>Project Title</h3>" + "<input type = 'text' id = 'add_projectTitle' />" + "</div>" + "<div id = 'addProject_2ndcontainer' >" + "<div id = 'project_status_input'>" + "<h3>Progress Status</h3>" + "<select id = 'addProject_selection'>" + "<option value = '0'>Ongoing</option>" + "<option value = '1'>Done</option>" + "<option value = '2'>Put on hold</option>" + "</select>" + "</div>" + "<div id = 'project_deadline_input'>" + "<h3>Deadline Date</h3>" + "<input type = 'date' id = 'project_deadlineInput' />" + "</div>" + "</div>" + "<div id = 'AddProjectButtonContainer'>" + "<div id = 'AddProjectButtonContainer_box1'>" + "<button id = 'addProjectButton'>Add</button>" + "</div>" + "<div id = 'AddProjectButtonContainer_box1'>" + "<button id = 'CancelAddProjectButton'>Cancel</button>" + "</div>" + "</div>" + "</div>";
  return element;
}; //retrieves an array of all Project ID's 

const getProjectList = async () => {
  var projectList = [];
  const q = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.query)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.collection)(_initializeFirebase_js__WEBPACK_IMPORTED_MODULE_3__.db, 'project', auth.currentUser.uid, "ProjectList"));
  const snapshot = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.getDocs)(q);
  snapshot.forEach(doc => {
    projectList.push(doc.id);
  });
  return projectList;
};
const openAddProjectPanel = async () => {
  const ProjectPanel = document.getElementById('addProjectPanel');
  ProjectPanel.style.display = 'inline-block';
};
const closeAddProjectPanel = () => {
  const ProjectPanel = document.getElementById('addProjectPanel');
  ProjectPanel.style.display = 'none';
  projectInfo = Object.assign(InitProjectInfo);
  document.getElementById('add_projectTitle').value = '';
  document.getElementById('addProject_selection').value = 0;
  document.getElementById('project_deadlineInput').value = '';
};
const handleAddProject = async () => {
  projectInfo.title = document.getElementById('add_projectTitle').value;
  projectInfo.status = statusOptions[document.getElementById('addProject_selection').value];
  projectInfo.deadline = document.getElementById('project_deadlineInput').value;
  var closeWindow = true;

  if (projectInfo.title) {
    const deadline_date = new Date(projectInfo.deadline);
    const UTCTime = new Date(deadline_date.getUTCFullYear(), deadline_date.getUTCMonth(), deadline_date.getUTCDate(), deadline_date.getUTCHours(), deadline_date.getUTCMinutes(), deadline_date.getUTCSeconds());
    const currentTime = new Date(Date.now());

    if (UTCTime >= currentTime || UTCTime.toLocaleDateString() >= currentTime.toLocaleDateString()) {
      let repeat = false;
      var codeID = (0,_components_randGen_js__WEBPACK_IMPORTED_MODULE_4__.generateCode)(20);
      await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.setDoc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.doc)(_initializeFirebase_js__WEBPACK_IMPORTED_MODULE_3__.db, 'project', auth.currentUser.uid, 'ProjectList', codeID), {
        title: projectInfo.title,
        status: projectInfo.status,
        deadline: firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.Timestamp.fromDate(UTCTime)
      }).then(snap => {
        (0,_display_displayProject_js__WEBPACK_IMPORTED_MODULE_6__.addProjectToProjectDisplay)(projectInfo.title, codeID);
        (0,_addTask_js__WEBPACK_IMPORTED_MODULE_7__.addProjectToSelection)(projectInfo.title, codeID);
        (0,_getProjectList_js__WEBPACK_IMPORTED_MODULE_5__.fillProjectList)();
        closeWindow = true;
      }).catch(error => {
        alert(error.code + ": " + error.message);
      });
    } else {
      alert("The date you've chosen cannot be earlier than today's date. ");
      closeWindow = false;
    }
  } else {
    alert('Please, type in the title of the project.');
    closeWindow = false;
  }

  if (closeWindow) closeAddProjectPanel();
};

/***/ }),

/***/ "./src/member/addTask.js":
/*!*******************************!*\
  !*** ./src/member/addTask.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderAddTaskPanel": () => (/* binding */ renderAddTaskPanel),
/* harmony export */   "openAddTaskPanel": () => (/* binding */ openAddTaskPanel),
/* harmony export */   "closeAddTaskPanel": () => (/* binding */ closeAddTaskPanel),
/* harmony export */   "fillTaskSelection": () => (/* binding */ fillTaskSelection),
/* harmony export */   "renderProjectCategory": () => (/* binding */ renderProjectCategory),
/* harmony export */   "addProjectToSelection": () => (/* binding */ addProjectToSelection),
/* harmony export */   "handleAddTask": () => (/* binding */ handleAddTask),
/* harmony export */   "openAddTaskPanelwithProjectID": () => (/* binding */ openAddTaskPanelwithProjectID),
/* harmony export */   "renderSecAddTaskPanel": () => (/* binding */ renderSecAddTaskPanel),
/* harmony export */   "closeSecAddTaskPanel": () => (/* binding */ closeSecAddTaskPanel),
/* harmony export */   "openSecAddTaskPanel": () => (/* binding */ openSecAddTaskPanel),
/* harmony export */   "handleSecondaryAddTask": () => (/* binding */ handleSecondaryAddTask)
/* harmony export */ });
/* harmony import */ var firebase_compat_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/compat/app */ "./node_modules/firebase/compat/app/dist/index.esm.js");
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/auth */ "./node_modules/firebase/auth/dist/index.esm.js");
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/firestore */ "./node_modules/firebase/firestore/dist/index.esm.js");
/* harmony import */ var _initializeFirebase_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../initializeFirebase.js */ "./src/initializeFirebase.js");
/* harmony import */ var _components_randGen_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/randGen.js */ "./src/components/randGen.js");
/* harmony import */ var _getProjectList_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../getProjectList.js */ "./src/getProjectList.js");
/* harmony import */ var _display_displayProject_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./display/displayProject.js */ "./src/member/display/displayProject.js");
/* harmony import */ var _renderSecAddTaskButtons_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./renderSecAddTaskButtons.js */ "./src/member/renderSecAddTaskButtons.js");









const auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.getAuth)();
const InitTaskInfo = {
  title: '',
  deadline: '',
  status: '',
  urgency: '',
  projectID: '',
  description: ''
};
var taskInfo = {
  title: '',
  deadline: '',
  status: '',
  urgency: '',
  projectID: '',
  description: ''
};
const urgency = ['Low Priority', 'Modest Level Priority', 'High Priority'];
const statusOptions = ['Ongoing', 'Done', 'Put on hold'];
const renderAddTaskPanel = () => {
  const element = "<h1 style = 'margin-top: 50px;'>Add Task</h1>" + "<div id = 'addProjectPanelContainer'>" + "<div id = 'inputField'>" + "<h3>Name of Task</h3>" + "<input type = 'text' id = 'add_taskName' />" + "</div>" + "<div id = 'inputField' style = 'margin-top: 20px;'>" + "<h3>Descripton</h3>" + "<textarea type = 'text' id = 'addTask_description' rows = 2 placeholder = '[Optional] Briefly, describe your task.'></textarea>" + "</div>" + "<div id = 'addProject_2ndcontainer' >" + "<div id = 'task_status_input'>" + "<h3>Progress Status</h3>" + "<select id = 'addTask_status'>" + "<option value = '0'>Ongoing</option>" + "<option value = '1'>Done</option>" + "<option value = '2'>Put on hold</option>" + "</select>" + "</div>" + "<div id = 'task_deadline_input_container'>" + "<h3>Deadline Date</h3>" + "<input type = 'date' id = 'task_deadlineInput' />" + "</div>" + "</div>" + "<div id = 'addProject_2ndcontainer' >" + "<div id = 'Task_priority_input'>" + "<h3>Urgency</h3>" + "<select id = 'addTask_urgency'>" + "<option value = '0'>Low priority</option>" + "<option value = '1'>Modest level priority</option>" + "<option value = '2'>High priority</option>" + "</select>" + "</div>" + "<div id = 'Project_category_container'>" + "<h3>Project Category</h3>" + "<div id = 'AssignProject'></div>" + "</div>" + "</div>" + "<div id = 'AddTaskButtonContainer'>" + "<div id = 'AddTaskButtonContainer_box1'>" + "<button id = 'addTaskButton'>Add</button>" + "</div>" + "<div id = 'AddProjectButtonContainer_box1'>" + "<button id = 'CancelAddTaskButton'>Cancel</button>" + "</div>" + "</div>" + "</div>";
  return element;
};
const openAddTaskPanel = () => {
  const ProjectPanel = document.getElementById('addTaskPanel');
  ProjectPanel.style.display = 'inline-block'; //deselect the value in the Project Select list 

  const ProjectSelect = document.getElementById('AddTask_ProjectCategory_Selection');
  ProjectSelect.selectedIndex = '-1';
};
const closeAddTaskPanel = () => {
  const ProjectPanel = document.getElementById('addTaskPanel');
  ProjectPanel.style.display = 'none';
  taskInfo = Object.assign(InitTaskInfo);
  document.getElementById('add_taskName').value = '';
  document.getElementById('addTask_description').value = '';
  document.getElementById('addTask_status').value = 0;
  document.getElementById('task_deadlineInput').value = '';
  document.getElementById('AddTask_ProjectCategory_Selection').value = 'none';
}; //This is working, but it's slow

/*
export const renderProjectCategory = async() => {
    const element = document.createElement('select');
    element.setAttribute('id', 'AddTask_ProjectCategory_Selection'); 
    const firstOption = document.createElement('OPTION');
    firstOption.value = 'none'; 
    firstOption.innerHTML = 'none'; 
    element.appendChild(firstOption);
    const ProjectList = await Object.assign(getProjectNamesList());
    console.log(ProjectList[0]);
    const q = query(collection(db, 'project', auth.currentUser.uid, 'ProjectList'));
    const snapshot = await getDocs(q)
        .then(async data => {
            data.forEach(async snap => {
                const op = document.createElement('OPTION'); 
                op.value = snap.id;
                op.innerHTML = snap.data().title; 
                element.appendChild(op)
                
            })
        })
    return element; 
} 
*/
//this also works 

/*
export const renderProjectCategory = async () => {
    const element = document.createElement('select');
    element.setAttribute('id', 'AddTask_ProjectCategory_Selection');
    const firstOption = document.createElement('OPTION');
    firstOption.value = 'none';
    firstOption.innerHTML = 'none';
    element.appendChild(firstOption);
    const ProjectList = await Object.assign(getProjectNamesList());
    console.log(ProjectList)
    for (var i = 0; i < ProjectList.length; i++){
        const op = document.createElement('OPTION')
        op.innerHTML = ProjectList[i].title;  
        op.value = ProjectList[i].id; 
        element.appendChild(op)
    }
    return element;
} */

var ProjectList = [];
const fillTaskSelection = async () => {
  while (ProjectList.length > 0) {
    ProjectList.pop();
  }

  ProjectList = [];
  const q = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.query)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.collection)(_initializeFirebase_js__WEBPACK_IMPORTED_MODULE_3__.db, 'project', auth.currentUser.uid, 'ProjectList'), (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.orderBy)('title', 'asc'));
  const snapshot = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.getDocs)(q).then(async data => {
    data.forEach(async snap => {
      const obj = {
        id: snap.id,
        title: snap.data().title
      };
      ProjectList.push(obj);
    });
  }); //console.log(ProjectList)
}; //This is fills up the select tag that allows the user to select which project category the task is assigned to

const renderProjectCategory = async () => {
  const element = document.createElement('select');
  element.setAttribute('id', 'AddTask_ProjectCategory_Selection');
  const firstOption = document.createElement('OPTION');
  firstOption.value = 'none';
  firstOption.innerHTML = 'none';
  element.appendChild(firstOption);
  await fillTaskSelection();

  for (var i = 0; i < ProjectList.length; i++) {
    const op = document.createElement('OPTION');
    op.innerHTML = ProjectList[i].title;
    op.value = ProjectList[i].id;
    element.appendChild(op);
  }

  return element;
}; //This function is called when user creates a new project. This function adds the project to the Project Category Select Tag 

const addProjectToSelection = (title, ID) => {
  const newOption = document.createElement('OPTION');
  newOption.innerHTML = title;
  newOption.value = ID;
  document.getElementById('AddTask_ProjectCategory_Selection').appendChild(newOption);
};
const handleAddTask = async () => {
  taskInfo.title = document.getElementById('add_taskName').value;
  var closeWindow = true;

  if (taskInfo.title != '') {
    taskInfo.deadline = document.getElementById('task_deadlineInput').value;
    const deadline_date = new Date(taskInfo.deadline);
    const currentTime = new Date(Date.now());
    const UTCTime = new Date(deadline_date.getUTCFullYear(), deadline_date.getUTCMonth(), deadline_date.getUTCDate(), deadline_date.getUTCHours(), deadline_date.getUTCMinutes(), deadline_date.getUTCSeconds());
    console.log('Chosen Time = ' + UTCTime);
    console.log('currentTime = ' + currentTime);
    console.log(UTCTime >= currentTime);

    if (UTCTime >= currentTime || UTCTime.toLocaleDateString() >= currentTime.toLocaleDateString()) {
      taskInfo.description = document.getElementById('addTask_description').value;
      taskInfo.status = statusOptions[document.getElementById('addTask_status').value];
      taskInfo.projectID = document.getElementById('AddTask_ProjectCategory_Selection').value;
      taskInfo.urgency = urgency[document.getElementById('addTask_urgency').value];
      const codeID = (0,_components_randGen_js__WEBPACK_IMPORTED_MODULE_4__.generateCode)(20);
      const docData = {
        title: taskInfo.title,
        ProjectID: taskInfo.projectID,
        description: taskInfo.description,
        status: taskInfo.status,
        urgency: taskInfo.urgency,
        deadline: firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.Timestamp.fromDate(UTCTime),
        dateCreated: firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.Timestamp.fromDate(currentTime),
        isFinished: false
      };
      await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.setDoc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.doc)(_initializeFirebase_js__WEBPACK_IMPORTED_MODULE_3__.db, 'task', auth.currentUser.uid, 'TaskList', codeID), docData).then(snap => {
        (0,_display_displayProject_js__WEBPACK_IMPORTED_MODULE_6__.addTaskToProjectDisplay)(taskInfo.projectID, codeID, taskInfo.title, taskInfo.description, taskInfo.urgency, taskInfo.status, firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.Timestamp.fromDate(UTCTime), firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.Timestamp.fromDate(currentTime), taskInfo.isFinished);
        closeWindow = true;
      }).catch(error => {
        alert(error.code + ": " + error.message);
      });
      closeWindow = true;
    } else {
      alert("The date you've chosen cannot be earlier than today's date. ");
      closeWindow = false;
    }
  } else {
    alert('Please, type the name of your task.');
    closeWindow = false;
  }

  if (closeWindow) {
    closeAddTaskPanel();
  }
}; //This is not working because for some reason selectedIndex is not working as it is intended.

function openAddTaskPanelwithProjectID(projectID) {
  const ProjectSelect = document.getElementById('AddTask_ProjectCategory_Selection');
  console.log(ProjectSelect.selctedIndex);

  for (var i = 0; i < ProjectSelect.options.length; i++) {
    if (projectID === ProjectSelect.options[i].value) {
      ProjectSelect.selectedIndex = i;
    } else {}
  } //    console.log(ProjectSelect.selectedIndex);


  openAddTaskPanel();
}
var SecondaryTaskInfo = {
  title: '',
  deadline: '',
  status: '',
  urgency: '',
  projectID: '',
  description: ''
}; //Secondary Add Task Panel 

const renderSecAddTaskPanel = () => {
  const element = "<h1 style = 'margin-top: 50px;'>Add Task</h1>" + "<div id = 'addProjectPanelContainer'>" + "<div id = 'inputField'>" + "<h3>Name of Task</h3>" + "<input type = 'text' id = 'add_taskName-SEC' />" + "</div>" + "<div id = 'inputField' style = 'margin-top: 20px;'>" + "<h3>Descripton</h3>" + "<textarea type = 'text' id = 'addTask_description-SEC' rows = 2 placeholder = '[Optional] Briefly, describe your task.'></textarea>" + "</div>" + "<div id = 'addProject_2ndcontainer' >" + "<div id = 'task_status_input'>" + "<h3>Progress Status</h3>" + "<select id = 'addTask_status-SEC'>" + "<option value = '0'>Ongoing</option>" + "<option value = '1'>Done</option>" + "<option value = '2'>Put on hold</option>" + "</select>" + "</div>" + "<div id = 'task_deadline_input_container'>" + "<h3>Deadline Date</h3>" + "<input type = 'date' id = 'task_deadlineInput-SEC' />" + "</div>" + "</div>" + "<div id = 'addProject_2ndcontainer' >" + "<div id = 'Task_priority_input'>" + "<h3>Urgency</h3>" + "<select id = 'addTask_urgency-SEC'>" + "<option value = '0'>Low priority</option>" + "<option value = '1'>Modest level priority</option>" + "<option value = '2'>High priority</option>" + "</select>" + "</div>" + "<div id = 'Project_category_container'>" + "<h3>Project Category</h3>" + "<div id = 'AssignProject-SEC'></div>" + "</div>" + "</div>" + "<div id = 'AddTaskButtonContainer'>" + "<div id = 'AddTaskButtonContainer_box1'>" + "<button id = 'addTaskButton-SEC'>Add</button>" + "</div>" + "<div id = 'AddProjectButtonContainer_box1'>" + "<button id = 'CancelAddTaskButton-SEC'>Cancel</button>" + "</div>" + "</div>" + "</div>";
  return element;
}; //function for closing the Secondary Add Task panel 

const closeSecAddTaskPanel = () => {
  const panel = document.getElementById('SecondaryAddTaskPanel');
  panel.style.display = 'none'; //reset values 

  SecondaryTaskInfo = Object.assign(InitTaskInfo);
  document.getElementById('add_taskName-SEC').value = '';
  document.getElementById('task_deadlineInput-SEC').value = '';
  document.getElementById('addTask_description-SEC').value = '';
  document.getElementById('addTask_status-SEC').value = 0;
  document.getElementById('addTask_urgency-SEC').value = 0;
  document.getElementById('AssignProject-SEC').childNodes[0].remove();
};
var count = 0;
const openSecAddTaskPanel = (title, ProjectID) => {
  SecondaryTaskInfo = Object.assign(InitTaskInfo); //get ID of Project Category element 

  const ProjectCat = document.getElementById('AssignProject-SEC');
  const panel = document.getElementById('SecondaryAddTaskPanel');
  panel.style.display = 'inline-block';
  const Projecttitle = document.createElement('span');
  Projecttitle.innerHTML = title;
  Projecttitle.setAttribute('id', 'SecAddTask_ProjectTitle');
  ProjectCat.appendChild(Projecttitle); //The following commented-out code is an example of what not to do. 
  //I think it's a bad idea to add an event listener to the button in this function.
  //Everytime the function gets called, the event listener gets added despite there being another event listener attached already.
  //So, multiple event listeners get attached. 

  /*
  const AddButton = document.getElementById('addTaskButton-SEC');
  AddButton.addEventListener('click', () => { handleSecondaryAddTask(ProjectID) })
    document.getElementById('CancelAddTaskButton-SEC').addEventListener('click', function () {
      closeSecAddTaskPanel();
  })*/

  (0,_renderSecAddTaskButtons_js__WEBPACK_IMPORTED_MODULE_7__.setProjectID)(ProjectID);
};
const handleSecondaryAddTask = async ProjectID => {
  SecondaryTaskInfo.title = document.getElementById('add_taskName-SEC').value;
  var closeWindow = true;

  if (SecondaryTaskInfo.title != '') {
    SecondaryTaskInfo.deadline = document.getElementById('task_deadlineInput-SEC').value;
    const deadline_date = new Date(SecondaryTaskInfo.deadline);
    const UTCTime = new Date(deadline_date.getUTCFullYear(), deadline_date.getUTCMonth(), deadline_date.getUTCDate(), deadline_date.getUTCHours(), deadline_date.getUTCMinutes(), deadline_date.getUTCSeconds());
    const currentTime = new Date(Date.now());

    if (UTCTime >= currentTime || UTCTime.toLocaleDateString() >= currentTime.toLocaleDateString()) {
      SecondaryTaskInfo.description = document.getElementById('addTask_description-SEC').value;
      SecondaryTaskInfo.status = statusOptions[document.getElementById('addTask_status-SEC').value];
      SecondaryTaskInfo.projectID = ProjectID;
      SecondaryTaskInfo.urgency = urgency[document.getElementById('addTask_urgency-SEC').value];
      const codeID = (0,_components_randGen_js__WEBPACK_IMPORTED_MODULE_4__.generateCode)(20);
      const docData = {
        title: SecondaryTaskInfo.title,
        ProjectID: SecondaryTaskInfo.projectID,
        description: SecondaryTaskInfo.description,
        status: SecondaryTaskInfo.status,
        urgency: SecondaryTaskInfo.urgency,
        deadline: firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.Timestamp.fromDate(UTCTime),
        dateCreated: firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.Timestamp.fromDate(currentTime),
        isFinished: false
      };
      await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.setDoc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.doc)(_initializeFirebase_js__WEBPACK_IMPORTED_MODULE_3__.db, 'task', auth.currentUser.uid, 'TaskList', codeID), docData).then(snap => {
        (0,_display_displayProject_js__WEBPACK_IMPORTED_MODULE_6__.addTaskToProjectDisplay)(SecondaryTaskInfo.projectID, codeID, SecondaryTaskInfo.title, SecondaryTaskInfo.description, SecondaryTaskInfo.urgency, SecondaryTaskInfo.status, firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.Timestamp.fromDate(UTCTime), firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.Timestamp.fromDate(currentTime), false);
        closeWindow = true;
      }).catch(error => {
        alert(error.code + ": " + error.message);
      });
      closeWindow = true;
    } else {
      alert("The date you've chosen cannot be earlier than today's date. ");
      closeWindow = false;
    }
  } else {
    alert('Please, type the name of your task.');
    closeWindow = false;
  }

  if (closeWindow) {
    closeSecAddTaskPanel();
  }
};

/***/ }),

/***/ "./src/member/adminPanel.js":
/*!**********************************!*\
  !*** ./src/member/adminPanel.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderAdminPanel": () => (/* binding */ renderAdminPanel)
/* harmony export */ });
/* harmony import */ var _display_toggleDisplay_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./display/toggleDisplay.js */ "./src/member/display/toggleDisplay.js");

const renderAdminPanel = () => {
  const element = "<div id = 'adminPanelContainer'><ul id = 'adminPanel'>" + "<li id = 'admin-title'>View</li>" + "<li><button class = 'admin-options' id = 'adminProjectButton'>Projects</button></li>" + "<li><button class = 'admin-options' id = 'adminTodayButton'>Today</button></li>" + "<li><button class = 'admin-options' id = 'adminWeekButton'>Week</button></li>" + "<li><button class = 'admin-options' id = 'adminMonthButton'>Month</button></li>" + "<li id = 'admin-title'>Actions</li>" + "<li><button class = 'admin-options' id = 'Admin_addProjectButton'>Add Project</button></li>" + "<li><button class = 'admin-options' id = 'Admin_addTaskButton'>Add task</button></li>" + "<li><button class = 'admin-options' id = 'signOutButton'>Sign Out</button></li>" + "</ul></div>";
  return element;
};

/***/ }),

/***/ "./src/member/display/displayProject.js":
/*!**********************************************!*\
  !*** ./src/member/display/displayProject.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fillProjectList": () => (/* binding */ fillProjectList),
/* harmony export */   "renderProjects": () => (/* binding */ renderProjects),
/* harmony export */   "addProjectToProjectDisplay": () => (/* binding */ addProjectToProjectDisplay),
/* harmony export */   "addTaskToProjectDisplay": () => (/* binding */ addTaskToProjectDisplay),
/* harmony export */   "deleteTask": () => (/* binding */ deleteTask),
/* harmony export */   "removeProj": () => (/* binding */ removeProj)
/* harmony export */ });
/* harmony import */ var _getProjectList_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../getProjectList.js */ "./src/getProjectList.js");
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/auth */ "./node_modules/firebase/auth/dist/index.esm.js");
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/firestore */ "./node_modules/firebase/firestore/dist/index.esm.js");
/* harmony import */ var _initializeFirebase_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../initializeFirebase.js */ "./src/initializeFirebase.js");
/* harmony import */ var _asset_trash_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../asset/trash.png */ "./src/asset/trash.png");
/* harmony import */ var _asset_add_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../asset/add.png */ "./src/asset/add.png");
/* harmony import */ var _addTask_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../addTask.js */ "./src/member/addTask.js");
/* harmony import */ var _displayTask_displayTaskLogic_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./displayTask/displayTaskLogic.js */ "./src/member/display/displayTask/displayTaskLogic.js");
/* harmony import */ var _displayTask_renderTaskPanel_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./displayTask/renderTaskPanel.js */ "./src/member/display/displayTask/renderTaskPanel.js");









const list = [];
const auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.getAuth)();
const fillProjectList = async () => {
  const q = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.query)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.collection)(_initializeFirebase_js__WEBPACK_IMPORTED_MODULE_3__.db, 'project', auth.currentUser.uid, 'ProjectList'), (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.orderBy)('title', 'asc'));
  const snapshot = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.getDocs)(q).then(data => {
    data.forEach(async snap => {
      const obj = {
        id: snap.id,
        title: snap.data().title
      };
      list.push(obj);
    });
  });
};
const renderProjects = async () => {
  const displayCont = document.getElementById('displayProjectsContent');
  await fillProjectList();
  const displayTaskPanel = document.getElementById('displayTaskPanel'); //  const list = await retrieveProjectNamesList(); 

  for (var i = 0; i < list.length; i++) {
    //create container
    const container = document.createElement('div');
    container.setAttribute('id', 'projectItemContainer');
    container.style.display = 'grid';
    displayCont.appendChild(container); //create the list item

    const ProjectButton = document.createElement('button');
    ProjectButton.setAttribute('id', 'projectTitleButton');
    ProjectButton.innerHTML = list[i].title;
    const Project_id = list[i].id;
    const Project_title = list[i].title; //create div for trash button to appear 

    const trashContainer = document.createElement('div');
    trashContainer.setAttribute('id', 'trashContainer'); //renders the delete button for each project 

    const delButton = document.createElement('img');
    delButton.setAttribute('id', 'trashIcon');
    delButton.src = _asset_trash_png__WEBPACK_IMPORTED_MODULE_4__;
    trashContainer.appendChild(delButton);
    delButton.addEventListener('click', function () {
      handleDelProject(Project_title, Project_id);
    }); //create a mouseover event for the container for the trash icon to appear 

    container.addEventListener('mouseover', function () {
      delButton.style.display = 'block';
    });
    container.addEventListener('mouseout', function () {
      delButton.style.display = 'none';
    });
    container.appendChild(ProjectButton);
    container.appendChild(trashContainer); //obtain tasks of each project 

    const tasks = await (0,_getProjectList_js__WEBPACK_IMPORTED_MODULE_0__.getTaskListByProjectID)(list[i].id);
    const panel = document.createElement('div');
    panel.setAttribute('id', 'AllProjectTasks');
    const listElement = document.createElement('ul');
    listElement.setAttribute('id', Project_id);

    if (tasks.length !== 0) {
      tasks.forEach(val => {
        const listItem = document.createElement('li'); //Add checkbox for each task in the display list

        const check = document.createElement('INPUT');
        check.setAttribute("type", "checkbox");
        check.setAttribute('class', 'task_checkbox');
        check.checked = val.isFinished;
        check.addEventListener('change', function () {
          //pass  the id and boolean value of the check box to toggleCheckBox so that the value in firebase reflects true value 
          (0,_getProjectList_js__WEBPACK_IMPORTED_MODULE_0__.toggleCheckBox)(val.id, this.checked);
        });
        listItem.appendChild(check);
        const listText = document.createElement('span');
        listText.setAttribute('id', 'displayTaskLink');
        const TaskID = val.id;
        const taskTitle = val.title;
        const taskDescription = val.description;
        const taskUrgency = val.urgency;
        const taskDeadline = val.deadline;
        const taskStatus = val.status;
        const taskDateCreated = val.dateCreated;
        listText.addEventListener('click', () => {
          (0,_displayTask_renderTaskPanel_js__WEBPACK_IMPORTED_MODULE_8__.fillTaskInfo)(taskTitle, taskDescription, taskUrgency, taskDeadline, taskStatus, taskDateCreated, Project_id, TaskID, check.checked);
          (0,_displayTask_renderTaskPanel_js__WEBPACK_IMPORTED_MODULE_8__.renderTaskPanel)(Project_title, TaskID);
          displayTaskPanel.style.display = 'inline-block';
        });
        listText.innerHTML = val.title;
        listItem.appendChild(listText);
        listItem.setAttribute('class', 'taskListItem');
        listItem.setAttribute('id', TaskID);
        listElement.appendChild(listItem);
      });
    } //adds an option for users to add Task under each Project


    const addTaskElement = document.createElement('li');
    const plusIcon = document.createElement('IMG');
    plusIcon.src = _asset_add_png__WEBPACK_IMPORTED_MODULE_5__;
    plusIcon.setAttribute('id', 'add_icon');
    plusIcon.style.display = 'inline-block';
    addTaskElement.appendChild(plusIcon);
    const addTaskPrompt = document.createElement('span');
    addTaskPrompt.innerHTML = 'Add Task';
    addTaskPrompt.style.display = 'inline-block';
    addTaskElement.appendChild(addTaskPrompt);
    addTaskElement.setAttribute('class', 'addTaskListItem');
    addTaskElement.setAttribute('id', 'addTaskListItem'); //add function for Add Task 

    addTaskElement.addEventListener('click', function () {
      (0,_addTask_js__WEBPACK_IMPORTED_MODULE_6__.openSecAddTaskPanel)(Project_title, Project_id);
    });
    listElement.appendChild(addTaskElement);
    panel.appendChild(listElement);
    ProjectButton.addEventListener('click', function () {
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    }); // ProjectButton.appendChild(panel);

    container.appendChild(panel);
  }
}; //This adds project to the Projects View when the user uses the Add Project panel to create a new project

const addProjectToProjectDisplay = (title, ID) => {
  const displayCont = document.getElementById('displayProjectsContent'); //create container

  const container = document.createElement('div');
  container.setAttribute('id', 'projectItemContainer');
  container.style.display = 'grid';
  displayCont.appendChild(container); //create the list item

  const ProjectButton = document.createElement('button');
  ProjectButton.setAttribute('id', 'projectTitleButton');
  ProjectButton.innerHTML = title;
  const trashContainer = document.createElement('div');
  trashContainer.setAttribute('id', 'trashContainer');
  const delButton = document.createElement('img');
  delButton.setAttribute('id', 'trashIcon');
  delButton.src = _asset_trash_png__WEBPACK_IMPORTED_MODULE_4__;
  trashContainer.appendChild(delButton);
  delButton.addEventListener('click', function () {
    handleDelProject(title, ID);
  });
  container.addEventListener('mouseover', function () {
    delButton.style.display = 'block';
  });
  container.addEventListener('mouseout', function () {
    delButton.style.display = 'none';
  });
  container.appendChild(ProjectButton);
  container.appendChild(trashContainer); //start

  const panel = document.createElement('div');
  panel.setAttribute('id', 'AllProjectTasks');
  const listElement = document.createElement('ul');
  listElement.setAttribute('id', ID);
  const addTaskElement = document.createElement('li');
  const plusIcon = document.createElement('IMG');
  plusIcon.src = _asset_add_png__WEBPACK_IMPORTED_MODULE_5__;
  plusIcon.setAttribute('id', 'add_icon');
  plusIcon.style.display = 'inline-block';
  addTaskElement.appendChild(plusIcon);
  const addTaskPrompt = document.createElement('span');
  addTaskPrompt.innerHTML = 'Add Task';
  addTaskPrompt.style.display = 'inline-block';
  addTaskElement.appendChild(addTaskPrompt);
  addTaskElement.setAttribute('class', 'addTaskListItem ');
  addTaskElement.setAttribute('id', 'addTaskListItem'); //add function for Add Task 

  addTaskElement.addEventListener('click', function () {
    (0,_addTask_js__WEBPACK_IMPORTED_MODULE_6__.openSecAddTaskPanel)(title, ID);
  });
  listElement.appendChild(addTaskElement);
  panel.appendChild(listElement);
  ProjectButton.addEventListener('click', function () {
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  }); // ProjectButton.appendChild(panel);

  container.appendChild(panel);
}; //function that allows other elements to add tasks to the Project Display 

const addTaskToProjectDisplay = async (ProjectID, TaskID, title, description, urgency, status, deadline, date_created, isComplete) => {
  var ProjectTitle = '';
  const q = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.query)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.doc)(_initializeFirebase_js__WEBPACK_IMPORTED_MODULE_3__.db, 'project', auth.currentUser.uid, 'ProjectList', ProjectID));
  const snapshot = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.getDoc)(q).then(item => {
    ProjectTitle = item.data().title;
  });
  const listElement = document.getElementById(ProjectID);
  const listItem = document.createElement('li');
  const displayTaskPanel = document.getElementById('displayTaskPanel');
  const check = document.createElement('INPUT');
  check.setAttribute("type", "checkbox");
  check.setAttribute('class', 'task_checkbox');
  listItem.appendChild(check);
  const listText = document.createElement('span');
  listText.setAttribute('id', 'displayTaskLink');
  listText.innerHTML = title;
  listText.addEventListener('click', () => {
    (0,_displayTask_renderTaskPanel_js__WEBPACK_IMPORTED_MODULE_8__.fillTaskInfo)(title, description, urgency, deadline, status, date_created, ProjectID, TaskID, false);
    (0,_displayTask_renderTaskPanel_js__WEBPACK_IMPORTED_MODULE_8__.renderTaskPanel)(ProjectTitle, TaskID);
    displayTaskPanel.style.display = 'inline-block';
  });
  listItem.appendChild(listText);
  listItem.setAttribute('id', TaskID);
  listItem.setAttribute('class', 'taskListItem');
  listElement.insertBefore(listItem, listElement.lastChild);
  const panel = listItem.parentNode.parentNode;
  panel.style.maxHeight = panel.scrollHeight + 'px';
};

const handleDelProject = async (title, ID) => {
  if (confirm('You are about to delete the project ' + title + '. \n Are you sure?')) {
    (0,_getProjectList_js__WEBPACK_IMPORTED_MODULE_0__.delProject)(ID);
  } else {}
}; //This is the code for deleting a task for the delete button on  the Display Task panel
//I have to write the code here and not on renderTaskPanel.js because that file is executed before authentication 


const deleteTask = async TaskID => {
  const displayTaskPanel = document.getElementById('displayTaskPanel');
  await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.deleteDoc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.doc)(_initializeFirebase_js__WEBPACK_IMPORTED_MODULE_3__.db, 'task', auth.currentUser.uid, 'TaskList', TaskID)).then(alert('Task was successfully deleted.')).catch(e => {
    console.log(e.code + ': ' + e.message);
  });
  const item = document.getElementsByClassName('taskListItem');

  for (var i = 0; i < item.length; i++) {
    if (item[i].getAttribute('id') === TaskID) {
      item[i].remove();
    }
  }

  (0,_displayTask_renderTaskPanel_js__WEBPACK_IMPORTED_MODULE_8__.close_DisplayTask)();
}; //removes the project node after a project gets deleted 

const removeProj = async ProjectID => {
  const projContainer = await document.getElementById(ProjectID).parentNode;
  projContainer.parentNode.remove();
};

/***/ }),

/***/ "./src/member/display/displayTask/displayTaskButton.js":
/*!*************************************************************!*\
  !*** ./src/member/display/displayTask/displayTaskButton.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toggleDescriptionEdit": () => (/* binding */ toggleDescriptionEdit),
/* harmony export */   "toggleStatusEdit": () => (/* binding */ toggleStatusEdit),
/* harmony export */   "toggleDeadlineEdit": () => (/* binding */ toggleDeadlineEdit),
/* harmony export */   "toggleUrgencyEdit": () => (/* binding */ toggleUrgencyEdit)
/* harmony export */ });
const toggleDescriptionEdit = () => {
  //parentNode
  const SubZone = document.getElementById('descriptionSubZone'); //display element

  const display = document.getElementById('displayTask_description'); //select element

  const userInput = document.getElementById('displayTask_descriptionInput');
  const edit = document.getElementById('descriptionEditButton');
  const submit = document.getElementById('descriptionSubmit');
  const cancel = document.getElementById('descriptionCancelButton');

  if (edit.style.display != 'none') {
    edit.style.display = 'none';
    submit.style.display = 'inline-block';
    cancel.style.display = 'inline-block';
    SubZone.style.width = '60%';
    userInput.style.display = 'inline-block';
    display.style.display = 'none';
  } else {
    edit.style.display = 'block';
    submit.style.display = 'none';
    cancel.style.display = 'none';
    SubZone.style.width = '30%';
    userInput.style.display = 'none';
    display.style.display = 'inline-block';
  }
};
const toggleStatusEdit = () => {
  //parentNode
  const statusSubZone = document.getElementById('statusSubZone'); //display element

  const displayTask_status = document.getElementById('displayTask_status'); //select element

  const selectOptions = document.getElementById('displayTask_statusInput');
  const edit = document.getElementById('statusEditButton');
  const submit = document.getElementById('statusSubmit');
  const cancel = document.getElementById('statusCancelButton');

  if (edit.style.display != 'none') {
    edit.style.display = 'none';
    submit.style.display = 'inline-block';
    cancel.style.display = 'inline-block';
    statusSubZone.style.width = '50%';
    selectOptions.style.display = 'inline-block';
    displayTask_status.style.display = 'none';
  } else {
    edit.style.display = 'block';
    submit.style.display = 'none';
    cancel.style.display = 'none';
    statusSubZone.style.width = '25%';
    selectOptions.style.display = 'none';
    displayTask_status.style.display = 'inline-block';
  }
};
const toggleDeadlineEdit = () => {
  //parentNode
  const SubZone = document.getElementById('deadlineSubZone'); //display element

  const display = document.getElementById('displayTask_deadline'); //select element

  const userInput = document.getElementById('displayTask_deadlineInput');
  const edit = document.getElementById('deadlineEditButton');
  const submit = document.getElementById('deadlineSubmit');
  const cancel = document.getElementById('deadlineCancelButton');

  if (edit.style.display != 'none') {
    edit.style.display = 'none';
    submit.style.display = 'inline-block';
    cancel.style.display = 'inline-block'; //   SubZone.style.width = '60%'

    userInput.style.display = 'inline-block';
    display.style.display = 'none';
  } else {
    edit.style.display = 'inline-block';
    submit.style.display = 'none';
    cancel.style.display = 'none'; //       SubZone.style.width = '30%'

    userInput.style.display = 'none';
    display.style.display = 'inline-block';
  }
};
const toggleUrgencyEdit = () => {
  //parentNode
  const SubZone = document.getElementById('urgencySubZone'); //display element

  const display = document.getElementById('displayTask_urgency'); //select element

  const userInput = document.getElementById('displayTask_urgencyInput');
  const edit = document.getElementById('urgencyEditButton');
  const submit = document.getElementById('urgencySubmit');
  const cancel = document.getElementById('urgencyCancelButton');

  if (edit.style.display != 'none') {
    edit.style.display = 'none';
    submit.style.display = 'inline-block';
    cancel.style.display = 'inline-block'; //   SubZone.style.width = '60%'

    userInput.style.display = 'inline-block';
    display.style.display = 'none';
  } else {
    edit.style.display = 'inline-block';
    submit.style.display = 'none';
    cancel.style.display = 'none'; //       SubZone.style.width = '30%'

    userInput.style.display = 'none';
    display.style.display = 'inline-block';
  }
};

/***/ }),

/***/ "./src/member/display/displayTask/displayTaskLogic.js":
/*!************************************************************!*\
  !*** ./src/member/display/displayTask/displayTaskLogic.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getID": () => (/* binding */ getID),
/* harmony export */   "displayTaskDetails": () => (/* binding */ displayTaskDetails),
/* harmony export */   "loadDisplayTaskDom": () => (/* binding */ loadDisplayTaskDom),
/* harmony export */   "openDisplayTask": () => (/* binding */ openDisplayTask),
/* harmony export */   "closeDisplayTask": () => (/* binding */ closeDisplayTask)
/* harmony export */ });
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/firestore */ "./node_modules/firebase/firestore/dist/index.esm.js");
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/auth */ "./node_modules/firebase/auth/dist/index.esm.js");
/* harmony import */ var _initializeFirebase_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../initializeFirebase.js */ "./src/initializeFirebase.js");



const auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.getAuth)();
var initTaskInfo = {
  title: '',
  deadline: '',
  status: 0,
  urgency: 0,
  projectID: '',
  description: '',
  dateCreated: '',
  isFinished: false,
  id: ''
};
var taskInfo = {
  title: '',
  deadline: '',
  status: 0,
  urgency: 0,
  projectID: '',
  description: '',
  dateCreated: '',
  isFinished: false,
  id: ''
};
const displayTaskPanel = document.getElementById('displayTaskPanel');
const urgencyOptions = ['Low Priority', 'Modest Level Priority', 'High Priority'];
const statusOptions = ['Ongoing', 'Done', 'Put on hold'];
var ProjectID = '';
var TaskID = '';
const getID = (ProjID, Task_ID) => {
  ProjectID = ProjID;
  TaskID = Task_ID;
};
var taskTitle = null;
var projTitleSpan = null;
var description = null;
var progress_status = null;
var deadline_date = null;
var urgency = null;
var dateCreated = null;
const displayTaskDetails = async (ProjTitle, ID) => {
  projTitleSpan.innerHTML = ProjTitle;
  const q = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.query)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.doc)(_initializeFirebase_js__WEBPACK_IMPORTED_MODULE_2__.db, 'task', auth.currentUser.uid, 'TaskList', ID));
  const snapshot = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.getDoc)(q).then(item => {
    taskInfo.title = item.data().title;
    taskInfo.description = item.data().description;
    taskInfo.urgency = item.data().urgency;
    taskInfo.projectID = item.data().projectID;
    taskInfo.deadline = item.data().deadline;
    taskInfo.status = item.data().status;
    taskInfo.id = item.id;
  }).catch(e => {
    console.log(e.code + ': ' + e.message);
  });
  taskTitle.innerHTML = taskInfo.title;
  description.innerHTML = taskInfo.description;
  progress_status.innertHTML = taskInfo.status;
  deadline_date.innerHTML = taskInfo.deadline;
  urgency.innerHTML = taskInfo.urgency;
  dateCreated.innerHTML = taskInfo.dateCreated;
};
const loadDisplayTaskDom = () => {
  console.log(taskTitle);
  taskTitle = document.getElementById('displaytasktitle');
  projTitleSpan = document.getElementById('displayTask_ProjectTitleSpan');
  description = document.getElementById('displayTask_description');
  progress_status = document.getElementById('displayTask_status');
  deadline_date = document.getElementById('displayTask_deadline');
  urgency = document.getElementById('displayTask_urgency');
  dateCreated = document.getElementById('displayTask_dateCreated');
};
const openDisplayTask = (ProjTitle, ID) => {
  // console.log('Project title: ' + ProjTitle);
  // console.log('ID: ' + ID)
  const taskPanel = document.getElementById('displayTaskPanel');
  taskPanel.style.display = 'inline-block';
  displayTaskDetails(ProjTitle, ID);
};
const closeDisplayTask = () => {
  taskInfo = Object.assign(initTaskInfo);
  document.getElementById('displaytasktitle').innerHTML = '';
  document.getElementById('displayTask_ProjectTitleSpan').innerHTML = '';
  document.getElementById('displayTask_description').innnerHTML = '';
  document.getElementById('displayTask_urgency').innerHTML = '';
  document.getElementById('displayTask_deadline').innnerHTML = '';
  document.getElementById('displayTask_urgency').innerHTML = '';
  document.getElementById('displayTask_dateCreated').innerHTML = '';
  const taskPanel = document.getElementById('displayTaskPanel');
  taskPanel.style.display = 'none';
  var child = taskPanel.lastElementChild;

  while (child) {
    taskPanel.removeChild(child);
    child = taskPanel.lastElementChild;
  }
};

/***/ }),

/***/ "./src/member/display/displayTask/editFunctions.js":
/*!*********************************************************!*\
  !*** ./src/member/display/displayTask/editFunctions.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "editDescription": () => (/* binding */ editDescription),
/* harmony export */   "editStatus": () => (/* binding */ editStatus),
/* harmony export */   "editDeadline": () => (/* binding */ editDeadline),
/* harmony export */   "editUrgency": () => (/* binding */ editUrgency)
/* harmony export */ });
/* harmony import */ var firebase_compat_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/compat/app */ "./node_modules/firebase/compat/app/dist/index.esm.js");
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/auth */ "./node_modules/firebase/auth/dist/index.esm.js");
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/firestore */ "./node_modules/firebase/firestore/dist/index.esm.js");
/* harmony import */ var _initializeFirebase_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../initializeFirebase.js */ "./src/initializeFirebase.js");




const auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.getAuth)();
const editDescription = async taskID => {
  const userInput = document.getElementById('displayTask_descriptionInput').value;
  const task = document.getElementById(taskID);
  const docRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.doc)(_initializeFirebase_js__WEBPACK_IMPORTED_MODULE_3__.db, 'task', auth.currentUser.uid, 'TaskList', taskID);
  await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.updateDoc)(docRef, {
    description: userInput
  }).then(alert('Your edit submission has been saved.')).catch(e => {
    console.log(e.error + ': ' + e.message);
  });
};
const editStatus = async taskID => {
  const new_status = document.getElementById('displayTask_statusInput').value;
  const task = document.getElementById(taskID);
  var complete;

  if (new_status === "Done") {
    complete = true;
  } else {
    complete = false;
  }

  task.childNodes[0].checked = complete;
  const docRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.doc)(_initializeFirebase_js__WEBPACK_IMPORTED_MODULE_3__.db, 'task', auth.currentUser.uid, 'TaskList', taskID);
  await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.updateDoc)(docRef, {
    status: new_status,
    isFinished: complete
  }).then(alert('Your edit submission has been saved.')).catch(e => {
    console.log(e.error + ': ' + e.message);
  });
};
const editDeadline = async taskID => {
  const userInput = document.getElementById('displayTask_deadlineInput').value;
  const task = document.getElementById(taskID);
  const deadline_date = new Date(userInput);

  if (firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.Timestamp.fromDate(deadline_date) >= firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.Timestamp.now()) {
    const docRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.doc)(_initializeFirebase_js__WEBPACK_IMPORTED_MODULE_3__.db, 'task', auth.currentUser.uid, 'TaskList', taskID);
    await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.updateDoc)(docRef, {
      deadline: firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.Timestamp.fromDate(deadline_date)
    }).then(alert('Your edit submission has been saved.')).catch(e => {
      console.log(e.error + ': ' + e.message);
    });
  } else {
    alert("The date you've chosen cannot be earlier than today's date. ");
    closeWindow = false;
  }
};
const editUrgency = async taskID => {
  const userInput = document.getElementById('displayTask_urgencyInput').value;
  const task = document.getElementById(taskID);
  const docRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.doc)(_initializeFirebase_js__WEBPACK_IMPORTED_MODULE_3__.db, 'task', auth.currentUser.uid, 'TaskList', taskID);
  await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.updateDoc)(docRef, {
    urgency: userInput
  }).then(alert('Your edit submission has been saved.')).catch(e => {
    console.log(e.error + ': ' + e.message);
  });
};

/***/ }),

/***/ "./src/member/display/displayTask/renderTaskPanel.js":
/*!***********************************************************!*\
  !*** ./src/member/display/displayTask/renderTaskPanel.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fillTaskInfo": () => (/* binding */ fillTaskInfo),
/* harmony export */   "close_DisplayTask": () => (/* binding */ close_DisplayTask),
/* harmony export */   "renderTaskPanel": () => (/* binding */ renderTaskPanel)
/* harmony export */ });
/* harmony import */ var _displayTaskLogic_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./displayTaskLogic.js */ "./src/member/display/displayTask/displayTaskLogic.js");
/* harmony import */ var _displayProject_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../displayProject.js */ "./src/member/display/displayProject.js");
/* harmony import */ var _asset_Edit_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../asset/Edit.png */ "./src/asset/Edit.png");
/* harmony import */ var _asset_check_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../asset/check.png */ "./src/asset/check.png");
/* harmony import */ var _asset_cancel_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../asset/cancel.png */ "./src/asset/cancel.png");
/* harmony import */ var _displayTaskButton_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./displayTaskButton.js */ "./src/member/display/displayTask/displayTaskButton.js");
/* harmony import */ var _editFunctions_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./editFunctions.js */ "./src/member/display/displayTask/editFunctions.js");







var initTaskInfo = {
  title: '',
  deadline: '',
  status: 0,
  urgency: 0,
  projectID: '',
  description: '',
  dateCreated: '',
  isFinished: false,
  id: ''
};
var taskInfo = {
  title: '',
  deadline: '',
  status: '',
  urgency: '',
  projectID: '',
  description: '',
  dateCreated: '',
  isFinished: false,
  id: ''
};
const fillTaskInfo = (title, description, urgency, deadline, status, dateCreated, projectID, ID, taskIsDone) => {
  taskInfo.title = title;
  taskInfo.description = description;
  taskInfo.urgency = urgency;
  taskInfo.deadline = deadline;

  if (taskIsDone) {
    taskInfo.status = 'Done';
  } else taskInfo.status = status;

  taskInfo.dateCreated = dateCreated;
  taskInfo.projectID = projectID;
  taskInfo.id = ID;
};
const urgencyOptions = ['Low Priority', 'Modest Level Priority', 'High Priority'];
const statusOptions = ['Ongoing', 'Done', 'Put on hold'];
const close_DisplayTask = () => {
  taskInfo = Object.assign(initTaskInfo);
  document.getElementById('displaytasktitle').innerHTML = '';
  document.getElementById('displayTask_ProjectTitleSpan').innerHTML = '';
  if (taskInfo.description != '') document.getElementById('displayTask_description').innnerHTML = '';
  document.getElementById('displayTask_status').innerHTML = '';
  document.getElementById('displayTask_deadline').innnerHTML = '';
  document.getElementById('displayTask_urgency').innerHTML = '';
  document.getElementById('displayTask_dateCreated').innerHTML = '';
  const taskPanel = document.getElementById('displayTaskPanel');
  taskPanel.style.display = 'none';
  var child = taskPanel.lastElementChild;

  while (child) {
    taskPanel.removeChild(child);
    child = taskPanel.lastElementChild;
  }
};
const renderTaskPanel = async (ProjTitle, ID) => {
  const displayTaskPanel = document.getElementById('displayTaskPanel');
  const element = document.createElement('div');
  element.setAttribute('id', 'displayTaskPanel_outerFrame');
  const taskTitle = document.createElement('h1');
  taskTitle.setAttribute('id', 'displaytasktitle');
  element.append(taskTitle);
  const projectTitle = document.createElement('h3');
  const projectTitleLabel = document.createElement('span');
  projectTitleLabel.innerHTML = 'Project: ';
  const projectTitleSpan = document.createElement('span');
  projectTitleSpan.setAttribute('id', 'displayTask_ProjectTitleSpan');
  projectTitle.appendChild(projectTitleLabel);
  projectTitle.appendChild(projectTitleSpan);
  projectTitle.style.display = 'inline-block';
  element.appendChild(projectTitle); //render description 

  const descriptionCont = document.createElement('div');
  descriptionCont.setAttribute('id', 'description_container');
  const descriptionTitle = document.createElement('h4');
  descriptionTitle.innerHTML = 'Description';
  const descriptionZone = document.createElement('div');
  descriptionZone.setAttribute('id', 'descriptionZone'); //contains the description 

  const descriptionSubZone = document.createElement('div');
  descriptionSubZone.setAttribute('id', 'descriptionSubZone'); //displays description

  const description = document.createElement('p');
  description.setAttribute('id', 'displayTask_description'); //user iput

  const descriptionInput = document.createElement('INPUT');
  descriptionInput.setAttribute("type", "TEXTAREA");
  descriptionInput.setAttribute("id", "displayTask_descriptionInput"); //elements for the edit button 

  const descriptionEditButtZone = document.createElement('div');
  descriptionEditButtZone.setAttribute('id', 'DescriptionEditButtZone');
  const descriptionEditButton = document.createElement('IMG');
  descriptionEditButton.src = _asset_Edit_png__WEBPACK_IMPORTED_MODULE_2__;
  descriptionEditButton.setAttribute('class', 'displayTask_EditButton');
  descriptionEditButton.setAttribute('id', 'descriptionEditButton');
  descriptionEditButton.style.width = '25px';
  descriptionEditButton.style.height = '25px';
  descriptionEditButton.style.cursor = 'pointer';
  descriptionEditButtZone.appendChild(descriptionEditButton); //submit and cancel Button 

  const descriptionSubmit = document.createElement('IMG');
  descriptionSubmit.src = _asset_check_png__WEBPACK_IMPORTED_MODULE_3__;
  descriptionSubmit.innerHTML = 'Submit';
  descriptionSubmit.setAttribute('class', 'displayTask_button');
  descriptionSubmit.setAttribute('id', 'descriptionSubmit'); //cancel button

  const descriptionCancelButton = document.createElement('IMG');
  descriptionCancelButton.src = _asset_cancel_png__WEBPACK_IMPORTED_MODULE_4__;
  descriptionCancelButton.innerHTML = 'Cancel';
  descriptionCancelButton.setAttribute('class', 'displayTask_button');
  descriptionCancelButton.setAttribute('id', 'descriptionCancelButton');
  descriptionEditButtZone.appendChild(descriptionSubmit);
  descriptionEditButtZone.appendChild(descriptionCancelButton); //append elements 

  descriptionCont.appendChild(descriptionTitle);
  descriptionCont.appendChild(descriptionZone);
  descriptionZone.appendChild(descriptionSubZone);
  descriptionSubZone.appendChild(description);
  descriptionSubZone.appendChild(descriptionInput);
  descriptionZone.appendChild(descriptionEditButtZone); //functionality for the buttons 

  descriptionEditButton.addEventListener('click', () => {
    (0,_displayTaskButton_js__WEBPACK_IMPORTED_MODULE_5__.toggleDescriptionEdit)();
    descriptionInput.value = taskInfo.description;
  });
  descriptionSubmit.addEventListener('click', () => {
    description.innerHTML = descriptionInput.value;
    (0,_editFunctions_js__WEBPACK_IMPORTED_MODULE_6__.editDescription)(ID);
    (0,_displayTaskButton_js__WEBPACK_IMPORTED_MODULE_5__.toggleDescriptionEdit)();
  });
  descriptionCancelButton.addEventListener('click', _displayTaskButton_js__WEBPACK_IMPORTED_MODULE_5__.toggleDescriptionEdit); //end of description 
  // descriptionCont.appendChild(description);

  if (taskInfo.description != '') element.appendChild(descriptionCont); //container 1 displaying Progress and Deadline Date

  const container1 = document.createElement('div');
  container1.setAttribute('id', 'displayTask_cont1');
  const container1_div1 = document.createElement('div');
  container1_div1.setAttribute('class', 'displayTask_subCont');
  const progressTitle = document.createElement('h4');
  progressTitle.innerHTML = 'Progress Status';
  container1_div1.appendChild(progressTitle); //create the zone that contains the display div, input and the edit button 
  //NA

  const statusZone = document.createElement('div');
  statusZone.setAttribute('id', 'statusZone'); //create 2nd tier zone that contains both the display div and input
  //it's placed side by side with the status Edit Zone 

  const statusSubZone = document.createElement('div');
  statusSubZone.setAttribute('id', 'statusSubZone');
  statusSubZone.setAttribute('class', 'SubZone'); //elements for the edit button 

  const statusEditButtZone = document.createElement('div');
  statusEditButtZone.setAttribute('id', 'EditButtZone');
  const statusEditButton = document.createElement('IMG');
  statusEditButton.src = _asset_Edit_png__WEBPACK_IMPORTED_MODULE_2__;
  statusEditButton.setAttribute('id', 'statusEditButton');
  statusEditButton.style.width = '25px';
  statusEditButton.style.height = '25px';
  statusEditButton.style.cursor = 'pointer';
  statusEditButtZone.appendChild(statusEditButton); //submit and cancel Button 

  const statusSubmit = document.createElement('IMG');
  statusSubmit.src = _asset_check_png__WEBPACK_IMPORTED_MODULE_3__;
  statusSubmit.innerHTML = 'Submit';
  statusSubmit.setAttribute('class', 'displayTask_button');
  statusSubmit.setAttribute('id', 'statusSubmit'); //cancel button

  const statusCancelButton = document.createElement('IMG');
  statusCancelButton.src = _asset_cancel_png__WEBPACK_IMPORTED_MODULE_4__;
  statusCancelButton.innerHTML = 'Cancel';
  statusCancelButton.setAttribute('class', 'displayTask_button');
  statusCancelButton.setAttribute('id', 'statusCancelButton');
  statusCancelButton.addEventListener('click', _displayTaskButton_js__WEBPACK_IMPORTED_MODULE_5__.toggleStatusEdit);
  statusEditButtZone.appendChild(statusSubmit);
  statusEditButtZone.appendChild(statusCancelButton);
  const status = document.createElement('p');
  status.setAttribute('id', 'displayTask_status'); //input

  const statusEditInput = document.createElement('SELECT');
  statusEditInput.setAttribute('class', 'displayTask_editInput');
  statusEditInput.setAttribute('id', 'displayTask_statusInput');
  const ongoingOption = document.createElement('OPTION');
  ongoingOption.innerHTML = 'Ongoing';
  ongoingOption.setAttribute('value', 'Ongoing');
  const doneOption = document.createElement('OPTION');
  doneOption.innerHTML = 'Done';
  doneOption.setAttribute('value', 'Done');
  const onHoldOption = document.createElement('OPTION');
  onHoldOption.innerHTML = 'Put On Hold';
  onHoldOption.setAttribute('value', 'Put On Hold');
  statusEditInput.appendChild(ongoingOption);
  statusEditInput.appendChild(doneOption);
  statusEditInput.appendChild(onHoldOption); //functionality for the buttons 

  statusEditButton.addEventListener('click', () => {
    (0,_displayTaskButton_js__WEBPACK_IMPORTED_MODULE_5__.toggleStatusEdit)();
    statusEditInput.value = taskInfo.status;
  });
  statusSubmit.addEventListener('click', () => {
    status.innerHTML = statusEditInput.value;
    (0,_editFunctions_js__WEBPACK_IMPORTED_MODULE_6__.editStatus)(ID);
    (0,_displayTaskButton_js__WEBPACK_IMPORTED_MODULE_5__.toggleStatusEdit)();
  });
  statusSubZone.appendChild(status);
  statusSubZone.appendChild(statusEditInput);
  statusZone.appendChild(statusSubZone);
  statusZone.appendChild(statusEditButtZone);
  container1_div1.appendChild(statusZone); //  container1_div1.appendChild(status);

  const container1_div2 = document.createElement('div');
  container1_div2.setAttribute('class', 'displayTask_subCont'); //render Deadline 
  //contains deadline, user input and edit buttons 

  const deadlineZone = document.createElement('div');
  deadlineZone.setAttribute('id', 'deadlineZone'); //contains the deadline and  user input

  const deadlineSubZone = document.createElement('div');
  deadlineSubZone.setAttribute('id', 'deadlineSubZone');
  const deadlineTitle = document.createElement('h4');
  deadlineTitle.innerHTML = 'Deadline Date';
  const deadline = document.createElement('p');
  deadline.setAttribute('id', 'displayTask_deadline'); //user iput

  const deadlineInput = document.createElement('INPUT');
  deadlineInput.setAttribute("type", "date");
  deadlineInput.setAttribute("id", "displayTask_deadlineInput"); //elements for the edit button 

  const deadlineEditButtZone = document.createElement('div');
  deadlineEditButtZone.setAttribute('id', 'deadlineEditButtZone');
  const deadlineEditButton = document.createElement('IMG');
  deadlineEditButton.src = _asset_Edit_png__WEBPACK_IMPORTED_MODULE_2__;
  deadlineEditButton.setAttribute('class', 'displayTask_EditButton');
  deadlineEditButton.setAttribute('id', 'deadlineEditButton');
  deadlineEditButton.style.width = '25px';
  deadlineEditButton.style.height = '25px';
  deadlineEditButton.style.cursor = 'pointer';
  deadlineEditButtZone.appendChild(deadlineEditButton); //submit and cancel Button 

  const deadlineSubmit = document.createElement('IMG');
  deadlineSubmit.src = _asset_check_png__WEBPACK_IMPORTED_MODULE_3__;
  deadlineSubmit.innerHTML = 'Submit';
  deadlineSubmit.setAttribute('class', 'displayTask_button');
  deadlineSubmit.setAttribute('id', 'deadlineSubmit'); //cancel button

  const deadlineCancelButton = document.createElement('IMG');
  deadlineCancelButton.src = _asset_cancel_png__WEBPACK_IMPORTED_MODULE_4__;
  deadlineCancelButton.innerHTML = 'Cancel';
  deadlineCancelButton.setAttribute('class', 'displayTask_button');
  deadlineCancelButton.setAttribute('id', 'deadlineCancelButton');
  deadlineEditButtZone.appendChild(deadlineSubmit);
  deadlineEditButtZone.appendChild(deadlineCancelButton); //append elements 

  deadlineZone.appendChild(deadlineSubZone);
  deadlineSubZone.appendChild(deadline);
  deadlineSubZone.appendChild(deadlineInput);
  deadlineZone.appendChild(deadlineEditButtZone);
  container1_div2.appendChild(deadlineTitle);
  container1_div2.appendChild(deadlineZone); //Add functionality to buttons

  deadlineEditButton.addEventListener('click', () => {
    (0,_displayTaskButton_js__WEBPACK_IMPORTED_MODULE_5__.toggleDeadlineEdit)();
    deadlineInput.value = taskInfo.deadline.toDate();
  });
  deadlineSubmit.addEventListener('click', () => {
    var newDate = new Date(deadlineInput.value);
    deadline.innerHTML = newDate.toLocaleDateString();
    (0,_editFunctions_js__WEBPACK_IMPORTED_MODULE_6__.editDeadline)(ID);
    (0,_displayTaskButton_js__WEBPACK_IMPORTED_MODULE_5__.toggleDeadlineEdit)();
  });
  deadlineCancelButton.addEventListener('click', _displayTaskButton_js__WEBPACK_IMPORTED_MODULE_5__.toggleDeadlineEdit); //end of rendering deadline 

  container1.appendChild(container1_div1);
  container1.appendChild(container1_div2);
  element.appendChild(container1); //container 2 displaying urgency and dateCreated 

  const container2 = document.createElement('div');
  container2.setAttribute('id', 'displayTask_cont2');
  const container2_div1 = document.createElement('div');
  container2_div1.setAttribute('class', 'displayTask_subCont'); //render Urgency
  //contains urgency, user input and edit buttons 

  const urgencyZone = document.createElement('div');
  urgencyZone.setAttribute('id', 'urgencyZone'); //contains the urgency and  user input

  const urgencySubZone = document.createElement('div');
  urgencySubZone.setAttribute('id', 'urgencySubZone');
  const urgencyTitle = document.createElement('h4');
  urgencyTitle.innerHTML = 'Urgency';
  const urgency = document.createElement('p');
  urgency.setAttribute('id', 'displayTask_urgency'); //user iput

  const urgencyInput = document.createElement('SELECT');
  urgencyInput.setAttribute("id", "displayTask_urgencyInput"); //render options 

  const lowPriority = document.createElement('OPTION');
  const modestPriority = document.createElement('OPTION');
  const highPriority = document.createElement('OPTION');
  lowPriority.setAttribute('id', 'lowPriority');
  modestPriority.setAttribute('id', 'modestPriority');
  highPriority.setAttribute('id', 'highPriority');
  lowPriority.setAttribute('value', 'Low Priority');
  modestPriority.setAttribute('value', 'Modest Level Priority');
  highPriority.setAttribute('value', 'High Priority');
  lowPriority.innerHTML = 'Low priority';
  modestPriority.innerHTML = 'Modest level priority';
  highPriority.innerHTML = 'High priority';
  urgencyInput.appendChild(lowPriority);
  urgencyInput.appendChild(modestPriority);
  urgencyInput.appendChild(highPriority); //elements for the edit button 

  const urgencyEditButtZone = document.createElement('div');
  urgencyEditButtZone.setAttribute('id', 'urgencyEditButtZone');
  const urgencyEditButton = document.createElement('IMG');
  urgencyEditButton.src = _asset_Edit_png__WEBPACK_IMPORTED_MODULE_2__;
  urgencyEditButton.setAttribute('class', 'displayTask_EditButton');
  urgencyEditButton.setAttribute('id', 'urgencyEditButton');
  urgencyEditButton.style.width = '25px';
  urgencyEditButton.style.height = '25px';
  urgencyEditButton.style.cursor = 'pointer';
  urgencyEditButtZone.appendChild(urgencyEditButton); //submit and cancel Button 

  const urgencySubmit = document.createElement('IMG');
  urgencySubmit.src = _asset_check_png__WEBPACK_IMPORTED_MODULE_3__;
  urgencySubmit.innerHTML = 'Submit';
  urgencySubmit.setAttribute('class', 'displayTask_button');
  urgencySubmit.setAttribute('id', 'urgencySubmit'); //cancel button

  const urgencyCancelButton = document.createElement('IMG');
  urgencyCancelButton.src = _asset_cancel_png__WEBPACK_IMPORTED_MODULE_4__;
  urgencyCancelButton.innerHTML = 'Cancel';
  urgencyCancelButton.setAttribute('class', 'displayTask_button');
  urgencyCancelButton.setAttribute('id', 'urgencyCancelButton');
  urgencyEditButtZone.appendChild(urgencySubmit);
  urgencyEditButtZone.appendChild(urgencyCancelButton); //append elements 

  urgencyZone.appendChild(urgencySubZone);
  urgencySubZone.appendChild(urgency);
  urgencySubZone.appendChild(urgencyInput);
  urgencyZone.appendChild(urgencyEditButtZone); //Add functionality to buttons

  urgencyEditButton.addEventListener('click', () => {
    (0,_displayTaskButton_js__WEBPACK_IMPORTED_MODULE_5__.toggleUrgencyEdit)();
    urgencyInput.value = taskInfo.urgency;
  });
  urgencySubmit.addEventListener('click', () => {
    urgency.innerHTML = urgencyInput.value;
    (0,_editFunctions_js__WEBPACK_IMPORTED_MODULE_6__.editUrgency)(ID);
    (0,_displayTaskButton_js__WEBPACK_IMPORTED_MODULE_5__.toggleUrgencyEdit)();
  });
  urgencyCancelButton.addEventListener('click', _displayTaskButton_js__WEBPACK_IMPORTED_MODULE_5__.toggleUrgencyEdit); //end of rendering urgency

  const container2_div2 = document.createElement('div');
  container2_div2.setAttribute('class', 'displayTask_subCont');
  const dateCreatedTitle = document.createElement('h4');
  dateCreatedTitle.innerHTML = 'Date Created';
  const dateCreated = document.createElement('p');
  dateCreated.setAttribute('id', 'displayTask_dateCreated');
  container2_div1.appendChild(urgencyTitle);
  container2_div1.appendChild(urgencyZone);
  container2_div2.appendChild(dateCreatedTitle);
  container2_div2.appendChild(dateCreated);
  container2.appendChild(container2_div1);
  container2.appendChild(container2_div2);
  element.appendChild(container2); //Div for the butons

  const buttCont = document.createElement('div');
  buttCont.setAttribute('id', 'displayTask_buttonCont'); //const edit = document.createElement('button');

  const del = document.createElement('button');
  const close = document.createElement('button'); //edit.setAttribute('id', 'displayTask_editButton')

  del.setAttribute('id', 'displayTask_delButton');
  close.setAttribute('id', 'displayTask_closeButton'); //edit.innerHTML = 'Edit';

  del.innerHTML = 'Delete';
  close.innerHTML = 'Close'; // buttCont.appendChild(edit);

  buttCont.appendChild(del);
  buttCont.appendChild(close);
  element.appendChild(buttCont);
  close.addEventListener('click', close_DisplayTask);
  del.addEventListener('click', () => {
    (0,_displayProject_js__WEBPACK_IMPORTED_MODULE_1__.deleteTask)(taskInfo.id);
  }); //    edit.addEventListener('click', )

  displayTaskPanel.appendChild(element); //start logic

  projectTitleSpan.innerHTML = ProjTitle;
  taskTitle.innerHTML = taskInfo.title;
  description.innerHTML = taskInfo.description;
  status.innerHTML = taskInfo.status;
  deadline.innerHTML = taskInfo.deadline.toDate().toLocaleDateString();
  urgency.innerHTML = taskInfo.urgency;
  dateCreated.innerHTML = taskInfo.dateCreated.toDate().toLocaleDateString(); //remove Object Promise Tag

  const nodes = displayTaskPanel.childNodes;
  if (nodes[0].nodeValue === "[object Promise]") nodes[0].remove();
};
/*
export const renderTaskPanel = () => {
    const element = "<div id = 'displayTaskPanel_outerFrame>" +
            "<h1 id = 'displaytasktitle'></h1>" +
            "<h3 id = 'displayTask_ProjectTitle'><span>Project: </span><span id = 'displayTask_ProjectTitleSpan'><span></h3>" +
                "<div id = 'description_container'>" +
                    "<h4>Description</h4>" +
                    "<p id = 'displayTask_description'></p>" +
                "</div>" +
                "<div id = 'displayTask_cont1'>" +
                    "<div>" +
                        "<h4>Progress Status</h4>" +
                        "<p id = 'displayTask_status'></p>" +
                    "</div>" +
                "<div>" +
                    "<h4>Deadline Date</h4>" +
                    "<p id = 'displayTask_deadline'></p>" +
                "</div>" +
            "</div>" +
            "<div id = 'displayTask_cont2'>" +
                "<div>" +
                    "<h4>Urgency</h4>" +
                    "<p id = 'displayTask_urgency'></p>" +
                "</div>" +
                "<div>" +
                    "<h4>Date Added</h4>" +
                    "<p id = 'displayTask_dateCreated'></p>" +
                "</div>" +
            "</div>" +
            "<div id = 'displayTask_buttonCont'>" +
                "<button id = 'displayTask_editButton'>Edit</button>" +
                "<button id = 'displayTask_delButton'>Delete</button>" +
                "<button id = 'displayTask_closeButton'>Close</button>" +
        "</div>" +
        "<div id = 'emptyDiv' onload = 'loadDisplayTaskDom()'></div>" +
        "</div>";

    return element;
}

 */

/***/ }),

/***/ "./src/member/display/toggleDisplay.js":
/*!*********************************************!*\
  !*** ./src/member/display/toggleDisplay.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "displayProjects": () => (/* binding */ displayProjects),
/* harmony export */   "displayToday": () => (/* binding */ displayToday),
/* harmony export */   "displayWeek": () => (/* binding */ displayWeek),
/* harmony export */   "displayMonth": () => (/* binding */ displayMonth)
/* harmony export */ });
const displayProjects = () => {
  document.getElementById('displayProjectCon').style.display = 'inline-block';
  document.getElementById('displayTodayCon').style.display = 'none';
  document.getElementById('displayWeekCon').style.display = 'none';
  document.getElementById('displayMonthCon').style.display = 'none';
};
const displayToday = () => {
  document.getElementById('displayProjectCon').style.display = 'none';
  document.getElementById('displayTodayCon').style.display = 'inline-block';
  document.getElementById('displayWeekCon').style.display = 'none';
  document.getElementById('displayMonthCon').style.display = 'none';
};
const displayWeek = () => {
  document.getElementById('displayProjectCon').style.display = 'none';
  document.getElementById('displayTodayCon').style.display = 'none';
  document.getElementById('displayWeekCon').style.display = 'inline-block';
  document.getElementById('displayMonthCon').style.display = 'none';
};
const displayMonth = () => {
  document.getElementById('displayProjectCon').style.display = 'none';
  document.getElementById('displayTodayCon').style.display = 'none';
  document.getElementById('displayWeekCon').style.display = 'none';
  document.getElementById('displayMonthCon').style.display = 'inline-block';
}; //this doesn't work.
//you have to use document.getElementByID

/*

const displayCont = document.getElementById('displayContainer');
const project = document.getElementById('displayProjectCon');
const today = document.getElementById('displayTodayCon');
const week = document.getElementById('displayWeekCon');
const month = document.getElementById('displayMonthCon');

export const displayProjects = () => {
    project.style.display = 'inline-block'; 
    today.style.display = 'none'; 
    week.style.display = 'none'; 
    month.style.display = 'none'; 
    console.log("projects")
}

export const displayToday = () => {
    project.style.display = 'none';
    today.style.display = 'inline-block';
    week.style.display = 'none';
    month.style.display = 'none'; 
    console.log("today")
}
export const displayWeek = () => {
    project.style.display = 'none';
    today.style.display = 'none';
    week.style.display = 'inline-block';
    month.style.display = 'none'; 
    console.log("week")
}

export const displayMonth = () => {
    project.style.display = 'none';
    today.style.display = 'none';
    week.style.display = 'none';
    month.style.display = 'display-block'; 
    console.log("month")
}
*/

/***/ }),

/***/ "./src/member/renderSecAddTaskButtons.js":
/*!***********************************************!*\
  !*** ./src/member/renderSecAddTaskButtons.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AddFuncToSecButtons": () => (/* binding */ AddFuncToSecButtons),
/* harmony export */   "setProjectID": () => (/* binding */ setProjectID)
/* harmony export */ });
/* harmony import */ var _addTask_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./addTask.js */ "./src/member/addTask.js");

var ProjectID = '';
const AddFuncToSecButtons = () => {
  const SecAddButton = document.getElementById('addTaskButton-SEC');
  SecAddButton.addEventListener('click', () => {
    (0,_addTask_js__WEBPACK_IMPORTED_MODULE_0__.handleSecondaryAddTask)(ProjectID);
  });
  const SecCancelButton = document.getElementById('CancelAddTaskButton-SEC');
  SecCancelButton.addEventListener('click', _addTask_js__WEBPACK_IMPORTED_MODULE_0__.closeSecAddTaskPanel);
};
const setProjectID = ID => {
  ProjectID = ID;
};

/***/ }),

/***/ "./src/member/signOutButton.js":
/*!*************************************!*\
  !*** ./src/member/signOutButton.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "handleSignOut": () => (/* binding */ handleSignOut),
/* harmony export */   "renderSignOutButton": () => (/* binding */ renderSignOutButton)
/* harmony export */ });
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/auth */ "./node_modules/firebase/auth/dist/index.esm.js");

const auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_0__.getAuth)();
const handleSignOut = () => {
  (0,firebase_auth__WEBPACK_IMPORTED_MODULE_0__.signOut)(auth).then(() => {
    alert('You have successful signed out');
  });
};
const renderSignOutButton = () => {
  const element = document.createElement('button');
  element.setAttribute('id', 'signOutButton');
  element.addEventListener('click', handleSignOut);
  element.innerHTML = 'Sign Out';
  return element;
};

/***/ }),

/***/ "./src/nonmember/checkAuth.js":
/*!************************************!*\
  !*** ./src/nonmember/checkAuth.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getUserInfo": () => (/* binding */ getUserInfo),
/* harmony export */   "checkPass": () => (/* binding */ checkPass),
/* harmony export */   "checkAllPass": () => (/* binding */ checkAllPass),
/* harmony export */   "checkFirst": () => (/* binding */ checkFirst),
/* harmony export */   "checkLast": () => (/* binding */ checkLast),
/* harmony export */   "checkEmail": () => (/* binding */ checkEmail)
/* harmony export */ });
var currentUser = {
  name: '',
  email: '',
  userID: ''
};
const getUserInfo = (fName, emailAddress, ID) => {
  currentUser.name = fName;
  currentUser.email = emailAddress;
  currentUser.userID = ID;
};
const checkPass = pass => {
  if (pass.trim().length <= 0) {
    alert('Please, type in your password.');
    return false;
  } else {
    return true;
  }
};
const checkAllPass = (pass, confirmPass) => {
  if (pass.length <= 0) {
    alert('Please, type in your password.');
    return false;
  } else {
    if (confirmPass.length <= 0) {
      alert('Please, retype your password to confirm it.');
      return false;
    } else {
      if (pass.trim() === confirmPass.trim()) return true;else {
        alert('The passwords you typed do not match.\n Please, try again. ');
        return false;
      }
    }
  }
};
const checkFirst = name => {
  if (name.length <= 0) {
    alert('Please, type in your first name.');
    return false;
  } else return true;
};
const checkLast = name => {
  if (name.length <= 0) {
    alert('Please, type in your last name.');
    return false;
  } else return true;
};
const checkEmail = email => {
  if (email.length <= 0) {
    alert('Please, type in your email.');
    return false;
  } else {
    const arr = email.trim().split('@');

    if (arr.length >= 2 && arr[1]) {
      const arr2 = email.trim().split('.');

      if (arr2.length >= 2 && arr2[1]) {
        return true;
      } else {
        alert("Your email is invalid. Please, try again.");
        return false;
      }
    } else {
      alert("Your email is invalid. Please, try again.");
      return false;
    }
  }
};

/***/ }),

/***/ "./src/nonmember/signIn.js":
/*!*********************************!*\
  !*** ./src/nonmember/signIn.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GoSignUp": () => (/* binding */ GoSignUp),
/* harmony export */   "handleSignIn": () => (/* binding */ handleSignIn),
/* harmony export */   "renderSignInPage": () => (/* binding */ renderSignInPage)
/* harmony export */ });
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/auth */ "./node_modules/firebase/auth/dist/index.esm.js");
/* harmony import */ var _checkAuth_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./checkAuth.js */ "./src/nonmember/checkAuth.js");


const signInPage = document.getElementById('signIn');
const signUpPage = document.getElementById('signUp');
const mainPages = document.getElementById('mainPages');
const auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_0__.getAuth)();
const initialUserInfo = {
  email: '',
  password: ''
};
var userInfo = {
  email: '',
  password: ''
};
const GoSignUp = () => {
  signInPage.style.display = 'none';
  signUpPage.style.display = 'inline-block';
  mainPages.style.display = 'none';
};
const handleSignIn = () => {
  var currentUser = null;
  userInfo.email = document.getElementById('signIn_email').value;
  userInfo.password = document.getElementById('signIn_pass').value; //console.log(userInfo)

  if ((0,_checkAuth_js__WEBPACK_IMPORTED_MODULE_1__.checkEmail)(userInfo.email) && (0,_checkAuth_js__WEBPACK_IMPORTED_MODULE_1__.checkPass)(userInfo.password)) {
    (0,firebase_auth__WEBPACK_IMPORTED_MODULE_0__.signInWithEmailAndPassword)(auth, userInfo.email, userInfo.password).then(userCredential => {
      alert('You are now logged in. \n Welcome back.');
      currentUser = userCredential.user;
    }).catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode + ': ' + errorMessage);
    });
  }

  return currentUser;
};
const renderSignInPage = () => {
  const element = "<div id = 'signInContainer'>" + "<h1 id = 'title'>Sign into your account</h1>" + "<div id = 'innerContainer'>" + "<div id = 'inputField'>" + "<h2>Email</h2>" + "<input type = 'text' id = 'signIn_email' class = 'textInput'>" + "</div>" + "<div id = 'inputField'>" + "<h2>Password</h2>" + "<input type = 'text' id = 'signIn_pass' class = 'textInput'>" + "</div>" + "</div>" + "<div id = 'buttonContainer' ><br />" + "<button id = 'signInButton'>Sign In</button>" + "</div>" + "<div id = 'secondQuestContainer'>" + "<h2>Don't have an account?</h2>" + "<button id = 'goSignUpButton'>Sign Up</button>" + "</div>" + "</div>";
  return element;
};

/***/ }),

/***/ "./src/nonmember/signUp.js":
/*!*********************************!*\
  !*** ./src/nonmember/signUp.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GoSignIn": () => (/* binding */ GoSignIn),
/* harmony export */   "handleSignUp": () => (/* binding */ handleSignUp),
/* harmony export */   "renderSignUpPage": () => (/* binding */ renderSignUpPage)
/* harmony export */ });
/* harmony import */ var firebase_compat_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/compat/app */ "./node_modules/firebase/compat/app/dist/index.esm.js");
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/firestore */ "./node_modules/firebase/firestore/dist/index.esm.js");
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/auth */ "./node_modules/firebase/auth/dist/index.esm.js");
/* harmony import */ var _checkAuth_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./checkAuth.js */ "./src/nonmember/checkAuth.js");
/* harmony import */ var _initializeFirebase_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../initializeFirebase.js */ "./src/initializeFirebase.js");





const signInPage = document.getElementById('signIn');
const signUpPage = document.getElementById('signUp');
const mainPages = document.getElementById('mainPages');
const initialUserInfo = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPass: ''
};
var userInfo = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPass: ''
};
const GoSignIn = () => {
  signInPage.style.display = 'inline-block';
  signUpPage.style.display = 'none';
  mainPages.style.display = 'inline-block';
};
const auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.getAuth)();
const handleSignUp = () => {
  userInfo.firstName = document.getElementById('fName').value;
  userInfo.lastName = document.getElementById('Last_Name').value;
  userInfo.email = document.getElementById('emailAddress').value;
  userInfo.password = document.getElementById('password_input').value;
  userInfo.confirmPass = document.getElementById('confirmPassword').value;
  console.log(userInfo);

  if ((0,_checkAuth_js__WEBPACK_IMPORTED_MODULE_3__.checkFirst)(userInfo.firstName) && (0,_checkAuth_js__WEBPACK_IMPORTED_MODULE_3__.checkLast)(userInfo.lastName) && (0,_checkAuth_js__WEBPACK_IMPORTED_MODULE_3__.checkEmail)(userInfo.email) && (0,_checkAuth_js__WEBPACK_IMPORTED_MODULE_3__.checkAllPass)(userInfo.password, userInfo.confirmPass)) {
    (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.createUserWithEmailAndPassword)(auth, userInfo.email, userInfo.password).then(async userCredentials => {
      await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.setDoc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.doc)(_initializeFirebase_js__WEBPACK_IMPORTED_MODULE_4__.db, 'users', auth.currentUser.uid), {
        email: userInfo.email,
        first_name: userInfo.firstName,
        last_name: userInfo.lastName
      });
      alert('Your account has been created.');
      (0,_checkAuth_js__WEBPACK_IMPORTED_MODULE_3__.getUserInfo)(userInfo.firstName, userInfo.email, auth.currentUser.uid);
    }).catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        alert("The email you typed is already in use.");
      } else alert(error.code + ": " + error.message);
    });
  }
};
const renderSignUpPage = () => {
  const element = "<div id = 'signInContainer'>" + "<h1 id = 'title'>Create a new account</h1>" + "<div id = 'innerContainer'>" + "<div id = 'inputField' >" + "<h2>First Name</h2>" + "<input type = 'text' id = 'fName' class = 'textInput'>" + "</div>" + "<div id = 'inputField'>" + "<h2>Last Name</h2>" + "<input type = 'text' id = 'Last_Name' class = 'textInput'>" + "</div>" + "<div id = 'inputField'>" + "<h2>Email</h2>" + "<input type = 'text' id = 'emailAddress' class = 'textInput'>" + "</div>" + "<div id = 'inputField'>" + "<h2>Password</h2>" + "<input type = 'text' id = 'password_input' class = 'textInput'>" + "</div>" + "<div id = 'inputField'>" + "<h2>Confirm password</h2>" + "<input type = 'text' id = 'confirmPassword' class = 'textInput'>" + "</div>" + "</div><br />" + "<div id = 'buttonContainer' >" + "<button id = 'signUpButton'>Sign Up</button>" + "</div>" + "<div id = 'secondQuestContainer'>" + "<h2>Already have an account?</h2>" + "<button id = 'goSignInButton'>Sign In</button>" + "</div>" + "</div>";
  return element;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/mystyle.css":
/*!***************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/mystyle.css ***!
  \***************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body {\r\n    font-family: Verdana;\r\n}\r\n\r\n#container, #signIn, #signUp, #mainPages {\r\nwidth: 100%; \r\nmargin-left: auto;\r\nmargin-right: auto; \r\ntext-align: center;\r\ntext-align: center;\r\n}\r\n\r\n#signIn, #signUp, #mainPages {\r\ndisplay: none; \r\n}\r\n\r\n#signInContainer {\r\n    margin-left: auto;\r\n    margin-right: auto;\r\n    text-align: center;\r\n    border: 1px solid #000000;\r\n    width: 60%;\r\n    height: 100vh;\r\n}\r\n\r\n#inputField {\r\n    width: 100%;\r\n\r\n}\r\n\r\n.textInput {\r\n    width: 100%;\r\n    margin-left: auto;\r\n    margin-right: auto;\r\n}\r\n\r\n#title {\r\n    text-align: center;\r\n}\r\n\r\n#innerContainer {\r\n    margin-left: auto;\r\n    margin-right: auto;\r\n    text-align: left;\r\n    width: 90%;\r\n\r\n}\r\n\r\n#inputField h2 {\r\n    text-align: left;\r\n}\r\n\r\n#member-innerContainer {\r\n    margin-left: auto;\r\n    margin-right: auto;\r\n    text-align: center;\r\n    border: 1px solid #000000;\r\n    width: 90%;\r\n    height: 100vh;\r\n    min-height: 650px;\r\n    display: flex; \r\n    align-items: center;\r\n}\r\n\r\n#center_container {\r\n    margin-top: auto;\r\n    margin-bottom: auto;\r\n    margin-left: auto;\r\n    margin-right: auto;\r\n    display: flex;\r\n    justify-content: center;\r\n    align-items: center;\r\n    width: 95%;\r\n    height: 95%;\r\n    text-align: center;\r\n}\r\n\r\n#side-panel {\r\n    width: 30%;\r\n}\r\n#output-panel {\r\n    width: 65%\r\n}\r\n\r\n#side-panel, #output-panel {\r\n    border: 1px solid #000000; \r\n    height: 100%;\r\n    justify-content: center;\r\n    margin: auto;\r\n    display: block; \r\n}\r\n\r\n/*Admin Panel*/\r\n#adminPanelContainer {\r\n    display: flex;\r\n    align-items: center;\r\n    width: 70%;\r\n    margin: auto;\r\n}\r\n\r\n#adminPanel {\r\n    width: 100%;\r\n    table-layout: fixed;\r\n    list-style: none;\r\n    margin: 0;\r\n    padding: 0;\r\n}\r\n\r\n#adminPanel li {\r\n    /* border: 1px solid #989898; */\r\n    width: 90%;\r\n    border-radius: 10px;\r\n    margin-left: auto;\r\n    margin-right: auto;\r\n\r\n    display: flex;\r\n    align-items: center;\r\n}\r\n\r\n\r\n#admin-title {\r\n    font-weight: bold;\r\n    font-size: 30px; \r\n    margin-top: 20px;\r\n}\r\n\r\n.admin-options {\r\n    border-radius: 10px;\r\n    margin-top: 20px;\r\n    margin-bottom: 20px;\r\n    height: 30px;\r\n    padding-left: 30px;\r\n    border: none;\r\n    background-color: #ffffff;\r\n    width: 100%;\r\n    text-align: left;\r\n    font-size: 20px;\r\n    font-family: Verdana;\r\n    overflow: hidden;\r\n    text-overflow: ellipsis;\r\n}\r\n\r\n\r\n.admin-options:hover {\r\n    background-color: #989898;\r\n}\r\n\r\n.admin-options:active {\r\n    background-color: #d1d1d1;\r\n}\r\n\r\n.selectedView {\r\n    background-color: #989898;\r\n}\r\n\r\n\r\n/*Add Project Panel*/\r\n#addProjectPanel {\r\n    position: absolute;\r\n    display: none;\r\n    z-index: 1;\r\n    min-width: 600px;\r\n    min-height: 60%;\r\n    background-color: #ebebeb;\r\n    border-radius: 10px;\r\n}\r\n\r\n#addProjectPanelContainer {\r\n    margin-top: auto;\r\n    margin-bottom: auto;\r\n    margin-left: auto;\r\n    margin-right: auto;\r\n    justify-content: center;\r\n    align-items: center;\r\n    width: 95%;\r\n    height: 95%;\r\n    text-align: center;\r\n}\r\n\r\n#add_projectTitle, #add_taskName, #add_taskName-SEC {\r\n    width: 85%;\r\n    text-align: center;\r\n    font-family: Verdana;\r\n    border-radius: 10px;\r\n    height: 30px;\r\n}\r\n\r\n#addProject_2ndcontainer {\r\n    width: 60%;\r\n    margin-left: auto;\r\n    margin-right: auto;\r\n    margin-top: 40px;\r\n    margin-bottom: 40px;\r\n    display: flex;\r\n    justify-content: space-between;\r\n}\r\n\r\n#project_status_input, #project_deadline_input {\r\n    display: inline-block;\r\n}\r\n\r\n#project_status_input {\r\n\r\n}\r\n\r\n#addProject_selection {\r\n    font-family: inherit;\r\n    padding: 5px;\r\n}\r\n\r\n#project_deadline_input input, #task_deadlineInput,\r\n#addTask_urgency, #addTask_status, #AddTask_ProjectCategory_Selection,\r\n#addTask_status-SEC, #addTask_urgency-SEC, #task_deadlineInput-SEC {\r\n    font-family: inherit;\r\n    padding: 5px;\r\n}\r\n\r\n#AddProjectButtonContainer, #AddTaskButtonContainer {\r\n    width: 60%;\r\n    margin-left: auto;\r\n    margin-right: auto;\r\n}\r\n\r\n#addProjectButton, #addTaskButton, #addTaskButton-SEC, #displayTask_editButton, #displayTask_delButton, #displayTask_closeButton {\r\n    border: none;\r\n    font-family: Verdana;\r\n    font-weight: bold;\r\n    background-color: #989898;\r\n    border-radius: 10px;\r\n    font-size: 20px;\r\n    padding-left: 50px;\r\n    padding-right: 50px;\r\n    color: #ffffff;\r\n    cursor: pointer;\r\n}\r\n\r\n#addProjectButton:active,\r\n#CancelAddProjectButton:active,\r\n#CancelAddTaskButton:active,\r\n#addTaskButton:active,\r\n#addTaskButton-SEC:active,\r\n#CancelAddTaskButton-SEC:active,\r\n#displayTask_editButton:active,\r\n#displayTask_delButton:active,\r\n#displayTask_closeButton:active {\r\n        border: 2px solid #000000;\r\n        background-color: #ebebeb;\r\n        font-size: 20px;\r\n        color: #000000;\r\n    }\r\n\r\n#CancelAddProjectButton, #CancelAddTaskButton, #CancelAddTaskButton-SEC {\r\n    background-color: #333333;\r\n    font-size: 20px;\r\n    color: #ffffff;\r\n    font-family: Verdana;\r\n    font-weight: bold;\r\n    border-radius: 10px;\r\n    font-size: 20px;\r\n    padding-left: 50px;\r\n    padding-right: 50px;\r\n    margin-bottom: 20px;\r\n}\r\n\r\n\r\n#AddProjectButtonContainer_box1, #AddTaskButtonContainer_box1 {\r\n    margin-top: 10px;\r\n}\r\n\r\n\r\n/*Add Task Panel*/\r\n\r\n#addTaskPanel {\r\n    position: absolute;\r\n    display: none;\r\n    z-index: 1;\r\n    min-width: 900px;\r\n    min-height: 700px;\r\n    background-color: #ebebeb;\r\n    border-radius: 10px;\r\n}\r\n\r\n#addTask_description, #addTask_description-SEC {\r\n    width: 85%;\r\n    text-align: left;\r\n    font-family: Verdana;\r\n    border-radius: 10px;\r\n    height: 30px;\r\n    padding: 5px;\r\n}\r\n\r\n #SecondaryAddTaskPanel {\r\n    position: absolute;\r\n    display: none;\r\n    z-index: 1;\r\n    width: 60%;\r\n    background-color: #ebebeb;\r\n    border-radius: 10px;   \r\n}\r\n\r\n#SecAddTask_ProjectTitle {\r\n    font-weight: bold;\r\n    font-family: Verdana;\r\n    text-align: center;\r\n}\r\n\r\n/*Project displays*/\r\n#displayContainer {\r\n    margin-top: auto;\r\n    margin-bottom: auto;\r\n    margin-left: auto;\r\n    margin-right: auto;\r\n    display: flex;\r\n    justify-content: center;\r\n    align-items: center;\r\n    width: 90%;\r\n    height: 100%;\r\n    text-align: center;\r\n    /* border: 1px solid #000;*/\r\n}\r\n\r\n#displayProjectCon {\r\n    display: inline-block;\r\n    height: 100%;\r\n\r\n}\r\n\r\n#displayProjectsContent, #displayTodayContent, #displayWeekContent, #displayMonthContent {\r\n    display: inline-block;\r\n    overflow-y: scroll;\r\n    max-height: 85%;\r\n    overflow-x: hidden;\r\n}\r\n\r\n#displayTodayCon, #displayWeekCon, #displayMonthCon, #displaySingleProject, #displaySingleTask {\r\n    display: none;\r\n    overflow-y: scroll;\r\n}\r\n\r\n#projectItemContainer {\r\n    display: grid;\r\n    grid-template-columns: 10fr 1fr;\r\n}\r\n\r\n#projectTitleButton {\r\n    border: none;\r\n    background-color: #ccc;\r\n    font-family: Verdana;\r\n    color: #fff;\r\n    width: 100%;\r\n    font-size: 20px;\r\n    margin-top: 5px;\r\n    padding-top: 5px;\r\n    padding-bottom: 5px;\r\n    cursor: pointer;\r\n    outline: none;\r\n    display: inline-block;\r\n}\r\n\r\n#projectTitleButton:active {\r\n    background-color: #333;\r\n}\r\n\r\n#projectTitleButton ul {\r\n    padding-left: 0;\r\n    list-style-type: none;\r\n}\r\n\r\n#trashIcon {\r\n    margin: auto;\r\n    width: 25px;\r\n    height: 25px;\r\n    padding-left: 5px;\r\n    padding-right: 5px;\r\n    display: none;\r\n    cursor: pointer;\r\n}\r\n\r\n#trashIcon:hover {\r\n    color: #969696;\r\n    width: 27px;\r\n    height: 27px;\r\n}\r\n\r\n#trashContainer {\r\n    display: flex;\r\n    justify-content: center;\r\n    width: 30px;\r\n    max-width: 30px;\r\n}\r\n\r\n#projectPage {\r\n    display: none;\r\n}\r\n\r\n#AllProjectTasks {\r\n    padding: 0 18px;\r\n    max-height: 0;\r\n    overflow: hidden;\r\n    text-align: left;\r\n    transition: max-height .4s ease-out;\r\n    background-color: #fff;\r\n    color: #000;\r\n    border: none;\r\n}\r\n\r\n.taskListItem {\r\n    list-style: none;\r\n    background-color: #e6e6e6;\r\n    text-align: left;\r\n    margin-top: 5px;\r\n    cursor: pointer;\r\n\r\n}\r\n\r\n#displayTaskLink {\r\n    padding-left: 5px;\r\n    width: 87%;\r\n    display: inline-block;\r\n}\r\n\r\n.addTaskListItem {\r\n    list-style: none;\r\n    background-color: #e6e6e6;\r\n    text-align: center;\r\n    margin-top: 5px;\r\n    color: #333;\r\n    cursor: pointer;\r\n}\r\n\r\n.addTaskListItem, .taskListItem {\r\n    padding-top: 5px;\r\n    padding-bottom: 5px;\r\n}\r\n.addTaskListItem:hover, .taskListItem:hover {\r\n    background-color: #989898;\r\n}\r\n\r\n#add_icon {\r\nwidth: 15px; \r\nheight: 15px;\r\npadding-right: 5px;\r\n}\r\n\r\n/* display task panel*/\r\n#displayTaskPanel {\r\n    position: absolute;\r\n    display: none;\r\n    z-index: 1;\r\n    min-width: 800px;\r\n    min-height: 550px;\r\n    background-color: #ebebeb;\r\n    border-radius: 10px;\r\n}\r\n\r\n#displayTask_buttonCont {\r\n    margin-bottom: 20px;\r\n    display: flex;\r\n    justify-content: space-around; \r\n    margin-left: auto;\r\n    margin-right: auto;\r\n}\r\n\r\n#displayTask_cont1, #displayTask_cont2 {\r\n    display: flex;\r\n    justify-content: space-around;\r\n    margin-left: auto;\r\n    margin-right: auto;\r\n    margin-bottom: 20px;\r\n}\r\n\r\n/*CSS for Edit Fields */\r\n\r\n/*universal*/\r\n.SubZone {\r\n  /*  min-width:55%;*/\r\n}\r\n\r\n#statusSubZone {\r\n    display: inline-block;\r\n    text-align: center;\r\n}\r\n\r\n#descriptionSubZone {\r\n    display: inline-block;\r\n}\r\n\r\n.displayTask_editInput {\r\n    width: 50%;\r\n    /* position: absolute; */\r\n    height: 30px;\r\n}\r\n/*styling for the edit button*/\r\n#EditButtZone {\r\n    display: inline-block;\r\n  /*  width: 25%; */\r\n    margin-left: 10px;\r\n    justify-content: center;\r\n    margin-top: auto;\r\n    margin-bottom: auto;\r\n    vertical-align: middle;\r\n}\r\n\r\n.displayTask_button {\r\n    display: none;\r\n    width: 25px;\r\n    height: 25px;\r\n    cursor: pointer;\r\n    border: 1px solid #000000;\r\n    border-radius: 5px;\r\n    margin-left: 5px;\r\n    margin-right: 5px;\r\n    margin-top: auto;\r\n    margin-bottom: auto;\r\n}\r\n\r\n#displayTask_status {\r\n    position: inherit;\r\n}\r\n\r\n.displayTask_button:active {\r\n    background-color: #ccc;\r\n}\r\n\r\n.displayTask_subCont {\r\n    min-width: 350px;\r\n}\r\n\r\n/*status ui of display task panel*/\r\n#displayTask_statusInput {\r\n    display: none;\r\n    position: inherit;\r\n    max-width: 150px;\r\n    min-width: 96%;\r\n}\r\n\r\n#statusEditButton, .displayTask_EditButton {\r\n    max-width: 100%;\r\n    max-height: 100%;\r\n    cursor: pointer;\r\n}\r\n\r\n/*description part of the display task panel*/\r\n\r\n#displayTask_descriptionInput {\r\n    display: none;\r\n    position: inherit;\r\n    width: 100%;\r\n}\r\n#DescriptionEditButtZone {\r\n    display: inline-block;\r\n    justify-content: center;\r\n    margin-top: auto;\r\n    margin-bottom: auto;\r\n    vertical-align: middle;\r\n    margin-left: 5px;\r\n}\r\n\r\n#description_container h4 {\r\n    display: block;\r\n    margin-top: 20px;\r\n    margin-bottom: 0px;\r\n}\r\n\r\n/*deadline UI*/\r\n\r\n#displayTask_deadlineInput {\r\n    display: none;\r\n    position: inherit;\r\n    max-width: 150px;\r\n}\r\n\r\n#deadlineEditButtZone {\r\n    display: inline-block;\r\n    justify-content: center;\r\n    margin-top: auto;\r\n    margin-bottom: auto;\r\n    vertical-align: middle;\r\n    margin-left: 5px;\r\n}\r\n\r\n#deadlineSubZone {\r\n    display: inline-block;\r\n    vertical-align: middle;\r\n}\r\n\r\n/*urgency UI*/\r\n\r\n#displayTask_urgencyInput {\r\n    display: none;\r\n    position: inherit;\r\n    max-width: 150px;\r\n    height: 30px;\r\n}\r\n\r\n#urgencyEditButtZone {\r\n    display: inline-block;\r\n    justify-content: center;\r\n    margin-top: auto;\r\n    margin-bottom: auto;\r\n    vertical-align: middle;\r\n    margin-left: 5px;\r\n}\r\n\r\n#urgencySubZone {\r\n    display: inline-block;\r\n    vertical-align: middle;\r\n}\r\n\r\n#displayTask_dateCreated {\r\n    display: inline-block;\r\n}\r\n", "",{"version":3,"sources":["webpack://./src/mystyle.css"],"names":[],"mappings":"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","sourcesContent":["body {\r\n    font-family: Verdana;\r\n}\r\n\r\n#container, #signIn, #signUp, #mainPages {\r\nwidth: 100%; \r\nmargin-left: auto;\r\nmargin-right: auto; \r\ntext-align: center;\r\ntext-align: center;\r\n}\r\n\r\n#signIn, #signUp, #mainPages {\r\ndisplay: none; \r\n}\r\n\r\n#signInContainer {\r\n    margin-left: auto;\r\n    margin-right: auto;\r\n    text-align: center;\r\n    border: 1px solid #000000;\r\n    width: 60%;\r\n    height: 100vh;\r\n}\r\n\r\n#inputField {\r\n    width: 100%;\r\n\r\n}\r\n\r\n.textInput {\r\n    width: 100%;\r\n    margin-left: auto;\r\n    margin-right: auto;\r\n}\r\n\r\n#title {\r\n    text-align: center;\r\n}\r\n\r\n#innerContainer {\r\n    margin-left: auto;\r\n    margin-right: auto;\r\n    text-align: left;\r\n    width: 90%;\r\n\r\n}\r\n\r\n#inputField h2 {\r\n    text-align: left;\r\n}\r\n\r\n#member-innerContainer {\r\n    margin-left: auto;\r\n    margin-right: auto;\r\n    text-align: center;\r\n    border: 1px solid #000000;\r\n    width: 90%;\r\n    height: 100vh;\r\n    min-height: 650px;\r\n    display: flex; \r\n    align-items: center;\r\n}\r\n\r\n#center_container {\r\n    margin-top: auto;\r\n    margin-bottom: auto;\r\n    margin-left: auto;\r\n    margin-right: auto;\r\n    display: flex;\r\n    justify-content: center;\r\n    align-items: center;\r\n    width: 95%;\r\n    height: 95%;\r\n    text-align: center;\r\n}\r\n\r\n#side-panel {\r\n    width: 30%;\r\n}\r\n#output-panel {\r\n    width: 65%\r\n}\r\n\r\n#side-panel, #output-panel {\r\n    border: 1px solid #000000; \r\n    height: 100%;\r\n    justify-content: center;\r\n    margin: auto;\r\n    display: block; \r\n}\r\n\r\n/*Admin Panel*/\r\n#adminPanelContainer {\r\n    display: flex;\r\n    align-items: center;\r\n    width: 70%;\r\n    margin: auto;\r\n}\r\n\r\n#adminPanel {\r\n    width: 100%;\r\n    table-layout: fixed;\r\n    list-style: none;\r\n    margin: 0;\r\n    padding: 0;\r\n}\r\n\r\n#adminPanel li {\r\n    /* border: 1px solid #989898; */\r\n    width: 90%;\r\n    border-radius: 10px;\r\n    margin-left: auto;\r\n    margin-right: auto;\r\n\r\n    display: flex;\r\n    align-items: center;\r\n}\r\n\r\n\r\n#admin-title {\r\n    font-weight: bold;\r\n    font-size: 30px; \r\n    margin-top: 20px;\r\n}\r\n\r\n.admin-options {\r\n    border-radius: 10px;\r\n    margin-top: 20px;\r\n    margin-bottom: 20px;\r\n    height: 30px;\r\n    padding-left: 30px;\r\n    border: none;\r\n    background-color: #ffffff;\r\n    width: 100%;\r\n    text-align: left;\r\n    font-size: 20px;\r\n    font-family: Verdana;\r\n    overflow: hidden;\r\n    text-overflow: ellipsis;\r\n}\r\n\r\n\r\n.admin-options:hover {\r\n    background-color: #989898;\r\n}\r\n\r\n.admin-options:active {\r\n    background-color: #d1d1d1;\r\n}\r\n\r\n.selectedView {\r\n    background-color: #989898;\r\n}\r\n\r\n\r\n/*Add Project Panel*/\r\n#addProjectPanel {\r\n    position: absolute;\r\n    display: none;\r\n    z-index: 1;\r\n    min-width: 600px;\r\n    min-height: 60%;\r\n    background-color: #ebebeb;\r\n    border-radius: 10px;\r\n}\r\n\r\n#addProjectPanelContainer {\r\n    margin-top: auto;\r\n    margin-bottom: auto;\r\n    margin-left: auto;\r\n    margin-right: auto;\r\n    justify-content: center;\r\n    align-items: center;\r\n    width: 95%;\r\n    height: 95%;\r\n    text-align: center;\r\n}\r\n\r\n#add_projectTitle, #add_taskName, #add_taskName-SEC {\r\n    width: 85%;\r\n    text-align: center;\r\n    font-family: Verdana;\r\n    border-radius: 10px;\r\n    height: 30px;\r\n}\r\n\r\n#addProject_2ndcontainer {\r\n    width: 60%;\r\n    margin-left: auto;\r\n    margin-right: auto;\r\n    margin-top: 40px;\r\n    margin-bottom: 40px;\r\n    display: flex;\r\n    justify-content: space-between;\r\n}\r\n\r\n#project_status_input, #project_deadline_input {\r\n    display: inline-block;\r\n}\r\n\r\n#project_status_input {\r\n\r\n}\r\n\r\n#addProject_selection {\r\n    font-family: inherit;\r\n    padding: 5px;\r\n}\r\n\r\n#project_deadline_input input, #task_deadlineInput,\r\n#addTask_urgency, #addTask_status, #AddTask_ProjectCategory_Selection,\r\n#addTask_status-SEC, #addTask_urgency-SEC, #task_deadlineInput-SEC {\r\n    font-family: inherit;\r\n    padding: 5px;\r\n}\r\n\r\n#AddProjectButtonContainer, #AddTaskButtonContainer {\r\n    width: 60%;\r\n    margin-left: auto;\r\n    margin-right: auto;\r\n}\r\n\r\n#addProjectButton, #addTaskButton, #addTaskButton-SEC, #displayTask_editButton, #displayTask_delButton, #displayTask_closeButton {\r\n    border: none;\r\n    font-family: Verdana;\r\n    font-weight: bold;\r\n    background-color: #989898;\r\n    border-radius: 10px;\r\n    font-size: 20px;\r\n    padding-left: 50px;\r\n    padding-right: 50px;\r\n    color: #ffffff;\r\n    cursor: pointer;\r\n}\r\n\r\n#addProjectButton:active,\r\n#CancelAddProjectButton:active,\r\n#CancelAddTaskButton:active,\r\n#addTaskButton:active,\r\n#addTaskButton-SEC:active,\r\n#CancelAddTaskButton-SEC:active,\r\n#displayTask_editButton:active,\r\n#displayTask_delButton:active,\r\n#displayTask_closeButton:active {\r\n        border: 2px solid #000000;\r\n        background-color: #ebebeb;\r\n        font-size: 20px;\r\n        color: #000000;\r\n    }\r\n\r\n#CancelAddProjectButton, #CancelAddTaskButton, #CancelAddTaskButton-SEC {\r\n    background-color: #333333;\r\n    font-size: 20px;\r\n    color: #ffffff;\r\n    font-family: Verdana;\r\n    font-weight: bold;\r\n    border-radius: 10px;\r\n    font-size: 20px;\r\n    padding-left: 50px;\r\n    padding-right: 50px;\r\n    margin-bottom: 20px;\r\n}\r\n\r\n\r\n#AddProjectButtonContainer_box1, #AddTaskButtonContainer_box1 {\r\n    margin-top: 10px;\r\n}\r\n\r\n\r\n/*Add Task Panel*/\r\n\r\n#addTaskPanel {\r\n    position: absolute;\r\n    display: none;\r\n    z-index: 1;\r\n    min-width: 900px;\r\n    min-height: 700px;\r\n    background-color: #ebebeb;\r\n    border-radius: 10px;\r\n}\r\n\r\n#addTask_description, #addTask_description-SEC {\r\n    width: 85%;\r\n    text-align: left;\r\n    font-family: Verdana;\r\n    border-radius: 10px;\r\n    height: 30px;\r\n    padding: 5px;\r\n}\r\n\r\n #SecondaryAddTaskPanel {\r\n    position: absolute;\r\n    display: none;\r\n    z-index: 1;\r\n    width: 60%;\r\n    background-color: #ebebeb;\r\n    border-radius: 10px;   \r\n}\r\n\r\n#SecAddTask_ProjectTitle {\r\n    font-weight: bold;\r\n    font-family: Verdana;\r\n    text-align: center;\r\n}\r\n\r\n/*Project displays*/\r\n#displayContainer {\r\n    margin-top: auto;\r\n    margin-bottom: auto;\r\n    margin-left: auto;\r\n    margin-right: auto;\r\n    display: flex;\r\n    justify-content: center;\r\n    align-items: center;\r\n    width: 90%;\r\n    height: 100%;\r\n    text-align: center;\r\n    /* border: 1px solid #000;*/\r\n}\r\n\r\n#displayProjectCon {\r\n    display: inline-block;\r\n    height: 100%;\r\n\r\n}\r\n\r\n#displayProjectsContent, #displayTodayContent, #displayWeekContent, #displayMonthContent {\r\n    display: inline-block;\r\n    overflow-y: scroll;\r\n    max-height: 85%;\r\n    overflow-x: hidden;\r\n}\r\n\r\n#displayTodayCon, #displayWeekCon, #displayMonthCon, #displaySingleProject, #displaySingleTask {\r\n    display: none;\r\n    overflow-y: scroll;\r\n}\r\n\r\n#projectItemContainer {\r\n    display: grid;\r\n    grid-template-columns: 10fr 1fr;\r\n}\r\n\r\n#projectTitleButton {\r\n    border: none;\r\n    background-color: #ccc;\r\n    font-family: Verdana;\r\n    color: #fff;\r\n    width: 100%;\r\n    font-size: 20px;\r\n    margin-top: 5px;\r\n    padding-top: 5px;\r\n    padding-bottom: 5px;\r\n    cursor: pointer;\r\n    outline: none;\r\n    display: inline-block;\r\n}\r\n\r\n#projectTitleButton:active {\r\n    background-color: #333;\r\n}\r\n\r\n#projectTitleButton ul {\r\n    padding-left: 0;\r\n    list-style-type: none;\r\n}\r\n\r\n#trashIcon {\r\n    margin: auto;\r\n    width: 25px;\r\n    height: 25px;\r\n    padding-left: 5px;\r\n    padding-right: 5px;\r\n    display: none;\r\n    cursor: pointer;\r\n}\r\n\r\n#trashIcon:hover {\r\n    color: #969696;\r\n    width: 27px;\r\n    height: 27px;\r\n}\r\n\r\n#trashContainer {\r\n    display: flex;\r\n    justify-content: center;\r\n    width: 30px;\r\n    max-width: 30px;\r\n}\r\n\r\n#projectPage {\r\n    display: none;\r\n}\r\n\r\n#AllProjectTasks {\r\n    padding: 0 18px;\r\n    max-height: 0;\r\n    overflow: hidden;\r\n    text-align: left;\r\n    transition: max-height .4s ease-out;\r\n    background-color: #fff;\r\n    color: #000;\r\n    border: none;\r\n}\r\n\r\n.taskListItem {\r\n    list-style: none;\r\n    background-color: #e6e6e6;\r\n    text-align: left;\r\n    margin-top: 5px;\r\n    cursor: pointer;\r\n\r\n}\r\n\r\n#displayTaskLink {\r\n    padding-left: 5px;\r\n    width: 87%;\r\n    display: inline-block;\r\n}\r\n\r\n.addTaskListItem {\r\n    list-style: none;\r\n    background-color: #e6e6e6;\r\n    text-align: center;\r\n    margin-top: 5px;\r\n    color: #333;\r\n    cursor: pointer;\r\n}\r\n\r\n.addTaskListItem, .taskListItem {\r\n    padding-top: 5px;\r\n    padding-bottom: 5px;\r\n}\r\n.addTaskListItem:hover, .taskListItem:hover {\r\n    background-color: #989898;\r\n}\r\n\r\n#add_icon {\r\nwidth: 15px; \r\nheight: 15px;\r\npadding-right: 5px;\r\n}\r\n\r\n/* display task panel*/\r\n#displayTaskPanel {\r\n    position: absolute;\r\n    display: none;\r\n    z-index: 1;\r\n    min-width: 800px;\r\n    min-height: 550px;\r\n    background-color: #ebebeb;\r\n    border-radius: 10px;\r\n}\r\n\r\n#displayTask_buttonCont {\r\n    margin-bottom: 20px;\r\n    display: flex;\r\n    justify-content: space-around; \r\n    margin-left: auto;\r\n    margin-right: auto;\r\n}\r\n\r\n#displayTask_cont1, #displayTask_cont2 {\r\n    display: flex;\r\n    justify-content: space-around;\r\n    margin-left: auto;\r\n    margin-right: auto;\r\n    margin-bottom: 20px;\r\n}\r\n\r\n/*CSS for Edit Fields */\r\n\r\n/*universal*/\r\n.SubZone {\r\n  /*  min-width:55%;*/\r\n}\r\n\r\n#statusSubZone {\r\n    display: inline-block;\r\n    text-align: center;\r\n}\r\n\r\n#descriptionSubZone {\r\n    display: inline-block;\r\n}\r\n\r\n.displayTask_editInput {\r\n    width: 50%;\r\n    /* position: absolute; */\r\n    height: 30px;\r\n}\r\n/*styling for the edit button*/\r\n#EditButtZone {\r\n    display: inline-block;\r\n  /*  width: 25%; */\r\n    margin-left: 10px;\r\n    justify-content: center;\r\n    margin-top: auto;\r\n    margin-bottom: auto;\r\n    vertical-align: middle;\r\n}\r\n\r\n.displayTask_button {\r\n    display: none;\r\n    width: 25px;\r\n    height: 25px;\r\n    cursor: pointer;\r\n    border: 1px solid #000000;\r\n    border-radius: 5px;\r\n    margin-left: 5px;\r\n    margin-right: 5px;\r\n    margin-top: auto;\r\n    margin-bottom: auto;\r\n}\r\n\r\n#displayTask_status {\r\n    position: inherit;\r\n}\r\n\r\n.displayTask_button:active {\r\n    background-color: #ccc;\r\n}\r\n\r\n.displayTask_subCont {\r\n    min-width: 350px;\r\n}\r\n\r\n/*status ui of display task panel*/\r\n#displayTask_statusInput {\r\n    display: none;\r\n    position: inherit;\r\n    max-width: 150px;\r\n    min-width: 96%;\r\n}\r\n\r\n#statusEditButton, .displayTask_EditButton {\r\n    max-width: 100%;\r\n    max-height: 100%;\r\n    cursor: pointer;\r\n}\r\n\r\n/*description part of the display task panel*/\r\n\r\n#displayTask_descriptionInput {\r\n    display: none;\r\n    position: inherit;\r\n    width: 100%;\r\n}\r\n#DescriptionEditButtZone {\r\n    display: inline-block;\r\n    justify-content: center;\r\n    margin-top: auto;\r\n    margin-bottom: auto;\r\n    vertical-align: middle;\r\n    margin-left: 5px;\r\n}\r\n\r\n#description_container h4 {\r\n    display: block;\r\n    margin-top: 20px;\r\n    margin-bottom: 0px;\r\n}\r\n\r\n/*deadline UI*/\r\n\r\n#displayTask_deadlineInput {\r\n    display: none;\r\n    position: inherit;\r\n    max-width: 150px;\r\n}\r\n\r\n#deadlineEditButtZone {\r\n    display: inline-block;\r\n    justify-content: center;\r\n    margin-top: auto;\r\n    margin-bottom: auto;\r\n    vertical-align: middle;\r\n    margin-left: 5px;\r\n}\r\n\r\n#deadlineSubZone {\r\n    display: inline-block;\r\n    vertical-align: middle;\r\n}\r\n\r\n/*urgency UI*/\r\n\r\n#displayTask_urgencyInput {\r\n    display: none;\r\n    position: inherit;\r\n    max-width: 150px;\r\n    height: 30px;\r\n}\r\n\r\n#urgencyEditButtZone {\r\n    display: inline-block;\r\n    justify-content: center;\r\n    margin-top: auto;\r\n    margin-bottom: auto;\r\n    vertical-align: middle;\r\n    margin-left: 5px;\r\n}\r\n\r\n#urgencySubZone {\r\n    display: inline-block;\r\n    vertical-align: middle;\r\n}\r\n\r\n#displayTask_dateCreated {\r\n    display: inline-block;\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./src/home.html":
/*!***********************!*\
  !*** ./src/home.html ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/html-loader/dist/runtime/getUrl.js */ "./node_modules/html-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___HTML_LOADER_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./asset/Todo.jpg */ "./src/asset/Todo.jpg"), __webpack_require__.b);
// Module
var ___HTML_LOADER_REPLACEMENT_0___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_0___);
var code = "<!DOCTYPE html>\r\n<html>\r\n<head>\r\n    <meta charset=\"utf-8\" />\r\n    <title>To Do List</title>\r\n    <link rel=\"icon\" type=\"image/jpg\" href=\"" + ___HTML_LOADER_REPLACEMENT_0___ + "\">\r\n</head>\r\n<body>\r\n    <div id=\"signIn\"></div>\r\n    <div id=\"signUp\"></div>\r\n    <div id=\"mainPages\"></div>\r\n</body>\r\n</html>";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./src/mystyle.css":
/*!*************************!*\
  !*** ./src/mystyle.css ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_mystyle_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./mystyle.css */ "./node_modules/css-loader/dist/cjs.js!./src/mystyle.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_mystyle_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_mystyle_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_mystyle_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_mystyle_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/asset/Edit.png":
/*!****************************!*\
  !*** ./src/asset/Edit.png ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "327e044beeafdd9dd877.png";

/***/ }),

/***/ "./src/asset/Todo.jpg":
/*!****************************!*\
  !*** ./src/asset/Todo.jpg ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "3577e69874fe4567ee65.jpg";

/***/ }),

/***/ "./src/asset/add.png":
/*!***************************!*\
  !*** ./src/asset/add.png ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "060fdcb8f2de9a4beafa.png";

/***/ }),

/***/ "./src/asset/cancel.png":
/*!******************************!*\
  !*** ./src/asset/cancel.png ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "e20f20a9249cebc5c97b.png";

/***/ }),

/***/ "./src/asset/check.png":
/*!*****************************!*\
  !*** ./src/asset/check.png ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "496eabb25110ca54366f.png";

/***/ }),

/***/ "./src/asset/trash.png":
/*!*****************************!*\
  !*** ./src/asset/trash.png ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "c4e35861d2606e76ed78.png";

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_css-loader_dist_runtime_api_js-node_modules_css-loader_dist_runtime_sour-ff8d4c","shared"], () => (__webpack_exec__("./src/index.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLFFBQVEsWUFBWSxNQUFNLFlBQVksV0FBVyxVQUFVLFlBQVksV0FBVyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLFdBQVcsVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLFdBQVcsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxXQUFXLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxNQUFNLE1BQU0sS0FBSyxZQUFZLFdBQVcsT0FBTyxPQUFPLFlBQVksV0FBVyxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxXQUFXLFlBQVksYUFBYSxXQUFXLFVBQVUsT0FBTyxhQUFhLFlBQVksYUFBYSxXQUFXLFVBQVUsT0FBTyxLQUFLLFlBQVksV0FBVyxVQUFVLFlBQVksYUFBYSxhQUFhLFdBQVcsWUFBWSxhQUFhLGFBQWEsUUFBUSxLQUFLLFlBQVksUUFBUSxhQUFhLE1BQU0sWUFBWSxXQUFXLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxXQUFXLFVBQVUsT0FBTyxLQUFLLFlBQVksV0FBVyxVQUFVLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxPQUFPLFlBQVksTUFBTSxZQUFZLGFBQWEsYUFBYSxhQUFhLFdBQVcsWUFBWSxhQUFhLFdBQVcsVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLFdBQVcsWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLFdBQVcsVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLFdBQVcsVUFBVSxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxXQUFXLFVBQVUsT0FBTyxLQUFLLFVBQVUsVUFBVSxVQUFVLE9BQU8sS0FBSyxVQUFVLFlBQVksV0FBVyxVQUFVLE9BQU8sS0FBSyxVQUFVLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxXQUFXLFVBQVUsT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLFdBQVcsV0FBVyxPQUFPLEtBQUssWUFBWSxXQUFXLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLFdBQVcsVUFBVSxVQUFVLE9BQU8sS0FBSyxZQUFZLGFBQWEsTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLE9BQU8sWUFBWSxNQUFNLFlBQVksV0FBVyxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksV0FBVyxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLE9BQU8sYUFBYSxXQUFXLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksV0FBVyxNQUFNLFlBQVksTUFBTSxZQUFZLGFBQWEsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sWUFBWSxNQUFNLFVBQVUsWUFBWSxhQUFhLFdBQVcsT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLE9BQU8sYUFBYSxNQUFNLFVBQVUsWUFBWSxXQUFXLEtBQUssS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsT0FBTyxXQUFXLEtBQUssVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxh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Ozs7Ozs7Ozs7QUNObkIsTUFBK0Y7QUFDL0YsTUFBcUY7QUFDckYsTUFBNEY7QUFDNUYsTUFBK0c7QUFDL0csTUFBd0c7QUFDeEcsTUFBd0c7QUFDeEcsTUFBcUc7QUFDckc7QUFDQTs7QUFFQTs7QUFFQSw0QkFBNEIscUdBQW1CO0FBQy9DLHdCQUF3QixrSEFBYTs7QUFFckMsdUJBQXVCLHVHQUFhO0FBQ3BDO0FBQ0EsaUJBQWlCLCtGQUFNO0FBQ3ZCLDZCQUE2QixzR0FBa0I7O0FBRS9DLGFBQWEsMEdBQUcsQ0FBQyx3RkFBTzs7OztBQUkrQztBQUN2RSxPQUFPLGlFQUFlLHdGQUFPLElBQUksK0ZBQWMsR0FBRywrRkFBYyxZQUFZLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJwYWNrX3RlbXBsYXRlLy4vc3JjL2NvbXBvbmVudHMvcmFuZEdlbi5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX3RlbXBsYXRlLy4vc3JjL2dldFByb2plY3RMaXN0LmpzIiwid2VicGFjazovL3dlYnBhY2tfdGVtcGxhdGUvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vd2VicGFja190ZW1wbGF0ZS8uL3NyYy9pbml0aWFsaXplRmlyZWJhc2UuanMiLCJ3ZWJwYWNrOi8vd2VicGFja190ZW1wbGF0ZS8uL3NyYy9tZW1iZXIvVG9kby5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX3RlbXBsYXRlLy4vc3JjL21lbWJlci9hZGRQcm9qZWN0LmpzIiwid2VicGFjazovL3dlYnBhY2tfdGVtcGxhdGUvLi9zcmMvbWVtYmVyL2FkZFRhc2suanMiLCJ3ZWJwYWNrOi8vd2VicGFja190ZW1wbGF0ZS8uL3NyYy9tZW1iZXIvYWRtaW5QYW5lbC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX3RlbXBsYXRlLy4vc3JjL21lbWJlci9kaXNwbGF5L2Rpc3BsYXlQcm9qZWN0LmpzIiwid2VicGFjazovL3dlYnBhY2tfdGVtcGxhdGUvLi9zcmMvbWVtYmVyL2Rpc3BsYXkvZGlzcGxheVRhc2svZGlzcGxheVRhc2tCdXR0b24uanMiLCJ3ZWJwYWNrOi8vd2VicGFja190ZW1wbGF0ZS8uL3NyYy9tZW1iZXIvZGlzcGxheS9kaXNwbGF5VGFzay9kaXNwbGF5VGFza0xvZ2ljLmpzIiwid2VicGFjazovL3dlYnBhY2tfdGVtcGxhdGUvLi9zcmMvbWVtYmVyL2Rpc3BsYXkvZGlzcGxheVRhc2svZWRpdEZ1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX3RlbXBsYXRlLy4vc3JjL21lbWJlci9kaXNwbGF5L2Rpc3BsYXlUYXNrL3JlbmRlclRhc2tQYW5lbC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX3RlbXBsYXRlLy4vc3JjL21lbWJlci9kaXNwbGF5L3RvZ2dsZURpc3BsYXkuanMiLCJ3ZWJwYWNrOi8vd2VicGFja190ZW1wbGF0ZS8uL3NyYy9tZW1iZXIvcmVuZGVyU2VjQWRkVGFza0J1dHRvbnMuanMiLCJ3ZWJwYWNrOi8vd2VicGFja190ZW1wbGF0ZS8uL3NyYy9tZW1iZXIvc2lnbk91dEJ1dHRvbi5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX3RlbXBsYXRlLy4vc3JjL25vbm1lbWJlci9jaGVja0F1dGguanMiLCJ3ZWJwYWNrOi8vd2VicGFja190ZW1wbGF0ZS8uL3NyYy9ub25tZW1iZXIvc2lnbkluLmpzIiwid2VicGFjazovL3dlYnBhY2tfdGVtcGxhdGUvLi9zcmMvbm9ubWVtYmVyL3NpZ25VcC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX3RlbXBsYXRlLy4vc3JjL215c3R5bGUuY3NzIiwid2VicGFjazovL3dlYnBhY2tfdGVtcGxhdGUvLi9zcmMvaG9tZS5odG1sIiwid2VicGFjazovL3dlYnBhY2tfdGVtcGxhdGUvLi9zcmMvbXlzdHlsZS5jc3M/ZGQ1MCJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBhbHBoYSA9IFtcIkFcIiwgXCJCXCIsIFwiQ1wiLCBcIkRcIiwgXCJFXCIsIFwiRlwiLCBcIkdcIiwgXCJIXCIsIFwiSVwiLCBcIkpcIiwgXCJLXCIsIFwiTFwiLCBcIk1cIiwgXCJOXCIsIFwiT1wiLCBcIlBcIiwgXCJRXCIsIFwiUlwiLCBcIlNcIiwgXCJUXCIsIFwiVVwiLCBcIlZcIiwgXCJXXCIsIFwiWFwiLCBcIllcIiwgXCJaXCIsIFwiYVwiLCBcImJcIiwgXCJjXCIsIFwiZFwiLCBcImVcIiwgXCJmXCIsIFwiZ1wiLCBcImhcIiwgXCJpXCIsIFwialwiLCBcImtcIiwgXCJsXCIsIFwibVwiLCBcIm5cIiwgXCJvXCIsIFwicFwiLCBcInFcIiwgXCJyXCIsIFwic1wiLCBcInRcIiwgXCJ1XCIsIFwidlwiLCBcIndcIiwgXCJ4XCIsIFwieVwiLCBcInpcIiwgXCIwXCIsIFwiMVwiLCBcIjJcIiwgXCIzXCIsIFwiNFwiLCBcIjVcIiwgXCI2XCIsIFwiN1wiLCBcIjhcIiwgXCI5XCJdXHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IGdlbmVyYXRlQ29kZSA9IG51bSA9PiB7XHJcbiAgICB2YXIgY29kZSA9ICcnOyBcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtOyBpKyspIHtcclxuICAgICAgICBjb2RlICs9IGFscGhhW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDYyKV07IFxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNvZGU7IFxyXG59XHJcbiIsImltcG9ydCB7IGdldEF1dGgsIG9uQXV0aFN0YXRlQ2hhbmdlZCB9IGZyb20gJ2ZpcmViYXNlL2F1dGgnO1xyXG5pbXBvcnQgeyBnZXRGaXJlc3RvcmUsIGRvYywgc2V0RG9jLCBjb2xsZWN0aW9uLCBxdWVyeSwgd2hlcmUsIFRpbWVzdGFtcCwgZ2V0RG9jLCBnZXREb2NzLCBkZWxldGVEb2MsIG9yZGVyQnksIG9uU25hcHNob3QsIHVwZGF0ZURvY30gZnJvbSBcImZpcmViYXNlL2ZpcmVzdG9yZVwiO1xyXG5pbXBvcnQgeyBkYiB9IGZyb20gJy4vaW5pdGlhbGl6ZUZpcmViYXNlLmpzJztcclxuaW1wb3J0IHsgcmVuZGVyUHJvamVjdHMsIHJlbW92ZVByb2ogIH0gZnJvbSAnLi9tZW1iZXIvZGlzcGxheS9kaXNwbGF5UHJvamVjdC5qcyc7IFxyXG5cclxuY29uc3QgYXV0aCA9IGdldEF1dGgoKTtcclxuZXhwb3J0IGNvbnN0IHJldHVybkF1dGggPSAoKSA9PiB7XHJcbiAgICByZXR1cm4gYXV0aDtcclxufVxyXG5cclxudmFyIFByb2plY3RMaXN0ID0gW107XHJcbnZhciBQcm9qZWN0TmFtZXNMaXN0ID0gW107IFxyXG5cclxuZXhwb3J0IGNvbnN0IGZpbGxQcm9qZWN0TGlzdCA9IGFzeW5jICgpID0+IHtcclxuICAgIFByb2plY3RMaXN0ID0gW107IFxyXG4gICAgY29uc3QgcSA9IHF1ZXJ5KGNvbGxlY3Rpb24oZGIsICdwcm9qZWN0JywgYXV0aC5jdXJyZW50VXNlci51aWQsIFwiUHJvamVjdExpc3RcIikpO1xyXG4gICAgY29uc3Qgc25hcHNob3QgPSBhd2FpdCBnZXREb2NzKHEpXHJcbiAgICBzbmFwc2hvdC5mb3JFYWNoKGRhdGEgPT4ge1xyXG4gICAgICAgIFByb2plY3RMaXN0LnB1c2goZGF0YS5pZClcclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBmaWxsUHJvamVjdE5hbWVzTGlzdCA9IGFzeW5jICgpID0+IHtcclxuICAgIHdoaWxlIChQcm9qZWN0TmFtZXNMaXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICBQcm9qZWN0TmFtZXNMaXN0LnBvcCgpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgcSA9IHF1ZXJ5KGNvbGxlY3Rpb24oZGIsICdwcm9qZWN0JywgYXV0aC5jdXJyZW50VXNlci51aWQsICdQcm9qZWN0TGlzdCcpLCBvcmRlckJ5KCd0aXRsZScsICdhc2MnKSk7XHJcbiAgICBjb25zdCBzbmFwc2hvdCA9IGF3YWl0IGdldERvY3MocSlcclxuICAgICAgICAudGhlbihhc3luYyBkYXRhID0+IHtcclxuICAgICAgICAgICAgZGF0YS5mb3JFYWNoKGFzeW5jIHNuYXAgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgb2JqID0gKHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogc25hcC5pZCxcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogc25hcC5kYXRhKCkudGl0bGVcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgUHJvamVjdE5hbWVzTGlzdC5wdXNoKG9iaik7ICBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gLy9jb25zb2xlLmxvZyhQcm9qZWN0TmFtZXNMaXN0Lmxlbmd0aClcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHJldHJpZXZlUHJvamVjdExpc3QgPSAoKSA9PiB7XHJcbiAgICByZXR1cm4gUHJvamVjdExpc3Q7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCByZXRyaWV2ZVByb2plY3ROYW1lc0xpc3QgPSBhc3luYyAoKSA9PiB7XHJcbiAgLy8gIGF3YWl0IGZpbGxQcm9qZWN0TmFtZXNMaXN0KClcclxuICAvLyAgY29uc29sZS5sb2coUHJvamVjdE5hbWVzTGlzdClcclxuICAgIHJldHVybiBQcm9qZWN0TmFtZXNMaXN0O1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0VGFza0xpc3RCeVByb2plY3RJRCA9IGFzeW5jIChwcm9qZWN0SUQpID0+IHtcclxuICAgIGNvbnN0IHEgPSBxdWVyeShjb2xsZWN0aW9uKGRiLCAndGFzaycsIGF1dGguY3VycmVudFVzZXIudWlkLCAnVGFza0xpc3QnKSwgd2hlcmUoJ1Byb2plY3RJRCcsICc9PScsIHByb2plY3RJRCkpO1xyXG4gICAgdmFyIGFyciA9IFtdOyBcclxuICAgIGF3YWl0IGdldERvY3MocSkudGhlbihkYXRhID0+IHtcclxuICAgICAgICAvKlxyXG4gICAgICAgY29uc3Qgc25hcHNob3QgPSBkYXRhLmZvckVhY2goc25hcCA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBQcm9qZWN0SUQ6IHNuYXAuZGF0YSgpLlByb2plY3RJRCwgXHJcbiAgICAgICAgICAgICAgICBkZWFkbGluZTogc25hcC5kYXRhKCkuZGVhZGxpbmUsIFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHNuYXAuZGF0YSgpLmRlc2NyaXB0aW9uLCBcclxuICAgICAgICAgICAgICAgIHN0YXR1czogc25hcC5kYXRhKCkuc3RhdHVzLCBcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBzbmFwLmRhdGEoKS50aXRsZSwgXHJcbiAgICAgICAgICAgICAgICB1cmdlbmN5OiBzbmFwLmRhdGEoKS51cmdlbmN5LCBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgKi9cclxuICAgICAgICBkYXRhLmZvckVhY2goc25hcCA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzbmFwLmV4aXN0cygpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBhcnIucHVzaChzbmFwLmRhdGEoKSlcclxuICAgICAgICAgICAgICAgIGNvbnN0IG9iaiA9IHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogc25hcC5pZCxcclxuICAgICAgICAgICAgICAgICAgICBQcm9qZWN0SUQ6IHNuYXAuZGF0YSgpLlByb2plY3RJRCxcclxuICAgICAgICAgICAgICAgICAgICBkZWFkbGluZTogc25hcC5kYXRhKCkuZGVhZGxpbmUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHNuYXAuZGF0YSgpLmRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc25hcC5kYXRhKCkuc3RhdHVzLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBzbmFwLmRhdGEoKS50aXRsZSxcclxuICAgICAgICAgICAgICAgICAgICB1cmdlbmN5OiBzbmFwLmRhdGEoKS51cmdlbmN5LFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGVDcmVhdGVkOiBzbmFwLmRhdGEoKS5kYXRlQ3JlYXRlZCxcclxuICAgICAgICAgICAgICAgICAgICBpc0ZpbmlzaGVkOiBzbmFwLmRhdGEoKS5pc0ZpbmlzaGVkLFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYXJyLnB1c2gob2JqKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG5cclxuICAgIH0pLmNhdGNoKGUgPT4ge1xyXG4gICAgICAgICBjb25zb2xlLmxvZyhlLm1lc3NhZ2UpXHJcbiAgICB9KVxyXG4gICAgaWYgKGFyci5sZW5ndGggIT09IDApIHtcclxuICAgICAgICByZXR1cm4gYXJyO1xyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAgICAgIHJldHVybiBbXTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGRlbFByb2plY3QgPSBhc3luYyAoSUQpID0+IHtcclxuICAgIHZhciB0YXNrTGlzdCA9IFtdO1xyXG4gICAgY29uc3QgcSA9IHF1ZXJ5KGNvbGxlY3Rpb24oZGIsICd0YXNrJywgYXV0aC5jdXJyZW50VXNlci51aWQsICdUYXNrTGlzdCcpLCB3aGVyZSgnUHJvamVjdElEJywgJz09JywgSUQpKTtcclxuICAgIGNvbnN0IHNuYXBzaG90ID0gYXdhaXQgZ2V0RG9jcyhxKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBkYXRhLmZvckVhY2goc25hcCA9PiB7XHJcbiAgICAgICAgICAgICAgICB0YXNrTGlzdC5wdXNoKHNuYXAuaWQpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIHRhc2tMaXN0LmZvckVhY2goYXN5bmMgaXRlbSA9PiB7XHJcbiAgICAgICAgYXdhaXQgZGVsZXRlRG9jKGRvYyhkYiwgJ3Rhc2snLCBhdXRoLmN1cnJlbnRVc2VyLnVpZCwgJ1Rhc2tMaXN0JywgaXRlbSlcclxuICAgICAgICApXHJcbiAgICB9KVxyXG5cclxuICAgIGF3YWl0IGRlbGV0ZURvYyhkb2MoZGIsICdwcm9qZWN0JywgYXV0aC5jdXJyZW50VXNlci51aWQsICdQcm9qZWN0TGlzdCcsIElEKSkudGhlbihhc3luYyBkYXRhID0+IHtcclxuICAgICAgICAvL2xvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgIHJlbW92ZVByb2ooSUQpO1xyXG4gICAgfSlcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCB0b2dnbGVDaGVja0JveCA9IGFzeW5jICh0YXNrSUQsIGJvb2xWYWx1ZSkgPT4ge1xyXG4gICAgY29uc3QgZG9jUmVmID0gZG9jKGRiLCAndGFzaycsIGF1dGguY3VycmVudFVzZXIudWlkLCAnVGFza0xpc3QnLCB0YXNrSUQpXHJcbiAgICBpZiAoYm9vbFZhbHVlKSB7XHJcbiAgICAgICAgYXdhaXQgdXBkYXRlRG9jKGRvY1JlZiwge1xyXG4gICAgICAgICAgICBpc0ZpbmlzaGVkOiB0cnVlLFxyXG4gICAgICAgICAgICBzdGF0dXM6ICdEb25lJyxcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgYXdhaXQgdXBkYXRlRG9jKGRvY1JlZiwge1xyXG4gICAgICAgICAgICBpc0ZpbmlzaGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgc3RhdHVzOiAnT25nb2luZycsXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufSIsImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7IGRiIH0gZnJvbSAnLi9pbml0aWFsaXplRmlyZWJhc2UuanMnO1xyXG5pbXBvcnQgJy4vbXlzdHlsZS5jc3MnOyBcclxuaW1wb3J0IHsgcmVuZGVyU2lnbkluUGFnZSwgR29TaWduVXAsIGhhbmRsZVNpZ25JbiB9IGZyb20gJy4vbm9ubWVtYmVyL3NpZ25Jbi5qcydcclxuaW1wb3J0IHsgcmVuZGVyU2lnblVwUGFnZSwgR29TaWduSW4sIGhhbmRsZVNpZ25VcCB9IGZyb20gJy4vbm9ubWVtYmVyL3NpZ25VcC5qcyc7IFxyXG5pbXBvcnQgeyByZW5kZXJUb0RvIH0gZnJvbSAnLi9tZW1iZXIvVG9kby5qcyc7IFxyXG5pbXBvcnQgeyBnZXRBdXRoLCBvbkF1dGhTdGF0ZUNoYW5nZWQgfSBmcm9tICdmaXJlYmFzZS9hdXRoJzsgXHJcbmltcG9ydCB7IHJlbmRlclNpZ25PdXRCdXR0b24sIGhhbmRsZVNpZ25PdXQgfSBmcm9tICcuL21lbWJlci9zaWduT3V0QnV0dG9uLmpzJztcclxuaW1wb3J0IHsgcmVuZGVyQWRtaW5QYW5lbCB9IGZyb20gJy4vbWVtYmVyL2FkbWluUGFuZWwuanMnOyBcclxuaW1wb3J0IHsgcmVuZGVyQWRkUHJvaiwgb3BlbkFkZFByb2plY3RQYW5lbCwgY2xvc2VBZGRQcm9qZWN0UGFuZWwsIGhhbmRsZUFkZFByb2plY3QsIGdldFByb2plY3RMaXN0IH0gZnJvbSAnLi9tZW1iZXIvYWRkUHJvamVjdC5qcyc7XHJcbmltcG9ydCB7XHJcbiAgICByZW5kZXJBZGRUYXNrUGFuZWwsXHJcbiAgICBvcGVuQWRkVGFza1BhbmVsLFxyXG4gICAgY2xvc2VBZGRUYXNrUGFuZWwsXHJcbiAgICByZW5kZXJQcm9qZWN0Q2F0ZWdvcnksXHJcbiAgICBoYW5kbGVBZGRUYXNrLFxyXG4gICAgZmlsbFRhc2tTZWxlY3Rpb24sXHJcbiAgICByZW5kZXJTZWNBZGRUYXNrUGFuZWwsXHJcbiAgICBoYW5kbGVTZWNvbmRhcnlBZGRUYXNrLCBcclxuICAgIGNsb3NlU2VjQWRkVGFza1BhbmVsLCBcclxuIH0gZnJvbSAnLi9tZW1iZXIvYWRkVGFzay5qcyc7IFxyXG5pbXBvcnQgeyBmaWxsUHJvamVjdExpc3QsIHJldHJpZXZlUHJvamVjdExpc3QsIHJldHJpZXZlUHJvamVjdE5hbWVzTGlzdCwgZmlsbFByb2plY3ROYW1lc0xpc3R9IGZyb20gJy4vZ2V0UHJvamVjdExpc3QuanMnOyBcclxuaW1wb3J0IHsgZGlzcGxheVByb2plY3RzLCBkaXNwbGF5VG9kYXksIGRpc3BsYXlXZWVrLCBkaXNwbGF5TW9udGggfSBmcm9tICcuL21lbWJlci9kaXNwbGF5L3RvZ2dsZURpc3BsYXkuanMnOyBcclxuaW1wb3J0IHsgcmVuZGVyUHJvamVjdHMgfSBmcm9tICcuL21lbWJlci9kaXNwbGF5L2Rpc3BsYXlQcm9qZWN0LmpzJztcclxuaW1wb3J0IHsgQWRkRnVuY1RvU2VjQnV0dG9ucyB9IGZyb20gJy4vbWVtYmVyL3JlbmRlclNlY0FkZFRhc2tCdXR0b25zLmpzJztcclxuaW1wb3J0IHsgcmVuZGVyVGFza1BhbmVsIH0gZnJvbSAnLi9tZW1iZXIvZGlzcGxheS9kaXNwbGF5VGFzay9yZW5kZXJUYXNrUGFuZWwuanMnO1xyXG5pbXBvcnQgeyBjbG9zZURpc3BsYXlUYXNrLCBsb2FkRGlzcGxheVRhc2tEb20gfSBmcm9tICcuL21lbWJlci9kaXNwbGF5L2Rpc3BsYXlUYXNrL2Rpc3BsYXlUYXNrTG9naWMuanMnO1xyXG5cclxuLy9mb3Igd2F0Y2hpbmcgdGhlIGh0bWwgZmlsZSBcclxucmVxdWlyZSgnLi9ob21lLmh0bWwnKVxyXG5cclxuY29uc3QgYXV0aCA9IGdldEF1dGgoKTsgXHJcbnZhciB0b2tlbiA9ICcnOyBcclxudmFyIGN1cnJlbnRVc2VyID0gbnVsbDsgXHJcbmNvbnN0IHNpZ25JblBhZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lnbkluJyk7XHJcbmNvbnN0IHNpZ25VcFBhZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lnblVwJyk7IFxyXG5jb25zdCBtYWluUGFnZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFpblBhZ2VzJyk7IFxyXG5cclxuXHJcbi8qc2lnbiBpbiBwYWdlIGNvZGUqL1xyXG5zaWduSW5QYWdlLmlubmVySFRNTCA9IHJlbmRlclNpZ25JblBhZ2UoKVxyXG5zaWduVXBQYWdlLmlubmVySFRNTCA9IHJlbmRlclNpZ25VcFBhZ2UoKTtcclxuLy9zaWduSW5QYWdlLmFwcGVuZENoaWxkKHJlbmRlclNpZ25PdXRCdXR0b24oKSk7XHJcbm1haW5QYWdlcy5hcHBlbmRDaGlsZChyZW5kZXJUb0RvKCkpO1xyXG5cclxuLy9yZW5kZXIgRE9NIFxyXG5cclxuLypjb2RlIGZvciBhZG1pbiBwYW5lbCBvZiB0aGUgbWFpbiBwYWdlcyovXHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWRlLXBhbmVsJykuaW5uZXJIVE1MID0gcmVuZGVyQWRtaW5QYW5lbCgpXHJcblxyXG4vKmNvZGUgZm9yIGFkZCBwcm9qZWN0IHBhbmVsKi9cclxuY29uc3QgQWRkUHJvamVjdFBhbmVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZFByb2plY3RQYW5lbCcpO1xyXG5BZGRQcm9qZWN0UGFuZWwuaW5uZXJIVE1MID0gcmVuZGVyQWRkUHJvaigpO1xyXG5cclxuLypjb2RlIGZvciBhZGQgdGFzayBwYW5lbCovXHJcbmNvbnN0IGFkZFRhc2tQYW5lbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGRUYXNrUGFuZWwnKTtcclxuYWRkVGFza1BhbmVsLmlubmVySFRNTCA9IHJlbmRlckFkZFRhc2tQYW5lbCgpO1xyXG5cclxuXHJcbi8vY29kZSBmb3IgU2Vjb25kYXJ5IEFkZCBUYXNrIFBhbmVsIFxyXG5jb25zdCBTZWNBZGRUYXNrUGFuZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnU2Vjb25kYXJ5QWRkVGFza1BhbmVsJyk7XHJcblNlY0FkZFRhc2tQYW5lbC5pbm5lckhUTUwgPSByZW5kZXJTZWNBZGRUYXNrUGFuZWwoKTsgXHJcblxyXG4vL3JlbmRlcnMgdGhlIHBhbmVsIHRoYXQgZGlzcGxheXMgaW5kaXZpZHVhbCB0YXNrIGRldGFpbHNcclxuY29uc3QgZGlzcGxheVRhc2sgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlzcGxheVRhc2tQYW5lbCcpO1xyXG5kaXNwbGF5VGFzay5pbm5lckhUTUwgPSByZW5kZXJUYXNrUGFuZWwoKTtcclxuXHJcbi8vcmVuZGVyIHRoZSBEaXNwbGF5IFRhc2sgUGFuZWwgdGhhdCBzaG93cyB0aGUgdXNlciB0aGUgaW5kaXZpZHVhbCB0YXNrIG9mIGEgcHJvamVjdFxyXG5jb25zdCBkaXNwbGF5VGFza1BhbmVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rpc3BsYXlUYXNrUGFuZWwnKTtcclxuLy9kaXNwbGF5VGFza1BhbmVsLmFwcGVuZENoaWxkKHJlbmRlclRhc2tQYW5lbCgpKTtcclxuLy9sb2FkRGlzcGxheVRhc2tEb20oKTsgXHJcblxyXG5leHBvcnQgY29uc3QgbWFpbkFwcCA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBvbkF1dGhTdGF0ZUNoYW5nZWQoYXV0aCwgKHVzZXIpID0+IHtcclxuICAgICAgICBpZiAoIXVzZXIpIHtcclxuICAgICAgICAgICAgc2lnbkluUGFnZS5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XHJcbiAgICAgICAgICAgIG1haW5QYWdlcy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgKGFzeW5jIGZ1bmN0aW9uICgpIHsgYXdhaXQgZmlsbFByb2plY3ROYW1lc0xpc3QoKX0pKCk7IFxyXG5cclxuICAgICAgICAgICAgc2lnbkluUGFnZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICBzaWduVXBQYWdlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIG1haW5QYWdlcy5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XHJcbiAgICAgICAgICAgIGZpbGxQcm9qZWN0TGlzdCgpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgLyoqYWRtaW4gcGFuZWwgKi9cclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpZ25PdXRCdXR0b24nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZVNpZ25PdXQpXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdBZG1pbl9hZGRQcm9qZWN0QnV0dG9uJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvcGVuQWRkUHJvamVjdFBhbmVsKVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnQ2FuY2VsQWRkUHJvamVjdEJ1dHRvbicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VBZGRQcm9qZWN0UGFuZWwpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkUHJvamVjdEJ1dHRvbicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlQWRkUHJvamVjdCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IE9wZW5UYXNrQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0FkbWluX2FkZFRhc2tCdXR0b24nKTtcclxuICAgICAgICAgICAgLy9PcGVuVGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9wZW5BZGRUYXNrUGFuZWwpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgQWRkVGFza0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGRUYXNrQnV0dG9uJyk7IFxyXG4gICAgICAgICAgICAvL0FkZFRhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVBZGRUYXNrKVxyXG5cclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0NhbmNlbEFkZFRhc2tCdXR0b24nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlQWRkVGFza1BhbmVsKTtcclxuXHJcbiAgICAgICAgICAgIC8vZGlzcGxheSB0YXNrIHBhbmVsXHJcbiAgICAgICAgICAgIC8vY29uc3QgZGlzcGxheVRhc2tfY2xvc2VCdXR0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rpc3BsYXlUYXNrX2Nsb3NlQnV0dG9uJyk7XHJcbiAgICAgICAgICAgIC8vZGlzcGxheVRhc2tfY2xvc2VCdXR0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VEaXNwbGF5VGFzayk7IFxyXG5cclxuICAgICAgICAgICAgLy9yZW5kZXJzIHRoZSAnc2VsZWN0JyB0YWcgZWxlbWVudCBvZiB0aGUgQWRkIFRhc2sgUGFuZWwgdW5kZXIgQXNzaWduIFByb2plY3QgQ2F0ZWdvcnlcclxuICAgICAgICAgICAgKGFzeW5jIGZ1bmN0aW9uICgpIHsgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0Fzc2lnblByb2plY3QnKS5hcHBlbmRDaGlsZChhd2FpdCByZW5kZXJQcm9qZWN0Q2F0ZWdvcnkoKSkgfSkoKTtcclxuXHJcbiAgICAgICAgICAgIC8vYWRkIGV2ZW50cyB0byBlYWNoIGJ1dHRvbiBvZiB0aGUgYWRtaW4gcGFuZWwgZm9yIGRpc3BsYXlpbmcgdGhlIHRhc2tzIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkbWluUHJvamVjdEJ1dHRvbicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZGlzcGxheVByb2plY3RzKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkbWluVG9kYXlCdXR0b24nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGRpc3BsYXlUb2RheSk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZG1pbldlZWtCdXR0b24nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGRpc3BsYXlXZWVrKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkbWluTW9udGhCdXR0b24nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGRpc3BsYXlNb250aCk7XHJcblxyXG5cclxuICAgICAgICAgICAgT3BlblRhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvcGVuQWRkVGFza1BhbmVsKTtcclxuICAgICAgICAgICAgQWRkVGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUFkZFRhc2spXHJcbiAgICAgICAgICAgIEFkZEZ1bmNUb1NlY0J1dHRvbnMoKTtcclxuICAgICAgICAgICAgcmVuZGVyUHJvamVjdHMoKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59KSgpO1xyXG5cclxuY29uc3QgZ29TaWduSW5CdXR0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dvU2lnbkluQnV0dG9uJyk7XHJcbmNvbnN0IGdvU2lnblVwQnV0dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnb1NpZ25VcEJ1dHRvbicpOyBcclxuY29uc3Qgc2lnblVwQnV0dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWduVXBCdXR0b24nKTtcclxuY29uc3Qgc2lnbkluQnV0dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWduSW5CdXR0b24nKTsgXHJcblxyXG5nb1NpZ25JbkJ1dHQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBHb1NpZ25Jbik7XHJcbmdvU2lnblVwQnV0dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIEdvU2lnblVwKTtcclxuc2lnbkluQnV0dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIGN1cnJlbnRVc2VyID0gaGFuZGxlU2lnbkluKCk7IFxyXG59KVxyXG5cclxuXHJcblxyXG5cclxuIiwiaW1wb3J0IGZpcmViYXNlIGZyb20gXCJmaXJlYmFzZS9jb21wYXQvYXBwXCI7XHJcbmltcG9ydCB7IGdldEZpcmVzdG9yZSB9IGZyb20gJ2ZpcmViYXNlL2ZpcmVzdG9yZSc7XHJcblxyXG5cclxuLy8gVE9ETzogQWRkIFNES3MgZm9yIEZpcmViYXNlIHByb2R1Y3RzIHRoYXQgeW91IHdhbnQgdG8gdXNlXHJcblxyXG4vLyBodHRwczovL2ZpcmViYXNlLmdvb2dsZS5jb20vZG9jcy93ZWIvc2V0dXAjYXZhaWxhYmxlLWxpYnJhcmllc1xyXG5cclxuXHJcbi8vIFlvdXIgd2ViIGFwcCdzIEZpcmViYXNlIGNvbmZpZ3VyYXRpb25cclxuXHJcbmNvbnN0IGZpcmViYXNlQ29uZmlnID0ge1xyXG5cclxuICAgIGFwaUtleTogXCJBSXphU3lDTF9QLWN2RE41QU1UdEdHcWpaYWhiTHVnczA2S3I0TDBcIixcclxuXHJcbiAgICBhdXRoRG9tYWluOiBcInRvLWRvLWxpc3QtLS1qYXZhc2NyaXB0LmZpcmViYXNlYXBwLmNvbVwiLFxyXG5cclxuICAgIHByb2plY3RJZDogXCJ0by1kby1saXN0LS0tamF2YXNjcmlwdFwiLFxyXG5cclxuICAgIHN0b3JhZ2VCdWNrZXQ6IFwidG8tZG8tbGlzdC0tLWphdmFzY3JpcHQuYXBwc3BvdC5jb21cIixcclxuXHJcbiAgICBtZXNzYWdpbmdTZW5kZXJJZDogXCIzMjM2MjE5MDEwMTJcIixcclxuXHJcbiAgICBhcHBJZDogXCIxOjMyMzYyMTkwMTAxMjp3ZWI6OWVhMTQ5ZmJiZjNjYzhhZWNlNjE0MVwiXHJcblxyXG59O1xyXG5cclxuXHJcbi8vIEluaXRpYWxpemUgRmlyZWJhc2VcclxuXHJcbmNvbnN0IGFwcCA9IGZpcmViYXNlLmluaXRpYWxpemVBcHAoZmlyZWJhc2VDb25maWcpO1xyXG5cclxuY29uc3QgZGIgPSBnZXRGaXJlc3RvcmUoKTsgXHJcblxyXG5leHBvcnQgeyBkYiB9OyBcclxuXHJcbiIsImltcG9ydCB7IHJlbmRlclNpZ25PdXRCdXR0b24sIGhhbmRsZVNpZ25PdXQgfSBmcm9tICcuL3NpZ25PdXRCdXR0b24uanMnOyBcclxuLy9pbXBvcnQgeyByZW5kZXJBZG1pblBhbmVsIH0gZnJvbSAnLi9hZG1pblBhbmVsLmpzJztcclxuXHJcbmV4cG9ydCBjb25zdCByZW5kZXJUb0RvID0gKCkgPT4ge1xyXG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgZWxlbWVudC5pbm5lckhUTUwgPSBcIjxkaXYgaWQgPSAnbWVtYmVyLWlubmVyQ29udGFpbmVyJz5cIiArXHJcbiAgICAgICAgICAgIFwiPGRpdiBpZCA9ICdjZW50ZXJfY29udGFpbmVyJz5cIiArIFxyXG4gICAgICAgICAgICAgICAgXCI8ZGl2IGlkID0gJ3NpZGUtcGFuZWwnPjwvZGl2PlwiICtcclxuICAgICAgICAgICAgICAgIFwiPGRpdiBpZCA9ICdvdXRwdXQtcGFuZWwnPlwiICtcclxuICAgICAgICAgICAgICAgICAgICBcIjxkaXYgaWQgPSAnZGlzcGxheUNvbnRhaW5lcic+XCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIjxkaXYgaWQgPSAnZGlzcGxheVByb2plY3RDb24nPlwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiPGgyPlByb2plY3RzPC9oMj5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjxkaXYgaWQgPSAnZGlzcGxheVByb2plY3RzQ29udGVudCc+PC9kaXY+XCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIjwvZGl2PlwiICsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiPGRpdiBpZCA9ICdkaXNwbGF5VG9kYXlDb24nPlwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiPGgyPlRvZGF5J3MgVGFza3M8L2gyPlwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiPGRpdiBpZCA9ICdkaXNwbGF5VG9kYXlDb250ZW50Jz48L2Rpdj5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiPC9kaXY+XCIgKyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCI8ZGl2IGlkID0gJ2Rpc3BsYXlXZWVrQ29uJz5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjxoMj5UaGlzIFdlZWsncyBUYXNrczwvaDI+XCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI8ZGl2IGlkID0gJ2Rpc3BsYXlXZWVrQ29udGVudCc+PC9kaXY+XCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIjwvZGl2PlwiICsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiPGRpdiBpZCA9ICdkaXNwbGF5TW9udGhDb24nPlwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiPGgyPlRoaXMgTW9udGgncyBUYXNrczwvaDI+XCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI8ZGl2IGlkID0gJ2Rpc3BsYXlNb250aENvbnRlbnQnPjwvZGl2PlwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCI8L2Rpdj5cIiArIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIjxkaXYgaWQgPSAnZGlzcGxheVNpbmdsZVByb2plY3QnPlwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCI8L2Rpdj5cIiArIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIjxkaXYgaWQgPSAnZGlzcGxheVNpbmdsZVRhc2snPlwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCI8L2Rpdj5cIiArIFxyXG4gICAgICAgICAgICAgICAgICAgIFwiPC9kaXY+XCIgKyBcclxuICAgICAgICAgICAgICAgIFwiPC9kaXYgPlwiICsgXHJcbiAgICAgICAgICAgICAgICBcIjxkaXYgaWQgPSAnYWRkUHJvamVjdFBhbmVsJz48L2Rpdj5cIiArIFxyXG4gICAgICAgICAgICAgICAgXCI8ZGl2IGlkID0gJ2FkZFRhc2tQYW5lbCc+PC9kaXY+XCIgKyBcclxuICAgICAgICAgICAgICAgIFwiPGRpdiBpZCA9ICdTZWNvbmRhcnlBZGRUYXNrUGFuZWwnPjwvZGl2PlwiICsgXHJcbiAgICAgICAgICAgICAgICBcIjxkaXYgaWQgPSAnZGlzcGxheVRhc2tQYW5lbCc+PC9kaXY+XCIgKyBcclxuICAgICAgICAgICAgXCI8L2Rpdj5cIiArIFxyXG4gICAgICAgIFwiPC9kaXY+XCI7XHJcbiAgICAgICAgXCI8c3BhbiBpZCA9ICdlbXB0eSc+PC9zcGFuPlwiXHJcbi8vICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQocmVuZGVyU2lnbk91dEJ1dHRvbigpKTtcclxuICAgIHJldHVybiBlbGVtZW50OyBcclxufVxyXG5cclxuXHJcblxyXG5cclxuIiwiaW1wb3J0IGZpcmViYXNlIGZyb20gJ2ZpcmViYXNlL2NvbXBhdC9hcHAnOyBcclxuaW1wb3J0IHsgZ2V0QXV0aCB9IGZyb20gJ2ZpcmViYXNlL2F1dGgnXHJcbmltcG9ydCB7IGRvYywgc2V0RG9jLCBjb2xsZWN0aW9uLCBxdWVyeSwgd2hlcmUsIFRpbWVzdGFtcCwgZ2V0RG9jLCBnZXREb2NzIH0gZnJvbSAnZmlyZWJhc2UvZmlyZXN0b3JlJztcclxuaW1wb3J0IHsgZGIgfSBmcm9tICcuLi9pbml0aWFsaXplRmlyZWJhc2UuanMnO1xyXG5pbXBvcnQgeyBmb3JtYXREaXN0YW5jZSwgc3ViRGF5cyB9IGZyb20gJ2RhdGUtZm5zJzsgXHJcbmltcG9ydCB7IGdlbmVyYXRlQ29kZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvcmFuZEdlbi5qcyc7IFxyXG5pbXBvcnQgeyBmaWxsUHJvamVjdExpc3QsIHJldHJpZXZlUHJvamVjdExpc3QgfSBmcm9tICcuLi9nZXRQcm9qZWN0TGlzdC5qcyc7IFxyXG5pbXBvcnQgeyBhZGRQcm9qZWN0VG9Qcm9qZWN0RGlzcGxheSB9IGZyb20gJy4vZGlzcGxheS9kaXNwbGF5UHJvamVjdC5qcyc7XHJcbmltcG9ydCB7IGFkZFByb2plY3RUb1NlbGVjdGlvbiB9IGZyb20gJy4vYWRkVGFzay5qcyc7XHJcblxyXG5jb25zdCBhdXRoID0gZ2V0QXV0aCgpOyBcclxuXHJcbmNvbnN0IEluaXRQcm9qZWN0SW5mbyA9IHtcclxuICAgIHRpdGxlOiAnJyxcclxuICAgIGRlYWRsaW5lOiAnJyxcclxuICAgIHN0YXR1czogJycsXHJcbn1cclxuXHJcbnZhciBwcm9qZWN0SW5mbyA9IHtcclxuICAgIHRpdGxlOiAnJywgXHJcbiAgICBkZWFkbGluZTogJycsXHJcbiAgICBzdGF0dXM6ICcnLCBcclxufVxyXG5cclxuY29uc3Qgc3RhdHVzT3B0aW9ucyA9IFsnT25nb2luZycsICdEb25lJywgJ1B1dCBvbiBob2xkJ107IFxyXG5cclxuZXhwb3J0IGNvbnN0IHJlbmRlckFkZFByb2ogPSAoKSA9PiB7XHJcbiAgICBjb25zdCBlbGVtZW50ID0gXCI8aDEgc3R5bGUgPSAnbWFyZ2luLXRvcDogNTBweDsnPkFkZCBQcm9qZWN0PC9oMT5cIiArXHJcbiAgICAgICAgXCI8ZGl2IGlkID0gJ2FkZFByb2plY3RQYW5lbENvbnRhaW5lcic+XCIgK1xyXG4gICAgICAgICAgICAgIFwiPGRpdiBpZCA9ICdpbnB1dEZpZWxkJz5cIiArIFxyXG4gICAgICAgICAgICAgIFwiPGgzPlByb2plY3QgVGl0bGU8L2gzPlwiICtcclxuICAgICAgICAgICAgICBcIjxpbnB1dCB0eXBlID0gJ3RleHQnIGlkID0gJ2FkZF9wcm9qZWN0VGl0bGUnIC8+XCIgK1xyXG4gICAgICAgICAgICBcIjwvZGl2PlwiICsgXHJcbiAgICAgICAgICAgIFwiPGRpdiBpZCA9ICdhZGRQcm9qZWN0XzJuZGNvbnRhaW5lcicgPlwiICsgXHJcbiAgICAgICAgICAgICAgICBcIjxkaXYgaWQgPSAncHJvamVjdF9zdGF0dXNfaW5wdXQnPlwiICsgXHJcbiAgICAgICAgICAgICAgICBcIjxoMz5Qcm9ncmVzcyBTdGF0dXM8L2gzPlwiICtcclxuICAgICAgICAgICAgICAgIFwiPHNlbGVjdCBpZCA9ICdhZGRQcm9qZWN0X3NlbGVjdGlvbic+XCIgK1xyXG4gICAgICAgICAgICAgICAgXCI8b3B0aW9uIHZhbHVlID0gJzAnPk9uZ29pbmc8L29wdGlvbj5cIiArXHJcbiAgICAgICAgICAgICAgICBcIjxvcHRpb24gdmFsdWUgPSAnMSc+RG9uZTwvb3B0aW9uPlwiICtcclxuICAgICAgICAgICAgICAgIFwiPG9wdGlvbiB2YWx1ZSA9ICcyJz5QdXQgb24gaG9sZDwvb3B0aW9uPlwiICtcclxuICAgICAgICAgICAgICAgIFwiPC9zZWxlY3Q+XCIgK1xyXG4gICAgICAgICAgICAgICAgXCI8L2Rpdj5cIiArIFxyXG4gICAgICAgICAgICAgICAgIFwiPGRpdiBpZCA9ICdwcm9qZWN0X2RlYWRsaW5lX2lucHV0Jz5cIiArIFxyXG4gICAgICAgICAgICAgICAgXCI8aDM+RGVhZGxpbmUgRGF0ZTwvaDM+XCIgK1xyXG4gICAgICAgICAgICAgICAgXCI8aW5wdXQgdHlwZSA9ICdkYXRlJyBpZCA9ICdwcm9qZWN0X2RlYWRsaW5lSW5wdXQnIC8+XCIgK1xyXG4gICAgICAgICAgICAgICAgXCI8L2Rpdj5cIiArIFxyXG4gICAgICAgICAgICBcIjwvZGl2PlwiICsgXHJcbiAgICAgICAgICAgXCI8ZGl2IGlkID0gJ0FkZFByb2plY3RCdXR0b25Db250YWluZXInPlwiICsgXHJcbiAgICAgICAgICAgICAgICBcIjxkaXYgaWQgPSAnQWRkUHJvamVjdEJ1dHRvbkNvbnRhaW5lcl9ib3gxJz5cIiArIFxyXG4gICAgICAgICAgICAgICAgXCI8YnV0dG9uIGlkID0gJ2FkZFByb2plY3RCdXR0b24nPkFkZDwvYnV0dG9uPlwiICtcclxuICAgICAgICAgICAgICAgIFwiPC9kaXY+XCIgK1xyXG4gICAgICAgICAgICAgICAgXCI8ZGl2IGlkID0gJ0FkZFByb2plY3RCdXR0b25Db250YWluZXJfYm94MSc+XCIgKyBcclxuICAgICAgICAgICAgICAgIFwiPGJ1dHRvbiBpZCA9ICdDYW5jZWxBZGRQcm9qZWN0QnV0dG9uJz5DYW5jZWw8L2J1dHRvbj5cIiArXHJcbiAgICAgICAgICAgICAgICBcIjwvZGl2PlwiICtcclxuICAgICAgICAgICAgXCI8L2Rpdj5cIiArXHJcbiAgICAgICAgXCI8L2Rpdj5cIjtcclxuXHJcbiAgICByZXR1cm4gZWxlbWVudDtcclxufVxyXG5cclxuLy9yZXRyaWV2ZXMgYW4gYXJyYXkgb2YgYWxsIFByb2plY3QgSUQncyBcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRQcm9qZWN0TGlzdCA9IGFzeW5jICgpID0+IHtcclxuICAgIHZhciBwcm9qZWN0TGlzdCA9IFtdOyBcclxuICAgIGNvbnN0IHEgPSBxdWVyeShjb2xsZWN0aW9uKGRiLCAncHJvamVjdCcsIGF1dGguY3VycmVudFVzZXIudWlkLCBcIlByb2plY3RMaXN0XCIpKTtcclxuICAgIGNvbnN0IHNuYXBzaG90ID0gYXdhaXQgZ2V0RG9jcyhxKVxyXG4gICAgc25hcHNob3QuZm9yRWFjaChkb2MgPT4ge1xyXG4gICAgICAgIHByb2plY3RMaXN0LnB1c2goZG9jLmlkKVxyXG4gICAgfSlcclxuICAgIHJldHVybiBwcm9qZWN0TGlzdDtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IG9wZW5BZGRQcm9qZWN0UGFuZWwgPSBhc3luYyAoKSA9PiB7XHJcbiAgICBjb25zdCBQcm9qZWN0UGFuZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkUHJvamVjdFBhbmVsJyk7XHJcbiAgICBQcm9qZWN0UGFuZWwuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snOyBcclxuXHJcbn0gXHJcblxyXG5leHBvcnQgY29uc3QgY2xvc2VBZGRQcm9qZWN0UGFuZWwgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBQcm9qZWN0UGFuZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkUHJvamVjdFBhbmVsJyk7XHJcbiAgICBQcm9qZWN0UGFuZWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgIHByb2plY3RJbmZvID0gT2JqZWN0LmFzc2lnbihJbml0UHJvamVjdEluZm8pO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZF9wcm9qZWN0VGl0bGUnKS52YWx1ZSA9ICcnO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZFByb2plY3Rfc2VsZWN0aW9uJykudmFsdWUgPSAwO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3RfZGVhZGxpbmVJbnB1dCcpLnZhbHVlID0gJyc7IFxyXG5cclxufSBcclxuXHJcbmV4cG9ydCBjb25zdCBoYW5kbGVBZGRQcm9qZWN0ID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgcHJvamVjdEluZm8udGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkX3Byb2plY3RUaXRsZScpLnZhbHVlOyBcclxuICAgIHByb2plY3RJbmZvLnN0YXR1cyA9IHN0YXR1c09wdGlvbnNbZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZFByb2plY3Rfc2VsZWN0aW9uJykudmFsdWVdOyBcclxuICAgIHByb2plY3RJbmZvLmRlYWRsaW5lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3RfZGVhZGxpbmVJbnB1dCcpLnZhbHVlOyBcclxuICAgIHZhciBjbG9zZVdpbmRvdyA9IHRydWU7IFxyXG4gICAgaWYgKHByb2plY3RJbmZvLnRpdGxlKSB7XHJcbiAgICAgICAgY29uc3QgZGVhZGxpbmVfZGF0ZSA9IG5ldyBEYXRlKHByb2plY3RJbmZvLmRlYWRsaW5lKTtcclxuICAgICAgICBjb25zdCBVVENUaW1lID0gbmV3IERhdGUoZGVhZGxpbmVfZGF0ZS5nZXRVVENGdWxsWWVhcigpLCBkZWFkbGluZV9kYXRlLmdldFVUQ01vbnRoKCksIGRlYWRsaW5lX2RhdGUuZ2V0VVRDRGF0ZSgpLCBkZWFkbGluZV9kYXRlLmdldFVUQ0hvdXJzKCksIGRlYWRsaW5lX2RhdGUuZ2V0VVRDTWludXRlcygpLCBkZWFkbGluZV9kYXRlLmdldFVUQ1NlY29uZHMoKSk7IFxyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gbmV3IERhdGUoRGF0ZS5ub3coKSlcclxuICAgICAgICBpZiAoVVRDVGltZSA+PSBjdXJyZW50VGltZSB8fCBVVENUaW1lLnRvTG9jYWxlRGF0ZVN0cmluZygpID49IGN1cnJlbnRUaW1lLnRvTG9jYWxlRGF0ZVN0cmluZygpKSB7XHJcbiAgICAgICAgICAgIGxldCByZXBlYXQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdmFyIGNvZGVJRCA9IGdlbmVyYXRlQ29kZSgyMCk7IFxyXG4gICAgICAgICAgICBhd2FpdCBzZXREb2MoZG9jKGRiLCAncHJvamVjdCcsIGF1dGguY3VycmVudFVzZXIudWlkLCAnUHJvamVjdExpc3QnLCBjb2RlSUQpLCB7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogcHJvamVjdEluZm8udGl0bGUsXHJcbiAgICAgICAgICAgICAgICBzdGF0dXM6IHByb2plY3RJbmZvLnN0YXR1cyxcclxuICAgICAgICAgICAgICAgIGRlYWRsaW5lOiBUaW1lc3RhbXAuZnJvbURhdGUoVVRDVGltZSksXHJcbiAgICAgICAgICAgIH0pLnRoZW4oc25hcCA9PiB7XHJcbiAgICAgICAgICAgICAgICBhZGRQcm9qZWN0VG9Qcm9qZWN0RGlzcGxheShwcm9qZWN0SW5mby50aXRsZSwgY29kZUlEKTtcclxuICAgICAgICAgICAgICAgIGFkZFByb2plY3RUb1NlbGVjdGlvbihwcm9qZWN0SW5mby50aXRsZSwgY29kZUlEKTtcclxuICAgICAgICAgICAgICAgIGZpbGxQcm9qZWN0TGlzdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNsb3NlV2luZG93ID0gdHJ1ZTsgXHJcblxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KGVycm9yLmNvZGUgKyBcIjogXCIgKyBlcnJvci5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydChcIlRoZSBkYXRlIHlvdSd2ZSBjaG9zZW4gY2Fubm90IGJlIGVhcmxpZXIgdGhhbiB0b2RheSdzIGRhdGUuIFwiKVxyXG4gICAgICAgICAgICBjbG9zZVdpbmRvdyA9IGZhbHNlOyBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBhbGVydCgnUGxlYXNlLCB0eXBlIGluIHRoZSB0aXRsZSBvZiB0aGUgcHJvamVjdC4nKVxyXG4gICAgICAgIGNsb3NlV2luZG93ID0gZmFsc2U7IFxyXG4gICAgfVxyXG4gICAgaWYoY2xvc2VXaW5kb3cpXHJcbiAgICAgICAgIGNsb3NlQWRkUHJvamVjdFBhbmVsKCk7XHJcbn1cclxuXHJcbiIsImltcG9ydCBmaXJlYmFzZSBmcm9tICdmaXJlYmFzZS9jb21wYXQvYXBwJztcclxuaW1wb3J0IHsgZ2V0QXV0aCB9IGZyb20gJ2ZpcmViYXNlL2F1dGgnXHJcbmltcG9ydCB7IGRvYywgc2V0RG9jLCBjb2xsZWN0aW9uLCBxdWVyeSwgd2hlcmUsIFRpbWVzdGFtcCwgZ2V0RG9jLCBnZXREb2NzLCBvcmRlckJ5LCBvblNuYXBzaG90IH0gZnJvbSAnZmlyZWJhc2UvZmlyZXN0b3JlJztcclxuaW1wb3J0IHsgZGIgfSBmcm9tICcuLi9pbml0aWFsaXplRmlyZWJhc2UuanMnO1xyXG5pbXBvcnQgeyBmb3JtYXREaXN0YW5jZSwgc3ViRGF5cyB9IGZyb20gJ2RhdGUtZm5zJztcclxuaW1wb3J0IHsgZ2VuZXJhdGVDb2RlIH0gZnJvbSAnLi4vY29tcG9uZW50cy9yYW5kR2VuLmpzJzsgXHJcbmltcG9ydCB7IHJldHJpZXZlUHJvamVjdExpc3QsIHJldHJpZXZlUHJvamVjdE5hbWVzTGlzdCwgZ2V0UHJvamVjdE5hbWVzTGlzdH0gZnJvbSAnLi4vZ2V0UHJvamVjdExpc3QuanMnOyBcclxuaW1wb3J0IHsgcmVuZGVyUHJvamVjdHMsIGFkZFRhc2tUb1Byb2plY3REaXNwbGF5IH0gZnJvbSAnLi9kaXNwbGF5L2Rpc3BsYXlQcm9qZWN0LmpzJztcclxuaW1wb3J0IHsgc2V0UHJvamVjdElEIH0gZnJvbSAnLi9yZW5kZXJTZWNBZGRUYXNrQnV0dG9ucy5qcyc7XHJcblxyXG5jb25zdCBhdXRoID0gZ2V0QXV0aCgpO1xyXG5cclxuXHJcbmNvbnN0IEluaXRUYXNrSW5mbyA9IHtcclxuICAgIHRpdGxlOiAnJyxcclxuICAgIGRlYWRsaW5lOiAnJyxcclxuICAgIHN0YXR1czogJycsXHJcbiAgICB1cmdlbmN5OiAnJyxcclxuICAgIHByb2plY3RJRDogJycsXHJcbiAgICBkZXNjcmlwdGlvbjogJycsXHJcbn1cclxuXHJcbnZhciB0YXNrSW5mbyA9IHtcclxuICAgIHRpdGxlOiAnJyxcclxuICAgIGRlYWRsaW5lOiAnJyxcclxuICAgIHN0YXR1czogJycsXHJcbiAgICB1cmdlbmN5OiAnJywgXHJcbiAgICBwcm9qZWN0SUQ6ICcnLCBcclxuICAgIGRlc2NyaXB0aW9uOiAnJywgXHJcbn1cclxuXHJcbmNvbnN0IHVyZ2VuY3kgPSBbJ0xvdyBQcmlvcml0eScsICdNb2Rlc3QgTGV2ZWwgUHJpb3JpdHknLCAnSGlnaCBQcmlvcml0eSddOyBcclxuY29uc3Qgc3RhdHVzT3B0aW9ucyA9IFsnT25nb2luZycsICdEb25lJywgJ1B1dCBvbiBob2xkJ107IFxyXG5cclxuZXhwb3J0IGNvbnN0IHJlbmRlckFkZFRhc2tQYW5lbCA9ICgpID0+IHtcclxuY29uc3QgZWxlbWVudCA9IFwiPGgxIHN0eWxlID0gJ21hcmdpbi10b3A6IDUwcHg7Jz5BZGQgVGFzazwvaDE+XCIgK1xyXG4gICAgICAgICAgICBcIjxkaXYgaWQgPSAnYWRkUHJvamVjdFBhbmVsQ29udGFpbmVyJz5cIiArXHJcbiAgICAgICAgICAgICAgICBcIjxkaXYgaWQgPSAnaW5wdXRGaWVsZCc+XCIgK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiPGgzPk5hbWUgb2YgVGFzazwvaDM+XCIgK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiPGlucHV0IHR5cGUgPSAndGV4dCcgaWQgPSAnYWRkX3Rhc2tOYW1lJyAvPlwiICtcclxuICAgICAgICAgICAgXCI8L2Rpdj5cIiArXHJcbiAgICAgICAgICAgIFwiPGRpdiBpZCA9ICdpbnB1dEZpZWxkJyBzdHlsZSA9ICdtYXJnaW4tdG9wOiAyMHB4Oyc+XCIgK1xyXG4gICAgICAgICAgICAgICAgXCI8aDM+RGVzY3JpcHRvbjwvaDM+XCIgK1xyXG4gICAgICAgICAgICAgICAgXCI8dGV4dGFyZWEgdHlwZSA9ICd0ZXh0JyBpZCA9ICdhZGRUYXNrX2Rlc2NyaXB0aW9uJyByb3dzID0gMiBwbGFjZWhvbGRlciA9ICdbT3B0aW9uYWxdIEJyaWVmbHksIGRlc2NyaWJlIHlvdXIgdGFzay4nPjwvdGV4dGFyZWE+XCIgK1xyXG4gICAgICAgICAgICBcIjwvZGl2PlwiICtcclxuICAgICAgICAgICAgICAgIFwiPGRpdiBpZCA9ICdhZGRQcm9qZWN0XzJuZGNvbnRhaW5lcicgPlwiICtcclxuICAgICAgICAgICAgICAgICAgICBcIjxkaXYgaWQgPSAndGFza19zdGF0dXNfaW5wdXQnPlwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCI8aDM+UHJvZ3Jlc3MgU3RhdHVzPC9oMz5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiPHNlbGVjdCBpZCA9ICdhZGRUYXNrX3N0YXR1cyc+XCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIjxvcHRpb24gdmFsdWUgPSAnMCc+T25nb2luZzwvb3B0aW9uPlwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCI8b3B0aW9uIHZhbHVlID0gJzEnPkRvbmU8L29wdGlvbj5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiPG9wdGlvbiB2YWx1ZSA9ICcyJz5QdXQgb24gaG9sZDwvb3B0aW9uPlwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCI8L3NlbGVjdD5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgXCI8L2Rpdj5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgXCI8ZGl2IGlkID0gJ3Rhc2tfZGVhZGxpbmVfaW5wdXRfY29udGFpbmVyJz5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiPGgzPkRlYWRsaW5lIERhdGU8L2gzPlwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCI8aW5wdXQgdHlwZSA9ICdkYXRlJyBpZCA9ICd0YXNrX2RlYWRsaW5lSW5wdXQnIC8+XCIgK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiPC9kaXY+XCIgK1xyXG4gICAgICAgICAgICAgICAgXCI8L2Rpdj5cIiArXHJcbiAgICAgICAgICAgICAgICBcIjxkaXYgaWQgPSAnYWRkUHJvamVjdF8ybmRjb250YWluZXInID5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgXCI8ZGl2IGlkID0gJ1Rhc2tfcHJpb3JpdHlfaW5wdXQnPlwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCI8aDM+VXJnZW5jeTwvaDM+XCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIjxzZWxlY3QgaWQgPSAnYWRkVGFza191cmdlbmN5Jz5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiPG9wdGlvbiB2YWx1ZSA9ICcwJz5Mb3cgcHJpb3JpdHk8L29wdGlvbj5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiPG9wdGlvbiB2YWx1ZSA9ICcxJz5Nb2Rlc3QgbGV2ZWwgcHJpb3JpdHk8L29wdGlvbj5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiPG9wdGlvbiB2YWx1ZSA9ICcyJz5IaWdoIHByaW9yaXR5PC9vcHRpb24+XCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIjwvc2VsZWN0PlwiICtcclxuICAgICAgICAgICAgICAgICAgICBcIjwvZGl2PlwiICtcclxuICAgICAgICAgICAgICAgICAgICBcIjxkaXYgaWQgPSAnUHJvamVjdF9jYXRlZ29yeV9jb250YWluZXInPlwiICsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiPGgzPlByb2plY3QgQ2F0ZWdvcnk8L2gzPlwiICsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiPGRpdiBpZCA9ICdBc3NpZ25Qcm9qZWN0Jz48L2Rpdj5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgXCI8L2Rpdj5cIiArXHJcbiAgICAgICAgICAgICAgICBcIjwvZGl2PlwiICtcclxuICAgICAgICAgICAgICAgIFwiPGRpdiBpZCA9ICdBZGRUYXNrQnV0dG9uQ29udGFpbmVyJz5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgXCI8ZGl2IGlkID0gJ0FkZFRhc2tCdXR0b25Db250YWluZXJfYm94MSc+XCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgXCI8YnV0dG9uIGlkID0gJ2FkZFRhc2tCdXR0b24nPkFkZDwvYnV0dG9uPlwiICtcclxuICAgICAgICAgICAgICAgICAgICBcIjwvZGl2PlwiICtcclxuICAgICAgICAgICAgICAgICAgICBcIjxkaXYgaWQgPSAnQWRkUHJvamVjdEJ1dHRvbkNvbnRhaW5lcl9ib3gxJz5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgXCI8YnV0dG9uIGlkID0gJ0NhbmNlbEFkZFRhc2tCdXR0b24nPkNhbmNlbDwvYnV0dG9uPlwiICtcclxuICAgICAgICAgICAgICAgICAgICBcIjwvZGl2PlwiICtcclxuICAgICAgICAgICAgICAgIFwiPC9kaXY+XCIgK1xyXG4gICAgICAgIFwiPC9kaXY+XCI7XHJcblxyXG4gICAgcmV0dXJuIGVsZW1lbnQ7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgY29uc3Qgb3BlbkFkZFRhc2tQYW5lbCA9ICgpID0+IHtcclxuICAgIGNvbnN0IFByb2plY3RQYW5lbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGRUYXNrUGFuZWwnKTtcclxuICAgIFByb2plY3RQYW5lbC5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XHJcblxyXG4gICAgLy9kZXNlbGVjdCB0aGUgdmFsdWUgaW4gdGhlIFByb2plY3QgU2VsZWN0IGxpc3QgXHJcbiAgICBjb25zdCBQcm9qZWN0U2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0FkZFRhc2tfUHJvamVjdENhdGVnb3J5X1NlbGVjdGlvbicpOyBcclxuICAgIFByb2plY3RTZWxlY3Quc2VsZWN0ZWRJbmRleCA9ICctMSc7IFxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgY2xvc2VBZGRUYXNrUGFuZWwgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBQcm9qZWN0UGFuZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkVGFza1BhbmVsJyk7XHJcbiAgICBQcm9qZWN0UGFuZWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgIHRhc2tJbmZvID0gT2JqZWN0LmFzc2lnbihJbml0VGFza0luZm8pO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZF90YXNrTmFtZScpLnZhbHVlID0gJyc7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkVGFza19kZXNjcmlwdGlvbicpLnZhbHVlID0gJyc7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkVGFza19zdGF0dXMnKS52YWx1ZSA9IDA7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFza19kZWFkbGluZUlucHV0JykudmFsdWUgPSAnJztcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdBZGRUYXNrX1Byb2plY3RDYXRlZ29yeV9TZWxlY3Rpb24nKS52YWx1ZSA9ICdub25lJztcclxuXHJcbn0gXHJcblxyXG4vL1RoaXMgaXMgd29ya2luZywgYnV0IGl0J3Mgc2xvd1xyXG4vKlxyXG5leHBvcnQgY29uc3QgcmVuZGVyUHJvamVjdENhdGVnb3J5ID0gYXN5bmMoKSA9PiB7XHJcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VsZWN0Jyk7XHJcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnaWQnLCAnQWRkVGFza19Qcm9qZWN0Q2F0ZWdvcnlfU2VsZWN0aW9uJyk7IFxyXG4gICAgY29uc3QgZmlyc3RPcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdPUFRJT04nKTtcclxuICAgIGZpcnN0T3B0aW9uLnZhbHVlID0gJ25vbmUnOyBcclxuICAgIGZpcnN0T3B0aW9uLmlubmVySFRNTCA9ICdub25lJzsgXHJcbiAgICBlbGVtZW50LmFwcGVuZENoaWxkKGZpcnN0T3B0aW9uKTtcclxuICAgIGNvbnN0IFByb2plY3RMaXN0ID0gYXdhaXQgT2JqZWN0LmFzc2lnbihnZXRQcm9qZWN0TmFtZXNMaXN0KCkpO1xyXG4gICAgY29uc29sZS5sb2coUHJvamVjdExpc3RbMF0pO1xyXG4gICAgY29uc3QgcSA9IHF1ZXJ5KGNvbGxlY3Rpb24oZGIsICdwcm9qZWN0JywgYXV0aC5jdXJyZW50VXNlci51aWQsICdQcm9qZWN0TGlzdCcpKTtcclxuICAgIGNvbnN0IHNuYXBzaG90ID0gYXdhaXQgZ2V0RG9jcyhxKVxyXG4gICAgICAgIC50aGVuKGFzeW5jIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBkYXRhLmZvckVhY2goYXN5bmMgc25hcCA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBvcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ09QVElPTicpOyBcclxuICAgICAgICAgICAgICAgIG9wLnZhbHVlID0gc25hcC5pZDtcclxuICAgICAgICAgICAgICAgIG9wLmlubmVySFRNTCA9IHNuYXAuZGF0YSgpLnRpdGxlOyBcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQob3ApXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgcmV0dXJuIGVsZW1lbnQ7IFxyXG59IFxyXG4qL1xyXG5cclxuLy90aGlzIGFsc28gd29ya3MgXHJcbi8qXHJcbmV4cG9ydCBjb25zdCByZW5kZXJQcm9qZWN0Q2F0ZWdvcnkgPSBhc3luYyAoKSA9PiB7XHJcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VsZWN0Jyk7XHJcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnaWQnLCAnQWRkVGFza19Qcm9qZWN0Q2F0ZWdvcnlfU2VsZWN0aW9uJyk7XHJcbiAgICBjb25zdCBmaXJzdE9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ09QVElPTicpO1xyXG4gICAgZmlyc3RPcHRpb24udmFsdWUgPSAnbm9uZSc7XHJcbiAgICBmaXJzdE9wdGlvbi5pbm5lckhUTUwgPSAnbm9uZSc7XHJcbiAgICBlbGVtZW50LmFwcGVuZENoaWxkKGZpcnN0T3B0aW9uKTtcclxuICAgIGNvbnN0IFByb2plY3RMaXN0ID0gYXdhaXQgT2JqZWN0LmFzc2lnbihnZXRQcm9qZWN0TmFtZXNMaXN0KCkpO1xyXG4gICAgY29uc29sZS5sb2coUHJvamVjdExpc3QpXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IFByb2plY3RMaXN0Lmxlbmd0aDsgaSsrKXtcclxuICAgICAgICBjb25zdCBvcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ09QVElPTicpXHJcbiAgICAgICAgb3AuaW5uZXJIVE1MID0gUHJvamVjdExpc3RbaV0udGl0bGU7ICBcclxuICAgICAgICBvcC52YWx1ZSA9IFByb2plY3RMaXN0W2ldLmlkOyBcclxuICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKG9wKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGVsZW1lbnQ7XHJcbn0gKi9cclxuXHJcbnZhciBQcm9qZWN0TGlzdCA9IFtdOyBcclxuZXhwb3J0IGNvbnN0IGZpbGxUYXNrU2VsZWN0aW9uID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgd2hpbGUgKFByb2plY3RMaXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICBQcm9qZWN0TGlzdC5wb3AoKTtcclxuICAgIH1cclxuICAgIFByb2plY3RMaXN0ID0gW107XHJcbiAgICBjb25zdCBxID0gcXVlcnkoY29sbGVjdGlvbihkYiwgJ3Byb2plY3QnLCBhdXRoLmN1cnJlbnRVc2VyLnVpZCwgJ1Byb2plY3RMaXN0JyksIG9yZGVyQnkoJ3RpdGxlJywgJ2FzYycpKTtcclxuICAgIGNvbnN0IHNuYXBzaG90ID0gYXdhaXQgZ2V0RG9jcyhxKVxyXG4gICAgICAgIC50aGVuKGFzeW5jIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBkYXRhLmZvckVhY2goYXN5bmMgc25hcCA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBvYmogPSAoe1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBzbmFwLmlkLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBzbmFwLmRhdGEoKS50aXRsZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICBQcm9qZWN0TGlzdC5wdXNoKG9iaik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIC8vY29uc29sZS5sb2coUHJvamVjdExpc3QpXHJcbn1cclxuXHJcbi8vVGhpcyBpcyBmaWxscyB1cCB0aGUgc2VsZWN0IHRhZyB0aGF0IGFsbG93cyB0aGUgdXNlciB0byBzZWxlY3Qgd2hpY2ggcHJvamVjdCBjYXRlZ29yeSB0aGUgdGFzayBpcyBhc3NpZ25lZCB0b1xyXG5leHBvcnQgY29uc3QgcmVuZGVyUHJvamVjdENhdGVnb3J5ID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlbGVjdCcpO1xyXG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ0FkZFRhc2tfUHJvamVjdENhdGVnb3J5X1NlbGVjdGlvbicpO1xyXG4gICAgY29uc3QgZmlyc3RPcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdPUFRJT04nKTtcclxuICAgIGZpcnN0T3B0aW9uLnZhbHVlID0gJ25vbmUnO1xyXG4gICAgZmlyc3RPcHRpb24uaW5uZXJIVE1MID0gJ25vbmUnO1xyXG4gICAgZWxlbWVudC5hcHBlbmRDaGlsZChmaXJzdE9wdGlvbik7XHJcbiAgICBhd2FpdCBmaWxsVGFza1NlbGVjdGlvbigpO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgUHJvamVjdExpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjb25zdCBvcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ09QVElPTicpXHJcbiAgICAgICAgb3AuaW5uZXJIVE1MID0gUHJvamVjdExpc3RbaV0udGl0bGU7XHJcbiAgICAgICAgb3AudmFsdWUgPSBQcm9qZWN0TGlzdFtpXS5pZDtcclxuICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKG9wKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGVsZW1lbnQ7XHJcbn0gXHJcblxyXG4vL1RoaXMgZnVuY3Rpb24gaXMgY2FsbGVkIHdoZW4gdXNlciBjcmVhdGVzIGEgbmV3IHByb2plY3QuIFRoaXMgZnVuY3Rpb24gYWRkcyB0aGUgcHJvamVjdCB0byB0aGUgUHJvamVjdCBDYXRlZ29yeSBTZWxlY3QgVGFnIFxyXG5leHBvcnQgY29uc3QgYWRkUHJvamVjdFRvU2VsZWN0aW9uID0gKHRpdGxlLCBJRCkgPT4ge1xyXG4gICAgY29uc3QgbmV3T3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnT1BUSU9OJyk7XHJcbiAgICBuZXdPcHRpb24uaW5uZXJIVE1MID0gdGl0bGU7XHJcbiAgICBuZXdPcHRpb24udmFsdWUgPSBJRFxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0FkZFRhc2tfUHJvamVjdENhdGVnb3J5X1NlbGVjdGlvbicpLmFwcGVuZENoaWxkKG5ld09wdGlvbik7IFxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgaGFuZGxlQWRkVGFzayA9IGFzeW5jICgpID0+IHtcclxuICAgIHRhc2tJbmZvLnRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZF90YXNrTmFtZScpLnZhbHVlO1xyXG5cclxuICAgIHZhciBjbG9zZVdpbmRvdyA9IHRydWU7IFxyXG4gICAgaWYgKHRhc2tJbmZvLnRpdGxlICE9ICcnKSB7XHJcbiAgICAgICAgdGFza0luZm8uZGVhZGxpbmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFza19kZWFkbGluZUlucHV0JykudmFsdWU7XHJcbiAgICAgICAgY29uc3QgZGVhZGxpbmVfZGF0ZSA9IG5ldyBEYXRlKHRhc2tJbmZvLmRlYWRsaW5lKTtcclxuICAgICAgICBjb25zdCBjdXJyZW50VGltZSA9IG5ldyBEYXRlKERhdGUubm93KCkpOyBcclxuICAgICAgICBjb25zdCBVVENUaW1lID0gbmV3IERhdGUoZGVhZGxpbmVfZGF0ZS5nZXRVVENGdWxsWWVhcigpLCBkZWFkbGluZV9kYXRlLmdldFVUQ01vbnRoKCksIGRlYWRsaW5lX2RhdGUuZ2V0VVRDRGF0ZSgpLCBkZWFkbGluZV9kYXRlLmdldFVUQ0hvdXJzKCksIGRlYWRsaW5lX2RhdGUuZ2V0VVRDTWludXRlcygpLCBkZWFkbGluZV9kYXRlLmdldFVUQ1NlY29uZHMoKSk7IFxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdDaG9zZW4gVGltZSA9ICcgKyBVVENUaW1lKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdjdXJyZW50VGltZSA9ICcgKyBjdXJyZW50VGltZSlcclxuICAgICAgICBjb25zb2xlLmxvZyhVVENUaW1lID49IGN1cnJlbnRUaW1lKVxyXG4gICAgICAgIGlmIChVVENUaW1lID49IGN1cnJlbnRUaW1lIHx8IFVUQ1RpbWUudG9Mb2NhbGVEYXRlU3RyaW5nKCkgPj0gY3VycmVudFRpbWUudG9Mb2NhbGVEYXRlU3RyaW5nKCkpIHtcclxuICAgICAgICAgICAgdGFza0luZm8uZGVzY3JpcHRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkVGFza19kZXNjcmlwdGlvbicpLnZhbHVlO1xyXG4gICAgICAgICAgICB0YXNrSW5mby5zdGF0dXMgPSBzdGF0dXNPcHRpb25zW2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGRUYXNrX3N0YXR1cycpLnZhbHVlXTtcclxuICAgICAgICAgICAgdGFza0luZm8ucHJvamVjdElEID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0FkZFRhc2tfUHJvamVjdENhdGVnb3J5X1NlbGVjdGlvbicpLnZhbHVlO1xyXG4gICAgICAgICAgICB0YXNrSW5mby51cmdlbmN5ID0gdXJnZW5jeVtkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkVGFza191cmdlbmN5JykudmFsdWVdO1xyXG4gICAgICAgICAgICBjb25zdCBjb2RlSUQgPSBnZW5lcmF0ZUNvZGUoMjApOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zdCBkb2NEYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IHRhc2tJbmZvLnRpdGxlLFxyXG4gICAgICAgICAgICAgICAgUHJvamVjdElEOiB0YXNrSW5mby5wcm9qZWN0SUQsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogdGFza0luZm8uZGVzY3JpcHRpb24sXHJcbiAgICAgICAgICAgICAgICBzdGF0dXM6IHRhc2tJbmZvLnN0YXR1cyxcclxuICAgICAgICAgICAgICAgIHVyZ2VuY3k6IHRhc2tJbmZvLnVyZ2VuY3ksXHJcbiAgICAgICAgICAgICAgICBkZWFkbGluZTogVGltZXN0YW1wLmZyb21EYXRlKFVUQ1RpbWUpLFxyXG4gICAgICAgICAgICAgICAgZGF0ZUNyZWF0ZWQ6IFRpbWVzdGFtcC5mcm9tRGF0ZShjdXJyZW50VGltZSksXHJcbiAgICAgICAgICAgICAgICBpc0ZpbmlzaGVkOiBmYWxzZSwgXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGF3YWl0IHNldERvYyhkb2MoZGIsICd0YXNrJywgYXV0aC5jdXJyZW50VXNlci51aWQsICdUYXNrTGlzdCcsIGNvZGVJRCksIGRvY0RhdGEpXHJcbiAgICAgICAgICAgICAgICAudGhlbihzbmFwID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBhZGRUYXNrVG9Qcm9qZWN0RGlzcGxheSh0YXNrSW5mby5wcm9qZWN0SUQsIGNvZGVJRCwgdGFza0luZm8udGl0bGUsIHRhc2tJbmZvLmRlc2NyaXB0aW9uLCB0YXNrSW5mby51cmdlbmN5LCB0YXNrSW5mby5zdGF0dXMsIFRpbWVzdGFtcC5mcm9tRGF0ZShVVENUaW1lKSwgVGltZXN0YW1wLmZyb21EYXRlKGN1cnJlbnRUaW1lKSwgdGFza0luZm8uaXNGaW5pc2hlZCk7IFxyXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlV2luZG93ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KGVycm9yLmNvZGUgKyBcIjogXCIgKyBlcnJvci5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICBjbG9zZVdpbmRvdyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydChcIlRoZSBkYXRlIHlvdSd2ZSBjaG9zZW4gY2Fubm90IGJlIGVhcmxpZXIgdGhhbiB0b2RheSdzIGRhdGUuIFwiKVxyXG4gICAgICAgICAgICBjbG9zZVdpbmRvdyA9IGZhbHNlOyBcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBhbGVydCgnUGxlYXNlLCB0eXBlIHRoZSBuYW1lIG9mIHlvdXIgdGFzay4nKVxyXG4gICAgICAgIGNsb3NlV2luZG93ID0gZmFsc2U7IFxyXG4gICAgfVxyXG5cclxuICAgIGlmIChjbG9zZVdpbmRvdykge1xyXG4gICAgICAgIGNsb3NlQWRkVGFza1BhbmVsKCk7IFxyXG4gICAgfVxyXG59XHJcblxyXG4vL1RoaXMgaXMgbm90IHdvcmtpbmcgYmVjYXVzZSBmb3Igc29tZSByZWFzb24gc2VsZWN0ZWRJbmRleCBpcyBub3Qgd29ya2luZyBhcyBpdCBpcyBpbnRlbmRlZC5cclxuZXhwb3J0IGZ1bmN0aW9uIG9wZW5BZGRUYXNrUGFuZWx3aXRoUHJvamVjdElEKHByb2plY3RJRCkge1xyXG4gICAgY29uc3QgUHJvamVjdFNlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdBZGRUYXNrX1Byb2plY3RDYXRlZ29yeV9TZWxlY3Rpb24nKTsgXHJcbiAgICBjb25zb2xlLmxvZyhQcm9qZWN0U2VsZWN0LnNlbGN0ZWRJbmRleCk7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IFByb2plY3RTZWxlY3Qub3B0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChwcm9qZWN0SUQgPT09IFByb2plY3RTZWxlY3Qub3B0aW9uc1tpXS52YWx1ZSkge1xyXG4gICAgICAgICAgICBQcm9qZWN0U2VsZWN0LnNlbGVjdGVkSW5kZXggPSBpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbi8vICAgIGNvbnNvbGUubG9nKFByb2plY3RTZWxlY3Quc2VsZWN0ZWRJbmRleCk7XHJcbiAgICBvcGVuQWRkVGFza1BhbmVsKCk7IFxyXG59XHJcblxyXG52YXIgU2Vjb25kYXJ5VGFza0luZm8gPSB7XHJcbiAgICB0aXRsZTogJycsXHJcbiAgICBkZWFkbGluZTogJycsXHJcbiAgICBzdGF0dXM6ICcnLFxyXG4gICAgdXJnZW5jeTogJycsXHJcbiAgICBwcm9qZWN0SUQ6ICcnLFxyXG4gICAgZGVzY3JpcHRpb246ICcnLFxyXG59XHJcblxyXG4vL1NlY29uZGFyeSBBZGQgVGFzayBQYW5lbCBcclxuZXhwb3J0IGNvbnN0IHJlbmRlclNlY0FkZFRhc2tQYW5lbCA9ICgpID0+IHtcclxuICAgIGNvbnN0IGVsZW1lbnQgPSBcIjxoMSBzdHlsZSA9ICdtYXJnaW4tdG9wOiA1MHB4Oyc+QWRkIFRhc2s8L2gxPlwiICtcclxuICAgICAgICBcIjxkaXYgaWQgPSAnYWRkUHJvamVjdFBhbmVsQ29udGFpbmVyJz5cIiArXHJcbiAgICAgICAgXCI8ZGl2IGlkID0gJ2lucHV0RmllbGQnPlwiICtcclxuICAgICAgICBcIjxoMz5OYW1lIG9mIFRhc2s8L2gzPlwiICtcclxuICAgICAgICBcIjxpbnB1dCB0eXBlID0gJ3RleHQnIGlkID0gJ2FkZF90YXNrTmFtZS1TRUMnIC8+XCIgK1xyXG4gICAgICAgIFwiPC9kaXY+XCIgK1xyXG4gICAgICAgIFwiPGRpdiBpZCA9ICdpbnB1dEZpZWxkJyBzdHlsZSA9ICdtYXJnaW4tdG9wOiAyMHB4Oyc+XCIgK1xyXG4gICAgICAgIFwiPGgzPkRlc2NyaXB0b248L2gzPlwiICtcclxuICAgICAgICBcIjx0ZXh0YXJlYSB0eXBlID0gJ3RleHQnIGlkID0gJ2FkZFRhc2tfZGVzY3JpcHRpb24tU0VDJyByb3dzID0gMiBwbGFjZWhvbGRlciA9ICdbT3B0aW9uYWxdIEJyaWVmbHksIGRlc2NyaWJlIHlvdXIgdGFzay4nPjwvdGV4dGFyZWE+XCIgK1xyXG4gICAgICAgIFwiPC9kaXY+XCIgK1xyXG4gICAgICAgIFwiPGRpdiBpZCA9ICdhZGRQcm9qZWN0XzJuZGNvbnRhaW5lcicgPlwiICtcclxuICAgICAgICBcIjxkaXYgaWQgPSAndGFza19zdGF0dXNfaW5wdXQnPlwiICtcclxuICAgICAgICBcIjxoMz5Qcm9ncmVzcyBTdGF0dXM8L2gzPlwiICtcclxuICAgICAgICBcIjxzZWxlY3QgaWQgPSAnYWRkVGFza19zdGF0dXMtU0VDJz5cIiArXHJcbiAgICAgICAgXCI8b3B0aW9uIHZhbHVlID0gJzAnPk9uZ29pbmc8L29wdGlvbj5cIiArXHJcbiAgICAgICAgXCI8b3B0aW9uIHZhbHVlID0gJzEnPkRvbmU8L29wdGlvbj5cIiArXHJcbiAgICAgICAgXCI8b3B0aW9uIHZhbHVlID0gJzInPlB1dCBvbiBob2xkPC9vcHRpb24+XCIgK1xyXG4gICAgICAgIFwiPC9zZWxlY3Q+XCIgK1xyXG4gICAgICAgIFwiPC9kaXY+XCIgK1xyXG4gICAgICAgIFwiPGRpdiBpZCA9ICd0YXNrX2RlYWRsaW5lX2lucHV0X2NvbnRhaW5lcic+XCIgK1xyXG4gICAgICAgIFwiPGgzPkRlYWRsaW5lIERhdGU8L2gzPlwiICtcclxuICAgICAgICBcIjxpbnB1dCB0eXBlID0gJ2RhdGUnIGlkID0gJ3Rhc2tfZGVhZGxpbmVJbnB1dC1TRUMnIC8+XCIgK1xyXG4gICAgICAgIFwiPC9kaXY+XCIgK1xyXG4gICAgICAgIFwiPC9kaXY+XCIgK1xyXG4gICAgICAgIFwiPGRpdiBpZCA9ICdhZGRQcm9qZWN0XzJuZGNvbnRhaW5lcicgPlwiICtcclxuICAgICAgICBcIjxkaXYgaWQgPSAnVGFza19wcmlvcml0eV9pbnB1dCc+XCIgK1xyXG4gICAgICAgIFwiPGgzPlVyZ2VuY3k8L2gzPlwiICtcclxuICAgICAgICBcIjxzZWxlY3QgaWQgPSAnYWRkVGFza191cmdlbmN5LVNFQyc+XCIgK1xyXG4gICAgICAgIFwiPG9wdGlvbiB2YWx1ZSA9ICcwJz5Mb3cgcHJpb3JpdHk8L29wdGlvbj5cIiArXHJcbiAgICAgICAgXCI8b3B0aW9uIHZhbHVlID0gJzEnPk1vZGVzdCBsZXZlbCBwcmlvcml0eTwvb3B0aW9uPlwiICtcclxuICAgICAgICBcIjxvcHRpb24gdmFsdWUgPSAnMic+SGlnaCBwcmlvcml0eTwvb3B0aW9uPlwiICtcclxuICAgICAgICBcIjwvc2VsZWN0PlwiICtcclxuICAgICAgICBcIjwvZGl2PlwiICtcclxuICAgICAgICBcIjxkaXYgaWQgPSAnUHJvamVjdF9jYXRlZ29yeV9jb250YWluZXInPlwiICtcclxuICAgICAgICBcIjxoMz5Qcm9qZWN0IENhdGVnb3J5PC9oMz5cIiArXHJcbiAgICAgICAgXCI8ZGl2IGlkID0gJ0Fzc2lnblByb2plY3QtU0VDJz48L2Rpdj5cIiArXHJcbiAgICAgICAgXCI8L2Rpdj5cIiArXHJcbiAgICAgICAgXCI8L2Rpdj5cIiArXHJcbiAgICAgICAgXCI8ZGl2IGlkID0gJ0FkZFRhc2tCdXR0b25Db250YWluZXInPlwiICtcclxuICAgICAgICAgICAgXCI8ZGl2IGlkID0gJ0FkZFRhc2tCdXR0b25Db250YWluZXJfYm94MSc+XCIgK1xyXG4gICAgICAgICAgICAgICAgIFwiPGJ1dHRvbiBpZCA9ICdhZGRUYXNrQnV0dG9uLVNFQyc+QWRkPC9idXR0b24+XCIgK1xyXG4gICAgICAgICAgICBcIjwvZGl2PlwiICtcclxuICAgICAgICAgICAgXCI8ZGl2IGlkID0gJ0FkZFByb2plY3RCdXR0b25Db250YWluZXJfYm94MSc+XCIgK1xyXG4gICAgICAgICAgICAgXCI8YnV0dG9uIGlkID0gJ0NhbmNlbEFkZFRhc2tCdXR0b24tU0VDJz5DYW5jZWw8L2J1dHRvbj5cIiArXHJcbiAgICAgICAgICAgIFwiPC9kaXY+XCIgK1xyXG4gICAgICAgIFwiPC9kaXY+XCIgK1xyXG4gICAgICAgIFwiPC9kaXY+XCI7XHJcblxyXG4gICAgcmV0dXJuIGVsZW1lbnQ7XHJcbn1cclxuXHJcbi8vZnVuY3Rpb24gZm9yIGNsb3NpbmcgdGhlIFNlY29uZGFyeSBBZGQgVGFzayBwYW5lbCBcclxuZXhwb3J0IGNvbnN0IGNsb3NlU2VjQWRkVGFza1BhbmVsID0gKCkgPT4ge1xyXG4gICAgY29uc3QgcGFuZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnU2Vjb25kYXJ5QWRkVGFza1BhbmVsJyk7XHJcbiAgICBwYW5lbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgLy9yZXNldCB2YWx1ZXMgXHJcbiAgICBTZWNvbmRhcnlUYXNrSW5mbyA9IE9iamVjdC5hc3NpZ24oSW5pdFRhc2tJbmZvKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGRfdGFza05hbWUtU0VDJykudmFsdWUgPSAnJztcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrX2RlYWRsaW5lSW5wdXQtU0VDJykudmFsdWUgPSAnJztcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGRUYXNrX2Rlc2NyaXB0aW9uLVNFQycpLnZhbHVlID0gJyc7IFxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZFRhc2tfc3RhdHVzLVNFQycpLnZhbHVlID0gMDtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGRUYXNrX3VyZ2VuY3ktU0VDJykudmFsdWUgPSAwO1xyXG5cclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdBc3NpZ25Qcm9qZWN0LVNFQycpLmNoaWxkTm9kZXNbMF0ucmVtb3ZlKCk7XHJcblxyXG59XHJcblxyXG52YXIgY291bnQgPSAwOyBcclxuXHJcbmV4cG9ydCBjb25zdCBvcGVuU2VjQWRkVGFza1BhbmVsID0gKHRpdGxlLCBQcm9qZWN0SUQpID0+IHtcclxuICAgIFNlY29uZGFyeVRhc2tJbmZvID0gT2JqZWN0LmFzc2lnbihJbml0VGFza0luZm8pO1xyXG4gICAgICAgIC8vZ2V0IElEIG9mIFByb2plY3QgQ2F0ZWdvcnkgZWxlbWVudCBcclxuICAgIGNvbnN0IFByb2plY3RDYXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnQXNzaWduUHJvamVjdC1TRUMnKTtcclxuICAgIGNvbnN0IHBhbmVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ1NlY29uZGFyeUFkZFRhc2tQYW5lbCcpOyAgICBcclxuICAgIHBhbmVsLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJzsgXHJcbiAgICBjb25zdCBQcm9qZWN0dGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7IFxyXG4gICAgUHJvamVjdHRpdGxlLmlubmVySFRNTCA9IHRpdGxlOyBcclxuICAgIFByb2plY3R0aXRsZS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ1NlY0FkZFRhc2tfUHJvamVjdFRpdGxlJylcclxuICAgIFByb2plY3RDYXQuYXBwZW5kQ2hpbGQoUHJvamVjdHRpdGxlKTsgXHJcblxyXG4gICAgLy9UaGUgZm9sbG93aW5nIGNvbW1lbnRlZC1vdXQgY29kZSBpcyBhbiBleGFtcGxlIG9mIHdoYXQgbm90IHRvIGRvLiBcclxuICAgIC8vSSB0aGluayBpdCdzIGEgYmFkIGlkZWEgdG8gYWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSBidXR0b24gaW4gdGhpcyBmdW5jdGlvbi5cclxuICAgIC8vRXZlcnl0aW1lIHRoZSBmdW5jdGlvbiBnZXRzIGNhbGxlZCwgdGhlIGV2ZW50IGxpc3RlbmVyIGdldHMgYWRkZWQgZGVzcGl0ZSB0aGVyZSBiZWluZyBhbm90aGVyIGV2ZW50IGxpc3RlbmVyIGF0dGFjaGVkIGFscmVhZHkuXHJcbiAgICAvL1NvLCBtdWx0aXBsZSBldmVudCBsaXN0ZW5lcnMgZ2V0IGF0dGFjaGVkLiBcclxuICAgIC8qXHJcbiAgICBjb25zdCBBZGRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkVGFza0J1dHRvbi1TRUMnKTtcclxuICAgIEFkZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHsgaGFuZGxlU2Vjb25kYXJ5QWRkVGFzayhQcm9qZWN0SUQpIH0pXHJcblxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0NhbmNlbEFkZFRhc2tCdXR0b24tU0VDJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY2xvc2VTZWNBZGRUYXNrUGFuZWwoKTtcclxuICAgIH0pKi9cclxuXHJcblxyXG4gICAgc2V0UHJvamVjdElEKFByb2plY3RJRCk7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgY29uc3QgaGFuZGxlU2Vjb25kYXJ5QWRkVGFzayA9IGFzeW5jIChQcm9qZWN0SUQpID0+IHtcclxuICAgIFNlY29uZGFyeVRhc2tJbmZvLnRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZF90YXNrTmFtZS1TRUMnKS52YWx1ZTtcclxuICAgIHZhciBjbG9zZVdpbmRvdyA9IHRydWU7XHJcbiAgICBpZiAoU2Vjb25kYXJ5VGFza0luZm8udGl0bGUgIT0gJycpIHtcclxuICAgICAgICBTZWNvbmRhcnlUYXNrSW5mby5kZWFkbGluZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrX2RlYWRsaW5lSW5wdXQtU0VDJykudmFsdWU7XHJcbiAgICAgICAgY29uc3QgZGVhZGxpbmVfZGF0ZSA9IG5ldyBEYXRlKFNlY29uZGFyeVRhc2tJbmZvLmRlYWRsaW5lKTtcclxuICAgICAgICBjb25zdCBVVENUaW1lID0gbmV3IERhdGUoZGVhZGxpbmVfZGF0ZS5nZXRVVENGdWxsWWVhcigpLCBkZWFkbGluZV9kYXRlLmdldFVUQ01vbnRoKCksIGRlYWRsaW5lX2RhdGUuZ2V0VVRDRGF0ZSgpLCBkZWFkbGluZV9kYXRlLmdldFVUQ0hvdXJzKCksIGRlYWRsaW5lX2RhdGUuZ2V0VVRDTWludXRlcygpLCBkZWFkbGluZV9kYXRlLmdldFVUQ1NlY29uZHMoKSk7IFxyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gbmV3IERhdGUoRGF0ZS5ub3coKSk7IFxyXG4gICAgICAgIGlmIChVVENUaW1lID49IGN1cnJlbnRUaW1lIHx8IFVUQ1RpbWUudG9Mb2NhbGVEYXRlU3RyaW5nKCkgPj0gY3VycmVudFRpbWUudG9Mb2NhbGVEYXRlU3RyaW5nKCkpIHtcclxuICAgICAgICAgICAgU2Vjb25kYXJ5VGFza0luZm8uZGVzY3JpcHRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkVGFza19kZXNjcmlwdGlvbi1TRUMnKS52YWx1ZTtcclxuICAgICAgICAgICAgU2Vjb25kYXJ5VGFza0luZm8uc3RhdHVzID0gc3RhdHVzT3B0aW9uc1tkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkVGFza19zdGF0dXMtU0VDJykudmFsdWVdO1xyXG4gICAgICAgICAgICBTZWNvbmRhcnlUYXNrSW5mby5wcm9qZWN0SUQgPSBQcm9qZWN0SUQ7XHJcbiAgICAgICAgICAgIFNlY29uZGFyeVRhc2tJbmZvLnVyZ2VuY3kgPSB1cmdlbmN5W2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGRUYXNrX3VyZ2VuY3ktU0VDJykudmFsdWVdO1xyXG4gICAgICAgICAgICBjb25zdCBjb2RlSUQgPSBnZW5lcmF0ZUNvZGUoMjApO1xyXG4gICAgICAgICAgICBjb25zdCBkb2NEYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFNlY29uZGFyeVRhc2tJbmZvLnRpdGxlLFxyXG4gICAgICAgICAgICAgICAgUHJvamVjdElEOiBTZWNvbmRhcnlUYXNrSW5mby5wcm9qZWN0SUQsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogU2Vjb25kYXJ5VGFza0luZm8uZGVzY3JpcHRpb24sXHJcbiAgICAgICAgICAgICAgICBzdGF0dXM6IFNlY29uZGFyeVRhc2tJbmZvLnN0YXR1cyxcclxuICAgICAgICAgICAgICAgIHVyZ2VuY3k6IFNlY29uZGFyeVRhc2tJbmZvLnVyZ2VuY3ksXHJcbiAgICAgICAgICAgICAgICBkZWFkbGluZTogVGltZXN0YW1wLmZyb21EYXRlKFVUQ1RpbWUpLFxyXG4gICAgICAgICAgICAgICAgZGF0ZUNyZWF0ZWQ6IFRpbWVzdGFtcC5mcm9tRGF0ZShjdXJyZW50VGltZSksXHJcbiAgICAgICAgICAgICAgICBpc0ZpbmlzaGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhd2FpdCBzZXREb2MoZG9jKGRiLCAndGFzaycsIGF1dGguY3VycmVudFVzZXIudWlkLCAnVGFza0xpc3QnLCBjb2RlSUQpLCBkb2NEYXRhKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oc25hcCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkVGFza1RvUHJvamVjdERpc3BsYXkoU2Vjb25kYXJ5VGFza0luZm8ucHJvamVjdElELCBjb2RlSUQsIFNlY29uZGFyeVRhc2tJbmZvLnRpdGxlLCBTZWNvbmRhcnlUYXNrSW5mby5kZXNjcmlwdGlvbiwgU2Vjb25kYXJ5VGFza0luZm8udXJnZW5jeSwgU2Vjb25kYXJ5VGFza0luZm8uc3RhdHVzLCBUaW1lc3RhbXAuZnJvbURhdGUoVVRDVGltZSksIFRpbWVzdGFtcC5mcm9tRGF0ZShjdXJyZW50VGltZSksIGZhbHNlICk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VXaW5kb3cgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChlcnJvci5jb2RlICsgXCI6IFwiICsgZXJyb3IubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjbG9zZVdpbmRvdyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydChcIlRoZSBkYXRlIHlvdSd2ZSBjaG9zZW4gY2Fubm90IGJlIGVhcmxpZXIgdGhhbiB0b2RheSdzIGRhdGUuIFwiKVxyXG4gICAgICAgICAgICBjbG9zZVdpbmRvdyA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBhbGVydCgnUGxlYXNlLCB0eXBlIHRoZSBuYW1lIG9mIHlvdXIgdGFzay4nKVxyXG4gICAgICAgIGNsb3NlV2luZG93ID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNsb3NlV2luZG93KSB7XHJcbiAgICAgICAgY2xvc2VTZWNBZGRUYXNrUGFuZWwoKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IGRpc3BsYXlQcm9qZWN0cywgZGlzcGxheVRvZGF5LCBkaXNwbGF5V2VlaywgZGlzcGxheU1vbnRoIH0gZnJvbSAnLi9kaXNwbGF5L3RvZ2dsZURpc3BsYXkuanMnOyBcclxuXHJcbmV4cG9ydCBjb25zdCByZW5kZXJBZG1pblBhbmVsID0gKCkgPT4ge1xyXG4gICAgY29uc3QgZWxlbWVudCA9IFwiPGRpdiBpZCA9ICdhZG1pblBhbmVsQ29udGFpbmVyJz48dWwgaWQgPSAnYWRtaW5QYW5lbCc+XCIgK1xyXG4gICAgICAgIFwiPGxpIGlkID0gJ2FkbWluLXRpdGxlJz5WaWV3PC9saT5cIiArXHJcbiAgICAgICAgXCI8bGk+PGJ1dHRvbiBjbGFzcyA9ICdhZG1pbi1vcHRpb25zJyBpZCA9ICdhZG1pblByb2plY3RCdXR0b24nPlByb2plY3RzPC9idXR0b24+PC9saT5cIiArXHJcbiAgICAgICAgXCI8bGk+PGJ1dHRvbiBjbGFzcyA9ICdhZG1pbi1vcHRpb25zJyBpZCA9ICdhZG1pblRvZGF5QnV0dG9uJz5Ub2RheTwvYnV0dG9uPjwvbGk+XCIgK1xyXG4gICAgICAgIFwiPGxpPjxidXR0b24gY2xhc3MgPSAnYWRtaW4tb3B0aW9ucycgaWQgPSAnYWRtaW5XZWVrQnV0dG9uJz5XZWVrPC9idXR0b24+PC9saT5cIiArXHJcbiAgICAgICAgXCI8bGk+PGJ1dHRvbiBjbGFzcyA9ICdhZG1pbi1vcHRpb25zJyBpZCA9ICdhZG1pbk1vbnRoQnV0dG9uJz5Nb250aDwvYnV0dG9uPjwvbGk+XCIgK1xyXG4gICAgICAgIFwiPGxpIGlkID0gJ2FkbWluLXRpdGxlJz5BY3Rpb25zPC9saT5cIiArXHJcbiAgICAgICAgXCI8bGk+PGJ1dHRvbiBjbGFzcyA9ICdhZG1pbi1vcHRpb25zJyBpZCA9ICdBZG1pbl9hZGRQcm9qZWN0QnV0dG9uJz5BZGQgUHJvamVjdDwvYnV0dG9uPjwvbGk+XCIgK1xyXG4gICAgICAgIFwiPGxpPjxidXR0b24gY2xhc3MgPSAnYWRtaW4tb3B0aW9ucycgaWQgPSAnQWRtaW5fYWRkVGFza0J1dHRvbic+QWRkIHRhc2s8L2J1dHRvbj48L2xpPlwiICtcclxuICAgICAgICBcIjxsaT48YnV0dG9uIGNsYXNzID0gJ2FkbWluLW9wdGlvbnMnIGlkID0gJ3NpZ25PdXRCdXR0b24nPlNpZ24gT3V0PC9idXR0b24+PC9saT5cIiArXHJcbiAgICAgICAgXCI8L3VsPjwvZGl2PlwiOyBcclxuXHJcbiAgICByZXR1cm4gZWxlbWVudDtcclxufVxyXG5cclxuXHJcbiIsImltcG9ydCB7IHJldHJpZXZlUHJvamVjdE5hbWVzTGlzdCwgZ2V0VGFza0xpc3RCeVByb2plY3RJRCwgZGVsUHJvamVjdCwgdG9nZ2xlQ2hlY2tCb3ggIH0gZnJvbSAnLi4vLi4vZ2V0UHJvamVjdExpc3QuanMnOyBcclxuaW1wb3J0IHsgZ2V0QXV0aCB9IGZyb20gJ2ZpcmViYXNlL2F1dGgnXHJcbmltcG9ydCB7IGRvYywgZGVsZXRlRG9jLCBzZXREb2MsIGNvbGxlY3Rpb24sIHF1ZXJ5LCB3aGVyZSwgVGltZXN0YW1wLCBnZXREb2MsIGdldERvY3MsIG9yZGVyQnl9IGZyb20gJ2ZpcmViYXNlL2ZpcmVzdG9yZSc7XHJcbmltcG9ydCB7IGRiIH0gZnJvbSAnLi4vLi4vaW5pdGlhbGl6ZUZpcmViYXNlLmpzJztcclxuaW1wb3J0IHRyYXNoSWNvbiBmcm9tICcuLi8uLi9hc3NldC90cmFzaC5wbmcnOyBcclxuaW1wb3J0IGFkZEljb24gZnJvbSAnLi4vLi4vYXNzZXQvYWRkLnBuZyc7XHJcbmltcG9ydCB7IG9wZW5BZGRUYXNrUGFuZWx3aXRoUHJvamVjdElELCBvcGVuQWRkVGFza1BhbmVsLCBvcGVuU2VjQWRkVGFza1BhbmVsICB9IGZyb20gJy4uL2FkZFRhc2suanMnOyBcclxuaW1wb3J0IHsgb3BlbkRpc3BsYXlUYXNrLCBjbG9zZURpc3BsYXlUYXNrIH0gZnJvbSAnLi9kaXNwbGF5VGFzay9kaXNwbGF5VGFza0xvZ2ljLmpzJzsgXHJcbmltcG9ydCB7IHJlbmRlclRhc2tQYW5lbCwgZmlsbFRhc2tJbmZvLCBjbG9zZV9EaXNwbGF5VGFzayB9IGZyb20gJy4vZGlzcGxheVRhc2svcmVuZGVyVGFza1BhbmVsLmpzJztcclxuXHJcbmNvbnN0IGxpc3QgPSBbXTsgXHJcblxyXG5jb25zdCBhdXRoID0gZ2V0QXV0aCgpO1xyXG5cclxuZXhwb3J0IGNvbnN0IGZpbGxQcm9qZWN0TGlzdCA9IGFzeW5jICgpID0+IHtcclxuICAgIGNvbnN0IHEgPSBxdWVyeShjb2xsZWN0aW9uKGRiLCAncHJvamVjdCcsIGF1dGguY3VycmVudFVzZXIudWlkLCAnUHJvamVjdExpc3QnKSwgb3JkZXJCeSgndGl0bGUnLCAnYXNjJykpO1xyXG4gICAgY29uc3Qgc25hcHNob3QgPSBhd2FpdCBnZXREb2NzKHEpLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgZGF0YS5mb3JFYWNoKGFzeW5jIHNuYXAgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBvYmogPSAoe1xyXG4gICAgICAgICAgICAgICAgaWQ6IHNuYXAuaWQsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogc25hcC5kYXRhKCkuIHRpdGxlXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGxpc3QucHVzaChvYmopXHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCByZW5kZXJQcm9qZWN0cyA9IGFzeW5jICgpID0+IHtcclxuICAgIGNvbnN0IGRpc3BsYXlDb250ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rpc3BsYXlQcm9qZWN0c0NvbnRlbnQnKTsgXHJcbiAgICBhd2FpdCBmaWxsUHJvamVjdExpc3QoKTtcclxuICAgIGNvbnN0IGRpc3BsYXlUYXNrUGFuZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlzcGxheVRhc2tQYW5lbCcpOyBcclxuXHJcbiAgLy8gIGNvbnN0IGxpc3QgPSBhd2FpdCByZXRyaWV2ZVByb2plY3ROYW1lc0xpc3QoKTsgXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgIC8vY3JlYXRlIGNvbnRhaW5lclxyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICAgICAgY29udGFpbmVyLnNldEF0dHJpYnV0ZSgnaWQnLCAncHJvamVjdEl0ZW1Db250YWluZXInKVxyXG4gICAgICAgIGNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ2dyaWQnOyBcclxuICAgICAgICBkaXNwbGF5Q29udC5hcHBlbmRDaGlsZChjb250YWluZXIpOyBcclxuXHJcbiAgICAgICAgLy9jcmVhdGUgdGhlIGxpc3QgaXRlbVxyXG4gICAgICAgIGNvbnN0IFByb2plY3RCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgICBQcm9qZWN0QnV0dG9uLnNldEF0dHJpYnV0ZSgnaWQnLCAncHJvamVjdFRpdGxlQnV0dG9uJyk7XHJcbiBcclxuICAgICAgICBQcm9qZWN0QnV0dG9uLmlubmVySFRNTCA9IGxpc3RbaV0udGl0bGU7XHJcbiAgICAgICAgY29uc3QgUHJvamVjdF9pZCA9IGxpc3RbaV0uaWQ7IFxyXG4gICAgICAgIGNvbnN0IFByb2plY3RfdGl0bGUgPSBsaXN0W2ldLnRpdGxlOyBcclxuICAgICAgICAvL2NyZWF0ZSBkaXYgZm9yIHRyYXNoIGJ1dHRvbiB0byBhcHBlYXIgXHJcbiAgICAgICAgY29uc3QgdHJhc2hDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICB0cmFzaENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3RyYXNoQ29udGFpbmVyJyk7IFxyXG5cclxuICAgICAgICAvL3JlbmRlcnMgdGhlIGRlbGV0ZSBidXR0b24gZm9yIGVhY2ggcHJvamVjdCBcclxuICAgICAgICBjb25zdCBkZWxCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTsgXHJcbiAgICAgICAgZGVsQnV0dG9uLnNldEF0dHJpYnV0ZSgnaWQnLCAndHJhc2hJY29uJylcclxuICAgICAgICBkZWxCdXR0b24uc3JjID0gdHJhc2hJY29uOyBcclxuICAgICAgICB0cmFzaENvbnRhaW5lci5hcHBlbmRDaGlsZChkZWxCdXR0b24pXHJcbiAgICAgICAgZGVsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBoYW5kbGVEZWxQcm9qZWN0KFByb2plY3RfdGl0bGUsIFByb2plY3RfaWQpXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vY3JlYXRlIGEgbW91c2VvdmVyIGV2ZW50IGZvciB0aGUgY29udGFpbmVyIGZvciB0aGUgdHJhc2ggaWNvbiB0byBhcHBlYXIgXHJcbiAgICAgICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZGVsQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBkZWxCdXR0b24uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoUHJvamVjdEJ1dHRvbik7XHJcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRyYXNoQ29udGFpbmVyKTtcclxuXHJcbiAgICAgICAgLy9vYnRhaW4gdGFza3Mgb2YgZWFjaCBwcm9qZWN0IFxyXG4gICAgICAgIGNvbnN0IHRhc2tzID0gYXdhaXQgZ2V0VGFza0xpc3RCeVByb2plY3RJRChsaXN0W2ldLmlkKVxyXG4gICAgICAgIGNvbnN0IHBhbmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7IFxyXG4gICAgICAgIHBhbmVsLnNldEF0dHJpYnV0ZSgnaWQnLCAnQWxsUHJvamVjdFRhc2tzJyk7IFxyXG4gICAgICAgIGNvbnN0IGxpc3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcclxuICAgICAgICBsaXN0RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2lkJywgUHJvamVjdF9pZClcclxuICAgICAgICBpZiAodGFza3MubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgICAgIHRhc2tzLmZvckVhY2godmFsID0+IHsgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgY29uc3QgbGlzdEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vQWRkIGNoZWNrYm94IGZvciBlYWNoIHRhc2sgaW4gdGhlIGRpc3BsYXkgbGlzdFxyXG4gICAgICAgICAgICAgICAgY29uc3QgY2hlY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdJTlBVVCcpOyBcclxuICAgICAgICAgICAgICAgIGNoZWNrLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJjaGVja2JveFwiKVxyXG4gICAgICAgICAgICAgICAgY2hlY2suc2V0QXR0cmlidXRlKCdjbGFzcycsICd0YXNrX2NoZWNrYm94Jyk7IFxyXG4gICAgICAgICAgICAgICAgY2hlY2suY2hlY2tlZCA9IHZhbC5pc0ZpbmlzaGVkOyBcclxuICAgICAgICAgICAgICAgIGNoZWNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL3Bhc3MgIHRoZSBpZCBhbmQgYm9vbGVhbiB2YWx1ZSBvZiB0aGUgY2hlY2sgYm94IHRvIHRvZ2dsZUNoZWNrQm94IHNvIHRoYXQgdGhlIHZhbHVlIGluIGZpcmViYXNlIHJlZmxlY3RzIHRydWUgdmFsdWUgXHJcbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlQ2hlY2tCb3godmFsLmlkLCB0aGlzLmNoZWNrZWQpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICBsaXN0SXRlbS5hcHBlbmRDaGlsZChjaGVjayk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsaXN0VGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICAgICAgICAgIGxpc3RUZXh0LnNldEF0dHJpYnV0ZSgnaWQnLCAnZGlzcGxheVRhc2tMaW5rJyk7IFxyXG4gICAgICAgICAgICAgICAgY29uc3QgVGFza0lEID0gdmFsLmlkOyBcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRhc2tUaXRsZSA9IHZhbC50aXRsZTsgXHJcbiAgICAgICAgICAgICAgICBjb25zdCB0YXNrRGVzY3JpcHRpb24gPSB2YWwuZGVzY3JpcHRpb247IFxyXG4gICAgICAgICAgICAgICAgY29uc3QgdGFza1VyZ2VuY3kgPSB2YWwudXJnZW5jeTsgXHJcbiAgICAgICAgICAgICAgICBjb25zdCB0YXNrRGVhZGxpbmUgPSB2YWwuZGVhZGxpbmU7IFxyXG4gICAgICAgICAgICAgICAgY29uc3QgdGFza1N0YXR1cyA9IHZhbC5zdGF0dXM7IFxyXG4gICAgICAgICAgICAgICAgY29uc3QgdGFza0RhdGVDcmVhdGVkID0gdmFsLmRhdGVDcmVhdGVkOyBcclxuXHJcbiAgICAgICAgICAgICAgICBsaXN0VGV4dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBmaWxsVGFza0luZm8odGFza1RpdGxlLCB0YXNrRGVzY3JpcHRpb24sIHRhc2tVcmdlbmN5LCB0YXNrRGVhZGxpbmUsIHRhc2tTdGF0dXMsIHRhc2tEYXRlQ3JlYXRlZCwgUHJvamVjdF9pZCwgVGFza0lELCBjaGVjay5jaGVja2VkKVxyXG4gICAgICAgICAgICAgICAgICAgIHJlbmRlclRhc2tQYW5lbChQcm9qZWN0X3RpdGxlLCBUYXNrSUQpOyBcclxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5VGFza1BhbmVsLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJ1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBsaXN0VGV4dC5pbm5lckhUTUwgPSB2YWwudGl0bGU7IFxyXG4gICAgICAgICAgICAgICAgbGlzdEl0ZW0uYXBwZW5kQ2hpbGQobGlzdFRleHQpO1xyXG4gICAgICAgICAgICAgICAgbGlzdEl0ZW0uc2V0QXR0cmlidXRlKCdjbGFzcycsICd0YXNrTGlzdEl0ZW0nKTsgXHJcbiAgICAgICAgICAgICAgICBsaXN0SXRlbS5zZXRBdHRyaWJ1dGUoJ2lkJywgVGFza0lEKVxyXG4gICAgICAgICAgICAgICAgbGlzdEVsZW1lbnQuYXBwZW5kQ2hpbGQobGlzdEl0ZW0pXHJcblxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9hZGRzIGFuIG9wdGlvbiBmb3IgdXNlcnMgdG8gYWRkIFRhc2sgdW5kZXIgZWFjaCBQcm9qZWN0XHJcbiAgICAgICAgY29uc3QgYWRkVGFza0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG4gICAgICAgIGNvbnN0IHBsdXNJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSU1HJyk7IFxyXG4gICAgICAgIHBsdXNJY29uLnNyYyA9IGFkZEljb247IFxyXG4gICAgICAgIHBsdXNJY29uLnNldEF0dHJpYnV0ZSgnaWQnLCAnYWRkX2ljb24nKVxyXG4gXHJcbiAgICAgICAgcGx1c0ljb24uc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xyXG4gICAgICAgIGFkZFRhc2tFbGVtZW50LmFwcGVuZENoaWxkKHBsdXNJY29uKTsgXHJcbiAgICAgICAgY29uc3QgYWRkVGFza1Byb21wdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICBhZGRUYXNrUHJvbXB0LmlubmVySFRNTCA9ICdBZGQgVGFzayc7IFxyXG4gICAgICAgIGFkZFRhc2tQcm9tcHQuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xyXG4gICAgICAgIGFkZFRhc2tFbGVtZW50LmFwcGVuZENoaWxkKGFkZFRhc2tQcm9tcHQpOyBcclxuICAgICAgICBhZGRUYXNrRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2FkZFRhc2tMaXN0SXRlbScpXHJcbiAgICAgICAgYWRkVGFza0VsZW1lbnQuc2V0QXR0cmlidXRlKCdpZCcsICdhZGRUYXNrTGlzdEl0ZW0nKVxyXG5cclxuICAgICAgICAvL2FkZCBmdW5jdGlvbiBmb3IgQWRkIFRhc2sgXHJcbiAgICAgICAgYWRkVGFza0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7IG9wZW5TZWNBZGRUYXNrUGFuZWwoUHJvamVjdF90aXRsZSwgUHJvamVjdF9pZCkgIH0pXHJcblxyXG4gICAgICAgIGxpc3RFbGVtZW50LmFwcGVuZENoaWxkKGFkZFRhc2tFbGVtZW50KTtcclxuICAgICAgICBwYW5lbC5hcHBlbmRDaGlsZChsaXN0RWxlbWVudCkgXHJcblxyXG4gICAgICAgIFByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChwYW5lbC5zdHlsZS5tYXhIZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgIHBhbmVsLnN0eWxlLm1heEhlaWdodCA9IG51bGw7IFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcGFuZWwuc3R5bGUubWF4SGVpZ2h0ID0gcGFuZWwuc2Nyb2xsSGVpZ2h0ICsgJ3B4JzsgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAvLyBQcm9qZWN0QnV0dG9uLmFwcGVuZENoaWxkKHBhbmVsKTtcclxuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocGFuZWwpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vL1RoaXMgYWRkcyBwcm9qZWN0IHRvIHRoZSBQcm9qZWN0cyBWaWV3IHdoZW4gdGhlIHVzZXIgdXNlcyB0aGUgQWRkIFByb2plY3QgcGFuZWwgdG8gY3JlYXRlIGEgbmV3IHByb2plY3RcclxuZXhwb3J0IGNvbnN0IGFkZFByb2plY3RUb1Byb2plY3REaXNwbGF5ID0gKHRpdGxlLCBJRCkgPT4ge1xyXG4gICAgY29uc3QgZGlzcGxheUNvbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlzcGxheVByb2plY3RzQ29udGVudCcpOyBcclxuICAgIC8vY3JlYXRlIGNvbnRhaW5lclxyXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgIGNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3Byb2plY3RJdGVtQ29udGFpbmVyJylcclxuICAgIGNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ2dyaWQnO1xyXG4gICAgZGlzcGxheUNvbnQuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcclxuXHJcbiAgICAvL2NyZWF0ZSB0aGUgbGlzdCBpdGVtXHJcbiAgICBjb25zdCBQcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICBQcm9qZWN0QnV0dG9uLnNldEF0dHJpYnV0ZSgnaWQnLCAncHJvamVjdFRpdGxlQnV0dG9uJyk7XHJcbiAgICBQcm9qZWN0QnV0dG9uLmlubmVySFRNTCA9IHRpdGxlOyBcclxuXHJcbiAgICBjb25zdCB0cmFzaENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdHJhc2hDb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsICd0cmFzaENvbnRhaW5lcicpO1xyXG5cclxuICAgIGNvbnN0IGRlbEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gICAgZGVsQnV0dG9uLnNldEF0dHJpYnV0ZSgnaWQnLCAndHJhc2hJY29uJylcclxuICAgIGRlbEJ1dHRvbi5zcmMgPSB0cmFzaEljb247XHJcbiAgICB0cmFzaENvbnRhaW5lci5hcHBlbmRDaGlsZChkZWxCdXR0b24pXHJcbiAgICBkZWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaGFuZGxlRGVsUHJvamVjdCh0aXRsZSwgSUQpXHJcbiAgICB9KTtcclxuICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZGVsQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgfSlcclxuICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBkZWxCdXR0b24uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgIH0pXHJcblxyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKFByb2plY3RCdXR0b24pO1xyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRyYXNoQ29udGFpbmVyKTtcclxuXHJcbiAgICAvL3N0YXJ0XHJcbiAgICBjb25zdCBwYW5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpOyBcclxuICAgIHBhbmVsLnNldEF0dHJpYnV0ZSgnaWQnLCAnQWxsUHJvamVjdFRhc2tzJylcclxuICAgIGNvbnN0IGxpc3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcclxuICAgIGxpc3RFbGVtZW50LnNldEF0dHJpYnV0ZSgnaWQnLCBJRCk7IFxyXG4gICAgY29uc3QgYWRkVGFza0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG4gICAgY29uc3QgcGx1c0ljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdJTUcnKTtcclxuICAgIHBsdXNJY29uLnNyYyA9IGFkZEljb247XHJcbiAgICBwbHVzSWNvbi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2FkZF9pY29uJylcclxuXHJcbiAgICBwbHVzSWNvbi5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XHJcbiAgICBhZGRUYXNrRWxlbWVudC5hcHBlbmRDaGlsZChwbHVzSWNvbik7XHJcbiAgICBjb25zdCBhZGRUYXNrUHJvbXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgYWRkVGFza1Byb21wdC5pbm5lckhUTUwgPSAnQWRkIFRhc2snO1xyXG4gICAgYWRkVGFza1Byb21wdC5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XHJcbiAgICBhZGRUYXNrRWxlbWVudC5hcHBlbmRDaGlsZChhZGRUYXNrUHJvbXB0KTtcclxuICAgIGFkZFRhc2tFbGVtZW50LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnYWRkVGFza0xpc3RJdGVtICcpXHJcbiAgICBhZGRUYXNrRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2FkZFRhc2tMaXN0SXRlbScpXHJcblxyXG4gICAgLy9hZGQgZnVuY3Rpb24gZm9yIEFkZCBUYXNrIFxyXG4gICAgYWRkVGFza0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7IG9wZW5TZWNBZGRUYXNrUGFuZWwodGl0bGUsIElEKSB9KVxyXG5cclxuICAgIGxpc3RFbGVtZW50LmFwcGVuZENoaWxkKGFkZFRhc2tFbGVtZW50KTtcclxuICAgIHBhbmVsLmFwcGVuZENoaWxkKGxpc3RFbGVtZW50KVxyXG5cclxuXHJcbiAgICBQcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmIChwYW5lbC5zdHlsZS5tYXhIZWlnaHQpIHtcclxuICAgICAgICAgICAgcGFuZWwuc3R5bGUubWF4SGVpZ2h0ID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHBhbmVsLnN0eWxlLm1heEhlaWdodCA9IHBhbmVsLnNjcm9sbEhlaWdodCArICdweCc7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICAvLyBQcm9qZWN0QnV0dG9uLmFwcGVuZENoaWxkKHBhbmVsKTtcclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChwYW5lbCk7XHJcbn1cclxuXHJcbi8vZnVuY3Rpb24gdGhhdCBhbGxvd3Mgb3RoZXIgZWxlbWVudHMgdG8gYWRkIHRhc2tzIHRvIHRoZSBQcm9qZWN0IERpc3BsYXkgXHJcbmV4cG9ydCBjb25zdCBhZGRUYXNrVG9Qcm9qZWN0RGlzcGxheSA9IGFzeW5jIChQcm9qZWN0SUQsIFRhc2tJRCwgdGl0bGUsIGRlc2NyaXB0aW9uLCB1cmdlbmN5LCBzdGF0dXMsIGRlYWRsaW5lLCBkYXRlX2NyZWF0ZWQsIGlzQ29tcGxldGUpID0+IHtcclxuICAgIHZhciBQcm9qZWN0VGl0bGUgPSAnJzsgXHJcbiAgICBjb25zdCBxID0gcXVlcnkoZG9jKGRiLCAncHJvamVjdCcsIGF1dGguY3VycmVudFVzZXIudWlkLCAnUHJvamVjdExpc3QnLCBQcm9qZWN0SUQpKVxyXG4gICAgY29uc3Qgc25hcHNob3QgPSBhd2FpdCBnZXREb2MocSkudGhlbihpdGVtID0+IHtcclxuICAgICAgICBQcm9qZWN0VGl0bGUgPSBpdGVtLmRhdGEoKS50aXRsZTtcclxuICAgIH0pXHJcblxyXG4gICAgY29uc3QgbGlzdEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChQcm9qZWN0SUQpOyBcclxuICAgIGNvbnN0IGxpc3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuICAgIGNvbnN0IGRpc3BsYXlUYXNrUGFuZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlzcGxheVRhc2tQYW5lbCcpOyBcclxuICAgIGNvbnN0IGNoZWNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSU5QVVQnKTtcclxuICAgIGNoZWNrLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJjaGVja2JveFwiKVxyXG4gICAgY2hlY2suc2V0QXR0cmlidXRlKCdjbGFzcycsICd0YXNrX2NoZWNrYm94Jyk7XHJcbiAgICBsaXN0SXRlbS5hcHBlbmRDaGlsZChjaGVjayk7XHJcbiAgICBjb25zdCBsaXN0VGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxyXG4gICAgbGlzdFRleHQuc2V0QXR0cmlidXRlKCdpZCcsICdkaXNwbGF5VGFza0xpbmsnKTtcclxuICAgIGxpc3RUZXh0LmlubmVySFRNTCA9IHRpdGxlO1xyXG5cclxuICAgIGxpc3RUZXh0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIGZpbGxUYXNrSW5mbyh0aXRsZSwgZGVzY3JpcHRpb24sIHVyZ2VuY3ksIGRlYWRsaW5lLCBzdGF0dXMsIGRhdGVfY3JlYXRlZCwgUHJvamVjdElELCBUYXNrSUQsIGZhbHNlKVxyXG4gICAgICAgIHJlbmRlclRhc2tQYW5lbChQcm9qZWN0VGl0bGUsIFRhc2tJRCk7XHJcbiAgICAgICAgZGlzcGxheVRhc2tQYW5lbC5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jaydcclxuICAgIH0pO1xyXG4gICAgbGlzdEl0ZW0uYXBwZW5kQ2hpbGQobGlzdFRleHQpO1xyXG4gICAgbGlzdEl0ZW0uc2V0QXR0cmlidXRlKCdpZCcsIFRhc2tJRClcclxuICAgIGxpc3RJdGVtLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAndGFza0xpc3RJdGVtJyk7XHJcbiAgICBsaXN0RWxlbWVudC5pbnNlcnRCZWZvcmUobGlzdEl0ZW0sIGxpc3RFbGVtZW50Lmxhc3RDaGlsZClcclxuICAgIGNvbnN0IHBhbmVsID0gbGlzdEl0ZW0ucGFyZW50Tm9kZS5wYXJlbnROb2RlO1xyXG4gICAgcGFuZWwuc3R5bGUubWF4SGVpZ2h0ID0gcGFuZWwuc2Nyb2xsSGVpZ2h0ICsgJ3B4J1xyXG5cclxufVxyXG5cclxuY29uc3QgaGFuZGxlRGVsUHJvamVjdCA9IGFzeW5jICh0aXRsZSwgSUQpID0+IHsgXHJcbiAgICBpZiAoY29uZmlybSgnWW91IGFyZSBhYm91dCB0byBkZWxldGUgdGhlIHByb2plY3QgJyArIHRpdGxlICsgJy4gXFxuIEFyZSB5b3Ugc3VyZT8nKSkge1xyXG4gICAgICAgIGRlbFByb2plY3QoSUQpXHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbi8vVGhpcyBpcyB0aGUgY29kZSBmb3IgZGVsZXRpbmcgYSB0YXNrIGZvciB0aGUgZGVsZXRlIGJ1dHRvbiBvbiAgdGhlIERpc3BsYXkgVGFzayBwYW5lbFxyXG4vL0kgaGF2ZSB0byB3cml0ZSB0aGUgY29kZSBoZXJlIGFuZCBub3Qgb24gcmVuZGVyVGFza1BhbmVsLmpzIGJlY2F1c2UgdGhhdCBmaWxlIGlzIGV4ZWN1dGVkIGJlZm9yZSBhdXRoZW50aWNhdGlvbiBcclxuZXhwb3J0IGNvbnN0IGRlbGV0ZVRhc2sgPSBhc3luYyAoVGFza0lEKSA9PiB7XHJcbiAgICBjb25zdCBkaXNwbGF5VGFza1BhbmVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rpc3BsYXlUYXNrUGFuZWwnKTsgXHJcbiAgICBhd2FpdCBkZWxldGVEb2MoZG9jKGRiLCAndGFzaycsIGF1dGguY3VycmVudFVzZXIudWlkLCAnVGFza0xpc3QnLCBUYXNrSUQpKVxyXG4gICAgICAgIC50aGVuKFxyXG5cclxuICAgICAgICAgICAgYWxlcnQoJ1Rhc2sgd2FzIHN1Y2Nlc3NmdWxseSBkZWxldGVkLicpXHJcbiAgICAgICAgKVxyXG4gICAgICAgIC5jYXRjaChlID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZS5jb2RlICsgJzogJyArIGUubWVzc2FnZSlcclxuICAgICAgICB9KVxyXG4gICAgY29uc3QgaXRlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3Rhc2tMaXN0SXRlbScpO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVtLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGl0ZW1baV0uZ2V0QXR0cmlidXRlKCdpZCcpID09PSBUYXNrSUQpIHtcclxuICAgICAgICAgICAgaXRlbVtpXS5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjbG9zZV9EaXNwbGF5VGFzaygpOyBcclxufVxyXG5cclxuLy9yZW1vdmVzIHRoZSBwcm9qZWN0IG5vZGUgYWZ0ZXIgYSBwcm9qZWN0IGdldHMgZGVsZXRlZCBcclxuZXhwb3J0IGNvbnN0IHJlbW92ZVByb2ogPSBhc3luYyAoUHJvamVjdElEKSA9PiB7XHJcbiAgICBjb25zdCBwcm9qQ29udGFpbmVyID0gYXdhaXQgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoUHJvamVjdElEKS5wYXJlbnROb2RlOyBcclxuICAgIHByb2pDb250YWluZXIucGFyZW50Tm9kZS5yZW1vdmUoKTtcclxufSIsImV4cG9ydCBjb25zdCB0b2dnbGVEZXNjcmlwdGlvbkVkaXQgPSAoKSA9PiB7XHJcbiAgICAvL3BhcmVudE5vZGVcclxuICAgIGNvbnN0IFN1YlpvbmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVzY3JpcHRpb25TdWJab25lJylcclxuXHJcbiAgICAvL2Rpc3BsYXkgZWxlbWVudFxyXG4gICAgY29uc3QgZGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaXNwbGF5VGFza19kZXNjcmlwdGlvbicpOyBcclxuXHJcbiAgICAvL3NlbGVjdCBlbGVtZW50XHJcbiAgICBjb25zdCB1c2VySW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlzcGxheVRhc2tfZGVzY3JpcHRpb25JbnB1dCcpOyBcclxuXHJcbiAgICBjb25zdCBlZGl0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rlc2NyaXB0aW9uRWRpdEJ1dHRvbicpXHJcbiAgICBjb25zdCBzdWJtaXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVzY3JpcHRpb25TdWJtaXQnKTsgXHJcbiAgICBjb25zdCBjYW5jZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVzY3JpcHRpb25DYW5jZWxCdXR0b24nKTsgXHJcbiAgICBpZiAoZWRpdC5zdHlsZS5kaXNwbGF5ICE9ICdub25lJykge1xyXG4gICAgICAgIGVkaXQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICBzdWJtaXQuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xyXG4gICAgICAgIGNhbmNlbC5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XHJcbiAgICAgICAgU3ViWm9uZS5zdHlsZS53aWR0aCA9ICc2MCUnXHJcbiAgICAgICAgdXNlcklucHV0LnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJztcclxuICAgICAgICBkaXNwbGF5LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgZWRpdC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICBzdWJtaXQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICBjYW5jZWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICBTdWJab25lLnN0eWxlLndpZHRoID0gJzMwJSdcclxuICAgICAgICB1c2VySW5wdXQuc3R5bGUuZGlzcGxheSA9ICdub25lJzsgXHJcbiAgICAgICAgZGlzcGxheS5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IHRvZ2dsZVN0YXR1c0VkaXQgPSAoKSA9PiB7XHJcbiAgICAvL3BhcmVudE5vZGVcclxuICAgIGNvbnN0IHN0YXR1c1N1YlpvbmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhdHVzU3ViWm9uZScpXHJcblxyXG4gICAgLy9kaXNwbGF5IGVsZW1lbnRcclxuICAgIGNvbnN0IGRpc3BsYXlUYXNrX3N0YXR1cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaXNwbGF5VGFza19zdGF0dXMnKTtcclxuXHJcbiAgICAvL3NlbGVjdCBlbGVtZW50XHJcbiAgICBjb25zdCBzZWxlY3RPcHRpb25zID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rpc3BsYXlUYXNrX3N0YXR1c0lucHV0Jyk7XHJcblxyXG4gICAgY29uc3QgZWRpdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGF0dXNFZGl0QnV0dG9uJylcclxuICAgIGNvbnN0IHN1Ym1pdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGF0dXNTdWJtaXQnKTtcclxuICAgIGNvbnN0IGNhbmNlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGF0dXNDYW5jZWxCdXR0b24nKTtcclxuICAgIGlmIChlZGl0LnN0eWxlLmRpc3BsYXkgIT0gJ25vbmUnKSB7XHJcbiAgICAgICAgZWRpdC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIHN1Ym1pdC5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XHJcbiAgICAgICAgY2FuY2VsLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJztcclxuICAgICAgICBzdGF0dXNTdWJab25lLnN0eWxlLndpZHRoID0gJzUwJSdcclxuICAgICAgICBzZWxlY3RPcHRpb25zLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJztcclxuICAgICAgICBkaXNwbGF5VGFza19zdGF0dXMuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBlZGl0LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIHN1Ym1pdC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIGNhbmNlbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIHN0YXR1c1N1YlpvbmUuc3R5bGUud2lkdGggPSAnMjUlJ1xyXG4gICAgICAgIHNlbGVjdE9wdGlvbnMuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICBkaXNwbGF5VGFza19zdGF0dXMuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xyXG5cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHRvZ2dsZURlYWRsaW5lRWRpdCA9ICgpID0+IHtcclxuICAgIC8vcGFyZW50Tm9kZVxyXG4gICAgY29uc3QgU3ViWm9uZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZWFkbGluZVN1YlpvbmUnKVxyXG5cclxuICAgIC8vZGlzcGxheSBlbGVtZW50XHJcbiAgICBjb25zdCBkaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rpc3BsYXlUYXNrX2RlYWRsaW5lJyk7XHJcblxyXG4gICAgLy9zZWxlY3QgZWxlbWVudFxyXG4gICAgY29uc3QgdXNlcklucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rpc3BsYXlUYXNrX2RlYWRsaW5lSW5wdXQnKTtcclxuXHJcbiAgICBjb25zdCBlZGl0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RlYWRsaW5lRWRpdEJ1dHRvbicpXHJcbiAgICBjb25zdCBzdWJtaXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVhZGxpbmVTdWJtaXQnKTtcclxuICAgIGNvbnN0IGNhbmNlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZWFkbGluZUNhbmNlbEJ1dHRvbicpO1xyXG4gICAgaWYgKGVkaXQuc3R5bGUuZGlzcGxheSAhPSAnbm9uZScpIHtcclxuICAgICAgICBlZGl0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgc3VibWl0LnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJztcclxuICAgICAgICBjYW5jZWwuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xyXG4gICAgIC8vICAgU3ViWm9uZS5zdHlsZS53aWR0aCA9ICc2MCUnXHJcbiAgICAgICAgdXNlcklucHV0LnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJztcclxuICAgICAgICBkaXNwbGF5LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgZWRpdC5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XHJcbiAgICAgICAgc3VibWl0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgY2FuY2VsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAvLyAgICAgICBTdWJab25lLnN0eWxlLndpZHRoID0gJzMwJSdcclxuICAgICAgICB1c2VySW5wdXQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICBkaXNwbGF5LnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJztcclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCB0b2dnbGVVcmdlbmN5RWRpdCA9ICgpID0+IHtcclxuICAgIC8vcGFyZW50Tm9kZVxyXG4gICAgY29uc3QgU3ViWm9uZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cmdlbmN5U3ViWm9uZScpXHJcblxyXG4gICAgLy9kaXNwbGF5IGVsZW1lbnRcclxuICAgIGNvbnN0IGRpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlzcGxheVRhc2tfdXJnZW5jeScpO1xyXG5cclxuICAgIC8vc2VsZWN0IGVsZW1lbnRcclxuICAgIGNvbnN0IHVzZXJJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaXNwbGF5VGFza191cmdlbmN5SW5wdXQnKTtcclxuXHJcbiAgICBjb25zdCBlZGl0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VyZ2VuY3lFZGl0QnV0dG9uJylcclxuICAgIGNvbnN0IHN1Ym1pdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cmdlbmN5U3VibWl0Jyk7XHJcbiAgICBjb25zdCBjYW5jZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXJnZW5jeUNhbmNlbEJ1dHRvbicpO1xyXG4gICAgaWYgKGVkaXQuc3R5bGUuZGlzcGxheSAhPSAnbm9uZScpIHtcclxuICAgICAgICBlZGl0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgc3VibWl0LnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJztcclxuICAgICAgICBjYW5jZWwuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xyXG4gICAgICAgIC8vICAgU3ViWm9uZS5zdHlsZS53aWR0aCA9ICc2MCUnXHJcbiAgICAgICAgdXNlcklucHV0LnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJztcclxuICAgICAgICBkaXNwbGF5LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgZWRpdC5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XHJcbiAgICAgICAgc3VibWl0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgY2FuY2VsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgLy8gICAgICAgU3ViWm9uZS5zdHlsZS53aWR0aCA9ICczMCUnXHJcbiAgICAgICAgdXNlcklucHV0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgZGlzcGxheS5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQgeyBkb2MsIGNvbGxlY3Rpb24sIGdldERvYywgZ2V0RG9jcywgcXVlcnkgfSBmcm9tICdmaXJlYmFzZS9maXJlc3RvcmUnO1xyXG5pbXBvcnQgeyBnZXRBdXRoIH0gZnJvbSAnZmlyZWJhc2UvYXV0aCc7XHJcbmltcG9ydCB7IGRiIH0gZnJvbSAnLi4vLi4vLi4vaW5pdGlhbGl6ZUZpcmViYXNlLmpzJztcclxuXHJcbmNvbnN0IGF1dGggPSBnZXRBdXRoKCk7XHJcblxyXG52YXIgaW5pdFRhc2tJbmZvID0ge1xyXG4gICAgdGl0bGU6ICcnLFxyXG4gICAgZGVhZGxpbmU6ICcnLFxyXG4gICAgc3RhdHVzOiAwLFxyXG4gICAgdXJnZW5jeTogMCxcclxuICAgIHByb2plY3RJRDogJycsXHJcbiAgICBkZXNjcmlwdGlvbjogJycsXHJcbiAgICBkYXRlQ3JlYXRlZDogJycsXHJcbiAgICBpc0ZpbmlzaGVkOiBmYWxzZSxcclxuICAgIGlkOiAnJyxcclxufVxyXG52YXIgdGFza0luZm8gPSB7XHJcbiAgICB0aXRsZTogJycsXHJcbiAgICBkZWFkbGluZTogJycsXHJcbiAgICBzdGF0dXM6IDAsXHJcbiAgICB1cmdlbmN5OiAwLFxyXG4gICAgcHJvamVjdElEOiAnJyxcclxuICAgIGRlc2NyaXB0aW9uOiAnJyxcclxuICAgIGRhdGVDcmVhdGVkOiAnJyxcclxuICAgIGlzRmluaXNoZWQ6IGZhbHNlLFxyXG4gICAgaWQ6ICcnLFxyXG59XHJcbmNvbnN0IGRpc3BsYXlUYXNrUGFuZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlzcGxheVRhc2tQYW5lbCcpOyBcclxuXHJcbmNvbnN0IHVyZ2VuY3lPcHRpb25zID0gWydMb3cgUHJpb3JpdHknLCAnTW9kZXN0IExldmVsIFByaW9yaXR5JywgJ0hpZ2ggUHJpb3JpdHknXTtcclxuY29uc3Qgc3RhdHVzT3B0aW9ucyA9IFsnT25nb2luZycsICdEb25lJywgJ1B1dCBvbiBob2xkJ107XHJcblxyXG52YXIgUHJvamVjdElEID0gJyc7IFxyXG52YXIgVGFza0lEID0gJyc7IFxyXG5cclxuZXhwb3J0IGNvbnN0IGdldElEID0gKFByb2pJRCwgVGFza19JRCkgPT4ge1xyXG4gICAgUHJvamVjdElEID0gUHJvaklEOyBcclxuICAgIFRhc2tJRCA9IFRhc2tfSUQ7IFxyXG59XHJcblxyXG52YXIgdGFza1RpdGxlID0gbnVsbDtcclxudmFyIHByb2pUaXRsZVNwYW4gPSBudWxsO1xyXG52YXIgZGVzY3JpcHRpb24gPSBudWxsO1xyXG52YXIgcHJvZ3Jlc3Nfc3RhdHVzID0gbnVsbDtcclxudmFyIGRlYWRsaW5lX2RhdGUgPSBudWxsO1xyXG52YXIgdXJnZW5jeSA9IG51bGw7XHJcbnZhciBkYXRlQ3JlYXRlZCA9IG51bGw7XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IGRpc3BsYXlUYXNrRGV0YWlscyA9IGFzeW5jIChQcm9qVGl0bGUsIElEKSA9PiB7IFxyXG5cclxuICAgIHByb2pUaXRsZVNwYW4uaW5uZXJIVE1MID0gUHJvalRpdGxlO1xyXG4gICAgY29uc3QgcSA9IHF1ZXJ5KGRvYyhkYiwgJ3Rhc2snLCBhdXRoLmN1cnJlbnRVc2VyLnVpZCwgJ1Rhc2tMaXN0JywgSUQpKVxyXG4gICAgY29uc3Qgc25hcHNob3QgPSBhd2FpdCBnZXREb2MocSkudGhlbihpdGVtID0+IHtcclxuICAgICAgICB0YXNrSW5mby50aXRsZSA9IGl0ZW0uZGF0YSgpLnRpdGxlO1xyXG4gICAgICAgIHRhc2tJbmZvLmRlc2NyaXB0aW9uID0gaXRlbS5kYXRhKCkuZGVzY3JpcHRpb247XHJcbiAgICAgICAgdGFza0luZm8udXJnZW5jeSA9IGl0ZW0uZGF0YSgpLnVyZ2VuY3k7XHJcbiAgICAgICAgdGFza0luZm8ucHJvamVjdElEID0gaXRlbS5kYXRhKCkucHJvamVjdElEO1xyXG4gICAgICAgIHRhc2tJbmZvLmRlYWRsaW5lID0gaXRlbS5kYXRhKCkuZGVhZGxpbmU7XHJcbiAgICAgICAgdGFza0luZm8uc3RhdHVzID0gaXRlbS5kYXRhKCkuc3RhdHVzO1xyXG4gICAgICAgIHRhc2tJbmZvLmlkID0gaXRlbS5pZDtcclxuICAgIH0pXHJcbiAgICAgICAuY2F0Y2goZSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZS5jb2RlICsgJzogJyArIGUubWVzc2FnZSlcclxuICAgICAgIH0pXHJcblxyXG4gICAgdGFza1RpdGxlLmlubmVySFRNTCA9IHRhc2tJbmZvLnRpdGxlO1xyXG4gICAgZGVzY3JpcHRpb24uaW5uZXJIVE1MID0gdGFza0luZm8uZGVzY3JpcHRpb247XHJcbiAgICBwcm9ncmVzc19zdGF0dXMuaW5uZXJ0SFRNTCA9IHRhc2tJbmZvLnN0YXR1cztcclxuICAgIGRlYWRsaW5lX2RhdGUuaW5uZXJIVE1MID0gdGFza0luZm8uZGVhZGxpbmU7XHJcbiAgICB1cmdlbmN5LmlubmVySFRNTCA9IHRhc2tJbmZvLnVyZ2VuY3k7XHJcbiAgICBkYXRlQ3JlYXRlZC5pbm5lckhUTUwgPSB0YXNrSW5mby5kYXRlQ3JlYXRlZDtcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBsb2FkRGlzcGxheVRhc2tEb20gPSAoKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyh0YXNrVGl0bGUpXHJcbiAgICB0YXNrVGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlzcGxheXRhc2t0aXRsZScpO1xyXG4gICAgcHJvalRpdGxlU3BhbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaXNwbGF5VGFza19Qcm9qZWN0VGl0bGVTcGFuJyk7XHJcbiAgICBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaXNwbGF5VGFza19kZXNjcmlwdGlvbicpO1xyXG4gICAgcHJvZ3Jlc3Nfc3RhdHVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rpc3BsYXlUYXNrX3N0YXR1cycpO1xyXG4gICAgZGVhZGxpbmVfZGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaXNwbGF5VGFza19kZWFkbGluZScpO1xyXG4gICAgdXJnZW5jeSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaXNwbGF5VGFza191cmdlbmN5Jyk7XHJcbiAgICBkYXRlQ3JlYXRlZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaXNwbGF5VGFza19kYXRlQ3JlYXRlZCcpO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3Qgb3BlbkRpc3BsYXlUYXNrID0gKFByb2pUaXRsZSwgSUQpID0+IHtcclxuICAgLy8gY29uc29sZS5sb2coJ1Byb2plY3QgdGl0bGU6ICcgKyBQcm9qVGl0bGUpO1xyXG4gICAvLyBjb25zb2xlLmxvZygnSUQ6ICcgKyBJRClcclxuXHJcbiAgICBjb25zdCB0YXNrUGFuZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlzcGxheVRhc2tQYW5lbCcpO1xyXG4gICAgdGFza1BhbmVsLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJztcclxuICAgIGRpc3BsYXlUYXNrRGV0YWlscyhQcm9qVGl0bGUsIElEKTtcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBjbG9zZURpc3BsYXlUYXNrID0gKCkgPT4ge1xyXG4gICAgdGFza0luZm8gPSBPYmplY3QuYXNzaWduKGluaXRUYXNrSW5mbyk7XHJcblxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rpc3BsYXl0YXNrdGl0bGUnKS5pbm5lckhUTUwgPSAnJztcclxuXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlzcGxheVRhc2tfUHJvamVjdFRpdGxlU3BhbicpLmlubmVySFRNTCA9ICcnO1xyXG5cclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaXNwbGF5VGFza19kZXNjcmlwdGlvbicpLmlubm5lckhUTUwgPSAnJztcclxuXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlzcGxheVRhc2tfdXJnZW5jeScpLmlubmVySFRNTCA9ICcnO1xyXG5cclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaXNwbGF5VGFza19kZWFkbGluZScpLmlubm5lckhUTUwgPSAnJztcclxuXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlzcGxheVRhc2tfdXJnZW5jeScpLmlubmVySFRNTCA9ICcnO1xyXG5cclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaXNwbGF5VGFza19kYXRlQ3JlYXRlZCcpLmlubmVySFRNTCA9ICcnO1xyXG5cclxuICAgIGNvbnN0IHRhc2tQYW5lbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaXNwbGF5VGFza1BhbmVsJyk7XHJcbiAgICB0YXNrUGFuZWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHJcbiAgICB2YXIgY2hpbGQgPSB0YXNrUGFuZWwubGFzdEVsZW1lbnRDaGlsZFxyXG4gICAgd2hpbGUgKGNoaWxkKSB7XHJcbiAgICAgICAgdGFza1BhbmVsLnJlbW92ZUNoaWxkKGNoaWxkKTtcclxuICAgICAgICBjaGlsZCA9IHRhc2tQYW5lbC5sYXN0RWxlbWVudENoaWxkXHJcbiAgICB9ICAgXHJcbn1cclxuIiwiaW1wb3J0IGZpcmViYXNlIGZyb20gJ2ZpcmViYXNlL2NvbXBhdC9hcHAnO1xyXG5pbXBvcnQgeyBnZXRBdXRoIH0gZnJvbSAnZmlyZWJhc2UvYXV0aCdcclxuaW1wb3J0IHsgZG9jLCB1cGRhdGVEb2MsIHNldERvYywgY29sbGVjdGlvbiwgcXVlcnksIHdoZXJlLCBUaW1lc3RhbXAsIGdldERvYywgZ2V0RG9jcywgb3JkZXJCeSwgb25TbmFwc2hvdCB9IGZyb20gJ2ZpcmViYXNlL2ZpcmVzdG9yZSc7XHJcbmltcG9ydCB7IGRiIH0gZnJvbSAnLi4vLi4vLi4vaW5pdGlhbGl6ZUZpcmViYXNlLmpzJztcclxuXHJcbmNvbnN0IGF1dGggPSBnZXRBdXRoKCk7IFxyXG5cclxuZXhwb3J0IGNvbnN0IGVkaXREZXNjcmlwdGlvbiA9IGFzeW5jICh0YXNrSUQpID0+IHtcclxuICAgIGNvbnN0IHVzZXJJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaXNwbGF5VGFza19kZXNjcmlwdGlvbklucHV0JykudmFsdWU7XHJcbiAgICBjb25zdCB0YXNrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFza0lEKVxyXG5cclxuICAgIGNvbnN0IGRvY1JlZiA9IGRvYyhkYiwgJ3Rhc2snLCBhdXRoLmN1cnJlbnRVc2VyLnVpZCwgJ1Rhc2tMaXN0JywgdGFza0lEKVxyXG4gICAgYXdhaXQgdXBkYXRlRG9jKGRvY1JlZiwge1xyXG4gICAgICAgIGRlc2NyaXB0aW9uOiB1c2VySW5wdXQsXHJcbiAgICB9KS50aGVuKFxyXG4gICAgICAgIGFsZXJ0KCdZb3VyIGVkaXQgc3VibWlzc2lvbiBoYXMgYmVlbiBzYXZlZC4nKVxyXG4gICAgKVxyXG4gICAgICAgIC5jYXRjaChlID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZS5lcnJvciArICc6ICcgKyBlLm1lc3NhZ2UpXHJcbiAgICAgICAgfSlcclxuXHJcblxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZWRpdFN0YXR1cyA9IGFzeW5jICh0YXNrSUQpID0+IHtcclxuICAgIGNvbnN0IG5ld19zdGF0dXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlzcGxheVRhc2tfc3RhdHVzSW5wdXQnKS52YWx1ZTsgXHJcbiAgICBjb25zdCB0YXNrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFza0lEKVxyXG4gICAgdmFyIGNvbXBsZXRlOyAgXHJcbiAgICBpZiAobmV3X3N0YXR1cyA9PT0gXCJEb25lXCIpIHtcclxuICAgICAgICBjb21wbGV0ZSA9IHRydWU7XHJcblxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgY29tcGxldGUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHRhc2suY2hpbGROb2Rlc1swXS5jaGVja2VkID0gY29tcGxldGU7IFxyXG5cclxuICAgIGNvbnN0IGRvY1JlZiA9IGRvYyhkYiwgJ3Rhc2snLCBhdXRoLmN1cnJlbnRVc2VyLnVpZCwgJ1Rhc2tMaXN0JywgdGFza0lEKVxyXG4gICAgYXdhaXQgdXBkYXRlRG9jKGRvY1JlZiwge1xyXG4gICAgICAgIHN0YXR1czogbmV3X3N0YXR1cywgXHJcbiAgICAgICAgaXNGaW5pc2hlZDogY29tcGxldGUsIFxyXG4gICAgfSkudGhlbihcclxuICAgICAgICBhbGVydCgnWW91ciBlZGl0IHN1Ym1pc3Npb24gaGFzIGJlZW4gc2F2ZWQuJylcclxuICAgIClcclxuICAgICAgICAuY2F0Y2goZSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUuZXJyb3IgKyAnOiAnICsgZS5tZXNzYWdlKVxyXG4gICAgICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBlZGl0RGVhZGxpbmUgPSBhc3luYyAodGFza0lEKSA9PiB7XHJcbiAgICBjb25zdCB1c2VySW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlzcGxheVRhc2tfZGVhZGxpbmVJbnB1dCcpLnZhbHVlO1xyXG4gICAgY29uc3QgdGFzayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhc2tJRClcclxuICAgIGNvbnN0IGRlYWRsaW5lX2RhdGUgPSBuZXcgRGF0ZSh1c2VySW5wdXQpO1xyXG4gICAgaWYgKFRpbWVzdGFtcC5mcm9tRGF0ZShkZWFkbGluZV9kYXRlKSA+PSBUaW1lc3RhbXAubm93KCkpIHtcclxuICAgICAgICBjb25zdCBkb2NSZWYgPSBkb2MoZGIsICd0YXNrJywgYXV0aC5jdXJyZW50VXNlci51aWQsICdUYXNrTGlzdCcsIHRhc2tJRClcclxuICAgICAgICBhd2FpdCB1cGRhdGVEb2MoZG9jUmVmLCB7XHJcbiAgICAgICAgICAgIGRlYWRsaW5lOiBUaW1lc3RhbXAuZnJvbURhdGUoZGVhZGxpbmVfZGF0ZSksXHJcbiAgICAgICAgfSkudGhlbihcclxuICAgICAgICAgICAgYWxlcnQoJ1lvdXIgZWRpdCBzdWJtaXNzaW9uIGhhcyBiZWVuIHNhdmVkLicpXHJcbiAgICAgICAgKVxyXG4gICAgICAgICAgICAuY2F0Y2goZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlLmVycm9yICsgJzogJyArIGUubWVzc2FnZSlcclxuICAgICAgICAgICAgfSlcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGFsZXJ0KFwiVGhlIGRhdGUgeW91J3ZlIGNob3NlbiBjYW5ub3QgYmUgZWFybGllciB0aGFuIHRvZGF5J3MgZGF0ZS4gXCIpXHJcbiAgICAgICAgY2xvc2VXaW5kb3cgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcblxyXG5cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGVkaXRVcmdlbmN5ID0gYXN5bmMgKHRhc2tJRCkgPT4ge1xyXG4gICAgY29uc3QgdXNlcklucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rpc3BsYXlUYXNrX3VyZ2VuY3lJbnB1dCcpLnZhbHVlO1xyXG4gICAgY29uc3QgdGFzayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhc2tJRClcclxuICAgIGNvbnN0IGRvY1JlZiA9IGRvYyhkYiwgJ3Rhc2snLCBhdXRoLmN1cnJlbnRVc2VyLnVpZCwgJ1Rhc2tMaXN0JywgdGFza0lEKVxyXG4gICAgYXdhaXQgdXBkYXRlRG9jKGRvY1JlZiwge1xyXG4gICAgICAgIHVyZ2VuY3k6IHVzZXJJbnB1dCxcclxuICAgIH0pLnRoZW4oXHJcbiAgICAgICAgYWxlcnQoJ1lvdXIgZWRpdCBzdWJtaXNzaW9uIGhhcyBiZWVuIHNhdmVkLicpXHJcbiAgICApXHJcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlLmVycm9yICsgJzogJyArIGUubWVzc2FnZSlcclxuICAgICAgICB9KVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBjbG9zZURpc3BsYXlUYXNrLCBsb2FkRGlzcGxheVRhc2tEb20gfSBmcm9tICcuL2Rpc3BsYXlUYXNrTG9naWMuanMnO1xyXG5pbXBvcnQgeyBkZWxldGVUYXNrIH0gZnJvbSAnLi4vZGlzcGxheVByb2plY3QuanMnO1xyXG5pbXBvcnQgRWRpdEljb24gZnJvbSAnLi4vLi4vLi4vYXNzZXQvRWRpdC5wbmcnOyBcclxuaW1wb3J0IFN1Ym1pdEljb24gZnJvbSAnLi4vLi4vLi4vYXNzZXQvY2hlY2sucG5nJzsgXHJcbmltcG9ydCBDYW5jZWxJY29uIGZyb20gJy4uLy4uLy4uL2Fzc2V0L2NhbmNlbC5wbmcnOyBcclxuaW1wb3J0IHsgdG9nZ2xlU3RhdHVzRWRpdCwgdG9nZ2xlRGVzY3JpcHRpb25FZGl0LCB0b2dnbGVEZWFkbGluZUVkaXQsIHRvZ2dsZVVyZ2VuY3lFZGl0IH0gZnJvbSAnLi9kaXNwbGF5VGFza0J1dHRvbi5qcyc7IFxyXG5pbXBvcnQgeyBlZGl0U3RhdHVzLCBlZGl0RGVzY3JpcHRpb24sIGVkaXREZWFkbGluZSwgZWRpdFVyZ2VuY3kgfSBmcm9tICcuL2VkaXRGdW5jdGlvbnMuanMnOyBcclxuXHJcbnZhciBpbml0VGFza0luZm8gPSB7XHJcbiAgICB0aXRsZTogJycsXHJcbiAgICBkZWFkbGluZTogJycsXHJcbiAgICBzdGF0dXM6IDAsXHJcbiAgICB1cmdlbmN5OiAwLFxyXG4gICAgcHJvamVjdElEOiAnJyxcclxuICAgIGRlc2NyaXB0aW9uOiAnJyxcclxuICAgIGRhdGVDcmVhdGVkOiAnJyxcclxuICAgIGlzRmluaXNoZWQ6IGZhbHNlLFxyXG4gICAgaWQ6ICcnLFxyXG59XHJcbnZhciB0YXNrSW5mbyA9IHtcclxuICAgIHRpdGxlOiAnJyxcclxuICAgIGRlYWRsaW5lOiAnJyxcclxuICAgIHN0YXR1czogJycsXHJcbiAgICB1cmdlbmN5OiAnJyxcclxuICAgIHByb2plY3RJRDogJycsXHJcbiAgICBkZXNjcmlwdGlvbjogJycsXHJcbiAgICBkYXRlQ3JlYXRlZDogJycsXHJcbiAgICBpc0ZpbmlzaGVkOiBmYWxzZSxcclxuICAgIGlkOiAnJyxcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGZpbGxUYXNrSW5mbyA9ICh0aXRsZSwgZGVzY3JpcHRpb24sIHVyZ2VuY3ksIGRlYWRsaW5lLCBzdGF0dXMsIGRhdGVDcmVhdGVkLCBwcm9qZWN0SUQsIElELCB0YXNrSXNEb25lKSA9PiB7XHJcbiAgICB0YXNrSW5mby50aXRsZSA9IHRpdGxlO1xyXG4gICAgdGFza0luZm8uZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcclxuICAgIHRhc2tJbmZvLnVyZ2VuY3kgPSB1cmdlbmN5O1xyXG4gICAgdGFza0luZm8uZGVhZGxpbmUgPSBkZWFkbGluZTtcclxuICAgIGlmICh0YXNrSXNEb25lKSB7XHJcbiAgICAgICAgdGFza0luZm8uc3RhdHVzID0gJ0RvbmUnXHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICAgICAgIHRhc2tJbmZvLnN0YXR1cyA9IHN0YXR1cztcclxuICAgIHRhc2tJbmZvLmRhdGVDcmVhdGVkID0gZGF0ZUNyZWF0ZWQ7IFxyXG4gICAgdGFza0luZm8ucHJvamVjdElEID0gcHJvamVjdElEO1xyXG4gICAgdGFza0luZm8uaWQgPSBJRFxyXG5cclxufVxyXG5cclxuY29uc3QgdXJnZW5jeU9wdGlvbnMgPSBbJ0xvdyBQcmlvcml0eScsICdNb2Rlc3QgTGV2ZWwgUHJpb3JpdHknLCAnSGlnaCBQcmlvcml0eSddO1xyXG5jb25zdCBzdGF0dXNPcHRpb25zID0gWydPbmdvaW5nJywgJ0RvbmUnLCAnUHV0IG9uIGhvbGQnXTtcclxuXHJcblxyXG5leHBvcnQgY29uc3QgY2xvc2VfRGlzcGxheVRhc2sgPSAoKSA9PiB7XHJcbiAgICB0YXNrSW5mbyA9IE9iamVjdC5hc3NpZ24oaW5pdFRhc2tJbmZvKTtcclxuXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlzcGxheXRhc2t0aXRsZScpLmlubmVySFRNTCA9ICcnO1xyXG5cclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaXNwbGF5VGFza19Qcm9qZWN0VGl0bGVTcGFuJykuaW5uZXJIVE1MID0gJyc7XHJcblxyXG4gICAgaWYgKHRhc2tJbmZvLmRlc2NyaXB0aW9uICE9ICcnKVxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaXNwbGF5VGFza19kZXNjcmlwdGlvbicpLmlubm5lckhUTUwgPSAnJztcclxuXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlzcGxheVRhc2tfc3RhdHVzJykuaW5uZXJIVE1MID0gJyc7XHJcblxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rpc3BsYXlUYXNrX2RlYWRsaW5lJykuaW5ubmVySFRNTCA9ICcnO1xyXG5cclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaXNwbGF5VGFza191cmdlbmN5JykuaW5uZXJIVE1MID0gJyc7XHJcblxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rpc3BsYXlUYXNrX2RhdGVDcmVhdGVkJykuaW5uZXJIVE1MID0gJyc7XHJcblxyXG4gICAgY29uc3QgdGFza1BhbmVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rpc3BsYXlUYXNrUGFuZWwnKTtcclxuICAgIHRhc2tQYW5lbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cclxuICAgIHZhciBjaGlsZCA9IHRhc2tQYW5lbC5sYXN0RWxlbWVudENoaWxkXHJcbiAgICB3aGlsZSAoY2hpbGQpIHtcclxuICAgICAgICB0YXNrUGFuZWwucmVtb3ZlQ2hpbGQoY2hpbGQpO1xyXG4gICAgICAgIGNoaWxkID0gdGFza1BhbmVsLmxhc3RFbGVtZW50Q2hpbGRcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBjb25zdCByZW5kZXJUYXNrUGFuZWwgPSBhc3luYyAoUHJvalRpdGxlLCBJRCkgPT4ge1xyXG4gICAgY29uc3QgZGlzcGxheVRhc2tQYW5lbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaXNwbGF5VGFza1BhbmVsJyk7XHJcblxyXG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2Rpc3BsYXlUYXNrUGFuZWxfb3V0ZXJGcmFtZScpO1xyXG4gICAgY29uc3QgdGFza1RpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcclxuICAgIHRhc2tUaXRsZS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2Rpc3BsYXl0YXNrdGl0bGUnKVxyXG4gICAgZWxlbWVudC5hcHBlbmQodGFza1RpdGxlKVxyXG4gICAgY29uc3QgcHJvamVjdFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcclxuICAgIGNvbnN0IHByb2plY3RUaXRsZUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgcHJvamVjdFRpdGxlTGFiZWwuaW5uZXJIVE1MID0gJ1Byb2plY3Q6ICdcclxuICAgIGNvbnN0IHByb2plY3RUaXRsZVNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICBwcm9qZWN0VGl0bGVTcGFuLnNldEF0dHJpYnV0ZSgnaWQnLCAnZGlzcGxheVRhc2tfUHJvamVjdFRpdGxlU3BhbicpO1xyXG4gICAgcHJvamVjdFRpdGxlLmFwcGVuZENoaWxkKHByb2plY3RUaXRsZUxhYmVsKTtcclxuICAgIHByb2plY3RUaXRsZS5hcHBlbmRDaGlsZChwcm9qZWN0VGl0bGVTcGFuKTtcclxuICAgIHByb2plY3RUaXRsZS5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XHJcbiAgICBlbGVtZW50LmFwcGVuZENoaWxkKHByb2plY3RUaXRsZSk7XHJcblxyXG4gICAgLy9yZW5kZXIgZGVzY3JpcHRpb24gXHJcbiAgICBjb25zdCBkZXNjcmlwdGlvbkNvbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGRlc2NyaXB0aW9uQ29udC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2Rlc2NyaXB0aW9uX2NvbnRhaW5lcicpO1xyXG4gICAgY29uc3QgZGVzY3JpcHRpb25UaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2g0Jyk7XHJcbiAgICBkZXNjcmlwdGlvblRpdGxlLmlubmVySFRNTCA9ICdEZXNjcmlwdGlvbic7XHJcblxyXG4gICAgY29uc3QgZGVzY3JpcHRpb25ab25lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7IFxyXG4gICAgZGVzY3JpcHRpb25ab25lLnNldEF0dHJpYnV0ZSgnaWQnLCAnZGVzY3JpcHRpb25ab25lJyk7XHJcbiAgICAvL2NvbnRhaW5zIHRoZSBkZXNjcmlwdGlvbiBcclxuICAgIGNvbnN0IGRlc2NyaXB0aW9uU3ViWm9uZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpOyBcclxuICAgIGRlc2NyaXB0aW9uU3ViWm9uZS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2Rlc2NyaXB0aW9uU3ViWm9uZScpOyBcclxuXHJcbiAgICAvL2Rpc3BsYXlzIGRlc2NyaXB0aW9uXHJcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgIGRlc2NyaXB0aW9uLnNldEF0dHJpYnV0ZSgnaWQnLCAnZGlzcGxheVRhc2tfZGVzY3JpcHRpb24nKTtcclxuXHJcbiAgICAvL3VzZXIgaXB1dFxyXG4gICAgY29uc3QgZGVzY3JpcHRpb25JbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0lOUFVUJylcclxuICAgIGRlc2NyaXB0aW9uSW5wdXQuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcIlRFWFRBUkVBXCIpO1xyXG4gICAgZGVzY3JpcHRpb25JbnB1dC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImRpc3BsYXlUYXNrX2Rlc2NyaXB0aW9uSW5wdXRcIik7XHJcblxyXG4gICAgLy9lbGVtZW50cyBmb3IgdGhlIGVkaXQgYnV0dG9uIFxyXG4gICAgY29uc3QgZGVzY3JpcHRpb25FZGl0QnV0dFpvbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGRlc2NyaXB0aW9uRWRpdEJ1dHRab25lLnNldEF0dHJpYnV0ZSgnaWQnLCAnRGVzY3JpcHRpb25FZGl0QnV0dFpvbmUnKTtcclxuXHJcbiAgICBjb25zdCBkZXNjcmlwdGlvbkVkaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdJTUcnKTtcclxuICAgIGRlc2NyaXB0aW9uRWRpdEJ1dHRvbi5zcmMgPSBFZGl0SWNvbjtcclxuICAgIGRlc2NyaXB0aW9uRWRpdEJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2Rpc3BsYXlUYXNrX0VkaXRCdXR0b24nKVxyXG4gICAgZGVzY3JpcHRpb25FZGl0QnV0dG9uLnNldEF0dHJpYnV0ZSgnaWQnLCAnZGVzY3JpcHRpb25FZGl0QnV0dG9uJylcclxuICAgIGRlc2NyaXB0aW9uRWRpdEJ1dHRvbi5zdHlsZS53aWR0aCA9ICcyNXB4JztcclxuICAgIGRlc2NyaXB0aW9uRWRpdEJ1dHRvbi5zdHlsZS5oZWlnaHQgPSAnMjVweCc7XHJcbiAgICBkZXNjcmlwdGlvbkVkaXRCdXR0b24uc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xyXG5cclxuICAgIGRlc2NyaXB0aW9uRWRpdEJ1dHRab25lLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uRWRpdEJ1dHRvbilcclxuXHJcbiAgICAvL3N1Ym1pdCBhbmQgY2FuY2VsIEJ1dHRvbiBcclxuICAgIGNvbnN0IGRlc2NyaXB0aW9uU3VibWl0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSU1HJyk7XHJcbiAgICBkZXNjcmlwdGlvblN1Ym1pdC5zcmMgPSBTdWJtaXRJY29uO1xyXG4gICAgZGVzY3JpcHRpb25TdWJtaXQuaW5uZXJIVE1MID0gJ1N1Ym1pdCc7XHJcbiAgICBkZXNjcmlwdGlvblN1Ym1pdC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2Rpc3BsYXlUYXNrX2J1dHRvbicpXHJcbiAgICBkZXNjcmlwdGlvblN1Ym1pdC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2Rlc2NyaXB0aW9uU3VibWl0JylcclxuXHJcbiAgICAvL2NhbmNlbCBidXR0b25cclxuICAgIGNvbnN0IGRlc2NyaXB0aW9uQ2FuY2VsQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSU1HJyk7XHJcbiAgICBkZXNjcmlwdGlvbkNhbmNlbEJ1dHRvbi5zcmMgPSBDYW5jZWxJY29uO1xyXG4gICAgZGVzY3JpcHRpb25DYW5jZWxCdXR0b24uaW5uZXJIVE1MID0gJ0NhbmNlbCc7XHJcbiAgICBkZXNjcmlwdGlvbkNhbmNlbEJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2Rpc3BsYXlUYXNrX2J1dHRvbicpXHJcbiAgICBkZXNjcmlwdGlvbkNhbmNlbEJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2Rlc2NyaXB0aW9uQ2FuY2VsQnV0dG9uJyk7XHJcbiAgICBkZXNjcmlwdGlvbkVkaXRCdXR0Wm9uZS5hcHBlbmRDaGlsZChkZXNjcmlwdGlvblN1Ym1pdCk7XHJcbiAgICBkZXNjcmlwdGlvbkVkaXRCdXR0Wm9uZS5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbkNhbmNlbEJ1dHRvbik7XHJcblxyXG4gICAgLy9hcHBlbmQgZWxlbWVudHMgXHJcbiAgICBkZXNjcmlwdGlvbkNvbnQuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb25UaXRsZSk7XHJcbiAgICBkZXNjcmlwdGlvbkNvbnQuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb25ab25lKVxyXG4gICAgZGVzY3JpcHRpb25ab25lLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uU3ViWm9uZSlcclxuICAgIGRlc2NyaXB0aW9uU3ViWm9uZS5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbilcclxuICAgIGRlc2NyaXB0aW9uU3ViWm9uZS5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbklucHV0KVxyXG4gICAgZGVzY3JpcHRpb25ab25lLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uRWRpdEJ1dHRab25lKVxyXG5cclxuICAgIC8vZnVuY3Rpb25hbGl0eSBmb3IgdGhlIGJ1dHRvbnMgXHJcbiAgICBkZXNjcmlwdGlvbkVkaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgdG9nZ2xlRGVzY3JpcHRpb25FZGl0KCk7XHJcbiAgICAgICAgZGVzY3JpcHRpb25JbnB1dC52YWx1ZSA9IHRhc2tJbmZvLmRlc2NyaXB0aW9uO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpcHRpb25TdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgZGVzY3JpcHRpb24uaW5uZXJIVE1MID0gZGVzY3JpcHRpb25JbnB1dC52YWx1ZTtcclxuICAgICAgICBlZGl0RGVzY3JpcHRpb24oSUQpXHJcbiAgICAgICAgdG9nZ2xlRGVzY3JpcHRpb25FZGl0KCk7XHJcbiAgICB9KVxyXG4gICAgZGVzY3JpcHRpb25DYW5jZWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2dnbGVEZXNjcmlwdGlvbkVkaXQpO1xyXG4gICAgLy9lbmQgb2YgZGVzY3JpcHRpb24gXHJcblxyXG5cclxuICAgLy8gZGVzY3JpcHRpb25Db250LmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uKTtcclxuICAgIGlmICh0YXNrSW5mby5kZXNjcmlwdGlvbiAhPSAnJylcclxuICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uQ29udCk7XHJcblxyXG4gICAgLy9jb250YWluZXIgMSBkaXNwbGF5aW5nIFByb2dyZXNzIGFuZCBEZWFkbGluZSBEYXRlXHJcbiAgICBjb25zdCBjb250YWluZXIxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBjb250YWluZXIxLnNldEF0dHJpYnV0ZSgnaWQnLCAnZGlzcGxheVRhc2tfY29udDEnKTtcclxuXHJcbiAgICBjb25zdCBjb250YWluZXIxX2RpdjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGNvbnRhaW5lcjFfZGl2MS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2Rpc3BsYXlUYXNrX3N1YkNvbnQnKVxyXG4gICAgY29uc3QgcHJvZ3Jlc3NUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2g0Jyk7XHJcbiAgICBwcm9ncmVzc1RpdGxlLmlubmVySFRNTCA9ICdQcm9ncmVzcyBTdGF0dXMnO1xyXG4gICAgY29udGFpbmVyMV9kaXYxLmFwcGVuZENoaWxkKHByb2dyZXNzVGl0bGUpO1xyXG4gICAgLy9jcmVhdGUgdGhlIHpvbmUgdGhhdCBjb250YWlucyB0aGUgZGlzcGxheSBkaXYsIGlucHV0IGFuZCB0aGUgZWRpdCBidXR0b24gXHJcbiAgICAvL05BXHJcbiAgICBjb25zdCBzdGF0dXNab25lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7IFxyXG4gICAgc3RhdHVzWm9uZS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3N0YXR1c1pvbmUnKTsgXHJcblxyXG4gICAgLy9jcmVhdGUgMm5kIHRpZXIgem9uZSB0aGF0IGNvbnRhaW5zIGJvdGggdGhlIGRpc3BsYXkgZGl2IGFuZCBpbnB1dFxyXG4gICAgLy9pdCdzIHBsYWNlZCBzaWRlIGJ5IHNpZGUgd2l0aCB0aGUgc3RhdHVzIEVkaXQgWm9uZSBcclxuICAgIGNvbnN0IHN0YXR1c1N1YlpvbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTsgXHJcbiAgICBzdGF0dXNTdWJab25lLnNldEF0dHJpYnV0ZSgnaWQnLCAnc3RhdHVzU3ViWm9uZScpOyBcclxuICAgIHN0YXR1c1N1YlpvbmUuc2V0QXR0cmlidXRlKCdjbGFzcycsICdTdWJab25lJylcclxuXHJcbiAgICAvL2VsZW1lbnRzIGZvciB0aGUgZWRpdCBidXR0b24gXHJcbiAgICBjb25zdCBzdGF0dXNFZGl0QnV0dFpvbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTsgXHJcbiAgICBzdGF0dXNFZGl0QnV0dFpvbmUuc2V0QXR0cmlidXRlKCdpZCcsICdFZGl0QnV0dFpvbmUnKTsgXHJcbiAgICBjb25zdCBzdGF0dXNFZGl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSU1HJyk7IFxyXG4gICAgc3RhdHVzRWRpdEJ1dHRvbi5zcmMgPSBFZGl0SWNvbjsgXHJcbiAgICBzdGF0dXNFZGl0QnV0dG9uLnNldEF0dHJpYnV0ZSgnaWQnLCAnc3RhdHVzRWRpdEJ1dHRvbicpXHJcbiAgICBzdGF0dXNFZGl0QnV0dG9uLnN0eWxlLndpZHRoID0gJzI1cHgnOyBcclxuICAgIHN0YXR1c0VkaXRCdXR0b24uc3R5bGUuaGVpZ2h0ID0gJzI1cHgnOyBcclxuICAgIHN0YXR1c0VkaXRCdXR0b24uc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInOyBcclxuXHJcbiAgICBzdGF0dXNFZGl0QnV0dFpvbmUuYXBwZW5kQ2hpbGQoc3RhdHVzRWRpdEJ1dHRvbilcclxuXHJcbiAgICAvL3N1Ym1pdCBhbmQgY2FuY2VsIEJ1dHRvbiBcclxuICAgIGNvbnN0IHN0YXR1c1N1Ym1pdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0lNRycpOyBcclxuICAgIHN0YXR1c1N1Ym1pdC5zcmMgPSBTdWJtaXRJY29uOyBcclxuICAgIHN0YXR1c1N1Ym1pdC5pbm5lckhUTUwgPSAnU3VibWl0JzsgXHJcbiAgICBzdGF0dXNTdWJtaXQuc2V0QXR0cmlidXRlKCdjbGFzcycsICdkaXNwbGF5VGFza19idXR0b24nKVxyXG4gICAgc3RhdHVzU3VibWl0LnNldEF0dHJpYnV0ZSgnaWQnLCAnc3RhdHVzU3VibWl0JylcclxuXHJcblxyXG4gICAgLy9jYW5jZWwgYnV0dG9uXHJcbiAgICBjb25zdCBzdGF0dXNDYW5jZWxCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdJTUcnKTtcclxuICAgIHN0YXR1c0NhbmNlbEJ1dHRvbi5zcmMgPSBDYW5jZWxJY29uO1xyXG4gICAgc3RhdHVzQ2FuY2VsQnV0dG9uLmlubmVySFRNTCA9ICdDYW5jZWwnO1xyXG4gICAgc3RhdHVzQ2FuY2VsQnV0dG9uLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZGlzcGxheVRhc2tfYnV0dG9uJylcclxuICAgIHN0YXR1c0NhbmNlbEJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3N0YXR1c0NhbmNlbEJ1dHRvbicpO1xyXG4gICAgc3RhdHVzQ2FuY2VsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlU3RhdHVzRWRpdCk7XHJcbiAgICBzdGF0dXNFZGl0QnV0dFpvbmUuYXBwZW5kQ2hpbGQoc3RhdHVzU3VibWl0KTtcclxuICAgIHN0YXR1c0VkaXRCdXR0Wm9uZS5hcHBlbmRDaGlsZChzdGF0dXNDYW5jZWxCdXR0b24pO1xyXG4gICAgY29uc3Qgc3RhdHVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgc3RhdHVzLnNldEF0dHJpYnV0ZSgnaWQnLCAnZGlzcGxheVRhc2tfc3RhdHVzJyk7XHJcblxyXG4gICAgLy9pbnB1dFxyXG4gICAgY29uc3Qgc3RhdHVzRWRpdElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnU0VMRUNUJyk7XHJcbiAgICBzdGF0dXNFZGl0SW5wdXQuc2V0QXR0cmlidXRlKCdjbGFzcycsICdkaXNwbGF5VGFza19lZGl0SW5wdXQnKTtcclxuICAgIHN0YXR1c0VkaXRJbnB1dC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2Rpc3BsYXlUYXNrX3N0YXR1c0lucHV0JylcclxuICAgIGNvbnN0IG9uZ29pbmdPcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdPUFRJT04nKTtcclxuICAgIG9uZ29pbmdPcHRpb24uaW5uZXJIVE1MID0gJ09uZ29pbmcnOyBcclxuICAgIG9uZ29pbmdPcHRpb24uc2V0QXR0cmlidXRlKCd2YWx1ZScsICdPbmdvaW5nJyk7ICBcclxuICAgIGNvbnN0IGRvbmVPcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdPUFRJT04nKTtcclxuICAgIGRvbmVPcHRpb24uaW5uZXJIVE1MID0gJ0RvbmUnO1xyXG4gICAgZG9uZU9wdGlvbi5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ0RvbmUnKTsgXHJcbiAgICBjb25zdCBvbkhvbGRPcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdPUFRJT04nKTtcclxuICAgIG9uSG9sZE9wdGlvbi5pbm5lckhUTUwgPSAnUHV0IE9uIEhvbGQnO1xyXG4gICAgb25Ib2xkT3B0aW9uLnNldEF0dHJpYnV0ZSgndmFsdWUnLCAnUHV0IE9uIEhvbGQnKTsgXHJcbiAgICBzdGF0dXNFZGl0SW5wdXQuYXBwZW5kQ2hpbGQob25nb2luZ09wdGlvbik7IFxyXG4gICAgc3RhdHVzRWRpdElucHV0LmFwcGVuZENoaWxkKGRvbmVPcHRpb24pOyBcclxuICAgIHN0YXR1c0VkaXRJbnB1dC5hcHBlbmRDaGlsZChvbkhvbGRPcHRpb24pOyBcclxuXHJcbiAgICAvL2Z1bmN0aW9uYWxpdHkgZm9yIHRoZSBidXR0b25zIFxyXG4gICAgc3RhdHVzRWRpdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICB0b2dnbGVTdGF0dXNFZGl0KCk7XHJcbiAgICAgICAgc3RhdHVzRWRpdElucHV0LnZhbHVlID0gdGFza0luZm8uc3RhdHVzO1xyXG4gICAgfSk7IFxyXG5cclxuICAgIHN0YXR1c1N1Ym1pdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBzdGF0dXMuaW5uZXJIVE1MID0gc3RhdHVzRWRpdElucHV0LnZhbHVlO1xyXG4gICAgICAgIGVkaXRTdGF0dXMoSUQpXHJcbiAgICAgICAgdG9nZ2xlU3RhdHVzRWRpdCgpO1xyXG4gICAgfSlcclxuXHJcbiAgICBzdGF0dXNTdWJab25lLmFwcGVuZENoaWxkKHN0YXR1cyk7IFxyXG4gICAgc3RhdHVzU3ViWm9uZS5hcHBlbmRDaGlsZChzdGF0dXNFZGl0SW5wdXQpOyBcclxuXHJcbiAgICBzdGF0dXNab25lLmFwcGVuZENoaWxkKHN0YXR1c1N1YlpvbmUpOyBcclxuICAgIHN0YXR1c1pvbmUuYXBwZW5kQ2hpbGQoc3RhdHVzRWRpdEJ1dHRab25lKTtcclxuICAgIGNvbnRhaW5lcjFfZGl2MS5hcHBlbmRDaGlsZChzdGF0dXNab25lKTtcclxuXHJcbiAgLy8gIGNvbnRhaW5lcjFfZGl2MS5hcHBlbmRDaGlsZChzdGF0dXMpO1xyXG5cclxuICAgIGNvbnN0IGNvbnRhaW5lcjFfZGl2MiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgY29udGFpbmVyMV9kaXYyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZGlzcGxheVRhc2tfc3ViQ29udCcpXHJcblxyXG4gICAgLy9yZW5kZXIgRGVhZGxpbmUgXHJcbiAgICAvL2NvbnRhaW5zIGRlYWRsaW5lLCB1c2VyIGlucHV0IGFuZCBlZGl0IGJ1dHRvbnMgXHJcbiAgICBjb25zdCBkZWFkbGluZVpvbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgZGVhZGxpbmVab25lLnNldEF0dHJpYnV0ZSgnaWQnLCAnZGVhZGxpbmVab25lJyk7IFxyXG5cclxuXHJcbiAgICAvL2NvbnRhaW5zIHRoZSBkZWFkbGluZSBhbmQgIHVzZXIgaW5wdXRcclxuICAgIGNvbnN0IGRlYWRsaW5lU3ViWm9uZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgZGVhZGxpbmVTdWJab25lLnNldEF0dHJpYnV0ZSgnaWQnLCAnZGVhZGxpbmVTdWJab25lJyk7IFxyXG4gICAgY29uc3QgZGVhZGxpbmVUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2g0Jyk7XHJcbiAgICBkZWFkbGluZVRpdGxlLmlubmVySFRNTCA9ICdEZWFkbGluZSBEYXRlJztcclxuXHJcbiAgICBjb25zdCBkZWFkbGluZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgIGRlYWRsaW5lLnNldEF0dHJpYnV0ZSgnaWQnLCAnZGlzcGxheVRhc2tfZGVhZGxpbmUnKTtcclxuXHJcbiAgICAvL3VzZXIgaXB1dFxyXG4gICAgY29uc3QgZGVhZGxpbmVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0lOUFVUJylcclxuICAgIGRlYWRsaW5lSW5wdXQuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImRhdGVcIik7XHJcbiAgICBkZWFkbGluZUlucHV0LnNldEF0dHJpYnV0ZShcImlkXCIsIFwiZGlzcGxheVRhc2tfZGVhZGxpbmVJbnB1dFwiKTtcclxuXHJcbiAgICAvL2VsZW1lbnRzIGZvciB0aGUgZWRpdCBidXR0b24gXHJcbiAgICBjb25zdCBkZWFkbGluZUVkaXRCdXR0Wm9uZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgZGVhZGxpbmVFZGl0QnV0dFpvbmUuc2V0QXR0cmlidXRlKCdpZCcsICdkZWFkbGluZUVkaXRCdXR0Wm9uZScpO1xyXG5cclxuICAgIGNvbnN0IGRlYWRsaW5lRWRpdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0lNRycpO1xyXG4gICAgZGVhZGxpbmVFZGl0QnV0dG9uLnNyYyA9IEVkaXRJY29uO1xyXG4gICAgZGVhZGxpbmVFZGl0QnV0dG9uLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZGlzcGxheVRhc2tfRWRpdEJ1dHRvbicpXHJcbiAgICBkZWFkbGluZUVkaXRCdXR0b24uc2V0QXR0cmlidXRlKCdpZCcsICdkZWFkbGluZUVkaXRCdXR0b24nKVxyXG4gICAgZGVhZGxpbmVFZGl0QnV0dG9uLnN0eWxlLndpZHRoID0gJzI1cHgnO1xyXG4gICAgZGVhZGxpbmVFZGl0QnV0dG9uLnN0eWxlLmhlaWdodCA9ICcyNXB4JztcclxuICAgIGRlYWRsaW5lRWRpdEJ1dHRvbi5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XHJcblxyXG4gICAgZGVhZGxpbmVFZGl0QnV0dFpvbmUuYXBwZW5kQ2hpbGQoZGVhZGxpbmVFZGl0QnV0dG9uKVxyXG5cclxuICAgIC8vc3VibWl0IGFuZCBjYW5jZWwgQnV0dG9uIFxyXG4gICAgY29uc3QgZGVhZGxpbmVTdWJtaXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdJTUcnKTtcclxuICAgIGRlYWRsaW5lU3VibWl0LnNyYyA9IFN1Ym1pdEljb247XHJcbiAgICBkZWFkbGluZVN1Ym1pdC5pbm5lckhUTUwgPSAnU3VibWl0JztcclxuICAgIGRlYWRsaW5lU3VibWl0LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZGlzcGxheVRhc2tfYnV0dG9uJylcclxuICAgIGRlYWRsaW5lU3VibWl0LnNldEF0dHJpYnV0ZSgnaWQnLCAnZGVhZGxpbmVTdWJtaXQnKVxyXG5cclxuICAgIC8vY2FuY2VsIGJ1dHRvblxyXG4gICAgY29uc3QgZGVhZGxpbmVDYW5jZWxCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdJTUcnKTtcclxuICAgIGRlYWRsaW5lQ2FuY2VsQnV0dG9uLnNyYyA9IENhbmNlbEljb247XHJcbiAgICBkZWFkbGluZUNhbmNlbEJ1dHRvbi5pbm5lckhUTUwgPSAnQ2FuY2VsJztcclxuICAgIGRlYWRsaW5lQ2FuY2VsQnV0dG9uLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZGlzcGxheVRhc2tfYnV0dG9uJylcclxuICAgIGRlYWRsaW5lQ2FuY2VsQnV0dG9uLnNldEF0dHJpYnV0ZSgnaWQnLCAnZGVhZGxpbmVDYW5jZWxCdXR0b24nKTtcclxuICAgIGRlYWRsaW5lRWRpdEJ1dHRab25lLmFwcGVuZENoaWxkKGRlYWRsaW5lU3VibWl0KTtcclxuICAgIGRlYWRsaW5lRWRpdEJ1dHRab25lLmFwcGVuZENoaWxkKGRlYWRsaW5lQ2FuY2VsQnV0dG9uKTtcclxuXHJcbiAgICAvL2FwcGVuZCBlbGVtZW50cyBcclxuICAgIGRlYWRsaW5lWm9uZS5hcHBlbmRDaGlsZChkZWFkbGluZVN1YlpvbmUpXHJcbiAgICBkZWFkbGluZVN1YlpvbmUuYXBwZW5kQ2hpbGQoZGVhZGxpbmUpXHJcbiAgICBkZWFkbGluZVN1YlpvbmUuYXBwZW5kQ2hpbGQoZGVhZGxpbmVJbnB1dClcclxuICAgIGRlYWRsaW5lWm9uZS5hcHBlbmRDaGlsZChkZWFkbGluZUVkaXRCdXR0Wm9uZSlcclxuICAgIGNvbnRhaW5lcjFfZGl2Mi5hcHBlbmRDaGlsZChkZWFkbGluZVRpdGxlKTtcclxuICAgIGNvbnRhaW5lcjFfZGl2Mi5hcHBlbmRDaGlsZChkZWFkbGluZVpvbmUpO1xyXG5cclxuICAgIC8vQWRkIGZ1bmN0aW9uYWxpdHkgdG8gYnV0dG9uc1xyXG4gICAgZGVhZGxpbmVFZGl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIHRvZ2dsZURlYWRsaW5lRWRpdCgpO1xyXG4gICAgICAgIGRlYWRsaW5lSW5wdXQudmFsdWUgPSB0YXNrSW5mby5kZWFkbGluZS50b0RhdGUoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlYWRsaW5lU3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIHZhciBuZXdEYXRlID0gbmV3IERhdGUoZGVhZGxpbmVJbnB1dC52YWx1ZSk7XHJcbiAgICAgICAgZGVhZGxpbmUuaW5uZXJIVE1MID0gbmV3RGF0ZS50b0xvY2FsZURhdGVTdHJpbmcoKTtcclxuICAgICAgICBlZGl0RGVhZGxpbmUoSUQpXHJcbiAgICAgICAgdG9nZ2xlRGVhZGxpbmVFZGl0KCk7XHJcbiAgICB9KVxyXG4gICAgZGVhZGxpbmVDYW5jZWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2dnbGVEZWFkbGluZUVkaXQpO1xyXG5cclxuICAgIC8vZW5kIG9mIHJlbmRlcmluZyBkZWFkbGluZSBcclxuXHJcbiAgICBjb250YWluZXIxLmFwcGVuZENoaWxkKGNvbnRhaW5lcjFfZGl2MSk7XHJcbiAgICBjb250YWluZXIxLmFwcGVuZENoaWxkKGNvbnRhaW5lcjFfZGl2Mik7XHJcbiAgICBlbGVtZW50LmFwcGVuZENoaWxkKGNvbnRhaW5lcjEpXHJcblxyXG4gICAgLy9jb250YWluZXIgMiBkaXNwbGF5aW5nIHVyZ2VuY3kgYW5kIGRhdGVDcmVhdGVkIFxyXG4gICAgY29uc3QgY29udGFpbmVyMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgY29udGFpbmVyMi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2Rpc3BsYXlUYXNrX2NvbnQyJyk7XHJcblxyXG4gICAgY29uc3QgY29udGFpbmVyMl9kaXYxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBjb250YWluZXIyX2RpdjEuc2V0QXR0cmlidXRlKCdjbGFzcycsICdkaXNwbGF5VGFza19zdWJDb250JylcclxuXHJcbiAgICAvL3JlbmRlciBVcmdlbmN5XHJcblxyXG4gICAgLy9jb250YWlucyB1cmdlbmN5LCB1c2VyIGlucHV0IGFuZCBlZGl0IGJ1dHRvbnMgXHJcbiAgICBjb25zdCB1cmdlbmN5Wm9uZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICB1cmdlbmN5Wm9uZS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3VyZ2VuY3lab25lJyk7XHJcblxyXG4gICAgLy9jb250YWlucyB0aGUgdXJnZW5jeSBhbmQgIHVzZXIgaW5wdXRcclxuICAgIGNvbnN0IHVyZ2VuY3lTdWJab25lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB1cmdlbmN5U3ViWm9uZS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3VyZ2VuY3lTdWJab25lJyk7XHJcblxyXG4gICAgY29uc3QgdXJnZW5jeVRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDQnKTtcclxuICAgIHVyZ2VuY3lUaXRsZS5pbm5lckhUTUwgPSAnVXJnZW5jeSc7XHJcblxyXG4gICAgY29uc3QgdXJnZW5jeSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgIHVyZ2VuY3kuc2V0QXR0cmlidXRlKCdpZCcsICdkaXNwbGF5VGFza191cmdlbmN5Jyk7XHJcblxyXG4gICAgLy91c2VyIGlwdXRcclxuICAgIGNvbnN0IHVyZ2VuY3lJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ1NFTEVDVCcpXHJcbiAgICB1cmdlbmN5SW5wdXQuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJkaXNwbGF5VGFza191cmdlbmN5SW5wdXRcIik7XHJcblxyXG4gICAgLy9yZW5kZXIgb3B0aW9ucyBcclxuICAgIGNvbnN0IGxvd1ByaW9yaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnT1BUSU9OJyk7XHJcbiAgICBjb25zdCBtb2Rlc3RQcmlvcml0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ09QVElPTicpO1xyXG4gICAgY29uc3QgaGlnaFByaW9yaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnT1BUSU9OJyk7XHJcblxyXG4gICAgbG93UHJpb3JpdHkuc2V0QXR0cmlidXRlKCdpZCcsICdsb3dQcmlvcml0eScpXHJcbiAgICBtb2Rlc3RQcmlvcml0eS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ21vZGVzdFByaW9yaXR5JylcclxuICAgIGhpZ2hQcmlvcml0eS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2hpZ2hQcmlvcml0eScpXHJcblxyXG4gICAgbG93UHJpb3JpdHkuc2V0QXR0cmlidXRlKCd2YWx1ZScsICdMb3cgUHJpb3JpdHknKTsgXHJcbiAgICBtb2Rlc3RQcmlvcml0eS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ01vZGVzdCBMZXZlbCBQcmlvcml0eScpOyBcclxuICAgIGhpZ2hQcmlvcml0eS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ0hpZ2ggUHJpb3JpdHknKTsgXHJcblxyXG4gICAgbG93UHJpb3JpdHkuaW5uZXJIVE1MID0gJ0xvdyBwcmlvcml0eSc7XHJcbiAgICBtb2Rlc3RQcmlvcml0eS5pbm5lckhUTUwgPSAnTW9kZXN0IGxldmVsIHByaW9yaXR5JztcclxuICAgIGhpZ2hQcmlvcml0eS5pbm5lckhUTUwgPSAnSGlnaCBwcmlvcml0eSc7XHJcblxyXG4gICAgdXJnZW5jeUlucHV0LmFwcGVuZENoaWxkKGxvd1ByaW9yaXR5KTtcclxuICAgIHVyZ2VuY3lJbnB1dC5hcHBlbmRDaGlsZChtb2Rlc3RQcmlvcml0eSk7XHJcbiAgICB1cmdlbmN5SW5wdXQuYXBwZW5kQ2hpbGQoaGlnaFByaW9yaXR5KTtcclxuXHJcbiAgICAvL2VsZW1lbnRzIGZvciB0aGUgZWRpdCBidXR0b24gXHJcbiAgICBjb25zdCB1cmdlbmN5RWRpdEJ1dHRab25lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB1cmdlbmN5RWRpdEJ1dHRab25lLnNldEF0dHJpYnV0ZSgnaWQnLCAndXJnZW5jeUVkaXRCdXR0Wm9uZScpO1xyXG5cclxuICAgIGNvbnN0IHVyZ2VuY3lFZGl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSU1HJyk7XHJcbiAgICB1cmdlbmN5RWRpdEJ1dHRvbi5zcmMgPSBFZGl0SWNvbjtcclxuICAgIHVyZ2VuY3lFZGl0QnV0dG9uLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZGlzcGxheVRhc2tfRWRpdEJ1dHRvbicpXHJcbiAgICB1cmdlbmN5RWRpdEJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3VyZ2VuY3lFZGl0QnV0dG9uJylcclxuICAgIHVyZ2VuY3lFZGl0QnV0dG9uLnN0eWxlLndpZHRoID0gJzI1cHgnO1xyXG4gICAgdXJnZW5jeUVkaXRCdXR0b24uc3R5bGUuaGVpZ2h0ID0gJzI1cHgnO1xyXG4gICAgdXJnZW5jeUVkaXRCdXR0b24uc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xyXG5cclxuICAgIHVyZ2VuY3lFZGl0QnV0dFpvbmUuYXBwZW5kQ2hpbGQodXJnZW5jeUVkaXRCdXR0b24pXHJcblxyXG4gICAgLy9zdWJtaXQgYW5kIGNhbmNlbCBCdXR0b24gXHJcbiAgICBjb25zdCB1cmdlbmN5U3VibWl0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSU1HJyk7XHJcbiAgICB1cmdlbmN5U3VibWl0LnNyYyA9IFN1Ym1pdEljb247XHJcbiAgICB1cmdlbmN5U3VibWl0LmlubmVySFRNTCA9ICdTdWJtaXQnO1xyXG4gICAgdXJnZW5jeVN1Ym1pdC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2Rpc3BsYXlUYXNrX2J1dHRvbicpXHJcbiAgICB1cmdlbmN5U3VibWl0LnNldEF0dHJpYnV0ZSgnaWQnLCAndXJnZW5jeVN1Ym1pdCcpXHJcblxyXG4gICAgLy9jYW5jZWwgYnV0dG9uXHJcbiAgICBjb25zdCB1cmdlbmN5Q2FuY2VsQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSU1HJyk7XHJcbiAgICB1cmdlbmN5Q2FuY2VsQnV0dG9uLnNyYyA9IENhbmNlbEljb247XHJcbiAgICB1cmdlbmN5Q2FuY2VsQnV0dG9uLmlubmVySFRNTCA9ICdDYW5jZWwnO1xyXG4gICAgdXJnZW5jeUNhbmNlbEJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2Rpc3BsYXlUYXNrX2J1dHRvbicpXHJcbiAgICB1cmdlbmN5Q2FuY2VsQnV0dG9uLnNldEF0dHJpYnV0ZSgnaWQnLCAndXJnZW5jeUNhbmNlbEJ1dHRvbicpO1xyXG4gICAgdXJnZW5jeUVkaXRCdXR0Wm9uZS5hcHBlbmRDaGlsZCh1cmdlbmN5U3VibWl0KTtcclxuICAgIHVyZ2VuY3lFZGl0QnV0dFpvbmUuYXBwZW5kQ2hpbGQodXJnZW5jeUNhbmNlbEJ1dHRvbik7XHJcblxyXG4gICAgLy9hcHBlbmQgZWxlbWVudHMgXHJcbiAgICB1cmdlbmN5Wm9uZS5hcHBlbmRDaGlsZCh1cmdlbmN5U3ViWm9uZSlcclxuICAgIHVyZ2VuY3lTdWJab25lLmFwcGVuZENoaWxkKHVyZ2VuY3kpXHJcbiAgICB1cmdlbmN5U3ViWm9uZS5hcHBlbmRDaGlsZCh1cmdlbmN5SW5wdXQpXHJcbiAgICB1cmdlbmN5Wm9uZS5hcHBlbmRDaGlsZCh1cmdlbmN5RWRpdEJ1dHRab25lKVxyXG5cclxuICAgIC8vQWRkIGZ1bmN0aW9uYWxpdHkgdG8gYnV0dG9uc1xyXG4gICAgdXJnZW5jeUVkaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgdG9nZ2xlVXJnZW5jeUVkaXQoKTtcclxuICAgICAgICB1cmdlbmN5SW5wdXQudmFsdWUgPSB0YXNrSW5mby51cmdlbmN5O1xyXG4gICAgfSk7XHJcblxyXG4gICAgdXJnZW5jeVN1Ym1pdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICB1cmdlbmN5LmlubmVySFRNTCA9IHVyZ2VuY3lJbnB1dC52YWx1ZTtcclxuICAgICAgICBlZGl0VXJnZW5jeShJRClcclxuICAgICAgICB0b2dnbGVVcmdlbmN5RWRpdCgpO1xyXG4gICAgfSlcclxuICAgIHVyZ2VuY3lDYW5jZWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2dnbGVVcmdlbmN5RWRpdCk7XHJcblxyXG4gICAgLy9lbmQgb2YgcmVuZGVyaW5nIHVyZ2VuY3lcclxuXHJcbiAgICBjb25zdCBjb250YWluZXIyX2RpdjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGNvbnRhaW5lcjJfZGl2Mi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2Rpc3BsYXlUYXNrX3N1YkNvbnQnKVxyXG4gICAgY29uc3QgZGF0ZUNyZWF0ZWRUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2g0Jyk7XHJcbiAgICBkYXRlQ3JlYXRlZFRpdGxlLmlubmVySFRNTCA9ICdEYXRlIENyZWF0ZWQnO1xyXG4gICAgY29uc3QgZGF0ZUNyZWF0ZWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICBkYXRlQ3JlYXRlZC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2Rpc3BsYXlUYXNrX2RhdGVDcmVhdGVkJyk7XHJcblxyXG4gICAgY29udGFpbmVyMl9kaXYxLmFwcGVuZENoaWxkKHVyZ2VuY3lUaXRsZSk7XHJcbiAgICBjb250YWluZXIyX2RpdjEuYXBwZW5kQ2hpbGQodXJnZW5jeVpvbmUpO1xyXG5cclxuICAgIGNvbnRhaW5lcjJfZGl2Mi5hcHBlbmRDaGlsZChkYXRlQ3JlYXRlZFRpdGxlKTtcclxuICAgIGNvbnRhaW5lcjJfZGl2Mi5hcHBlbmRDaGlsZChkYXRlQ3JlYXRlZCk7XHJcblxyXG4gICAgY29udGFpbmVyMi5hcHBlbmRDaGlsZChjb250YWluZXIyX2RpdjEpO1xyXG4gICAgY29udGFpbmVyMi5hcHBlbmRDaGlsZChjb250YWluZXIyX2RpdjIpO1xyXG5cclxuXHJcbiAgICBlbGVtZW50LmFwcGVuZENoaWxkKGNvbnRhaW5lcjIpXHJcblxyXG4gICAgLy9EaXYgZm9yIHRoZSBidXRvbnNcclxuXHJcbiAgICBjb25zdCBidXR0Q29udCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICBidXR0Q29udC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2Rpc3BsYXlUYXNrX2J1dHRvbkNvbnQnKTtcclxuXHJcbiAgICAvL2NvbnN0IGVkaXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIGNvbnN0IGRlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgY29uc3QgY2xvc2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuXHJcbiAgICAvL2VkaXQuc2V0QXR0cmlidXRlKCdpZCcsICdkaXNwbGF5VGFza19lZGl0QnV0dG9uJylcclxuICAgIGRlbC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2Rpc3BsYXlUYXNrX2RlbEJ1dHRvbicpXHJcbiAgICBjbG9zZS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2Rpc3BsYXlUYXNrX2Nsb3NlQnV0dG9uJylcclxuICAgIC8vZWRpdC5pbm5lckhUTUwgPSAnRWRpdCc7XHJcbiAgICBkZWwuaW5uZXJIVE1MID0gJ0RlbGV0ZSc7XHJcbiAgICBjbG9zZS5pbm5lckhUTUwgPSAnQ2xvc2UnO1xyXG5cclxuICAgLy8gYnV0dENvbnQuYXBwZW5kQ2hpbGQoZWRpdCk7XHJcbiAgICBidXR0Q29udC5hcHBlbmRDaGlsZChkZWwpO1xyXG4gICAgYnV0dENvbnQuYXBwZW5kQ2hpbGQoY2xvc2UpO1xyXG4gICAgZWxlbWVudC5hcHBlbmRDaGlsZChidXR0Q29udCk7XHJcblxyXG4gICAgY2xvc2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZV9EaXNwbGF5VGFzayk7XHJcbiAgICBkZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7IGRlbGV0ZVRhc2sodGFza0luZm8uaWQpIH0pXHJcbiAgICAvLyAgICBlZGl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKVxyXG5cclxuICAgIGRpc3BsYXlUYXNrUGFuZWwuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XHJcblxyXG4gICAgLy9zdGFydCBsb2dpY1xyXG4gICAgcHJvamVjdFRpdGxlU3Bhbi5pbm5lckhUTUwgPSBQcm9qVGl0bGU7XHJcbiAgICB0YXNrVGl0bGUuaW5uZXJIVE1MID0gdGFza0luZm8udGl0bGU7XHJcbiAgICBkZXNjcmlwdGlvbi5pbm5lckhUTUwgPSB0YXNrSW5mby5kZXNjcmlwdGlvbjtcclxuICAgIHN0YXR1cy5pbm5lckhUTUwgPSB0YXNrSW5mby5zdGF0dXM7XHJcbiAgICBkZWFkbGluZS5pbm5lckhUTUwgPSB0YXNrSW5mby5kZWFkbGluZS50b0RhdGUoKS50b0xvY2FsZURhdGVTdHJpbmcoKTtcclxuICAgIHVyZ2VuY3kuaW5uZXJIVE1MID0gdGFza0luZm8udXJnZW5jeTtcclxuICAgIGRhdGVDcmVhdGVkLmlubmVySFRNTCA9IHRhc2tJbmZvLmRhdGVDcmVhdGVkLnRvRGF0ZSgpLnRvTG9jYWxlRGF0ZVN0cmluZygpO1xyXG5cclxuICAgIC8vcmVtb3ZlIE9iamVjdCBQcm9taXNlIFRhZ1xyXG4gICAgY29uc3Qgbm9kZXMgPSBkaXNwbGF5VGFza1BhbmVsLmNoaWxkTm9kZXM7XHJcbiAgICBpZihub2Rlc1swXS5ub2RlVmFsdWUgPT09IFwiW29iamVjdCBQcm9taXNlXVwiKVxyXG4gICAgICAgIG5vZGVzWzBdLnJlbW92ZSgpO1xyXG59XHJcblxyXG5cclxuXHJcbi8qXHJcbmV4cG9ydCBjb25zdCByZW5kZXJUYXNrUGFuZWwgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBlbGVtZW50ID0gXCI8ZGl2IGlkID0gJ2Rpc3BsYXlUYXNrUGFuZWxfb3V0ZXJGcmFtZT5cIiArXHJcbiAgICAgICAgICAgIFwiPGgxIGlkID0gJ2Rpc3BsYXl0YXNrdGl0bGUnPjwvaDE+XCIgK1xyXG4gICAgICAgICAgICBcIjxoMyBpZCA9ICdkaXNwbGF5VGFza19Qcm9qZWN0VGl0bGUnPjxzcGFuPlByb2plY3Q6IDwvc3Bhbj48c3BhbiBpZCA9ICdkaXNwbGF5VGFza19Qcm9qZWN0VGl0bGVTcGFuJz48c3Bhbj48L2gzPlwiICtcclxuICAgICAgICAgICAgICAgIFwiPGRpdiBpZCA9ICdkZXNjcmlwdGlvbl9jb250YWluZXInPlwiICtcclxuICAgICAgICAgICAgICAgICAgICBcIjxoND5EZXNjcmlwdGlvbjwvaDQ+XCIgK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiPHAgaWQgPSAnZGlzcGxheVRhc2tfZGVzY3JpcHRpb24nPjwvcD5cIiArXHJcbiAgICAgICAgICAgICAgICBcIjwvZGl2PlwiICtcclxuICAgICAgICAgICAgICAgIFwiPGRpdiBpZCA9ICdkaXNwbGF5VGFza19jb250MSc+XCIgK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiPGRpdj5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiPGg0PlByb2dyZXNzIFN0YXR1czwvaDQ+XCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIjxwIGlkID0gJ2Rpc3BsYXlUYXNrX3N0YXR1cyc+PC9wPlwiICtcclxuICAgICAgICAgICAgICAgICAgICBcIjwvZGl2PlwiICtcclxuICAgICAgICAgICAgICAgIFwiPGRpdj5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgXCI8aDQ+RGVhZGxpbmUgRGF0ZTwvaDQ+XCIgK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiPHAgaWQgPSAnZGlzcGxheVRhc2tfZGVhZGxpbmUnPjwvcD5cIiArXHJcbiAgICAgICAgICAgICAgICBcIjwvZGl2PlwiICtcclxuICAgICAgICAgICAgXCI8L2Rpdj5cIiArXHJcbiAgICAgICAgICAgIFwiPGRpdiBpZCA9ICdkaXNwbGF5VGFza19jb250Mic+XCIgK1xyXG4gICAgICAgICAgICAgICAgXCI8ZGl2PlwiICtcclxuICAgICAgICAgICAgICAgICAgICBcIjxoND5VcmdlbmN5PC9oND5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgXCI8cCBpZCA9ICdkaXNwbGF5VGFza191cmdlbmN5Jz48L3A+XCIgK1xyXG4gICAgICAgICAgICAgICAgXCI8L2Rpdj5cIiArXHJcbiAgICAgICAgICAgICAgICBcIjxkaXY+XCIgK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiPGg0PkRhdGUgQWRkZWQ8L2g0PlwiICtcclxuICAgICAgICAgICAgICAgICAgICBcIjxwIGlkID0gJ2Rpc3BsYXlUYXNrX2RhdGVDcmVhdGVkJz48L3A+XCIgK1xyXG4gICAgICAgICAgICAgICAgXCI8L2Rpdj5cIiArXHJcbiAgICAgICAgICAgIFwiPC9kaXY+XCIgK1xyXG4gICAgICAgICAgICBcIjxkaXYgaWQgPSAnZGlzcGxheVRhc2tfYnV0dG9uQ29udCc+XCIgK1xyXG4gICAgICAgICAgICAgICAgXCI8YnV0dG9uIGlkID0gJ2Rpc3BsYXlUYXNrX2VkaXRCdXR0b24nPkVkaXQ8L2J1dHRvbj5cIiArXHJcbiAgICAgICAgICAgICAgICBcIjxidXR0b24gaWQgPSAnZGlzcGxheVRhc2tfZGVsQnV0dG9uJz5EZWxldGU8L2J1dHRvbj5cIiArXHJcbiAgICAgICAgICAgICAgICBcIjxidXR0b24gaWQgPSAnZGlzcGxheVRhc2tfY2xvc2VCdXR0b24nPkNsb3NlPC9idXR0b24+XCIgK1xyXG4gICAgICAgIFwiPC9kaXY+XCIgK1xyXG4gICAgICAgIFwiPGRpdiBpZCA9ICdlbXB0eURpdicgb25sb2FkID0gJ2xvYWREaXNwbGF5VGFza0RvbSgpJz48L2Rpdj5cIiArXHJcbiAgICAgICAgXCI8L2Rpdj5cIjtcclxuXHJcbiAgICByZXR1cm4gZWxlbWVudDtcclxufVxyXG5cclxuICovXHJcbiIsIlxyXG5cclxuZXhwb3J0IGNvbnN0IGRpc3BsYXlQcm9qZWN0cyA9ICgpID0+IHtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaXNwbGF5UHJvamVjdENvbicpLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJzsgXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlzcGxheVRvZGF5Q29uJykuc3R5bGUuZGlzcGxheSA9ICdub25lJzsgXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlzcGxheVdlZWtDb24nKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnOyBcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaXNwbGF5TW9udGhDb24nKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnOyBcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGRpc3BsYXlUb2RheSA9ICgpID0+IHtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaXNwbGF5UHJvamVjdENvbicpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7IFxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rpc3BsYXlUb2RheUNvbicpLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJzsgXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlzcGxheVdlZWtDb24nKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rpc3BsYXlNb250aENvbicpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7IFxyXG59XHJcbmV4cG9ydCBjb25zdCBkaXNwbGF5V2VlayA9ICgpID0+IHtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaXNwbGF5UHJvamVjdENvbicpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7IFxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rpc3BsYXlUb2RheUNvbicpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlzcGxheVdlZWtDb24nKS5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7IFxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rpc3BsYXlNb250aENvbicpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7IFxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZGlzcGxheU1vbnRoID0gKCkgPT4ge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rpc3BsYXlQcm9qZWN0Q29uJykuc3R5bGUuZGlzcGxheSA9ICdub25lJzsgXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlzcGxheVRvZGF5Q29uJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaXNwbGF5V2Vla0NvbicpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlzcGxheU1vbnRoQ29uJykuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snOyBcclxufVxyXG5cclxuLy90aGlzIGRvZXNuJ3Qgd29yay5cclxuLy95b3UgaGF2ZSB0byB1c2UgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SURcclxuLypcclxuXHJcbmNvbnN0IGRpc3BsYXlDb250ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rpc3BsYXlDb250YWluZXInKTtcclxuY29uc3QgcHJvamVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaXNwbGF5UHJvamVjdENvbicpO1xyXG5jb25zdCB0b2RheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaXNwbGF5VG9kYXlDb24nKTtcclxuY29uc3Qgd2VlayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaXNwbGF5V2Vla0NvbicpO1xyXG5jb25zdCBtb250aCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaXNwbGF5TW9udGhDb24nKTtcclxuXHJcbmV4cG9ydCBjb25zdCBkaXNwbGF5UHJvamVjdHMgPSAoKSA9PiB7XHJcbiAgICBwcm9qZWN0LnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJzsgXHJcbiAgICB0b2RheS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnOyBcclxuICAgIHdlZWsuc3R5bGUuZGlzcGxheSA9ICdub25lJzsgXHJcbiAgICBtb250aC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnOyBcclxuICAgIGNvbnNvbGUubG9nKFwicHJvamVjdHNcIilcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGRpc3BsYXlUb2RheSA9ICgpID0+IHtcclxuICAgIHByb2plY3Quc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgIHRvZGF5LnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJztcclxuICAgIHdlZWsuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgIG1vbnRoLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7IFxyXG4gICAgY29uc29sZS5sb2coXCJ0b2RheVwiKVxyXG59XHJcbmV4cG9ydCBjb25zdCBkaXNwbGF5V2VlayA9ICgpID0+IHtcclxuICAgIHByb2plY3Quc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgIHRvZGF5LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICB3ZWVrLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJztcclxuICAgIG1vbnRoLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7IFxyXG4gICAgY29uc29sZS5sb2coXCJ3ZWVrXCIpXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBkaXNwbGF5TW9udGggPSAoKSA9PiB7XHJcbiAgICBwcm9qZWN0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICB0b2RheS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgd2Vlay5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgbW9udGguc3R5bGUuZGlzcGxheSA9ICdkaXNwbGF5LWJsb2NrJzsgXHJcbiAgICBjb25zb2xlLmxvZyhcIm1vbnRoXCIpXHJcbn1cclxuKi8iLCJpbXBvcnQgeyBoYW5kbGVTZWNvbmRhcnlBZGRUYXNrLCBjbG9zZVNlY0FkZFRhc2tQYW5lbCB9IGZyb20gJy4vYWRkVGFzay5qcyc7IFxyXG5cclxudmFyIFByb2plY3RJRCA9ICcnO1xyXG5cclxuZXhwb3J0IGNvbnN0IEFkZEZ1bmNUb1NlY0J1dHRvbnMgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBTZWNBZGRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkVGFza0J1dHRvbi1TRUMnKTtcclxuICAgIFNlY0FkZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHsgaGFuZGxlU2Vjb25kYXJ5QWRkVGFzayhQcm9qZWN0SUQpIH0pXHJcblxyXG4gICAgY29uc3QgU2VjQ2FuY2VsQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0NhbmNlbEFkZFRhc2tCdXR0b24tU0VDJylcclxuICAgIFNlY0NhbmNlbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlU2VjQWRkVGFza1BhbmVsKTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHNldFByb2plY3RJRCA9IChJRCkgPT4ge1xyXG4gICAgUHJvamVjdElEID0gSUQ7IFxyXG59IiwiaW1wb3J0IHsgZ2V0QXV0aCwgc2lnbk91dCB9IGZyb20gJ2ZpcmViYXNlL2F1dGgnXHJcblxyXG5jb25zdCBhdXRoID0gZ2V0QXV0aCgpOyBcclxuXHJcbmV4cG9ydCBjb25zdCBoYW5kbGVTaWduT3V0ID0gKCkgPT4ge1xyXG4gICAgc2lnbk91dChhdXRoKS50aGVuKCgpID0+IHtcclxuICAgICAgICBhbGVydCgnWW91IGhhdmUgc3VjY2Vzc2Z1bCBzaWduZWQgb3V0JylcclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCByZW5kZXJTaWduT3V0QnV0dG9uID0gKCkgPT4ge1xyXG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpOyBcclxuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdpZCcsICdzaWduT3V0QnV0dG9uJyk7IFxyXG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZVNpZ25PdXQpOyBcclxuICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gJ1NpZ24gT3V0JzsgXHJcbiAgICByZXR1cm4gZWxlbWVudDsgXHJcbn0iLCJ2YXIgY3VycmVudFVzZXIgPSB7XHJcbiAgICBuYW1lOiAnJywgXHJcbiAgICBlbWFpbDogJycsIFxyXG4gICAgdXNlcklEOiAnJywgXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBnZXRVc2VySW5mbyA9IChmTmFtZSwgZW1haWxBZGRyZXNzLCBJRCkgPT57XHJcbiAgICBjdXJyZW50VXNlci5uYW1lID0gZk5hbWU7IFxyXG4gICAgY3VycmVudFVzZXIuZW1haWwgPSBlbWFpbEFkZHJlc3M7XHJcbiAgICBjdXJyZW50VXNlci51c2VySUQgPSBJRDsgXHJcblxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgY2hlY2tQYXNzID0gKHBhc3MpID0+IHtcclxuICAgIGlmIChwYXNzLnRyaW0oKS5sZW5ndGggPD0gMCkge1xyXG4gICAgICAgIGFsZXJ0KCdQbGVhc2UsIHR5cGUgaW4geW91ciBwYXNzd29yZC4nKVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiB0cnVlOyBcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGNoZWNrQWxsUGFzcyA9IChwYXNzLCBjb25maXJtUGFzcykgPT4ge1xyXG4gICAgaWYgKHBhc3MubGVuZ3RoIDw9IDApIHtcclxuICAgICAgICBhbGVydCgnUGxlYXNlLCB0eXBlIGluIHlvdXIgcGFzc3dvcmQuJylcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBpZiAoY29uZmlybVBhc3MubGVuZ3RoIDw9IDApIHtcclxuICAgICAgICAgICAgYWxlcnQoJ1BsZWFzZSwgcmV0eXBlIHlvdXIgcGFzc3dvcmQgdG8gY29uZmlybSBpdC4nKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAocGFzcy50cmltKCkgPT09IGNvbmZpcm1QYXNzLnRyaW0oKSlcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KCdUaGUgcGFzc3dvcmRzIHlvdSB0eXBlZCBkbyBub3QgbWF0Y2guXFxuIFBsZWFzZSwgdHJ5IGFnYWluLiAnKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBjaGVja0ZpcnN0ID0gbmFtZSA9PiB7XHJcbiAgICBpZiAobmFtZS5sZW5ndGggPD0gMCkge1xyXG4gICAgICAgIGFsZXJ0KCdQbGVhc2UsIHR5cGUgaW4geW91ciBmaXJzdCBuYW1lLicpXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlOyBcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgICAgICByZXR1cm4gdHJ1ZTsgIFxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgY2hlY2tMYXN0ID0gbmFtZSA9PiB7XHJcbiAgICBpZiAobmFtZS5sZW5ndGggPD0gMCkge1xyXG4gICAgICAgIGFsZXJ0KCdQbGVhc2UsIHR5cGUgaW4geW91ciBsYXN0IG5hbWUuJylcclxuICAgICAgICByZXR1cm4gZmFsc2U7IFxyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgY2hlY2tFbWFpbCA9IGVtYWlsID0+IHtcclxuICAgIGlmIChlbWFpbC5sZW5ndGggPD0gMCkge1xyXG4gICAgICAgIGFsZXJ0KCdQbGVhc2UsIHR5cGUgaW4geW91ciBlbWFpbC4nKVxyXG4gICAgICAgIHJldHVybiBmYWxzZTsgXHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBjb25zdCBhcnIgPSBlbWFpbC50cmltKCkuc3BsaXQoJ0AnKTtcclxuICAgICAgICBpZiAoYXJyLmxlbmd0aCA+PSAyICYmIGFyclsxXSkge1xyXG4gICAgICAgICAgICBjb25zdCBhcnIyID0gZW1haWwudHJpbSgpLnNwbGl0KCcuJylcclxuICAgICAgICAgICAgaWYgKGFycjIubGVuZ3RoID49IDIgJiYgYXJyMlsxXSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwiWW91ciBlbWFpbCBpcyBpbnZhbGlkLiBQbGVhc2UsIHRyeSBhZ2Fpbi5cIilcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTsgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiWW91ciBlbWFpbCBpcyBpbnZhbGlkLiBQbGVhc2UsIHRyeSBhZ2Fpbi5cIilcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAgICAgXHJcbn0iLCJpbXBvcnQgeyBnZXRBdXRoLCBzaWduSW5XaXRoRW1haWxBbmRQYXNzd29yZCB9IGZyb20gJ2ZpcmViYXNlL2F1dGgnOyBcclxuaW1wb3J0IHsgY2hlY2tFbWFpbCwgY2hlY2tQYXNzIH0gZnJvbSAnLi9jaGVja0F1dGguanMnOyBcclxuXHJcbmNvbnN0IHNpZ25JblBhZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lnbkluJyk7XHJcbmNvbnN0IHNpZ25VcFBhZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lnblVwJyk7XHJcbmNvbnN0IG1haW5QYWdlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYWluUGFnZXMnKTsgXHJcblxyXG5jb25zdCBhdXRoID0gZ2V0QXV0aCgpOyBcclxuXHJcbmNvbnN0IGluaXRpYWxVc2VySW5mbyA9ICh7XHJcbiAgICBlbWFpbDogJycsXHJcbiAgICBwYXNzd29yZDogJycsXHJcbn0pXHJcblxyXG5cclxudmFyIHVzZXJJbmZvID0gKHtcclxuICAgIGVtYWlsOiAnJyxcclxuICAgIHBhc3N3b3JkOiAnJyxcclxufSlcclxuXHJcblxyXG5leHBvcnQgY29uc3QgR29TaWduVXAgPSAoKSA9PiB7XHJcbiAgICBzaWduSW5QYWdlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICBzaWduVXBQYWdlLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJzsgXHJcbiAgICBtYWluUGFnZXMuc3R5bGUuZGlzcGxheSA9ICdub25lJzsgXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBoYW5kbGVTaWduSW4gPSAoKSA9PiB7XHJcbiAgICB2YXIgY3VycmVudFVzZXIgPSBudWxsOyBcclxuICAgIHVzZXJJbmZvLmVtYWlsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpZ25Jbl9lbWFpbCcpLnZhbHVlO1xyXG4gICAgdXNlckluZm8ucGFzc3dvcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lnbkluX3Bhc3MnKS52YWx1ZTsgXHJcbiAgICAvL2NvbnNvbGUubG9nKHVzZXJJbmZvKVxyXG4gICAgaWYgKGNoZWNrRW1haWwodXNlckluZm8uZW1haWwpICYmIGNoZWNrUGFzcyh1c2VySW5mby5wYXNzd29yZCkpIHtcclxuICAgICAgICBzaWduSW5XaXRoRW1haWxBbmRQYXNzd29yZChhdXRoLCB1c2VySW5mby5lbWFpbCwgdXNlckluZm8ucGFzc3dvcmQpXHJcbiAgICAgICAgICAgIC50aGVuKCh1c2VyQ3JlZGVudGlhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoJ1lvdSBhcmUgbm93IGxvZ2dlZCBpbi4gXFxuIFdlbGNvbWUgYmFjay4nKVxyXG4gICAgICAgICAgICAgICAgY3VycmVudFVzZXIgPSB1c2VyQ3JlZGVudGlhbC51c2VyOyBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZXJyb3JDb2RlID0gZXJyb3IuY29kZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGVycm9yLm1lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICBhbGVydChlcnJvckNvZGUgKyAnOiAnICsgZXJyb3JNZXNzYWdlKTsgXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGN1cnJlbnRVc2VyOyBcclxufVxyXG5cclxuXHJcbmV4cG9ydCBjb25zdCByZW5kZXJTaWduSW5QYWdlID0gKCkgPT4ge1xyXG4gICAgY29uc3QgZWxlbWVudCA9IFwiPGRpdiBpZCA9ICdzaWduSW5Db250YWluZXInPlwiICtcclxuICAgICAgICBcIjxoMSBpZCA9ICd0aXRsZSc+U2lnbiBpbnRvIHlvdXIgYWNjb3VudDwvaDE+XCIgK1xyXG4gICAgICAgIFwiPGRpdiBpZCA9ICdpbm5lckNvbnRhaW5lcic+XCIgKyBcclxuICAgICAgICAgICAgXCI8ZGl2IGlkID0gJ2lucHV0RmllbGQnPlwiICtcclxuICAgICAgICAgICAgXCI8aDI+RW1haWw8L2gyPlwiICtcclxuICAgICAgICAgICAgXCI8aW5wdXQgdHlwZSA9ICd0ZXh0JyBpZCA9ICdzaWduSW5fZW1haWwnIGNsYXNzID0gJ3RleHRJbnB1dCc+XCIgK1xyXG4gICAgICAgICAgICBcIjwvZGl2PlwiICtcclxuICAgICAgICAgICAgXCI8ZGl2IGlkID0gJ2lucHV0RmllbGQnPlwiICtcclxuICAgICAgICAgICAgXCI8aDI+UGFzc3dvcmQ8L2gyPlwiICtcclxuICAgICAgICAgICAgXCI8aW5wdXQgdHlwZSA9ICd0ZXh0JyBpZCA9ICdzaWduSW5fcGFzcycgY2xhc3MgPSAndGV4dElucHV0Jz5cIiArXHJcbiAgICAgICAgICAgIFwiPC9kaXY+XCIgK1xyXG4gICAgICAgIFwiPC9kaXY+XCIgKyBcclxuICAgICAgICBcIjxkaXYgaWQgPSAnYnV0dG9uQ29udGFpbmVyJyA+PGJyIC8+XCIgK1xyXG4gICAgICAgIFwiPGJ1dHRvbiBpZCA9ICdzaWduSW5CdXR0b24nPlNpZ24gSW48L2J1dHRvbj5cIiArXHJcbiAgICAgICAgXCI8L2Rpdj5cIiArXHJcbiAgICAgICAgXCI8ZGl2IGlkID0gJ3NlY29uZFF1ZXN0Q29udGFpbmVyJz5cIiArXHJcbiAgICAgICAgICAgIFwiPGgyPkRvbid0IGhhdmUgYW4gYWNjb3VudD88L2gyPlwiICtcclxuICAgICAgICAgICAgXCI8YnV0dG9uIGlkID0gJ2dvU2lnblVwQnV0dG9uJz5TaWduIFVwPC9idXR0b24+XCIgK1xyXG4gICAgICAgIFwiPC9kaXY+XCIgK1xyXG4gICAgICAgIFwiPC9kaXY+XCJcclxuXHJcbiAgICByZXR1cm4gZWxlbWVudDsgXHJcbn1cclxuIiwiaW1wb3J0IGZpcmViYXNlIGZyb20gJ2ZpcmViYXNlL2NvbXBhdC9hcHAnOyBcclxuaW1wb3J0IHsgZG9jLCBzZXREb2MgfSBmcm9tICdmaXJlYmFzZS9maXJlc3RvcmUnO1xyXG5pbXBvcnQgeyBnZXRBdXRoLCBjcmVhdGVVc2VyV2l0aEVtYWlsQW5kUGFzc3dvcmR9IGZyb20gJ2ZpcmViYXNlL2F1dGgnOyBcclxuaW1wb3J0IHsgY2hlY2tBbGxQYXNzLCBjaGVja0VtYWlsLCBjaGVja0ZpcnN0LCBjaGVja0xhc3QsIGdldFVzZXJJbmZvIH0gZnJvbSAnLi9jaGVja0F1dGguanMnOyBcclxuaW1wb3J0IHsgZGIgfSBmcm9tICcuLi9pbml0aWFsaXplRmlyZWJhc2UuanMnO1xyXG5cclxuY29uc3Qgc2lnbkluUGFnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWduSW4nKTtcclxuY29uc3Qgc2lnblVwUGFnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWduVXAnKTtcclxuY29uc3QgbWFpblBhZ2VzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21haW5QYWdlcycpOyBcclxuXHJcblxyXG5jb25zdCBpbml0aWFsVXNlckluZm8gPSAoe1xyXG4gICAgZmlyc3ROYW1lOiAnJywgXHJcbiAgICBsYXN0TmFtZTogJycsIFxyXG4gICAgZW1haWw6ICcnLCBcclxuICAgIHBhc3N3b3JkOiAnJywgXHJcbiAgICBjb25maXJtUGFzczogJycsIFxyXG59KVxyXG5cclxuXHJcbnZhciB1c2VySW5mbyA9ICh7XHJcbiAgICBmaXJzdE5hbWU6ICcnLFxyXG4gICAgbGFzdE5hbWU6ICcnLFxyXG4gICAgZW1haWw6ICcnLFxyXG4gICAgcGFzc3dvcmQ6ICcnLFxyXG4gICAgY29uZmlybVBhc3M6ICcnLFxyXG59KVxyXG5cclxuZXhwb3J0IGNvbnN0IEdvU2lnbkluID0gKCkgPT4ge1xyXG4gICAgc2lnbkluUGFnZS5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XHJcbiAgICBzaWduVXBQYWdlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICBtYWluUGFnZXMuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xyXG59XHJcblxyXG5jb25zdCBhdXRoID0gZ2V0QXV0aCgpOyBcclxuXHJcbmV4cG9ydCBjb25zdCBoYW5kbGVTaWduVXAgPSAoKSA9PiB7XHJcbiAgICB1c2VySW5mby5maXJzdE5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZk5hbWUnKS52YWx1ZTsgXHJcbiAgICB1c2VySW5mby5sYXN0TmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdMYXN0X05hbWUnKS52YWx1ZTsgXHJcbiAgICB1c2VySW5mby5lbWFpbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbWFpbEFkZHJlc3MnKS52YWx1ZTtcclxuICAgIHVzZXJJbmZvLnBhc3N3b3JkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bhc3N3b3JkX2lucHV0JykudmFsdWU7IFxyXG4gICAgdXNlckluZm8uY29uZmlybVBhc3MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29uZmlybVBhc3N3b3JkJykudmFsdWU7IFxyXG4gICAgY29uc29sZS5sb2codXNlckluZm8pXHJcbiAgICBpZiAoY2hlY2tGaXJzdCh1c2VySW5mby5maXJzdE5hbWUpICYmIGNoZWNrTGFzdCh1c2VySW5mby5sYXN0TmFtZSkgJiYgY2hlY2tFbWFpbCh1c2VySW5mby5lbWFpbCkgJiYgY2hlY2tBbGxQYXNzKHVzZXJJbmZvLnBhc3N3b3JkLCB1c2VySW5mby5jb25maXJtUGFzcykpIHtcclxuICAgICAgICBjcmVhdGVVc2VyV2l0aEVtYWlsQW5kUGFzc3dvcmQoYXV0aCwgdXNlckluZm8uZW1haWwsIHVzZXJJbmZvLnBhc3N3b3JkKS50aGVuKGFzeW5jICh1c2VyQ3JlZGVudGlhbHMpID0+IHtcclxuICAgICAgICAgICAgYXdhaXQgc2V0RG9jKGRvYyhkYiwgJ3VzZXJzJywgYXV0aC5jdXJyZW50VXNlci51aWQpLCB7XHJcbiAgICAgICAgICAgICAgICBlbWFpbDogdXNlckluZm8uZW1haWwsIFxyXG4gICAgICAgICAgICAgICAgZmlyc3RfbmFtZTogdXNlckluZm8uZmlyc3ROYW1lLCBcclxuICAgICAgICAgICAgICAgIGxhc3RfbmFtZTogdXNlckluZm8ubGFzdE5hbWUgXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGFsZXJ0KCdZb3VyIGFjY291bnQgaGFzIGJlZW4gY3JlYXRlZC4nKVxyXG4gICAgICAgICAgICBnZXRVc2VySW5mbyh1c2VySW5mby5maXJzdE5hbWUsIHVzZXJJbmZvLmVtYWlsLCBhdXRoLmN1cnJlbnRVc2VyLnVpZClcclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IuY29kZSA9PT0gJ2F1dGgvZW1haWwtYWxyZWFkeS1pbi11c2UnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJUaGUgZW1haWwgeW91IHR5cGVkIGlzIGFscmVhZHkgaW4gdXNlLlwiKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICBhbGVydChlcnJvci5jb2RlICsgXCI6IFwiICsgZXJyb3IubWVzc2FnZSlcclxuICAgICAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHJlbmRlclNpZ25VcFBhZ2UgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBlbGVtZW50ID0gXCI8ZGl2IGlkID0gJ3NpZ25JbkNvbnRhaW5lcic+XCIgK1xyXG4gICAgICAgIFwiPGgxIGlkID0gJ3RpdGxlJz5DcmVhdGUgYSBuZXcgYWNjb3VudDwvaDE+XCIgKyBcclxuICAgICAgICBcIjxkaXYgaWQgPSAnaW5uZXJDb250YWluZXInPlwiICsgXHJcbiAgICAgICAgICAgIFwiPGRpdiBpZCA9ICdpbnB1dEZpZWxkJyA+XCIgK1xyXG4gICAgICAgICAgICAgICAgXCI8aDI+Rmlyc3QgTmFtZTwvaDI+XCIgKyBcclxuICAgICAgICAgICAgICAgIFwiPGlucHV0IHR5cGUgPSAndGV4dCcgaWQgPSAnZk5hbWUnIGNsYXNzID0gJ3RleHRJbnB1dCc+XCIgKyBcclxuICAgICAgICAgICAgXCI8L2Rpdj5cIiArIFxyXG4gICAgICAgICAgICBcIjxkaXYgaWQgPSAnaW5wdXRGaWVsZCc+XCIgK1xyXG4gICAgICAgICAgICAgICAgXCI8aDI+TGFzdCBOYW1lPC9oMj5cIiArXHJcbiAgICAgICAgICAgICAgICBcIjxpbnB1dCB0eXBlID0gJ3RleHQnIGlkID0gJ0xhc3RfTmFtZScgY2xhc3MgPSAndGV4dElucHV0Jz5cIiArXHJcbiAgICAgICAgICAgIFwiPC9kaXY+XCIgKyBcclxuICAgICAgICAgICAgXCI8ZGl2IGlkID0gJ2lucHV0RmllbGQnPlwiICtcclxuICAgICAgICAgICAgICAgIFwiPGgyPkVtYWlsPC9oMj5cIiArXHJcbiAgICAgICAgICAgICAgICBcIjxpbnB1dCB0eXBlID0gJ3RleHQnIGlkID0gJ2VtYWlsQWRkcmVzcycgY2xhc3MgPSAndGV4dElucHV0Jz5cIiArXHJcbiAgICAgICAgICAgIFwiPC9kaXY+XCIgKyBcclxuICAgICAgICAgICAgXCI8ZGl2IGlkID0gJ2lucHV0RmllbGQnPlwiICtcclxuICAgICAgICAgICAgICAgIFwiPGgyPlBhc3N3b3JkPC9oMj5cIiArXHJcbiAgICAgICAgICAgICAgICBcIjxpbnB1dCB0eXBlID0gJ3RleHQnIGlkID0gJ3Bhc3N3b3JkX2lucHV0JyBjbGFzcyA9ICd0ZXh0SW5wdXQnPlwiICtcclxuICAgICAgICAgICAgXCI8L2Rpdj5cIiArIFxyXG4gICAgICAgICAgICBcIjxkaXYgaWQgPSAnaW5wdXRGaWVsZCc+XCIgK1xyXG4gICAgICAgICAgICAgICAgXCI8aDI+Q29uZmlybSBwYXNzd29yZDwvaDI+XCIgK1xyXG4gICAgICAgICAgICAgICAgXCI8aW5wdXQgdHlwZSA9ICd0ZXh0JyBpZCA9ICdjb25maXJtUGFzc3dvcmQnIGNsYXNzID0gJ3RleHRJbnB1dCc+XCIgK1xyXG4gICAgICAgICAgICBcIjwvZGl2PlwiICsgXHJcbiAgICAgICAgXCI8L2Rpdj48YnIgLz5cIiArIFxyXG4gICAgICAgIFwiPGRpdiBpZCA9ICdidXR0b25Db250YWluZXInID5cIiArIFxyXG4gICAgICAgICAgICBcIjxidXR0b24gaWQgPSAnc2lnblVwQnV0dG9uJz5TaWduIFVwPC9idXR0b24+XCIgKyBcclxuICAgICAgICBcIjwvZGl2PlwiICtcclxuICAgICAgICBcIjxkaXYgaWQgPSAnc2Vjb25kUXVlc3RDb250YWluZXInPlwiICsgXHJcbiAgICAgICAgICAgIFwiPGgyPkFscmVhZHkgaGF2ZSBhbiBhY2NvdW50PzwvaDI+XCIgKyBcclxuICAgICAgICAgICAgXCI8YnV0dG9uIGlkID0gJ2dvU2lnbkluQnV0dG9uJz5TaWduIEluPC9idXR0b24+XCIgKyBcclxuICAgICAgICBcIjwvZGl2PlwiICsgXHJcbiAgICBcIjwvZGl2PlwiXHJcblxyXG4gICAgcmV0dXJuIGVsZW1lbnQ7XHJcbn0iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcImJvZHkge1xcclxcbiAgICBmb250LWZhbWlseTogVmVyZGFuYTtcXHJcXG59XFxyXFxuXFxyXFxuI2NvbnRhaW5lciwgI3NpZ25JbiwgI3NpZ25VcCwgI21haW5QYWdlcyB7XFxyXFxud2lkdGg6IDEwMCU7IFxcclxcbm1hcmdpbi1sZWZ0OiBhdXRvO1xcclxcbm1hcmdpbi1yaWdodDogYXV0bzsgXFxyXFxudGV4dC1hbGlnbjogY2VudGVyO1xcclxcbnRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuI3NpZ25JbiwgI3NpZ25VcCwgI21haW5QYWdlcyB7XFxyXFxuZGlzcGxheTogbm9uZTsgXFxyXFxufVxcclxcblxcclxcbiNzaWduSW5Db250YWluZXIge1xcclxcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcXHJcXG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICMwMDAwMDA7XFxyXFxuICAgIHdpZHRoOiA2MCU7XFxyXFxuICAgIGhlaWdodDogMTAwdmg7XFxyXFxufVxcclxcblxcclxcbiNpbnB1dEZpZWxkIHtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuXFxyXFxufVxcclxcblxcclxcbi50ZXh0SW5wdXQge1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XFxyXFxuICAgIG1hcmdpbi1yaWdodDogYXV0bztcXHJcXG59XFxyXFxuXFxyXFxuI3RpdGxlIHtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4jaW5uZXJDb250YWluZXIge1xcclxcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcXHJcXG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcclxcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xcclxcbiAgICB3aWR0aDogOTAlO1xcclxcblxcclxcbn1cXHJcXG5cXHJcXG4jaW5wdXRGaWVsZCBoMiB7XFxyXFxuICAgIHRleHQtYWxpZ246IGxlZnQ7XFxyXFxufVxcclxcblxcclxcbiNtZW1iZXItaW5uZXJDb250YWluZXIge1xcclxcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcXHJcXG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICMwMDAwMDA7XFxyXFxuICAgIHdpZHRoOiA5MCU7XFxyXFxuICAgIGhlaWdodDogMTAwdmg7XFxyXFxuICAgIG1pbi1oZWlnaHQ6IDY1MHB4O1xcclxcbiAgICBkaXNwbGF5OiBmbGV4OyBcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuI2NlbnRlcl9jb250YWluZXIge1xcclxcbiAgICBtYXJnaW4tdG9wOiBhdXRvO1xcclxcbiAgICBtYXJnaW4tYm90dG9tOiBhdXRvO1xcclxcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcXHJcXG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gICAgd2lkdGg6IDk1JTtcXHJcXG4gICAgaGVpZ2h0OiA5NSU7XFxyXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuI3NpZGUtcGFuZWwge1xcclxcbiAgICB3aWR0aDogMzAlO1xcclxcbn1cXHJcXG4jb3V0cHV0LXBhbmVsIHtcXHJcXG4gICAgd2lkdGg6IDY1JVxcclxcbn1cXHJcXG5cXHJcXG4jc2lkZS1wYW5lbCwgI291dHB1dC1wYW5lbCB7XFxyXFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICMwMDAwMDA7IFxcclxcbiAgICBoZWlnaHQ6IDEwMCU7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgICBtYXJnaW46IGF1dG87XFxyXFxuICAgIGRpc3BsYXk6IGJsb2NrOyBcXHJcXG59XFxyXFxuXFxyXFxuLypBZG1pbiBQYW5lbCovXFxyXFxuI2FkbWluUGFuZWxDb250YWluZXIge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICB3aWR0aDogNzAlO1xcclxcbiAgICBtYXJnaW46IGF1dG87XFxyXFxufVxcclxcblxcclxcbiNhZG1pblBhbmVsIHtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIHRhYmxlLWxheW91dDogZml4ZWQ7XFxyXFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxyXFxuICAgIG1hcmdpbjogMDtcXHJcXG4gICAgcGFkZGluZzogMDtcXHJcXG59XFxyXFxuXFxyXFxuI2FkbWluUGFuZWwgbGkge1xcclxcbiAgICAvKiBib3JkZXI6IDFweCBzb2xpZCAjOTg5ODk4OyAqL1xcclxcbiAgICB3aWR0aDogOTAlO1xcclxcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xcclxcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcXHJcXG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcclxcblxcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG5cXHJcXG4jYWRtaW4tdGl0bGUge1xcclxcbiAgICBmb250LXdlaWdodDogYm9sZDtcXHJcXG4gICAgZm9udC1zaXplOiAzMHB4OyBcXHJcXG4gICAgbWFyZ2luLXRvcDogMjBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmFkbWluLW9wdGlvbnMge1xcclxcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xcclxcbiAgICBtYXJnaW4tdG9wOiAyMHB4O1xcclxcbiAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcclxcbiAgICBoZWlnaHQ6IDMwcHg7XFxyXFxuICAgIHBhZGRpbmctbGVmdDogMzBweDtcXHJcXG4gICAgYm9yZGVyOiBub25lO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcXHJcXG4gICAgZm9udC1zaXplOiAyMHB4O1xcclxcbiAgICBmb250LWZhbWlseTogVmVyZGFuYTtcXHJcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXHJcXG4gICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XFxyXFxufVxcclxcblxcclxcblxcclxcbi5hZG1pbi1vcHRpb25zOmhvdmVyIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzk4OTg5ODtcXHJcXG59XFxyXFxuXFxyXFxuLmFkbWluLW9wdGlvbnM6YWN0aXZlIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2QxZDFkMTtcXHJcXG59XFxyXFxuXFxyXFxuLnNlbGVjdGVkVmlldyB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM5ODk4OTg7XFxyXFxufVxcclxcblxcclxcblxcclxcbi8qQWRkIFByb2plY3QgUGFuZWwqL1xcclxcbiNhZGRQcm9qZWN0UGFuZWwge1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIGRpc3BsYXk6IG5vbmU7XFxyXFxuICAgIHotaW5kZXg6IDE7XFxyXFxuICAgIG1pbi13aWR0aDogNjAwcHg7XFxyXFxuICAgIG1pbi1oZWlnaHQ6IDYwJTtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ViZWJlYjtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuI2FkZFByb2plY3RQYW5lbENvbnRhaW5lciB7XFxyXFxuICAgIG1hcmdpbi10b3A6IGF1dG87XFxyXFxuICAgIG1hcmdpbi1ib3R0b206IGF1dG87XFxyXFxuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xcclxcbiAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICB3aWR0aDogOTUlO1xcclxcbiAgICBoZWlnaHQ6IDk1JTtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4jYWRkX3Byb2plY3RUaXRsZSwgI2FkZF90YXNrTmFtZSwgI2FkZF90YXNrTmFtZS1TRUMge1xcclxcbiAgICB3aWR0aDogODUlO1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiBWZXJkYW5hO1xcclxcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xcclxcbiAgICBoZWlnaHQ6IDMwcHg7XFxyXFxufVxcclxcblxcclxcbiNhZGRQcm9qZWN0XzJuZGNvbnRhaW5lciB7XFxyXFxuICAgIHdpZHRoOiA2MCU7XFxyXFxuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xcclxcbiAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XFxyXFxuICAgIG1hcmdpbi10b3A6IDQwcHg7XFxyXFxuICAgIG1hcmdpbi1ib3R0b206IDQwcHg7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG59XFxyXFxuXFxyXFxuI3Byb2plY3Rfc3RhdHVzX2lucHV0LCAjcHJvamVjdF9kZWFkbGluZV9pbnB1dCB7XFxyXFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG59XFxyXFxuXFxyXFxuI3Byb2plY3Rfc3RhdHVzX2lucHV0IHtcXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuI2FkZFByb2plY3Rfc2VsZWN0aW9uIHtcXHJcXG4gICAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XFxyXFxuICAgIHBhZGRpbmc6IDVweDtcXHJcXG59XFxyXFxuXFxyXFxuI3Byb2plY3RfZGVhZGxpbmVfaW5wdXQgaW5wdXQsICN0YXNrX2RlYWRsaW5lSW5wdXQsXFxyXFxuI2FkZFRhc2tfdXJnZW5jeSwgI2FkZFRhc2tfc3RhdHVzLCAjQWRkVGFza19Qcm9qZWN0Q2F0ZWdvcnlfU2VsZWN0aW9uLFxcclxcbiNhZGRUYXNrX3N0YXR1cy1TRUMsICNhZGRUYXNrX3VyZ2VuY3ktU0VDLCAjdGFza19kZWFkbGluZUlucHV0LVNFQyB7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xcclxcbiAgICBwYWRkaW5nOiA1cHg7XFxyXFxufVxcclxcblxcclxcbiNBZGRQcm9qZWN0QnV0dG9uQ29udGFpbmVyLCAjQWRkVGFza0J1dHRvbkNvbnRhaW5lciB7XFxyXFxuICAgIHdpZHRoOiA2MCU7XFxyXFxuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xcclxcbiAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XFxyXFxufVxcclxcblxcclxcbiNhZGRQcm9qZWN0QnV0dG9uLCAjYWRkVGFza0J1dHRvbiwgI2FkZFRhc2tCdXR0b24tU0VDLCAjZGlzcGxheVRhc2tfZWRpdEJ1dHRvbiwgI2Rpc3BsYXlUYXNrX2RlbEJ1dHRvbiwgI2Rpc3BsYXlUYXNrX2Nsb3NlQnV0dG9uIHtcXHJcXG4gICAgYm9yZGVyOiBub25lO1xcclxcbiAgICBmb250LWZhbWlseTogVmVyZGFuYTtcXHJcXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM5ODk4OTg7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxyXFxuICAgIGZvbnQtc2l6ZTogMjBweDtcXHJcXG4gICAgcGFkZGluZy1sZWZ0OiA1MHB4O1xcclxcbiAgICBwYWRkaW5nLXJpZ2h0OiA1MHB4O1xcclxcbiAgICBjb2xvcjogI2ZmZmZmZjtcXHJcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcclxcbn1cXHJcXG5cXHJcXG4jYWRkUHJvamVjdEJ1dHRvbjphY3RpdmUsXFxyXFxuI0NhbmNlbEFkZFByb2plY3RCdXR0b246YWN0aXZlLFxcclxcbiNDYW5jZWxBZGRUYXNrQnV0dG9uOmFjdGl2ZSxcXHJcXG4jYWRkVGFza0J1dHRvbjphY3RpdmUsXFxyXFxuI2FkZFRhc2tCdXR0b24tU0VDOmFjdGl2ZSxcXHJcXG4jQ2FuY2VsQWRkVGFza0J1dHRvbi1TRUM6YWN0aXZlLFxcclxcbiNkaXNwbGF5VGFza19lZGl0QnV0dG9uOmFjdGl2ZSxcXHJcXG4jZGlzcGxheVRhc2tfZGVsQnV0dG9uOmFjdGl2ZSxcXHJcXG4jZGlzcGxheVRhc2tfY2xvc2VCdXR0b246YWN0aXZlIHtcXHJcXG4gICAgICAgIGJvcmRlcjogMnB4IHNvbGlkICMwMDAwMDA7XFxyXFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWJlYmViO1xcclxcbiAgICAgICAgZm9udC1zaXplOiAyMHB4O1xcclxcbiAgICAgICAgY29sb3I6ICMwMDAwMDA7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4jQ2FuY2VsQWRkUHJvamVjdEJ1dHRvbiwgI0NhbmNlbEFkZFRhc2tCdXR0b24sICNDYW5jZWxBZGRUYXNrQnV0dG9uLVNFQyB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMzMzMzMzM7XFxyXFxuICAgIGZvbnQtc2l6ZTogMjBweDtcXHJcXG4gICAgY29sb3I6ICNmZmZmZmY7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiBWZXJkYW5hO1xcclxcbiAgICBmb250LXdlaWdodDogYm9sZDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcXHJcXG4gICAgZm9udC1zaXplOiAyMHB4O1xcclxcbiAgICBwYWRkaW5nLWxlZnQ6IDUwcHg7XFxyXFxuICAgIHBhZGRpbmctcmlnaHQ6IDUwcHg7XFxyXFxuICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XFxyXFxufVxcclxcblxcclxcblxcclxcbiNBZGRQcm9qZWN0QnV0dG9uQ29udGFpbmVyX2JveDEsICNBZGRUYXNrQnV0dG9uQ29udGFpbmVyX2JveDEge1xcclxcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG5cXHJcXG4vKkFkZCBUYXNrIFBhbmVsKi9cXHJcXG5cXHJcXG4jYWRkVGFza1BhbmVsIHtcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICBkaXNwbGF5OiBub25lO1xcclxcbiAgICB6LWluZGV4OiAxO1xcclxcbiAgICBtaW4td2lkdGg6IDkwMHB4O1xcclxcbiAgICBtaW4taGVpZ2h0OiA3MDBweDtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ViZWJlYjtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuI2FkZFRhc2tfZGVzY3JpcHRpb24sICNhZGRUYXNrX2Rlc2NyaXB0aW9uLVNFQyB7XFxyXFxuICAgIHdpZHRoOiA4NSU7XFxyXFxuICAgIHRleHQtYWxpZ246IGxlZnQ7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiBWZXJkYW5hO1xcclxcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xcclxcbiAgICBoZWlnaHQ6IDMwcHg7XFxyXFxuICAgIHBhZGRpbmc6IDVweDtcXHJcXG59XFxyXFxuXFxyXFxuICNTZWNvbmRhcnlBZGRUYXNrUGFuZWwge1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIGRpc3BsYXk6IG5vbmU7XFxyXFxuICAgIHotaW5kZXg6IDE7XFxyXFxuICAgIHdpZHRoOiA2MCU7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNlYmViZWI7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7ICAgXFxyXFxufVxcclxcblxcclxcbiNTZWNBZGRUYXNrX1Byb2plY3RUaXRsZSB7XFxyXFxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcclxcbiAgICBmb250LWZhbWlseTogVmVyZGFuYTtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4vKlByb2plY3QgZGlzcGxheXMqL1xcclxcbiNkaXNwbGF5Q29udGFpbmVyIHtcXHJcXG4gICAgbWFyZ2luLXRvcDogYXV0bztcXHJcXG4gICAgbWFyZ2luLWJvdHRvbTogYXV0bztcXHJcXG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XFxyXFxuICAgIG1hcmdpbi1yaWdodDogYXV0bztcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIHdpZHRoOiA5MCU7XFxyXFxuICAgIGhlaWdodDogMTAwJTtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICAvKiBib3JkZXI6IDFweCBzb2xpZCAjMDAwOyovXFxyXFxufVxcclxcblxcclxcbiNkaXNwbGF5UHJvamVjdENvbiB7XFxyXFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG4gICAgaGVpZ2h0OiAxMDAlO1xcclxcblxcclxcbn1cXHJcXG5cXHJcXG4jZGlzcGxheVByb2plY3RzQ29udGVudCwgI2Rpc3BsYXlUb2RheUNvbnRlbnQsICNkaXNwbGF5V2Vla0NvbnRlbnQsICNkaXNwbGF5TW9udGhDb250ZW50IHtcXHJcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcclxcbiAgICBvdmVyZmxvdy15OiBzY3JvbGw7XFxyXFxuICAgIG1heC1oZWlnaHQ6IDg1JTtcXHJcXG4gICAgb3ZlcmZsb3cteDogaGlkZGVuO1xcclxcbn1cXHJcXG5cXHJcXG4jZGlzcGxheVRvZGF5Q29uLCAjZGlzcGxheVdlZWtDb24sICNkaXNwbGF5TW9udGhDb24sICNkaXNwbGF5U2luZ2xlUHJvamVjdCwgI2Rpc3BsYXlTaW5nbGVUYXNrIHtcXHJcXG4gICAgZGlzcGxheTogbm9uZTtcXHJcXG4gICAgb3ZlcmZsb3cteTogc2Nyb2xsO1xcclxcbn1cXHJcXG5cXHJcXG4jcHJvamVjdEl0ZW1Db250YWluZXIge1xcclxcbiAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDEwZnIgMWZyO1xcclxcbn1cXHJcXG5cXHJcXG4jcHJvamVjdFRpdGxlQnV0dG9uIHtcXHJcXG4gICAgYm9yZGVyOiBub25lO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjY2NjO1xcclxcbiAgICBmb250LWZhbWlseTogVmVyZGFuYTtcXHJcXG4gICAgY29sb3I6ICNmZmY7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBmb250LXNpemU6IDIwcHg7XFxyXFxuICAgIG1hcmdpbi10b3A6IDVweDtcXHJcXG4gICAgcGFkZGluZy10b3A6IDVweDtcXHJcXG4gICAgcGFkZGluZy1ib3R0b206IDVweDtcXHJcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgICBvdXRsaW5lOiBub25lO1xcclxcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxufVxcclxcblxcclxcbiNwcm9qZWN0VGl0bGVCdXR0b246YWN0aXZlIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzMzMztcXHJcXG59XFxyXFxuXFxyXFxuI3Byb2plY3RUaXRsZUJ1dHRvbiB1bCB7XFxyXFxuICAgIHBhZGRpbmctbGVmdDogMDtcXHJcXG4gICAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4jdHJhc2hJY29uIHtcXHJcXG4gICAgbWFyZ2luOiBhdXRvO1xcclxcbiAgICB3aWR0aDogMjVweDtcXHJcXG4gICAgaGVpZ2h0OiAyNXB4O1xcclxcbiAgICBwYWRkaW5nLWxlZnQ6IDVweDtcXHJcXG4gICAgcGFkZGluZy1yaWdodDogNXB4O1xcclxcbiAgICBkaXNwbGF5OiBub25lO1xcclxcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcblxcclxcbiN0cmFzaEljb246aG92ZXIge1xcclxcbiAgICBjb2xvcjogIzk2OTY5NjtcXHJcXG4gICAgd2lkdGg6IDI3cHg7XFxyXFxuICAgIGhlaWdodDogMjdweDtcXHJcXG59XFxyXFxuXFxyXFxuI3RyYXNoQ29udGFpbmVyIHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICAgIHdpZHRoOiAzMHB4O1xcclxcbiAgICBtYXgtd2lkdGg6IDMwcHg7XFxyXFxufVxcclxcblxcclxcbiNwcm9qZWN0UGFnZSB7XFxyXFxuICAgIGRpc3BsYXk6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbiNBbGxQcm9qZWN0VGFza3Mge1xcclxcbiAgICBwYWRkaW5nOiAwIDE4cHg7XFxyXFxuICAgIG1heC1oZWlnaHQ6IDA7XFxyXFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxyXFxuICAgIHRleHQtYWxpZ246IGxlZnQ7XFxyXFxuICAgIHRyYW5zaXRpb246IG1heC1oZWlnaHQgLjRzIGVhc2Utb3V0O1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcclxcbiAgICBjb2xvcjogIzAwMDtcXHJcXG4gICAgYm9yZGVyOiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4udGFza0xpc3RJdGVtIHtcXHJcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2U2ZTZlNjtcXHJcXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcXHJcXG4gICAgbWFyZ2luLXRvcDogNXB4O1xcclxcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuXFxyXFxufVxcclxcblxcclxcbiNkaXNwbGF5VGFza0xpbmsge1xcclxcbiAgICBwYWRkaW5nLWxlZnQ6IDVweDtcXHJcXG4gICAgd2lkdGg6IDg3JTtcXHJcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcclxcbn1cXHJcXG5cXHJcXG4uYWRkVGFza0xpc3RJdGVtIHtcXHJcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2U2ZTZlNjtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICBtYXJnaW4tdG9wOiA1cHg7XFxyXFxuICAgIGNvbG9yOiAjMzMzO1xcclxcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5hZGRUYXNrTGlzdEl0ZW0sIC50YXNrTGlzdEl0ZW0ge1xcclxcbiAgICBwYWRkaW5nLXRvcDogNXB4O1xcclxcbiAgICBwYWRkaW5nLWJvdHRvbTogNXB4O1xcclxcbn1cXHJcXG4uYWRkVGFza0xpc3RJdGVtOmhvdmVyLCAudGFza0xpc3RJdGVtOmhvdmVyIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzk4OTg5ODtcXHJcXG59XFxyXFxuXFxyXFxuI2FkZF9pY29uIHtcXHJcXG53aWR0aDogMTVweDsgXFxyXFxuaGVpZ2h0OiAxNXB4O1xcclxcbnBhZGRpbmctcmlnaHQ6IDVweDtcXHJcXG59XFxyXFxuXFxyXFxuLyogZGlzcGxheSB0YXNrIHBhbmVsKi9cXHJcXG4jZGlzcGxheVRhc2tQYW5lbCB7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgZGlzcGxheTogbm9uZTtcXHJcXG4gICAgei1pbmRleDogMTtcXHJcXG4gICAgbWluLXdpZHRoOiA4MDBweDtcXHJcXG4gICAgbWluLWhlaWdodDogNTUwcHg7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNlYmViZWI7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxyXFxufVxcclxcblxcclxcbiNkaXNwbGF5VGFza19idXR0b25Db250IHtcXHJcXG4gICAgbWFyZ2luLWJvdHRvbTogMjBweDtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7IFxcclxcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcXHJcXG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcclxcbn1cXHJcXG5cXHJcXG4jZGlzcGxheVRhc2tfY29udDEsICNkaXNwbGF5VGFza19jb250MiB7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcclxcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcXHJcXG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcclxcbiAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4vKkNTUyBmb3IgRWRpdCBGaWVsZHMgKi9cXHJcXG5cXHJcXG4vKnVuaXZlcnNhbCovXFxyXFxuLlN1YlpvbmUge1xcclxcbiAgLyogIG1pbi13aWR0aDo1NSU7Ki9cXHJcXG59XFxyXFxuXFxyXFxuI3N0YXR1c1N1YlpvbmUge1xcclxcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuI2Rlc2NyaXB0aW9uU3ViWm9uZSB7XFxyXFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG59XFxyXFxuXFxyXFxuLmRpc3BsYXlUYXNrX2VkaXRJbnB1dCB7XFxyXFxuICAgIHdpZHRoOiA1MCU7XFxyXFxuICAgIC8qIHBvc2l0aW9uOiBhYnNvbHV0ZTsgKi9cXHJcXG4gICAgaGVpZ2h0OiAzMHB4O1xcclxcbn1cXHJcXG4vKnN0eWxpbmcgZm9yIHRoZSBlZGl0IGJ1dHRvbiovXFxyXFxuI0VkaXRCdXR0Wm9uZSB7XFxyXFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG4gIC8qICB3aWR0aDogMjUlOyAqL1xcclxcbiAgICBtYXJnaW4tbGVmdDogMTBweDtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICAgIG1hcmdpbi10b3A6IGF1dG87XFxyXFxuICAgIG1hcmdpbi1ib3R0b206IGF1dG87XFxyXFxuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxyXFxufVxcclxcblxcclxcbi5kaXNwbGF5VGFza19idXR0b24ge1xcclxcbiAgICBkaXNwbGF5OiBub25lO1xcclxcbiAgICB3aWR0aDogMjVweDtcXHJcXG4gICAgaGVpZ2h0OiAyNXB4O1xcclxcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICMwMDAwMDA7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXHJcXG4gICAgbWFyZ2luLWxlZnQ6IDVweDtcXHJcXG4gICAgbWFyZ2luLXJpZ2h0OiA1cHg7XFxyXFxuICAgIG1hcmdpbi10b3A6IGF1dG87XFxyXFxuICAgIG1hcmdpbi1ib3R0b206IGF1dG87XFxyXFxufVxcclxcblxcclxcbiNkaXNwbGF5VGFza19zdGF0dXMge1xcclxcbiAgICBwb3NpdGlvbjogaW5oZXJpdDtcXHJcXG59XFxyXFxuXFxyXFxuLmRpc3BsYXlUYXNrX2J1dHRvbjphY3RpdmUge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjY2NjO1xcclxcbn1cXHJcXG5cXHJcXG4uZGlzcGxheVRhc2tfc3ViQ29udCB7XFxyXFxuICAgIG1pbi13aWR0aDogMzUwcHg7XFxyXFxufVxcclxcblxcclxcbi8qc3RhdHVzIHVpIG9mIGRpc3BsYXkgdGFzayBwYW5lbCovXFxyXFxuI2Rpc3BsYXlUYXNrX3N0YXR1c0lucHV0IHtcXHJcXG4gICAgZGlzcGxheTogbm9uZTtcXHJcXG4gICAgcG9zaXRpb246IGluaGVyaXQ7XFxyXFxuICAgIG1heC13aWR0aDogMTUwcHg7XFxyXFxuICAgIG1pbi13aWR0aDogOTYlO1xcclxcbn1cXHJcXG5cXHJcXG4jc3RhdHVzRWRpdEJ1dHRvbiwgLmRpc3BsYXlUYXNrX0VkaXRCdXR0b24ge1xcclxcbiAgICBtYXgtd2lkdGg6IDEwMCU7XFxyXFxuICAgIG1heC1oZWlnaHQ6IDEwMCU7XFxyXFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLypkZXNjcmlwdGlvbiBwYXJ0IG9mIHRoZSBkaXNwbGF5IHRhc2sgcGFuZWwqL1xcclxcblxcclxcbiNkaXNwbGF5VGFza19kZXNjcmlwdGlvbklucHV0IHtcXHJcXG4gICAgZGlzcGxheTogbm9uZTtcXHJcXG4gICAgcG9zaXRpb246IGluaGVyaXQ7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbn1cXHJcXG4jRGVzY3JpcHRpb25FZGl0QnV0dFpvbmUge1xcclxcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgICBtYXJnaW4tdG9wOiBhdXRvO1xcclxcbiAgICBtYXJnaW4tYm90dG9tOiBhdXRvO1xcclxcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcclxcbiAgICBtYXJnaW4tbGVmdDogNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4jZGVzY3JpcHRpb25fY29udGFpbmVyIGg0IHtcXHJcXG4gICAgZGlzcGxheTogYmxvY2s7XFxyXFxuICAgIG1hcmdpbi10b3A6IDIwcHg7XFxyXFxuICAgIG1hcmdpbi1ib3R0b206IDBweDtcXHJcXG59XFxyXFxuXFxyXFxuLypkZWFkbGluZSBVSSovXFxyXFxuXFxyXFxuI2Rpc3BsYXlUYXNrX2RlYWRsaW5lSW5wdXQge1xcclxcbiAgICBkaXNwbGF5OiBub25lO1xcclxcbiAgICBwb3NpdGlvbjogaW5oZXJpdDtcXHJcXG4gICAgbWF4LXdpZHRoOiAxNTBweDtcXHJcXG59XFxyXFxuXFxyXFxuI2RlYWRsaW5lRWRpdEJ1dHRab25lIHtcXHJcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gICAgbWFyZ2luLXRvcDogYXV0bztcXHJcXG4gICAgbWFyZ2luLWJvdHRvbTogYXV0bztcXHJcXG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXHJcXG4gICAgbWFyZ2luLWxlZnQ6IDVweDtcXHJcXG59XFxyXFxuXFxyXFxuI2RlYWRsaW5lU3ViWm9uZSB7XFxyXFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXHJcXG59XFxyXFxuXFxyXFxuLyp1cmdlbmN5IFVJKi9cXHJcXG5cXHJcXG4jZGlzcGxheVRhc2tfdXJnZW5jeUlucHV0IHtcXHJcXG4gICAgZGlzcGxheTogbm9uZTtcXHJcXG4gICAgcG9zaXRpb246IGluaGVyaXQ7XFxyXFxuICAgIG1heC13aWR0aDogMTUwcHg7XFxyXFxuICAgIGhlaWdodDogMzBweDtcXHJcXG59XFxyXFxuXFxyXFxuI3VyZ2VuY3lFZGl0QnV0dFpvbmUge1xcclxcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgICBtYXJnaW4tdG9wOiBhdXRvO1xcclxcbiAgICBtYXJnaW4tYm90dG9tOiBhdXRvO1xcclxcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcclxcbiAgICBtYXJnaW4tbGVmdDogNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4jdXJnZW5jeVN1YlpvbmUge1xcclxcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxyXFxufVxcclxcblxcclxcbiNkaXNwbGF5VGFza19kYXRlQ3JlYXRlZCB7XFxyXFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG59XFxyXFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL215c3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0ksb0JBQW9CO0FBQ3hCOztBQUVBO0FBQ0EsV0FBVztBQUNYLGlCQUFpQjtBQUNqQixrQkFBa0I7QUFDbEIsa0JBQWtCO0FBQ2xCLGtCQUFrQjtBQUNsQjs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtJQUNJLGlCQUFpQjtJQUNqQixrQkFBa0I7SUFDbEIsa0JBQWtCO0lBQ2xCLHlCQUF5QjtJQUN6QixVQUFVO0lBQ1YsYUFBYTtBQUNqQjs7QUFFQTtJQUNJLFdBQVc7O0FBRWY7O0FBRUE7SUFDSSxXQUFXO0lBQ1gsaUJBQWlCO0lBQ2pCLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLGlCQUFpQjtJQUNqQixrQkFBa0I7SUFDbEIsZ0JBQWdCO0lBQ2hCLFVBQVU7O0FBRWQ7O0FBRUE7SUFDSSxnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSxpQkFBaUI7SUFDakIsa0JBQWtCO0lBQ2xCLGtCQUFrQjtJQUNsQix5QkFBeUI7SUFDekIsVUFBVTtJQUNWLGFBQWE7SUFDYixpQkFBaUI7SUFDakIsYUFBYTtJQUNiLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLGdCQUFnQjtJQUNoQixtQkFBbUI7SUFDbkIsaUJBQWlCO0lBQ2pCLGtCQUFrQjtJQUNsQixhQUFhO0lBQ2IsdUJBQXVCO0lBQ3ZCLG1CQUFtQjtJQUNuQixVQUFVO0lBQ1YsV0FBVztJQUNYLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLFVBQVU7QUFDZDtBQUNBO0lBQ0k7QUFDSjs7QUFFQTtJQUNJLHlCQUF5QjtJQUN6QixZQUFZO0lBQ1osdUJBQXVCO0lBQ3ZCLFlBQVk7SUFDWixjQUFjO0FBQ2xCOztBQUVBLGNBQWM7QUFDZDtJQUNJLGFBQWE7SUFDYixtQkFBbUI7SUFDbkIsVUFBVTtJQUNWLFlBQVk7QUFDaEI7O0FBRUE7SUFD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QUNsQjs7QUFFQTtJQUNJLGVBQWU7SUFDZixnQkFBZ0I7SUFDaEIsZUFBZTtBQUNuQjs7QUFFQSw2Q0FBNkM7O0FBRTdDO0lBQ0ksYUFBYTtJQUNiLGlCQUFpQjtJQUNqQixXQUFXO0FBQ2Y7QUFDQTtJQUNJLHFCQUFxQjtJQUNyQix1QkFBdUI7SUFDdkIsZ0JBQWdCO0lBQ2hCLG1CQUFtQjtJQUNuQixzQkFBc0I7SUFDdEIsZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0ksY0FBYztJQUNkLGdCQUFnQjtJQUNoQixrQkFBa0I7QUFDdEI7O0FBRUEsY0FBYzs7QUFFZDtJQUNJLGFBQWE7SUFDYixpQkFBaUI7SUFDakIsZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0kscUJBQXFCO0lBQ3JCLHVCQUF1QjtJQUN2QixnQkFBZ0I7SUFDaEIsbUJBQW1CO0lBQ25CLHNCQUFzQjtJQUN0QixnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSxxQkFBcUI7SUFDckIsc0JBQXNCO0FBQzFCOztBQUVBLGFBQWE7O0FBRWI7SUFDSSxhQUFhO0lBQ2IsaUJBQWlCO0lBQ2pCLGdCQUFnQjtJQUNoQixZQUFZO0FBQ2hCOztBQUVBO0lBQ0kscUJBQXFCO0lBQ3JCLHVCQUF1QjtJQUN2QixnQkFBZ0I7SUFDaEIsbUJBQW1CO0lBQ25CLHNCQUFzQjtJQUN0QixnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSxxQkFBcUI7SUFDckIsc0JBQXNCO0FBQzFCOztBQUVBO0lBQ0kscUJBQXFCO0FBQ3pCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcImJvZHkge1xcclxcbiAgICBmb250LWZhbWlseTogVmVyZGFuYTtcXHJcXG59XFxyXFxuXFxyXFxuI2NvbnRhaW5lciwgI3NpZ25JbiwgI3NpZ25VcCwgI21haW5QYWdlcyB7XFxyXFxud2lkdGg6IDEwMCU7IFxcclxcbm1hcmdpbi1sZWZ0OiBhdXRvO1xcclxcbm1hcmdpbi1yaWdodDogYXV0bzsgXFxyXFxudGV4dC1hbGlnbjogY2VudGVyO1xcclxcbnRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuI3NpZ25JbiwgI3NpZ25VcCwgI21haW5QYWdlcyB7XFxyXFxuZGlzcGxheTogbm9uZTsgXFxyXFxufVxcclxcblxcclxcbiNzaWduSW5Db250YWluZXIge1xcclxcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcXHJcXG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICMwMDAwMDA7XFxyXFxuICAgIHdpZHRoOiA2MCU7XFxyXFxuICAgIGhlaWdodDogMTAwdmg7XFxyXFxufVxcclxcblxcclxcbiNpbnB1dEZpZWxkIHtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuXFxyXFxufVxcclxcblxcclxcbi50ZXh0SW5wdXQge1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XFxyXFxuICAgIG1hcmdpbi1yaWdodDogYXV0bztcXHJcXG59XFxyXFxuXFxyXFxuI3RpdGxlIHtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4jaW5uZXJDb250YWluZXIge1xcclxcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcXHJcXG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcclxcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xcclxcbiAgICB3aWR0aDogOTAlO1xcclxcblxcclxcbn1cXHJcXG5cXHJcXG4jaW5wdXRGaWVsZCBoMiB7XFxyXFxuICAgIHRleHQtYWxpZ246IGxlZnQ7XFxyXFxufVxcclxcblxcclxcbiNtZW1iZXItaW5uZXJDb250YWluZXIge1xcclxcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcXHJcXG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICMwMDAwMDA7XFxyXFxuICAgIHdpZHRoOiA5MCU7XFxyXFxuICAgIGhlaWdodDogMTAwdmg7XFxyXFxuICAgIG1pbi1oZWlnaHQ6IDY1MHB4O1xcclxcbiAgICBkaXNwbGF5OiBmbGV4OyBcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuI2NlbnRlcl9jb250YWluZXIge1xcclxcbiAgICBtYXJnaW4tdG9wOiBhdXRvO1xcclxcbiAgICBtYXJnaW4tYm90dG9tOiBhdXRvO1xcclxcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcXHJcXG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gICAgd2lkdGg6IDk1JTtcXHJcXG4gICAgaGVpZ2h0OiA5NSU7XFxyXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuI3NpZGUtcGFuZWwge1xcclxcbiAgICB3aWR0aDogMzAlO1xcclxcbn1cXHJcXG4jb3V0cHV0LXBhbmVsIHtcXHJcXG4gICAgd2lkdGg6IDY1JVxcclxcbn1cXHJcXG5cXHJcXG4jc2lkZS1wYW5lbCwgI291dHB1dC1wYW5lbCB7XFxyXFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICMwMDAwMDA7IFxcclxcbiAgICBoZWlnaHQ6IDEwMCU7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgICBtYXJnaW46IGF1dG87XFxyXFxuICAgIGRpc3BsYXk6IGJsb2NrOyBcXHJcXG59XFxyXFxuXFxyXFxuLypBZG1pbiBQYW5lbCovXFxyXFxuI2FkbWluUGFuZWxDb250YWluZXIge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICB3aWR0aDogNzAlO1xcclxcbiAgICBtYXJnaW46IGF1dG87XFxyXFxufVxcclxcblxcclxcbiNhZG1pblBhbmVsIHtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIHRhYmxlLWxheW91dDogZml4ZWQ7XFxyXFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxyXFxuICAgIG1hcmdpbjogMDtcXHJcXG4gICAgcGFkZGluZzogMDtcXHJcXG59XFxyXFxuXFxyXFxuI2FkbWluUGFuZWwgbGkge1xcclxcbiAgICAvKiBib3JkZXI6IDFweCBzb2xpZCAjOTg5ODk4OyAqL1xcclxcbiAgICB3aWR0aDogOTAlO1xcclxcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xcclxcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcXHJcXG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcclxcblxcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG5cXHJcXG4jYWRtaW4tdGl0bGUge1xcclxcbiAgICBmb250LXdlaWdodDogYm9sZDtcXHJcXG4gICAgZm9udC1zaXplOiAzMHB4OyBcXHJcXG4gICAgbWFyZ2luLXRvcDogMjBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmFkbWluLW9wdGlvbnMge1xcclxcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xcclxcbiAgICBtYXJnaW4tdG9wOiAyMHB4O1xcclxcbiAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcclxcbiAgICBoZWlnaHQ6IDMwcHg7XFxyXFxuICAgIHBhZGRpbmctbGVmdDogMzBweDtcXHJcXG4gICAgYm9yZGVyOiBub25lO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcXHJcXG4gICAgZm9udC1zaXplOiAyMHB4O1xcclxcbiAgICBmb250LWZhbWlseTogVmVyZGFuYTtcXHJcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXHJcXG4gICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XFxyXFxufVxcclxcblxcclxcblxcclxcbi5hZG1pbi1vcHRpb25zOmhvdmVyIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzk4OTg5ODtcXHJcXG59XFxyXFxuXFxyXFxuLmFkbWluLW9wdGlvbnM6YWN0aXZlIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2QxZDFkMTtcXHJcXG59XFxyXFxuXFxyXFxuLnNlbGVjdGVkVmlldyB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM5ODk4OTg7XFxyXFxufVxcclxcblxcclxcblxcclxcbi8qQWRkIFByb2plY3QgUGFuZWwqL1xcclxcbiNhZGRQcm9qZWN0UGFuZWwge1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIGRpc3BsYXk6IG5vbmU7XFxyXFxuICAgIHotaW5kZXg6IDE7XFxyXFxuICAgIG1pbi13aWR0aDogNjAwcHg7XFxyXFxuICAgIG1pbi1oZWlnaHQ6IDYwJTtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ViZWJlYjtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuI2FkZFByb2plY3RQYW5lbENvbnRhaW5lciB7XFxyXFxuICAgIG1hcmdpbi10b3A6IGF1dG87XFxyXFxuICAgIG1hcmdpbi1ib3R0b206IGF1dG87XFxyXFxuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xcclxcbiAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICB3aWR0aDogOTUlO1xcclxcbiAgICBoZWlnaHQ6IDk1JTtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4jYWRkX3Byb2plY3RUaXRsZSwgI2FkZF90YXNrTmFtZSwgI2FkZF90YXNrTmFtZS1TRUMge1xcclxcbiAgICB3aWR0aDogODUlO1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiBWZXJkYW5hO1xcclxcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xcclxcbiAgICBoZWlnaHQ6IDMwcHg7XFxyXFxufVxcclxcblxcclxcbiNhZGRQcm9qZWN0XzJuZGNvbnRhaW5lciB7XFxyXFxuICAgIHdpZHRoOiA2MCU7XFxyXFxuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xcclxcbiAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XFxyXFxuICAgIG1hcmdpbi10b3A6IDQwcHg7XFxyXFxuICAgIG1hcmdpbi1ib3R0b206IDQwcHg7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG59XFxyXFxuXFxyXFxuI3Byb2plY3Rfc3RhdHVzX2lucHV0LCAjcHJvamVjdF9kZWFkbGluZV9pbnB1dCB7XFxyXFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG59XFxyXFxuXFxyXFxuI3Byb2plY3Rfc3RhdHVzX2lucHV0IHtcXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuI2FkZFByb2plY3Rfc2VsZWN0aW9uIHtcXHJcXG4gICAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XFxyXFxuICAgIHBhZGRpbmc6IDVweDtcXHJcXG59XFxyXFxuXFxyXFxuI3Byb2plY3RfZGVhZGxpbmVfaW5wdXQgaW5wdXQsICN0YXNrX2RlYWRsaW5lSW5wdXQsXFxyXFxuI2FkZFRhc2tfdXJnZW5jeSwgI2FkZFRhc2tfc3RhdHVzLCAjQWRkVGFza19Qcm9qZWN0Q2F0ZWdvcnlfU2VsZWN0aW9uLFxcclxcbiNhZGRUYXNrX3N0YXR1cy1TRUMsICNhZGRUYXNrX3VyZ2VuY3ktU0VDLCAjdGFza19kZWFkbGluZUlucHV0LVNFQyB7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xcclxcbiAgICBwYWRkaW5nOiA1cHg7XFxyXFxufVxcclxcblxcclxcbiNBZGRQcm9qZWN0QnV0dG9uQ29udGFpbmVyLCAjQWRkVGFza0J1dHRvbkNvbnRhaW5lciB7XFxyXFxuICAgIHdpZHRoOiA2MCU7XFxyXFxuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xcclxcbiAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XFxyXFxufVxcclxcblxcclxcbiNhZGRQcm9qZWN0QnV0dG9uLCAjYWRkVGFza0J1dHRvbiwgI2FkZFRhc2tCdXR0b24tU0VDLCAjZGlzcGxheVRhc2tfZWRpdEJ1dHRvbiwgI2Rpc3BsYXlUYXNrX2RlbEJ1dHRvbiwgI2Rpc3BsYXlUYXNrX2Nsb3NlQnV0dG9uIHtcXHJcXG4gICAgYm9yZGVyOiBub25lO1xcclxcbiAgICBmb250LWZhbWlseTogVmVyZGFuYTtcXHJcXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM5ODk4OTg7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxyXFxuICAgIGZvbnQtc2l6ZTogMjBweDtcXHJcXG4gICAgcGFkZGluZy1sZWZ0OiA1MHB4O1xcclxcbiAgICBwYWRkaW5nLXJpZ2h0OiA1MHB4O1xcclxcbiAgICBjb2xvcjogI2ZmZmZmZjtcXHJcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcclxcbn1cXHJcXG5cXHJcXG4jYWRkUHJvamVjdEJ1dHRvbjphY3RpdmUsXFxyXFxuI0NhbmNlbEFkZFByb2plY3RCdXR0b246YWN0aXZlLFxcclxcbiNDYW5jZWxBZGRUYXNrQnV0dG9uOmFjdGl2ZSxcXHJcXG4jYWRkVGFza0J1dHRvbjphY3RpdmUsXFxyXFxuI2FkZFRhc2tCdXR0b24tU0VDOmFjdGl2ZSxcXHJcXG4jQ2FuY2VsQWRkVGFza0J1dHRvbi1TRUM6YWN0aXZlLFxcclxcbiNkaXNwbGF5VGFza19lZGl0QnV0dG9uOmFjdGl2ZSxcXHJcXG4jZGlzcGxheVRhc2tfZGVsQnV0dG9uOmFjdGl2ZSxcXHJcXG4jZGlzcGxheVRhc2tfY2xvc2VCdXR0b246YWN0aXZlIHtcXHJcXG4gICAgICAgIGJvcmRlcjogMnB4IHNvbGlkICMwMDAwMDA7XFxyXFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWJlYmViO1xcclxcbiAgICAgICAgZm9udC1zaXplOiAyMHB4O1xcclxcbiAgICAgICAgY29sb3I6ICMwMDAwMDA7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4jQ2FuY2VsQWRkUHJvamVjdEJ1dHRvbiwgI0NhbmNlbEFkZFRhc2tCdXR0b24sICNDYW5jZWxBZGRUYXNrQnV0dG9uLVNFQyB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMzMzMzMzM7XFxyXFxuICAgIGZvbnQtc2l6ZTogMjBweDtcXHJcXG4gICAgY29sb3I6ICNmZmZmZmY7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiBWZXJkYW5hO1xcclxcbiAgICBmb250LXdlaWdodDogYm9sZDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcXHJcXG4gICAgZm9udC1zaXplOiAyMHB4O1xcclxcbiAgICBwYWRkaW5nLWxlZnQ6IDUwcHg7XFxyXFxuICAgIHBhZGRpbmctcmlnaHQ6IDUwcHg7XFxyXFxuICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XFxyXFxufVxcclxcblxcclxcblxcclxcbiNBZGRQcm9qZWN0QnV0dG9uQ29udGFpbmVyX2JveDEsICNBZGRUYXNrQnV0dG9uQ29udGFpbmVyX2JveDEge1xcclxcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG5cXHJcXG4vKkFkZCBUYXNrIFBhbmVsKi9cXHJcXG5cXHJcXG4jYWRkVGFza1BhbmVsIHtcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICBkaXNwbGF5OiBub25lO1xcclxcbiAgICB6LWluZGV4OiAxO1xcclxcbiAgICBtaW4td2lkdGg6IDkwMHB4O1xcclxcbiAgICBtaW4taGVpZ2h0OiA3MDBweDtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ViZWJlYjtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuI2FkZFRhc2tfZGVzY3JpcHRpb24sICNhZGRUYXNrX2Rlc2NyaXB0aW9uLVNFQyB7XFxyXFxuICAgIHdpZHRoOiA4NSU7XFxyXFxuICAgIHRleHQtYWxpZ246IGxlZnQ7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiBWZXJkYW5hO1xcclxcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xcclxcbiAgICBoZWlnaHQ6IDMwcHg7XFxyXFxuICAgIHBhZGRpbmc6IDVweDtcXHJcXG59XFxyXFxuXFxyXFxuICNTZWNvbmRhcnlBZGRUYXNrUGFuZWwge1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIGRpc3BsYXk6IG5vbmU7XFxyXFxuICAgIHotaW5kZXg6IDE7XFxyXFxuICAgIHdpZHRoOiA2MCU7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNlYmViZWI7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7ICAgXFxyXFxufVxcclxcblxcclxcbiNTZWNBZGRUYXNrX1Byb2plY3RUaXRsZSB7XFxyXFxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcclxcbiAgICBmb250LWZhbWlseTogVmVyZGFuYTtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4vKlByb2plY3QgZGlzcGxheXMqL1xcclxcbiNkaXNwbGF5Q29udGFpbmVyIHtcXHJcXG4gICAgbWFyZ2luLXRvcDogYXV0bztcXHJcXG4gICAgbWFyZ2luLWJvdHRvbTogYXV0bztcXHJcXG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XFxyXFxuICAgIG1hcmdpbi1yaWdodDogYXV0bztcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIHdpZHRoOiA5MCU7XFxyXFxuICAgIGhlaWdodDogMTAwJTtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICAvKiBib3JkZXI6IDFweCBzb2xpZCAjMDAwOyovXFxyXFxufVxcclxcblxcclxcbiNkaXNwbGF5UHJvamVjdENvbiB7XFxyXFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG4gICAgaGVpZ2h0OiAxMDAlO1xcclxcblxcclxcbn1cXHJcXG5cXHJcXG4jZGlzcGxheVByb2plY3RzQ29udGVudCwgI2Rpc3BsYXlUb2RheUNvbnRlbnQsICNkaXNwbGF5V2Vla0NvbnRlbnQsICNkaXNwbGF5TW9udGhDb250ZW50IHtcXHJcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcclxcbiAgICBvdmVyZmxvdy15OiBzY3JvbGw7XFxyXFxuICAgIG1heC1oZWlnaHQ6IDg1JTtcXHJcXG4gICAgb3ZlcmZsb3cteDogaGlkZGVuO1xcclxcbn1cXHJcXG5cXHJcXG4jZGlzcGxheVRvZGF5Q29uLCAjZGlzcGxheVdlZWtDb24sICNkaXNwbGF5TW9udGhDb24sICNkaXNwbGF5U2luZ2xlUHJvamVjdCwgI2Rpc3BsYXlTaW5nbGVUYXNrIHtcXHJcXG4gICAgZGlzcGxheTogbm9uZTtcXHJcXG4gICAgb3ZlcmZsb3cteTogc2Nyb2xsO1xcclxcbn1cXHJcXG5cXHJcXG4jcHJvamVjdEl0ZW1Db250YWluZXIge1xcclxcbiAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDEwZnIgMWZyO1xcclxcbn1cXHJcXG5cXHJcXG4jcHJvamVjdFRpdGxlQnV0dG9uIHtcXHJcXG4gICAgYm9yZGVyOiBub25lO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjY2NjO1xcclxcbiAgICBmb250LWZhbWlseTogVmVyZGFuYTtcXHJcXG4gICAgY29sb3I6ICNmZmY7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBmb250LXNpemU6IDIwcHg7XFxyXFxuICAgIG1hcmdpbi10b3A6IDVweDtcXHJcXG4gICAgcGFkZGluZy10b3A6IDVweDtcXHJcXG4gICAgcGFkZGluZy1ib3R0b206IDVweDtcXHJcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgICBvdXRsaW5lOiBub25lO1xcclxcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxufVxcclxcblxcclxcbiNwcm9qZWN0VGl0bGVCdXR0b246YWN0aXZlIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzMzMztcXHJcXG59XFxyXFxuXFxyXFxuI3Byb2plY3RUaXRsZUJ1dHRvbiB1bCB7XFxyXFxuICAgIHBhZGRpbmctbGVmdDogMDtcXHJcXG4gICAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4jdHJhc2hJY29uIHtcXHJcXG4gICAgbWFyZ2luOiBhdXRvO1xcclxcbiAgICB3aWR0aDogMjVweDtcXHJcXG4gICAgaGVpZ2h0OiAyNXB4O1xcclxcbiAgICBwYWRkaW5nLWxlZnQ6IDVweDtcXHJcXG4gICAgcGFkZGluZy1yaWdodDogNXB4O1xcclxcbiAgICBkaXNwbGF5OiBub25lO1xcclxcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcblxcclxcbiN0cmFzaEljb246aG92ZXIge1xcclxcbiAgICBjb2xvcjogIzk2OTY5NjtcXHJcXG4gICAgd2lkdGg6IDI3cHg7XFxyXFxuICAgIGhlaWdodDogMjdweDtcXHJcXG59XFxyXFxuXFxyXFxuI3RyYXNoQ29udGFpbmVyIHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICAgIHdpZHRoOiAzMHB4O1xcclxcbiAgICBtYXgtd2lkdGg6IDMwcHg7XFxyXFxufVxcclxcblxcclxcbiNwcm9qZWN0UGFnZSB7XFxyXFxuICAgIGRpc3BsYXk6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbiNBbGxQcm9qZWN0VGFza3Mge1xcclxcbiAgICBwYWRkaW5nOiAwIDE4cHg7XFxyXFxuICAgIG1heC1oZWlnaHQ6IDA7XFxyXFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxyXFxuICAgIHRleHQtYWxpZ246IGxlZnQ7XFxyXFxuICAgIHRyYW5zaXRpb246IG1heC1oZWlnaHQgLjRzIGVhc2Utb3V0O1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcclxcbiAgICBjb2xvcjogIzAwMDtcXHJcXG4gICAgYm9yZGVyOiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4udGFza0xpc3RJdGVtIHtcXHJcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2U2ZTZlNjtcXHJcXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcXHJcXG4gICAgbWFyZ2luLXRvcDogNXB4O1xcclxcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuXFxyXFxufVxcclxcblxcclxcbiNkaXNwbGF5VGFza0xpbmsge1xcclxcbiAgICBwYWRkaW5nLWxlZnQ6IDVweDtcXHJcXG4gICAgd2lkdGg6IDg3JTtcXHJcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcclxcbn1cXHJcXG5cXHJcXG4uYWRkVGFza0xpc3RJdGVtIHtcXHJcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2U2ZTZlNjtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICBtYXJnaW4tdG9wOiA1cHg7XFxyXFxuICAgIGNvbG9yOiAjMzMzO1xcclxcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5hZGRUYXNrTGlzdEl0ZW0sIC50YXNrTGlzdEl0ZW0ge1xcclxcbiAgICBwYWRkaW5nLXRvcDogNXB4O1xcclxcbiAgICBwYWRkaW5nLWJvdHRvbTogNXB4O1xcclxcbn1cXHJcXG4uYWRkVGFza0xpc3RJdGVtOmhvdmVyLCAudGFza0xpc3RJdGVtOmhvdmVyIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzk4OTg5ODtcXHJcXG59XFxyXFxuXFxyXFxuI2FkZF9pY29uIHtcXHJcXG53aWR0aDogMTVweDsgXFxyXFxuaGVpZ2h0OiAxNXB4O1xcclxcbnBhZGRpbmctcmlnaHQ6IDVweDtcXHJcXG59XFxyXFxuXFxyXFxuLyogZGlzcGxheSB0YXNrIHBhbmVsKi9cXHJcXG4jZGlzcGxheVRhc2tQYW5lbCB7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgZGlzcGxheTogbm9uZTtcXHJcXG4gICAgei1pbmRleDogMTtcXHJcXG4gICAgbWluLXdpZHRoOiA4MDBweDtcXHJcXG4gICAgbWluLWhlaWdodDogNTUwcHg7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNlYmViZWI7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxyXFxufVxcclxcblxcclxcbiNkaXNwbGF5VGFza19idXR0b25Db250IHtcXHJcXG4gICAgbWFyZ2luLWJvdHRvbTogMjBweDtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7IFxcclxcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcXHJcXG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcclxcbn1cXHJcXG5cXHJcXG4jZGlzcGxheVRhc2tfY29udDEsICNkaXNwbGF5VGFza19jb250MiB7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcclxcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcXHJcXG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcclxcbiAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4vKkNTUyBmb3IgRWRpdCBGaWVsZHMgKi9cXHJcXG5cXHJcXG4vKnVuaXZlcnNhbCovXFxyXFxuLlN1YlpvbmUge1xcclxcbiAgLyogIG1pbi13aWR0aDo1NSU7Ki9cXHJcXG59XFxyXFxuXFxyXFxuI3N0YXR1c1N1YlpvbmUge1xcclxcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuI2Rlc2NyaXB0aW9uU3ViWm9uZSB7XFxyXFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG59XFxyXFxuXFxyXFxuLmRpc3BsYXlUYXNrX2VkaXRJbnB1dCB7XFxyXFxuICAgIHdpZHRoOiA1MCU7XFxyXFxuICAgIC8qIHBvc2l0aW9uOiBhYnNvbHV0ZTsgKi9cXHJcXG4gICAgaGVpZ2h0OiAzMHB4O1xcclxcbn1cXHJcXG4vKnN0eWxpbmcgZm9yIHRoZSBlZGl0IGJ1dHRvbiovXFxyXFxuI0VkaXRCdXR0Wm9uZSB7XFxyXFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG4gIC8qICB3aWR0aDogMjUlOyAqL1xcclxcbiAgICBtYXJnaW4tbGVmdDogMTBweDtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICAgIG1hcmdpbi10b3A6IGF1dG87XFxyXFxuICAgIG1hcmdpbi1ib3R0b206IGF1dG87XFxyXFxuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxyXFxufVxcclxcblxcclxcbi5kaXNwbGF5VGFza19idXR0b24ge1xcclxcbiAgICBkaXNwbGF5OiBub25lO1xcclxcbiAgICB3aWR0aDogMjVweDtcXHJcXG4gICAgaGVpZ2h0OiAyNXB4O1xcclxcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICMwMDAwMDA7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXHJcXG4gICAgbWFyZ2luLWxlZnQ6IDVweDtcXHJcXG4gICAgbWFyZ2luLXJpZ2h0OiA1cHg7XFxyXFxuICAgIG1hcmdpbi10b3A6IGF1dG87XFxyXFxuICAgIG1hcmdpbi1ib3R0b206IGF1dG87XFxyXFxufVxcclxcblxcclxcbiNkaXNwbGF5VGFza19zdGF0dXMge1xcclxcbiAgICBwb3NpdGlvbjogaW5oZXJpdDtcXHJcXG59XFxyXFxuXFxyXFxuLmRpc3BsYXlUYXNrX2J1dHRvbjphY3RpdmUge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjY2NjO1xcclxcbn1cXHJcXG5cXHJcXG4uZGlzcGxheVRhc2tfc3ViQ29udCB7XFxyXFxuICAgIG1pbi13aWR0aDogMzUwcHg7XFxyXFxufVxcclxcblxcclxcbi8qc3RhdHVzIHVpIG9mIGRpc3BsYXkgdGFzayBwYW5lbCovXFxyXFxuI2Rpc3BsYXlUYXNrX3N0YXR1c0lucHV0IHtcXHJcXG4gICAgZGlzcGxheTogbm9uZTtcXHJcXG4gICAgcG9zaXRpb246IGluaGVyaXQ7XFxyXFxuICAgIG1heC13aWR0aDogMTUwcHg7XFxyXFxuICAgIG1pbi13aWR0aDogOTYlO1xcclxcbn1cXHJcXG5cXHJcXG4jc3RhdHVzRWRpdEJ1dHRvbiwgLmRpc3BsYXlUYXNrX0VkaXRCdXR0b24ge1xcclxcbiAgICBtYXgtd2lkdGg6IDEwMCU7XFxyXFxuICAgIG1heC1oZWlnaHQ6IDEwMCU7XFxyXFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLypkZXNjcmlwdGlvbiBwYXJ0IG9mIHRoZSBkaXNwbGF5IHRhc2sgcGFuZWwqL1xcclxcblxcclxcbiNkaXNwbGF5VGFza19kZXNjcmlwdGlvbklucHV0IHtcXHJcXG4gICAgZGlzcGxheTogbm9uZTtcXHJcXG4gICAgcG9zaXRpb246IGluaGVyaXQ7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbn1cXHJcXG4jRGVzY3JpcHRpb25FZGl0QnV0dFpvbmUge1xcclxcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgICBtYXJnaW4tdG9wOiBhdXRvO1xcclxcbiAgICBtYXJnaW4tYm90dG9tOiBhdXRvO1xcclxcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcclxcbiAgICBtYXJnaW4tbGVmdDogNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4jZGVzY3JpcHRpb25fY29udGFpbmVyIGg0IHtcXHJcXG4gICAgZGlzcGxheTogYmxvY2s7XFxyXFxuICAgIG1hcmdpbi10b3A6IDIwcHg7XFxyXFxuICAgIG1hcmdpbi1ib3R0b206IDBweDtcXHJcXG59XFxyXFxuXFxyXFxuLypkZWFkbGluZSBVSSovXFxyXFxuXFxyXFxuI2Rpc3BsYXlUYXNrX2RlYWRsaW5lSW5wdXQge1xcclxcbiAgICBkaXNwbGF5OiBub25lO1xcclxcbiAgICBwb3NpdGlvbjogaW5oZXJpdDtcXHJcXG4gICAgbWF4LXdpZHRoOiAxNTBweDtcXHJcXG59XFxyXFxuXFxyXFxuI2RlYWRsaW5lRWRpdEJ1dHRab25lIHtcXHJcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gICAgbWFyZ2luLXRvcDogYXV0bztcXHJcXG4gICAgbWFyZ2luLWJvdHRvbTogYXV0bztcXHJcXG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXHJcXG4gICAgbWFyZ2luLWxlZnQ6IDVweDtcXHJcXG59XFxyXFxuXFxyXFxuI2RlYWRsaW5lU3ViWm9uZSB7XFxyXFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXHJcXG59XFxyXFxuXFxyXFxuLyp1cmdlbmN5IFVJKi9cXHJcXG5cXHJcXG4jZGlzcGxheVRhc2tfdXJnZW5jeUlucHV0IHtcXHJcXG4gICAgZGlzcGxheTogbm9uZTtcXHJcXG4gICAgcG9zaXRpb246IGluaGVyaXQ7XFxyXFxuICAgIG1heC13aWR0aDogMTUwcHg7XFxyXFxuICAgIGhlaWdodDogMzBweDtcXHJcXG59XFxyXFxuXFxyXFxuI3VyZ2VuY3lFZGl0QnV0dFpvbmUge1xcclxcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgICBtYXJnaW4tdG9wOiBhdXRvO1xcclxcbiAgICBtYXJnaW4tYm90dG9tOiBhdXRvO1xcclxcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcclxcbiAgICBtYXJnaW4tbGVmdDogNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4jdXJnZW5jeVN1YlpvbmUge1xcclxcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxyXFxufVxcclxcblxcclxcbiNkaXNwbGF5VGFza19kYXRlQ3JlYXRlZCB7XFxyXFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG59XFxyXFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19IVE1MX0xPQURFUl9HRVRfU09VUkNFX0ZST01fSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvaHRtbC1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xudmFyIF9fX0hUTUxfTE9BREVSX0lNUE9SVF8wX19fID0gbmV3IFVSTChcIi4vYXNzZXQvVG9kby5qcGdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbi8vIE1vZHVsZVxudmFyIF9fX0hUTUxfTE9BREVSX1JFUExBQ0VNRU5UXzBfX18gPSBfX19IVE1MX0xPQURFUl9HRVRfU09VUkNFX0ZST01fSU1QT1JUX19fKF9fX0hUTUxfTE9BREVSX0lNUE9SVF8wX19fKTtcbnZhciBjb2RlID0gXCI8IURPQ1RZUEUgaHRtbD5cXHJcXG48aHRtbD5cXHJcXG48aGVhZD5cXHJcXG4gICAgPG1ldGEgY2hhcnNldD1cXFwidXRmLThcXFwiIC8+XFxyXFxuICAgIDx0aXRsZT5UbyBEbyBMaXN0PC90aXRsZT5cXHJcXG4gICAgPGxpbmsgcmVsPVxcXCJpY29uXFxcIiB0eXBlPVxcXCJpbWFnZS9qcGdcXFwiIGhyZWY9XFxcIlwiICsgX19fSFRNTF9MT0FERVJfUkVQTEFDRU1FTlRfMF9fXyArIFwiXFxcIj5cXHJcXG48L2hlYWQ+XFxyXFxuPGJvZHk+XFxyXFxuICAgIDxkaXYgaWQ9XFxcInNpZ25JblxcXCI+PC9kaXY+XFxyXFxuICAgIDxkaXYgaWQ9XFxcInNpZ25VcFxcXCI+PC9kaXY+XFxyXFxuICAgIDxkaXYgaWQ9XFxcIm1haW5QYWdlc1xcXCI+PC9kaXY+XFxyXFxuPC9ib2R5PlxcclxcbjwvaHRtbD5cIjtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IGNvZGU7IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL215c3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9teXN0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiJdLCJuYW1lcyI6WyJhbHBoYSIsImdlbmVyYXRlQ29kZSIsIm51bSIsImNvZGUiLCJpIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiZ2V0QXV0aCIsIm9uQXV0aFN0YXRlQ2hhbmdlZCIsImdldEZpcmVzdG9yZSIsImRvYyIsInNldERvYyIsImNvbGxlY3Rpb24iLCJxdWVyeSIsIndoZXJlIiwiVGltZXN0YW1wIiwiZ2V0RG9jIiwiZ2V0RG9jcyIsImRlbGV0ZURvYyIsIm9yZGVyQnkiLCJvblNuYXBzaG90IiwidXBkYXRlRG9jIiwiZGIiLCJyZW5kZXJQcm9qZWN0cyIsInJlbW92ZVByb2oiLCJhdXRoIiwicmV0dXJuQXV0aCIsIlByb2plY3RMaXN0IiwiUHJvamVjdE5hbWVzTGlzdCIsImZpbGxQcm9qZWN0TGlzdCIsInEiLCJjdXJyZW50VXNlciIsInVpZCIsInNuYXBzaG90IiwiZm9yRWFjaCIsImRhdGEiLCJwdXNoIiwiaWQiLCJmaWxsUHJvamVjdE5hbWVzTGlzdCIsImxlbmd0aCIsInBvcCIsInRoZW4iLCJzbmFwIiwib2JqIiwidGl0bGUiLCJyZXRyaWV2ZVByb2plY3RMaXN0IiwicmV0cmlldmVQcm9qZWN0TmFtZXNMaXN0IiwiZ2V0VGFza0xpc3RCeVByb2plY3RJRCIsInByb2plY3RJRCIsImFyciIsImV4aXN0cyIsIlByb2plY3RJRCIsImRlYWRsaW5lIiwiZGVzY3JpcHRpb24iLCJzdGF0dXMiLCJ1cmdlbmN5IiwiZGF0ZUNyZWF0ZWQiLCJpc0ZpbmlzaGVkIiwiY2F0Y2giLCJlIiwiY29uc29sZSIsImxvZyIsIm1lc3NhZ2UiLCJkZWxQcm9qZWN0IiwiSUQiLCJ0YXNrTGlzdCIsIml0ZW0iLCJ0b2dnbGVDaGVja0JveCIsInRhc2tJRCIsImJvb2xWYWx1ZSIsImRvY1JlZiIsIl8iLCJyZW5kZXJTaWduSW5QYWdlIiwiR29TaWduVXAiLCJoYW5kbGVTaWduSW4iLCJyZW5kZXJTaWduVXBQYWdlIiwiR29TaWduSW4iLCJoYW5kbGVTaWduVXAiLCJyZW5kZXJUb0RvIiwicmVuZGVyU2lnbk91dEJ1dHRvbiIsImhhbmRsZVNpZ25PdXQiLCJyZW5kZXJBZG1pblBhbmVsIiwicmVuZGVyQWRkUHJvaiIsIm9wZW5BZGRQcm9qZWN0UGFuZWwiLCJjbG9zZUFkZFByb2plY3RQYW5lbCIsImhhbmRsZUFkZFByb2plY3QiLCJnZXRQcm9qZWN0TGlzdCIsInJlbmRlckFkZFRhc2tQYW5lbCIsIm9wZW5BZGRUYXNrUGFuZWwiLCJjbG9zZUFkZFRhc2tQYW5lbCIsInJlbmRlclByb2plY3RDYXRlZ29yeSIsImhhbmRsZUFkZFRhc2siLCJmaWxsVGFza1NlbGVjdGlvbiIsInJlbmRlclNlY0FkZFRhc2tQYW5lbCIsImhhbmRsZVNlY29uZGFyeUFkZFRhc2siLCJjbG9zZVNlY0FkZFRhc2tQYW5lbCIsImRpc3BsYXlQcm9qZWN0cyIsImRpc3BsYXlUb2RheSIsImRpc3BsYXlXZWVrIiwiZGlzcGxheU1vbnRoIiwiQWRkRnVuY1RvU2VjQnV0dG9ucyIsInJlbmRlclRhc2tQYW5lbCIsImNsb3NlRGlzcGxheVRhc2siLCJsb2FkRGlzcGxheVRhc2tEb20iLCJyZXF1aXJlIiwidG9rZW4iLCJzaWduSW5QYWdlIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInNpZ25VcFBhZ2UiLCJtYWluUGFnZXMiLCJpbm5lckhUTUwiLCJhcHBlbmRDaGlsZCIsIkFkZFByb2plY3RQYW5lbCIsImFkZFRhc2tQYW5lbCIsIlNlY0FkZFRhc2tQYW5lbCIsImRpc3BsYXlUYXNrIiwiZGlzcGxheVRhc2tQYW5lbCIsIm1haW5BcHAiLCJ1c2VyIiwic3R5bGUiLCJkaXNwbGF5IiwiYWRkRXZlbnRMaXN0ZW5lciIsIk9wZW5UYXNrQnV0dG9uIiwiQWRkVGFza0J1dHRvbiIsImdvU2lnbkluQnV0dCIsImdvU2lnblVwQnV0dCIsInNpZ25VcEJ1dHQiLCJzaWduSW5CdXR0IiwiZmlyZWJhc2UiLCJmaXJlYmFzZUNvbmZpZyIsImFwaUtleSIsImF1dGhEb21haW4iLCJwcm9qZWN0SWQiLCJzdG9yYWdlQnVja2V0IiwibWVzc2FnaW5nU2VuZGVySWQiLCJhcHBJZCIsImFwcCIsImluaXRpYWxpemVBcHAiLCJlbGVtZW50IiwiY3JlYXRlRWxlbWVudCIsImZvcm1hdERpc3RhbmNlIiwic3ViRGF5cyIsImFkZFByb2plY3RUb1Byb2plY3REaXNwbGF5IiwiYWRkUHJvamVjdFRvU2VsZWN0aW9uIiwiSW5pdFByb2plY3RJbmZvIiwicHJvamVjdEluZm8iLCJzdGF0dXNPcHRpb25zIiwicHJvamVjdExpc3QiLCJQcm9qZWN0UGFuZWwiLCJPYmplY3QiLCJhc3NpZ24iLCJ2YWx1ZSIsImNsb3NlV2luZG93IiwiZGVhZGxpbmVfZGF0ZSIsIkRhdGUiLCJVVENUaW1lIiwiZ2V0VVRDRnVsbFllYXIiLCJnZXRVVENNb250aCIsImdldFVUQ0RhdGUiLCJnZXRVVENIb3VycyIsImdldFVUQ01pbnV0ZXMiLCJnZXRVVENTZWNvbmRzIiwiY3VycmVudFRpbWUiLCJub3ciLCJ0b0xvY2FsZURhdGVTdHJpbmciLCJyZXBlYXQiLCJjb2RlSUQiLCJmcm9tRGF0ZSIsImVycm9yIiwiYWxlcnQiLCJnZXRQcm9qZWN0TmFtZXNMaXN0IiwiYWRkVGFza1RvUHJvamVjdERpc3BsYXkiLCJzZXRQcm9qZWN0SUQiLCJJbml0VGFza0luZm8iLCJ0YXNrSW5mbyIsIlByb2plY3RTZWxlY3QiLCJzZWxlY3RlZEluZGV4Iiwic2V0QXR0cmlidXRlIiwiZmlyc3RPcHRpb24iLCJvcCIsIm5ld09wdGlvbiIsImRvY0RhdGEiLCJvcGVuQWRkVGFza1BhbmVsd2l0aFByb2plY3RJRCIsInNlbGN0ZWRJbmRleCIsIm9wdGlvbnMiLCJTZWNvbmRhcnlUYXNrSW5mbyIsInBhbmVsIiwiY2hpbGROb2RlcyIsInJlbW92ZSIsImNvdW50Iiwib3BlblNlY0FkZFRhc2tQYW5lbCIsIlByb2plY3RDYXQiLCJQcm9qZWN0dGl0bGUiLCJ0cmFzaEljb24iLCJhZGRJY29uIiwib3BlbkRpc3BsYXlUYXNrIiwiZmlsbFRhc2tJbmZvIiwiY2xvc2VfRGlzcGxheVRhc2siLCJsaXN0IiwiZGlzcGxheUNvbnQiLCJjb250YWluZXIiLCJQcm9qZWN0QnV0dG9uIiwiUHJvamVjdF9pZCIsIlByb2plY3RfdGl0bGUiLCJ0cmFzaENvbnRhaW5lciIsImRlbEJ1dHRvbiIsInNyYyIsImhhbmRsZURlbFByb2plY3QiLCJ0YXNrcyIsImxpc3RFbGVtZW50IiwidmFsIiwibGlzdEl0ZW0iLCJjaGVjayIsImNoZWNrZWQiLCJsaXN0VGV4dCIsIlRhc2tJRCIsInRhc2tUaXRsZSIsInRhc2tEZXNjcmlwdGlvbiIsInRhc2tVcmdlbmN5IiwidGFza0RlYWRsaW5lIiwidGFza1N0YXR1cyIsInRhc2tEYXRlQ3JlYXRlZCIsImFkZFRhc2tFbGVtZW50IiwicGx1c0ljb24iLCJhZGRUYXNrUHJvbXB0IiwibWF4SGVpZ2h0Iiwic2Nyb2xsSGVpZ2h0IiwiZGF0ZV9jcmVhdGVkIiwiaXNDb21wbGV0ZSIsIlByb2plY3RUaXRsZSIsImluc2VydEJlZm9yZSIsImxhc3RDaGlsZCIsInBhcmVudE5vZGUiLCJjb25maXJtIiwiZGVsZXRlVGFzayIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJnZXRBdHRyaWJ1dGUiLCJwcm9qQ29udGFpbmVyIiwidG9nZ2xlRGVzY3JpcHRpb25FZGl0IiwiU3ViWm9uZSIsInVzZXJJbnB1dCIsImVkaXQiLCJzdWJtaXQiLCJjYW5jZWwiLCJ3aWR0aCIsInRvZ2dsZVN0YXR1c0VkaXQiLCJzdGF0dXNTdWJab25lIiwiZGlzcGxheVRhc2tfc3RhdHVzIiwic2VsZWN0T3B0aW9ucyIsInRvZ2dsZURlYWRsaW5lRWRpdCIsInRvZ2dsZVVyZ2VuY3lFZGl0IiwiaW5pdFRhc2tJbmZvIiwidXJnZW5jeU9wdGlvbnMiLCJnZXRJRCIsIlByb2pJRCIsIlRhc2tfSUQiLCJwcm9qVGl0bGVTcGFuIiwicHJvZ3Jlc3Nfc3RhdHVzIiwiZGlzcGxheVRhc2tEZXRhaWxzIiwiUHJvalRpdGxlIiwiaW5uZXJ0SFRNTCIsInRhc2tQYW5lbCIsImlubm5lckhUTUwiLCJjaGlsZCIsImxhc3RFbGVtZW50Q2hpbGQiLCJyZW1vdmVDaGlsZCIsImVkaXREZXNjcmlwdGlvbiIsInRhc2siLCJlZGl0U3RhdHVzIiwibmV3X3N0YXR1cyIsImNvbXBsZXRlIiwiZWRpdERlYWRsaW5lIiwiZWRpdFVyZ2VuY3kiLCJFZGl0SWNvbiIsIlN1Ym1pdEljb24iLCJDYW5jZWxJY29uIiwidGFza0lzRG9uZSIsImFwcGVuZCIsInByb2plY3RUaXRsZSIsInByb2plY3RUaXRsZUxhYmVsIiwicHJvamVjdFRpdGxlU3BhbiIsImRlc2NyaXB0aW9uQ29udCIsImRlc2NyaXB0aW9uVGl0bGUiLCJkZXNjcmlwdGlvblpvbmUiLCJkZXNjcmlwdGlvblN1YlpvbmUiLCJkZXNjcmlwdGlvbklucHV0IiwiZGVzY3JpcHRpb25FZGl0QnV0dFpvbmUiLCJkZXNjcmlwdGlvbkVkaXRCdXR0b24iLCJoZWlnaHQiLCJjdXJzb3IiLCJkZXNjcmlwdGlvblN1Ym1pdCIsImRlc2NyaXB0aW9uQ2FuY2VsQnV0dG9uIiwiY29udGFpbmVyMSIsImNvbnRhaW5lcjFfZGl2MSIsInByb2dyZXNzVGl0bGUiLCJzdGF0dXNab25lIiwic3RhdHVzRWRpdEJ1dHRab25lIiwic3RhdHVzRWRpdEJ1dHRvbiIsInN0YXR1c1N1Ym1pdCIsInN0YXR1c0NhbmNlbEJ1dHRvbiIsInN0YXR1c0VkaXRJbnB1dCIsIm9uZ29pbmdPcHRpb24iLCJkb25lT3B0aW9uIiwib25Ib2xkT3B0aW9uIiwiY29udGFpbmVyMV9kaXYyIiwiZGVhZGxpbmVab25lIiwiZGVhZGxpbmVTdWJab25lIiwiZGVhZGxpbmVUaXRsZSIsImRlYWRsaW5lSW5wdXQiLCJkZWFkbGluZUVkaXRCdXR0Wm9uZSIsImRlYWRsaW5lRWRpdEJ1dHRvbiIsImRlYWRsaW5lU3VibWl0IiwiZGVhZGxpbmVDYW5jZWxCdXR0b24iLCJ0b0RhdGUiLCJuZXdEYXRlIiwiY29udGFpbmVyMiIsImNvbnRhaW5lcjJfZGl2MSIsInVyZ2VuY3lab25lIiwidXJnZW5jeVN1YlpvbmUiLCJ1cmdlbmN5VGl0bGUiLCJ1cmdlbmN5SW5wdXQiLCJsb3dQcmlvcml0eSIsIm1vZGVzdFByaW9yaXR5IiwiaGlnaFByaW9yaXR5IiwidXJnZW5jeUVkaXRCdXR0Wm9uZSIsInVyZ2VuY3lFZGl0QnV0dG9uIiwidXJnZW5jeVN1Ym1pdCIsInVyZ2VuY3lDYW5jZWxCdXR0b24iLCJjb250YWluZXIyX2RpdjIiLCJkYXRlQ3JlYXRlZFRpdGxlIiwiYnV0dENvbnQiLCJkZWwiLCJjbG9zZSIsIm5vZGVzIiwibm9kZVZhbHVlIiwiU2VjQWRkQnV0dG9uIiwiU2VjQ2FuY2VsQnV0dG9uIiwic2lnbk91dCIsIm5hbWUiLCJlbWFpbCIsInVzZXJJRCIsImdldFVzZXJJbmZvIiwiZk5hbWUiLCJlbWFpbEFkZHJlc3MiLCJjaGVja1Bhc3MiLCJwYXNzIiwidHJpbSIsImNoZWNrQWxsUGFzcyIsImNvbmZpcm1QYXNzIiwiY2hlY2tGaXJzdCIsImNoZWNrTGFzdCIsImNoZWNrRW1haWwiLCJzcGxpdCIsImFycjIiLCJzaWduSW5XaXRoRW1haWxBbmRQYXNzd29yZCIsImluaXRpYWxVc2VySW5mbyIsInBhc3N3b3JkIiwidXNlckluZm8iLCJ1c2VyQ3JlZGVudGlhbCIsImVycm9yQ29kZSIsImVycm9yTWVzc2FnZSIsImNyZWF0ZVVzZXJXaXRoRW1haWxBbmRQYXNzd29yZCIsImZpcnN0TmFtZSIsImxhc3ROYW1lIiwidXNlckNyZWRlbnRpYWxzIiwiZmlyc3RfbmFtZSIsImxhc3RfbmFtZSJdLCJzb3VyY2VSb290IjoiIn0=