/**
 * ============================================================================
 *  Custom useForm hook (Kavia AI refactored)
 *  Provides robust state management for trip creation forms.
 *  Modernized: Uses object for formData, validates input use, adds comments.
 * ============================================================================
 */

import { useCallback, useState } from "react";

/**
 * PUBLIC_INTERFACE
 * useForm hook centralizes form field handling via a controlled input pattern.
 * Returns:
 *  - handleInputChanges: (name, value) => void
 *  - formData: {Object} keyed by [fieldName]: value
 */
const useForm = () => {
  // Use {} not [] for object-based key-value store
  const [formData, setFormData] = useState({});

  /**
   * Updates formData on a per-field basis.
   * @param {string} name - The input field name
   * @param {any} value - The value to assign to the form field
   */
  const handleInputChanges = useCallback((name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  // No need for an empty useEffect
  return { handleInputChanges, formData };
};

export default useForm;