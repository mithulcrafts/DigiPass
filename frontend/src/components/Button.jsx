import "./styles/Button.css"
export default function Button({content,onClick}) //Take text as input which should be there inside button
{
    return (
        <>
            <button id="Button" type="submit" onClick={onClick}> 
                {content}
            </button>
        </>
    )
}
