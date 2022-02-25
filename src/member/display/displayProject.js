import { retrieveProjectNamesList, getTaskListByProjectID, delProject } from '../../getProjectList.js'; 
import { getAuth } from 'firebase/auth'
import { doc, setDoc, collection, query, where, Timestamp, getDoc, getDocs, orderBy} from 'firebase/firestore';
import { db } from '../../initializeFirebase.js';
import trashIcon from '../../asset/trash.png'; 
import addIcon from '../../asset/add.png';
import { openAddTaskPanelwithProjectID, openAddTaskPanel, openSecAddTaskPanel  } from '../addTask.js'; 

const list = []; 

const auth = getAuth();

export const fillProjectList = async () => {
    const q = query(collection(db, 'project', auth.currentUser.uid, 'ProjectList'), orderBy('title', 'asc'));
    const snapshot = await getDocs(q).then(data => {
        data.forEach(async snap => {
            const obj = ({
                id: snap.id,
                title: snap.data(). title
            })
            list.push(obj)
        })
    })
}

export const renderProjects = async () => {
    const displayCont = document.getElementById('displayProjectsContent'); 
    await fillProjectList();
  //  const list = await retrieveProjectNamesList(); 
    for (var i = 0; i < list.length; i++){
        //create container
        const container = document.createElement('div')
        container.setAttribute('id', 'projectItemContainer')
        container.style.display = 'grid'; 
        displayCont.appendChild(container); 

        //create the list item
        const ProjectButton = document.createElement('button');
        ProjectButton.setAttribute('id', 'projectTitleButton');
 
        ProjectButton.innerHTML = list[i].title;
        const Project_id = list[i].id; 
        const Project_title = list[i].title; 
        //create div for trash button to appear 
        const trashContainer = document.createElement('div');
        trashContainer.setAttribute('id', 'trashContainer'); 

        //renders the delete button for each project 
        const delButton = document.createElement('img'); 
        delButton.setAttribute('id', 'trashIcon')
        delButton.src = trashIcon; 
        trashContainer.appendChild(delButton)
        delButton.addEventListener('click', function () {
            handleDelProject(Project_title, Project_id)
           // delProject(Project_id);
           // renderProjects();
        });
        //create a mouseover event for the container for the trash icon to appear 
        container.addEventListener('mouseover', function () {
            delButton.style.display = 'block';
        })
        container.addEventListener('mouseout', function () {
            delButton.style.display = 'none';
        })

        container.appendChild(ProjectButton);
        container.appendChild(trashContainer);

        //obtain tasks of each project 
        const tasks = await getTaskListByProjectID(list[i].id)
        const panel = document.createElement('div'); 
        panel.setAttribute('id', 'AllProjectTasks'); 
        const listElement = document.createElement('ul');
        listElement.setAttribute('id', Project_id)
        if (tasks.length !== 0) {
            tasks.forEach(val => {           
                const listItem = document.createElement('li');
                const check = document.createElement('INPUT'); 
                check.setAttribute("type", "checkbox")
                check.setAttribute('class', 'task_checkbox'); 
                listItem.appendChild(check);
                const listText = document.createElement('span');
                listText.innerHTML = val.title; 
                listItem.appendChild(listText);
                listItem.setAttribute('class', 'taskListItem'); 
                listElement.appendChild(listItem)
            })
        }

        //adds an option for users to add Task under each Project
        const addTaskElement = document.createElement('li');
        const plusIcon = document.createElement('IMG'); 
        plusIcon.src = addIcon; 
        plusIcon.setAttribute('id', 'add_icon')
 
        plusIcon.style.display = 'inline-block';
        addTaskElement.appendChild(plusIcon); 
        const addTaskPrompt = document.createElement('span');
        addTaskPrompt.innerHTML = 'Add Task'; 
        addTaskPrompt.style.display = 'inline-block';
        addTaskElement.appendChild(addTaskPrompt); 
        addTaskElement.setAttribute('class', 'addTaskListItem ')
        addTaskElement.setAttribute('id', 'addTaskListItem')

        //add function for Add Task 
        addTaskElement.addEventListener('click', function () { openSecAddTaskPanel(Project_title, Project_id)  })

        listElement.appendChild(addTaskElement);
        panel.appendChild(listElement) 

        ProjectButton.addEventListener('click', function () {
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null; 
            }
            else {
                panel.style.maxHeight = panel.scrollHeight + 'px'; 
            }
        })

        // ProjectButton.appendChild(panel);
        container.appendChild(panel);
    }
}

