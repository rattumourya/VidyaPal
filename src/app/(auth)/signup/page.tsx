import { SignupForm } from "@/components/auth/signup-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookOpenCheck } from "lucide-react";

export default function SignupPage() {
  return (
    <Card className="w-full max-w-md shadow-2xl">
      <CardHeader className="items-center text-center">
        <BookOpenCheck className="h-12 w-12 text-primary" />
        <CardTitle className="text-3xl font-bold text-primary font-headline">Create Your Account</CardTitle>
        <CardDescription>Join VidyaPal and start your personalized learning journey.</CardDescription>
      </CardHeader>
      <CardContent>
        <SignupForm />
      </CardContent>
    </Card>
  );
}
