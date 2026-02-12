function checkKey() {
    const correctKey = "degen2026";  // change this
    const userInput = document.getElementById("passkey").value;

    if(userInput === correctKey) {
        window.location.href = "lab.html";
    } else {
        document.getElementById("error").innerText = "Invalid Passkey";
    }
}