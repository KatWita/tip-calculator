const billInput = document.querySelector('.bill__input');
const peopleInput = document.querySelector('.people__input');
const customInput = document.querySelector('.selection__input');
const resetBtn = document.querySelector('.btn-reset');
const tip = document.getElementById('tip');
const total = document.getElementById('total');
const tipPercentageElements = document.querySelectorAll('.selection__element');

const removeActive = () => {
	tipPercentageElements.forEach((element) => {
		element.classList.remove('active');
	});
};

const clearData = () => {
	billInput.value = '';
	peopleInput.value = '';
	customInput.value = '';
	resetBtn.disabled = true;
	clearTextContent();
	removeActive();
};

const clearTextContent = () => {
	total.textContent = '$0.00';
	tip.textContent = '$0.00';
};

const calculate = () => {
	const bill = parseFloat(billInput.value);
	const people = parseInt(peopleInput.value);
	const active = document.querySelector('.active');

	const addAmounts = (val) => {
		const tipAmount = val;
		const tipOnShow = (bill * tipAmount) / people;
		const sum = (bill + bill * tipAmount) / people;
		tip.textContent = `$${tipOnShow.toFixed(2)}`;
		total.textContent = `$${sum.toFixed(2)}`;
		resetBtn.disabled = false;
	};

	if (
		customInput.value === '' &&
		billInput.value.length > 0 &&
		peopleInput.value.length > 0 &&
		active
	) {
		const tipForItems = active.dataset.percent;
		addAmounts(tipForItems);
	} else if (
		customInput.value !== '' &&
		billInput.value.length > 0 &&
		peopleInput.value.length > 0
	) {
		const tipForInput = customInput.value / 100;
		addAmounts(tipForInput);
	} else if (billInput.value.length > 0 && peopleInput.value.length > 0) {
		const sum = bill / people;
		total.textContent = `$${sum.toFixed(2)}`;
		resetBtn.disabled = false;
	} else {
		resetBtn.disabled = true;
	}
};

function numbersWithDecimals() {
	this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
}

function onlyNumbers() {
	this.value = this.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');
}

customInput.addEventListener('click', () => {
	removeActive();
	clearTextContent();
	calculate();
});
customInput.addEventListener('keyup', calculate);

tipPercentageElements.forEach((element) => {
	element.addEventListener('click', () => {
		removeActive();
		customInput.value = '';
		element.classList.add('active');
		calculate();
	});
});

[billInput, peopleInput].forEach((input) => {
	input.addEventListener('keyup', (e) => {
		const errorParent = e.target.parentElement.previousElementSibling;
		const error = errorParent.querySelector('.label__error');
		const int = parseFloat(e.target.value);

		if (int === 0) {
			error.textContent = `Can't be zero`;
			resetBtn.disabled = true;
			clearTextContent();
		} else {
			error.textContent = ``;
			clearTextContent();
			calculate();
		}
	});
});

resetBtn.addEventListener('click', clearData);
billInput.addEventListener('input', numbersWithDecimals);
[peopleInput, customInput].forEach((input) => {
	input.addEventListener('input', onlyNumbers);
});
