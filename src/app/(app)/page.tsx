
"use client";

import { TeamRequestList } from "@/components/team-request-list";
import type { TeamRequest } from "@/lib/types";
import { ScrollPath } from "@/components/scroll-path";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/components/providers/auth-provider";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { LoginForm } from "@/components/login-form";

// Mock data for team requests
const mockRequests: TeamRequest[] = [
  {
    id: "1",
    projectName: "AI Personal Finance Advisor",
    projectDescription: "A mobile app that uses AI to provide personalized financial advice, track spending, and suggest investment opportunities.",
    roles: ["Frontend Developer", "Backend Developer", "UI/UX Designer"],
    skills: ["React Native", "Node.js", "Python", "Figma", "Firebase"],
    author: { name: "Alice Johnson", avatarUrl: "https://placehold.co/40x40.png" },
    createdAt: new Date("2023-10-26T10:00:00Z"),
    hackathonDate: new Date("2023-11-15T09:00:00Z"),
  },
  {
    id: "2",
    projectName: "Gamified Language Learning",
    projectDescription: "An interactive web platform that makes learning a new language fun through games, leaderboards, and a compelling story.",
    roles: ["Full-Stack Developer", "UI/UX Designer"],
    skills: ["React", "TypeScript", "GraphQL", "Prisma", "PostgreSQL"],
    author: { name: "Bob Williams" },
    createdAt: new Date("2023-10-25T14:30:00Z"),
    hackathonDate: new Date("2023-11-18T09:00:00Z"),
  },
  {
    id: "3",
    projectName: "Sustainable E-commerce Hub",
    projectDescription: "An online marketplace for eco-friendly and sustainable products, connecting conscious consumers with ethical brands.",
    roles: ["Frontend Developer", "Project Manager"],
    skills: ["Next.js", "Tailwind CSS", "Stripe", "Vercel"],
    author: { name: "Charlie Brown", avatarUrl: "https://placehold.co/40x40.png" },
    createdAt: new Date("2023-10-25T09:00:00Z"),
    hackathonDate: new Date("2023-11-20T09:00:00Z"),
  },
   {
    id: "4",
    projectName: "Community Garden Manager",
    projectDescription: "A tool to help local communities organize and manage shared garden spaces, track planting schedules, and share produce.",
    roles: ["Frontend Developer", "Backend Developer"],
    skills: ["Vue.js", "Django", "Heroku"],
    author: { name: "Diana Prince" },
    createdAt: new Date("2023-10-24T18:00:00Z"),
    hackathonDate: new Date("2023-11-22T09:00:00Z"),
  },
  {
    id: "5",
    projectName: "VR Museum Tour Experience",
    projectDescription: "A virtual reality experience allowing users to tour famous museums from their home, providing an immersive educational tool.",
    roles: ["UI/UX Designer", "Full-Stack Developer"],
    skills: ["Unity", "C#", "Blender", "Oculus SDK"],
    author: { name: "Eve Adams", avatarUrl: "https://placehold.co/40x40.png" },
    createdAt: new Date("2023-10-24T11:45:00Z"),
    hackathonDate: new Date("2023-11-25T09:00:00Z"),
  },
  {
    id: "6",
    projectName: "Mental Wellness Chatbot",
    projectDescription: "An empathetic chatbot that provides a safe space for users to talk about their feelings and offers mindfulness exercises.",
    roles: ["Data Scientist", "Backend Developer"],
    skills: ["Python", "TensorFlow", "Flask", "Docker"],
    author: { name: "Frank Miller" },
    createdAt: new Date("2023-10-23T20:15:00Z"),
    hackathonDate: new Date("2023-11-28T09:00:00Z"),
  },
];

export default function HomePage() {
  const router = useRouter();
  const { user } = useAuth();
  const { toast } = useToast();
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  const handleCreateRequestClick = () => {
    if (!user) {
      setShowLoginDialog(true);
      return;
    }

    // TODO: Replace 'acme.com' with your company's email domain
    const ALLOWED_DOMAIN = 'acme.com';
    if (user.email.endsWith(`@${ALLOWED_DOMAIN}`)) {
      router.push('/create-request');
    } else {
      toast({
        variant: 'destructive',
        title: 'Permission Denied',
        description: `Only users with an @${ALLOWED_DOMAIN} email can create team requests.`,
      });
    }
  };

  return (
    <>
      <div className="relative w-full">
        <div className="hidden md:block">
          <ScrollPath />
        </div>
        <div className="w-full lg:w-5/6 px-4 sm:px-8 md:pl-16 relative z-10">
          <motion.div
            className="text-center pt-16 md:pt-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
              <h1 className="text-6xl md:text-8xl font-headline font-bold tracking-tighter uppercase bg-clip-text text-transparent bg-gradient-to-b from-[#FFB941] to-[#FF3800] py-2">HackUp</h1>
              <p className="text-lg md:text-xl text-primary/80 mt-2 font-headline tracking-widest uppercase">
              Let's find your perfect team
              </p>
          </motion.div>

          <div className="sticky top-[90px] z-20 py-4 bg-background/80 backdrop-blur-sm -mx-4 sm:-mx-8 md:-ml-16 px-4 sm:px-8 md:pl-16 my-8">
            <Card className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg border-primary/20">
                <div className="text-center sm:text-left">
                  <h3 className="font-semibold text-lg text-primary">Have a project idea?</h3>
                  <p className="text-sm text-muted-foreground">Post a request and build your dream team.</p>
                </div>
                <Button onClick={handleCreateRequestClick} className="w-full sm:w-auto flex-shrink-0">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create a Team
                </Button>
            </Card>
          </div>
          
          <div className="grid grid-cols-1">
              <div>
                   <TeamRequestList initialRequests={mockRequests} />
              </div>
          </div>
        </div>
      </div>
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Login Required</DialogTitle>
            <DialogDescription>
              You must be logged in to create a team request. Please log in to
              continue.
            </DialogDescription>
          </DialogHeader>
          <LoginForm
            onLoginSuccess={() => {
              setShowLoginDialog(false);
              toast({
                title: 'Logged In Successfully',
                description: 'You can now try creating a team again.',
              });
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
