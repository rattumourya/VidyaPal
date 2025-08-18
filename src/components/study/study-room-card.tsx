import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Play, RefreshCw, Trash2, Book, Star } from "lucide-react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

type StudyRoom = {
  id: string;
  name: string;
  progress: number;
};

interface StudyRoomCardProps {
  room: StudyRoom;
  onDelete: (id: string) => void;
}

export function StudyRoomCard({ room, onDelete }: StudyRoomCardProps) {
  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-3 rounded-full">
                <Book className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
                <CardTitle className="font-headline text-lg leading-tight">{room.name}</CardTitle>
                <CardDescription className="mt-1">
                    {room.progress > 0 ? `${room.progress}% complete` : "Not started"}
                </CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <Progress value={room.progress} aria-label={`${room.progress}% complete`} />
      </CardContent>
      <Separator />
      <CardFooter className="p-4 bg-muted/50">
        <div className="flex w-full justify-between items-center gap-2">
           <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your study room
                    and all of its data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onDelete(room.id)}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <div className="flex gap-2">
                <Button variant="outline" size="sm">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Restart
                </Button>
                <Button asChild size="sm">
                    <Link href={`/study-room/${room.id}`}>
                        {room.progress > 0 ? <Play className="mr-2 h-4 w-4" /> : <Star className="mr-2 h-4 w-4" />}
                        {room.progress > 0 ? "Resume" : "Start"}
                    </Link>
                </Button>
            </div>
        </div>
      </CardFooter>
    </Card>
  );
}
