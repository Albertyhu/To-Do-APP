import { renderSignOutButton, handleSignOut } from './signOutButton.js'; 
//import { renderAdminPanel } from './adminPanel.js';

export const renderToDo = () => {
    const element = document.createElement('div');
    element.innerHTML = "<div id = 'member-innerContainer'>" +
            "<div id = 'center_container'>" + 
                "<div id = 'side-panel'></div>" +
                "<div id = 'output-panel'>" +
                    "<div id = 'displayContainer'>" +
                        "<div id = 'displayProjectCon'>" +
                            "<h2>Projects</h2>" +
                            "<div id = 'displayProjectsContent'></div>" +
                        "</div>" + 
                        "<div id = 'displayTodayCon'>" +
                            "<h2>Today's Tasks</h2>" +
                            "<div id = 'displayTodayContent'></div>" +
                        "</div>" + 
                        "<div id = 'displayWeekCon'>" +
                            "<h2>This Week's Tasks</h2>" +
                            "<div id = 'displayWeekContent'></div>" +
                        "</div>" + 
                        "<div id = 'displayMonthCon'>" +
                            "<h2>This Month's Tasks</h2>" +
                            "<div id = 'displayMonthContent'></div>" +
                        "</div>" + 
                        "<div id = 'displaySingleProject'>" +
                        "</div>" + 
                        "<div id = 'displaySingleTask'>" +
                        "</div>" + 
                    "</div>" + 
                "</div >" + 
                "<div id = 'addProjectPanel'></div>" + 
                "<div id = 'addTaskPanel'></div>" + 
                "<div id = 'SecondaryAddTaskPanel'></div>" + 
                "<div id = 'displayTaskPanel'></div>" + 
            "</div>" + 
        "</div>";
//    element.appendChild(renderSignOutButton());
    return element; 
}




