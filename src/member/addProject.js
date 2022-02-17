import firebase from 'firebase/compat/app'; 
import { getAuth } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../initializeFirebase.js';

export const renderAddProj = () => {
    const element = "<h1>Add Project</h1>" +
        "<div id = 'addProjectPanelContainer'>" +
        "<div id = 'inputField'>" + 
        "<input type = 'text' id = 'add_projectTitle' value = 'Project name' />" +
        "</div>" + 
        "<h3>Progression Status</h3>" +
        "<select id = 'addProject_selection'>" +
        "<option value = '0'>Ongoing</option>" +
        "<option value = '1'>Done</option>" +
        "<option value = '2'>Put on hold</option>" +
        "</select>" +
        "<button>Add Project</button>"+
        "</div>";

    return element;
}
export const openAddProjectPanel = () => {
    const ProjectPanel = document.getElementById('addProjectPanel');
    ProjectPanel.style.display = 'flex'; 
} 

export const closeAddProjectPanel = () => {
    const ProjectPanel = document.getElementById('addProjectPanel');
    ProjectPanel.style.display = 'none';
} 