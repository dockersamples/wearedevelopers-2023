import { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";

export function AddItemForm({ onNewItem }) {
  const [newItem, setNewItem] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const submitNewItem = e => {
      e.preventDefault();
      setSubmitting(true);
      fetch('/items', {
          method: 'POST',
          body: JSON.stringify({ name: newItem }),
          headers: { 'Content-Type': 'application/json' },
      })
          .then(r => r.json())
          .then(item => {
              onNewItem(item);
              setSubmitting(false);
              setNewItem('');
          });
  };

  return (
      <Form onSubmit={submitNewItem}>
          <InputGroup className="mb-3">
              <Form.Control
                  value={newItem}
                  onChange={e => setNewItem(e.target.value)}
                  type="text"
                  placeholder="New Item"
                  aria-describedby="basic-addon1"
              />
              <Button
                  type="submit"
                  variant="success"
                  disabled={!newItem.length}
                  className={submitting ? 'disabled' : ''}
              >
                  {submitting ? 'Adding...' : 'Add Item'}
              </Button>
          </InputGroup>
      </Form>
  );
}