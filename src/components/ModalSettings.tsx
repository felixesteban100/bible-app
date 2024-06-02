import { ModalSettingsProps } from "../types";
// import { dbForVersionsDownloaded , versionsDownloaded } from "../data/database";

import { Check } from "lucide-react"

import { ScrollArea } from "@/components/ui/scroll-area"

import { cn } from "@/lib/utils"
import { useState } from "react";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { useTheme } from "./theme-provider";

function ModalSettings({
    textSize,
    changeTextSize,
    fontFamily,
    changeFontFamily,
    history,
    changeBook,
    changeChapter,
    changeVerse,
    changeVersion,
    theme,
    setTheme: setThemeSended,
    setHistory,

    highlithedVerses,
    setHighlithedVerses,

    // versionsDownloaded,
    // setVersionsDownloaded,

}: ModalSettingsProps) {
    // const [rangeValue, setRangeValue] = useLocalStorage("BIBLEAPP_RANGEVALUE", "25")

    const { setTheme } = useTheme()

    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")

    const reversedHistory = history.slice().reverse();

    const reversedHighlights = highlithedVerses.slice().reverse();

    const themes = [
        // "light",
        // "dark",
        // "cupcake",
        // "bumblebee",
        // "emerald",
        // "corporate",
        // "synthwave",
        // "retro",
        // "cyberpunk",
        // "valentine",
        // "halloween",
        // "garden",
        // "forest",
        // "aqua",
        "lofi",
        // "pastel",
        // "fantasy",
        // "wireframe",
        "black",
        // "luxury",
        // "dracula",
        // "cmyk",
        // "autumn",
        // "business",
        // "acid",
        // "lemonade",
        // "night",
        // "coffee",
        // "winter",
    ]

    /* function getTextSizeNumber(textSize: string): number {
        const input = textSize;
        const start = "text-[";
        const end = "0rem]";

        const startIndex = input.indexOf(start);
        const endIndex = input.indexOf(end);

        if (startIndex !== -1 && endIndex !== -1) {
            const number = input.substring(startIndex + start.length, endIndex);
            return parseInt(number)
        } else {
            console.log("No match found");
            return 2
        }
    } */

    // console.log(getTextSizeNumber(textSize))
    // console.log(textSize)

    return (
        <>
            <div className='text-2xl font-semibold'>Settings</div>
            <ScrollArea className="max-h-[80vh] pb-5">

                <div className="flex flex-col gap-2 p-5 rounded-md">
                    <div className="flex gap-2">
                        <svg className="fill-primary w-8 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M2,21H6a1,1,0,0,0,0-2H5.376l1.951-6h5.346l1.95,6H14a1,1,0,0,0,0,2h4a1,1,0,0,0,0-2H16.727L11.751,3.69A1,1,0,0,0,10.8,3H9.2a1,1,0,0,0-.951.69L3.273,19H2a1,1,0,0,0,0,2ZM9.927,5h.146l1.95,6H7.977ZM23,16a1,1,0,0,1-1,1H19a1,1,0,0,1,0-2h.365l-.586-1.692H17a1,1,0,0,1,0-2h1.087L17.288,9h-.576l-.113.327a1,1,0,0,1-1.891-.654l.346-1A1,1,0,0,1,16,7h2a1,1,0,0,1,.945.673L21.481,15H22A1,1,0,0,1,23,16Z" /></svg>
                        <p className="text-primary text-2xl font-bold">Font size</p>
                    </div>
                    <div className="w-full flex flex-col justify-center items-center ">
                        <input
                            value={textSize}
                            // value={getTextSizeNumber(textSize)}
                            type="range"
                            min={1}
                            max={6}
                            className="range"
                            onChange={(event) => changeTextSize(parseInt(event.target.value))}
                        />
                        <div className='w-full flex justify-between text-xs px-2'>
                            <span>xs</span>
                            <span>s</span>
                            <span>m</span>
                            <span>l</span>
                            <span>xl</span>
                            <span>xxl</span>
                        </div>
                    </div>

                    {/* (should be fixed) */}
                    {/* <div className="grid grid-flow-col gap-5 w-full">
                            <button
                                className="btn btn-primary text-lg"
                                onClick={() => changeTextSize(textSize - 1)}
                            >
                                A-
                            </button>
                            <button
                                className="btn btn-primary text-4xl"
                                onClick={() => changeTextSize(textSize + 1)}
                            >
                                A+
                            </button>
                        </div> */}
                </div>

                <div className="flex flex-col gap-2 p-5 rounded-md">
                    <div className="flex gap-2">
                        <svg className="fill-primary w-8 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15"><path d="M2.5 4.5C2.5 3.09886 3.59886 2 5 2H12.499C12.7752 2 13 2.22386 13 2.5C13 2.77614 12.7761 3 12.5 3H8.69244L8.40509 3.85458C8.18869 4.49752 7.89401 5.37197 7.58091 6.29794C7.50259 6.52956 7.42308 6.76453 7.34332 7H8.5C8.77614 7 9 7.22386 9 7.5C9 7.77614 8.77614 8 8.5 8H7.00407C6.56724 9.28543 6.16435 10.4613 5.95799 11.0386C5.63627 11.9386 5.20712 12.4857 4.66741 12.7778C4.16335 13.0507 3.64154 13.0503 3.28378 13.05L3.25 13.05C2.94624 13.05 2.7 12.8037 2.7 12.5C2.7 12.1962 2.94624 11.95 3.25 11.95C3.64182 11.95 3.9035 11.9405 4.14374 11.8105C4.36443 11.691 4.65532 11.4148 4.92217 10.6683C5.10695 10.1514 5.45375 9.14134 5.8422 8H4.5C4.22386 8 4 7.77614 4 7.5C4 7.22386 4.22386 7 4.5 7H6.18187C6.30127 6.64785 6.42132 6.29323 6.53887 5.94559C6.85175 5.02025 7.14627 4.14631 7.36256 3.50368L7.53192 3H5C4.15114 3 3.5 3.65114 3.5 4.5C3.5 4.77614 3.27614 5 3 5C2.72386 5 2.5 4.77614 2.5 4.5Z" /></svg>
                        <p className="text-primary text-2xl font-bold">Font family</p>
                    </div>

                    <div className="flex flex-col justify-center">
                        <p
                            className={`${fontFamily === "font-sans" ? "text-primary" : ""} hover:text-primary text-lg font-sans`}
                            onClick={() => changeFontFamily("font-sans")}
                        >
                            font-sans
                        </p>

                        <p
                            className={`${fontFamily === "font-serif" ? "text-primary" : ""} hover:text-primary text-lg font-serif`}
                            onClick={() => changeFontFamily("font-serif")}
                        >
                            font-serif
                        </p>

                        <p
                            className={`${fontFamily === "font-mono" ? "text-primary" : ""} hover:text-primary text-lg font-mono`}
                            onClick={() => changeFontFamily("font-mono")}
                        >
                            font-mono
                        </p>
                    </div>
                </div>


                <Accordion className="active:border-none w-[90%] mx-auto" type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="flex gap-2 pr-5 ">
                            <p className="text-primary text-2xl font-bold ">History</p>
                            <div className="w-full flex justify-end">
                                <div
                                    onClick={() => setHistory([])}
                                >
                                    <svg className="fill-primary w-8 h-10 hover:text-red-500" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path className="fill-current hover:text-red-500" fill="#000000" d="M352 192V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64H96a32 32 0 0 1 0-64h256zm64 0h192v-64H416v64zM192 960a32 32 0 0 1-32-32V256h704v672a32 32 0 0 1-32 32H192zm224-192a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32zm192 0a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32z" /></svg>
                                </div>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <ScrollArea className="h-[20vh] w-[90%] mx-auto">
                                <div className="flex flex-col justify-center">
                                    {
                                        reversedHistory.map((currentChapter, index) => (
                                            <label
                                                key={index}
                                                onClick={() => {
                                                    changeVersion(currentChapter.version,)
                                                    changeBook(currentChapter.book)
                                                    changeChapter(currentChapter.chapter)
                                                }}
                                                className="hover:text-primary cursor-pointer text-2xl"
                                            >
                                                {currentChapter.book.name} {currentChapter.chapter}  {currentChapter.version}
                                            </label>
                                        ))
                                    }
                                </div>
                            </ScrollArea>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger className="font-medium flex gap-2 pr-5">
                            <p className="text-primary text-2xl font-bold">Highlights</p>
                            <div className="w-full flex justify-end">
                                <div
                                    onClick={() => setHighlithedVerses([])}
                                >
                                    <svg className="fill-primary w-8 h-10 hover:text-red-500" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path className="fill-current hover:text-red-500" fill="#000000" d="M352 192V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64H96a32 32 0 0 1 0-64h256zm64 0h192v-64H416v64zM192 960a32 32 0 0 1-32-32V256h704v672a32 32 0 0 1-32 32H192zm224-192a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32zm192 0a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32z" /></svg>
                                </div>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <ScrollArea className="h-[20vh] w-[90%] mx-auto">
                                <div className="flex flex-col justify-center">
                                    {
                                        reversedHighlights.map((currentVerse, index) => (
                                            <label
                                                key={index}
                                                onClick={() => {
                                                    changeVersion(currentVerse.version)
                                                    changeBook(currentVerse.book)
                                                    changeChapter(currentVerse.chapter)
                                                    changeVerse(currentVerse.verse)
                                                }}
                                                className="hover:text-primary cursor-pointer text-xl"
                                            >
                                                {currentVerse.book.name} {currentVerse.chapter}:{currentVerse.verse}  {currentVerse.version}

                                                <div className="hover:text-primary text-xl" dangerouslySetInnerHTML={{ __html: currentVerse.text }} ></div>

                                                {index !== reversedHighlights.length ? <div className="h-1 bg-primary my-2" /> : null}
                                            </label>
                                        ))
                                    }
                                </div>
                            </ScrollArea>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger className="font-medium flex gap-2 pr-5">
                            <p className="text-primary text-2xl font-bold">Theme</p>
                        </AccordionTrigger>
                        <AccordionContent>
                            <ScrollArea className="h-[25vh] w-[90%] mx-auto rounded-md">
                                {themes.map((currentTheme) => (
                                    <div
                                        key={currentTheme}
                                        onClick={() => {
                                            setThemeSended(currentTheme)
                                            if (currentTheme === "lofi") {
                                                setTheme('light')
                                            } else {
                                                setTheme('dark')
                                            }
                                        }}
                                        data-theme={currentTheme}
                                        className="flex justify-start items-center h-10"
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                theme === currentTheme ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        <div
                                        >
                                            {currentTheme}
                                        </div>
                                    </div>
                                ))}
                            </ScrollArea>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>



                {/* <div className="flex flex-col gap-2 p-5 rounded-md">
                <div tabIndex={0} className="collapse border bg-base-100 rounded-box border-primary">
                    <div className="collapse-title font-medium flex gap-2">
                        <svg className="fill-primary w-8 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29.73 29.73"><g><path d="M14.865,0C6.655,0,0,6.655,0,14.865c0,1.714,0.201,2.83,0.767,4.546c1.104,3.188,6.896-2.808,9.388,0.729 c2.492,3.535-5.62,6.64-0.18,8.764c2.475,0.601,3.175,0.826,4.89,0.826c8.21,0,14.865-6.654,14.865-14.864 C29.73,6.655,23.075,0,14.865,0z M22.077,4.955c1.694,0,3.069,1.17,3.069,2.614c0,1.442-1.375,2.613-3.069,2.613 c-1.695,0-3.07-1.171-3.07-2.613C19.007,6.125,20.381,4.955,22.077,4.955z M4.74,15.802c-1.695,0-3.069-1.171-3.069-2.614 s1.375-2.614,3.069-2.614c1.696,0,3.071,1.171,3.071,2.614S6.437,15.802,4.74,15.802z M8.335,9.784c-1.695,0-3.07-1.17-3.07-2.614 c0-1.444,1.375-2.614,3.07-2.614s3.07,1.17,3.07,2.614C11.405,8.614,10.03,9.784,8.335,9.784z M12.078,4.189 c0-1.443,1.374-2.615,3.07-2.615c1.694,0,3.068,1.172,3.068,2.615s-1.375,2.614-3.068,2.614 C13.452,6.803,12.078,5.632,12.078,4.189z M17.341,27.627c-1.696,0-3.069-1.17-3.069-2.613s1.375-2.613,3.069-2.613 c1.695,0,3.07,1.17,3.07,2.613S19.036,27.627,17.341,27.627z M23.48,23.155c-1.695,0-3.069-1.173-3.069-2.614 c0-1.443,1.374-2.614,3.069-2.614c1.694,0,3.069,1.171,3.069,2.614C26.55,21.982,25.176,23.155,23.48,23.155z M25.146,16.604 c-1.695,0-3.07-1.17-3.07-2.614s1.375-2.614,3.07-2.614s3.07,1.17,3.07,2.614S26.843,16.604,25.146,16.604z" /></g></svg>
                        <p className="text-primary text-2xl font-bold">Theme</p>
                    </div>
                    <div className="collapse-content">
                        <div className="flex flex-col justify-center">
                            {
                                themes.map((currentTheme) => (
                                    <div key={currentTheme} data-theme={currentTheme} className="form-control">
                                        <label className="label cursor-pointer">
                                            <span className="label-text">{currentTheme}</span>
                                            {theme === currentTheme ?
                                                <input type="radio" name="radio-10" className="radio checked:bg-primary" defaultChecked />
                                                :
                                                <input onClick={() => setTheme(currentTheme)} type="radio" name="radio-10" className="radio checked:bg-primary" />
                                            }
                                        </label>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div> */}
            </ScrollArea>
        </>
    )
}

export default ModalSettings