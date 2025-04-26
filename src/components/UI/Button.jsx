
const Button = ({ children, className = "", ...props }) => {
  return (
    <button className={`${className} font-bold rounded-md px-2 py-1 hover:cursor-pointer`} {...props}>
        {children}
    </button>
  )
}

export default Button;