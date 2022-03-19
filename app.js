const tips = document.querySelectorAll('.tip-option');
const resetBtn = document.querySelector('#reset');
const billInput = document.querySelector('#bill-input');
const billInputGroup = document.querySelector('.bill-input-group');
const customTip = document.querySelector('.custom');
const peopleNum = document.querySelector('#people-input');
const peopleInputGroup = document.querySelector('.people-input-group');
const errMessage = document.querySelector('.error-message');

let totalResult = document.querySelector('#total-result').lastChild;
let tipResult = document.querySelector('#tip-result').lastChild;

let currentTip;
let currentBill;
let currentPeople;

//functions

const removeSelected = () => {
    customTip.value = '';
    let selected = document.querySelector('.selected');
    if (selected) {
        selected.classList.remove('selected');
    }
}

const clear = () => {
    totalResult.innerText = '0.00'
    tipResult.innerText = '0.00'
    currentTip = undefined;
    currentBill = '';
    currentPeople = '';
    customTip.value = '';
    billInput.value = '';
    peopleNum.value = '';
    let selected = document.querySelector('.selected');
    if (selected) {
        selected.classList.remove('selected');
    }
}

const addSelected = (b) => {
    b.classList.add('selected');
}

const calculateTotalResult = () => {
    let totalRes = (currentBill / currentPeople) + ((currentBill * (currentTip / 100)) / currentPeople);
    return Math.floor(totalRes * 100) / 100;
}

const calculateTipResult = () => {
    let tipRes = (currentBill * (currentTip / 100)) / currentPeople;
    return Math.floor(tipRes * 100) / 100

}

const showResults = () => {
    if (calculateTipResult() === Infinity || calculateTipResult() === "" || isNaN(calculateTipResult())) {
        totalResult.innerText = '0.00'
        tipResult.innerText = '0.00'
    } else {
        totalResult.innerText = calculateTotalResult();
        tipResult.innerText = calculateTipResult();
    }
}


//Event Listeners

billInput.addEventListener('focus', () => {
    billInputGroup.classList.add('active');
})
billInput.addEventListener('blur', () => {
    billInputGroup.classList.remove('active');
})

billInput.addEventListener('keyup', () => {
    currentBill = billInput.value
    showResults();
})


customTip.addEventListener('focus', () => {
    customTip.classList.add('active');
})
customTip.addEventListener('blur', () => {
    customTip.classList.remove('active');
})

peopleNum.addEventListener('focus', () => {
    peopleInputGroup.classList.add('active');
})
peopleNum.addEventListener('blur', () => {
    peopleInputGroup.classList.remove('active');
})

peopleNum.addEventListener('keyup', () => {
    if (peopleNum.value === '0') {
        peopleInputGroup.classList.add('error');
        errMessage.classList.add('enabled');
    } else {
        if (errMessage.classList.contains('enabled') && peopleInputGroup.classList.contains('error')) {
            peopleInputGroup.classList.remove('error');
            errMessage.classList.remove('enabled')
        }
        currentPeople = peopleNum.value;
        showResults();
    }
})

customTip.addEventListener('click', () => {
    removeSelected();
})

customTip.addEventListener('keyup', () => {
    currentTip = customTip.value;
    showResults();
})

tips.forEach(btn => {
    btn.addEventListener('click', () => {
        removeSelected();
        addSelected(btn);
        let value = btn.id;
        currentTip = value;
        showResults();
    })
})

resetBtn.addEventListener('click', () => {
    clear();
})