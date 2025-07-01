import { useState, useEffect } from 'react';

// export function ContactForm({ contact = null, onSave, onClose }) {
//   const isEditMode = !!contact;

//   const [formData, setFormData] = useState({
//     contact_name: '',
//     contact_phone: '',
//     contact_email: '',
//     company_name: '',
//     country: '',
//     address: '',
//   });

//   useEffect(() => {
//     if (isEditMode) setFormData(contact);
//   }, [contact]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave(formData);
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <button onClick={onClose} className="close-button">×</button>
//         <h3>{isEditMode ? 'Edit Contact' : 'Add Contact'}</h3>
//         <form onSubmit={handleSubmit}>
//           <input name="contact_name" placeholder="Name" value={formData.contact_name} onChange={handleChange} required />
//           <input name="contact_phone" placeholder="Phone" value={formData.contact_phone} onChange={handleChange} />
//           <input name="contact_email" placeholder="Email" value={formData.contact_email} onChange={handleChange} />
//           <input name="company_name" placeholder="Company" value={formData.company_name} onChange={handleChange} />
//           <input name="country" placeholder="Country" value={formData.country} onChange={handleChange} />
//           <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
//           <button type="submit">{isEditMode ? 'Update' : 'Add'}</button>
//         </form>
//       </div>
//     </div>
//   );
// }
export function ContactForm({ contact = null, onSave, onClose, type = 'לקוח' }) {
  const isEditMode = !!contact;

  const [formData, setFormData] = useState({
    contact_name: '',
    contact_phone: '',
    contact_email: '',
    company_name: '',
    country: '',
    address: '',
  });

  useEffect(() => {
    if (isEditMode) setFormData(contact);
  }, [contact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="close-button">×</button>
        <h3>{isEditMode ? `עריכת ${type === 'supplier' ? 'ספק' : 'לקוח'}` : `צור ${type === 'supplier' ? 'ספק' : 'לקוח'}`}</h3>
        <form onSubmit={handleSubmit}>
          <input name="contact_name" placeholder="Name" value={formData.contact_name} onChange={handleChange} required />
          <input name="contact_phone" placeholder="Phone" value={formData.contact_phone} onChange={handleChange} />
          <input name="contact_email" placeholder="Email" value={formData.contact_email} onChange={handleChange} />
          <input name="company_name" placeholder="Company" value={formData.company_name} onChange={handleChange} />
          <input name="country" placeholder="Country" value={formData.country} onChange={handleChange} />
          <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
          <button type="submit">{isEditMode ? 'עדכן' : 'צור'}</button>
        </form>
      </div>
    </div>
  );
}

