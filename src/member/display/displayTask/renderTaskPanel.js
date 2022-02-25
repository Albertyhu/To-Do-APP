export const renderTaskPanel = () => {
    const element = "<div id = 'displayTaskPanel_outerFrame>" +
        "<h1 id = 'displayTaskTitle'></h1>" + 
        "<h3 id = 'displayTask_ProjectTitle'><span>Project: </span><span id = 'displayTask_ProjectTitleSpan'><span></h3>" + 
        "<div id = 'description_container'>" +
            "<h4>Description</h4>" + 
            "<p id = 'displayTask_description'></p>" + 
        "</div>" +
        "<div id = 'displayTask_cont1'>" +
            "<div>" +
                "<h4>Progress Status</h4>" + 
                "<p id = 'displayTask_status'></p>" +
            "</div>" +
            "<div>" +
            "<h4>Deadline Date</h4>" +
            "<p id = 'displayTask_deadline'></p>" +
            "</div>" +
        "</div>" +
        "<div id = 'displayTask_cont2'>" +
            "<div>" +
                "<h4>Urgency</h4>" +
                "<p id = 'displayTask_urgency'></p>" +
            "</div>" +
            "<div>" +
                "<h4>Date Added</h4>" +
                "<p id = 'displayTask_dateCreated'></p>" +
            "</div>" +
        "</div>" +
        "<div id = 'displayTask_buttonCont'>" + 
            "<button id = 'displayTask_editButton'>Edit</button>" + 
            "<button id = 'displayTask_delButton'>Delete</button>" + 
            "<button id = 'displayTask_closeButton'>Close</button>" + 
        "</div>" + 
    "</div>"; 

    return element; 
}