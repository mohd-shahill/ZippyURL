import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {

  const [longURL, setlongURL] = useState();

  const navigate = useNavigate();

  const handleShorten = (e) => {
    e.preventDefault()
    if(longURL)navigate(`/auth?createNew=${longURL}`)
  };

  return (
    <div className='flex flex-col items-center'>

      <h2 className='my-10 mx-30 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-white text-center font-extrabold'>
      Transform Your Links: Simplify, Share, and Track with ZippyURL! 
      </h2>

      <form onSubmit={handleShorten} className='sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2'>
        <Input type="url" 
        value={longURL}
        placeholder="Enter your long URL"
        onChange={(e) => setlongURL(e.target.value)}
        className="h-full flex-1 ppy-4 px-4 "
        />

        <Button className="h-full " type="submit" variant="destructive">Shorten</Button>
      </form>

      <img src="/banner.png" alt="banner" className='w-full my-11 md:px-11'/>

      <Accordion type="single" collapsible className='w-full md:px-11'>

          <AccordionItem value="item-1">
            <AccordionTrigger>How does the ZippyURL Shortener works?</AccordionTrigger>
            <AccordionContent>
              When you enter a long URL, our system generates a shorter version of that URL. This shortened URL will redirect to the original URL when visited.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>Do I need an account to use this website?</AccordionTrigger>
            <AccordionContent>
              Yes. You need to create an account to use the ZippyURL Shortener. This will allow you to track the performance of your shortened URLs.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>What analytics are available for my shortened URLs?</AccordionTrigger>
            <AccordionContent>
              You can track the number of clicks, the location of the clicks, and the device type (mobile/desktop) for each of your shortened URLs.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

    </div>
  )
}

export default LandingPage;

// 40:00
