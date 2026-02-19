import { useState } from 'react';
import './CitizenFormView.css';

export default function CitizenFormView({ fields = [], onSubmit, submitting }) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (key, value) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: null }));
  };

  const validate = () => {
    const next = {};
    fields.forEach((f) => {
      const key = (f.label || '').trim() || `field_${f.type}`;
      if (f.required && (values[key] === undefined || values[key] === '')) {
        next[key] = 'This field is required';
      }
    });
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(values);
  };

  const renderField = (field, index) => {
    const key = (field.label || '').trim() || `field_${index}`;
    const value = values[key];
    const err = errors[key];
    const common = {
      id: `field-${index}`,
      value: value ?? '',
      onChange: (e) => handleChange(key, e.target.type === 'checkbox' ? e.target.checked : e.target.value),
      required: !!field.required,
      placeholder: field.placeholder || ''
    };

    if (field.type === 'textarea') {
      return (
        <label key={index} className="citizen-field">
          <span>{field.label}{field.required && ' *'}</span>
          <textarea {...common} rows={3} />
          {err && <span className="field-error">{err}</span>}
        </label>
      );
    }
    if (field.type === 'checkbox') {
      return (
        <label key={index} className="citizen-field citizen-field-checkbox">
          <input type="checkbox" checked={!!value} onChange={common.onChange} />
          <span>{field.label}{field.required && ' *'}</span>
          {err && <span className="field-error">{err}</span>}
        </label>
      );
    }
    if (field.type === 'radio' && Array.isArray(field.options)) {
      return (
        <div key={index} className="citizen-field">
          <span className="label">{field.label}{field.required && ' *'}</span>
          <div className="radio-group">
            {field.options.map((opt, i) => (
              <label key={i}>
                <input type="radio" name={key} value={opt} checked={value === opt} onChange={common.onChange} />
                {opt}
              </label>
            ))}
          </div>
          {err && <span className="field-error">{err}</span>}
        </div>
      );
    }
    if (field.type === 'select' && Array.isArray(field.options)) {
      return (
        <label key={index} className="citizen-field">
          <span>{field.label}{field.required && ' *'}</span>
          <select {...common}>
            <option value="">Select...</option>
            {field.options.map((opt, i) => (
              <option key={i} value={opt}>{opt}</option>
            ))}
          </select>
          {err && <span className="field-error">{err}</span>}
        </label>
      );
    }

    if (field.type === 'file') {
      return (
        <label key={index} className="citizen-field">
          <span>{field.label}{field.required && ' *'}</span>
          <input
            type="file"
            id={common.id}
            required={common.required}
            onChange={(e) => handleChange(key, e.target.files[0])}
            className="file-input"
          />
          {err && <span className="field-error">{err}</span>}
        </label>
      );
    }

    const inputType = ['text', 'number', 'email', 'tel', 'date'].includes(field.type) ? field.type : 'text';
    return (
      <label key={index} className="citizen-field">
        <span>{field.label}{field.required && ' *'}</span>
        <input type={inputType} {...common} />
        {err && <span className="field-error">{err}</span>}
      </label>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="citizen-form-view">
      {fields.map((f, i) => renderField(f, i))}
      <button type="submit" className="btn-submit" disabled={submitting}>
        {submitting ? 'Submitting…' : 'Submit Application'}
      </button>
    </form>
  );
}
