import React, { useState, useEffect } from 'react';
import FormRenderer from './components/FormRenderer';
import FormTable from './components/FormTable';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer';

const formOptions = [
  { label: "User Information", value: "user-info" },
  { label: "Address Information", value: "address-info" },
  { label: "Payment Information", value: "payment-info" }
];

function App() {
  const [selectedForm, setSelectedForm] = useState('');
  const [formData, setFormData] = useState(null);
  const [submittedData, setSubmittedData] = useState({
    'user-info': [],
    'address-info': [],
    'payment-info': []
  });
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    if (selectedForm) {
      fetchFormStructure();
    }
  }, [selectedForm]);

  const fetchFormStructure = async () => {
    const mockAPIResponses = {
      "user-info": {
        fields: [
          { name: "firstName", type: "text", label: "First Name", required: true },
          { name: "lastName", type: "text", label: "Last Name", required: true },
          { name: "age", type: "number", label: "Age", required: false }
        ]
      },
      "address-info": {
        fields: [
          { name: "street", type: "text", label: "Street", required: true },
          { name: "city", type: "text", label: "City", required: true },
          { name: "state", type: "dropdown", label: "State", options: ["California", "Texas", "New York"], required: true },
          { name: "zipCode", type: "text", label: "Zip Code", required: false }
        ]
      },
      "payment-info": {
        fields: [
          { name: "cardNumber", type: "text", label: "Card Number", required: true },
          { name: "expiryDate", type: "date", label: "Expiry Date", required: true },
          { name: "cvv", type: "password", label: "CVV", required: true },
          { name: "cardholderName", type: "text", label: "Cardholder Name", required: true }
        ]
      }
    };
    
    setFormData(mockAPIResponses[selectedForm]);
  };

  const handleSubmit = (formValues) => {
    const updatedData = { ...submittedData };
    updatedData[selectedForm].push(formValues);
    setSubmittedData(updatedData);
    toast.success('Sign-up Successful.');
  };

  const handleSave = (editedRow) => {
    const updatedData = { ...submittedData };
    updatedData[selectedForm][editedRow.index] = { ...editedRow }; // Update the specific row
    setSubmittedData(updatedData);
    toast.success('Changes saved successfully.');
  };

  const handleDelete = (index) => {
    const updatedData = { ...submittedData };
    updatedData[selectedForm].splice(index, 1);
    setSubmittedData(updatedData);
    toast.error('Entry deleted successfully.');
  };

  return (
    <>
      <div className="App">
        <h1>Dynamic Form</h1>
        
        <select onChange={(e) => setSelectedForm(e.target.value)} value={selectedForm}>
          <option value="">Select Form</option>
          {formOptions.map((option, index) => (
            <option key={index} value={option.value}>{option.label}</option>
          ))}
        </select>

        {formData && (
          <FormRenderer fields={formData.fields} onSubmit={handleSubmit} />
        )}

        {selectedForm && submittedData[selectedForm].length > 0 && (
          <FormTable 
            data={submittedData[selectedForm]} 
            onSave={handleSave} 
            onDelete={handleDelete} 
          />
        )}

        <ToastContainer />
      </div>
      <Footer />
    </>
  );
}

export default App;
