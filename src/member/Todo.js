import { renderSignOutButton } from './signOutButton.js'; 

export const renderToDo = () => {
    const element = document.createElement('div');
    element.appendChild(renderSignOutButton());
    return element; 
}