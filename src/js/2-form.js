let formData = {
  email: '',
  message: '',
};

const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');

populateInput();

form.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.currentTarget;

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log('Submitted data:', formData);

  localStorage.removeItem(STORAGE_KEY);
  form.reset();
}

form.addEventListener('input', handleFormInput);

function handleFormInput(e) {
  e.preventDefault();

  const inputName = e.target.name;

  const inputValue = e.target.value.trim();

  if (inputName === 'email' || inputName === 'message') {
    formData[inputName] = inputValue;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }
}

function populateInput() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (!savedData) return;

  try {
    const dataFromLS = JSON.parse(savedData);

    const formEl = new FormData(form);

    const formFields = Array.from(formEl.keys());

    formFields.forEach(field => {
      form.elements[field].value = dataFromLS[field];
    });
  } catch (error) {
    alert();
  }
}
