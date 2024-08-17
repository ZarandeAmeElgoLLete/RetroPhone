const buttons = document.querySelectorAll(".digits, .commands-button");
const digits = document.querySelectorAll(".digits");
const input = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const results = document.getElementById("results-div");
const resetInputBtn = document.getElementById("reset-input");
const deleteCharBtn = document.getElementById("delete-char");
const centralButtons = document.querySelectorAll(".inner-central-buttons");
const screen = document.getElementById("screen");

const handleClickColor = event => {
  const buttonClicked = event.target;
  if (buttonClicked.id === "bottom-central-button" || buttonClicked.id === "top-central-button") {
    buttonClicked.classList.add("central-buttons-pressed");
    setTimeout(() => {
      buttonClicked.classList.remove("central-buttons-pressed")
    }, 300);
    return;
  }
  buttonClicked.classList.add("clicked")
  setTimeout(() => {
    buttonClicked.classList.remove("clicked");
  }, 300);
  return;
}

let parenthesisClicked = false;
let timer;

const applyInput = event => {
  const buttonClicked = event.target;
  if (buttonClicked.value === "(/)" || buttonClicked.value === "-/s") {
    if (parenthesisClicked) {
      clearTimeout(timer);
      input.value += buttonClicked.id[2];
      parenthesisClicked = false;
    } else {
      parenthesisClicked = true;
      timer = setTimeout(() => {
        parenthesisClicked = false;
        input.value += buttonClicked.id[0];
      }, 300);
    }
  } else {
    input.value += buttonClicked.value
  }
}

const evalNumber = (number) => {
  const regexList = [
    /^1\s\d{3}-\d{3}-\d{4}$/,
    /^1\s\(\d{3}\)\s\d{3}-\d{4}$/,
    /^1\(\d{3}\)\d{3}-\d{4}$/,
    /^1\s\d{3}\s\d{3}\s\d{4}$/,
    /^\d{10}$/,
    /^\d{3}-\d{3}-\d{4}$/,
    /^\(\d{3}\)\d{3}-\d{4}$/
    ];
  return regexList.some(regex => regex.test(number));
} 

const update = () => {
  if (input.value === "") {
    alert("Please provide a phone number");
    return;
  }
  results.innerHTML += evalNumber(input.value) ? `Valid US number: ${input.value}<br>` : `Invalid US number: ${input.value}<br>`;
  input.value = "";
}

const clear = () => {
  results.innerText = ""
}

const deleteChar = () => {
    input.value = input.value.slice(0,-1);
  }
  
const resetInput = () => {
    input.value = "";
}

const scrollContent = (event) => {
    screen.scrollBy({
      top: event.target.id === "bottom-central-button" ? 20 : -20,
      left: 0,
      behavior: "smooth"
    });
};  

checkBtn.addEventListener("click", update);
clearBtn.addEventListener("click", clear);
deleteCharBtn.addEventListener("click", deleteChar);
resetInputBtn.addEventListener("click", resetInput);

buttons.forEach(button => {
  button.addEventListener("click", handleClickColor);
});
digits.forEach(button => {
  button.addEventListener("click", applyInput);
});
centralButtons.forEach(button => {
  button.addEventListener("click",handleClickColor);
  button.addEventListener("click", scrollContent);
});