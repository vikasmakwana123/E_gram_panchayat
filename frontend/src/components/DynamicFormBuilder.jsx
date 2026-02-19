import './DynamicFormBuilder.css';

const FIELD_TYPES = [
  { value: 'text', label: 'Text' },
  { value: 'textarea', label: 'Textarea' },
  { value: 'number', label: 'Number' },
  { value: 'email', label: 'Email' },
  { value: 'tel', label: 'Phone' },
  { value: 'date', label: 'Date' },
  { value: 'checkbox', label: 'Checkbox' },
  { value: 'radio', label: 'Radio' },
  { value: 'select', label: 'Dropdown' },
  { value: 'file', label: 'File' }
];

const defaultField = () => ({
  label: '',
  type: 'text',
  placeholder: '',
  required: false,
  options: []
});

export default function DynamicFormBuilder({ fields = [], onChange }) {
  const list = fields.length ? fields : [defaultField()];

  const updateField = (index, key, value) => {
    const next = [...list];
    next[index] = { ...next[index], [key]: value };
    onChange?.(next);
  };

  const addField = () => {
    onChange?.([...list, defaultField()]);
  };

  const removeField = (index) => {
    if (list.length <= 1) return;
    onChange?.(list.filter((_, i) => i !== index));
  };

  const updateOptions = (index, optionsText) => {

    updateField(index, 'optionsText', optionsText);

    const options = optionsText.split(',').map(s => s.trim()).filter(Boolean);
    updateField(index, 'options', options);
  };

  const needsOptions = (type) => type === 'select' || type === 'radio';

  return (
    <div className="dynamic-form-builder">
      <div className="form-builder-header">
        <h3>Form Fields</h3>
        <button type="button" className="btn-add" onClick={addField}>+ Add Field</button>
      </div>
      {list.map((field, index) => (
        <div key={index} className="field-row">
          <div className="field-inputs">
            <input
              type="text"
              placeholder="Field label"
              value={field.label}
              onChange={(e) => updateField(index, 'label', e.target.value)}
              className="field-label"
            />
            <select
              value={field.type}
              onChange={(e) => updateField(index, 'type', e.target.value)}
              className="field-type"
            >
              {FIELD_TYPES.map(({ value, label }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
            {field.type !== 'checkbox' && field.type !== 'radio' && (
              <input
                type="text"
                placeholder="Placeholder (optional)"
                value={field.placeholder || ''}
                onChange={(e) => updateField(index, 'placeholder', e.target.value)}
                className="field-placeholder"
              />
            )}
            {needsOptions(field.type) && (
              <input
                type="text"
                placeholder="Options (comma-separated)"
                value={field.optionsText !== undefined ? field.optionsText : (field.options || []).join(', ')}
                onChange={(e) => updateOptions(index, e.target.value)}
                className="field-options"
              />
            )}
            <label className="field-required">
              <input
                type="checkbox"
                checked={!!field.required}
                onChange={(e) => updateField(index, 'required', e.target.checked)}
              />
              Required
            </label>
          </div>
          <button
            type="button"
            className="btn-remove"
            onClick={() => removeField(index)}
            disabled={list.length <= 1}
            title="Remove field"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
