"use strict";

function checkIfLogged(){
    if(localStorage.getItem('userID') !== null ) {
        window.open("account.html","_self");
    } 
};

window.onload = checkIfLogged;

const signupForm = document.querySelector("#signup-form");
const loginForm = document.querySelector("#login-form");
let myData;


function get() {
    fetch("https://eexam-6f38.restdb.io/rest/website-users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=uf-8",
                "x-apikey": "5dde99ff4658275ac9dc1fce",
                "cache-control": "no-cache"
            }
        })
        .then(e => e.json())
        .then(data => {
            myData = data;
        });
}
get();

function post() {
    let newUser = {
        id: uuidv4(),
        username: signupForm.elements.username.value,
        password: signupForm.elements.password.value,
        email: signupForm.elements.email.value,
        firstname: signupForm.elements.firstname.value,
        lastname: signupForm.elements.lastname.value,
        country: signupForm.elements.country.value,
        dateofbirth: signupForm.elements.dateofbirth.value,
        subscription: signupForm.elements.subscription.checked
    }

    let postData = JSON.stringify(newUser);

    fetch("https://eexam-6f38.restdb.io/rest/website-users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": "5dde99ff4658275ac9dc1fce",
                "cache-control": "no-cache"
            },
            body: postData
        })
        .then(res => res.json())
        .then(data => {});
}

// function disableButtons() {
//     if(document.querySelector(".fields").value === "") { 
//            document.querySelector('#signup-btn').disabled = true; 
//            document.querySelector('#login-btn').disabled = true; 
//        } else { 
//         document.querySelector('#signup-btn').disabled = false; 
//         document.querySelector('#login-btn').disabled = false;
//        }
//    }

signupForm.addEventListener("submit", e => {
    e.preventDefault();

    if(signupForm.elements.agreement.checked === false) {
        document.querySelector("#signup-error").style.display = "block";
        document.querySelector("#signup-error").innerHTML = "You have to accept our Terms of Use first";
    } else {
        document.querySelector("#signedup").style.display = "block";
        document.querySelector("#signup-error").style.display = "none";
        post();
        get();
        setTimeout(() => {
            signupForm.style.display = "none";
            loginForm.style.display = "block";
            document.querySelector("#signup-h1").innerHTML = "Log In";
            document.querySelector("#bars-container").style.display = "none";
            document.querySelector("#hide").style.display = "none";
            signupForm.reset();
        }, 1000);
    }

});

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}

loginForm.addEventListener("submit", e => {
    e.preventDefault();

    let foundUser = false;

    myData.forEach(function (user) {
        if (loginForm.elements.username.value === user.username && loginForm.elements.password.value === user.password) {
            document.querySelector("#login-error").style.display = "none";
            localStorage.setItem("userID", user.id);
            window.open("account.html","_self");
            foundUser = true;
        } else {
            document.querySelector("#login-error").style.display = "block";
            document.querySelector("#login-error").innerHTML = "Incorrect username or password";
        }
    })
});

document.querySelector("#next-btn").addEventListener("click", e => {
    e.preventDefault();

    if (signupForm.elements.username.value.length >= 6 && signupForm.elements.password.value.length >= 6 && signupForm.elements.repeatpw.value === signupForm.elements.password.value) {
        document.querySelector(".second-step").style.width = "100%";
        document.querySelector("#first-fields").style.display = "none";
        document.querySelector("#second-fields").style.display = "block";
        document.querySelector("#checkboxes").style.display = "block";
        document.querySelector("#next-btn").style.display = "none";
        document.querySelector("#buttons-container").style.display = "flex";
        document.querySelector("#signup-error").style.display = "none";
        document.querySelector(".line").style.display = "none";
        document.querySelector("#already-acc").style.display = "none";
    } else {
        document.querySelector("#signup-error").style.display = "block";
        document.querySelector("#signup-error").innerHTML = "The username and password must have at least 6 characters";
    }

    if (signupForm.elements.repeatpw.value !== signupForm.elements.password.value) {
        document.querySelector("#signup-error").style.display = "block";
        document.querySelector("#signup-error").innerHTML = "Incorrect repeat password";
    }
});

document.querySelector("#back-btn").addEventListener("click", e => {
    e.preventDefault();

    document.querySelector(".second-step").style.width = "0%";
    document.querySelector("#first-fields").style.display = "block";
    document.querySelector("#second-fields").style.display = "none";
    document.querySelector("#checkboxes").style.display = "none";
    document.querySelector("#next-btn").style.display = "block";
    document.querySelector("#buttons-container").style.display = "none";
    document.querySelector(".line").style.display = "flex";
    document.querySelector("#already-acc").style.display = "block";
    document.querySelector("#signup-error").style.display = "none";
});

document.querySelector("#already-acc").addEventListener("click", e => {
    signupForm.style.display = "none";
    document.querySelector("#signup-h1").innerHTML = "Log In";
    document.querySelector("#bars-container").style.display = "none";
    loginForm.style.display = "block";
});

document.querySelector("#new-acc").addEventListener("click", e => {
    loginForm.style.display = "none";
    document.querySelector("#signup-h1").innerHTML = "Sign Up";
    document.querySelector("#bars-container").style.display = "flex";
    signupForm.style.display = "block";
});

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
    document.querySelector("#nav-buttons").style.display = "flex";
  } else {
    document.querySelector("#nav-buttons").style.display = "none";
  }
}

const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
      window.requestAnimationFrame(scrollToTop);
      window.scrollTo(0, c - c / 10);
    }
  };

document.querySelector("#nav-login").addEventListener("click", e => {
    signupForm.style.display = "none";
    document.querySelector("#signup-h1").innerHTML = "Log In";
    document.querySelector("#bars-container").style.display = "none";
    loginForm.style.display = "block";
    setTimeout(() => {
        document.querySelector("#login-form .username").focus();
    }, 300);
    scrollToTop();
});

document.querySelector("#nav-signup").addEventListener("click", e => {
    loginForm.style.display = "none";
    document.querySelector("#signup-h1").innerHTML = "Sign Up";
    document.querySelector("#bars-container").style.display = "flex";
    signupForm.style.display = "block";
    setTimeout(() => {
        document.querySelector("#signup-form .username").focus();
    }, 300);
    scrollToTop();
});
