// Production environment configuration
// IMPORTANT: Replace these values with your production EmailJS credentials
// Never commit actual production keys to version control
export const environment = {
  production: true,
  /** Set true when the CX page is ready for public search indexing. */
  cxPageIndexable: false,
  cxPlaceholderAudit: false,
  /** Launch gate: must stay false until all .ph markers are removed. */
  cxAllowPlaceholders: false,
  emailjs: {
    publicKey: 'lJc4Nvs6jKMPEDH4r',
    serviceID: 'service_ykrwavt', // Update if different for production
    templateID: 'template_ddb2tcf' // Update if different for production
  }
};

