// src/components/EventModal.jsx
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { deleteEvent } from '../features/events/eventSlice';


Modal.setAppElement('#root');

const categoryOptions = ['exercise', 'eating', 'work', 'relax', 'family', 'social'];


const EventModal = ({ isOpen, onClose, onSave, initialData }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    date: '',
    start: '',
    end: '',
  });
  
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = () => {
    const start = new Date(`${formData.date}T${formData.start}`);
    const end = new Date(`${formData.date}T${formData.end}`);
    onSave({ ...formData, start, end });
    onClose();
  };
  
  const handleDelete = () => {
    if (initialData?._id) {
      dispatch(deleteEvent(initialData._id));
      onClose();
    }
  };
  
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Event Modal" className="modal" overlayClassName="overlay">
      <h2>{initialData ? 'Edit Event' : 'Create Event'}</h2>
      <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
      <select name="category" value={formData.category} onChange={handleChange}>
        <option value="">Select Category</option>
        {categoryOptions.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <input type="date" name="date" value={formData.date} onChange={handleChange} />
      <input type="time" name="start" value={formData.start} onChange={handleChange} />
      <input type="time" name="end" value={formData.end} onChange={handleChange} />
      <div style={{ marginTop: '20px' }}>
        <button onClick={handleSubmit}>Save</button>
        <button onClick={onClose} style={{ marginLeft: '10px' }}>Cancel</button>
        {initialData?._id && (
          <button onClick={handleDelete} style={{ background: 'red', color: 'white', marginTop: '10px' }}>
            Delete
          </button>
        )}
      </div>
    </Modal>
  );
};

export default EventModal;
