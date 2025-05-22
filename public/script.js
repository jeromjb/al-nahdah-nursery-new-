document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');

  if (!form) {
    console.error('Form not found');
    return;
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = form.querySelector('input[name="name"]').value;
    const email = form.querySelector('input[name="email"]').value;
    const phone = form.querySelector('input[name="phone"]').value;
    const subject = form.querySelector('input[name="subject"]').value;
    const message = form.querySelector('textarea[name="message"]').value;

    try {
      const response = await fetch('/api/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone, subject, message }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('✅ Message sent successfully!');
        form.reset();
      } else {
        alert(`🚫 ${result.message || 'Failed to send message.'}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('🚫 Could not connect to the server.');
    }
  });
});
