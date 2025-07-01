'use client';

import { useQuery } from '@tanstack/react-query';

interface Agent {
  id: string;
  fullName: string;
  email: string;
  isApproved: boolean;
  createdAt: string;
  status: 'approved' | 'pending_approval';
}

interface AgentResponse {
  registered: boolean;
  agent?: Agent;
  status: 'not_registered' | 'approved' | 'pending_approval';
}

const fetchAgent = async (): Promise<AgentResponse> => {
  const response = await fetch('/api/agents/register');
  if (!response.ok) {
    throw new Error('Failed to fetch agent data');
  }
  return response.json();
};

export const useAgent = () => {
  return useQuery({
    queryKey: ['agent'],
    queryFn: fetchAgent,
  });
};