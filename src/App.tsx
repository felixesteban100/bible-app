import Header from "./components/Header";
import ReadPage from "./components/ReadPage"
import useLocalStorage from "./hooks/useLocalStorage";
import ModalSettings from "./components/ModalSettings";
import ModalVersions from "./components/ModalVersions";
import ModalSearch from "./components/ModalSearch";
import versions_withBooks from './data/translations_books.json'
import { Book, Chapter, ChapterContent, HighlightedVerse, Versions } from "./types";

import { useEffect } from 'react'
import { useQuery } from "@tanstack/react-query"
import axios from "axios";
import BooksChaptersVerse from "./components/BooksChaptersVerse";
import { moveChapter } from "./functions";
import BottomNavigation from "./components/BottomNavigation";
import { ThemeProvider } from "@/components/theme-provider"

// MAYBE I SHOULD USE REACT ROUTER

//to compare with 
// https://bolls.life/NASB/30/7/-1

// if you want the API to work you should turn off the adblock extention on the site

function App() {
  const versions: Versions = { ...versions_withBooks };

  const [verse, setVerse] = useLocalStorage("BIBLEAPP_VERSE", 1)
  const [chapter, setChapter] = useLocalStorage("BIBLEAPP_CHAPTER", 1)
  const [book, setBook] = useLocalStorage("BIBLEAPP_BOOK", { bookid: 1, chronorder: 1, name: "Genesis", chapters: 50 })
  const [version, setVersion] = useLocalStorage("BIBLEAPP_VERSION", 'NASB')

  const { isLoading, error, data: chapterContent, refetch, isFetching } = useQuery<ChapterContent>({
    refetchOnMount: false,      // Disable refetch on component mount
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    queryKey: ['ChapterContent'],
    networkMode: 'offlineFirst',
    queryFn: async () => {
      return axios.get<ChapterContent>(`https://bolls.life/get-chapter/${version}/${book.bookid}/${chapter}/`).then((response) => response.data)
    },
  })

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    refetch()
  }, [book, chapter, version]);

  const [textSize, setTextSize] = useLocalStorage("BIBLEAPP_TEXTSIZE", 4)
  const [fontFamily, setFontFamily] = useLocalStorage("BIBLEAPP_FONTFAMILY", "font-sans")
  const [history, setHistory] = useLocalStorage<Chapter[] | []>("BIBLEAPP_HISTORY", [])
  const [theme, setTheme] = useLocalStorage("BIBLEAPP_THEME", "light")
  const [highlithedVerses, setHighlithedVerses] = useLocalStorage<HighlightedVerse[]>("BIBLEAPP_HIGHLIGHTEDVERSES", [])


  function changeVersion(version_short_name: string) {
    setVersion(version_short_name)
    const translatedBook = versions[version_short_name].filter((currentBook) => currentBook.bookid === book.bookid && currentBook.chapters === book.chapters)[0]
    if (translatedBook) {
      setBook(translatedBook)
    }
  }

  function moveChapterShortCut(moveTo: string/* , bookIdSelected: number */) {
    moveChapter(moveTo, setChapter, chapter, setBook, book, setVerse, setHistory, versions, version)
  }

  function changeBook(bookInfo: Book) {
    setBook(bookInfo)
    setChapter(1)
    setVerse(0)
  }

  function changeChapter(chapterSelected: number) {
    setChapter(chapterSelected)
    setHistory(chapterArr => {
      const chapterNew = { book: book, chapter: chapterSelected, version: version }
      const index = chapterArr.findIndex(c => c.book === chapterNew.book && c.chapter === chapterNew.chapter && c.version === chapterNew.version);
      if (index !== -1) chapterArr.splice(index, 1);
      return [...chapterArr, chapterNew]
    })
  }

  function changeVerse(verse: number) {
    setVerse(verse)
  }

  function changeTextSize(textSize: number) {
    setTextSize(textSize)
  }

  function changeFontFamily(fontFamily: string) {
    setFontFamily(fontFamily)
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div
        data-theme={theme}
        // className={`min-h-screen ${fontFamily} theme-controller`}
        className={`min-h-screen ${fontFamily}`}
      >
        <Header
          theme={theme}
          version={version}
          chapter={chapter}
          book={book}
          moveChapter={moveChapterShortCut}
          setTheme={setTheme}
        >
          <BooksChaptersVerse
            currentVersion={version}
            changeBook={changeBook}
            changeChapter={changeChapter}
            chapterSelected={chapter}
            bookSelected={book}
            chapterContent={chapterContent}
            changeVerse={changeVerse}
            verseSelected={verse}
            theme={theme}
          />
          <ModalVersions
            changeVersion={changeVersion}
            versionSelected={version}
          />
          <ModalSearch
            versionSelected={version}
            changeBook={changeBook}
            changeChapter={changeChapter}
            changeVerse={changeVerse}
          />
          <ModalSettings
            textSize={textSize}
            changeTextSize={changeTextSize}
            fontFamily={fontFamily}
            changeFontFamily={changeFontFamily}
            history={history}
            changeBook={changeBook}
            changeChapter={changeChapter}
            changeVersion={changeVersion}
            changeVerse={changeVerse}
            theme={theme}
            setTheme={setTheme}
            setHistory={setHistory}

            highlithedVerses={highlithedVerses}
            setHighlithedVerses={setHighlithedVerses}
          />
        </Header>

        <ReadPage
          bookSelected={book}
          chapterSelected={chapter}
          versionSelected={version}
          // moveChapter={moveChapterShortCut}
          textSize={textSize}
          chapterContent={chapterContent}
          error={error}
          isLoading={isLoading}
          isFetching={isFetching}
          verseSelected={verse}
          highlithedVerses={highlithedVerses}
          setHighlithedVerses={setHighlithedVerses}
        />


        <BottomNavigation
          verse={verse}
          // version={version}
          book={book}
          chapter={chapter}
          theme={theme}
          moveChapter={moveChapterShortCut}
        >
          <BooksChaptersVerse
            currentVersion={version}
            changeBook={changeBook}
            changeChapter={changeChapter}
            chapterSelected={chapter}
            bookSelected={book}
            chapterContent={chapterContent}
            changeVerse={changeVerse}
            verseSelected={verse}
            theme={theme}
          />
        </BottomNavigation>

      </div>
    </ThemeProvider>
  )
}

