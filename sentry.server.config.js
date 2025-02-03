// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';
import { ProfilingIntegration } from '@sentry/profiling-node';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;
const reportingEnv = process.env.REPORTING_ENV;

Sentry.init({
  dsn:
    SENTRY_DSN ||
    'https://230c3e2b8e854ea081a40a7496a450d9@o510168.ingest.sentry.io/5610645',
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
  environment: reportingEnv ?? 'internal_dev',
  integrations: [
    // Add profiling integration to list of integrations
    new ProfilingIntegration(),
  ],
  // ...
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});
