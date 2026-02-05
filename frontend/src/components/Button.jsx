import "./styles/Button.css"
export default function Button({content}) //Take text as input which should be there inside button
{
    return (
        <>
            <div id="Button">
                {content}
            </div>
        </>
    )
}
