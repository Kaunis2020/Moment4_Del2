/* 
 * Larissa Rosenbrant
 */

// När dokumentet laddas in anropas inhämtning från databasen;

const url = "http://localhost:3000/api/courses";
var course = [];
var message = "";

window.addEventListener("load", (event) => {
    getList();
});

function getList()
{
    fetch(url, {method: 'GET'})
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
    if (course.length > 0)
    {
        str = "<table id='displaytable'><caption>Mina kurser</caption><tr><th>id</th><th>kod</th><th>namn</th><th>kursplan</th><th>nivå</th><th>poäng</th></tr>";

        for (var i = 0; i < course.length; i++) {
            coursestr += "<tr>";
            coursestr += "<td>" + course[i].id + "</td><td>" + course[i].code + "</td><td>" + course[i].name + "</td><td>" + course[i].syllabus + "</td><td>" + course[i].level + "</td><td>" + course[i].credits + "</td><td>";
            coursestr += "</tr>";
        }
        str += coursestr;
        str += "</table>";
        elem.innerHTML = str;
    }
}
