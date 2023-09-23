import { BiSolidBible } from 'react-icons/bi'
import { BsSearch } from 'react-icons/bs'
import { FiSettings } from 'react-icons/fi'
import { TfiWorld } from 'react-icons/tfi'
// import useWindowScrollY from '../hooks/useWindowScrollY'
import useWindowWidth from '../hooks/useWindowWidth'
import { Book } from '../types'

import {
    Dialog,
    DialogContent,
    DialogTrigger
} from "@/components/ui/dialog"
import Button from '@/reusableComponents/Button'

import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'

type HeaderProps = {
    children: JSX.Element[]
    version: string
    chapter: number;
    book: Book;
    theme: string;
    moveChapter: (moveTo: string, bookIdSelected: number) => void
}

function Header({ children, version, chapter, book, theme, moveChapter }: HeaderProps) {
    const windowWidth = useWindowWidth()
    // const windowScrollY = useWindowScrollY()

    return (
        <>
            <div className={`navbar sticky top-0 z-[10] transition-all duration-300 bg-base-100 `}>

                <div className="flex-1 pl-5">
                    {
                        windowWidth > 700 ?
                            <div className="flex-none fill-primary hover:fill-current">
                                <Dialog data-theme={theme}>
                                    <Button
                                        icon={<AiOutlineArrowLeft className="text-base-content" />}
                                        moveChapter={moveChapter}
                                        move={"previous"}
                                        bookIdSelected={book.bookid - 1}
                                        hideInSmallScreen={false}
                                    />
                                    <DialogTrigger
                                        key="dialog-references"
                                    >
                                        <div className='btn rounded-none bg-base-300 border-none flex flex-row justify-center'>
                                            <BiSolidBible className='text-xl text-primary' />
                                            {windowWidth < 500 && book.name.length > 12 ? `${book.name.slice(0, 12)}...` : book.name} {chapter}
                                        </div>
                                    </DialogTrigger>
                                    <Button
                                        icon={<AiOutlineArrowRight className="text-base-content" />}
                                        moveChapter={moveChapter}
                                        move={"next"}
                                        bookIdSelected={book.bookid + 1}
                                        hideInSmallScreen={false}
                                    />
                                    <DialogContent data-theme={theme} className="border-none flex justify-center items-center w-[80vw]">
                                        {children[0]}
                                    </DialogContent>
                                </Dialog>
                            </div>
                            : null
                    }

                </div>

                <div className="flex justify-center items-center gap-2">
                    {/* add a tooltip of versions */}
                    <Dialog data-theme={theme}>
                        <DialogTrigger
                            key="dialog-references"
                        >
                            <div className='btn rounded-full bg-base-300 border-none flex flex-row justify-center'>
                                <TfiWorld className='text-md md:text-xl text-primary' />
                                {version}
                            </div>
                        </DialogTrigger>
                        <DialogContent className="border-none" data-theme={theme} >
                            {children[1]}
                        </DialogContent>
                    </Dialog>


                    {/* add a tooltip of search */}
                    <Dialog data-theme={theme}>
                        <DialogTrigger
                            key="dialog-references"
                        >
                            <div className='btn btn-ghost rounded-full border-none flex flex-row justify-center'>
                                <BsSearch className='text-xl md:text-2xl text-primary' />
                            </div>
                        </DialogTrigger>
                        <DialogContent className="border-none" data-theme={theme} >
                            {children[2]}
                        </DialogContent>
                    </Dialog>

                    <Dialog data-theme={theme}>
                        <DialogTrigger
                            key="dialog-references"
                        >
                            <div className='btn btn-ghost rounded-full border-none flex flex-row justify-center'>
                                <FiSettings className='text-xl md:text-2xl text-primary' />
                            </div>
                        </DialogTrigger>
                        <DialogContent className="border-none active:border-none" data-theme={theme} >
                            {children[3]}
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            {children[4]}
        </>
    )
}

export default Header