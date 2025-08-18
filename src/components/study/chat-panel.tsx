import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Bot } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ChatPanel() {
  const messages = [
    { from: "ai", text: "Hello! Feel free to ask me anything about the current topic." },
    { from: "user", text: "Can you explain the difference between wealth and money in simpler terms?" },
    { from: "ai", text: "Of course! Think of it like this: Money is the water you carry in a bucket. Wealth is the well you build that gives you water without you having to carry it. One is temporary and requires work, the other is a system that works for you." },
  ];

  return (
    <Card className="h-full flex flex-col shadow-md">
      <CardHeader>
        <CardTitle className="font-headline text-xl flex items-center gap-2">
          <Bot /> Interactive Chatbot
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <ScrollArea className="h-full pr-4">
          <div className="space-y-6">
            {messages.map((message, index) => (
              <div key={index} className={`flex items-start gap-3 ${message.from === 'user' ? 'justify-end' : ''}`}>
                {message.from === 'ai' && (
                  <Avatar className="w-8 h-8">
                     <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
                  </Avatar>
                )}
                <div className={`rounded-lg p-3 max-w-[80%] ${message.from === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                  <p className="text-sm">{message.text}</p>
                </div>
                 {message.from === 'user' && (
                  <Avatar className="w-8 h-8">
                     <AvatarImage src="https://placehold.co/100x100.png" alt="User" data-ai-hint="user avatar" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <div className="relative w-full">
          <Input placeholder="Ask a question..." className="pr-12" />
          <Button type="submit" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-10">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
