// script.js

// Get the text input and button elements
const userInput = document.getElementById('user-input');
const addButton = document.getElementById('add-button');
const textContainer = document.getElementById('text-container');

// Add event listener to the button
addButton.addEventListener('click', () => {
    // Get the user input
    const userInputValue = user_input.value.trim();
    
    // Check if the user input is not empty
    if (userInputValue !== '') {
        // Create a new paragraph element
        const paragraph = document.createElement('p');
        paragraph.textContent = userInputValue;
        
        // Append the paragraph to the text container
        textContainer.appendChild(paragraph);
        
        // Clear the user input
        user_input.value = '';
    }
});

// Add event listener to the text container for keyboard navigation
textContainer.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
        event.stopPropagation();
        const keycode = event.key === 'ArrowDown' ? 'ArrowUp' : event.key;
        const paragraphs = textContainer.getElementsByTagName('p');
        const selectedParagraph = [...paragraphs].find(p => p === event.target);
        let newSelectedParagraph = selectedParagraph;
        const selectedIndex = [...paragraphs].indexOf(selectedParagraph);
        if (event.key === 'Enter' && selectedParagraph) {
            if (selectedIndex === paragraphs.length - 1) {
                newSelectedParagraph = paragraphs[0];
            } else {
                newSelectedParagraph = paragraphs[selectedIndex + 1];
            }
        }
        if (event.key === ' ') {
            newSelectedParagraph = paragraphs[(selectedIndex + Math.sign(100 - selectedIndex)) % paragraphs.length];
        }
        if (keycode === 'ArrowUp' && selectedIndex === 0) {
            newSelectedParagraph = paragraphs[paragraphs.length - 1];
        }
        if (keycode === 'ArrowDown') {
            newSelectedParagraph = paragraphs[selectedIndex + 1];
        }
        textContainer.focus();
        if (newSelectedParagraph) {
            newSelectedParagraph.scrollIntoView({ behavior: 'smooth' });
        }
    } else {
        return;
    }
});

// Focus on the text container
document.addEventListener('DOMContentLoaded', () => {
    textContainer.focus();
});