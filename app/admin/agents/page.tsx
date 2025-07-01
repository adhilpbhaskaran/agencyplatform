'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { 
  Loader2, 
  Search, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Mail, 
  Phone, 
  Building,
  Filter,
  RefreshCw
} from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface Agent {
  id: string
  clerk_id: string
  email: string
  full_name: string
  phone: string | null
  company_name: string | null
  is_approved: boolean
  is_active: boolean
  created_at: string
  updated_at: string
}

type FilterStatus = 'all' | 'pending' | 'approved' | 'inactive'

export default function AdminAgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [filteredAgents, setFilteredAgents] = useState<Agent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchAgents()
  }, [])

  useEffect(() => {
    filterAgents()
  }, [agents, searchTerm, filterStatus])

  const fetchAgents = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/admin/agents')
      
      if (!response.ok) {
        throw new Error('Failed to fetch agents')
      }

      const data = await response.json()
      setAgents(data.agents || [])
      setError(null)
    } catch (err) {
      console.error('Error fetching agents:', err)
      setError('Failed to load agents. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const filterAgents = () => {
    let filtered = agents

    // Apply status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(agent => {
        switch (filterStatus) {
          case 'pending':
            return !agent.is_approved && agent.is_active
          case 'approved':
            return agent.is_approved && agent.is_active
          case 'inactive':
            return !agent.is_active
          default:
            return true
        }
      })
    }

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(agent => 
        agent.full_name.toLowerCase().includes(term) ||
        agent.email.toLowerCase().includes(term) ||
        (agent.company_name && agent.company_name.toLowerCase().includes(term))
      )
    }

    setFilteredAgents(filtered)
  }

  const updateAgentStatus = async (agentId: string, isApproved: boolean) => {
    try {
      setIsUpdating(agentId)
      
      const response = await fetch('/api/admin/agents/approve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ agentId, isApproved })
      })

      if (!response.ok) {
        throw new Error('Failed to update agent status')
      }

      // Update local state
      setAgents(prev => prev.map(agent => 
        agent.id === agentId 
          ? { ...agent, is_approved: isApproved, updated_at: new Date().toISOString() }
          : agent
      ))

    } catch (err) {
      console.error('Error updating agent status:', err)
      setError('Failed to update agent status. Please try again.')
    } finally {
      setIsUpdating(null)
    }
  }

  const getStatusBadge = (agent: Agent) => {
    if (!agent.is_active) {
      return <Badge variant="secondary">Inactive</Badge>
    }
    if (agent.is_approved) {
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Approved</Badge>
    }
    return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
  }

  const pendingCount = agents.filter(a => !a.is_approved && a.is_active).length
  const approvedCount = agents.filter(a => a.is_approved && a.is_active).length
  const totalCount = agents.length

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading agents...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Agent Management</h1>
          <p className="text-muted-foreground">Manage agent registrations and approvals</p>
        </div>
        <Button onClick={fetchAgents} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Agents</p>
                <p className="text-2xl font-bold">{totalCount}</p>
              </div>
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-sm font-semibold">{totalCount}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Approval</p>
                <p className="text-2xl font-bold">{pendingCount}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Approved</p>
                <p className="text-2xl font-bold">{approvedCount}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Approval Rate</p>
                <p className="text-2xl font-bold">
                  {totalCount > 0 ? Math.round((approvedCount / totalCount) * 100) : 0}%
                </p>
              </div>
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-xs font-semibold">%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              {(['all', 'pending', 'approved', 'inactive'] as FilterStatus[]).map((status) => (
                <Button
                  key={status}
                  variant={filterStatus === status ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterStatus(status)}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Error Message */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-red-700">
              <XCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Agents Table */}
      <Card>
        <CardHeader>
          <CardTitle>Agents ({filteredAgents.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredAgents.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No agents found matching your criteria.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Agent</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Registered</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAgents.map((agent) => (
                    <TableRow key={agent.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{agent.full_name}</div>
                          <div className="text-sm text-muted-foreground">{agent.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm">
                            <Mail className="h-3 w-3" />
                            <span className="truncate max-w-[150px]">{agent.email}</span>
                          </div>
                          {agent.phone && (
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Phone className="h-3 w-3" />
                              <span>{agent.phone}</span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {agent.company_name ? (
                          <div className="flex items-center gap-1">
                            <Building className="h-3 w-3" />
                            <span className="text-sm">{agent.company_name}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(agent)}
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">
                          {formatDate(agent.created_at)}
                        </span>
                      </TableCell>
                      <TableCell>
                        {agent.is_active && (
                          <div className="flex gap-2">
                            {!agent.is_approved ? (
                              <Button
                                size="sm"
                                onClick={() => updateAgentStatus(agent.id, true)}
                                disabled={isUpdating === agent.id}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                {isUpdating === agent.id ? (
                                  <Loader2 className="h-3 w-3 animate-spin" />
                                ) : (
                                  <>
                                    <CheckCircle className="mr-1 h-3 w-3" />
                                    Approve
                                  </>
                                )}
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateAgentStatus(agent.id, false)}
                                disabled={isUpdating === agent.id}
                              >
                                {isUpdating === agent.id ? (
                                  <Loader2 className="h-3 w-3 animate-spin" />
                                ) : (
                                  <>
                                    <XCircle className="mr-1 h-3 w-3" />
                                    Revoke
                                  </>
                                )}
                              </Button>
                            )}
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}