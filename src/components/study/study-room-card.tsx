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
import { Play, RefreshCw, Trash2, Book } from "lucide-react";
import Link from "next/link";

type StudyRoom = {
  id: string;
  name: string;
  progress: number;
};

interface StudyRoomCardProps {
  room: StudyRoom;
}

export function StudyRoomCard({ room }: StudyRoomCardProps) {
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
                    {room.progress}% complete
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
            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
            </Button>
            <div className="flex gap-2">
                <Button variant="outline" size="sm">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Restart
                </Button>
                <Button asChild size="sm">
                    <Link href={`/study-room/${room.id}`}>
                        <Play className="mr-2 h-4 w-4" />
                        Resume
                    </Link>
                </Button>
            </div>
        </div>
      </CardFooter>
    </Card>
  );
}
