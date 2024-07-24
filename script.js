const userInput = document.getElementById('user-input');
const addTextBtn = document.getElementById('add-text-btn');
const textDisplay = document.getElementById('text-display');

addTextBtn.addEventListener('click', () => {
    const userText = userInput.value;
    textDisplay.innerHTML += `<p>${userText}</p>`;
    userInput.value = '';
});
