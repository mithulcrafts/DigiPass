import "./styles/FormInput.css";
function FormInput({
  type = "text",
  id,
  name,
  placeholder,
  label = false,
  onChange,
  value,
  readOnly=false,
  autoComplete="off"
}) {
  return (
    <>
      {label && (
        <>
          <label className="FormLabel" htmlFor={id}>{name}</label> <br />
        </>
      )}
      <input className="FormInput" type={type} name={name} id={id} placeholder={placeholder} autoComplete={autoComplete} onChange={onChange} value={value} readOnly={readOnly}></input>
    </>
  );
}

function ReadOnlyForm({
  type = "text",
  id,
  name,
  label = true,
  onChange,
  value,
}) {
  return (
    <>
      {label && (
        <>
          <label className="ReadOnlyFormLabel" htmlFor={id}>{name}</label> <br />
        </>
      )}
      <input className="ReadOnlyForm" type={type} name={name} id={id} autoComplete="off" onChange={onChange} value={value} readOnly={true}></input>
    </>
  );
}

export {FormInput,ReadOnlyForm}

