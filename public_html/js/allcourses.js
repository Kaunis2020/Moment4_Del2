/* 
 * Larissa Rosenbrant
 */
// Skyddade behörigheter med JWT-token
// När dokumentet laddas in anropas inhämtning från databasen;

const url1 = "http://localhost:3000/api/courses/";
const url2 = "http://localhost:3000/protected/course/";
var course = [];
var message = "";

window.addEventListener("load", (event) => {
    getList();
});

function getList()
{
    fetch(url1, {method: 'GET'})
            .then(response => {
                if (response.ok)
                {
                    message = "Uppkopplad till databasen.";
                }
                return response.json();
            })
            .then(data => displayTable(message, data)
            )
            .catch(error => {
                var elem = document.getElementById("message");
                elem.innerHTML = error;
            }
            );
}

// Visar tabell med arbeten;
function displayTable(mess, courses)
{
    for (var res in courses)
        course.push(courses[res]);

    var messelem = document.getElementById("message");
    messelem.innerHTML = mess;
    var elem = document.getElementById("loadplace");
    //rensar innehåll;
    elem.innerHTML = "";
    var str = "";
    var coursestr = "";
    var trash = "";
    if (course.length > 0)
    {
        str = "<table id='displaytable'><caption>Mina kurser</caption><tr><th>id</th><th>kod</th><th>namn</th><th>kursplan</th><th>nivå</th><th>poäng</th><th>delete</th></tr>";

        for (var i = 0; i < course.length; i++) {
            coursestr += "<tr>";
            coursestr += "<td>" + course[i].id + "</td><td>" + course[i].code + "</td><td>" + course[i].name + "</td><td>" + course[i].syllabus + "</td><td>" + course[i].level + "</td><td>" + course[i].credits + "</td>";
            trash = "<td><button class='editbtn' onclick='deleteCourse(" + course[i].id + ");'><i class='fa fa-trash-o' style='font-size:40px;color:red'></i></button></td>";
            coursestr += trash;
            coursestr += "</tr>";
        }
        str += coursestr;
        str += "</table>";
        elem.innerHTML = str;
    }
}

// Token skickas för radering
function deleteCourse(courseid)
{
    // Får token från localStorage
    let token = localStorage.getItem("token");
    fetch(url2 + courseid, {
        method: 'DELETE',
        headers: {"authorization": 'Bearer ' + token}
    })
            .then(response => {
                if (response.ok)
                {
                    message = "Kursen har raderats i databasen.";
                    course = [];
                    document.getElementById("loadplace").innerHTML = "";
                    getList();
                }
            })
            .catch(error => {
                var elem = document.getElementById("message");
                elem.innerHTML = error;
    });
}