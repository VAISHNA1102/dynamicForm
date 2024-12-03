import React, { useState } from 'react';
import '../css/FormTable.css';

const FormTable = ({ data, onEdit, onDelete, onSave, onCancel }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedRow, setEditedRow] = useState(null);

  const handleEdit = (index) => {
    setIsEditing(true);
    setEditedRow({ ...data[index], index }); // Include the index for tracking but not rendering
  };

  const handleSave = () => {
    onSave(editedRow);  // Pass the edited row to the parent component to save
    setIsEditing(false); // Exit edit mode
  };

  const handleCancel = () => {
    setIsEditing(false); // Exit edit mode without saving
  };

  const handleFieldChange = (field, value) => {
    setEditedRow({
      ...editedRow,
      [field]: value
    });
  };

  return (
    <table>
      <thead>
        <tr>
          {Object.keys(data[0]).map((key, index) => (
            key !== "index" && <th key={index}>{key}</th> // Do not render "index" column
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {Object.keys(row).map((key, idx) => (
              key !== "index" && (
                <td key={idx}>
                  {isEditing && editedRow.index === index ? (
                    <input
                      type="text"
                      value={editedRow[key]}
                      onChange={(e) => handleFieldChange(key, e.target.value)}
                    />
                  ) : (
                    row[key] // Display the value
                  )}
                </td>
              )
            ))}
            <td>
              {isEditing && editedRow.index === index ? (
                <>
                  <button className="save" onClick={handleSave}>Save</button>
                  <button className="cancel" onClick={handleCancel}>Cancel</button>
                </>
              ) : (
                <>
                  <button className="edit" onClick={() => handleEdit(index)}>Edit</button>
                  <button className="delete" onClick={() => onDelete(index)}>Delete</button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FormTable;
