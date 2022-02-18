import firebase from 'firebase/compat/app';
import { getAuth } from 'firebase/auth'
import { doc, setDoc, collection, query, where, Timestamp, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../initializeFirebase.js';
import { formatDistance, subDays } from 'date-fns';
import { generateCode } from '../components/randGen.js'; 


var projectInfo = {
    title: '',
    deadline: '',
    status: '',
    urgency: '', 
    projectID: '', 
    description: '', 
}


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
                        "<option value = '1'>Has some priority</option>" +
                        "<option value = '2'>High priority</option>" +
                        "</select>" +
                    "</div>" +
                    "<div id = 'Project_category_container'>" + 
                        "<h3>Project Category</h3>" + 
                        "<span id = 'AssignProject'></span>" +
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

}

export const closeAddTaskPanel = () => {
    const ProjectPanel = document.getElementById('addTaskPanel');
    ProjectPanel.style.display = 'none';
    projectInfo = Object.assign(InitProjectInfo);
    document.getElementById('add_taskName').value = '';
    document.getElementById('addTask_description').value = '';
    document.getElementById('addTask_status').value = 0;
    document.getElementById('task_deadlineInput').value = '';
    document.getElementById('AssignProject_value').value = '';

} 
