(function () {
    const transform = document.getElementById("transform");
    const input = document.getElementById("textInput");
    const cas = document.getElementById("case-sens");
    const outputDiv = document.getElementById("output");

    cas.addEventListener("change", function () {
        if (cas.checked) {
            transform.setAttribute("disabled", "disabled");
        } else {
            transform.removeAttribute("disabled");
        }
    });

    transform.addEventListener("change", function (e) {
        if (e.target.value !== "none") {
            cas.setAttribute("disabled", "disabled");
        } else {
            cas.removeAttribute("disabled");
        }
    });

    document.getElementById("submit").addEventListener("click", function () {
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
                    return hash.hasOwnProperty(item)
                        ? false
                        : (hash[item] = true);
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
        document.getElementById("license").scrollIntoView();
        document.getElementById("summary").style.display = "block";
        document.getElementById("original").textContent = inputLen.toString();
        document.getElementById("removed").textContent = (
            inputLen - outputLen
        ).toString();
        document.getElementById("remaining").textContent = outputLen.toString();
        document.getElementById("textOutput").value = output.join("\n");
        document.getElementById("time").textContent = (
            performance.now() - startTime
        )
            .toString()
            .substring(0, 4);
    });
})();
