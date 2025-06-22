import { Brain, Twitter, Github, Linkedin } from "lucide-react";

export function Footer() {
  const links = {
    product: [
      { name: "Jobs", href: "/jobs" },
      { name: "Mock Interviews", href: "/interviews" },
      { name: "For Recruiters", href: "/recruiters" },
      { name: "Pricing", href: "#pricing" },
    ],
    company: [
      { name: "About", href: "/about" },
      { name: "Blog", href: "/blog" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" },
    ],
    resources: [
      { name: "Help Center", href: "/help" },
      { name: "Interview Tips", href: "/tips" },
      { name: "Career Guides", href: "/guides" },
      { name: "API Docs", href: "/api-docs" },
    ],
    legal: [
      { name: "Privacy", href: "/privacy" },
      { name: "Terms", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "GDPR", href: "/gdpr" },
    ],
  };

  const socialLinks = [
    { name: "Twitter", href: "#", icon: Twitter },
    { name: "GitHub", href: "#", icon: Github },
    { name: "LinkedIn", href: "#", icon: Linkedin },
  ];

  return (
    <footer className="bg-black-primary border-t border-black-tertiary">
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 gradient-orange rounded-xl flex items-center justify-center">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-primary tracking-tight">
                AI<span className="text-orange-primary">PORTAL</span>
              </span>
            </div>
            <p className="text-gray-muted mb-8 max-w-sm leading-relaxed text-lg">
              Empowering careers with cutting-edge AI technology and intelligent job matching.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-12 h-12 glass-effect border border-black-tertiary rounded-xl flex items-center justify-center hover:border-orange-primary hover:glow-orange transition-all duration-300 group"
                >
                  <social.icon className="w-6 h-6 text-gray-muted group-hover:text-orange-primary transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-gray-primary font-bold mb-8 text-lg tracking-wider uppercase">PRODUCT</h3>
            <ul className="space-y-4">
              {links.product.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-muted hover:text-orange-primary transition-colors duration-300 text-lg">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-gray-primary font-bold mb-8 text-lg tracking-wider uppercase">COMPANY</h3>
            <ul className="space-y-4">
              {links.company.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-muted hover:text-orange-primary transition-colors duration-300 text-lg">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-gray-primary font-bold mb-8 text-lg tracking-wider uppercase">RESOURCES</h3>
            <ul className="space-y-4">
              {links.resources.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-muted hover:text-orange-primary transition-colors duration-300 text-lg">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-gray-primary font-bold mb-8 text-lg tracking-wider uppercase">LEGAL</h3>
            <ul className="space-y-4">
              {links.legal.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-muted hover:text-orange-primary transition-colors duration-300 text-lg">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-black-tertiary mt-16 pt-12 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-muted text-lg">
            © 2025 AI PORTAL. All rights reserved.
          </p>
          <p className="text-gray-muted text-lg mt-4 md:mt-0">
            Made with <span className="text-orange-primary">❤️</span> for ambitious professionals
          </p>
        </div>
      </div>
    </footer>
  );
}