
// Function to check input separator and fix when needed
function checkInputSeparator(str) {
    if (str.search(",")) {
        str = str.replace(/,/g, '.');
    }
    return str;
}


// Function to check if input is not empty
function checkEmptyInput(str) {
    if (str === "") {
        return true;
    }
    else {
        return false;
    }
}


// Function to check if the input is numeric
function checkNonNumericInput(str) {
    let i, index;

    // Check if the first character of input (number) before floating point with the help of parseFloat() function
    if (isNaN(parseFloat(str))) {
        return true;
    }
    
    // Check the part of number after floating point
    // We can only accept following input examples: .2, -.2, +.2, -2, +2, 
    if (str.indexOf(".") != -1) {
        index = str.indexOf(".");

        for (i = index + 1; i < str.length; i++) {
            if (str[i] < "0" || str[i] > "9") {
                return true;
            }
        }
    }
    
    // Check the part of input (number) before floating point
    if (str.length > 1) {
        for (i = 1; i < str.length; i++) {
            if ((str[i] < "0" && str[i] != ".") || str[i] > "9") {
                return true;
            }
        }
    }
   
    return false;
}


// Function to check negative input (using number)
function checkNegativeInput(str) {
    if (parseFloat(str) < 0) {
        return true;
    }
    else {
        return false;
    }
}


// Function to get the order percentage
function getPercentageAmount(array) {
    let val;

    array.forEach(el => {  //or we can do for loop instead
        if (el.checked) {
            val = el.value;
        }
    });

    return val;
}


// Function to check if input is not decimal number
function checkNumberType(str) {
    if (parseFloat(str) % parseInt(str) != 0) {
        return true;
    }
    else {
        return false;
    }
}


// Function for tip calculation
function CalculateTip(bill_amount, per_amount, people_number) {
    let val;

    val = bill_amount * (per_amount / 100); //conversion from string to number

    return val / people_number;
}


// Function for number formatting
function formatNumber(num) {
    return (
        num
            .toFixed(2)
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' €'
    )
}


// Main function for tip calculation
function tipCalc() {
    let failure = false, bill_amount, radios, per_amount, people_number, result, error;

    // ---First number input for bill amount---
    bill_amount = document.getElementById("bill_amount").value;

    if (checkEmptyInput(bill_amount) === true) {
        alert("Failure: Bill amount cannot be empty!");
        failure = true;
    }
    else {
        bill_amount = checkInputSeparator(bill_amount);

        if (checkNonNumericInput(bill_amount) === true) {
            alert("Failure: Bill amount is not numeric!");
            failure = true;
        }
        else {
            if (checkNegativeInput(bill_amount) === true) {
                alert("Failure: Bill amount cannot be negative!");
                failure = true;
            }
        }
    }

    // ---Radio button input---
    radios = document.getElementsByName("radio"); //("radio2")
    per_amount = getPercentageAmount(radios);

    // ---Second number input for number of people sharing the bill---
    people_number = document.getElementById("people_number").value;

    if (checkEmptyInput(people_number) === true) {
        alert("Failure: People number cannot be empty!");
        failure = true;
    }
    else {
        people_number = checkInputSeparator(people_number);

        if (checkNonNumericInput(people_number) === true) {
            alert("Failure: People number is not numeric!");
            failure = true;
        }
        else {
            if (checkNegativeInput(people_number) === true) {
                alert("Failure: People number cannot be negative!");
                failure = true;
            }
            else {
                if (checkNumberType(people_number) === true) {
                    alert("Failure: People number cannot be decimal");
                    failure = true;
                }
            }
        }
    }

    if (failure) {
        return 1;
    }
    
    else {
        result = CalculateTip(bill_amount, per_amount, people_number);
        swal({title: "Your tip is: " +formatNumber(result), button: "Close"});

        return 0;
    }
}

    


    






    






