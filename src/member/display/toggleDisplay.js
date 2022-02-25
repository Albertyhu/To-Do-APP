

export const displayProjects = () => {
    document.getElementById('displayProjectCon').style.display = 'inline-block'; 
    document.getElementById('displayTodayCon').style.display = 'none'; 
    document.getElementById('displayWeekCon').style.display = 'none'; 
    document.getElementById('displayMonthCon').style.display = 'none'; 
}

export const displayToday = () => {
    document.getElementById('displayProjectCon').style.display = 'none'; 
    document.getElementById('displayTodayCon').style.display = 'inline-block'; 
    document.getElementById('displayWeekCon').style.display = 'none';
    document.getElementById('displayMonthCon').style.display = 'none'; 
}
export const displayWeek = () => {
    document.getElementById('displayProjectCon').style.display = 'none'; 
    document.getElementById('displayTodayCon').style.display = 'none';
    document.getElementById('displayWeekCon').style.display = 'inline-block'; 
    document.getElementById('displayMonthCon').style.display = 'none'; 
}

export const displayMonth = () => {
    document.getElementById('displayProjectCon').style.display = 'none'; 
    document.getElementById('displayTodayCon').style.display = 'none';
    document.getElementById('displayWeekCon').style.display = 'none';
    document.getElementById('displayMonthCon').style.display = 'inline-block'; 
}

//this doesn't work.
//you have to use document.getElementByID
/*

const displayCont = document.getElementById('displayContainer');
const project = document.getElementById('displayProjectCon');
const today = document.getElementById('displayTodayCon');
const week = document.getElementById('displayWeekCon');
const month = document.getElementById('displayMonthCon');

export const displayProjects = () => {
    project.style.display = 'inline-block'; 
    today.style.display = 'none'; 
    week.style.display = 'none'; 
    month.style.display = 'none'; 
    console.log("projects")
}

export const displayToday = () => {
    project.style.display = 'none';
    today.style.display = 'inline-block';
    week.style.display = 'none';
    month.style.display = 'none'; 
    console.log("today")
}
export const displayWeek = () => {
    project.style.display = 'none';
    today.style.display = 'none';
    week.style.display = 'inline-block';
    month.style.display = 'none'; 
    console.log("week")
}

export const displayMonth = () => {
    project.style.display = 'none';
    today.style.display = 'none';
    week.style.display = 'none';
    month.style.display = 'display-block'; 
    console.log("month")
}
*/