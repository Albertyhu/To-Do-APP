import { handleSecondaryAddTask, closeSecAddTaskPanel } from './addTask.js'; 

var ProjectID = '';

export const AddFuncToSecButtons = () => {
    const SecAddButton = document.getElementById('addTaskButton-SEC');
    SecAddButton.addEventListener('click', () => { handleSecondaryAddTask(ProjectID) })

    const SecCancelButton = document.getElementById('CancelAddTaskButton-SEC')
    SecCancelButton.addEventListener('click', closeSecAddTaskPanel);
}

export const setProjectID = (ID) => {
    ProjectID = ID; 
}