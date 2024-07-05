let displayValue = '';
let historyStack = []; // Array to store history of operations

// Function to append a value to the display
function appendToDisplay(val) {
    displayValue += val;
    document.getElementById('display').value = displayValue;
}

// Function to clear the display
function clearDisplay() {
    displayValue = '';
    document.getElementById('display').value = displayValue;
}

// Function to perform calculation
function calculate() {
    try {
        const result = eval(displayValue); // Evaluate the expression
        const operation = `${displayValue} = ${result}`; // Create operation string
        historyStack.push({ expression: displayValue, result: result });

        // Limit history stack to a maximum number of entries (e.g., 10)
        const MAX_HISTORY_SIZE = 10;
        if (historyStack.length > MAX_HISTORY_SIZE) {
            historyStack.shift(); // Remove the oldest entry (first element) from historyStack
        }

        displayValue = String(result);
        document.getElementById('display').value = displayValue;

        // Save history to local storage
        saveHistoryToLocalStorage();
    } catch (error) {
        displayValue = 'Error';
        document.getElementById('display').value = displayValue;
    }
}

// Function to save history to local storage
function saveHistoryToLocalStorage() {
    localStorage.setItem('calculatorHistory', JSON.stringify(historyStack));
}

// Function to load history from local storage
function loadHistoryFromLocalStorage() {
    const storedHistory = localStorage.getItem('calculatorHistory');
    if (storedHistory) {
        historyStack = JSON.parse(storedHistory);
    } else {
        historyStack = []; // Initialize empty history stack if no history found in local storage
    }
}

// Function to display history on the webpage
function showHistory() {
    const historyContainer = document.getElementById('history');
    historyContainer.innerHTML = ''; // Clear previous history

    // Determine the starting index to display the last 5 entries
    const startIndex = Math.max(0, historyStack.length - 5); // Ensure startIndex is not negative

    // Get the last 5 history entries from historyStack
    const recentHistory = historyStack.slice(startIndex);

    recentHistory.forEach((entry, index) => {
        const operationElement = document.createElement('div');
        operationElement.textContent = `${entry.expression} = ${entry.result}`;
        historyContainer.appendChild(operationElement);
    });

    // Scroll to the bottom of history container
    historyContainer.scrollTop = historyContainer.scrollHeight;
}


// Function to clear history from local storage
function clearHistoryFromLocalStorage() {
    localStorage.removeItem('calculatorHistory');
    historyStack = []; // Clear historyStack array
    showHistory(); // Refresh displayed history on the webpage
}

// Load history from local storage when the page is loaded
window.addEventListener('load', () => {
    loadHistoryFromLocalStorage();
    showHistory();
});

function clearhistory() {
    historyStack = []; // Clear the historyStack array
    const historyContainer = document.getElementById('history');
    historyContainer.innerHTML = ''; // Clear the content inside historyContainer
}

function removeLastCharacter() {
    // Get the current display value
    let currentValue = displayValue;
    console.log(currentValue);

    // Check if the display value is not empty
    if (currentValue.length > 0) {
        // Remove the last character from the display value
        currentValue = currentValue.slice(0, -1);

        // Update the display with the new value
        document.getElementById('display').value = currentValue;

        // Update the displayValue variable
        displayValue = currentValue;
    }
}

// Function to handle keyboard input
function handleKeyboardInput(event) {
    const keyPressed = event.key;

    // Check if the pressed key is a number (0-9) or an operator (+, -, *, /)
    if (/[0-9\+\-\*\/\.]/.test(keyPressed)) {
        appendToDisplay(keyPressed);
    } else if (keyPressed === 'Enter' || keyPressed === '=') {
        calculate();
    } else if (keyPressed === 'Escape' || keyPressed === 'c' || keyPressed === 'C') {
        clearDisplay();
    }
}

// Add event listeners to the document to capture keyboard input
document.addEventListener('keydown', handleKeyboardInput);