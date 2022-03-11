'use strict';

// 現在時刻
const showClock = () => {
const nowTime = new Date();
const nowHour = String(nowTime.getHours()).padStart(2, '0');
const nowMin  = String(nowTime.getMinutes()).padStart(2, '0');
const nowSec  = String(nowTime.getSeconds()).padStart(2, '0');
const realtimeClock = `${nowHour}:${nowMin}:${nowSec}`;
document.getElementById('RealtimeClock').textContent = realtimeClock;
};

setInterval('showClock()',1000);

// ボタンのホバー時に色を変える
const buttonHover = () => {
const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    if (button.disabled === false) {
        button.style.opacity = '1';
        button.addEventListener('mouseover', () => {
            button.classList.add('target');
        });
        
        button.addEventListener('mouseleave', () => {
            button.classList.remove('target');
        });
    } else {
        button.classList.remove('target');
        button.style.opacity = '0.6';
    }
});
};

buttonHover();


// 勤務時間
const timer = document.getElementById('timer');
const attendanceBtn = document.getElementById('attendance');
const leavingBtn = document.getElementById('leaving');
const restBtn = document.getElementById('rest');
const backBtn = document.getElementById('back');

let startTime;
let timeoutId;
let elapsedTime = 0;

function countUp() {

const nowTime = new Date(Date.now() - startTime + elapsedTime);
const Hour = String(nowTime.getUTCHours()).padStart(2, '0');
const Min  = String(nowTime.getMinutes()).padStart(2, '0');
const Sec  = String(nowTime.getSeconds()).padStart(2, '0');
timer.textContent = `${Hour}:${Min}:${Sec}`;

timeoutId = setTimeout(() => {
    countUp();
}, 10)
}

// 出勤ボタン
attendanceBtn.addEventListener('click', () => {
startTime = Date.now();
countUp();
attendanceBtn.disabled = true;
leavingBtn.disabled = false;
restBtn.disabled = false;
backBtn.disabled = true;
buttonHover();
});

// 退勤ボタン
leavingBtn.addEventListener('click', () => {
clearTimeout(timeoutId);
timer.textContent='00:00:00';
elapsedTime = 0;
attendanceBtn.disabled = false;
leavingBtn.disabled = true;
restBtn.disabled = true;
backBtn.disabled = true;
buttonHover();
});

// 休入ボタン
restBtn.addEventListener('click', () => {
clearTimeout(timeoutId);
elapsedTime += Date.now() - startTime;
attendanceBtn.disabled = true;
leavingBtn.disabled = true;
restBtn.disabled = true;
backBtn.disabled = false;
buttonHover();
});

// 休戻ボタン
backBtn.addEventListener('click', () => {
startTime = Date.now();
countUp();
leavingBtn.disabled = false;
restBtn.disabled = false;
backBtn.disabled = true;
buttonHover();
});