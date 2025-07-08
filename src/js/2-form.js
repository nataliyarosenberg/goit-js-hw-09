const formData = {
  email: '',
  message: '',
};

const form = document.querySelector('form');

const feedback_key = 'feedback-form-state';

function saveFormData() {
  localStorage.setItem(feedback_key, JSON.stringify(formData));
}

function populateForm() {
  try {
    const savedData = localStorage.getItem(feedback_key);
    if (savedData) {
      const parseData = JSON.parse(savedData);
      Object.assign(formData, parseData);
      if (
        form.elements.email.value === '' ||
        form.elements.message.value === ''
      ) {
        return 'Please fill all fields';
      }
      form.elements.email.value = formData.email;
      form.elements.message.value = formData.message;
    }
  } catch (error) {
    console.error('Error parsing', error);
    localStorage.removeItem(feedback_key);
  }
}

function handleInput(event) {
  formData[event.target.name] = event.target.value;
  saveFormData();
}

function handleSubmit(event) {
  event.preventDefault();
  if (formData.email.trim() === '' || formData.message.trim() === '') {
    alert('Fill please all fields');
    return;
  }
  console.log('Form submitted:', formData);

  localStorage.removeItem(feedback_key);

  event.currentTarget.reset();

  formData.email = '';
  formData.message = '';
}
populateForm();
form.addEventListener('submit', handleSubmit);
form.addEventListener('input', handleInput);
