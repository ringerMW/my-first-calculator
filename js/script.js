window.addEventListener('DOMContentLoaded', () => {
	//-- Clock --//
	function currentTime() {
		let date = new Date();
		let hour = date.getHours();
		let min = date.getMinutes();
		hour = updateTime(hour);
		min = updateTime(min);
		document.querySelector(".time").innerText = hour + " : " + min;
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
	const input = document.getElementById('input'),
		  output = document.getElementById('output');


	// Clear all - button 'C'
	function clearAll() {
		a = ''; // first number
		b = ''; // second number
		sign = ''; // sign operator
		finish = false; // 
		input.value = 0; // display content
		output.value = '';
	}

	document.querySelector('.buttons .C').addEventListener('click', clearAll);

	// Execution of operations : '+'  '-'  '/' '*'
	function executeOperation(a, b, sign) {
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
					input.value = 'Error ';
					a = '';
					b = '';
					sign = '';
					return;
				}
				a = a / b;
				break;
		}
		return parseFloat(Number(a).toFixed(5));
	}

	document.querySelector('.buttons').addEventListener('click', (event) => {
		// The button is not pressed
		if (!event.target.classList.contains('btn')) return;
		// The button is pressed - Clear All 'C'
		if (event.target.classList.contains('C')) return;

		input.value = '';

		// Get the pressed button
		const key = event.target.textContent;

		// if the pressed button 0-9 or '.'
		if (digit.includes(key)) {
			if (b === '' && sign === '') {
				if (a === '0' && key !== '.') { // first number zero + dot
					a = key;
					input.value = a;
					output.value = `${a} ${sign} ${b}`;
					return;
				}else if (key === '.') {
					if (!a.length) {
						a = '0.';
						input.value = a;
						output.value = `${a} ${sign} ${b}`;
						return;
					}else if (a.includes('.')) {
						input.value = a;
						output.value = `${a} ${sign} ${b}`;
						return;
					}
				}
				a += key;
				output.value = `${a} `;
				input.value = a;
			}else if (a !== '' && b !== '' && finish) {
				if (key === '.') {
					b = '0.';
					finish = false;
					input.value = b;
					output.value = `${a} ${sign} ${b}`;
					return;
				}
				b = key;
				finish = false;
				input.value = b;
				output.value = `${a} ${sign} ${b}`;
			}else {
				if (b === '0'  && key !== '.') { // first number zero + dot
					b = key;
					input.value = b;
					output.value = `${a} ${sign} ${b}`;
					return;
				}else if (key === '.') {
					if (!b.length) {
						b = '0.';
						input.value = b;
						output.value = `${a} ${sign} ${b}`;
						return;
					}else if (b.includes('.')) {
						input.value = b;
						output.value = `${a} ${sign} ${b}`;
						return;
					}
				}
				b += key;
				finish = false;
				input.value = b;
				output.value = `${a} ${sign} ${b}`;
			}
			return;
		}

		// if the pressed button + - / *
		if (action.includes(key) && b === '') {
			if (a === '') {
				clearAll();
				return;
			}
			sign = key;
			input.value = a;
			output.value = `${a} ${sign} ${b}`;
			return;
		}
		// delete last symbol
		if (key === 'del'){
			if (b === '' && sign === '' && !finish) {
				a = String(a).substring(0, String(a).length - 1);
				input.value = a;
				output.value = `${a} ${sign} ${b}`;
				if (a === '') {
					clearAll();
				}
			} else if (finish) {
				input.value = a;
				output.value = `${a} ${sign}`;
			} else if (a !== '' && sign !== '') {
				b = String(b).substring(0, String(b).length - 1);
				input.value = b;
				output.value = `${a} ${sign} ${b}`;
				if (b === '') {
					b = '0'; 
					input.value = b;
					b = '';
					output.value = `${a} ${sign} ${b}`;
				}
			}
		}

		// if the pressed button "="
		if (key === '=') {
			if (a === '') {
				clearAll();
				return;
			}else if (sign === '') {
				input.value = a;
				output.value = `${a}`;
				return;
			}else if (b === '') {
				if (a === '0.') {
					a = 0;
				}else if (/\.0+$/.test(a)) {
					a = a.substring(0, a.indexOf("."));
				}
				b = a;
			}
			output.value = `${a} ${sign} ${parseFloat(Number(b).toFixed(5))}`;
			a = executeOperation(a, b, sign);
			finish = true;
			input.value = a;
			output.value += ` = ${a}`;
		}

		// if button - + * / is pressed, 'a' and 'b' and 'c' are filled in and the previous action was '='
		if (a !== '' && b !== '' && sign !== '' && action.includes(key) && finish) {
			b = '';
			sign = key;
			finish = false;
			input.value = a;
			output.value = `${a} ${sign} ${b}`;
		}

		// if "a", "b" and "c" are filled in and one of the "+ - * /" buttons is pressed
		if (a !== '' && b !== '' & sign !== '' && action.includes(key) && !finish) {
			a = executeOperation(a, b, sign);
			finish = false;
			sign = key;
			b = '';
			input.value = a;
			output.value += ` = ${a}`
		}

		// if the "+/-" button is pressed
		if (key === '+/-') {
			if (a === '') {
				clearAll();
				return
			}
			if (a !== '' && b === '' ) {
				a = -(a);
				input.value = a;
				output.value = `${a} ${sign} ${b}`;
			}else if (a !== '' && b !== '' && !finish){
				b = -(b);
				input.value = b;
				output.value = `${a} ${sign} ${b}`;
			}
		}

		// if the "+/-" button is pressed and the previous action was "="
		if (key === '+/-' && finish) {
			a = -(a);
			input.value = a;
		}

		// % operation
		if (key === '%') {
			if (b === '' && sign === '') {
				if (a === '') {
					clearAll();
					return
				}
				a = a / 100;
				input.value = a;
			}else if (a !== '' && sign !== '') {
				output.value = `${a} ${sign} ${b}%`
				b = a * b / 100;
				input.value = parseFloat(Number(b).toFixed(5));
			}
		}
	});

});