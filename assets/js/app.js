'use strict';

const alarmTime = new Date();
let currentHour = 0;
let currentMinute = 0;

const alarmSound = new Audio('./assets/media/alarm.mp3');
alarmSound.type = 'audio/mp3';

const clock = document.querySelector('.clock');
const alarm = document.querySelector('.alarm');
const hour = document.querySelector('.hour');
const minute = document.querySelector('.minute');
const setAlarm = document.querySelector('.set-alarm');

function setTime(time) {
    currentHour = time.getHours();
    currentMinute = time.getMinutes();
}

function setClock(time) {
    let hour = time.getHours().toString().padStart(2, '0');
    let minute = time.getMinutes().toString().padStart(2, '0');
    return `${hour}:${minute}`;
}

function isValidTime(hour, minute) {
    if (hour > 23 || minute > 59) {
        return false;
    } else {
        return true;
    }
}

function getAlarm(hour, minute) {
    alarm.innerText = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
    alarmTime.setHours(parseInt(hour));
    alarmTime.setMinutes(parseInt(minute));
    alarmTime.setSeconds(0);
    if (hour <= currentHour && minute <= currentMinute) {
        alarmTime.setDate(alarmTime.getDate() + 1);
    }
}

function compareTimes(time1, time2) {
    if (
    time1.getHours() === time2.getHours() && 
    time1.getMinutes() === time2.getMinutes() &&
    time1.getSeconds() === time2.getSeconds() &&
    time1.getDate() === time2.getDate()) {
        return true;
    }
}

function alarmTrigger() {
    alarmSound.play();
    clock.classList.add('alarm-sound');
    setTimeout(() => { 
        clock.classList.remove('alarm-sound') 
        alarm.style.display = 'none';
    }, 11000);
}

setInterval(() => {
    const now = new Date();
    setTime(now);
    clock.innerText = setClock(now);
    if (compareTimes(now, alarmTime)) {
        alarmTrigger();
    }
}, 1000);

setAlarm.addEventListener('click', () => {
    if (isValidTime(hour.value, minute.value)) {
        getAlarm(hour.value, minute.value);
        alarm.style.display = 'initial'
        hour.value = "";
        minute.value = "";
    } else if (parseInt(hour.value) > 23) {
        hour.focus();
    } else if (parseInt(minute.value) > 59) {
        minute.focus();
    }
});

hour.addEventListener('input', () => {
    let regex = /^\d+$/;
    let input = hour.value.trim();
    if (!regex.test(input)) hour.value = '';
});

minute.addEventListener('input', () => {
    let regex = /^\d+$/;
    let input = minute.value.trim();
    if (!regex.test(input)) minute.value = '';
});