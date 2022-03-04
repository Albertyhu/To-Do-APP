import firebase from 'firebase/compat/app';
import { getAuth } from 'firebase/auth'
import { doc, updateDoc, setDoc, collection, query, where, Timestamp, getDoc, getDocs, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../../initializeFirebase.js';

const auth = getAuth(); 

export const editDescription = async (taskID) => {
    const userInput = document.getElementById('displayTask_descriptionInput').value;
    const task = document.getElementById(taskID)

    const docRef = doc(db, 'task', auth.currentUser.uid, 'TaskList', taskID)
    await updateDoc(docRef, {
        description: userInput,
    }).then(
        alert('Your edit submission has been saved.')
    )
        .catch(e => {
            console.log(e.error + ': ' + e.message)
        })


}

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

export const editDeadline = async (taskID) => {
    const userInput = document.getElementById('displayTask_deadlineInput').value;
    const task = document.getElementById(taskID)
    const deadline_date = new Date(userInput);
    if (Timestamp.fromDate(deadline_date) >= Timestamp.now()) {
        const docRef = doc(db, 'task', auth.currentUser.uid, 'TaskList', taskID)
        await updateDoc(docRef, {
            deadline: Timestamp.fromDate(deadline_date),
        }).then(
            alert('Your edit submission has been saved.')
        )
            .catch(e => {
                console.log(e.error + ': ' + e.message)
            })
    }
    else {
        alert("The date you've chosen cannot be earlier than today's date. ")
        closeWindow = false;
    }



}

export const editUrgency = async (taskID) => {
    const userInput = document.getElementById('displayTask_urgencyInput').value;
    const task = document.getElementById(taskID)
    const docRef = doc(db, 'task', auth.currentUser.uid, 'TaskList', taskID)
    await updateDoc(docRef, {
        urgency: userInput,
    }).then(
        alert('Your edit submission has been saved.')
    )
        .catch(e => {
            console.log(e.error + ': ' + e.message)
        })

}
