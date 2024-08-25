/* eslint-disable react/prop-types */
export const LabelAndInput = ({text, id, onChangeFormData, formData, placeholder}) => {
    return (
      <>
      <label className="mb-2 text-md font-medium" htmlFor={id}>{text}</label> <br/>
      <input placeholder={placeholder} onChange={(e) => onChangeFormData(e)} className="w-full mt-2 border border-gray-300 px-2 py-2 bg-white focus:outline-none rounded-sm " type="text" id={id} value={formData.firstName} />
      </>
    )  
  }