import React, { useState } from 'react';
import '../../styles/Admin/staffregisterform.css';
import Axios from '../../api/Axios';

const AddNewCategories = ({ onClose }) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);

    try {
      const response = await Axios.post('http://localhost:5001/api/add_category', formData);
      console.log(response);
      alert('Category Added Successfully');
      onClose();
    } catch (error) {
      console.log(error);
      alert('Category Adding Failed');
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className='staff-registration-form'>
      <div className='form-div'>
        <h2>Add New Category</h2>
        <p>Please fill this.</p>
        <div className="horizontal-line"></div>
        <br />
        <div className="form-registerIconContainer"></div>
        <form style={{ fontFamily: 'poppins-semibold', fontSize: 13, color: 'black' }} onSubmit={handleSubmit}>
          <div className='StaffRegFormRow'>
            <div className='StaffRegFormCol1'>
              <label>Name:</label>
              <input type='text' value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className='StaffRegFormCol2'>
              <label>Add image:</label>
              <input type='file' onChange={handleImageChange} required />
            </div>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddNewCategories;
