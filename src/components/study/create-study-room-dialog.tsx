
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Link as LinkIcon, PlusCircle, Book, BrainCircuit, Languages } from "lucide-react";
import { useState } from "react";

interface CreateStudyRoomDialogProps {
    isMainCta?: boolean;
    onCreateRoom: (newRoomData: { name: string; }) => void;
}

export function CreateStudyRoomDialog({ isMainCta = false, onCreateRoom }: CreateStudyRoomDialogProps) {
    const [open, setOpen] = useState(false);
    const [roomName, setRoomName] = useState("");
    const [activeTab, setActiveTab] = useState("upload");

    const handleSubmit = () => {
        if (roomName) {
            onCreateRoom({ name: roomName });
            setOpen(false); // Close dialog on submit
            setRoomName(""); // Reset input
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const fileName = e.target.files[0].name;
            // Remove file extension
            setRoomName(fileName.substring(0, fileName.lastIndexOf('.')) || fileName);
        }
    }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isMainCta ? (
             <Button size="lg">
                <PlusCircle className="mr-2 h-5 w-5" /> Create New Study Room
            </Button>
        ) : (
            <Button variant="outline">
                <PlusCircle className="mr-2 h-4 w-4" /> New Study Room
            </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">Create a New Study Room</DialogTitle>
          <DialogDescription>
            Upload your learning material to begin your personalized AI-powered study session.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Tabs defaultValue="upload" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload"><Upload className="mr-2 h-4 w-4" /> Upload File</TabsTrigger>
              <TabsTrigger value="link"><LinkIcon className="mr-2 h-4 w-4" /> From Link</TabsTrigger>
            </TabsList>
            <TabsContent value="upload" className="py-4 space-y-2">
              <div className="space-y-2">
                <Label htmlFor="file-upload">Book or Document</Label>
                <Input id="file-upload" type="file" onChange={handleFileChange} />
              </div>
               <div className="space-y-2">
                    <Label htmlFor="room-name-upload">Room Name</Label>
                    <Input id="room-name-upload" value={roomName} onChange={(e) => setRoomName(e.target.value)} placeholder="e.g., The Almanack of Naval Ravikant" />
                </div>
            </TabsContent>
            <TabsContent value="link" className="py-4 space-y-2">
               <div className="space-y-2">
                <Label htmlFor="link-url">Documentation Link</Label>
                <Input id="link-url" placeholder="https://example.com/docs" />
              </div>
              <div className="space-y-2">
                    <Label htmlFor="room-name-link">Room Name</Label>
                    <Input id="room-name-link" value={roomName} onChange={(e) => setRoomName(e.target.value)} placeholder="e.g., React.js Documentation" />
                </div>
            </TabsContent>
          </Tabs>

          <div className="grid grid-cols-2 gap-4 mt-4">
             <div className="space-y-2">
                <Label htmlFor="language"><Languages className="inline-block mr-2 h-4 w-4"/>Language</Label>
                 <Select defaultValue="english">
                    <SelectTrigger id="language">
                        <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="hindi">Hindi</SelectItem>
                        <SelectItem value="urdu">Urdu</SelectItem>
                    </SelectContent>
                </Select>
             </div>
              <div className="space-y-2">
                <Label htmlFor="level"><BrainCircuit className="inline-block mr-2 h-4 w-4"/>Level</Label>
                 <Select defaultValue="beginner">
                    <SelectTrigger id="level">
                        <SelectValue placeholder="Select level" />
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
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" onClick={handleSubmit} disabled={!roomName}>
            <Book className="mr-2 h-4 w-4" /> Start Learning
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
