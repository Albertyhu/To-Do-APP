import { doc, collection, getDoc, getDocs, query } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../../../initializeFirebase.js';

const auth = getAuth();

var initTaskInfo = {
    title: '',
    deadline: '',
    status: 0,
    urgency: 0,
    projectID: '',
    description: '',
    dateCreated: '',
    isFinished: false,
    id: '',
}
var taskInfo = {
    title: '',
    deadline: '',
    status: 0,
    urgency: 0,
    projectID: '',
    description: '',
    dateCreated: '',
    isFinished: false,
    id: '',
}
const displayTaskPanel = document.getElementById('displayTaskPanel'); 

const urgencyOptions = ['Low Priority', 'Modest Level Priority', 'High Priority'];
const statusOptions = ['Ongoing', 'Done', 'Put on hold'];

var ProjectID = ''; 
var TaskID = ''; 

export const getID = (ProjID, Task_ID) => {
    ProjectID = ProjID; 
    TaskID = Task_ID; 
}

var taskTitle = null;
var projTitleSpan = null;
var description = null;
var progress_status = null;
var deadline_date = null;
var urgency = null;
var dateCreated = null;
/*
document.getElementById('displayTaskPanel_outerFrame').addEventListener('load', function () {
    taskTitle = document.getElementById('displaytasktitle');
    projTitleSpan = document.getElementById('displayTask_ProjectTitleSpan');
    description = document.getElementById('displayTask_description');
    progress_status = document.getElementById('displayTask_status');
    deadline_date = document.getElementById('displayTask_deadline');
    urgency = document.getElementById('displayTask_urgency');
    dateCreated = document.getElementById('displayTask_dateCreated');
}); 
*/

export const displayTaskDetails = async (ProjTitle, ID) => { 
    /*
    const taskTitle = document.getElementById('displaytasktitle');
    const projTitleSpan = document.getElementById('displayTask_ProjectTitleSpan');
    const description = document.getElementById('displayTask_description');
    const progress_status = document.getElementById('displayTask_status');
    const deadline_date = document.getElementById('displayTask_deadline');
    const urgency = document.getElementById('displayTask_urgency');
    const dateCreated = document.getElementById('displayTask_dateCreated');
    */
    projTitleSpan.innerHTML = ProjTitle;
    const q = query(doc(db, 'task', auth.currentUser.uid, 'TaskList', ID))
    /*
    const snapshot = await getDoc(q).then(snap => {
        snap.forEach(item => {
            taskInfo.title = item.data().title;
            taskInfo.description = item.data().description;
            taskInfo.urgency = item.data().urgency;
            taskInfo.projectID = item.data().projectID;
            taskInfo.deadline = item.data().deadline;
            taskInfo.status = item.data().status;
            taskInfo.id = item.id;
        }).then(item => {
            const taskTitle = document.getElementById('displayTaskTitle');
            taskTitle.innerHTML = taskInfo.title;

            const projTitleSpan = document.getElementById('displayTask_ProjectTitleSpan');
            projTitleSpan.innerHTML = ProjTitle;

            const description = document.getElementById('displayTask_description');
            description.innerHTML = taskInfo.description;

            const progress_status = document.getElementById('displayTask_status');
            progress_status.innertHTML = taskInfo.status;

            const deadline_date = document.getElementById('displayTask_deadline');
            deadline_date.innerHTML = taskInfo.deadline;

            const urgency = document.getElementById('displayTask_urgency');
            urgency.innerHTML = taskInfo.urgency;

            const dateCreated = document.getElementById('displayTask_dateCreated');
            dateCreated.innerHTML = taskInfo.dateCreated;

        })
    }).catch(e => {
        console.log(e.code + ': ' + e.message)
    })
    */
    const snapshot = await getDoc(q).then(item => {
        taskInfo.title = item.data().title;
        taskInfo.description = item.data().description;
        taskInfo.urgency = item.data().urgency;
        taskInfo.projectID = item.data().projectID;
        taskInfo.deadline = item.data().deadline;
        taskInfo.status = item.data().status;
        taskInfo.id = item.id;
    })
   /*     .catch(e => {
        console.log(e.code + ': ' + e.message)
    })*/
    taskTitle.innerHTML = taskInfo.title;
    description.innerHTML = taskInfo.description;
    progress_status.innertHTML = taskInfo.status;
    deadline_date.innerHTML = taskInfo.deadline;
    urgency.innerHTML = taskInfo.urgency;
    dateCreated.innerHTML = taskInfo.dateCreated;

}

export const loadDisplayTaskDom = () => {
    console.log(taskTitle)
    taskTitle = document.getElementById('displaytasktitle');
    projTitleSpan = document.getElementById('displayTask_ProjectTitleSpan');
    description = document.getElementById('displayTask_description');
    progress_status = document.getElementById('displayTask_status');
    deadline_date = document.getElementById('displayTask_deadline');
    urgency = document.getElementById('displayTask_urgency');
    dateCreated = document.getElementById('displayTask_dateCreated');
}

export const openDisplayTask = (ProjTitle, ID) => {
   // console.log('Project title: ' + ProjTitle);
   // console.log('ID: ' + ID)

    const taskPanel = document.getElementById('displayTaskPanel');
    taskPanel.style.display = 'inline-block';
    displayTaskDetails(ProjTitle, ID);

}

export const closeDisplayTask = () => {
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

    var child = taskPanel.lastElementChild
    while (child) {
        taskPanel.removeChild(child);
        child = taskPanel.lastElementChild
    }   
}
