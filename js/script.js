window.addEventListener('DOMContentLoaded', () => {
	//-- Clock --//
	function currentTime() {
		var date = new Date();
		var hour = date.getHours();
		var min = date.getMinutes();
		hour = updateTime(hour);
		min = updateTime(min);
		document.querySelector(".time").innerText = hour + " : " + min;
		var t = setTimeout(function(){ currentTime() }, 1000);
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

	// Hide/Unhide clock 
	let btn = document.querySelector('.clock i');
	let time = document.querySelector('.time');

	function checkDisp() {
		time.classList.toggle('hide');
	}

	btn.addEventListener('click', checkDisp);

	//-- Calc logic --//
	let a = ''; // first number
	let b = ''; // second number
	let sign = ''; // sign operator
	let finish = false;

	const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
	const action = ['-', '+', 'X', '/'];

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

	document.querySelector('.buttons').addEventListener('click', (event) => {
		// The button is not pressed
		if (!event.target.classList.contains('btn')) return;
		// The button is pressed - Clear All 'C'
		if (event.target.classList.contains('C')) return;

/* 		10 - 36
		11 - 32
		12 - 30
		13 - 28
		14 - 26
		15 - 24
		16 - 22 */
		out.textContent = '';

		// Get the pressed button
		const key = event.target.textContent;
		console.log(key);

		// если нажата кнопка 0-9 или '.'
		if (digit.includes(key)) {
			if (b === '' && sign === '') {
				a += key;
				out.textContent = a;
			}else if (a !== '' && b !== '' && finish) {
				b = key;
				finish = false;
				out.textContent = b;
			}else {
				b += key;
				out.textContent = b;
			}
			console.log(a, sign, b);
			return;
		}

		// если нажата кнопка + - / *
		if (action.includes(key) && sign === '') {
			sign = key;
			out.textContent = a;
			return
		}

		// если нажата кнопка =
		if (key === '=') {
			if (b === '') b = a;
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
			finish = true;
			out.textContent = a;
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
			finish = false;
			b = '';
			out.textContent = a;
			sign = key;
			console.log(a, sign, b)
		}

		// если нажата кнопка '+/-'
		if (key === '+/-' && !finish) {
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
				a = a / 100;
				out.textContent = a;
				console.log(a, sign, b);
			}else if (a !== '' && sign !== '') {
				b = a * b / 100;
				out.textContent = b;
				console.log(a, sign, b);
			}
		}
	});
	
});