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
        displayTask_status .style.display = 'inline-block';

    }
}