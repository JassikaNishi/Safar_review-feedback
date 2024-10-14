const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public')); 

let feedbackData = [];

app.post('/feedback', (req, res) => {
  const feedback = { ...req.body, id: Date.now().toString() };
  feedbackData.push(feedback);
  console.log('Feedback submitted:', feedback);
  res.status(200).send({ message: 'Feedback received successfully!' });
});

app.get('/feedback', (req, res) => {
  res.status(200).json(feedbackData);
});

app.delete('/feedback/:id', (req, res) => {
  const { id } = req.params;
  feedbackData = feedbackData.filter(feedback => feedback.id !== id);
  res.status(200).send({ message: 'Feedback removed successfully!' });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
