
const Input = ({ label, id, ...props }) => {
    return (
        <div className="flex flex-col">
            <label htmlFor={id} className="text-lg">{label}</label>
            <input id={id} name={id} className="bg-orange-500 text-white font-bold rounded-md p-3" {...props}></input>
        </div>
    )
}

export default Input;