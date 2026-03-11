import "./styles/FormInput.css";
export default function FormInput({
  type = "text",
  id,
  name,
  placeholder,
  label = false,
  onChange,
  value,
  readOnly=false
}) {
  return (
    <>
      {label && (
        <>
          <label for={id}>{name}</label> <br />
        </>
      )}
      <input type={type} name={name} id={id} placeholder={placeholder} autoComplete="off" onChange={onChange} value={value} readOnly={readOnly}></input>
    </>
  );
}
