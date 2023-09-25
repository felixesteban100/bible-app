import { BiSolidBible } from 'react-icons/bi'
// import { BsBook } from 'react-icons/bs'
// import { AiOutlineSearch } from 'react-icons/ai'
// import { FiSettings } from 'react-icons/fi'
import useWindowWidth from '../hooks/useWindowWidth'
import { Book } from '../types'

import {
    Dialog,
    DialogContent,
    DialogTrigger
} from "@/components/ui/dialog"

import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import Button from '@/reusableComponents/Button'


type BottomNavigationProps = {
    children: JSX.Element
    // version: string
    book: Book
    verse: number
    chapter: number
    theme: string
    moveChapter: (moveTo: string/* , bookIdSelected: number */) => void
}

function BottomNavigation({
    // version,
    book,
    // verse,
    chapter,
    theme,
    children,
    moveChapter
}: BottomNavigationProps) {
    const windowWidth = useWindowWidth()

    return (
        <div className={`btm-nav ${windowWidth > 700 ? "hidden" : ""} w-full`}>
            <div className="flex justify-center items-center">
                <div className="w-[90%] grid grid-cols-7">
                    <Dialog data-theme={theme}>
                        <Button
                            icon={<AiOutlineArrowLeft className="text-base-content" />}
                            moveChapter={moveChapter}
                            move={"previous"}
                            // bookIdSelected={book.bookid - 1}
                            hideInSmallScreen={false}
                            classMore="col-span-1"
                        />
                        <DialogTrigger
                            key="dialog-references"
                            className='col-span-5'
                        >
                            <div className='btn rounded-none bg-base-300 border-none flex flex-row justify-center'>
                                <BiSolidBible className='text-xl text-primary' />
                                {windowWidth < 700 && book.name.length > 26 ? `${book.name.slice(0, 26)}...` : book.name} {chapter}
                            </div>
                        </DialogTrigger>
                        <Button
                            icon={<AiOutlineArrowRight className="text-base-content" />}
                            moveChapter={moveChapter}
                            move={"next"}
                            // bookIdSelected={book.bookid + 1}
                            hideInSmallScreen={false}
                            classMore="col-span-1"
                        />
                        <DialogContent data-theme={theme} className="border-none flex justify-center items-center w-[80vw]">
                            {children}
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    )
}

export default BottomNavigation