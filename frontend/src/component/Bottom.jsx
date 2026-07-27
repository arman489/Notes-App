const Button = ({name,onClick,className}) => {
  return (
    <button onClick={onClick}
      className="relative overflow-hidden rounded-full bg-green-400 px-8 py-3.5 font-bold text-[17px] tracking-wide text-white cursor-pointer outline-none before:content-[''] before:absolute before:top-0 before:left-[-10%] before:h-full before:w-[120%] before:bg-black before:skew-x-[30deg] before:transition-transform before:duration-500 before:ease-[cubic-bezier(0.3,1,0.8,1)] hover:before:translate-x-full active:scale-98 group"    >
      <span className="relative z-10 transition-colors duration-500 group-hover:text-black" >
        {name}
      </span>
    </button>
  );
};

export default Button;