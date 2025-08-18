import { StudyRoomCard } from "@/components/study/study-room-card";
import { CreateStudyRoomDialog } from "@/components/study/create-study-room-dialog";
import { PlusCircle } from "lucide-react";
import { Header } from "@/components/shared/header";

// Mock data for study rooms
const studyRooms = [
  {
    id: "1",
    name: "The Almanack of Naval Ravikant",
    progress: 75,
  },
  {
    id: "2",
    name: "React.js Documentation",
    progress: 40,
  },
  {
    id: "3",
    name: "History of Ancient Rome",
    progress: 15,
  },
];

const noStudyRooms = [];

export default function DashboardPage() {
  const rooms = studyRooms; // Switch to noStudyRooms to test empty state

  return (
    <>
    <Header />
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold font-headline">Your Study Rooms</h1>
        <CreateStudyRoomDialog />
      </div>

      {rooms.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => (
            <StudyRoomCard key={room.id} room={room} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <h2 className="text-xl font-semibold text-muted-foreground">No Study Rooms Yet</h2>
          <p className="text-muted-foreground mt-2 mb-4">Get started by creating your first study room.</p>
          <CreateStudyRoomDialog isMainCta={true} />
        </div>
      )}
    </div>
    </>
  );
}
