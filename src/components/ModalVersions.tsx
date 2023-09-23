
import { ModalVersionsProps } from '../types'
import languages from './../data/languages.json'
import { CardTitle } from "@/components/ui/card"

import { ScrollArea } from '@/components/ui/scroll-area'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

// import { Separator } from "@/components/ui/separator"


function ModalVersions({ changeVersion, versionSelected }: ModalVersionsProps) {
    return (
        <div className=''>
            <div className='mb-5 text-2xl'>Version</div>
            <ScrollArea className="h-[57vh]">
                {languages.map((currentLanguage, index) => {
                    // console.log("index", index)
                    return (
                        <div key={index}>
                            <Accordion type="single" collapsible className="w-full px-5">
                                <AccordionItem value={`item-${index}`} className='border-b-2' >
                                    <AccordionTrigger className='text-base-content' >{currentLanguage.language}</AccordionTrigger>
                                    {currentLanguage.translations.map((version) => (
                                        <AccordionContent
                                            key={version.full_name}
                                            className='flex flex-col gap-10'
                                        >
                                            <button
                                                className={`normal-case btn w-full ${version.short_name === versionSelected ? "btn-primary" : "text-base-content"}`}
                                                onClick={() => changeVersion(version.short_name)}
                                            >
                                                {version.full_name[0].toUpperCase()}{version.full_name.slice(1)}
                                            </button>
                                        </AccordionContent>
                                    ))}
                                </AccordionItem>
                            </Accordion>
                        </div>

                    )
                })}
            </ScrollArea>
        </div >
    )
}

export default ModalVersions

