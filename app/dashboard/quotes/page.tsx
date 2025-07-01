'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  FileText,
  Search,
  Filter,
  Plus,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowUpDown,
  Eye,
  Download,
  RefreshCw,
} from 'lucide-react';
import { useQuotes } from '@/hooks/use-quotes';
import { formatCurrency, formatDate } from '@/lib/utils';
import Link from 'next/link';

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

export default function QuotesPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Build query parameters
  const queryParams = {
    limit: itemsPerPage,
    offset: (currentPage - 1) * itemsPerPage,
    sortBy,
    sortOrder,
    ...(statusFilter !== 'all' && { status: statusFilter }),
  };

  const { data: quotesResponse, isLoading, error, refetch } = useQuotes(queryParams);
  const quotes = quotesResponse?.quotes || [];
  const pagination = quotesResponse?.pagination;

  // Filter quotes by search term (client-side for now)
  const filteredQuotes = quotes.filter(quote => 
    searchTerm === '' || 
    quote.quote_ref?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quote.clients?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">All Quotes</h1>
          <p className="text-gray-600 mt-1">
            Manage and track all your travel quotes
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={isLoading}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Link href="/dashboard">
            <Button 
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Quote
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by quote number or client name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
              <Select value={`${sortBy}-${sortOrder}`} onValueChange={(value) => {
                const [field, order] = value.split('-');
                setSortBy(field);
                setSortOrder(order as 'asc' | 'desc');
                setCurrentPage(1);
              }}>
                <SelectTrigger className="w-48">
                  <ArrowUpDown className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="created_at-desc">Newest First</SelectItem>
                  <SelectItem value="created_at-asc">Oldest First</SelectItem>
                  <SelectItem value="final_total_idr-desc">Highest Price</SelectItem>
                  <SelectItem value="final_total_idr-asc">Lowest Price</SelectItem>
                  <SelectItem value="travel_start-desc">Latest Check-in</SelectItem>
                  <SelectItem value="travel_start-asc">Earliest Check-in</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quotes List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Quotes ({pagination?.total || filteredQuotes.length})</CardTitle>
              <CardDescription>
                {isLoading ? 'Loading...' : `Showing ${filteredQuotes.length} quotes`}
              </CardDescription>
            </div>
            {!isLoading && (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-600 font-medium">Live Data</span>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading quotes...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-500">
              <XCircle className="w-8 h-8 mx-auto mb-4" />
              <p className="font-medium">Failed to load quotes</p>
              <p className="text-sm text-gray-600 mt-1">Please try refreshing the page</p>
              <Button 
                variant="outline" 
                onClick={() => refetch()} 
                className="mt-4"
              >
                Try Again
              </Button>
            </div>
          ) : filteredQuotes.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <FileText className="w-8 h-8 mx-auto mb-4" />
              <p className="font-medium">No quotes found</p>
              <p className="text-sm mt-1">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filters'
                  : 'Create your first quote to get started'
                }
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredQuotes.map((quote) => (
                <div 
                  key={quote.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4 flex-1">
                    {getStatusIcon(quote.status)}
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-gray-900">{quote.quote_ref}</span>
                        <Badge className={`text-xs ${getStatusColor(quote.status)}`}>
                          {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        <span className="font-medium">{quote.clients?.name || 'Unknown Client'}</span>
                        {quote.travel_start && quote.travel_end && (
                      <span> • {formatDate(quote.travel_start)} - {formatDate(quote.travel_end)}</span>
                    )}
                    <span> • {quote.pax} travelers</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-medium text-gray-900">
                        {formatCurrency(quote.final_total_idr || 0)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatDate(quote.created_at)}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/quotes/${quote.id}`)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      {quote.pdf_url && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(quote.pdf_url!, '_blank')}
                        >
                          <Download className="w-4 h-4 mr-1" />
                          PDF
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Pagination */}
          {pagination && pagination.total > itemsPerPage && (
            <div className="flex items-center justify-between mt-6 pt-4 border-t">
              <div className="text-sm text-gray-600">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, pagination.total)} of {pagination.total} quotes
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1 || isLoading}
                >
                  Previous
                </Button>
                <span className="text-sm text-gray-600 px-3">
                  Page {currentPage} of {Math.ceil(pagination.total / itemsPerPage)}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  disabled={!pagination.hasMore || isLoading}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}