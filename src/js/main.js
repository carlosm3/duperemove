"use strict";

// Get references to DOM elements
const transformSelect = document.getElementById("transform");
const inputTextArea = document.getElementById("textInput");
const caseSensitiveCheckbox = document.getElementById("case-sens");
const outputDiv = document.getElementById("output");
const summaryDiv = document.getElementById("summary");
const originalCountSpan = document.getElementById("original");
const removedCountSpan = document.getElementById("removed");
const remainingCountSpan = document.getElementById("remaining");
const textOutputTextArea = document.getElementById("textOutput");
const timeSpan = document.getElementById("time");
const submitButton = document.getElementById("submit");

// Disable or enable the 'Transform' dropdown based on the state of the 'Case Sensitive' checkbox
caseSensitiveCheckbox.addEventListener("change", () => {
    if (caseSensitiveCheckbox.checked) {
        transformSelect.disabled = true;
        transformSelect.value = "none";
        transformSelect.style.cursor = "not-allowed";
    } else {
        transformSelect.removeAttribute("disabled");
        transformSelect.style.cursor = "pointer";
    }
});

// Disable or enable the 'Case Sensitive' checkbox based on the state of the 'Transform' dropdown
transformSelect.addEventListener("change", () => {
    if (transformSelect.value !== "none") {
        caseSensitiveCheckbox.setAttribute("disabled", "disabled");
    } else {
        caseSensitiveCheckbox.removeAttribute("disabled");
    }
});

// When the 'Submit' button is clicked, process the input and display the output
submitButton.addEventListener("click", () => {
    // Record the start time of the function for performance analysis
    const startTime = performance.now();

    // Get the current values of the input elements
    const caseSensitive = caseSensitiveCheckbox.checked;
    const inputLines = inputTextArea.value.split("\n");
    const inputLineCount = inputLines.length;

    // Transform input lines to uppercase or lowercase if the 'Transform' dropdown is set to a value other than 'None'
    if (document.getElementById("trim").checked) {
        inputLines.forEach((line, index, lines) => {
            lines[index] = line.trim();
        });
    }

    // Transform input lines to uppercase or lowercase if the 'Transform' dropdown is set to a value other than 'None'
    if (transformSelect.value !== "none") {
        const transformFn = (transformSelect.value === "upp") ? String.prototype.toUpperCase : String.prototype.toLowerCase;
        inputLines.forEach((line, index, lines) => {
            lines[index] = transformFn.call(line);
        });
    }

    // Remove duplicate lines and generate a hash table of unique lines
    const uniqueLines = {};
    const filteredLines = inputLines.filter((line) => {
        if (line === "") {
            return true;
        } else {
            const key = caseSensitive ? line : line.toLowerCase();
            if (uniqueLines.hasOwnProperty(key)) {
                return false;
            } else {
                uniqueLines[key] = true;
                return true;
            }
        }
    });

    // Sort the unique lines based on the selected sorting method
    const sortOption = document.getElementById("sort").value;
    if (sortOption !== "none") {
        filteredLines.sort();
        if (sortOption === "desc") {
            filteredLines.reverse();
        } else if (sortOption === "rand") {
            for (let i = filteredLines.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [filteredLines[i], filteredLines[j]] = [filteredLines[j], filteredLines[i]];
            }
        }
    }

    // Remove blank lines if the 'Remove Blank Lines' checkbox is selected
    const outputLines = document.getElementById("blank").checked ? filteredLines.filter((line) => line !== "") : filteredLines;

    const outputLineCount = outputLines.length;
    outputDiv.style.display = "block";
    window.scrollTo(0, document.body.scrollHeight);
    summaryDiv.style.display = "block";
    originalCountSpan.textContent = inputLineCount.toString();
    removedCountSpan.textContent = (inputLineCount - outputLineCount).toString();
    remainingCountSpan.textContent = outputLineCount.toString();
    textOutputTextArea.value = outputLines.join("\n");
    timeSpan.textContent = ((performance.now() - startTime) / 1000).toFixed(3);
});
