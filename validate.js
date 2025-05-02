document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".input-form");
    const email = document.getElementById("email");
    const phoneNumber = document.getElementById("phone-number");
    const nameFields = document.querySelectorAll("input[type='text']");
    
    function validateEmail() {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email.value)) {
            email.setCustomValidity("Please enter a valid email address.");
        } else {
            email.setCustomValidity("");
        }
    }
    
    function validatePhoneNumber() {
        const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
        if (!phonePattern.test(phoneNumber.value)) {
            phoneNumber.setCustomValidity("Enter phone number in xxx-xxx-xxxx format.");
        } else {
            phoneNumber.setCustomValidity("");
        }
    }
    
    function validateNameFields() {
        nameFields.forEach(field => {
            if (!/^[A-Za-z]+$/.test(field.value)) {
                field.setCustomValidity("Only letters are allowed.");
            } else {
                field.setCustomValidity("");
            }
        });
    }

    email.addEventListener("input", validateEmail);
    phoneNumber.addEventListener("input", validatePhoneNumber);
    nameFields.forEach(field => field.addEventListener("input", validateNameFields));
    
    form.addEventListener("submit", function (event) {
        validateEmail();
        validatePhoneNumber();
        validateNameFields();
        
        if (!form.checkValidity()) {
            event.preventDefault();
            form.reportValidity(); // shows validation popup
        }
    });
});
