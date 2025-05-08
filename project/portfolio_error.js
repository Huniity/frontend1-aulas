const formulario = document.getElementById("my_form");
formulario.addEventListener("submit", (evento) => {

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;


    document.getElementById("erro-name").innerText = "";
    document.getElementById("erro-email").innerText = "";
    document.getElementById("erro-message").innerText = "";
    

    document.getElementById("name").classList.remove("erro");
    document.getElementById("email").classList.remove("erro");
    document.getElementById("message").classList.remove("erro");


    let formIsValid = true;

    const nameRegex = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/gim;
    if (!nameRegex.test(name)) {
        evento.preventDefault();
        document.getElementById("erro-name").innerText = "Required and should not contain special characters.";
        document.getElementById("name").classList.add("error");
        document.getElementById("name").style.borderColor = "red";
        formIsValid = false;
    } else {
        document.getElementById("name").style.borderColor = "green";
    }

    const emailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;  // Simple but effective email regex
    if (!emailRegex.test(email)) {
        evento.preventDefault();
        document.getElementById("erro-email").innerText = "Valid email is required.";
        document.getElementById("email").classList.add("error");
        document.getElementById("email").style.borderColor = "red";
        formIsValid = false;
    }   else {
        document.getElementById("email").style.borderColor = "green";
    }

    if (!message.trim()) {
        evento.preventDefault();
        document.getElementById("erro-message").innerText = "A message is required.";
        document.getElementById("message").classList.add("error");
        document.getElementById("message").style.borderColor = "red";
        formIsValid = false;
    } else {
        document.getElementById("message").style.borderColor = "green";
    }
});