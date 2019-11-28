"use strict";

document.addEventListener("DOMContentLoaded", start);

const spinHandle = document.querySelector(".spin_handle");

let lastItemID = 6;
let spinRounds;

function start() {
    spinHandle.addEventListener("click", spinButtonClick);
}

function spinButtonClick() {
    spinRounds = Math.random() * Math.floor(20) + 1;
    spinWheel(".wheel_1");
    spinWheel(".wheel_2");
    spinWheel(".wheel_3");
}

function spinWheel(wheel, dest) {
    document.querySelectorAll(`${wheel} .item`).forEach(item => {
        item.style.transitionDuration = ".1s";
        item.style.transform = "translateY(100%)";
    });

    document.querySelector(".item").addEventListener("transitionend", moveLastItem)
}

function moveLastItem() {
    document.querySelectorAll(".item").forEach(item => {
        item.style.transitionDuration = "0s";
        item.style.transform = "translateY(0)";
    });
    const elem = document.querySelector(`.item_${lastItemID}`);
    elem.parentNode.removeChild(elem);

    addLastItem();

}

function addLastItem() {
    const movedElement = `<div class="item item_${lastItemID}">${lastItemID}</div>`;

    document.querySelector(".wheel_1").insertAdjacentHTML('afterbegin', movedElement);

    lastItemID--;

    if (lastItemID === 0) {
        lastItemID = 5;
    }

    spinRounds--;

    if (spinRounds > 0) {
        setTimeout(function() {
            spinWheel(".wheel_1");
            spinWheel(".wheel_2");
            spinWheel(".wheel_3")
        }, .1)
    }

}