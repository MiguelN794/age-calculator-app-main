// Obtener elementos del DOM
const form = document.getElementById('age-form');
const dayInput = document.getElementById('day');
const monthInput = document.getElementById('month');
const yearInput = document.getElementById('year');
const calculateBtn = document.getElementById('calculate-btn');
const yearsResult = document.getElementById('years');
const monthsResult = document.getElementById('months');
const daysResult = document.getElementById('days');

// Funciones de validación
const isFieldEmpty = (value) => value.trim() === '';
const isValidDay = (day) => day >= 1 && day <= 31;
const isValidMonth = (month) => month >= 1 && month <= 12;
const isDateInFuture = (day, month, year) => {
    const inputDate = new Date(year, month - 1, day);
    return inputDate > new Date();
};

const isValidDate = (day, month, year) => {
    const date = new Date(year, month - 1, day);
    return date.getDate() === parseInt(day) &&
        date.getMonth() === month - 1 &&
        date.getFullYear() === parseInt(year);
};

// Funciones de validación mejoradas
const sanitizeInput = (value) => {
    return value.replace(/[^0-9]/g, '');
};

// Función para mostrar error
const showError = (input, message) => {
    const inputGroup = input.parentElement;
    inputGroup.classList.add('error');
    const errorMessage = inputGroup.querySelector('.error-message') ||
        document.createElement('span');
    errorMessage.className = 'error-message';
    errorMessage.style.color = 'var(--color-light-red)';
    errorMessage.textContent = message;
    if (!inputGroup.querySelector('.error-message')) {
        inputGroup.appendChild(errorMessage);
    }
};

// Función para limpiar errores
const clearErrors = () => {
    document.querySelectorAll('.input-group').forEach(group => {
        group.classList.remove('error');
        const errorMessage = group.querySelector('.error-message');
        if (errorMessage) errorMessage.remove();
    });
};

// Modificar la función calculateAge
const calculateAge = (birthday) => {
    try {
        const today = new Date();
        const [year, month, day] = birthday.split('-').map(Number);
        const birthDate = new Date(year, month - 1, day);

        console.log('Today:', today);
        console.log('BirthDate:', birthDate);

        if (!isValidDate(day, month, year)) {
            throw new Error('Invalid date');
        }

        let years = today.getFullYear() - birthDate.getFullYear();
        let months = today.getMonth() - birthDate.getMonth();
        let days = today.getDate() - birthDate.getDate();

        console.log('Initial calculation:', { years, months, days });

        // Ajuste de meses y años
        if (months < 0 || (months === 0 && days < 0)) {
            years--;
            months += 12;
        }

        // Ajuste de días
        if (days < 0) {
            const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            days += lastMonth.getDate();
            months--;
        }

        // Ajuste final de meses
        if (months < 0) {
            years--;
            months += 12;
        }

        console.log('Final calculation:', { years, months, days });

        return {
            years: Math.max(0, years),
            months: Math.max(0, months),
            days: Math.max(0, days)
        };
    } catch (error) {
        console.error('Error in calculateAge:', error);
        return { years: 0, months: 0, days: 0 };
    }
};

// Función para animar números
const animateNumber = (element, finalNumber) => {
    const duration = 1000;
    const frames = 60;
    const increment = finalNumber / frames;
    let current = 0;

    const animate = () => {
        if (current < finalNumber) {
            current += increment;
            element.textContent = Math.floor(current);
            requestAnimationFrame(animate);
        } else {
            element.textContent = finalNumber;
        }
    };

    animate();
};

// Eventos para manejar entrada de datos
dayInput.addEventListener('input', (e) => {
    e.target.value = sanitizeInput(e.target.value);
});

monthInput.addEventListener('input', (e) => {
    e.target.value = sanitizeInput(e.target.value);
});

yearInput.addEventListener('input', (e) => {
    e.target.value = sanitizeInput(e.target.value);
});

// Event listener modificado para el botón
calculateBtn.addEventListener('click', () => {
    clearErrors();

    // Sanitizar y convertir valores
    const day = parseInt(sanitizeInput(dayInput.value)) || 0;
    const month = parseInt(sanitizeInput(monthInput.value)) || 0;
    const year = parseInt(sanitizeInput(yearInput.value)) || 0;

    let hasError = false;

});

// Modificar el event listener del botón
calculateBtn.addEventListener('click', () => {
    clearErrors();

    const day = parseInt(dayInput.value);
    const month = parseInt(monthInput.value);
    const year = parseInt(yearInput.value);

    console.log('Input values:', { day, month, year });

    let hasError = false;

    // Validaciones...
    if (!hasError) {
        const dateString = `${year}-${month}-${day}`;
        console.log('Date string:', dateString);

        const age = calculateAge(dateString);
        console.log('Calculated age:', age);

        if (age.years === 0 && age.months === 0 && age.days === 0) {
            showError(dayInput, 'Invalid date');
            return;
        }

        animateNumber(yearsResult, age.years);
        animateNumber(monthsResult, age.months);
        animateNumber(daysResult, age.days);
    }
});