//This adds project to the Projects View when the user uses the Add Project panel to create a new project
export const addProjectToProjectDisplay = (title, ID) => {
    const displayCont = document.getElementById('displayProjectsContent'); 
    //create container
    const container = document.createElement('div')
    container.setAttribute('id', 'projectItemContainer')
    container.style.display = 'grid';
    displayCont.appendChild(container);

    //create the list item
    const ProjectButton = document.createElement('button');
    ProjectButton.setAttribute('id', 'projectTitleButton');
    ProjectButton.innerHTML = title; 

    const trashContainer = document.createElement('div');
    trashContainer.setAttribute('id', 'trashContainer');

    const delButton = document.createElement('img');
    delButton.setAttribute('id', 'trashIcon')
    delButton.src = trashIcon;
    trashContainer.appendChild(delButton)
    delButton.addEventListener('click', function () {
        handleDelProject(title, ID)
    });
    container.addEventListener('mouseover', function () {
        delButton.style.display = 'block';
    })
    container.addEventListener('mouseout', function () {
        delButton.style.display = 'none';
    })

    container.appendChild(ProjectButton);
    container.appendChild(trashContainer);

    //start
    const panel = document.createElement('div'); 
    panel.setAttribute('id', 'AllProjectTasks')
    const listElement = document.createElement('ul');
    listElement.setAttribute('id', ID); 
    const addTaskElement = document.createElement('li');
    const plusIcon = document.createElement('IMG');
    plusIcon.src = addIcon;
    plusIcon.setAttribute('id', 'add_icon')

    plusIcon.style.display = 'inline-block';
    addTaskElement.appendChild(plusIcon);
    const addTaskPrompt = document.createElement('span');
    addTaskPrompt.innerHTML = 'Add Task';
    addTaskPrompt.style.display = 'inline-block';
    addTaskElement.appendChild(addTaskPrompt);
    addTaskElement.setAttribute('class', 'addTaskListItem ')
    addTaskElement.setAttribute('id', 'addTaskListItem')

    //add function for Add Task 
    addTaskElement.addEventListener('click', function () { openSecAddTaskPanel(title, ID) })

    listElement.appendChild(addTaskElement);
    panel.appendChild(listElement)


    ProjectButton.addEventListener('click', function () {
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        }
        else {
            panel.style.maxHeight = panel.scrollHeight + 'px';
        }
    })

    // ProjectButton.appendChild(panel);
    container.appendChild(panel);
}

//function that allows other elements to add tasks to the Project Display 
export const addTaskToProjectDisplay = (ProjectID, TaskID, title) => {
    const listElement = document.getElementById(ProjectID); 
    const listItem = document.createElement('li');
    const check = document.createElement('INPUT');
    check.setAttribute("type", "checkbox")
    check.setAttribute('class', 'task_checkbox');
    listItem.appendChild(check);
    const listText = document.createElement('span')
    listText.innerHTML = title;
    listItem.appendChild(listText);
    listItem.setAttribute('class', 'taskListItem');
    listElement.insertBefore(listItem, listElement.lastChild)
    const panel = listItem.parentNode.parentNode;
    panel.style.maxHeight = panel.scrollHeight + 'px'

}

const handleDelProject = async (title, ID) => { 
    if (confirm('You are about to delete the project ' + title + '. \n Are you sure?')) {
        delProject(ID)
    }
    else {

    }
}