import { Component, HostListener, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isScrolled = false;
  mobileMenuOpen = false;
  currentPath = '';

  navItems = [
    { name: 'TrustBridge', path: '/trustbridge' },
    { name: 'SLM Factory', path: '/slm-factory' },
    { name: 'Platform', path: '/platform' },
    { name: 'About', path: '/about' }
  ];

  isHeroVisible = true;

  private router = inject(Router);

  constructor() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.currentPath = event.urlAfterRedirects;
          this.mobileMenuOpen = false;
        }
      });
  }

  ngOnInit() {
    this.currentPath = this.router.url;
    setTimeout(() => {
      this.onWindowScroll();
    }, 100);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
    this.isHeroVisible = true;
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  isActive(path: string): boolean {
    const url = this.currentPath.split('?')[0].split('#')[0];
    return url === path || url.startsWith(`${path}/`);
  }

  isCxActive(): boolean {
    const url = this.currentPath.split('?')[0].split('#')[0];
    return (
      url === '/cx' ||
      url.startsWith('/cx/') ||
      url === '/cx-solutions' ||
      url.startsWith('/cx-solutions/')
    );
  }
}
