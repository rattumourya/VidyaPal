
"use client"

import { StudyRoomCard } from "@/components/study/study-room-card";
import { CreateStudyRoomDialog } from "@/components/study/create-study-room-dialog";
import { useState } from "react";
import { PlusCircle } from "lucide-react";

// Mock data for initial study rooms
const initialStudyRooms = [
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

export default function DashboardPage() {
  const [rooms, setRooms] = useState(initialStudyRooms);

  const handleCreateRoom = (newRoomData: { name: string; }) => {
    const newRoom = {
      id: Date.now().toString(),
      name: newRoomData.name,
      progress: 0,
    };
    setRooms(prevRooms => [...prevRooms, newRoom]);
  };

  const handleDeleteRoom = (roomId: string) => {
    setRooms(prevRooms => prevRooms.filter(room => room.id !== roomId));
  };


  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold font-headline">Your Study Rooms</h1>
        <CreateStudyRoomDialog onCreateRoom={handleCreateRoom} />
      </div>

      {rooms.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => (
            <StudyRoomCard key={room.id} room={room} onDelete={handleDeleteRoom} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <h2 className="text-xl font-semibold text-muted-foreground">No Study Rooms Yet</h2>
          <p className="text-muted-foreground mt-2 mb-4">Get started by creating your first study room.</p>
          <CreateStudyRoomDialog isMainCta={true} onCreateRoom={handleCreateRoom} />
        </div>
      )}
    </div>
  );
}
