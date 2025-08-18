import { TutorPanel } from "@/components/study/tutor-panel";
import { ChatPanel } from "@/components/study/chat-panel";
import { QuizHistoryPanel } from "@/components/study/quiz-history-panel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BrainCircuit, Languages, History } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function StudyRoomPage({ params }: { params: { id: string } }) {
  const studyRoomName = "The Almanack of Naval Ravikant";

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <header className="p-4 border-b bg-background/95">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Study Room</p>
            <h1 className="text-2xl font-bold font-headline">{studyRoomName}</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Languages className="h-5 w-5 text-muted-foreground" />
              <Select defaultValue="english">
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="hindi">Hindi</SelectItem>
                  <SelectItem value="urdu">Urdu</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <BrainCircuit className="h-5 w-5 text-muted-foreground" />
              <Select defaultValue="intermediate">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-1 overflow-hidden">
        <Tabs defaultValue="study" className="h-full flex flex-col">
          <div className="container mx-auto">
            <TabsList className="mt-4">
              <TabsTrigger value="study">Study Session</TabsTrigger>
              <TabsTrigger value="quiz_history"><History className="mr-2 h-4 w-4" />Quiz History</TabsTrigger>
            </TabsList>
          </div>
          <Separator className="mt-4" />

          <TabsContent value="study" className="flex-1 overflow-y-auto p-0">
             <div className="container mx-auto grid lg:grid-cols-3 gap-6 py-6 h-full">
                <div className="lg:col-span-2">
                    <TutorPanel />
                </div>
                <div className="lg:col-span-1">
                    <ChatPanel />
                </div>
              </div>
          </TabsContent>
          <TabsContent value="quiz_history" className="flex-1 overflow-y-auto">
              <QuizHistoryPanel />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
