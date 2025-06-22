"use client";
import React, { useState, useMemo, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Frown } from 'lucide-react';
import { TeamRequestCard } from '@/components/team-request-card';
import type { TeamRequest } from '@/lib/types';
import { AnimatePresence, motion } from 'framer-motion';

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
    <div>
      <div className="mb-8 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold font-headline text-primary mb-3">Find Your Dream Team</h1>
        <p className="text-lg text-muted-foreground">
          Browse requests or post your own to build the perfect hackathon squad.
        </p>
      </div>
      <div className="flex w-full max-w-2xl mx-auto items-center space-x-2 mb-12">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            type="search"
            placeholder="Search by keyword, skill, or role... (e.g. 'React', 'Designer')"
            className="pl-10 h-12 text-base"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {isMounted && (
        <AnimatePresence>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request, i) => (
                <motion.div
                  key={request.id}
                  layout
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
