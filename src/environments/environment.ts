// Development environment configuration
export const environment = {
  production: false,
  /** Set true when the CX page is ready for public search indexing. */
  cxPageIndexable: false,
  /** Dev-only: highlight .ph markers without ?cx-ph=1 */
  cxPlaceholderAudit: true,
  /** When false, production build fails if .ph remains (see verify:cx-placeholders). */
  cxAllowPlaceholders: true,
  emailjs: {
    publicKey: 'lJc4Nvs6jKMPEDH4r',
    serviceID: 'service_ykrwavt',
    templateID: 'template_ddb2tcf'
  }
};

