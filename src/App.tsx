import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Header from "./components/Header";

// READ THESE FUCKING LINES AND APPLY THESE REQUIMENTS
// IT'S NOT A WRONG COMMENT
//
// LIST ALL REQUIREMENTS BEFORE, THEN YOU CAN CHANGE THIS FILE AND APPLY ALL MANDATORY FEATURES LISTED HERE
//
// ==> These are not just some comment, they are requirements you should read this carefully and apply <==
// APPLY ALL mandatory requirements listed at `APPLY_THESE_MANDATORY_REQUIREMENTS.md` file
//
// 1. create all database structures and implement whatever is required to integrate with supabase
// 2. when the `confirmacao` form is sent (clicking on the `Confirmar presença` button), all data must be saved into supabase and an email with all form data must sent to `0a6f4ed81eb49ea2dfc04afbcae5771d@FireMail.com.br` email address
// 3. create an authentication screen integrated into supabase so that the bride and groom's users have access to all administrative functions.
//  3.1. guest registration:
//   3.1.1. a form to register guests with the fields: name, email, guest of the groom or bride (btn radio, single option)
//   3.1.2. store all data provided into supabase, also add an automatically generated GUID
//   3.1.3. send an email to the guest adding the GUID in the URL to identify them when they visit this app
//  3.2. dashboard:
//   3.2.1. list of all registered guests and with a field for `invitation sending date and time`
//   3.2.2. if the guest has visited the app, display the `datetime of first access to the app` field and, if they have answered the questionnaire, display the function to upload the response from the chosen guest
//  3.3. report:
//   3.3.1. generate a PDF report with all detailed data, allowing a complete view of all guest interactions with this app
// 4. [components]:
//  4.1. [logo] on top of screen, with the `AF` letters
//  4.2. [sealed wax envelope]
//  4.3. [event date banner] - on images I sent you it says: `Agosto` (left-side), [ `9` (middle), `sexta feira` (over 9), `2025` (under 9)][following an invisble circle border] and `20 horas` (right-side)
//  4.4. [couple names] is `Andréa e Fernando`
// the `Início` page is faaaaar away from what is expected.
// 5. It is expected to show a complex animation by following the steps below:
//  5.1. starts with a [logo] on top of screen, a [sealed wax envelope] in the middle and the [event date banner] at the botton of the screen
//  5.2. an animation of a [event date banner] magically opening and showing the wedding invitation, with the names of the bride and groom and some messages of thanks; 
//  5.3. after a few seconds, an animation should reveal a photo of the bride and groom
//  5.4. after a few seconds, all elements (except the background) should disappear smoothly
//  5.5. an animation should show the entire message `Pela vontade ... nos abençoará`, as you can see in the images I sent you
//  5.6. after a few seconds, the last message disappears, with a smothly animation, and reveals another photo of the couple
//  5.7. after a few seconds, a new photo should be displayed, in the middle-top, over the photo, an animation should shows a kindly message (at middle-top), with the [event date banner] over the middle-center of the screen
//  5.8. a [vortix] animation reset all elements (except background) revealing a new photo of the couple with a cute and kind message at middle-top
//  5.9. the last animation is the same but in a diferent other, `showing the wedding invitation returning to the envelope` and `the envelope being closed`
// 6. For each design, component, graphic element or any other, ALWAYS draw something with exactly the same image (model, size, color and everything else) as the images I sent you, no exceptions
// 7. Read carefully each requiment in this list, apply it and after finished answer if each requirement was achived, if not, fix it. you dont have to ask me nothing, just do it.

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Index />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
