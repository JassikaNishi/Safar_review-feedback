import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Spinner, Alert, Button } from 'react-bootstrap';
import './style.css';

function ServiceProviderDashboard() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get('http://localhost:5000/feedback');
        setFeedbackList(response.data);
      } catch (error) {
        console.error('Error fetching feedback:', error);
        setError('Failed to load feedback. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  const handleDeleteFeedback = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/feedback/${id}`);
      setFeedbackList(feedbackList.filter(feedback => feedback.id !== id)); 
    } catch (error) {
      console.error('Error deleting feedback:', error);
      setError('Failed to remove feedback. Please try again later.');
    }
  };

  return (
    <div className="feedback-container">
      <div className="feedback-form">
        <h1>Service Provider Dashboard</h1>
        {loading ? (
          <Spinner animation="border" />
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <div className="d-flex flex-wrap">
            {feedbackList.length > 0 ? (
              feedbackList.map((feedback, index) => (
                <Card key={index} className="m-2" style={{ width: '18rem' }}>
                  <Card.Body>
                    <Card.Title>{feedback.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{feedback.email}</Card.Subtitle>
                    <Card.Text>
                      <strong>Rating:</strong> {feedback.rating}<br />
                      <strong>Feedback:</strong> {feedback.feedback}
                    </Card.Text>
                    <Button variant="danger" onClick={() => handleDeleteFeedback(feedback.id)}>Delete</Button>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <p>No feedback available</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ServiceProviderDashboard;
