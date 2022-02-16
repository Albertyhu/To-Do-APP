var currentUser = {
    name: '', 
    email: '', 
    userID: '', 
}

export const getUserInfo = (fName, emailAddress, ID) =>{
    currentUser.name = fName; 
    currentUser.email = emailAddress;
    currentUser.userID = ID; 

}

export const checkPass = (pass) => {
    if (pass.trim().length <= 0) {
        alert('Please, type in your password.')
        return false;
    }
    else {
        return true; 
    }
}

export const checkAllPass = (pass, confirmPass) => {
    if (pass.length <= 0) {
        alert('Please, type in your password.')
        return false;
    }
    else {
        if (confirmPass.length <= 0) {
            alert('Please, retype your password to confirm it.')
            return false;
        }
        else {
            if (pass.trim() === confirmPass.trim())
                return true;
            else {
                alert('The passwords you typed do not match.\n Please, try again. ')
                return false; 
            }
        }
    }

}

export const checkFirst = name => {
    if (name.length <= 0) {
        alert('Please, type in your first name.')
        return false; 
    }
    else
        return true;  
}

export const checkLast = name => {
    if (name.length <= 0) {
        alert('Please, type in your last name.')
        return false; 
    }
    else
        return true;
}

export const checkEmail = email => {
    if (email.length <= 0) {
        alert('Please, type in your email.')
        return false; 
    }
    else {
        const arr = email.trim().split('@');
        if (arr.length >= 2 && arr[1]) {
            const arr2 = email.trim().split('.')
            if (arr2.length >= 2 && arr2[1]) {
                return true
            }
            else {
                alert("Your email is invalid. Please, try again.")
                return false; 
            }
        }
        else {
            alert("Your email is invalid. Please, try again.")
            return false; 
        }
    }
        
}