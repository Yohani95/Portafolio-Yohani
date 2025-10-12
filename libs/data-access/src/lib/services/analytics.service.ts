import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private platformId = inject(PLATFORM_ID);

  /**
   * Track CV download events
   */
  trackCVDownload(source: 'header' | 'about' | 'footer'): void {
    if (isPlatformBrowser(this.platformId)) {
      const event = {
        event: 'cv_download',
        source,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
      };

      // Log to console for development
      console.log('📊 CV Download Tracked:', event);

      // Store in localStorage for basic analytics
      this.storeEvent(event);

      // In production, you would send this to your analytics service
      // Example: Google Analytics, Mixpanel, etc.
      this.sendToAnalytics(event);
    }
  }

  /**
   * Track page views
   */
  trackPageView(page: string): void {
    if (isPlatformBrowser(this.platformId)) {
      const event = {
        event: 'page_view',
        page,
        timestamp: new Date().toISOString(),
        url: window.location.href,
      };

      console.log('📊 Page View Tracked:', event);
      this.storeEvent(event);
    }
  }

  /**
   * Track project interactions
   */
  trackProjectInteraction(
    action: 'view' | 'github_click' | 'demo_click',
    projectName: string
  ): void {
    if (isPlatformBrowser(this.platformId)) {
      const event = {
        event: 'project_interaction',
        action,
        project_name: projectName,
        timestamp: new Date().toISOString(),
        url: window.location.href,
      };

      console.log('📊 Project Interaction Tracked:', event);
      this.storeEvent(event);
    }
  }

  /**
   * Track contact form submissions
   */
  trackContactSubmission(status: 'success' | 'error'): void {
    if (isPlatformBrowser(this.platformId)) {
      const event = {
        event: 'contact_submission',
        status,
        timestamp: new Date().toISOString(),
        url: window.location.href,
      };

      console.log('📊 Contact Submission Tracked:', event);
      this.storeEvent(event);
    }
  }

  /**
   * Get analytics summary
   */
  getAnalyticsSummary(): Record<string, number | Record<string, number>> | null {
    if (isPlatformBrowser(this.platformId)) {
      const events = this.getStoredEvents();
      const summary = {
        total_cv_downloads: events.filter((e) => e['event'] === 'cv_download').length,
        cv_downloads_by_source: this.groupBy(
          events.filter((e) => e['event'] === 'cv_download'),
          'source'
        ),
        total_page_views: events.filter((e) => e['event'] === 'page_view').length,
        page_views_by_page: this.groupBy(
          events.filter((e) => e['event'] === 'page_view'),
          'page'
        ),
        total_project_interactions: events.filter((e) => e['event'] === 'project_interaction')
          .length,
        contact_submissions: events.filter((e) => e['event'] === 'contact_submission').length,
      };

      console.log('📊 Analytics Summary:', summary);
      return summary;
    }
    return null;
  }

  private storeEvent(event: Record<string, string>): void {
    try {
      const existingEvents = this.getStoredEvents();
      const updatedEvents = [...existingEvents, event];

      // Keep only last 100 events to prevent localStorage overflow
      if (updatedEvents.length > 100) {
        updatedEvents.splice(0, updatedEvents.length - 100);
      }

      localStorage.setItem('portfolio_analytics', JSON.stringify(updatedEvents));
    } catch (error) {
      console.warn('Failed to store analytics event:', error);
    }
  }

  private getStoredEvents(): Record<string, string>[] {
    try {
      const stored = localStorage.getItem('portfolio_analytics');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.warn('Failed to retrieve analytics events:', error);
      return [];
    }
  }

  private groupBy(array: Record<string, string>[], key: string): Record<string, number> {
    return array.reduce((groups: Record<string, number>, item) => {
      const group = item[key];
      groups[group] = groups[group] || 0;
      groups[group]++;
      return groups;
    }, {});
  }

  private sendToAnalytics(event: Record<string, string>): void {
    // In a real implementation, you would send to your analytics service
    // Examples:

    // Google Analytics 4
    // gtag('event', event.event, {
    //   event_category: 'engagement',
    //   event_label: event.source,
    //   value: 1
    // });

    // Mixpanel
    // mixpanel.track(event.event, event);

    // Custom endpoint
    // fetch('/api/analytics', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(event)
    // }).catch(err => console.warn('Analytics send failed:', err));

    console.log('📤 Would send to analytics service:', event);
  }
}
