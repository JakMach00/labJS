const inputs = document.querySelectorAll('.value');
const inputsContainer = document.querySelector('#inputsContainer');

function calc() {
    const inputsValues = Array.from(document.querySelectorAll('.input')).map(input => +input.value);
    
    const sum = inputsValues.reduce((acc, currentValue) => acc += currentValue, 0);
    const avg = sum / inputsValues.length;
    const min = Math.min(...inputsValues);
    const max = Math.max(...inputsValues);

    document.getElementById('summary').value = sum;
    document.getElementById('average').value = avg;
    document.getElementById('minimum').value = min;
    document.getElementById('maximum').value = max;
}

function addInput(){
    const inputAmount = document.querySelectorAll('.input').length;

    inputsContainer.innerHTML+=`<label>Number ${inputAmount + 1}:</label>
    <input type="number" class="input" oninput="calc()" autofocus>
    <br>`
}

function deleteEmptyInputs(){
    const inputs = document.querySelectorAll('.input');

    inputs?.forEach(input => {
        if (input.value === '') {
            const label = input.previousElementSibling;
            const br = input.nextElementSibling;
            input.remove();
            label.remove();
            br.remove();
        }
    });
}