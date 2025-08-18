import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function TutorPanel() {
  return (
    <Card className="h-full flex flex-col shadow-md">
      <CardHeader>
        <CardTitle className="font-headline text-xl">AI Tutor</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 space-y-6 overflow-y-auto pr-6">
        <div className="prose prose-lg max-w-none">
          <h3 className="font-semibold">Understanding Wealth Creation</h3>
          <p>
            Naval Ravikant argues that wealth is not a zero-sum game. It's about creating abundance. True wealth isn't just money; it's assets that earn while you sleep. This can be code, media, or businesses.
          </p>
          <p>
            The key is to seek wealth, not money or status. Wealth is having assets that earn while you sleep. Money is how we transfer time and wealth. Status is your social standing. Focus on creating things society wants but doesn't yet know how to get.
          </p>
        </div>

        <Card className="bg-background">
            <CardHeader>
                <CardTitle className="text-base">Quick Quiz</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="font-semibold mb-4">According to Naval, what is the primary focus for building true wealth?</p>
                <RadioGroup defaultValue="b">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="a" id="q1a" />
                        <Label htmlFor="q1a">Accumulating money</Label>
                    </div>
                     <div className="flex items-center space-x-2">
                        <RadioGroupItem value="b" id="q1b" />
                        <Label htmlFor="q1b">Creating assets that earn passively</Label>
                    </div>
                     <div className="flex items-center space-x-2">
                        <RadioGroupItem value="c" id="q1c" />
                        <Label htmlFor="q1c">Achieving high social status</Label>
                    </div>
                </RadioGroup>
            </CardContent>
            <CardFooter>
                <Button variant="secondary">Submit Answer</Button>
            </CardFooter>
        </Card>
      </CardContent>
      <CardFooter className="border-t p-4 justify-end gap-2">
        <Button variant="outline">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous Concept
        </Button>
        <Button>
            Next Concept
            <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
}
