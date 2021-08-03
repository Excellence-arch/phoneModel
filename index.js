let allVouchers;
let userss;
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

let networks = [{name : 'MTN', pin: '*555*', alias: 'mtnBal'}, 
				{name: 'Airtel', pin: '*126*', alias: 'airtelBal'}, 
				{name: 'Glo', pin: '*123*', alias: 'gloBal'}, 
				{name: '9mobile', pin: '*222*', alias: 'mobileBal'}];

let nos = ['090', '080', "070", '081']
const selectNetwork = (card) => {
	// displayNetwork.style.display = 'block';
	disNet.innerHTML = "";
	for(let i = 0; i < networks.length; i++) {
		console.log(networks[i].name)
		disNet.innerHTML += `<a onclick="loadCard(${i})" id="nets">${networks[i].name}</a> <br/>`
	}
	
}

const loadCard = (selected) => {
	let card = res.value;
	let k = networks[selected]
	

	if (card.length == 11) {
		call(card, k);
		return 0;
	} else if (card.length == 23) {
		loads(card, k);
		return 0;
	} else if (card.length == 5) {
		checkBal(card);
		return 0;
	}


}

const addBal = (net, amounts) => {
	let m = parseInt(amounts)
	userss.balance[net] += m
	console.log(userss.balance[net]);
	return userss.balance[net]
}

const call = (numbers, net) => {
	let p = net.alias
	console.log(p)
	console.log(userss.balance);
	for(let i = 0; i < networks.length; i++) {
		if(networks[i].alias == net.alias) {
			console.log('HI')
		}
	}
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