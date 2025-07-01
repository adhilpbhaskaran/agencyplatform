'use client';

import { useState } from 'react';
import { useQuotes } from '@/hooks/use-quotes';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  BarChart3,
  DollarSign,
  FileText,
  TrendingUp,
  Users,
  Plus,
  ArrowUpRight,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import Link from 'next/link';
import { formatCurrency, formatDate } from '@/lib/utils';
import { CreateQuoteModal } from '@/components/dashboard/create-quote-modal';
import { AgentProfile } from '@/lib/agent-actions';
import { Quote } from '@/hooks/use-quotes';

interface MainDashboardProps {
  agent: AgentProfile;
  initialQuotes: Quote[];
}

function getStatusIcon(status: string) {
  switch (status) {
    case 'approved':
      return <CheckCircle className="w-4 h-4 text-green-600" />;
    case 'sent':
      return <Clock className="w-4 h-4 text-blue-600" />;
    case 'expired':
      return <XCircle className="w-4 h-4 text-red-600" />;
    case 'draft':
      return <AlertCircle className="w-4 h-4 text-yellow-600" />;
    default:
      return <Clock className="w-4 h-4 text-gray-600" />;
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case 'approved':
      return 'text-green-700 bg-green-50 border-green-200';
    case 'sent':
      return 'text-blue-700 bg-blue-50 border-blue-200';
    case 'expired':
      return 'text-red-700 bg-red-50 border-red-200';
    case 'draft':
      return 'text-yellow-700 bg-yellow-50 border-yellow-200';
    default:
      return 'text-gray-700 bg-gray-50 border-gray-200';
  }
}

export default function MainDashboard({ agent, initialQuotes }: MainDashboardProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const router = useRouter();
  
  // Use React Query for live data with fallback to initial data
  const { data: quotesResponse, isLoading, error } = useQuotes({
    limit: 50,
    sortBy: 'created_at',
    sortOrder: 'desc'
  });
  
  const quotes = quotesResponse?.quotes || initialQuotes || [];
  
  // Calculate stats from real data
  const stats = {
    totalQuotes: quotes.length,
    totalRevenue: quotes.reduce((sum: number, quote: Quote) => sum + (quote.final_total_idr || 0), 0),
    pendingQuotes: quotes.filter(q => q.status === 'sent').length,
    confirmedBookings: quotes.filter(q => q.status === 'approved').length,
    expiredQuotes: quotes.filter(q => q.status === 'expired').length,
    draftQuotes: quotes.filter(q => q.status === 'draft').length,
    activeClients: new Set(quotes.map(q => q.clients?.name)).size,
    conversionRate: quotes.length > 0 ? quotes.filter(q => q.status === 'approved').length / quotes.length : 0
  };

  // Get recent quotes (last 4)
  const recentQuotes = quotes.slice(0, 4);

  // Show loading state for quotes section only
  const showQuotesLoading = isLoading && !initialQuotes?.length;

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            {!showQuotesLoading && (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-600 font-medium">Live Data</span>
              </div>
            )}
          </div>
          <p className="text-gray-600 mt-1">
            Welcome back, {agent.name}! Here's what's happening with your travel business.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.location.reload()}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          {agent.is_approved && (
            <Button 
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Quote
            </Button>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {formatCurrency(stats.totalRevenue)}
            </div>
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <span>Total from all quotes</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Quotes
            </CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {stats.totalQuotes}
            </div>
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <span>{stats.pendingQuotes} pending</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Active Clients
            </CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {stats.activeClients}
            </div>
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <span>Unique clients</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Conversion Rate
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {(stats.conversionRate * 100).toFixed(1)}%
            </div>
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <span>Quotes to bookings</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
            <CardDescription>
              Common tasks to help you work faster
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {agent.is_approved && (
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => setIsCreateModalOpen(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Create New Quote
              </Button>
            )}
            <Link href="/dashboard/clients/new">
              <Button variant="outline" className="w-full justify-start">
                <Users className="w-4 h-4 mr-2" />
                Add New Client
              </Button>
            </Link>
            <Link href="/dashboard/analytics">
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Recent Quotes</CardTitle>
            <CardDescription>
              Your latest quote activity
            </CardDescription>
          </CardHeader>
          <CardContent>
            {showQuotesLoading ? (
              <div className="text-center py-8 text-gray-500">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                <p>Loading quotes...</p>
              </div>
            ) : error ? (
              <div className="text-center py-8 text-red-500">
                <XCircle className="w-8 h-8 mx-auto mb-2" />
                <p>Failed to load quotes</p>
                <p className="text-sm">Please try refreshing the page</p>
              </div>
            ) : recentQuotes.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <FileText className="w-8 h-8 mx-auto mb-2" />
                <p>No quotes yet</p>
                <p className="text-sm">Create your first quote to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentQuotes.map((quote) => (
                  <div 
                    key={quote.id} 
                    className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => router.push(`/quotes/${quote.id}`)}
                  >
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(quote.status)}
                      <div>
                        <div className="font-medium text-gray-900">{quote.quote_ref}</div>
                <div className="text-sm text-gray-500">
                  {quote.clients?.name || 'Unknown Client'} • {quote.travel_start} - {quote.travel_end}
                </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-900">
                        IDR {quote.final_total_idr?.toLocaleString() || '0'}
                      </div>
                      <div className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(quote.status)}`}>
                        {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-4 pt-4 border-t">
              <Link href="/dashboard/quotes">
                <Button variant="outline" className="w-full">
                  View All Quotes
                  <ArrowUpRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Create Quote Modal */}
      <CreateQuoteModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
    </div>
  );
}