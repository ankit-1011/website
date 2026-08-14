// Example environment file - Copy this to environment.ts and environment.prod.ts
// and fill in your actual values
export const environment = {
  production: false, // Set to true for production
  /** Set true when the CX page is ready for public search indexing. */
  cxPageIndexable: false,
  cxPlaceholderAudit: true,
  cxAllowPlaceholders: true,
  emailjs: {
    publicKey: 'YOUR_EMAILJS_PUBLIC_KEY',
    serviceID: 'YOUR_SERVICE_ID',
    templateID: 'YOUR_TEMPLATE_ID'
  }
};

