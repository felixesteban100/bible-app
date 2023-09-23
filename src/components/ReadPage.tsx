
import Button from "../reusableComponents/Button";
import { useEffect, useState } from "react";
import Loading from "../reusableComponents/Loading";
import { HighlightedVerse, ReadPageProps } from "../types";
import { ERROR_AXIOS_TEMPLATE } from "../constants/ErrorAxios";


function ReadPage({
    bookSelected: {
        bookid: book_idSelected,
        name: book_nameSelected
    },
    bookSelected,
    chapterSelected,
    versionSelected,
    moveChapter,
    textSize,

    verseSelected,
    /* refVerse, */

    chapterContent,
    error,
    isLoading,
    // refetch,
    isFetching,

    highlithedVerses,
    setHighlithedVerses,

}: ReadPageProps) {
    const [underlineVerse, setUnderlineVerse] = useState(false)

    useEffect(() => {
        if (verseSelected !== 0) {
            setUnderlineVerse(true)
            setTimeout(() => {
                setUnderlineVerse(false)
            }, 7000)
        }
    }, [verseSelected])

    // const windowScrollY = useWindowScrollY();

    // const windowWidth = useWindowWidth()

    // const scrollDirection = useScrollDirection();

    function getTextSize(textSize: number) {
        switch (textSize) {
            case 1: return 'text-[1rem]'

            case 2: return 'text-[1.5rem]'

            case 3: return 'text-[2rem]'

            case 4: return 'text-[2.5rem]'

            case 5: return 'text-[3rem]'

            case 6: return 'text-[4rem]'

            default: return 'text-[2rem]'
        }
    }

    function hightlightSelected(currentVerse: { pk: number; verse: number; text: string; }) {
        const sendedVerse: HighlightedVerse = {
            chapter: chapterSelected,
            version: versionSelected,
            book: bookSelected,
            pk: currentVerse.pk,
            verse: currentVerse.verse,
            text: currentVerse.text,
        }

        // console.log(highlithedVerses.some((verse) => isEqual(verse, sendedVerse)))

        if (highlithedVerses.some((verse) => isEqual(verse, sendedVerse))) {
            setHighlithedVerses((prev) => prev.filter((current) => !isEqual(current, sendedVerse)));
        } else {
            setHighlithedVerses(prev => [...prev, sendedVerse])
        }
    }

    function isEqual(obj1: any, obj2: any): boolean {
        if (obj1 === obj2) {
            return true;
        }

        if (obj1 == null || obj2 == null) {
            return false;
        }

        if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
            return false;
        }

        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);
        if (keys1.length !== keys2.length) {
            return false;
        }

        for (const key of keys1) {
            if (!isEqual(obj1[key], obj2[key])) {
                return false;
            }
        }

        return true;
    }

    if ((isLoading || isFetching)) return (
        <Loading />
    )

    if (error) return (
        <div className="min-h-screen">
            <div
                className="flex justify-center gap-5 w-full h-full mx-auto my-10 p-20 rounded-lg flex-wrap"
            >

                <p className="text-sm sm:text-md md:text-xl lg:text-2xl mockup-code overflow-x-scroll w-[70%]">
                    <p className="ml-5">{"{"}</p>
                    {Object.entries(ERROR_AXIOS_TEMPLATE).map(([key, value]) => {
                        return (
                            <div key={key} className="ml-12 mb-1">
                                <p>
                                    <span className="text-primary">{key}</span>
                                    {": "}
                                    {typeof value === 'string' ? value : typeof value === 'object' ? JSON.stringify(value) : null},
                                </p>
                            </div>
                        )
                    })}
                    <p className="ml-5">{"}"}</p>
                </p>
            </div>
        </div>
    )


    return (
        <div className="max-w-[80rem] mx-auto flex flex-col px-10 pb-[7rem]">
            
            <div className="flex rounded-md items-center justify-center">
                <label
                    className={`rounded-md px-8 py-2 text-primary/50 text-3xl font-bold pt-5 flex flex-col justify-center items-center`}
                >
                    {book_nameSelected}
                    <span className="text-8xl text-primary">{chapterSelected}</span>
                </label>
            </div>
            <div
                className={`${getTextSize(textSize)} transform transition-all ease-out`}
            >
                {chapterContent!.map((currentVerse) => {
                    const verseCurrent = {
                        chapter: chapterSelected,
                        version: versionSelected,
                        book: bookSelected,
                        pk: currentVerse.pk,
                        verse: currentVerse.verse,
                        text: currentVerse.text,
                    }

                    const IsItHighlighted = highlithedVerses.some((verse) => isEqual(verse, verseCurrent))

                    return (
                        <section
                            id={`verse-${currentVerse.verse}`}
                            onClick={() => hightlightSelected(currentVerse)}
                            className={`${IsItHighlighted ? "text-base-100  w-fit" : ""} group `} key={currentVerse.verse}
                        >
                            <span
                                className={
                                    `text-primary
                                     decoration-dotted mr-1
                                    `
                                }
                            >
                                {currentVerse.verse}
                            </span>
                            <span
                                className={
                                    `
                                    ${(underlineVerse && currentVerse.verse !== verseSelected) ? "opacity-40" : ""} 
                                    group-hover:underline decoration-dotted
                                    ${IsItHighlighted ? "bg-primary text-base-100 rounded-md" : ""}`
                                }
                                dangerouslySetInnerHTML={{ __html: currentVerse.text }}
                            >
                            </span>
                        </section>
                    )
                })}
            </div>
            <br />
        </div>
    )
}

export default ReadPage