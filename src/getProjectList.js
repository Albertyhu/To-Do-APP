import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, collection, query, where, Timestamp, getDoc, getDocs, deleteDoc, orderBy, onSnapshot, updateDoc} from "firebase/firestore";
import { db } from './initializeFirebase.js';
import { renderProjects } from './member/display/displayProject.js'; 

const auth = getAuth();
export const returnAuth = () => {
    return auth;
}

var ProjectList = [];
var ProjectNamesList = []; 

export const fillProjectList = async () => {
    ProjectList = []; 
    const q = query(collection(db, 'project', auth.currentUser.uid, "ProjectList"));
    const snapshot = await getDocs(q)
    snapshot.forEach(data => {
        ProjectList.push(data.id)
    })
}

export const fillProjectNamesList = async () => {
    while (ProjectNamesList.length > 0) {
        ProjectNamesList.pop();
    }
    const q = query(collection(db, 'project', auth.currentUser.uid, 'ProjectList'), orderBy('title', 'asc'));
    const snapshot = await getDocs(q)
        .then(async data => {
            data.forEach(async snap => {
                const obj = ({
                    id: snap.id,
                    title: snap.data().title
                })

                ProjectNamesList.push(obj);  
            })
        })
 //console.log(ProjectNamesList.length)
}

export const retrieveProjectList = () => {
    return ProjectList;
}

export const retrieveProjectNamesList = async () => {
  //  await fillProjectNamesList()
  //  console.log(ProjectNamesList)
    return ProjectNamesList;
}

export const getTaskListByProjectID = async (projectID) => {
    const q = query(collection(db, 'task', auth.currentUser.uid, 'TaskList'), where('ProjectID', '==', projectID));
    var arr = []; 
    await getDocs(q).then(data => {
        /*
       const snapshot = data.forEach(snap => {
            return {
                ProjectID: snap.data().ProjectID, 
                deadline: snap.data().deadline, 
                description: snap.data().description, 
                status: snap.data().status, 
                title: snap.data().title, 
                urgency: snap.data().urgency, 
            }
        })
        */
        data.forEach(snap => {
            if (snap.exists()) {
                // arr.push(snap.data())
                const obj = {
                    id: snap.id,
                    ProjectID: snap.data().ProjectID,
                    deadline: snap.data().deadline,
                    description: snap.data().description,
                    status: snap.data().status,
                    title: snap.data().title,
                    urgency: snap.data().urgency,
                    dateCreated: snap.data().dateCreated,
                    isFinished: snap.data().isFinished,
                }
                arr.push(obj);
            }
        })


    }).catch(e => {
         console.log(e.message)
    })
    if (arr.length !== 0) {
        return arr;
    }
    else
        return [];
}

export const delProject = async (ID) => {
    var taskList = [];
    const q = query(collection(db, 'task', auth.currentUser.uid, 'TaskList'), where('ProjectID', '==', ID));
    const snapshot = await getDocs(q)
        .then(data => {
            data.forEach(snap => {
                taskList.push(snap.id)
            })
        })
    taskList.forEach(async item => {
        await deleteDoc(doc(db, 'task', auth.currentUser.uid, 'TaskList', item)
            .catch(e => {
                console.log(e.code + ": " + e.message)
            })
        )
    })

    await deleteDoc(doc(db, 'project', auth.currentUser.uid, 'ProjectList', ID)).then(async data => {
       // location.reload();
    })
        .catch(e => {
            console.log(e.code + ": " + e.message); 
        })
}

export const toggleCheckBox = async (taskID, boolValue) => {
    const docRef = doc(db, 'task', auth.currentUser.uid, 'TaskList', taskID)
    if (boolValue) {
        await updateDoc(docRef, {
            isFinished: true,
            status: 'Done',
        })
    }
    else {
        await updateDoc(docRef, {
            isFinished: false,
            status: 'Ongoing',
        })
    }
}