/*
export const renderAdminPanel = () => {
    const element = "<table id = 'adminPanel'>" +
        "<tr><th></th></tr>" + 
        "<tr><td>Add task</td></td>" + 
        "<tr><td>Yesterday</td></td>" + 
        "<tr><td>Today</td></td>" + 
        "<tr><td>Week</td></td>" + 
        "<tr><td>Month</td></td>" + 
        "<tr><td>Sign Out</td></td>" + 
        "<tr><td></td></td>" + 
        "</table>"

    return element; 
}*/

export const renderAdminPanel = () => {
    const element = "<div id = 'adminPanelContainer'><ul id = 'adminPanel'>" +
        "<li id = 'admin-title'>View</li>" +
        "<li><button class = 'admin-options' id = ''>Projects</button></li>" +
        "<li><button class = 'admin-options' id = ''>Today's Tasks</button></li>" +
        "<li><button class = 'admin-options' id = ''>This Week's Tasks</button></li>" +
        "<li><button class = 'admin-options' id = ''>This Month's Tasks</button></li>" +
        "<li id = 'admin-title'>Actions</li>" +
        "<li><button class = 'admin-options' id = ''>Add Project</button></li>" +
        "<li><button class = 'admin-options' id = ''>Add task</button></li>" +
        "<li><button class = 'admin-options' id = 'signOutButton'>Sign Out</button></li>" +
        "</ul></div>"; 

    return element;
}


