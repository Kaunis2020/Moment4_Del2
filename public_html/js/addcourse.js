/* 
 *Larissa
 */

// Skyddade behörigheter med JWT-token;
const url = "http://localhost:3000/protected/course";
var message = "";

// Skickar formuläret
function postForm()
{
    // Får token från localStorage
    let token = localStorage.getItem('token');
    var code = document.getElementById("code").value;
    var name = document.getElementById("name").value;
    var syllabus = document.getElementById("syllabus").value;
    var level = document.getElementById("level").value;
    var credits = document.getElementById("credits").value;

    if (!code || !name || !syllabus)
    {
        return;
    } else
    {
        const formdata = {
            code: code,
            name: name,
            syllabus: syllabus,
            level: level,
            credits: credits
        };
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
                    document.getElementById("code").value = '';
                    document.getElementById("name").value = '';
                    document.getElementById("syllabus").value = '';
                    return true;
                })
                .catch(error => {
                    var elem = document.getElementById("message");
                    elem.innerHTML = error;
                    return false;
                });
    }
}