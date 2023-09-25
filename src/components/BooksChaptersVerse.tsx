import { ModalBooksChaptersVerseProps, Versions } from '../types';
import versions_withBooks from '../data/translations_books.json'

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

import { ScrollArea } from "@/components/ui/scroll-area"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { DialogTrigger } from '@radix-ui/react-dialog';

function BooksChaptersVerse({ chapterContent, currentVersion, changeBook, changeChapter, bookSelected, chapterSelected, changeVerse, verseSelected, theme }: ModalBooksChaptersVerseProps) {
    const versions: Versions = {
        ...versions_withBooks
    };
    //https://bolls.life/static/translations/YLT.json

    return (
        <Tabs data-theme={theme} defaultValue="book" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-base-300">
                <TabsTrigger className='text-base-content' value="book">Book</TabsTrigger>
                <TabsTrigger className='text-base-content' value="chapter">Chapter</TabsTrigger>
                <TabsTrigger className='text-base-content' value="verse">Verse</TabsTrigger>
            </TabsList>
            <TabsContent value="book">
                <Card className='min-h-[60vh] border-none '>
                    <CardHeader>
                        <CardTitle>Book</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 h-[60vh] ">
                        <Command className="rounded-lg border shadow-md h-full border-none">
                            <CommandInput placeholder="Type a book name..." />
                            <CommandList className='max-h-[52.5vh]'>
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandGroup>
                                    {versions[currentVersion].map((book) => (
                                        <CommandItem
                                            // className={`${book.name === bookSelected.name ? "bg-primary text-primary-content" : "hover:bg-primary"}`}
                                            // className={`${book.name === bookSelected.name ? "bg-primary text-primary-content" : "hover:bg-primary"}`}
                                        >
                                            <div
                                                onClick={() => {
                                                    changeBook(book)
                                                }}
                                                key={book.name}
                                                // className={`btn ${book.name === bookSelected.name ? "btn-primary text-primary-content" : ""} text-2xl hover:btn-primary hover:text-primary-content`}
                                                className={`w-full h-fit normal-case btn ${book.name === bookSelected.name ? "btn-primary" : ""} text-2xl hover:btn-primary`}
                                            >
                                                {book.name}
                                            </div>
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="chapter">
                <Card className='border-none'>
                    <CardHeader>
                        <CardTitle>Chapter</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 h-[60vh]">
                        <ScrollArea className="h-[57vh] ">
                            <div className='grid grid-cols-4 gap-1'>
                                {Array.from({ length: bookSelected.chapters }, (_, index) => index + 1).map((number: number, indexChapter: number) => {
                                    return (
                                        <label
                                            key={indexChapter}
                                            onClick={() => {
                                                changeChapter(indexChapter + 1)
                                            }}
                                            className={`btn ${(bookSelected.name === bookSelected.name && chapterSelected === indexChapter + 1) ? "btn-primary" : ""}`}
                                        >
                                            {indexChapter + 1}
                                        </label>
                                    )
                                })}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="verse">
                <Card className='border-none'>
                    <CardHeader>
                        <CardTitle>Verse</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 h-[60vh]">
                        <ScrollArea className="h-[57vh]">
                            <div className="grid grid-cols-4 gap-1">
                                {
                                    chapterContent !== undefined &&
                                    chapterContent.map((_, indexVerse) => {
                                        return (
                                            <DialogTrigger
                                                key={indexVerse}
                                                className={`btn ${verseSelected === indexVerse + 1 ? "btn-primary" : ""}`}
                                                onClick={() => {
                                                    changeVerse(indexVerse + 1)
                                                }}
                                                asChild
                                            >
                                                <button>{indexVerse + 1}</button>
                                            </DialogTrigger>
                                        )
                                    })
                                }
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    )
}

export default BooksChaptersVerse
