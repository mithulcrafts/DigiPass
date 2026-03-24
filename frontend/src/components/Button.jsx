import "./styles/Button.css"
export default function Button({content,onClick,type="submit"}) //Take text as input which should be there inside button
{
    return (
        <>
            <button id="Button" type={type} onClick={onClick}> 
                {content}
            </button>
        </>
    )
}
