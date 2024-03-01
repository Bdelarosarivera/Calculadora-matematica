document.addEventListener("DOMContentLoaded", function() {
    const historyDiv = document.querySelector(".history");
    const screen = document.querySelector(".screen");
    const buttons = document.querySelectorAll(".btn");
    let history = "";

    buttons.forEach(button => button.addEventListener("click", () => handleButtonClick(button.innerText)));

    function handleButtonClick(value) {
        switch (value) {
            case "C":
                clearAll();
                break;
            case "DEL":
                deleteLastChar();
                break;
            case "=":
                evaluateExpression();
                break;
            default:
                appendToScreen(value);
        }
    }

    function clearAll() {
        screen.textContent = "";
        history = "";
        updateHistory();
    }

    function deleteLastChar() {
        screen.textContent = screen.textContent.slice(0, -1);
    }

    function appendToScreen(value) {
        if (canAppend(value)) {
            screen.textContent += value;
            adjustFontSizeToFit();
        }
    }

    function canAppend(value) {
        const originalText = screen.textContent;
        screen.textContent += value;
        const canFit = screen.scrollWidth <= screen.clientWidth;
        screen.textContent = originalText;
        return canFit;
    }

    function adjustFontSizeToFit() {
        const screenContainer = document.querySelector('.screen_container');
        screen.style.fontSize = ''; // Reset font size

        let fontSize = parseInt(window.getComputedStyle(screen).fontSize);
        while (screen.scrollWidth > screenContainer.clientWidth && fontSize > 5) {
            fontSize--;
            screen.style.fontSize = `${fontSize}px`;
        }
    }

    function evaluateExpression() {
        let expression = screen.textContent;
        expression = expression.replace(/(\d+)%/g, (match, p1) => `(${p1}/100)`);

        // Replace eval() with a safer alternative
        try {
            // This is a placeholder for a safe evaluation function
            const result = safeEvaluate(expression);
            if (result !== undefined) { // Ensure the result is valid
                updateCalculationResult(expression, result);
            } else {
                throw new Error('Invalid result');
            }
        } catch (error) {
            screen.textContent = "Error";
        }
    }

    function updateCalculationResult(expression, result) {
        result = parseFloat(result.toFixed(5));
        history = `${expression} = ${result}`;
        screen.textContent = result;
        updateHistory();
    }

    function updateHistory() {
        historyDiv.textContent = history;
    }

    function safeEvaluate(expression) {
        // Placeholder for a safe evaluation logic
        // Consider using a library or writing a parser for mathematical expressions
        return new Function('return ' + expression)();
    }
});
