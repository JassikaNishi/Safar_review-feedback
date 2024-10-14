import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import './style.css';

function UserFeedback() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedback: '',
    rating: '5',
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/feedback', formData);
      setSuccess(true);
      setError(false);
      setFormData({
        name: '',
        email: '',
        feedback: '',
        rating: '5',
      });
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setError(true);
      setSuccess(false);
    }
  };

  return (
    <div className="feedback-container">
      <div className="feedback-form">
        <h1>User Feedback</h1>
        {success && <Alert variant="success">Feedback submitted successfully!</Alert>}
        {error && <Alert variant="danger">Error submitting feedback!</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="email" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="rating" className="mb-3">
            <Form.Label>Rating</Form.Label>
            <Form.Select
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              required
            >
              <option value="5">Excellent</option>
              <option value="4">Very Good</option>
              <option value="3">Good</option>
              <option value="2">Fair</option>
              <option value="1">Poor</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="feedback" className="mb-3">
            <Form.Label>Feedback</Form.Label>
            <Form.Control
              as="textarea"
              name="feedback"
              rows={4}
              value={formData.feedback}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Submit Feedback
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default UserFeedback;
