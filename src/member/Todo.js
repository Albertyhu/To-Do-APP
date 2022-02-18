import { renderSignOutButton, handleSignOut } from './signOutButton.js'; 
//import { renderAdminPanel } from './adminPanel.js';

export const renderToDo = () => {
    const element = document.createElement('div');
    element.innerHTML = "<div id = 'member-innerContainer'>" +
            "<div id = 'center_container'>" + 
                "<div id = 'side-panel'></div>" +
                "<div id = 'output-panel'></div>" + 
                "<div id = 'addProjectPanel'></div>" + 
                "<div id = 'addTaskPanel'></div>" + 
            "</div>" + 
        "</div>";
//    element.appendChild(renderSignOutButton());
    return element; 
}




