import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const quizHistory = [
  { id: 1, topic: "Wealth Creation", date: "2024-07-28", score: 100, status: "Passed" },
  { id: 2, topic: "Specific Knowledge", date: "2024-07-27", score: 75, status: "Passed" },
  { id: 3, topic: "Accountability", date: "2024-07-26", score: 40, status: "Failed" },
  { id: 4, topic: "Leverage", date: "2024-07-25", score: 90, status: "Passed" },
];

export function QuizHistoryPanel() {
  return (
    <div className="container mx-auto py-6">
        <Card>
            <CardHeader>
                <CardTitle>Quiz History</CardTitle>
                <CardDescription>Review your past quizzes and track your performance.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Topic</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-center">Score</TableHead>
                            <TableHead className="text-center">Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {quizHistory.map((quiz) => (
                            <TableRow key={quiz.id}>
                                <TableCell className="font-medium">{quiz.topic}</TableCell>
                                <TableCell>{quiz.date}</TableCell>
                                <TableCell className="text-center">{quiz.score}%</TableCell>
                                <TableCell className="text-center">
                                    <Badge variant={quiz.status === 'Passed' ? 'default' : 'destructive'} className={quiz.status === 'Passed' ? 'bg-accent text-accent-foreground' : ''}>
                                        {quiz.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="outline" size="sm">Review</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  );
}
