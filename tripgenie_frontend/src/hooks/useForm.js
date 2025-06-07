/**
 * Kavia AI Documentation:
 * useForm.js - Custom hook for form state in React.
 * 
 * Purpose:
 * - Manages the trip creation/editing form as a single object of fields.
 * - Provides a method to update any field by name/value for modular form building.
 * 
 * Returns:
 *   - handleInputChanges: function to update form fields.
 *   - formData: current form data object.
 */

import { useEffect, useState } from 'react';

// PUBLIC_INTERFACE
const useForm = () => {
    // formData initially empty object; collects form fields as they're filled in
    const [formData, setFormData] = useState([]);

    // Receives (name, value) pair for input elements and merges into formData
    const handleInputChanges = (name, value) => {
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
    // Empty useEffect hook, reserved for future form effects or validation
    useEffect(() => {
    }, [formData]);

    return {handleInputChanges, formData}
}

export default useForm;