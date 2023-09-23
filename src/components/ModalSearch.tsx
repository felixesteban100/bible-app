
//https://bolls.life/search/YLT/?search=haggi&match_case=false&match_whole=true

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import versions_withBooks from './../data/translations_books.json'
import { ModalSearchProps, Verse, Versions } from "../types";

import { ScrollArea } from "@/components/ui/scroll-area"

import { Separator } from "@/components/ui/separator"

function ModalSearch({ versionSelected, changeBook, changeChapter, changeVerse }: ModalSearchProps) {
    const versions: Versions = { ...versions_withBooks };

    const [isModalSearchActive, setIsModalSearchActive] = useState<boolean>(false)
    const [wordForSearch, setWordForSearch] = useState<string | undefined>(undefined)

    // const [matchCase, setMatchCase] = useState(false)
    // const [matchWhole, setMatchWhole] = useState(false)

    const { /* isLoading, */ error, data: searchResult, refetch: refetchSearch, isFetching } = useQuery<Verse[]>({
        enabled: isModalSearchActive,
        queryKey: ['Search'],
        queryFn: () => {
            if (wordForSearch !== undefined) {
                return axios
                    .get(`https://bolls.life/search/${versionSelected}/?search=${wordForSearch}&match_case=${false}&match_whole=${false}`)
                    .then((response) => response.data)
            }
            return []
        }
    })

    function changeWordForSearch(event: React.ChangeEvent<HTMLInputElement>) {
        setWordForSearch(event.target.value)
        // const regexMatches = event.target.value.toLowerCase().match(/\w+/g);
        // const booksMatched = versions[versionSelected].filter(current =>
        //     current.name.toLowerCase().includes(regexMatches?.[0] ?? '')
        // );

        // setMatchBooksAndChapters({
        //     books: booksMatched,
        //     chapter: parseInt(event.target.value.match(/ \d+/g)?.[0] || "1")
        // })
        // console.log(versions[versionSelected].filter((current, index) => index + 1 === 1))
    }

    function searchWord() {
        setIsModalSearchActive(true)
        refetchSearch()
        setIsModalSearchActive(false)
    }

    return (
        <div>
            <div className="form-control mt-8">
                <div className="collapse-title text-xl font-medium p-0 ">
                    <div className="input-group ">
                        <input
                            onChange={(event) => changeWordForSearch(event)}
                            type="text"
                            placeholder={`Search in bible, ${versionSelected}`}
                            className="input input-bordered w-full"
                        />
                        <button onClick={() => searchWord()} className="btn btn-square">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>
                    </div>
                </div>
            </div>

            {
                (isFetching /* || isLoading */) ?
                    <div>
                        {/* <span className="loading loading-spinner loading-lg"></span> */}
                        <div className="rounded-md p-4 w-full h-auto mx-auto">
                            <div className="animate-pulse flex space-x-4">
                                <div className="flex-1 space-y-6 py-1">
                                    <div className="space-y-3">
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="h-2 bg-current rounded col-span-2"></div>
                                            <div className="h-2 bg-current rounded col-span-1"></div>
                                        </div>
                                        <div className="h-2 bg-current rounded"></div>
                                    </div>
                                    <div className="h-2 bg-current rounded"></div>
                                    <div className="h-2 bg-current rounded"></div>
                                </div>
                            </div>
                            <div className="animate-pulse flex space-x-4">
                                <div className="flex-1 space-y-6 py-1">
                                    <div className="space-y-3">
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="h-2 bg-current rounded col-span-2"></div>
                                            <div className="h-2 bg-current rounded col-span-1"></div>
                                        </div>
                                        <div className="h-2 bg-current rounded"></div>
                                    </div>
                                    <div className="h-2 bg-current rounded"></div>
                                    <div className="h-2 bg-current rounded"></div>
                                </div>
                            </div>
                            <div className="animate-pulse flex space-x-4">
                                <div className="flex-1 space-y-6 py-1">
                                    <div className="space-y-3">
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="h-2 bg-current rounded col-span-2"></div>
                                            <div className="h-2 bg-current rounded col-span-1"></div>
                                        </div>
                                        <div className="h-2 bg-current rounded"></div>
                                    </div>
                                    <div className="h-2 bg-current rounded"></div>
                                    <div className="h-2 bg-current rounded"></div>
                                </div>
                            </div>
                            <div className="animate-pulse flex space-x-4">
                                <div className="flex-1 space-y-6 py-1">
                                    <div className="space-y-3">
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="h-2 bg-current rounded col-span-2"></div>
                                            <div className="h-2 bg-current rounded col-span-1"></div>
                                        </div>
                                        <div className="h-2 bg-current rounded"></div>
                                    </div>
                                    <div className="h-2 bg-current rounded"></div>
                                    <div className="h-2 bg-current rounded"></div>
                                </div>
                            </div>
                            <div className="animate-pulse flex space-x-4">
                                <div className="flex-1 space-y-6 py-1">
                                    <div className="space-y-3">
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="h-2 bg-current rounded col-span-2"></div>
                                            <div className="h-2 bg-current rounded col-span-1"></div>
                                        </div>
                                        <div className="h-2 bg-current rounded"></div>
                                    </div>
                                    <div className="h-2 bg-current rounded"></div>
                                    <div className="h-2 bg-current rounded"></div>
                                </div>
                            </div>
                            <div className="animate-pulse flex space-x-4">
                                <div className="flex-1 space-y-6 py-1">
                                    <div className="space-y-3">
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="h-2 bg-current rounded col-span-2"></div>
                                            <div className="h-2 bg-current rounded col-span-1"></div>
                                        </div>
                                        <div className="h-2 bg-current rounded"></div>
                                    </div>
                                    <div className="h-2 bg-current rounded"></div>
                                    <div className="h-2 bg-current rounded"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    : error ?
                        <div>
                            <input type="checkbox" id="my-modal-search" className="modal-toggle" />

                            <label htmlFor="my-modal-search" className="modal cursor-pointer">
                                <label className="modal-box relative" htmlFor="">
                                    <label htmlFor="my-modal-search" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                                    {`Error: ${error}`}
                                </label>
                            </label>
                        </div>
                        : searchResult !== undefined ?
                            <>
                                <p>Results: {searchResult.length}</p>
                                <ScrollArea className="h-[70vh] w-[100%] p-5">
                                    <div className="overflow-x-auto pt-5 flex flex-col gap-5">
                                        {searchResult.map((verse: Verse) => {
                                            return (
                                                <div key={verse.text} className="text-xl font-medium">
                                                    <label
                                                        key={`${verse}`}
                                                        htmlFor="my-modal-search"
                                                        className='cursor-pointer'
                                                        onClick={() => {
                                                            changeBook(versions[versionSelected].filter((_, index) => index + 1 === verse.book)[0])
                                                            changeChapter(verse.chapter)
                                                            changeVerse(verse.verse)
                                                        }}
                                                    >
                                                        <div className="hover:text-primary" dangerouslySetInnerHTML={{ __html: verse.text }} ></div>
                                                    </label>
                                                    {
                                                        versions[versionSelected].filter((_, index) => index + 1 === verse.book)[0] &&
                                                        <p

                                                        >
                                                            {`${versions[versionSelected].filter((_, index) => index + 1 === verse.book)[0].name}`} {verse.chapter}:{verse.verse}
                                                        </p>
                                                    }
                                                    <Separator className="h-1 bg-base-content mt-5" />
                                                </div>
                                            )
                                        })}
                                    </div>
                                </ScrollArea>

                            </>


                            :
                            null
            }
        </div>
    )

}

export default ModalSearch