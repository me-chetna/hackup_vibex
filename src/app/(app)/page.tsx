"use client";

import { TeamRequestList } from "@/components/team-request-list";
import type { TeamRequest } from "@/lib/types";
import { ScrollPath } from "@/components/scroll-path";
import { useRef } from "react";

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
  },
  {
    id: "2",
    projectName: "Gamified Language Learning",
    projectDescription: "An interactive web platform that makes learning a new language fun through games, leaderboards, and a compelling story.",
    roles: ["Full-Stack Developer", "UI/UX Designer"],
    skills: ["React", "TypeScript", "GraphQL", "Prisma", "PostgreSQL"],
    author: { name: "Bob Williams" },
    createdAt: new Date("2023-10-25T14:30:00Z"),
  },
  {
    id: "3",
    projectName: "Sustainable E-commerce Hub",
    projectDescription: "An online marketplace for eco-friendly and sustainable products, connecting conscious consumers with ethical brands.",
    roles: ["Frontend Developer", "Project Manager"],
    skills: ["Next.js", "Tailwind CSS", "Stripe", "Vercel"],
    author: { name: "Charlie Brown", avatarUrl: "https://placehold.co/40x40.png" },
    createdAt: new Date("2023-10-25T09:00:00Z"),
  },
   {
    id: "4",
    projectName: "Community Garden Manager",
    projectDescription: "A tool to help local communities organize and manage shared garden spaces, track planting schedules, and share produce.",
    roles: ["Frontend Developer", "Backend Developer"],
    skills: ["Vue.js", "Django", "Heroku"],
    author: { name: "Diana Prince" },
    createdAt: new Date("2023-10-24T18:00:00Z"),
  },
  {
    id: "5",
    projectName: "VR Museum Tour Experience",
    projectDescription: "A virtual reality experience allowing users to tour famous museums from their home, providing an immersive educational tool.",
    roles: ["UI/UX Designer", "Full-Stack Developer"],
    skills: ["Unity", "C#", "Blender", "Oculus SDK"],
    author: { name: "Eve Adams", avatarUrl: "https://placehold.co/40x40.png" },
    createdAt: new Date("2023-10-24T11:45:00Z"),
  },
  {
    id: "6",
    projectName: "Mental Wellness Chatbot",
    projectDescription: "An empathetic chatbot that provides a safe space for users to talk about their feelings and offers mindfulness exercises.",
    roles: ["Data Scientist", "Backend Developer"],
    skills: ["Python", "TensorFlow", "Flask", "Docker"],
    author: { name: "Frank Miller" },
    createdAt: new Date("2023-10-23T20:15:00Z"),
  },
];

export default function HomePage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={scrollContainerRef} className="relative w-full">
      <div className="hidden md:block">
        <ScrollPath target={scrollContainerRef} />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center pt-16 md:pt-24 mb-16">
            <h1 className="text-6xl md:text-8xl font-bold font-headline text-white tracking-wider uppercase">HackUp</h1>
            <p className="text-xl md:text-2xl text-primary mt-4 font-light tracking-[0.2em] uppercase">
            Let's find your perfect team
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_300px]">
            <div>
                 <TeamRequestList initialRequests={mockRequests} />
            </div>
            <div className="hidden md:block" />
        </div>
      </div>
    </div>
  );
}
