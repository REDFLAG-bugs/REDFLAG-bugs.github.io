// Initialize EmailJS with your public key (user_id)
emailjs.init("cVDycQP-myJIyTu7M");

document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from submitting the default way

    // Clear previous errors
    document.getElementById('firstNameError').textContent = '';
    document.getElementById('lastNameError').textContent = '';
    document.getElementById('phoneError').textContent = '';
    document.getElementById('emailError').textContent = '';

    let isValid = true;

    // Validate fields
    const firstName = document.getElementById('firstName').value;
    if (firstName === '') {
        document.getElementById('firstNameError').textContent = 'First Name is required';
        isValid = false;
    }

    const lastName = document.getElementById('lastName').value;
    if (lastName === '') {
        document.getElementById('lastNameError').textContent = 'Last Name is required';
        isValid = false;
    }

    const phone = document.getElementById('phone').value;
    const phonePattern = /^\d{10}$/; // 10 digit number validation
    if (!phonePattern.test(phone)) {
        document.getElementById('phoneError').textContent = 'Please enter a valid 10-digit phone number';
        isValid = false;
    }

    const email = document.getElementById('email').value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email regex pattern
    if (!emailPattern.test(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address';
        isValid = false;
    }

    if (isValid) {
        // Send the email using EmailJS
        emailjs.send("service_l65as18", "template_b6zxcj9", {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            countryCode: document.getElementById('countryCode').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value,
        })
        .then(function(response) {
            console.log("SUCCESS!", response.status, response.text);
            document.getElementById('successMessage').style.display = 'block';
            document.getElementById('contactForm').reset(); // Clear the form
        }, function(error) {
            console.log("FAILED...", error);
            alert('There was an issue submitting your form. Please try again.');
        });
    }
});
