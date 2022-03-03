import { closeDisplayTask, loadDisplayTaskDom } from './displayTaskLogic.js';
import { deleteTask } from '../displayProject.js';
import EditIcon from '../../../asset/Edit.png'; 
import SubmitIcon from '../../../asset/check.png'; 
import CancelIcon from '../../../asset/cancel.png'; 
import { toggleStatusEdit } from './displayTaskButton.js'; 
import { editStatus } from './editFunctions.js'; 

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
    status: '',
    urgency: '',
    projectID: '',
    description: '',
    dateCreated: '',
    isFinished: false,
    id: '',
}

export const fillTaskInfo = (title, description, urgency, deadline, status, dateCreated, projectID, ID, taskIsDone) => {
    taskInfo.title = title;
    taskInfo.description = description;
    taskInfo.urgency = urgency;
    taskInfo.deadline = deadline;
    if (taskIsDone) {
        taskInfo.status = 'Done'
    }
    else
         taskInfo.status = status;
    taskInfo.dateCreated = dateCreated; 
    taskInfo.projectID = projectID;
    taskInfo.id = ID

}

const urgencyOptions = ['Low Priority', 'Modest Level Priority', 'High Priority'];
const statusOptions = ['Ongoing', 'Done', 'Put on hold'];


export const close_DisplayTask = () => {
    taskInfo = Object.assign(initTaskInfo);

    document.getElementById('displaytasktitle').innerHTML = '';

    document.getElementById('displayTask_ProjectTitleSpan').innerHTML = '';

    if (taskInfo.description != '')
        document.getElementById('displayTask_description').innnerHTML = '';

    document.getElementById('displayTask_status').innerHTML = '';

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


export const renderTaskPanel = async (ProjTitle, ID) => {
    const displayTaskPanel = document.getElementById('displayTaskPanel');

    const element = document.createElement('div');
    element.setAttribute('id', 'displayTaskPanel_outerFrame');
    const taskTitle = document.createElement('h1');
    taskTitle.setAttribute('id', 'displaytasktitle')
    element.append(taskTitle)
    const projectTitle = document.createElement('h3');
    const projectTitleLabel = document.createElement('span');
    projectTitleLabel.innerHTML = 'Project: '
    const projectTitleSpan = document.createElement('span');
    projectTitleSpan.setAttribute('id', 'displayTask_ProjectTitleSpan');
    projectTitle.appendChild(projectTitleLabel);
    projectTitle.appendChild(projectTitleSpan);
    projectTitle.style.display = 'inline-block';
    element.appendChild(projectTitle);

    //description
    const descriptionCont = document.createElement('div');
    descriptionCont.setAttribute('id', 'description_container');
    const descriptionTitle = document.createElement('h4');
    descriptionTitle.innerHTML = 'Description';
    const description = document.createElement('p');
    description.setAttribute('id', 'displayTask_description');
    descriptionCont.appendChild(descriptionTitle);
    descriptionCont.appendChild(description);
    if (taskInfo.description != '')
        element.appendChild(descriptionCont);

    //container 1 displaying Progress and Deadline Date
    const container1 = document.createElement('div');
    container1.setAttribute('id', 'displayTask_cont1');

    const container1_div1 = document.createElement('div');
    container1_div1.setAttribute('class', 'displayTask_subCont')
    const progressTitle = document.createElement('h4');
    progressTitle.innerHTML = 'Progress Status';
    container1_div1.appendChild(progressTitle);
    //create the zone that contains the display div, input and the edit button 
    //NA
    const statusZone = document.createElement('div'); 
    statusZone.setAttribute('id', 'statusZone'); 

    //create 2nd tier zone that contains both the display div and input
    //it's placed side by side with the status Edit Zone 
    const statusSubZone = document.createElement('div'); 
    statusSubZone.setAttribute('id', 'statusSubZone'); 
    statusSubZone.setAttribute('class', 'SubZone')

    //elements for the edit button 
    const statusEditButtZone = document.createElement('div'); 
    statusEditButtZone.setAttribute('id', 'EditButtZone'); 
    const statusEditButton = document.createElement('IMG'); 
    statusEditButton.src = EditIcon; 
    statusEditButton.setAttribute('id', 'statusEditButton')
    statusEditButton.style.width = '25px'; 
    statusEditButton.style.height = '25px'; 
    statusEditButton.style.cursor = 'pointer'; 

    statusEditButtZone.appendChild(statusEditButton)

    //submit and cancel Button 
    const statusSubmit = document.createElement('IMG'); 
    statusSubmit.src = SubmitIcon; 
    statusSubmit.innerHTML = 'Submit'; 
    statusSubmit.setAttribute('class', 'displayTask_button')
    statusSubmit.setAttribute('id', 'statusSubmit')


    //cancel button
    const statusCancelButton = document.createElement('IMG');
    statusCancelButton.src = CancelIcon;
    statusCancelButton.innerHTML = 'Cancel';
    statusCancelButton.setAttribute('class', 'displayTask_button')
    statusCancelButton.setAttribute('id', 'statusCancelButton');
    statusCancelButton.addEventListener('click', toggleStatusEdit);
    statusEditButtZone.appendChild(statusSubmit);
    statusEditButtZone.appendChild(statusCancelButton);
    const status = document.createElement('p');
    status.setAttribute('id', 'displayTask_status');

    //input
    const statusEditInput = document.createElement('SELECT');
    statusEditInput.setAttribute('class', 'displayTask_editInput');
    statusEditInput.setAttribute('id', 'displayTask_statusInput')
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
    statusEditInput.appendChild(onHoldOption); 

    //functionality for the buttons 
    statusEditButton.addEventListener('click', () => {
        toggleStatusEdit();
        statusEditInput.value = taskInfo.status;
    }); 

    statusSubmit.addEventListener('click', () => {
        status.innerHTML = statusEditInput.value;
        editStatus(ID)
        toggleStatusEdit();
    })

    statusSubZone.appendChild(status); 
    statusSubZone.appendChild(statusEditInput); 

    statusZone.appendChild(statusSubZone); 
    statusZone.appendChild(statusEditButtZone);
    container1_div1.appendChild(statusZone);

  //  container1_div1.appendChild(status);

    const container1_div2 = document.createElement('div');
    container1_div2.setAttribute('class', 'displayTask_subCont')
    const deadlineTitle = document.createElement('h4');
    deadlineTitle.innerHTML = 'Deadline Date';
    const deadline = document.createElement('p');
    deadline.setAttribute('id', 'displayTask_deadline');
    container1_div2.appendChild(deadlineTitle);
    container1_div2.appendChild(deadline);

    container1.appendChild(container1_div1);
    container1.appendChild(container1_div2);
    element.appendChild(container1)

    //container 2 displaying urgency and dateCreated 
    const container2 = document.createElement('div');
    container2.setAttribute('id', 'displayTask_cont2');

    const container2_div1 = document.createElement('div');
    container2_div1.setAttribute('class', 'displayTask_subCont')
    const urgencyTitle = document.createElement('h4');
    urgencyTitle.innerHTML = 'Urgency';
    const urgency = document.createElement('p');
    urgency.setAttribute('id', 'displayTask_urgency');
    container2_div1.appendChild(urgencyTitle);
    container2_div1.appendChild(urgency);

    const container2_div2 = document.createElement('div');
    container2_div2.setAttribute('class', 'displayTask_subCont')
    const dateCreatedTitle = document.createElement('h4');
    dateCreatedTitle.innerHTML = 'Date Created';
    const dateCreated = document.createElement('p');
    dateCreated.setAttribute('id', 'displayTask_dateCreated');
    container2_div2.appendChild(dateCreatedTitle);
    container2_div2.appendChild(dateCreated);

    container2.appendChild(container2_div1);
    container2.appendChild(container2_div2);
    element.appendChild(container2)

    //Div for the butons

    const buttCont = document.createElement('div')
    buttCont.setAttribute('id', 'displayTask_buttonCont');

    //const edit = document.createElement('button');
    const del = document.createElement('button');
    const close = document.createElement('button');

    //edit.setAttribute('id', 'displayTask_editButton')
    del.setAttribute('id', 'displayTask_delButton')
    close.setAttribute('id', 'displayTask_closeButton')
    //edit.innerHTML = 'Edit';
    del.innerHTML = 'Delete';
    close.innerHTML = 'Close';

   // buttCont.appendChild(edit);
    buttCont.appendChild(del);
    buttCont.appendChild(close);
    element.appendChild(buttCont);

    close.addEventListener('click', close_DisplayTask);
    del.addEventListener('click', () => { deleteTask(taskInfo.id) })
    //    edit.addEventListener('click', )

    displayTaskPanel.appendChild(element);

    //start logic
    projectTitleSpan.innerHTML = ProjTitle;
    taskTitle.innerHTML = taskInfo.title;
    description.innerHTML = taskInfo.description;
    status.innerHTML = taskInfo.status;
    deadline.innerHTML = taskInfo.deadline.toDate().toLocaleDateString();
    urgency.innerHTML = taskInfo.urgency;
    dateCreated.innerHTML = taskInfo.dateCreated.toDate().toLocaleDateString();

    //remove Object Promise Tag
    const nodes = displayTaskPanel.childNodes;
    if(nodes[0].nodeValue === "[object Promise]")
        nodes[0].remove();
}



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
