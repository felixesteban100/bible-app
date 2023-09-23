import { ModalBooksChaptersVerseProps, Versions } from '../types';
import versions_withBooks from '../data/translations_books.json'
import { useEffect, useState } from 'react'

function ModalBooksChaptersVerse({ chapterContent, currentVersion, changeBook, changeChapter, bookSelected, chapterSelected, changeVerse, verseSelected }: ModalBooksChaptersVerseProps) {
    const versions: Versions = {
        ...versions_withBooks
    };
    //https://bolls.life/static/translations/YLT.json

    const [selectorSelected, setSelectorSelected] = useState('book')
    const [changedBook, setChangedBook] = useState(false)
    const [changedChapter, setChangedChapter] = useState(false)

    useEffect(() => {
        if (changedBook) {
            setSelectorSelected('chapter')
            setChangedBook(false)
        }
    }, [changedBook])

    useEffect(() => {
        if (changedChapter) {
            setSelectorSelected('verse')
            setChangedChapter(false)
        }
    }, [changedChapter])


    return (
        <div>
            <input type="checkbox" id="my-modal-books-chapters" className="modal-toggle" />

            <label htmlFor="my-modal-books-chapters" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                    <div
                        // className='w-full sticky top-0 z-10 bg-base-200 flex justify-center  rounded-md mb-2'
                        className='w-full bg-base-200 flex justify-center rounded-md mb-2'
                    >
                        <div className="w-full tabs grid grid-cols-3">
                            <a className={`transition-all duration-700 tab tab-lifted ${selectorSelected === "book" ? "tab-active" : ""}`} onClick={() => setSelectorSelected('book')} >
                                book
                            </a>
                            <a className={`transition-all duration-700 tab tab-lifted ${selectorSelected === "chapter" ? "tab-active" : ""}`} onClick={() => setSelectorSelected('chapter')}>
                                chapter
                            </a>
                            <a className={`transition-all duration-700 tab tab-lifted ${selectorSelected === "verse" ? "tab-active" : ""}`} onClick={() => setSelectorSelected('verse')}>
                                verse
                            </a>
                        </div>
                    </div>
                    <div className="h-[40rem] overflow-x-auto">
                        {
                            selectorSelected === "book" ?
                                <div className='flex flex-col justify-center gap-2'>
                                    {versions[currentVersion].map((book) => (
                                        <label
                                            onClick={() => {
                                                changeBook(book)
                                                setChangedBook(true)
                                            }}
                                            key={book.name}
                                            className={`${book.name === bookSelected.name ? "btn btn-primary" : "btn"}`}
                                        >
                                            {book.name}
                                        </label>
                                    ))}
                                </div>
                                : selectorSelected === "chapter" ?
                                    <div className='grid grid-cols-4 gap-1'>
                                        {Array.from({ length: bookSelected.chapters }, (_, index) => index + 1).map((number: number, indexChapter: number) => {
                                            return (
                                                <label
                                                    key={indexChapter}
                                                    onClick={() => {
                                                        changeChapter(indexChapter + 1)
                                                        setChangedChapter(true)
                                                    }}
                                                    className={`btn ${(bookSelected.name === bookSelected.name && chapterSelected === indexChapter + 1) ? "btn-primary" : ""}`}
                                                >
                                                    {indexChapter + 1}
                                                </label>
                                            )
                                        })}
                                    </div>
                                    : selectorSelected === "verse" ?
                                        <div className="grid grid-cols-4 gap-1">
                                            {
                                                chapterContent !== undefined &&
                                                chapterContent.map((_, indexVerse) => {
                                                    return (
                                                        <label
                                                            key={indexVerse}
                                                            className={`btn ${verseSelected === indexVerse + 1 ? "btn-primary" : ""}`}
                                                            htmlFor="my-modal-books-chapters"
                                                            onClick={() => {
                                                                changeVerse(indexVerse + 1)
                                                                setSelectorSelected('book')
                                                            }}
                                                        >
                                                            {indexVerse + 1}
                                                        </label>
                                                    )
                                                })
                                            }
                                        </div>
                                        : null
                        }
                    </div>

                </label>
            </label>
        </div>
    )
}

export default ModalBooksChaptersVerse
