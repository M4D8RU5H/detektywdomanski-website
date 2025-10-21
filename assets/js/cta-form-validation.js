document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');

    function showError(input, message) {
        let parent = input.parentElement;
        let error = parent.querySelector('.error-message');
        if (!error) {
            error = document.createElement('span');
            error.classList.add('error-message');
            error.style.color = 'red';
            error.style.fontSize = '13px';
            parent.appendChild(error);
        }
        error.textContent = message;
        input.style.borderColor = 'red';
    }

    function clearError(input) {
        let parent = input.parentElement;
        let error = parent.querySelector('.error-message');
        if (error) parent.removeChild(error);
        input.style.borderColor = 'var(--avocado-light)';
    }

    function isValidEmail(email) {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email.trim());
    }

function isValidPhone(phone) {
    // Usuń spacje po bokach
    phone = phone.trim();
    
    // Regex: opcjonalny + na początku, potem same cyfry, minimum 7, maksimum 15 cyfr
    const regex = /^\+?\d{7,15}$/;

    return regex.test(phone);
}

    function validateInput(input) {
        const value = input.value.trim();
        if (input === nameInput) {
            if (value.length < 2) {
                console.log("fdfs");
                showError(input, 'Imię i nazwisko musi mieć co najmniej 2 znaki.');
                return false;
            }
        } else if (input === emailInput) {
            if (!isValidEmail(value)) {
                showError(input, 'Wprowadź poprawny adres email (np. user@domena.pl).');
                return false;
            }
        } else if (input === phoneInput) {
            if (!isValidPhone(value)) {
                showError(input, 'Wprowadź poprawny numer telefonu (tylko cyfry, ewentualnie + na początku).');
                return false;
            }
        } else if (input === messageInput) {
            if (value.length < 10) {
                showError(input, 'Treść wiadomości musi mieć co najmniej 10 znaków.');
                return false;
            }
        }
        clearError(input);
        return true;
    }

    [nameInput, emailInput, phoneInput, messageInput].forEach(input => {
        input.addEventListener('input', () => validateInput(input));
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
        [nameInput, emailInput, phoneInput, messageInput].forEach(input => {
            if (!validateInput(input)) isValid = false;
        });

        if (!isValid) return;

        const formData = new FormData(form);

        fetch('/php/contact.php', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            if(data.status === 'success'){
                alert(data.message);
                form.reset();
                [nameInput, emailInput, phoneInput, messageInput].forEach(clearError);
            } else if(data.status === 'error' && data.errors){
                // walidacja z PHP
                for(let field in data.errors){
                    const input = document.getElementById(field);
                    showError(input, data.errors[field]);
                }
            } else {
                alert(data.message || 'Wystąpił błąd.');
            }
        })
        .catch(err => console.error(err));
    });
});