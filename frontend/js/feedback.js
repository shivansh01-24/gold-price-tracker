document.getElementById('submitFeedback').addEventListener('click', async () => {
  const message = document.getElementById('feedbackInput').value;
  if (!message) return alert('Please enter feedback');
  const success = await submitFeedback(message);
  if (success) {
    alert('Feedback submitted!');
    document.getElementById('feedbackInput').value = '';
  } else {
    alert('Error submitting feedback');
  }
});
