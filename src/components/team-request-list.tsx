"use client";
import React, { useState, useMemo, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Search, Frown } from 'lucide-react';
import { TeamRequestCard } from '@/components/team-request-card';
import type { TeamRequest } from '@/lib/types';
import { AnimatePresence, motion } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TeamRequestListProps {
  initialRequests: TeamRequest[];
}

export function TeamRequestList({ initialRequests }: TeamRequestListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [requests, setRequests] = useState(initialRequests);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const filteredRequests = useMemo(() => {
    if (!searchQuery) return requests;
    const lowercasedQuery = searchQuery.toLowerCase();
    return requests.filter(req => 
      req.projectName.toLowerCase().includes(lowercasedQuery) ||
      req.projectDescription.toLowerCase().includes(lowercasedQuery) ||
      req.roles.some(role => role.toLowerCase().includes(lowercasedQuery)) ||
      req.skills.some(skill => skill.toLowerCase().includes(lowercasedQuery))
    );
  }, [searchQuery, requests]);

  return (
    <div className="py-16 md:py-24">
      <div className="text-center mb-16">
        <h1 className="text-6xl md:text-8xl font-bold font-headline text-white tracking-wider uppercase">HackUp</h1>
        <p className="text-xl md:text-2xl text-primary mt-4 font-light tracking-[0.2em] uppercase">
          Let's find your perfect team
        </p>
      </div>
      <div className="flex flex-col md:flex-row w-full items-center space-y-4 md:space-y-0 md:space-x-4 mb-12">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            type="search"
            placeholder="Search for name of the team..."
            className="pl-12 h-14 text-base bg-card border-0 rounded-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-3 gap-2 w-full md:w-auto">
            <Select>
                <SelectTrigger className="w-full h-14 bg-card border-0 rounded-full">
                    <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                </SelectContent>
            </Select>
            <Select>
                <SelectTrigger className="w-full h-14 bg-card border-0 rounded-full">
                    <SelectValue placeholder="College" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="mit">MIT</SelectItem>
                    <SelectItem value="stanford">Stanford</SelectItem>
                    <SelectItem value="harvard">Harvard</SelectItem>
                </SelectContent>
            </Select>
            <Select>
                <SelectTrigger className="w-full h-14 bg-card border-0 rounded-full">
                    <SelectValue placeholder="Time" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="weekend">This Weekend</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="anytime">Anytime</SelectItem>
                </SelectContent>
            </Select>
        </div>
      </div>
      
      {isMounted && (
        <AnimatePresence>
          <div className="flex flex-col space-y-6">
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request, i) => (
                <motion.div
                  key={request.id}
                  layout
                  className="w-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <TeamRequestCard request={request} />
                </motion.div>
              ))
            ) : (
              <motion.div 
                className="md:col-span-2 lg:col-span-3 text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Frown className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold">No requests found</h3>
                <p className="text-muted-foreground">Try a different search term or check back later!</p>
              </motion.div>
            )}
          </div>
        </AnimatePresence>
      )}
    </div>
  );
}
