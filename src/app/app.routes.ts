import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent)
  },
  {
    path: 'cx',
    loadComponent: () => import('./pages/cx/cx.component').then(m => m.CxComponent)
  },
  {
    path: 'cx-solutions',
    loadComponent: () =>
      import('./pages/cx-solutions/cx-solutions.component').then(m => m.CxSolutionsComponent)
  },
  {
    path: 'trustbridge',
    loadComponent: () =>
      import('./pages/trustbridge/trustbridge.component').then(m => m.TrustbridgeComponent)
  },
  {
    path: 'slm-factory',
    loadComponent: () =>
      import('./pages/slm-factory/slm-factory.component').then(m => m.SlmFactoryComponent)
  },
  {
    path: 'platform',
    loadComponent: () => import('./pages/platform/platform.component').then(m => m.PlatformComponent)
  },
  {
    path: 'use-cases',
    loadComponent: () => import('./pages/use-cases/use-cases.component').then(m => m.UseCasesComponent)
  },
  // {
  //   path: 'pricing',
  //   loadComponent: () => import('./pages/pricing/pricing.component').then(m => m.PricingComponent)
  // },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent)
  },
   {
    path: 'privacy-policy',
    loadComponent: () => import('./pages/privacy/privacy.component').then(m => m.PrivacyComponent)
  },
  {
    path: 'terms-of-services',
    loadComponent: () => import('./pages/terms-of-services/terms-of-services.component').then(m => m.TermsOfServicesComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

