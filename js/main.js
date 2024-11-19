// Mobile Navigation
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav__toggle');
    const navList = document.querySelector('.nav__list');
    const header = document.querySelector('.header');

    if (navToggle && navList) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navList.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!header.contains(e.target) && navList.classList.contains('active')) {
                navToggle.classList.remove('active');
                navList.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        });

        // Close menu when clicking on a link
        navList.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navList.classList.remove('active');
                document.body.classList.remove('nav-open');
            });
        });
    }

    // Slider functionality
    const slider = document.querySelector('.slider');
    if (slider) {
        const slides = slider.querySelectorAll('.slider__item');
        const dots = slider.querySelectorAll('.slider__dot');
        let currentSlide = 0;

        function showSlide(n) {
            if (slides.length === 0) return;
            
            // Hide all slides
            slides.forEach(slide => {
                slide.style.display = 'none';
            });

            // Remove active class from all dots
            dots.forEach(dot => {
                dot.classList.remove('active');
            });

            // Show current slide and activate corresponding dot
            slides[n].style.display = 'block';
            if (dots[n]) {
                dots[n].classList.add('active');
            }
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        // Add click handlers to dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });

        // Show first slide
        showSlide(currentSlide);

        // Auto advance slides every 5 seconds
        setInterval(nextSlide, 5000);
    }
});

// Print card functionality
const printButtons = document.querySelectorAll('.pet-card__print');
printButtons.forEach(button => {
    button.addEventListener('click', () => {
        window.print();
    });
});

// Form validation
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic form validation
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
                
                // Show error message
                let errorMessage = field.nextElementSibling;
                if (!errorMessage || !errorMessage.classList.contains('error-message')) {
                    errorMessage = document.createElement('span');
                    errorMessage.classList.add('error-message');
                    field.parentNode.insertBefore(errorMessage, field.nextSibling);
                }
                errorMessage.textContent = 'Это поле обязательно для заполнения';
            }
        });

        // Email validation
        const emailFields = form.querySelectorAll('input[type="email"]');
        emailFields.forEach(field => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (field.value && !emailRegex.test(field.value)) {
                isValid = false;
                field.classList.add('error');
                
                let errorMessage = field.nextElementSibling;
                if (!errorMessage || !errorMessage.classList.contains('error-message')) {
                    errorMessage = document.createElement('span');
                    errorMessage.classList.add('error-message');
                    field.parentNode.insertBefore(errorMessage, field.nextSibling);
                }
                errorMessage.textContent = 'Введите корректный email';
            }
        });

        // Phone validation
        const phoneFields = form.querySelectorAll('input[type="tel"]');
        phoneFields.forEach(field => {
            const phoneRegex = /^\+?[0-9]{10,}$/;
            if (field.value && !phoneRegex.test(field.value.replace(/\s+/g, ''))) {
                isValid = false;
                field.classList.add('error');
                
                let errorMessage = field.nextElementSibling;
                if (!errorMessage || !errorMessage.classList.contains('error-message')) {
                    errorMessage = document.createElement('span');
                    errorMessage.classList.add('error-message');
                    field.parentNode.insertBefore(errorMessage, field.nextSibling);
                }
                errorMessage.textContent = 'Введите корректный номер телефона';
            }
        });

        // Clear error states on input
        form.querySelectorAll('input, select, textarea').forEach(field => {
            field.addEventListener('input', () => {
                field.classList.remove('error');
                const errorMessage = field.nextElementSibling;
                if (errorMessage && errorMessage.classList.contains('error-message')) {
                    errorMessage.remove();
                }
            });
        });

        if (isValid) {
            // Here you would typically send the form data to a server
            console.log('Form submitted successfully');
            form.reset();
        }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // Проверяем, что href не равен просто "#"
        if (href === '#') {
            e.preventDefault();
            return;
        }
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Forgot password functionality
document.addEventListener('DOMContentLoaded', () => {
    const forgotPasswordModal = document.getElementById('forgotPasswordModal');
    const resetPasswordForm = document.getElementById('resetPasswordForm');

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === forgotPasswordModal) {
            forgotPasswordModal.style.display = 'none';
        }
    });

    // Handle reset password form submission
    if (resetPasswordForm) {
        resetPasswordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('resetEmail').value;
            
            if (email) {
                // Here you would typically send a request to the server
                alert('Инструкция по восстановлению пароля отправлена на ' + email);
                forgotPasswordModal.style.display = 'none';
                resetPasswordForm.reset();
            }
        });
    }
});

