/* 
 * Larissa Rosenbrant
 */

// När dokumentet laddas in anropas inhämtning från databasen;

const url = "http://localhost:3000/api/works";
var work = [];
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
function displayTable(mess, myjobs)
{
    for (var res in myjobs)
        work.push(myjobs[res]);

    var messelem = document.getElementById("message");
    messelem.innerHTML = mess;

    var elem = document.getElementById("loadplace");
    //rensar innehåll;
    elem.innerHTML = "";
    var str = "";
    var jobstr = "";
    if (work.length > 0)
    {
        str = "<table id='displaytable'><caption>Mina arbeten</caption><tr><th>id</th><th>namn</th><th>titel</th><th>stad</th><th>start</th><th>slut</th><th>beskrivning</th></tr>";

        for (var i = 0; i < work.length; i++) {
            jobstr += "<tr>";
            jobstr += "<td>" + work[i].id + "</td><td>" + work[i].company + "</td><td>" + work[i].title + "</td><td>" + work[i].location + "</td><td>" + work[i].start + "</td><td>" + work[i].end + "</td><td>" + work[i].description + "</td>";
            jobstr += "</tr>";
        }
        str += jobstr;
        str += "</table>";
        elem.innerHTML = str;
    }
}
