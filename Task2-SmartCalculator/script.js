// DISPLAY

const display =
    document.querySelector(".display");

// BUTTONS

const buttons =
    document.querySelectorAll("button");

// HISTORY

const historyList =
    document.querySelector(".history-list");

// TIME

const liveTime =
    document.querySelector(".live-time");

const liveDate =
    document.querySelector(".live-date");

// VARIABLES

let currentInput = "";

// BUTTON CLICK EVENTS

buttons.forEach((button) => {

    button.addEventListener("click", () => {

        const value =
            button.innerText.trim();

        // AC

        if (value === "AC") {

            currentInput = "";

            display.value = "";

            return;
        }

        // DEL

        if (value === "DEL") {

            currentInput =
                currentInput.slice(0, -1);

            display.value =
                currentInput;

            return;
        }

        // EQUAL

        if (value === "=") {

            try {

                const expression =
                    currentInput;

                currentInput =
                    eval(currentInput).toString();

                display.value =
                    currentInput;

                // HISTORY

                const listItem =
                    document.createElement("li");

                listItem.textContent =
                    `${expression} = ${currentInput}`;

                historyList.prepend(listItem);
            }

            catch {

                display.value =
                    "Error";

                currentInput = "";
            }

            return;
        }

        // NORMAL INPUT

        currentInput += value;

        display.value =
            currentInput;
    });
});

// KEYBOARD SUPPORT

document.addEventListener("keydown", (event) => {

    const key = event.key;

    // ALLOWED KEYS

    const allowedKeys =
        "0123456789+-*/.%";

    // ENTER KEY

    if (key === "Enter") {

        try {

            const expression =
                currentInput;

            currentInput =
                eval(currentInput).toString();

            display.value =
                currentInput;

            // REMOVE BUTTON FOCUS

            document.activeElement.blur();

            // SAVE HISTORY

            const listItem =
                document.createElement("li");

            listItem.textContent =
                `${expression} = ${currentInput}`;

            historyList.prepend(listItem);
        }

        catch {

            display.value = "Error";

            currentInput = "";
        }

        return;
    }

    // BACKSPACE KEY

    if (key === "Backspace") {

        currentInput =
            currentInput.slice(0, -1);

        display.value =
            currentInput;

        return;
    }

    // ESC KEY

    if (key === "Escape") {

        currentInput = "";

        display.value = "";

        return;
    }

    // NUMBER & OPERATOR KEYS

    if (allowedKeys.includes(key)) {

        currentInput += key;

        display.value =
            currentInput;
    }

});

// LIVE DATE & TIME

function updateTime() {

    const now = new Date();

    // TIME

    const time =
        now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });

    // DATE

    const date =
        now.toLocaleDateString([], {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });

    liveTime.textContent = time;

    liveDate.textContent = date;
}

// UPDATE EVERY SECOND

setInterval(updateTime, 1000);

updateTime();
