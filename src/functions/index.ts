import { Book, Chapter, Versions } from "@/types"


export function moveChapter(
    moveTo: string,
    setChapter: React.Dispatch<React.SetStateAction<number>>,
    chapter: number,
    setBook: React.Dispatch<React.SetStateAction<Book>>,
    book: Book,
    setVerse: React.Dispatch<React.SetStateAction<number>>,
    setHistory: React.Dispatch<React.SetStateAction<[] | Chapter[]>>,
    versions: Versions,
    version: string
): void {
    let currentChapterSelected: number
    
    switch (moveTo) {
        case "previous":
            setChapter(prev => {
                if (prev === 1) return prev
                currentChapterSelected = prev - 1
                return prev - 1
            })
            if (chapter === 1 && book.bookid > 1) {
                const previousBook = versions[version].filter((currentBook: Book) => {
                    if (currentBook.bookid === book.bookid - 1) {
                        return {
                            bookid: currentBook.bookid,
                            chronorder: currentBook.chronorder,
                            name: currentBook.name,
                            chapters: currentBook.chapters
                        };
                    }
                })
                if(previousBook[0] !== undefined) setBook(previousBook[0])
                // console.log(versions[version][versions[version].length - 1])
                // if(previousBook[0] === undefined) setBook(versions[version][versions[version].length - 1])
                setChapter(previousBook[0].chapters)
                currentChapterSelected = previousBook[0].chapters
            }

            if (chapter === 1 && book.bookid === 1) {
                const lastBook = versions[version].filter((currentBook: Book) => {
                    if (currentBook.bookid === versions[version].length) {
                        return {
                            bookid: currentBook.bookid,
                            chronorder: currentBook.chronorder,
                            name: currentBook.name,
                            chapters: currentBook.chapters
                        };
                    }
                })
                setBook(lastBook[0])
                setChapter(lastBook[0].chapters)
                currentChapterSelected = lastBook[0].chapters
            }
            break;

        case "next":
            setChapter(prev => {
                if (prev === book.chapters) return prev
                currentChapterSelected = prev + 1
                return prev + 1
            })

            if (chapter === book.chapters && book.bookid < versions[version].length) {
                const nextBook = versions[version].filter((currentBook: Book) => {
                    if (currentBook.bookid === book.bookid + 1) {
                        return {
                            bookid: currentBook.bookid,
                            chronorder: currentBook.chronorder,
                            name: currentBook.name,
                            chapters: currentBook.chapters
                        };
                    }
                })
                setBook(nextBook[0])
                setChapter(1)
                currentChapterSelected = 1
            }

            if (chapter === book.chapters && book.bookid === versions[version].length) {
                setBook(versions[version].filter((currentBook: Book, index) => index === 0)[0])
                setChapter(1)
                currentChapterSelected = 1
            }
            break;

        default:
            console.log("None")
            break;
    }

    setVerse(0)

    setHistory(chapterArr => {
        const chapterNew = {
            book: book,
            chapter: currentChapterSelected,
            version: version,
        }
        const index = chapterArr.findIndex(c => c.book === chapterNew.book && c.chapter === chapterNew.chapter && c.version === chapterNew.version);
        if (index !== -1) {
            chapterArr.splice(index, 1);
        }
        chapterArr = [...chapterArr, chapterNew];

        return chapterArr
    })
}


export function isEqual(obj1: any, obj2: any): boolean {
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