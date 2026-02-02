import "./FormInput.css";
export default function FormInput({
  type = "text",
  id,
  name,
  placeholder,
  label = false,
}) {
  return (
    <>
      {label && (
        <>
          <label for={id}>{name}</label> <br />
        </>
      )}
      <input type={type} name={name} id={id} placeholder={placeholder} autocomplete="off"></input>
    </>
  );
}
