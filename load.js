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

const writeNum = (num) => {
	res.value += num
}

const delNum = (num) =>{
	res.value = res.value.slice(0, -1)
}

const check = () => {
	let mtn = '*555*'
}

const loadCard = (card) => {
	let net;
	// let card = res.value;
	let pre = card.slice(0, 5);
	let loadedCard = card.slice(5, 22);
	let ash = card.slice(22, 23);
	let theCard;
	let found;
	let yes;
	// console.log(loadedCard);
	for(let i = 0; i< allVouchers.length; i++) {
		let mtnCheck = (pre == '*555*' && allVouchers[i].network == 'MTN')
		let airtelCheck = (pre == '*126*' && allVouchers[i].network == 'Airtel')
		let gloCheck = (pre == '*123*' && allVouchers[i].network == 'Glo')
		let mobileCheck = (pre == '*222*' && allVouchers[i].network == '9mobile')
		if (allVouchers[i].number == loadedCard) {
			found = true;
			theCard = allVouchers[i]
			if (!allVouchers[i].loaded && (mtnCheck || airtelCheck || gloCheck || mobileCheck)) {
				// console.log("hi");
				yes = true;
				let balances = parseFloat(allVouchers[i].amount)
				if(mtnCheck) {
					net = userss.balance.mtnBal + balances;
					userss.balance.mtnBal = net;
					break;
				} else if(airtelCheck) {
					net = userss.balance.airtelBal + balances;
					userss.balance.airtelBal = net;
					break;
				} else if(gloCheck) {
					net = userss.balance.gloBal + balances;
					userss.balance.gloBal = net
					break;
				}else if(mobileCheck) {
					net = userss.balance.mobileBal + balances;
					userss.balance.mobileBal = net
					break;
				}
			}
			if (allVouchers[i].loaded && (mtnCheck || airtelCheck || gloCheck || mobileCheck)) {
				alert("This card has already been loaded by you");
				break;
			}
		}
		
	}
	if (!found) {
		alert("Please load a valid card")
	}
	if (!yes) {
		alert("Please load this card with the correct pin")
	}
	alert(`Your recharge of ${theCard.amount} was successful and your new account balance is ${net}`)
	theCard.loaded = true;
	// allVouchers.filter((a, i)=> loadedCard == a.number).map((a, i)=> {
	// 	console.log("hi")
	// 	let mtnCheck = (pre == '*555*' && a.network == 'MTN')
	// 	let airtelCheck = (pre == '*126*' && a.network == 'Airtel')
	// 	let gloCheck = (pre == '*123*' && a.network == 'Glo')
	// 	let mobileCheck = (pre == '*222*' && a.network == '9mobile')
	// 	let balance = parseInt(a.amount)
	// 	console.log("Hi");
	// 	if(!a.loaded && ash && (mtnCheck || airtelCheck || gloCheck || mobileCheck)) {
	// 		if (mtnCheck) {
	// 			console.log("Hi")
	// 			userss.balance.mtnBal += balance;
	// 			net = 'mtnBal';
	// 			// console.log("Hi");
	// 		} else if (airtelCheck) {
	// 			userss.balance.airtelBal += balance;
	// 			net = 'airtelBal';
	// 		} else if (gloCheck) {
	// 			userss.balance.gloBal += balance;
	// 			net = 'gloBal';
	// 		} else {
	// 			userss.balance.mobileBal += balance;
	// 			net = 'mobileBal';
	// 		}
	// 		alert(`Card loaded successfully and your new account balance is ${userss.balance[net]}`);
	// 		a.loaded = true;
	// 	} else if (!(mtnCheck || airtelCheck || gloCheck || mobileCheck) || !ash){
	// 		alert("Please load this card with a valid pin")
	// 	}else {
	// 		alert("This card has already been loaded");
	// 	}
	// });
	localStorage.allVouchers = JSON.stringify(allVouchers);
	localStorage.userss = JSON.stringify(userss)
}

const addBal = (net, amounts) => {
	let m = parseInt(amounts)
	userss.balance[net] += m
	console.log(userss.balance[net]);
	return userss.balance[net]
}