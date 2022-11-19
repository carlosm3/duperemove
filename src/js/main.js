"use strict";

const transform = document.getElementById("transform");
const input = document.getElementById("textInput");
const cas = document.getElementById("case-sens");
const outputDiv = document.getElementById("output");

cas.addEventListener("change", () => {
    if (cas.checked) {
        transform.disabled = true;
        transform.value = "none";
        transform.style.cursor = "not-allowed";
    } else {
        transform.removeAttribute("disabled");
        transform.style.cursor = "pointer";
    }
});

transform.addEventListener("change", (e) => {
    if (e.target.value !== "none") {
        cas.setAttribute("disabled", "disabled");
    } else {
        cas.removeAttribute("disabled");
    }
});

document.getElementById("submit").addEventListener("click", () => {
    const startTime = performance.now();

    const casVal = cas.checked;
    const inputVal = input.value.split("\n");
    const inputLen = inputVal.length;

    if (document.getElementById("trim").checked) {
        inputVal.forEach(function (elem, index) {
            this[index] = elem.trim();
        }, inputVal);
    }

    if (transform.value !== "none") {
        if (transform.value === "upp") {
            inputVal.forEach(function (elem, index) {
                this[index] = elem.toUpperCase();
            }, inputVal);
        } else {
            inputVal.forEach(function (elem, index) {
                this[index] = elem.toLowerCase();
            }, inputVal);
        }
    }

    const hash = {};

    const unique = inputVal.filter(function (item) {
        if (item === "") return true;
        else {
            if (casVal)
                return hash.hasOwnProperty(item) ? false : (hash[item] = true);
            else
                return hash.hasOwnProperty(item.toLowerCase())
                    ? false
                    : (hash[item.toLowerCase()] = true);
        }
    });

    const sort = document.getElementById("sort").value;
    if (sort !== "none") {
        if (sort !== "rand") {
            unique.sort();
            if (sort === "desc") {
                unique.reverse();
            }
        } else {
            let index = unique.length,
                randIndex;
            while (index !== 0) {
                randIndex = Math.floor(Math.random() * index);
                index--;
                [unique[index], unique[randIndex]] = [
                    unique[randIndex],
                    unique[index],
                ];
            }
        }
    }

    let output;
    if (document.getElementById("blank").checked) {
        output = unique.filter(function (item) {
            if (item !== "") return true;
        });
    } else {
        output = unique;
    }

    const outputLen = output.length;
    outputDiv.style.display = "block";
    window.scrollTo(0, document.body.scrollHeight);
    document.getElementById("summary").style.display = "block";
    document.getElementById("original").textContent = inputLen.toString();
    document.getElementById("removed").textContent = (
        inputLen - outputLen
    ).toString();
    document.getElementById("remaining").textContent = outputLen.toString();
    document.getElementById("textOutput").value = output.join("\n");
    document.getElementById("time").textContent = (
        (performance.now() - startTime) /
        1000
    ).toFixed(3);
});
