
"use client"

import { TutorPanel } from "@/components/study/tutor-panel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { BrainCircuit, Languages, History, Bot, MoreVertical, ArrowLeft } from "lucide-react";
import { ChatPanel } from "@/components/study/chat-panel";
import { QuizHistoryPanel } from "@/components/study/quiz-history-panel";
import Link from "next/link";


export default function StudyRoomPage({ params }: { params: { id: string } }) {
  const studyRoomName = "The Almanack of Naval Ravikant";

  return (
    <div className="flex flex-col h-screen">
       <header className="flex items-center justify-between p-4 border-b bg-background/95 sticky top-0 z-10 h-16">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
                <Link href="/">
                    <ArrowLeft />
                </Link>
            </Button>
            <h1 className="text-xl font-bold font-headline truncate">{studyRoomName}</h1>
          </div>
          
          <Sheet>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <MoreVertical />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Settings</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <SheetTrigger asChild>
                      <DropdownMenuItem>
                          <History className="mr-2 h-4 w-4" />
                          <span>Quiz History</span>
                      </DropdownMenuItem>
                    </SheetTrigger>
                    <DropdownMenuSeparator />
                     <DropdownMenuLabel>Language</DropdownMenuLabel>
                      <Select defaultValue="english">
                        <SelectTrigger className="w-[180px] mx-2">
                          <div className="flex items-center gap-2">
                            <Languages className="h-4 w-4 text-muted-foreground" />
                            <SelectValue placeholder="Language" />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="hindi">Hindi</SelectItem>
                          <SelectItem value="urdu">Urdu</SelectItem>
                        </SelectContent>
                      </Select>
                     <DropdownMenuLabel className="mt-2">Level</DropdownMenuLabel>
                      <Select defaultValue="intermediate">
                        <SelectTrigger className="w-[180px] mx-2">
                           <div className="flex items-center gap-2">
                            <BrainCircuit className="h-4 w-4 text-muted-foreground" />
                            <SelectValue placeholder="Level" />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                </DropdownMenuContent>
            </DropdownMenu>
             <SheetContent className="w-full sm:max-w-lg p-0">
                <SheetHeader className="p-4 border-b">
                  <SheetTitle>Quiz History</SheetTitle>
                </SheetHeader>
                <div className="overflow-y-auto">
                  <QuizHistoryPanel />
                </div>
              </SheetContent>
          </Sheet>
      </header>
      
      <main className="flex-1 overflow-y-auto bg-muted/20">
        <div className="container mx-auto py-6 h-full">
            <TutorPanel />
        </div>
      </main>

    </div>
  );
}
