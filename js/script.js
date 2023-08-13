window.addEventListener('DOMContentLoaded', () => {
	//-- Clock --//
	function currentTime() {
		let date = new Date();
		let hour = date.getHours();
		let min = date.getMinutes();
		hour = updateTime(hour);
		min = updateTime(min);
		document.querySelector(".time").innerText = hour + " : " + min;
		let t = setTimeout(function(){ currentTime() }, 1000);
	}
	  
	function updateTime(k) {
		if (k < 10) {
			return "0" + k;
		}
		else {
			return k;
		}
	}
	  
	currentTime();

	//-- Date --//
	let date = new Date();
	let dayWeek  = date.getDay();
	let month = date.getMonth();
	let days = [['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'], ['янв.', 'фев.', 'мар.', 'апр.', 'май', 'июн.', 'июл.', 'авг.', 'сен.', 'окт.', 'ноя.', 'дек.']];

	let dateLine = document.querySelector('.date');

	dateLine.textContent += `${days[0][dayWeek]}, ${date.getDate()} ${days[1][month]}`;





	//-- Calc logic --//
	let a = ''; // first number
	let b = ''; // second number
	let sign = ''; // sign operator
	let finish = false;

	const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
	const action = ['-', '+', 'X', '/'];
	const otherAction = ['%', '+/-', '/', 'X', '-', '+', '='];

	// Сalc display 
	const out = document.querySelector('.calc_screen p');

	// Clear all - button 'C'
	function clearAll() {
		a = ''; // first number
		b = ''; // second number
		sign = ''; // sign operator
		finish = false; // 
		out.textContent = 0; // display content
	}

	document.querySelector('.buttons .C').addEventListener('click', clearAll);

	function executeOperatin(a, b, sign) {
		switch (sign) {
			case '+':
				a = (+a) + (+b);
				break;
			case '-':
				a = a - b;
				break;
			case 'X':
				a = a * b;
				break;
			case '/':
				if (b === '0') {
					out.textContent = 'Error ';
					a = '';
					b = '';
					sign = '';
					return;
				}
				a = a / b;
				break;
		}
		return a;
	}

	document.querySelector('.buttons').addEventListener('click', (event) => {
		// The button is not pressed
		if (!event.target.classList.contains('btn')) return;
		// The button is pressed - Clear All 'C'
		if (event.target.classList.contains('C')) return;

		out.textContent = '';

		// Get the pressed button
		const key = event.target.textContent;
		console.log(key);

		// если нажата кнопка 0-9 или '.'
		if (digit.includes(key)) {
			if (b === '' && sign === '') {
				if (a === '0' && key !== '.') { // first number zero + dot
					a = key;
					out.textContent = a;
					console.log(a, sign, b);
					return;
				}else if (key === '.') {
					if (!a.length) {
						a = '0.';
						out.textContent = a;
						console.log(a, sign, b);
						return;
					}else if (a.includes('.')) {
						out.textContent = a;
						console.log(a, sign, b);
						return;
					}else
					a += key;
					out.textContent = a;
					console.log(a, sign, b);
					return;
				}
				a += key;
				out.textContent = a;
			}else if (a !== '' && b !== '' && finish) {
				if (key === '.') {
					b = '0.';
					finish = false;
					out.textContent = b;
					console.log(a, sign, b);
					return;
				}
				b = key;
				finish = false;
				out.textContent = b;
			}else {
				if (b === '0'  && key !== '.') { // first number zero + dot
					b = key;
					out.textContent = b;
					console.log(a, sign, b);
					return;
				}else if (key === '.') {
					if (!b.length) {
						b = '0.';
						out.textContent = b;
						console.log(a, sign, b);
						return;
					}else if (b.includes('.')) {
						out.textContent = b;
						console.log(a, sign, b);
						return;
					}else
					b += key;
					out.textContent = b;
					console.log(a, sign, b);
					return;
				}
				b += key;
				finish = false;
				out.textContent = b;
			}
			console.log(a, sign, b);
			return;
		}

		// если нажата кнопка + - / *
		if (action.includes(key) && b === '') {
			if (a === '') {
				clearAll();
				return
			}
			sign = key;
			out.textContent = a;
			console.log(a, sign, b);
			return
		}
		// удаление последнего символа
		if (key === 'del'){
			if (b === '' && sign === '' && !finish) {
				a = String(a).substring(0, String(a).length - 1)
				console.log(a, sign, b);
				out.textContent = a;
				if (a === '') {
					clearAll();
				}
			} else if (finish) {
				out.textContent = a;
				console.log(a, sign, b);
			} else if (a !== '' && sign !== '') {
				b = String(b).substring(0, String(b).length - 1)
				out.textContent = b;
				console.log(a, sign, b);
				if (b === '') {
					b = '0'; // <- временная bug-a
					out.textContent = b;
					b = '';
					console.log(a, sign, b);
				}
			}
		}

		// если нажата кнопка =
		if (key === '=') {
			if (a === '') {
				clearAll();
				return
			}
			if (b === '') {
				if (a === '0.') {
					a = 0;
				}else if (/\.0+$/.test(a)) {
					a = a.substring(0, a.indexOf("."))
				}
				b = a;
			}
			a = executeOperation(a, b, sign);
			finish = true;
			out.textContent = parseFloat(Number(a).toFixed(5));
			console.log(a, sign, b);
		}

		// если нажата - + * /, но a && b && sign заполнены и предыдущая операция содержала =
		if (a !== '' && b !== '' & sign !== '' && action.includes(key) && finish) {
			console.log(b);
			b = '';
			sign = key;
			console.log(b);
			finish = false;
			out.textContent = a;
			console.log(a, sign, b)
		}

		// если a && b && sign заполнены и нажата - + * /
		if (a !== '' && b !== '' & sign !== '' && action.includes(key) && !finish) {
			a = executeOperation(a, b, sign);
			finish = false;
			b = '';
			out.textContent = parseFloat(Number(a).toFixed(5));
			sign = key;
			console.log(a, sign, b)
		}

		// если нажата кнопка '+/-'
		if (key === '+/-') {
			if (a === '') {
				clearAll();
				return
			}
			if (a !== '' && b === '') {
				a = -(a);
				out.textContent = a;
				console.log(a, sign, b);
			}else if (a !== '' && b !== '' ){
				b = -(b);
				out.textContent = b;
				console.log(a, sign, b);
			}
		}

		// если нажата кнопка '+/-' и предыдущее действие было '='
		if (key === '+/-' && finish) {
			a = -(a);
			out.textContent = a;
			console.log(a, sign, b);
		}

		// %
		if (key === '%') {
			if (b === '' && sign === '') {
				if (a === '') {
					clearAll();
					return
				}
				a = a / 100;
				out.textContent = a;
				finish = true;
				console.log(a, sign, b);
			}else if (a !== '' && sign !== '') {
				b = a * b / 100;
				out.textContent = b;
				finish = true;
				console.log(a, sign, b);
			}
		}
	});

});