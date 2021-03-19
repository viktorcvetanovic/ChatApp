var socket = io();
var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');




function getName() {
    yourName = document.querySelector(".name").value;
    localStorage.setItem("key", yourName);
    console.log(yourName);
}

function readName() {
    var x = localStorage.getItem("key");
    return x;
}

function getInput() {
    return input.value;
}



function randomNumber() {
    var number = Math.round(Math.random() * (999999 - 100000) + 100000);

    return number;
}

function getDate() {
    date = new Date();
    return date;

}

var img = "";


form.addEventListener('submit', function (e) {
    e.preventDefault();


});

function sendMessage() {

    var obj = {
        username: readName(),
        message: getInput(),
        id: randomNumber(),
        date: getDate(),
        image: img
    }

    socket.emit('chat message', obj);
    input.value = '';
}

socket.on('chat message', function (msg) {
    console.log(msg);

    var item = document.createElement('p');
    item.textContent = msg["date"] + " " + msg["username"] + ": " + msg["message"];
    var photo = document.createElement('img');
    if (msg["username"] === readName()) {
        item.classList.add("userStyle");

    }

    photo.classList.add("photo");
    photo.setAttribute(
        'src', msg["image"]
    );

    item.appendChild(photo);
    messages.appendChild(item);

    img = "";
    window.scrollTo(0, document.body.scrollHeight);
});

function showEmoji() {
    document.querySelector(".defDiv").classList.add("showDiv");
}



var niz = [];
for (let i = 1; i <= 5; i++) {
    var x = document.querySelector(".span" + i).innerText;
    niz.push(x);
}
console.log(niz);

function typeEmoji(num) {
    input.value += niz[num];

}

function closeEmojiPopUp() {
    document.querySelector(".defDiv").classList.remove("showDiv");
}



function encodeImageFileAsURL(element) {
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {

        img = reader.result;

    }
    reader.readAsDataURL(file);

}

function clearInput() {
    document.querySelector(".photoAdd").value = null;
}
