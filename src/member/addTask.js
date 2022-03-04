import firebase from 'firebase/compat/app';
import { getAuth } from 'firebase/auth'
import { doc, setDoc, collection, query, where, Timestamp, getDoc, getDocs, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../initializeFirebase.js';
import { formatDistance, subDays } from 'date-fns';
import { generateCode } from '../components/randGen.js'; 
import { retrieveProjectList, retrieveProjectNamesList, getProjectNamesList} from '../getProjectList.js'; 
import { renderProjects, addTaskToProjectDisplay } from './display/displayProject.js';
import { setProjectID } from './renderSecAddTaskButtons.js';

const auth = getAuth();


const InitTaskInfo = {
    title: '',
    deadline: '',
    status: '',
    urgency: '',
    projectID: '',
    description: '',
}

var taskInfo = {
    title: '',
    deadline: '',
    status: '',
    urgency: '', 
    projectID: '', 
    description: '', 
}

const urgency = ['Low Priority', 'Modest Level Priority', 'High Priority']; 
const statusOptions = ['Ongoing', 'Done', 'Put on hold']; 

export const renderAddTaskPanel = () => {
const element = "<h1 style = 'margin-top: 50px;'>Add Task</h1>" +
            "<div id = 'addProjectPanelContainer'>" +
                "<div id = 'inputField'>" +
                    "<h3>Name of Task</h3>" +
                    "<input type = 'text' id = 'add_taskName' />" +
            "</div>" +
            "<div id = 'inputField' style = 'margin-top: 20px;'>" +
                "<h3>Descripton</h3>" +
                "<textarea type = 'text' id = 'addTask_description' rows = 2 placeholder = '[Optional] Briefly, describe your task.'></textarea>" +
            "</div>" +
                "<div id = 'addProject_2ndcontainer' >" +
                    "<div id = 'task_status_input'>" +
                        "<h3>Progress Status</h3>" +
                        "<select id = 'addTask_status'>" +
                        "<option value = '0'>Ongoing</option>" +
                        "<option value = '1'>Done</option>" +
                        "<option value = '2'>Put on hold</option>" +
                        "</select>" +
                    "</div>" +
                    "<div id = 'task_deadline_input_container'>" +
                        "<h3>Deadline Date</h3>" +
                        "<input type = 'date' id = 'task_deadlineInput' />" +
                    "</div>" +
                "</div>" +
                "<div id = 'addProject_2ndcontainer' >" +
                    "<div id = 'Task_priority_input'>" +
                        "<h3>Urgency</h3>" +
                        "<select id = 'addTask_urgency'>" +
                        "<option value = '0'>Low priority</option>" +
                        "<option value = '1'>Modest level priority</option>" +
                        "<option value = '2'>High priority</option>" +
                        "</select>" +
                    "</div>" +
                    "<div id = 'Project_category_container'>" + 
                        "<h3>Project Category</h3>" + 
                        "<div id = 'AssignProject'></div>" +
                    "</div>" +
                "</div>" +
                "<div id = 'AddTaskButtonContainer'>" +
                    "<div id = 'AddTaskButtonContainer_box1'>" +
                      "<button id = 'addTaskButton'>Add</button>" +
                    "</div>" +
                    "<div id = 'AddProjectButtonContainer_box1'>" +
                    "<button id = 'CancelAddTaskButton'>Cancel</button>" +
                    "</div>" +
                "</div>" +
        "</div>";

    return element;
}


export const openAddTaskPanel = () => {
    const ProjectPanel = document.getElementById('addTaskPanel');
    ProjectPanel.style.display = 'inline-block';

    //deselect the value in the Project Select list 
    const ProjectSelect = document.getElementById('AddTask_ProjectCategory_Selection'); 
    ProjectSelect.selectedIndex = '-1'; 
}

export const closeAddTaskPanel = () => {
    const ProjectPanel = document.getElementById('addTaskPanel');
    ProjectPanel.style.display = 'none';
    taskInfo = Object.assign(InitTaskInfo);
    document.getElementById('add_taskName').value = '';
    document.getElementById('addTask_description').value = '';
    document.getElementById('addTask_status').value = 0;
    document.getElementById('task_deadlineInput').value = '';
    document.getElementById('AddTask_ProjectCategory_Selection').value = 'none';

} 

//This is working, but it's slow
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
export const fillTaskSelection = async () => {
    while (ProjectList.length > 0) {
        ProjectList.pop();
    }
    ProjectList = [];
    const q = query(collection(db, 'project', auth.currentUser.uid, 'ProjectList'), orderBy('title', 'asc'));
    const snapshot = await getDocs(q)
        .then(async data => {
            data.forEach(async snap => {
                const obj = ({
                    id: snap.id,
                    title: snap.data().title
                })

                ProjectList.push(obj);
            })
        })
    //console.log(ProjectList)
}

//This is fills up the select tag that allows the user to select which project category the task is assigned to
export const renderProjectCategory = async () => {
    const element = document.createElement('select');
    element.setAttribute('id', 'AddTask_ProjectCategory_Selection');
    const firstOption = document.createElement('OPTION');
    firstOption.value = 'none';
    firstOption.innerHTML = 'none';
    element.appendChild(firstOption);
    await fillTaskSelection();

    for (var i = 0; i < ProjectList.length; i++) {
        const op = document.createElement('OPTION')
        op.innerHTML = ProjectList[i].title;
        op.value = ProjectList[i].id;
        element.appendChild(op)
    }
    return element;
} 

//This function is called when user creates a new project. This function adds the project to the Project Category Select Tag 
export const addProjectToSelection = (title, ID) => {
    const newOption = document.createElement('OPTION');
    newOption.innerHTML = title;
    newOption.value = ID
    document.getElementById('AddTask_ProjectCategory_Selection').appendChild(newOption); 
}

export const handleAddTask = async () => {
    taskInfo.title = document.getElementById('add_taskName').value;

    var closeWindow = true; 
    if (taskInfo.title != '') {
        taskInfo.deadline = document.getElementById('task_deadlineInput').value;
        const deadline_date = new Date(taskInfo.deadline);
        if (Timestamp.fromDate(deadline_date) >= Timestamp.now()) {
            taskInfo.description = document.getElementById('addTask_description').value;
            taskInfo.status = statusOptions[document.getElementById('addTask_status').value];
            taskInfo.projectID = document.getElementById('AddTask_ProjectCategory_Selection').value;
            taskInfo.urgency = urgency[document.getElementById('addTask_urgency').value];
            const codeID = generateCode(20);            
            const docData = {
                title: taskInfo.title,
                ProjectID: taskInfo.projectID,
                description: taskInfo.description,
                status: taskInfo.status,
                urgency: taskInfo.urgency,
                deadline: Timestamp.fromDate(deadline_date),
                dateCreated: Timestamp.now(),
                isFinished: false, 
            }

            await setDoc(doc(db, 'task', auth.currentUser.uid, 'TaskList', codeID), docData)
                .then(snap => {
                    addTaskToProjectDisplay(taskInfo.projectID, codeID, taskInfo.title, taskInfo.description, taskInfo.urgency, taskInfo.status, taskInfo.deadline, taskInfo.dateCreated, taskInfo.isFinished); 
                    closeWindow = true;
                 })
                .catch((error) => {
                    alert(error.code + ": " + error.message);
                })

            closeWindow = true;
        }
        else {
            alert("The date you've chosen cannot be earlier than today's date. ")
            closeWindow = false; 
        }
        
    }
    else {
        alert('Please, type the name of your task.')
        closeWindow = false; 
    }

    if (closeWindow) {
        closeAddTaskPanel(); 
    }
}

//This is not working because for some reason selectedIndex is not working as it is intended.
export function openAddTaskPanelwithProjectID(projectID) {
    const ProjectSelect = document.getElementById('AddTask_ProjectCategory_Selection'); 
    console.log(ProjectSelect.selctedIndex);
    for (var i = 0; i < ProjectSelect.options.length; i++) {
        if (projectID === ProjectSelect.options[i].value) {
            ProjectSelect.selectedIndex = i;
        }
        else {
           
        }
    }
//    console.log(ProjectSelect.selectedIndex);
    openAddTaskPanel(); 
}

var SecondaryTaskInfo = {
    title: '',
    deadline: '',
    status: '',
    urgency: '',
    projectID: '',
    description: '',
}

//Secondary Add Task Panel 
export const renderSecAddTaskPanel = () => {
    const element = "<h1 style = 'margin-top: 50px;'>Add Task</h1>" +
        "<div id = 'addProjectPanelContainer'>" +
        "<div id = 'inputField'>" +
        "<h3>Name of Task</h3>" +
        "<input type = 'text' id = 'add_taskName-SEC' />" +
        "</div>" +
        "<div id = 'inputField' style = 'margin-top: 20px;'>" +
        "<h3>Descripton</h3>" +
        "<textarea type = 'text' id = 'addTask_description-SEC' rows = 2 placeholder = '[Optional] Briefly, describe your task.'></textarea>" +
        "</div>" +
        "<div id = 'addProject_2ndcontainer' >" +
        "<div id = 'task_status_input'>" +
        "<h3>Progress Status</h3>" +
        "<select id = 'addTask_status-SEC'>" +
        "<option value = '0'>Ongoing</option>" +
        "<option value = '1'>Done</option>" +
        "<option value = '2'>Put on hold</option>" +
        "</select>" +
        "</div>" +
        "<div id = 'task_deadline_input_container'>" +
        "<h3>Deadline Date</h3>" +
        "<input type = 'date' id = 'task_deadlineInput-SEC' />" +
        "</div>" +
        "</div>" +
        "<div id = 'addProject_2ndcontainer' >" +
        "<div id = 'Task_priority_input'>" +
        "<h3>Urgency</h3>" +
        "<select id = 'addTask_urgency-SEC'>" +
        "<option value = '0'>Low priority</option>" +
        "<option value = '1'>Modest level priority</option>" +
        "<option value = '2'>High priority</option>" +
        "</select>" +
        "</div>" +
        "<div id = 'Project_category_container'>" +
        "<h3>Project Category</h3>" +
        "<div id = 'AssignProject-SEC'></div>" +
        "</div>" +
        "</div>" +
        "<div id = 'AddTaskButtonContainer'>" +
            "<div id = 'AddTaskButtonContainer_box1'>" +
                 "<button id = 'addTaskButton-SEC'>Add</button>" +
            "</div>" +
            "<div id = 'AddProjectButtonContainer_box1'>" +
             "<button id = 'CancelAddTaskButton-SEC'>Cancel</button>" +
            "</div>" +
        "</div>" +
        "</div>";

    return element;
}

//function for closing the Secondary Add Task panel 
export const closeSecAddTaskPanel = () => {
    const panel = document.getElementById('SecondaryAddTaskPanel');
    panel.style.display = 'none';
    //reset values 
    SecondaryTaskInfo = Object.assign(InitTaskInfo);
    document.getElementById('add_taskName-SEC').value = '';
    document.getElementById('task_deadlineInput-SEC').value = '';
    document.getElementById('addTask_description-SEC').value = ''; 
    document.getElementById('addTask_status-SEC').value = 0;
    document.getElementById('addTask_urgency-SEC').value = 0;

    document.getElementById('AssignProject-SEC').childNodes[0].remove();

}

var count = 0; 

export const openSecAddTaskPanel = (title, ProjectID) => {
    SecondaryTaskInfo = Object.assign(InitTaskInfo);
        //get ID of Project Category element 
    const ProjectCat = document.getElementById('AssignProject-SEC');
    const panel = document.getElementById('SecondaryAddTaskPanel');    
    panel.style.display = 'inline-block'; 
    const Projecttitle = document.createElement('span'); 
    Projecttitle.innerHTML = title; 
    Projecttitle.setAttribute('id', 'SecAddTask_ProjectTitle')
    ProjectCat.appendChild(Projecttitle); 

    //The following commented-out code is an example of what not to do. 
    //I think it's a bad idea to add an event listener to the button in this function.
    //Everytime the function gets called, the event listener gets added despite there being another event listener attached already.
    //So, multiple event listeners get attached. 
    /*
    const AddButton = document.getElementById('addTaskButton-SEC');
    AddButton.addEventListener('click', () => { handleSecondaryAddTask(ProjectID) })

    document.getElementById('CancelAddTaskButton-SEC').addEventListener('click', function () {
        closeSecAddTaskPanel();
    })*/


    setProjectID(ProjectID);
}


export const handleSecondaryAddTask = async (ProjectID) => {
    SecondaryTaskInfo.title = document.getElementById('add_taskName-SEC').value;
    var closeWindow = true;
    if (SecondaryTaskInfo.title != '') {
        SecondaryTaskInfo.deadline = document.getElementById('task_deadlineInput-SEC').value;
        const deadline_date = new Date(SecondaryTaskInfo.deadline);
        if (Timestamp.fromDate(deadline_date) >= Timestamp.now()) {
            SecondaryTaskInfo.description = document.getElementById('addTask_description-SEC').value;
            SecondaryTaskInfo.status = statusOptions[document.getElementById('addTask_status-SEC').value];
            SecondaryTaskInfo.projectID = ProjectID;
            SecondaryTaskInfo.urgency = urgency[document.getElementById('addTask_urgency-SEC').value];
            const currentTime = Timestamp.now();
            const codeID = generateCode(20);
            const docData = {
                title: SecondaryTaskInfo.title,
                ProjectID: SecondaryTaskInfo.projectID,
                description: SecondaryTaskInfo.description,
                status: SecondaryTaskInfo.status,
                urgency: SecondaryTaskInfo.urgency,
                deadline: Timestamp.fromDate(deadline_date),
                dateCreated: currentTime,
                isFinished: false,
            }
            await setDoc(doc(db, 'task', auth.currentUser.uid, 'TaskList', codeID), docData)
                .then(snap => {
                    addTaskToProjectDisplay(SecondaryTaskInfo.projectID, codeID, SecondaryTaskInfo.title, SecondaryTaskInfo.description, SecondaryTaskInfo.urgency, SecondaryTaskInfo.status, Timestamp.fromDate(deadline_date), currentTime, false );
                    closeWindow = true;
                })
                .catch((error) => {
                    alert(error.code + ": " + error.message);
                })
            closeWindow = true;
        }
        else {
            alert("The date you've chosen cannot be earlier than today's date. ")
            closeWindow = false;
        }

    }
    else {
        alert('Please, type the name of your task.')
        closeWindow = false;
    }

    if (closeWindow) {
        closeSecAddTaskPanel();
    }
}