import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  // Footer links data
  footerLinks = [
    {
      title: 'Product',
      links: [
        { name: 'Features', url: '#' },
        { name: 'Pricing', url: '#' },
        { name: 'Templates', url: '#' },
        { name: 'Changelog', url: '#' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', url: '#' },
        { name: 'Careers', url: '#' },
        { name: 'Blog', url: '#' },
        { name: 'Press', url: '#' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', url: '#' },
        { name: 'API Documentation', url: '#' },
        { name: 'Community', url: '#' },
        { name: 'Contact Us', url: '#' }
      ]
    }
  ];

  socialLinks = [
    { name: 'Twitter', icon: 'fab fa-twitter', url: '#' },
    { name: 'Facebook', icon: 'fab fa-facebook', url: '#' },
    { name: 'Instagram', icon: 'fab fa-instagram', url: '#' },
    { name: 'LinkedIn', icon: 'fab fa-linkedin', url: '#' },
    { name: 'GitHub', icon: 'fab fa-github', url: '#' }
  ];
}
