
"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/use-auth";
import { Upload } from "lucide-react";
import { useState } from "react";

export default function ProfilePage() {
    const { user, updateUser } = useAuth();
    const [name, setName] = useState(user?.displayName || '');
    const [isSaving, setIsSaving] = useState(false);

    const handleSaveChanges = async () => {
        if (!user) return;
        setIsSaving(true);
        try {
            await updateUser({ displayName: name });
            alert('Profile updated successfully!');
        } catch (error) {
            alert('Failed to update profile.');
            console.error(error);
        } finally {
            setIsSaving(false);
        }
    }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
        <h1 className="text-3xl font-bold font-headline mb-6">Profile Settings</h1>
        <div className="grid gap-8 md:grid-cols-1">
            <Card>
                <CardHeader className="items-center text-center">
                    <Avatar className="w-24 h-24 mb-4">
                        <AvatarImage src={user?.photoURL || "https://placehold.co/100x100.png"} alt="User Avatar" data-ai-hint="user avatar" />
                        <AvatarFallback>{user?.displayName?.charAt(0) || 'U'}</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm">
                        <Upload className="mr-2 h-4 w-4" />
                        Change Photo
                    </Button>
                </CardHeader>
                <CardContent>
                    <h2 className="text-xl font-semibold text-center">{user?.displayName}</h2>
                    <p className="text-sm text-muted-foreground text-center">{user?.email}</p>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your name and email address.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value={user?.email || ''} disabled />
                    </div>
                     <Button onClick={handleSaveChanges} disabled={isSaving}>{isSaving ? 'Saving...' : 'Save Changes'}</Button>
                </CardContent>
            </Card>

            <Card>
                 <CardHeader>
                    <CardTitle>Learning Analytics</CardTitle>
                    <CardDescription>Track your progress across all study rooms.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2">
                    <Card className="bg-primary/5">
                        <CardHeader>
                            <CardTitle className="text-base text-primary/80">Study Rooms</CardTitle>
                            <p className="text-3xl font-bold text-primary">3</p>
                        </CardHeader>
                    </Card>
                     <Card className="bg-accent/10">
                        <CardHeader>
                            <CardTitle className="text-base text-accent-foreground/80">Quizzes Taken</CardTitle>
                            <p className="text-3xl font-bold text-accent-foreground">12</p>
                        </CardHeader>
                    </Card>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