export default App


/* async function downloadVersion(versionSelected: Version) {

    setVersionDownloading({
      processRunning: true,
      versionFullName: versionSelected.full_name
    })

    const booksInTheVersionSelectedPromise: Promise<{ book: Book; chaptersContent: chaptersContent[]; }>[] =
      versions[versionSelected.short_name].map((async (currentBook) => {
        
        // console.log("------------ it has begun ------------")
        
        // i will make an api with all the versions instead of making and download one by one i should organize them in a db and in case someone wants to download one it just gonna be one big object 
        // then instead of searchin this for alot just make one useQuery TO THE MONGODB
        // const chaptersContent: chaptersContent[] = [];
        // for (let chapterIndex = 1; chapterIndex <= currentBook.chapters; chapterIndex++) {
        //   const currentChapterContent = await axios
        //     .get(`https://bolls.life/get-chapter/${versionSelected.short_name}/${currentBook.bookid}/${chapterIndex}/`)
        //     .then((response) => response.data);

        //   // console.log(`chapter:${chapterIndex}`)
        //   // console.log(currentChapterContent)

        //   chaptersContent.push({
        //     chapterNumber: chapterIndex,
        //     verses: currentChapterContent
        //   });
        // }

        // const chapterPromises = Array.from({ length: currentBook.chapters }, (_, index) =>
        //   axios.get(`https://bolls.life/get-chapter/${versionSelected.short_name}/${currentBook.bookid}/${index + 1}`)
        //     .then((response) => ({
        //       chapterNumber: index + 1,
        //       verses: response.data
        //     }))
        // );
        // const chaptersContent: chaptersContent[] = await Promise.all(chapterPromises);

        // console.log(chaptersContent);


        
        const chaptersContent: chaptersContent[] = await axios
        .get(`https://bible-versions.onrender.com/${versionSelected.short_name}`)
        .then((response) => response.data);

        return {
          book: currentBook,
          chaptersContent: chaptersContent
        }
      }))


    const booksInTheVersionSelectedresolvedPromises = await Promise.all(booksInTheVersionSelectedPromise);

    const versiontoDownload: VersionsDownloaded = {
      versionFullName: versionSelected.full_name,
      versionShortName: versionSelected.short_name,
      booksInTheVersion: booksInTheVersionSelectedresolvedPromises
    }

    // try with Elzevir Textus Receptus (1624) greek

    // await dbForVersionsDownloaded.add('versionsDownloaded', versiontoDownload);

    // const transactionVersions = dbForVersionsDownloaded.transaction('versionsDownloaded', 'readwrite');
    // const objectStoreVersions = transactionVersions.objectStore('versionsDownloaded');
    // await objectStoreVersions.add(versiontoDownload)
    // const allVersionsDownloadedDB = await objectStoreVersions.getAll()

    // await dbForVersionsDownloaded.put('booksStore', versiontoDownload); // Store the book data in IndexedDB


    // saveDataAsJSON(versiontoDownload, versionSelected.short_name);


    // setVersionsDownloaded(prev => [...prev, versiontoDownload])
    setVersionDownloading({
      processRunning: false,
      versionFullName: "None"
    })


    // Get all the versions:
    // console.log(await dbForVersionsDownloaded.getAll('versionsDownloaded'))
  } */