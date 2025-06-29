import { auth } from '@clerk/nextjs/server'
'use client';

import { useState } from 'react'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  BarChart3,
  DollarSign,
  FileText,
  TrendingUp,
  Users,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
  Calendar
} from 'lucide-react'
import Link from 'next/link'
import { formatCurrency, formatDate } from '@/lib/utils'
import { useQuotes } from '@/hooks/use-quotes'
import { CreateQuoteModal } from '@/components/dashboard/create-quote-modal'
import EmptyState from '@/components/dashboard/empty-state'
import { useUser } from '@clerk/nextjs'

function getStatusIcon(status: string) {
  switch (status) {
    case 'confirmed':
      return <CheckCircle className="w-4 h-4 text-green-600" />
    case 'sent':
      return <Clock className="w-4 h-4 text-blue-600" />
    case 'expired':
      return <XCircle className="w-4 h-4 text-red-600" />
    case 'draft':
      return <AlertCircle className="w-4 h-4 text-yellow-600" />
    default:
      return <Clock className="w-4 h-4 text-gray-600" />
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case 'confirmed':
      return 'text-green-700 bg-green-50 border-green-200'
    case 'sent':
      return 'text-blue-700 bg-blue-50 border-blue-200'
    case 'expired':
      return 'text-red-700 bg-red-50 border-red-200'
    case 'draft':
      return 'text-yellow-700 bg-yellow-50 border-yellow-200'
    default:
      return 'text-gray-700 bg-gray-50 border-gray-200'
  }
}

export default function DashboardPage() {
  const { userId } = useAuth()
  const { user } = useUser()
  const { data: quotesResponse, isLoading, error } = useQuotes()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const router = useRouter()
  
  if (!userId) {
    redirect('/')
  }

  const quotes = quotesResponse?.quotes || []
  
  // Show empty state for new users with no quotes
  if (!isLoading && quotes.length === 0) {
    return (
      <div>
        <EmptyState userName={user?.firstName || user?.fullName || 'Travel Agent'} />
        <CreateQuoteModal 
          isOpen={isCreateModalOpen} 
          onClose={() => setIsCreateModalOpen(false)} 
        />
      </div>
    )
  }
  
  // Calculate stats from real data
  const stats = {
    totalQuotes: quotes.length,
    totalRevenue: quotes.reduce((sum: number, quote: any) => sum + (quote.final_price_idr || 0), 0),
    pendingQuotes: quotes.filter(q => q.status === 'sent').length,
    confirmedBookings: quotes.filter(q => q.status === 'confirmed').length,
    expiredQuotes: quotes.filter(q => q.status === 'expired').length,
    draftQuotes: quotes.filter(q => q.status === 'draft').length,
    activeClients: new Set(quotes.map(q => q.clients?.full_name)).size,
    conversionRate: quotes.length > 0 ? quotes.filter(q => q.status === 'confirmed').length / quotes.length : 0
  }
  
  // Get recent quotes (last 4)
  const recentQuotes = quotes.slice(0, 4)

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome back! Here's what's happening with your travel business.
          </p>
        </div>
        <Button 
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Quote
        </Button>
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
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                formatCurrency(stats.totalRevenue)
              )}
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
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                stats.totalQuotes
              )}
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
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                stats.activeClients
              )}
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
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                `${(stats.conversionRate * 100).toFixed(1)}%`
              )}
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
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => setIsCreateModalOpen(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create New Quote
            </Button>
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
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span className="ml-2 text-gray-600">Loading quotes...</span>
              </div>
            ) : error ? (
              <div className="text-center py-8 text-red-600">
                <XCircle className="w-8 h-8 mx-auto mb-2" />
                <p>Failed to load quotes</p>
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
                        <div className="font-medium text-gray-900">{quote.quote_number}</div>
                        <div className="text-sm text-gray-600">
                          {quote.clients?.full_name || 'Unknown Client'} • {quote.check_in_date} - {quote.check_out_date}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-900">
                        IDR {quote.final_price_idr?.toLocaleString() || 0}
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

      {/* Performance Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">This Month's Performance</CardTitle>
            <CardDescription>
              Key metrics for January 2024
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Quotes Created</span>
              <span className="font-medium">{stats.totalQuotes}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Confirmed Bookings</span>
              <span className="font-medium text-green-600">{stats.confirmedBookings}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Pending Quotes</span>
              <span className="font-medium text-blue-600">{stats.pendingQuotes}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Draft Quotes</span>
              <span className="font-medium text-yellow-600">{stats.draftQuotes}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Expired Quotes</span>
              <span className="font-medium text-red-600">{stats.expiredQuotes}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Revenue Breakdown</CardTitle>
            <CardDescription>
              Revenue sources this month
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Hotel Bookings</span>
              <span className="font-medium">{formatCurrency(75000000)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Transport Services</span>
              <span className="font-medium">{formatCurrency(35000000)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Tour Packages</span>
              <span className="font-medium">{formatCurrency(15000000)}</span>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between items-center font-medium">
                <span className="text-gray-900">Total Revenue</span>
                <span className="text-gray-900">{formatCurrency(stats.totalRevenue)}</span>
              </div>
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
  )
}