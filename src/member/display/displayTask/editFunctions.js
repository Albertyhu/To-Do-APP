import firebase from 'firebase/compat/app';
import { getAuth } from 'firebase/auth'
import { doc, updateDoc, setDoc, collection, query, where, Timestamp, getDoc, getDocs, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../../initializeFirebase.js';

const auth = getAuth(); 

export const editStatus = async (taskID) => {
    const new_status = document.getElementById('displayTask_statusInput').value; 
    const task = document.getElementById(taskID)
    var complete;  
    if (new_status === "Done") {
        complete = true;

    }
    else {
        complete = false;
    }
    console.log(complete)
    console.log(task)
    task.childNodes[0].checked = complete; 

    const docRef = doc(db, 'task', auth.currentUser.uid, 'TaskList', taskID)
    await updateDoc(docRef, {
        status: new_status, 
        isFinished: complete, 
    }).then(
        alert('Your edit submission has been saved.')
    )
        .catch(e => {
            console.log(e.error + ': ' + e.message)
        })


}