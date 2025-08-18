import { SignupForm } from "@/components/auth/signup-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function SignupPage() {
  return (
    <Card className="w-full max-w-md shadow-2xl">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-card-foreground font-headline">Create Your Account</CardTitle>
        <CardDescription>Join VidyaPal and start your personalized learning journey.</CardDescription>
      </CardHeader>
      <CardContent>
        <SignupForm />
      </CardContent>
    </Card>
  );
}
