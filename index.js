let allVouchers;
let userss;
let on = false;
localStorage.allVouchers? allVouchers = JSON.parse(localStorage.allVouchers) : allVouchers = [];
localStorage.userss ? userss = JSON.parse(localStorage.userss) : userss = 
{
	balance : {
		mtnBal : 0,
		airtelBal : 0,
		gloBal : 0,
		mobileBal : 0
	}
};

const wake = () => {
	if (!on) {
		home();
		on = true;
	} else {
		phoneBody.style.backgroundImage = `url("")`;
		phoneBody.style.backgroundColor = `rgba(16, 15, 15, 0.967)`;
		awake.style.display = `none`;
		btns.style.display = `none`;
		on = false;
	}
	
}

const timer = () => {
	let newDate = new Date;
	let hr = newDate.getHours();
	let min = newDate.getMinutes();
	let sec = newDate.getSeconds();
	times.innerHTML = `${hr} : ${min} : ${sec}`
}

// timer()

const home = () => {
	phoneBody.style.backgroundImage = `url("./Assets/wallpaper.jpg")`;
	awake.style.display = `block`;
	btns.style.display = `block`;
	showVoucher.style.display = 'none';
	showControls.style.display = 'none';
	setInterval(timer, 1000)
}

const voucherFunc = () => {
	showVoucher.style.display = `block`;
}

// const alert = message => {
// 	alerts.style.display = 'block';
// 	alerts.innerHTML = `${message} <br/> <button onclick=hideAlert()>Ok</button>`;
// }

// const hideAlert = () => {
// 	alerts.style.display = 'none';
// 	displayNetwork.style.display = 'none';
// }

class Card{
	constructor(num, network, amount, loaded){
		this.number = num;
		this.network = network;
		this.amount = amount;
		this.loaded = loaded;
	}
}


const generateCard = (num, network, amount) =>{
	// displayNetwork.style.display = 'block';
	showCard.innerHTML = '';
	let gen;
	for(let i = 0; i<num; i++) {
		gen = genRand();
		let generated = new Card(gen, network, amount, false);
		allVouchers.push(generated);
		// console.log(gen);
	}
	for (let i = allVouchers.length -1; i > allVouchers.length - num-1; i--) {
		showCard.innerHTML += ` ${allVouchers[i].number} <br/>`;
	}
	localStorage.allVouchers = JSON.stringify(allVouchers);
}

const genRand = () =>{
	return (Math.floor(Math.random()*99999999999999999))
	// tryRand(num);
}

const load = () => {
	// alert("hi")
	showControls.style.display = 'block';
}


const writeNum = (num) => {
	res.value += num
}

const delNum = (num) =>{
	res.value = res.value.slice(0, -1)
}

// const check = () => {
// 	let mtn = '*555*'
// }

let networks = [{name : 'MTN', pin: '*555*', alias: 'mtnBal', balCheck: '*556#'}, 
				{name: 'Airtel', pin: '*126*', alias: 'airtelBal', balCheck: '*123#'}, 
				{name: 'Glo', pin: '*123*', alias: 'gloBal', balCheck: '*124#'},
				{name: '9mobile', pin: '*222*', alias: 'mobileBal', balCheck: '*232#'}];

let nos = ['090', '080', "070", '081']
const selectNetwork = (card) => {
	disNet.style.display = 'block';
	// disNet.innerHTML = "";
	disNet.innerHTML = `<div id="realNetworks">`;
	for(let i = 0; i < networks.length; i++) {
		// console.log(networks[i].name)
		realNetworks.innerHTML += `<a onclick="loadCard(${i})" id="nets" class="changeCursor">${networks[i].name}</a> <br/>`
	}
	disNet.innerHTML += `</div>`
}

const loadCard = (selected) => {
	let card = res.value;
	let k = networks[selected];
	disNet.style.display = 'none';	

	if (card.length == 11) {
		call(card, k);
		return 0;
	} else if (card.length == 23) {
		loads(card, k);
		return 0;
	} else if (card.length == 5) {
		checkBal(card, k);
		return 0;
	}
}

const checkBal = (card, k) => {
	for(let i = 0; i< networks.length; i++) {
		if(k.balCheck == networks[i].balCheck && card == k.balCheck) {
			alert(`Your ${k.name} account balance is ${userss.balance[k.alias]}`)
		}
	}
}

const addBal = (net, amounts) => {
	let m = parseInt(amounts)
	userss.balance[net] += m
	console.log(userss.balance[net]);
	return userss.balance[net]
}

let s = 0;
let m = 0;
let h = 0;
const deductMoney = (balance) => {
	if(balance > 0) {
		balance -= 0.7
		s++;
		if(s <= 59) {
			if(s < 10) {
				sec.innerHTML = `0${s}`;
			} else {
				sec.innerHTML = s;
			}
		} else if(m< 60 && s > 59) {
			s = 0;
			m++;
			if(m < 10) {
				min.innerHTML = `0${m} : `;
			} else {
				min.innerHTML = `${m}: `;
			}
		} else if (min > 59) {
			m = 0;
			h++;
			if(h < 10) {
				hr.innerHTML = `0${h}: `;
			} else {
				hr.innerHTML = `${h} : `;
			}
		}
	}else {
		alert("Your account balance is too low and your call terminated. Please load and try again")
	}
	
}

const deduct = (balance) => {
	setInterval(`deductMoney(${balance})`, 1000)
}

const call = (numbers, net) => {
	let phoneFound = false;
	let ind = net.name;
	let p = net.alias
	for(let i = 0; i< nos.length; i++) {
		if (nos[i] == numbers.slice(0, 3)){
			allowCall(p, ind, numbers);
			return;
		}
	}

	if(!phoneFound) {
		alert("The number you are trying to call does not exist. Please check the number and try again")
	}
}

const allowCall = (p, netName, dialledNum) => {
	let enoughBal = false;
	for(let i = 0; i < networks.length; i++) {
		if(networks[i].alias == p && userss.balance[p] > 1) {
			enoughBal = true;
			callInterface.style.display = 'block';
			callSim.innerHTML = `${netName} ${dialledNum}`
			h=0;
			m=0;
			s=0;
			deduct(userss.balance[p]);
		}
	}

	if(!enoughBal) {
		alert("Dear, customer, your account balance is too low to make this call. Please reacharge and try again.")
	}
}

const dropCall = () => {
	clearInterval(deductMoney);
	console.log('cleared the interval')
}

const loads = (card, k) => {
	let net;
	let pre = card.slice(0, 5);
	let loadedCard = card.slice(5, 22);
	let ash = card.slice(22, 23);
	let found;

	for(let i = 0; i< allVouchers.length; i++) {
		let allCheck = (pre == k.pin && allVouchers[i].network == k.name)
		if (allVouchers[i].number == loadedCard && allCheck && !allVouchers[i].loaded) {
			found = true;
			theCard = allVouchers[i];
			bal = k.alias
			let balances = parseFloat(allVouchers[i].amount)
			userss.balance[bal] += balances;
		} else if(allVouchers[i].number == loadedCard && allCheck && allVouchers[i].loaded){
			alert("This card has already been loaded by you");
			return 0;
		}
	}
	if (!found) {
		alert("Please load a valid card")
		return 0;
	}
	alert(`Your recharge of ${theCard.amount} was successful and your new account balance is ${userss.balance[bal]}`)
	theCard.loaded = true;
	localStorage.allVouchers = JSON.stringify(allVouchers);
	localStorage.userss = JSON.stringify(userss)
}

const backs = () => {
	home();	
}