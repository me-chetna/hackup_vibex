import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TeamRequest } from '@/lib/types';

export function TeamRequestCard({ request }: { request: TeamRequest }) {
  return (
    <Card className="bg-card/60 backdrop-blur-sm border-primary/10 hover:border-primary/40 transition-colors duration-300 rounded-2xl">
      <CardHeader>
        <CardTitle className="font-headline text-xl text-primary">{request.projectName}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-3">{request.projectDescription}</p>
      </CardContent>
    </Card>
  );
}