// Add Pet Form Functionality
document.addEventListener('DOMContentLoaded', () => {
    const addPetForm = document.querySelector('.add-pet__form');
    if (addPetForm) {
        const registerCheckbox = addPetForm.querySelector('#register');
        const passwordFields = addPetForm.querySelector('.password-fields');
        const photoUpload = addPetForm.querySelector('.photo-upload');
        const photoPreview = addPetForm.querySelector('.photo-preview');

        // Toggle password fields visibility
        if (registerCheckbox && passwordFields) {
            registerCheckbox.addEventListener('change', () => {
                passwordFields.style.display = registerCheckbox.checked ? 'block' : 'none';
                const passwordInputs = passwordFields.querySelectorAll('input');
                passwordInputs.forEach(input => {
                    input.required = registerCheckbox.checked;
                });
            });
        }

        // Photo upload preview
        if (photoUpload) {
            const fileInputs = photoUpload.querySelectorAll('input[type="file"]');
            fileInputs.forEach(input => {
                input.addEventListener('change', function(e) {
                    const file = this.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = function(e) {
                            const preview = document.createElement('div');
                            preview.className = 'photo-preview__item';
                            preview.innerHTML = `
                                <img src="${e.target.result}" alt="Preview">
                                <button type="button" class="remove-photo">×</button>
                            `;
                            photoPreview.appendChild(preview);
                        };
                        reader.readAsDataURL(file);
                    }
                });
            });

            // Remove photo preview
            photoPreview.addEventListener('click', (e) => {
                if (e.target.classList.contains('remove-photo')) {
                    e.target.parentElement.remove();
                }
            });
        }

        // Form submission
        addPetForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Validate form
            const isValid = validateAddPetForm(addPetForm);
            if (!isValid) return;

            // Collect form data
            const formData = new FormData(addPetForm);
            
            try {
                // Here you would normally send the data to your server
                // For now, we'll just simulate a successful submission
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                alert('Объявление успешно добавлено!');
                addPetForm.reset();
                if (photoPreview) {
                    photoPreview.innerHTML = '';
                }
            } catch (error) {
                alert('Произошла ошибка при добавлении объявления. Пожалуйста, попробуйте снова.');
            }
        });
    }
});

// Search Form Functionality
document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.querySelector('.search-form');
    const searchResults = document.querySelector('.search-results');
    const petCards = document.querySelector('.pet-cards');

    if (searchForm && searchResults) {
        searchForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(searchForm);
            const searchParams = Object.fromEntries(formData.entries());
            
            try {
                // Here you would normally fetch data from your server
                // For now, we'll use mock data
                await displaySearchResults(mockSearchResults);
            } catch (error) {
                console.error('Error fetching search results:', error);
                searchResults.innerHTML = '<p class="error-message">Произошла ошибка при поиске. Пожалуйста, попробуйте снова.</p>';
            }
        });
    }
});

// Pet Details Page Functionality
document.addEventListener('DOMContentLoaded', () => {
    const petDetailsSection = document.querySelector('.pet-details');
    if (petDetailsSection) {
        loadPetDetails();
    }
});

// Function to load pet details
async function loadPetDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const petId = urlParams.get('id');
    
    if (!petId) {
        showError('Питомец не найден');
        return;
    }

    try {
        const pet = getPetById(petId);
        if (!pet) {
            showError('Питомец не найден');
            return;
        }
        updatePetDetailsPage(pet);
    } catch (error) {
        console.error('Error loading pet details:', error);
        showError('Произошла ошибка при загрузке данных');
    }
}

// Function to update pet details page
function updatePetDetailsPage(pet) {
    document.title = `${pet.type} | Новая жизнь`;
    
    const heading = document.querySelector('.pet-details h1');
    if (heading) {
        heading.textContent = `Найден ${pet.type.toLowerCase()}`;
    }

    const mainImage = document.querySelector('.pet-details__main-image img');
    if (mainImage) {
        mainImage.src = pet.image;
        mainImage.alt = pet.type;
    }

    const thumbnails = document.querySelector('.pet-details__thumbnails');
    if (thumbnails) {
        thumbnails.innerHTML = pet.images.map(img => `
            <img src="${img}" alt="${pet.type}" onclick="updateMainImage(this.src)">
        `).join('');
    }

    const info = {
        'Вид животного': pet.type,
        'Нашел': pet.finder,
        'Телефон': pet.phone,
        'Email': pet.email,
        'Район': pet.district,
        'Дата находки': pet.date,
        'Клеймо': pet.mark || 'Нет',
        'Дополнительная информация': pet.description
    };

    const infoContainer = document.querySelector('.pet-details__info');
    if (infoContainer) {
        infoContainer.innerHTML = Object.entries(info).map(([label, value]) => `
            <div class="pet-details__row">
                <span class="pet-details__label">${label}:</span>
                ${label === 'Телефон' ? 
                    `<a href="tel:${value}" class="pet-details__value">${value}</a>` :
                    label === 'Email' ? 
                    `<a href="mailto:${value}" class="pet-details__value">${value}</a>` :
                    `<span class="pet-details__value">${value}</span>`
                }
            </div>
        `).join('');
    }
}

