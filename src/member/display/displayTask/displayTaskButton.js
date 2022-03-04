export const toggleDescriptionEdit = () => {
    //parentNode
    const SubZone = document.getElementById('descriptionSubZone')

    //display element
    const display = document.getElementById('displayTask_description'); 

    //select element
    const userInput = document.getElementById('displayTask_descriptionInput'); 

    const edit = document.getElementById('descriptionEditButton')
    const submit = document.getElementById('descriptionSubmit'); 
    const cancel = document.getElementById('descriptionCancelButton'); 
    if (edit.style.display != 'none') {
        edit.style.display = 'none';
        submit.style.display = 'inline-block';
        cancel.style.display = 'inline-block';
        SubZone.style.width = '60%'
        userInput.style.display = 'inline-block';
        display.style.display = 'none';

    }
    else {
        edit.style.display = 'block';
        submit.style.display = 'none';
        cancel.style.display = 'none';
        SubZone.style.width = '30%'
        userInput.style.display = 'none'; 
        display.style.display = 'inline-block';

    }
}


export const toggleStatusEdit = () => {
    //parentNode
    const statusSubZone = document.getElementById('statusSubZone')

    //display element
    const displayTask_status = document.getElementById('displayTask_status');

    //select element
    const selectOptions = document.getElementById('displayTask_statusInput');

    const edit = document.getElementById('statusEditButton')
    const submit = document.getElementById('statusSubmit');
    const cancel = document.getElementById('statusCancelButton');
    if (edit.style.display != 'none') {
        edit.style.display = 'none';
        submit.style.display = 'inline-block';
        cancel.style.display = 'inline-block';
        statusSubZone.style.width = '50%'
        selectOptions.style.display = 'inline-block';
        displayTask_status.style.display = 'none';

    }
    else {
        edit.style.display = 'block';
        submit.style.display = 'none';
        cancel.style.display = 'none';
        statusSubZone.style.width = '25%'
        selectOptions.style.display = 'none';
        displayTask_status.style.display = 'inline-block';

    }
}

export const toggleDeadlineEdit = () => {
    //parentNode
    const SubZone = document.getElementById('deadlineSubZone')

    //display element
    const display = document.getElementById('displayTask_deadline');

    //select element
    const userInput = document.getElementById('displayTask_deadlineInput');

    const edit = document.getElementById('deadlineEditButton')
    const submit = document.getElementById('deadlineSubmit');
    const cancel = document.getElementById('deadlineCancelButton');
    if (edit.style.display != 'none') {
        edit.style.display = 'none';
        submit.style.display = 'inline-block';
        cancel.style.display = 'inline-block';
     //   SubZone.style.width = '60%'
        userInput.style.display = 'inline-block';
        display.style.display = 'none';

    }
    else {
        edit.style.display = 'inline-block';
        submit.style.display = 'none';
        cancel.style.display = 'none';
 //       SubZone.style.width = '30%'
        userInput.style.display = 'none';
        display.style.display = 'inline-block';

    }
}

export const toggleUrgencyEdit = () => {
    //parentNode
    const SubZone = document.getElementById('urgencySubZone')

    //display element
    const display = document.getElementById('displayTask_urgency');

    //select element
    const userInput = document.getElementById('displayTask_urgencyInput');

    const edit = document.getElementById('urgencyEditButton')
    const submit = document.getElementById('urgencySubmit');
    const cancel = document.getElementById('urgencyCancelButton');
    if (edit.style.display != 'none') {
        edit.style.display = 'none';
        submit.style.display = 'inline-block';
        cancel.style.display = 'inline-block';
        //   SubZone.style.width = '60%'
        userInput.style.display = 'inline-block';
        display.style.display = 'none';

    }
    else {
        edit.style.display = 'inline-block';
        submit.style.display = 'none';
        cancel.style.display = 'none';
        //       SubZone.style.width = '30%'
        userInput.style.display = 'none';
        display.style.display = 'inline-block';

    }
}

