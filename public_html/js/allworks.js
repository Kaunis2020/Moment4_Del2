/* 
 * Larissa Rosenbrant
 */
// Skyddade behörigheter med JWT-token;
// När dokumentet laddas in anropas inhämtning från databasen;

const url1 = "http://localhost:3000/api/works/";
const url2 = "http://localhost:3000/protected/work/";
var work = [];
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
    var trash = "";
    if (work.length > 0)
    {
        str = "<table id='displaytable'><caption>Mina arbeten</caption><tr><th>id</th><th>namn</th><th>titel</th><th>stad</th><th>start</th><th>slut</th><th>beskrivning</th><th>delete</th></tr>";

        for (var i = 0; i < work.length; i++) {
            jobstr += "<tr>";
            jobstr += "<td>" + work[i].id + "</td><td>" + work[i].company + "</td><td>" + work[i].title + "</td><td>" + work[i].location + "</td><td>" + work[i].start + "</td><td>" + work[i].end + "</td><td>" + work[i].description + "</td>";
            trash = "<td><button class='editbtn' onclick='deleteJob(" + work[i].id + ");'><i class='fa fa-trash-o' style='font-size:40px;color:red'></i></button></td>";
            jobstr += trash;
            jobstr += "</tr>";
        }
        str += jobstr;
        str += "</table>";
        elem.innerHTML = str;
    }
}

function deleteJob(jobid)
{
    // Får token från localStorage
    let token = localStorage.getItem("token");

    fetch(url2 + jobid, {       
        method: 'DELETE',
        headers: {"authorization": 'Bearer ' + token}
    })
            .then(response => {
                if (response.ok)
                {
                    message = "Arbetet har raderats i databasen.";
                    work = [];
                    document.getElementById("loadplace").innerHTML = "";
                    getList();
                }
            })
            .catch(error => {
                var elem = document.getElementById("message");
                elem.innerHTML = error;
            });
}