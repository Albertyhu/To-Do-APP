import { displayProjects, displayToday, displayWeek, displayMonth } from './display/toggleDisplay.js'; 

export const renderAdminPanel = () => {
    const element = "<div id = 'adminPanelContainer'><ul id = 'adminPanel'>" +
        "<li id = 'admin-title'>View</li>" +
        "<li><button class = 'admin-options' id = 'adminProjectButton'>Projects</button></li>" +
        "<li><button class = 'admin-options' id = 'adminTodayButton'>Today</button></li>" +
        "<li><button class = 'admin-options' id = 'adminWeekButton'>Week</button></li>" +
        "<li><button class = 'admin-options' id = 'adminMonthButton'>Month</button></li>" +
        "<li id = 'admin-title'>Actions</li>" +
        "<li><button class = 'admin-options' id = 'Admin_addProjectButton'>Add Project</button></li>" +
        "<li><button class = 'admin-options' id = 'Admin_addTaskButton'>Add task</button></li>" +
        "<li><button class = 'admin-options' id = 'signOutButton'>Sign Out</button></li>" +
        "</ul></div>"; 

    return element;
}


