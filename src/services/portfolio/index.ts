/**
 * Portfolio Services Index
 *
 * Exports all portfolio-related services for easy imports throughout the application.
 */

// Export everything from the main portfolio service
export * from './portfolio.service';

// Direct exports of individual services for specific use cases
export * from './education.service';
export * from './experience.service';
export * from './profile.service';
export * from './projects.service';

// Export types
export * from './portfolio.types';