// Helper Functions
function validateAddPetForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        const errorMessage = field.nextElementSibling;
        if (!field.value.trim()) {
            field.classList.add('error');
            if (errorMessage && errorMessage.classList.contains('error-message')) {
                errorMessage.style.display = 'block';
            }
            isValid = false;
        } else {
            field.classList.remove('error');
            if (errorMessage && errorMessage.classList.contains('error-message')) {
                errorMessage.style.display = 'none';
            }
        }
    });

    // Validate password match if registration is checked
    const registerCheckbox = form.querySelector('#register');
    if (registerCheckbox && registerCheckbox.checked) {
        const password = form.querySelector('#password');
        const passwordConfirm = form.querySelector('#password-confirm');
        if (password.value !== passwordConfirm.value) {
            passwordConfirm.classList.add('error');
            const errorMessage = passwordConfirm.nextElementSibling;
            if (errorMessage) {
                errorMessage.style.display = 'block';
            }
            isValid = false;
        }
    }

    return isValid;
}

async function displaySearchResults(results) {
    const petCards = document.querySelector('.pet-cards');
    if (!petCards) return;

    petCards.innerHTML = results.map(pet => `
        <div class="pet-card">
            <img src="${pet.image}" alt="${pet.type}" class="pet-card__image">
            <div class="pet-card__content">
                <h3 class="pet-card__title">${pet.type}</h3>
                <p class="pet-card__description">${pet.description}</p>
                <p class="pet-card__location">Район: ${pet.district}</p>
                <span class="pet-card__date">${pet.date}</span>
                <a href="pet.html?id=${pet.id}" class="button">Подробнее</a>
            </div>
        </div>
    `).join('');
}

// Function to update main image
function updateMainImage(src) {
    const mainImage = document.querySelector('.pet-details__main-image img');
    if (mainImage) {
        mainImage.src = src;
    }
}

// Mock data for testing
const mockSearchResults = [
    {
        id: 1,
        type: 'Собака',
        description: 'Найдена в парке. Дружелюбная, ухоженная собака. На вид около 2 лет. Была в синем ошейнике.',
        district: 'Брагино',
        date: '20.10.2023',
        image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1',
        finder: 'Иван Петров',
        phone: '+7 (900) 123-45-67',
        email: 'ivan@example.com'
    },
    {
        id: 2,
        type: 'Кошка',
        description: 'Найдена возле магазина. Ласковая, домашняя кошка. Трехцветная.',
        district: 'Заволжский',
        date: '21.10.2023',
        image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba',
        finder: 'Мария Сидорова',
        phone: '+7 (900) 987-65-43',
        email: 'maria@example.com'
    },
    {
        id: 3,
        type: 'Собака',
        description: 'Найден щенок хаски. Очень активный и игривый.',
        district: 'Фрунзенский',
        date: '22.10.2023',
        image: 'https://images.unsplash.com/photo-1547407139-3c921a66005c',
        finder: 'Алексей Смирнов',
        phone: '+7 (900) 111-22-33',
        email: 'alex@example.com'
    }
];

// Function to get pet by ID
function getPetById(id) {
    // Here you would typically fetch data from your server
    // For now, we'll use mock data
    const pets = [
        {
            id: 1,
            type: 'Собака',
            image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1',
            images: [
                'https://images.unsplash.com/photo-1543466835-00a7907e9de1',
                'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba'
            ],
            finder: 'Иван Иванов',
            phone: '+7 123 456 78 90',
            email: 'ivan@example.com',
            district: 'Брагино',
            date: '20.10.2023',
            mark: 'Клеймо на ухе',
            description: 'Найдена в парке'
        },
        {
            id: 2,
            type: 'Кошка',
            image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba',
            images: [
                'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba',
                'https://images.unsplash.com/photo-1543466835-00a7907e9de1'
            ],
            finder: 'Петр Петров',
            phone: '+7 901 234 56 78',
            email: 'petr@example.com',
            district: 'Заволжский',
            date: '21.10.2023',
            description: 'Найдена возле магазина'
        }
    ];

    return pets.find(pet => pet.id === parseInt(id));
}

// Function to show error message
function showError(message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    document.body.appendChild(errorElement);
    setTimeout(() => {
        errorElement.remove();
    }, 3000);
}
