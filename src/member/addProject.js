import firebase from 'firebase/compat/app'; 
import { getAuth } from 'firebase/auth'
import { doc, setDoc, collection, query, where, Timestamp, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../initializeFirebase.js';
import { formatDistance, subDays } from 'date-fns'; 
import { generateCode } from '../components/randGen.js'; 

const auth = getAuth(); 

const InitProjectInfo = {
    title: '',
    deadline: '',
    status: '',
}

var projectInfo = {
    title: '', 
    deadline: '',
    status: '', 
}

const statusOptions = ['Ongoing', 'Done', 'Put on hold']; 

export const renderAddProj = () => {
    const element = "<h1 style = 'margin-top: 50px;'>Add Project</h1>" +
        "<div id = 'addProjectPanelContainer'>" +
              "<div id = 'inputField'>" + 
              "<h3>Project Title</h3>" +
              "<input type = 'text' id = 'add_projectTitle' />" +
            "</div>" + 
            "<div id = 'addProject_2ndcontainer' >" + 
                "<div id = 'project_status_input'>" + 
                "<h3>Progress Status</h3>" +
                "<select id = 'addProject_selection'>" +
                "<option value = '0'>Ongoing</option>" +
                "<option value = '1'>Done</option>" +
                "<option value = '2'>Put on hold</option>" +
                "</select>" +
                "</div>" + 
                 "<div id = 'project_deadline_input'>" + 
                "<h3>Deadline Date</h3>" +
                "<input type = 'date' id = 'project_deadlineInput' />" +
                "</div>" + 
            "</div>" + 
           "<div id = 'AddProjectButtonContainer'>" + 
                "<div id = 'AddProjectButtonContainer_box1'>" + 
                "<button id = 'addProjectButton'>Add</button>" +
                "</div>" +
                "<div id = 'AddProjectButtonContainer_box1'>" + 
                "<button id = 'CancelAddProjectButton'>Cancel</button>" +
                "</div>" +
            "</div>" +
        "</div>";

    return element;
}

//retrieves an array of all Project ID's 

export const getProjectList = async () => {
    var projectList = []; 
    const q = query(collection(db, 'project', auth.currentUser.uid, "ProjectList"));
    const snapshot = await getDocs(q)
    snapshot.forEach(doc => {
        projectList.push(doc.id)
    })
    return projectList;
}

export const openAddProjectPanel = async () => {
    const ProjectPanel = document.getElementById('addProjectPanel');
    ProjectPanel.style.display = 'inline-block'; 

} 

export const closeAddProjectPanel = () => {
    const ProjectPanel = document.getElementById('addProjectPanel');
    ProjectPanel.style.display = 'none';
    projectInfo = Object.assign(InitProjectInfo);
    document.getElementById('add_projectTitle').value = '';
    document.getElementById('addProject_selection').value = 0;
    document.getElementById('project_deadlineInput').value = ''; 

} 

export const handleAddProject = async () => {
    projectInfo.title = document.getElementById('add_projectTitle').value; 
    projectInfo.status = statusOptions[document.getElementById('addProject_selection').value]; 
    projectInfo.deadline = document.getElementById('project_deadlineInput').value; 
    var closeWindow = true; 
    if (projectInfo.title) {
        const deadline_date = new Date(projectInfo.deadline);
        if (Timestamp.fromDate(deadline_date) >= Timestamp.now()) {
            let repeat = false;
            var codeID = generateCode(20); 
            //too slow
            /*
            const projectList = await getProjectList(); 
            do {
                codeID = 
                projectList.forEach(doc => {
                    if (codeID === doc) {
                        repeat = true;
                    }
                    else {
                        repeat = false; 
                    }
                })
            } while (repeat);
           */
            await setDoc(doc(db, 'project', auth.currentUser.uid, 'ProjectList', codeID), {
                title: projectInfo.title,
                status: projectInfo.status,
                deadline: Timestamp.fromDate(deadline_date),
            }).then(snap => {
                closeWindow = true; 

            })
                .catch((error) => {
                    alert(error.code + ": " + error.message);
                })
        }
        else {
            alert("The date you've chosen cannot be earlier than today's date. ")
            closeWindow = false; 
        }
    }
    else {
        alert('Please, type in the title of the project.')
        closeWindow = false; 
    }
    if(closeWindow)
         closeAddProjectPanel();
}