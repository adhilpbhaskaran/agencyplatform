'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, RefreshCw, Clock, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface AutomationStatus {
  component: string;
  recent_updates: number;
  last_update: string | null;
  active_jobs: number;
}

interface ExchangeRate {
  currency_code: string;
  rate_to_idr: number;
  last_updated: string;
  source: string;
}

interface CronJob {
  jobid: number;
  schedule: string;
  command: string;
  active: boolean;
  jobname: string;
}

interface QuoteExpiryResult {
  expired_count: number;
  time_expired_count: number;
  fx_expired_count: number;
}

export default function AutomationPage() {
  const [automationStatus, setAutomationStatus] = useState<AutomationStatus[]>([]);
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>([]);
  const [cronJobs, setCronJobs] = useState<CronJob[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdatingFX, setIsUpdatingFX] = useState(false);
  const [isRunningExpiry, setIsRunningExpiry] = useState(false);
  const [lastExpiryResult, setLastExpiryResult] = useState<QuoteExpiryResult | null>(null);

  useEffect(() => {
    fetchAutomationData();
  }, []);

  const fetchAutomationData = async () => {
    try {
      setIsLoading(true);
      
      // Fetch automation status
      const statusResponse = await fetch('/api/admin/automation/status');
      if (statusResponse.ok) {
        const statusData = await statusResponse.json();
        setAutomationStatus(statusData.status || []);
      }
      
      // Fetch current exchange rates
      const ratesResponse = await fetch('/api/admin/automation/exchange-rates');
      if (ratesResponse.ok) {
        const ratesData = await ratesResponse.json();
        setExchangeRates(ratesData.rates || []);
      }
      
      // Fetch cron jobs status
      const cronResponse = await fetch('/api/admin/automation/cron-jobs');
      if (cronResponse.ok) {
        const cronData = await cronResponse.json();
        setCronJobs(cronData.jobs || []);
      }
    } catch (error) {
      console.error('Failed to fetch automation data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const triggerFXUpdate = async () => {
    setIsUpdatingFX(true);
    try {
      const response = await fetch('/api/admin/automation/trigger-fx-update', {
        method: 'POST'
      });
      
      if (response.ok) {
        alert('FX update triggered successfully!');
        // Refresh data after a short delay
        setTimeout(() => {
          fetchAutomationData();
        }, 2000);
      } else {
        const errorData = await response.json();
        alert(`Failed to trigger FX update: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Failed to trigger FX update:', error);
      alert('Failed to trigger FX update');
    } finally {
      setIsUpdatingFX(false);
    }
  };

  const triggerQuoteExpiry = async () => {
    setIsRunningExpiry(true);
    try {
      const response = await fetch('/api/admin/automation/trigger-quote-expiry', {
        method: 'POST'
      });
      
      if (response.ok) {
        const result = await response.json();
        setLastExpiryResult(result.result);
        alert(`Quote expiry completed: ${result.result.expired_count} quotes expired`);
        fetchAutomationData();
      } else {
        const errorData = await response.json();
        alert(`Failed to run quote expiry: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Failed to trigger quote expiry:', error);
      alert('Failed to trigger quote expiry');
    } finally {
      setIsRunningExpiry(false);
    }
  };

  const getStatusColor = (component: string, recentUpdates: number, activeJobs: number) => {
    if (activeJobs === 0) return 'destructive';
    if (component === 'Exchange Rates' && recentUpdates === 0) return 'secondary';
    return 'default';
  };

  const getStatusIcon = (component: string, recentUpdates: number, activeJobs: number) => {
    if (activeJobs === 0) return <AlertTriangle className="h-4 w-4" />;
    if (component === 'Exchange Rates' && recentUpdates === 0) return <Clock className="h-4 w-4" />;
    return <CheckCircle className="h-4 w-4" />;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Platform Automation & Intelligence</h1>
        <p className="text-gray-600 mt-2">
          Monitor and manage automated processes for exchange rates and quote expiry.
        </p>
      </div>

      {/* Automation Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {automationStatus.map((status) => (
          <Card key={status.component}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{status.component}</CardTitle>
              {getStatusIcon(status.component, status.recent_updates, status.active_jobs)}
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status:</span>
                  <Badge variant={getStatusColor(status.component, status.recent_updates, status.active_jobs)}>
                    {status.active_jobs > 0 ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Recent Updates:</span>
                  <span className="text-sm font-medium">{status.recent_updates}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Last Update:</span>
                  <span className="text-sm">
                    {status.last_update ? formatDate(status.last_update) : 'Never'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Manual Controls */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Manual Controls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button
              onClick={triggerFXUpdate}
              disabled={isUpdatingFX}
              className="flex items-center gap-2"
            >
              {isUpdatingFX ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <TrendingUp className="h-4 w-4" />
              )}
              Update Exchange Rates
            </Button>
            
            <Button
              onClick={triggerQuoteExpiry}
              disabled={isRunningExpiry}
              variant="outline"
              className="flex items-center gap-2"
            >
              {isRunningExpiry ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Clock className="h-4 w-4" />
              )}
              Run Quote Expiry
            </Button>
            
            <Button
              onClick={fetchAutomationData}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh Data
            </Button>
          </div>
          
          {lastExpiryResult && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Last Expiry Run Results:</h4>
              <div className="text-sm text-blue-800 space-y-1">
                <div>Total Expired: {lastExpiryResult.expired_count}</div>
                <div>Time-based Expiry: {lastExpiryResult.time_expired_count}</div>
                <div>FX Drift Expiry: {lastExpiryResult.fx_expired_count}</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Current Exchange Rates */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Current Exchange Rates</CardTitle>
        </CardHeader>
        <CardContent>
          {exchangeRates.length === 0 ? (
            <p className="text-gray-600">No exchange rates available</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {exchangeRates.map((rate) => (
                <div key={rate.currency_code} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{rate.currency_code}</span>
                    <Badge variant="outline">{rate.source}</Badge>
                  </div>
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {rate.rate_to_idr.toFixed(6)}
                  </div>
                  <div className="text-xs text-gray-500">
                    Updated: {formatDate(rate.last_updated)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Cron Jobs Status */}
      <Card>
        <CardHeader>
          <CardTitle>Scheduled Jobs</CardTitle>
        </CardHeader>
        <CardContent>
          {cronJobs.length === 0 ? (
            <p className="text-gray-600">No scheduled jobs found</p>
          ) : (
            <div className="space-y-4">
              {cronJobs.map((job) => (
                <div key={job.jobid} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{job.jobname}</h4>
                    <Badge variant={job.active ? 'default' : 'destructive'}>
                      {job.active ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>Schedule: {job.schedule}</div>
                    <div className="font-mono text-xs bg-gray-100 p-2 rounded">
                      {job.command}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}