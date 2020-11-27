
var express = require("express")
var app = express()
var PORT = process.env.PORT || 3000; // bardzo istotna linijka - port zostaje przydzielony przez Heroku
var path = require("path")
var bodyParser = require("body-parser");
var login = false;
var updown = true;
var users = [
    { id: 1, login: "AAA", pass: "PASS1", wiek: 10, uczen: "undefined", plec: "M" },
]
app.use(express.static('static'))
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/loggingin", function (req, res) {
    let controll = 0
    for (let i = 0; i < users.length; i++) {
        if (users[i].login == req.body.login && users[i].pass == req.body.pass) {
            controll++
        }
    }
    if (controll == 1) {
        login = true
        res.sendFile(path.join(__dirname + "/static/sites/admin2.html"))
    } else
        res.send("Nie zostałeś zalogowany")
})

app.post("/registering", function (req, res) {
    let controll = 0
    for (let i = 0; i < users.length; i++) {
        if (users[i].login == req.body.login) {
            controll++
        }
    }
    if (controll == 1) {
        res.send("Użytkownik o takim loginie istnieje")
    } else {
        users.push({ id: (users.length + 1), login: req.body.login, pass: req.body.pass, wiek: parseInt(req.body.wiek), uczen: req.body.uczen, plec: req.body.plec })
        console.log(users)
    }
    res.sendFile(path.join(__dirname + "/static/sites/main.html"))
})

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + "/static/sites/main.html"))
})
app.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname + "/static/sites/login.html"))
})
app.get('/register', function (req, res) {
    res.sendFile(path.join(__dirname + "/static/sites/register.html"))
})
app.get('/admin', function (req, res) {
    if (login) {
        res.sendFile(path.join(__dirname + "/static/sites/admin2.html"))
    }
    else
        res.sendFile(path.join(__dirname + "/static/sites/admin1.html"))

})
app.get('/logout', function (req, res) {
    login = false
    res.sendFile(path.join(__dirname + "/static/sites/main.html"))
})

app.get('/gender', function (req, res) {
    if (login) {

        let string = ' '
        string = string + '<ul style="marigin:0;padding:0;font-size:20px;color:#000000"><li style="display: inline;"><a href="/sort"> sort </a></li> '
        string = string + '<li style="display: inline;"><a href="/gender"> gender </a></li>'
        string = string + '<li style="display: inline;"><a href="/show"> show </a></li>'
        string = string + '<li style="display: inline;"><a href="/admin"> back </a></li></ul>'


        string = string + '<table style="font-size:20px; width:100%;background-color:#000000;color:#ffffff">';
        for (let i = 0; i < users.length; i++) {
            if (users[i].plec == "K") {
                string = string + '<tr style="border: 1px solid white">';
                string = string + '<td style="border: 1px solid white;padding:10px">' + "id: " + users[i].id + "</td>"
                string = string + '<td style="border: 1px solid white">' + "płeć: " + users[i].plec + "</td>"
                string = string + "</tr>";
            }
        }
        string = string + "</table></br></br>";
        string = string + '<table style="font-size:20px; width:100%;background-color:#000000;color:#ffffff">';
        for (let i = 0; i < users.length; i++) {
            if (users[i].plec == "M") {
                string = string + '<tr style="border: 1px solid white">';
                string = string + '<td style="border: 1px solid white;padding:10px">' + "id: " + users[i].id + "</td>"
                string = string + '<td style="border: 1px solid white">' + "płeć: " + users[i].plec + "</td>"
                string = string + "</tr>";
            }
        }
        string = string + "</table>";
        res.send(string)
    } else {
        res.sendFile(path.join(__dirname + "/static/sites/admin1.html"))
    }
})

app.get('/show', function (req, res) {
    if (login) {
        users.sort(function (a, b) {
            return parseFloat(a.id) - parseFloat(b.id);
        });

        let string = ' '
        string = string + '<ul style="marigin:0;padding:0;font-size:20px;color:#000000"><li style="display: inline;"><a href="/sort"> sort </a></li> '
        string = string + '<li style="display: inline;"><a href="/gender"> gender </a></li>'
        string = string + '<li style="display: inline;"><a href="/show"> show </a></li>'
        string = string + '<li style="display: inline;"><a href="/admin"> back </a></li></ul>'


        string = string + '<table style="font-size:20px; width:100%;background-color:#000000;color:#ffffff">';
        for (let i = 0; i < users.length; i++) {
            string = string + '<tr style="border: 1px solid white">';
            string = string + '<td style="border: 1px solid white;padding:10px">' + "id: " + users[i].id + "</td>"
            string = string + '<td style="border: 1px solid white">' + "user: " + users[i].login + " - " + users[i].pass + "</td>"
            string = string + '<td style="border: 1px solid white">' + "uczeń: " + users[i].uczen + "</td>"
            string = string + '<td style="border: 1px solid white">' + "wiek: " + users[i].wiek + "</td>"
            string = string + '<td style="border: 1px solid white">' + "płeć: " + users[i].plec + "</td>"
            string = string + "</tr>";
        }
        string = string + "</table>";
        res.send(string)
    } else {
        res.sendFile(path.join(__dirname + "/static/sites/admin1.html"))
    }
})

app.get('/sort', function (req, res) {

    if (login) {
        let string = ' '
        string = string + '<ul style="marigin:0;padding:0;font-size:20px;color:#000000"><li style="display: inline;"><a href="/sort"> sort </a></li> '
        string = string + '<li style="display: inline;"><a href="/gender"> gender </a></li>'
        string = string + '<li style="display: inline;"><a href="/show"> show </a></li>'
        string = string + '<li style="display: inline;"><a href="/admin"> back </a></li></ul>'

        if (updown) {
            string = string + '<form style="font-size:20px;color:#000000"><input checked="checked" onchange="this.form.submit()" type="radio" id="sort" name="sort" value="1"> rosnąco <input onchange="this.form.submit()" type="radio" id="sort" name="sort" value="0" > malejąco </form></br></br>'
            users.sort(function (a, b) {
                return parseFloat(a.wiek) - parseFloat(b.wiek);
            })
        } else if (updown == false) {
            string = string + '<form style="font-size:20px;color:#000000"><input onchange="this.form.submit()" type="radio" id="sort" name="sort" value="1"> rosnąco <input onchange="this.form.submit()" checked="checked"  type="radio" id="sort" name="sort" value="0" > malejąco </form></br></br>'
            
            users.sort(function (a, b) {
                return parseFloat(b.wiek) - parseFloat(a.wiek);
            })
        }

        updown = !updown;

        string = string + '<table style="font-size:20px; width:100%;background-color:#000000;color:#ffffff">';

        for (let i = 0; i < users.length; i++) {
            string = string + '<tr style="border: 1px solid white">';
            string = string + '<td style="border: 1px solid white;padding:10px">' + "id: " + users[i].id + "</td>"
            string = string + '<td style="border: 1px solid white">' + "user: " + users[i].login + " - " + users[i].pass + "</td>"
            string = string + '<td style="border: 1px solid white">' + "wiek: " + users[i].wiek + "</td>"
            string = string + "</tr>";
        }
        string = string + "</table>";
        res.send(string)
    } else {
        res.sendFile(path.join(__dirname + "/static/sites/admin1.html"))
    }
})



//nasłuch na określonym porcie
app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})
