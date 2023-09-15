import React from 'react'

interface Props {
  label: string
  checked: boolean
  // eslint-disable-next-line no-unused-vars
  onChange: (value: boolean) => void
}

export const Checkbox: React.FC<Props> = ({ label, checked, onChange }) => {
  return (
    <div className={`custom-checkbox ${checked ? 'custom-checkbox--checked' : ''}`}>
      <div className="custom-checkbox__input">
        <input
          id="checkbox-minimalistic"
          type="checkbox"
          name="minimalistic"
          checked={checked}
          onChange={event => onChange(event.target.checked)}
        />
        <span className="custom-checkbox__icon check">
          <svg className="icon icon--check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
            <path
              d="M10.6092 16.0192L17.6477 8.98076"
              className="stroke"
              stroke-linecap="square"
              stroke-linejoin="bevel"
            ></path>
            <path
              d="M7.35229 12.7623L10.6092 16.0192"
              className="stroke"
              stroke-linecap="square"
              stroke-linejoin="bevel"
            ></path>
          </svg>
        </span>
      </div>
      <label htmlFor="checkbox-minimalistic" className="field-label">
        {label}
      </label>
    </div>
  )
}
