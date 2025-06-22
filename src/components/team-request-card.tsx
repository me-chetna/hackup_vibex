import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Code, Paintbrush, Users, Briefcase, Bot } from 'lucide-react';
import type { TeamRequest } from '@/lib/types';

const roleIcons: { [key: string]: React.ElementType } = {
  'Frontend Developer': Code,
  'Backend Developer': Code,
  'Full-Stack Developer': Code,
  'UI/UX Designer': Paintbrush,
  'Project Manager': Briefcase,
  'Data Scientist': Bot,
};

const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
        return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
};

export function TeamRequestCard({ request }: { request: TeamRequest }) {
  return (
    <Card className="flex flex-col h-full hover:shadow-xl transition-shadow duration-300 bg-card rounded-xl border">
      <CardHeader>
        <CardTitle className="font-headline text-lg">{request.projectName}</CardTitle>
        <CardDescription className="line-clamp-3 h-[60px]">{request.projectDescription}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div>
          <h4 className="font-semibold text-sm mb-2 text-muted-foreground">LOOKING FOR</h4>
          <div className="flex flex-wrap gap-2">
            {request.roles.map(role => {
              const Icon = roleIcons[role] || Users;
              return (
                <Badge key={role} variant="secondary" className="flex items-center gap-1.5 py-1 px-2.5">
                  <Icon className="h-3.5 w-3.5" />
                  {role}
                </Badge>
              );
            })}
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-2 mt-4 text-muted-foreground">REQUIRED SKILLS</h4>
          <div className="flex flex-wrap gap-1.5">
            {request.skills.map(skill => (
              <Badge key={skill} variant="outline">{skill}</Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center border-t pt-4 mt-auto">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={request.author.avatarUrl} alt={request.author.name} data-ai-hint="person portrait" />
            <AvatarFallback>{getInitials(request.author.name)}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-foreground">{request.author.name}</span>
        </div>
        <Button>Contact</Button>
      </CardFooter>
    </Card>
  );
}
