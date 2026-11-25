// Error 1 (grade.html, Line 9): Missing "return" in onsubmit="checkMark()", causing the form to refresh and erase the result.
// Error 2 (grade.html, Line 17): Typo in function name onclick="showtable()" instead of onclick="showTable()".
// Error 3 (grade.html, Line 19): Wrong script filename src="grades.js" instead of src="grade.js".
// Error 4 (grade.js, Line 5): Used assignment (=) instead of comparison (===) in if (name = "").
// Error 5 (grade.js, Line 9): Case-sensitivity typo in isNan(mark) instead of isNaN(mark).
// Error 6 (grade.js, Line 14): Used && instead of || in if (mark < 0 && mark > 100), allowing invalid marks like 150.
// Error 7 (grade.js, Line 28 & 30): Case-sensitivity typo in getElementByID instead of getElementById.
// Error 8 (grade.js, Line 30): Wrong property spelling style.colour instead of style.color.
// Error 9 (grade.js, Line 38): Loop started at i = 1 instead of i = 0, skipping the first row ("A").

function checkMark() {
    let name = document.forms["gradeForm"]["name"].value;
    let mark = document.forms["gradeForm"]["mark"].value;

    if (name === "") {
        alert("Name must be filled out.");
        return false;
    }
    if (isNaN(mark)) {
        alert("Please enter a valid numeric value.");
        return false;
    }
    mark = parseInt(mark);
    if (mark < 0 || mark > 100) {
        alert("Mark must be between 0 and 100.");
        return false;
    }

    let grade;
    if (mark >= 80) {
        grade = "A";
    } else if (mark >= 65) {
        grade = "B";
    } else if (mark >= 50) {
        grade = "C";
    } else {
        grade = "F";
    }

    document.getElementById("result").innerHTML =
        name + " got grade " + grade;
    document.getElementById("result").style.color = "green";
    return false;
}

function showTable() {
    let grades = ["A", "B", "C", "F"];
    let ranges = ["80-100", "65-79", "50-64", "0-49"];
    let tableHTML = "<table border='1'>";
    for (let i = 0; i < grades.length; i++) {
        tableHTML += "<tr><td>" + grades[i] + "</td><td>" + ranges[i] + "</td></tr>";
    }
    tableHTML += "</table>";
    document.getElementById("tableContainer").innerHTML = tableHTML;
}