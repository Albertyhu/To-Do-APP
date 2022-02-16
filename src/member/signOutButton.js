import { getAuth, signOut } from 'firebase/auth'

const auth = getAuth(); 

export const handleSignOut = () => {
    signOut(auth).then(() => {
        alert('You have successful signed out')
    })
}

export const renderSignOutButton = () => {
    const element = document.createElement('button'); 
    element.setAttribute('id', 'signOutButton'); 
    element.addEventListener('click', handleSignOut); 
    element.innerHTML = 'Sign Out'; 
    return element; 
}