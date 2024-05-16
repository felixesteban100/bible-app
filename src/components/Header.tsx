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
    moveChapter: (moveTo: string/* , bookIdSelected: number */) => void;
    setTheme: (theme: string) => void
}

function Header({ children, version, chapter, book, theme, moveChapter, setTheme }: HeaderProps) {
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
                                        // bookIdSelected={book.bookid - 1}
                                        hideInSmallScreen={false}
                                    />
                                    <DialogTrigger
                                        key="dialog-references"
                                    >
                                        <div className='btn rounded-none bg-base-300 border-none flex flex-row justify-center uppercase'>
                                            <BiSolidBible className='text-xl text-primary' />
                                            {windowWidth < 500 && book.name.length > 12 ? `${book.name.slice(0, 12)}...` : book.name} {chapter}
                                        </div>
                                    </DialogTrigger>
                                    <Button
                                        icon={<AiOutlineArrowRight className="text-base-content" />}
                                        moveChapter={moveChapter}
                                        move={"next"}
                                        // bookIdSelected={book.bookid + 1}
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
                            <div className='btn rounded-full bg-base-300 border-none flex flex-row justify-center uppercase'>
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

            {/* <label className="swap swap-rotate w-[90%] mx-auto">
                <input type="checkbox" className="theme-controller" value="black" onChange={(e) => setTheme(e.target.value)} />
                <svg className="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
                <svg className="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
            </label> */}
        </>
    )
}

export default Header