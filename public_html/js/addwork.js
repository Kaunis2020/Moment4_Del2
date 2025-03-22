/* 
 * Larissa
 */
// Skyddade behörigheter med JWT-token;
const url = "http://localhost:3000/protected/work";
var message = "";

// Skickar formuläret
function postForm()
{
    // Får token från localStorage
    let token = localStorage.getItem("token");
    var comp = document.getElementById("company").value;
    var tit = document.getElementById("title").value;
    var loc = document.getElementById("location").value;
    var des = document.getElementById("description").value;
    var start = document.getElementById("start").value;
    var end = document.getElementById("end").value;

    if (!comp || !tit || !loc || !des || !start || !end)
    {
        return;
    } else
    {
// Form data to be sent in the request body
        const formdata = {
            company: comp,
            title: tit,
            location: loc,
            description: des,
            start: start,
            end: end
        };
        // Make a POST request using the Fetch API
        fetch(url, {
            method: 'POST',
            headers: {
                "authorization": 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formdata)
        })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Inläggning misslyckades');
                        return false;
                    }
                    return response.json();
                })
                .then(data => {
                    message = data.message;
                    var messelem = document.getElementById("message");
                    messelem.innerHTML = message;
                    document.getElementById("company").value = '';
                    document.getElementById("title").value = '';
                    document.getElementById("location").value = '';
                    document.getElementById("description").value = "";
                    return true;
                })
                .catch(error => {
                    var elem = document.getElementById("message");
                    elem.innerHTML = error;
                    return false;
                });
    }
}
