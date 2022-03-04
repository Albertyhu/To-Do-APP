const tasks = await getTaskListByProjectID(list[i].id)
const panel = document.createElement('div');
panel.setAttribute('id', 'AllProjectTasks');
const listElement = document.createElement('ul');
listElement.setAttribute('id', Project_id)
if (tasks.length !== 0) {
    tasks.forEach(val => {
        const listItem = document.createElement('li');

        //Add checkbox for each task in the display list
        const check = document.createElement('INPUT');
        check.setAttribute("type", "checkbox")
        check.setAttribute('class', 'task_checkbox');
        check.checked = val.isFinished;
        check.addEventListener('change', function () {
            //pass  the id and boolean value of the check box to toggleCheckBox so that the value in firebase reflects true value 
            toggleCheckBox(val.id, this.checked);
        })

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
            fillTaskInfo(taskTitle, taskDescription, taskUrgency, taskDeadline, taskStatus, taskDateCreated, Project_id, TaskID, check.checked)
            renderTaskPanel(Project_title, TaskID);
            displayTaskPanel.style.display = 'inline-block'
        });
        listText.innerHTML = val.title;
        listItem.appendChild(listText);
        listItem.setAttribute('class', 'taskListItem');
        listItem.setAttribute('id', TaskID)
        listElement.appendChild(listItem)

    })
}