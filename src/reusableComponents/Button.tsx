import { ButtonProps } from "../types";

function Button({ icon, moveChapter, move, /* bookIdSelected,  */hideInSmallScreen/* , changeFontSize */, classMore }: ButtonProps) {
    return (
        <div
            // className={`${hideInSmallScreen && "hidden sm:block"} btn rounded-full h-16 pt-1 text-5xl border-none text-current bg-base-100 hover:bg-primary`}
            // className={`${hideInSmallScreen && "hidden sm:block"} btn btn-primary h-5 hover:text-base-100 rounded-full border-none text-current ${changeFontSize ? "text-[10px]" : "text-xl"}`}
            className={
                `
                ${hideInSmallScreen && "hidden sm:block"} 
                btn                 
                hover:text-base-100 
                h-5 
                ${move === "next" ? "rounded-r-full " : "rounded-l-full "}
                border-none 
                text-current 
                text-xl 
                ${classMore}
                bg-base-300
                hover:bg-base-200
                `
            }
            onClick={() => {
                // moveChapter(move, bookIdSelected)
                moveChapter(move)
            }}
        >
            <div className="flex items-center justify-center w-full h-full ">
                <p>{icon}</p>
            </div>
        </div>
    )
}

export default Button