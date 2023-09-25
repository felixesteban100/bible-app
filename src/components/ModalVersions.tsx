
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


function ModalVersions({ changeVersion, versionSelected }: ModalVersionsProps) {
    
    function getLanguageSelected(): string{
        return languages.reduce((acc, cur, i) => {
            cur.translations.forEach((curT) => {
                if(curT.short_name === versionSelected) acc = `item-${i}`
            })

            return acc
        }, "")
    }
    
    return (
        <div className=''>
            <div className='mb-5 text-2xl font-semibold'>Version</div>
            <ScrollArea className="h-[57vh]">
                <Accordion defaultValue={getLanguageSelected()} type="single" collapsible className="w-full px-5">
                    {languages.map((currentLanguage, index) => {
                        return (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger className='text-base-content' >{currentLanguage.language}</AccordionTrigger>
                                <AccordionContent>
                                    <div className='flex flex-col gap-2'>
                                        {currentLanguage.translations.map((version) => (
                                            <button
                                                key={version.full_name}
                                                className={`normal-case btn w-full ${version.short_name === versionSelected ? "btn-primary" : "text-base-content"}`}
                                                onClick={() => changeVersion(version.short_name)}
                                            >
                                                {version.full_name[0].toUpperCase()}{version.full_name.slice(1)}
                                            </button>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                        )
                    })}
                </Accordion>
            </ScrollArea>
        </div >
    )
}

export default ModalVersions