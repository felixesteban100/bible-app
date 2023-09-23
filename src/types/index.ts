import { RefObject } from "react";

export type Chapter = {
    book: Book;
    chapter: number;
    version: string;
}

export type ModalSearchProps = {
    versionSelected: string;
    changeBook: (bookInfo: Book) => void
    changeChapter: (chapterSelected: number) => void
    changeVerse: (verse: number) => void
}

export type Verse = {
    pk: number;
    translation?: string;
    book?: number;
    chapter: number;
    verse: number;
    text: string;
}

export type Version = {
    short_name: string;
    full_name: string;
    info?: string | undefined;
    updated: number;
} /* | {
    short_name: string;
    full_name: string;
    updated: number;
    info?: undefined;
} */

export type Versions = {
    [key: string]: Book[];
};

export type Book = {
    bookid: number;
    name: string;
    chronorder: number;
    chapters: number;
}



export type HeaderProps = {
    // toggleDarkMode: MouseEventHandler<HTMLInputElement>;
}

export type ModalBooksChaptersVerseProps = {
    currentVersion: string;
    changeBook: (bookInfo: Book) => void
    changeChapter: (chapterSelected: number) => void
    bookSelected: Book
    chapterSelected: number
    chapterContent: ChapterContent | undefined;
    changeVerse: (verse: number) => void;
    verseSelected: number;
    theme: string
}

export type ButtonProps = {
    icon: JSX.Element;
    moveChapter: (moveTo: string, bookIdSelected: number) => void;
    move: string;
    bookIdSelected: number;
    hideInSmallScreen: boolean;
    // changeFontSize?: boolean;
    classMore?: string
}

export type ModalVersionsProps = {
    changeVersion: (versionABR: string) => void
    // downloadVersion: (version: Version) => void
    // versionDownloading: VersionDownloading
    versionSelected: string;
}

export type HighlightedVerse = {
    chapter: number;
    version: string;
    book: Book;
    pk: number;
    verse: number;
    text: string;
}

export type ModalSettingsProps = {
    textSize: number;
    // textSize: string;
    changeTextSize: (textSize: number) => void
    fontFamily: string;
    changeFontFamily: (fontFamily: string) => void
    history: Chapter[];
    changeBook: (bookInfo: Book) => void
    changeChapter: (chapterSelected: number) => void
    changeVerse: (verse: number) => void
    changeVersion: (version_short_name: string) => void
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
    setHistory: React.Dispatch<React.SetStateAction<[] | Chapter[]>>;

    highlithedVerses: HighlightedVerse[]
    setHighlithedVerses: React.Dispatch<React.SetStateAction<HighlightedVerse[]>>

}

export type ChapterContent = {
    pk: number;
    verse: number;
    text: string;
}[]

export type ReadPageProps = {
    verseSelected: number;
    // refVerse: RefObject<HTMLElement>

    bookSelected: Book
    chapterSelected: number;
    versionSelected: string;
    moveChapter: (moveTo: string) => void;
    textSize: number;
    // textSize: string;
    highlithedVerses: HighlightedVerse[]
    setHighlithedVerses: React.Dispatch<React.SetStateAction<HighlightedVerse[]>>


    chapterContent: ChapterContent | undefined;
    error: unknown;
    isLoading: boolean;
    // refetch: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<TQueryFnData, unknown>>;
    isFetching: boolean;

}

export type VersionsDownloaded = {
    versionFullName: string;
    versionShortName: string;
    booksInTheVersion: BookInVersion[];
}

export type BookInVersion = {
    book: Book;
    chaptersContent: chaptersContent[];
}

export type chaptersContent = {
    chapterNumber: number,
    verses: {
        pk: number,
        verse: number,
        text: string,
    }[]
}

export type VersionDownloading = {
    processRunning: boolean,
    versionFullName: string
}

/* type handlerUseQuery = { 
    isLoading: boolean, 
    error: AxiosError<Error | undefined>, 
    data: Chapter | undefined, 
    refetch: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<Chapter, unknown>>, 
    isFetching: boolean 
} */