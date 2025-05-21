import Link from 'next/link';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react'; // Assuming you have lucide-react installed

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12 py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          {/* Section 1: Brand Info */}
          <div className="col-span-1">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Abrar Shop</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Your one-stop destination for quality products and exceptional service.
            </p>
          </div>

          {/* Section 2: Shop Links */}
          <div className="col-span-1">
            <h4 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/categories" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Categories</Link></li>
              <li><Link href="/new-arrivals" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">New Arrivals</Link></li>
              <li><Link href="/best-sellers" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Best Sellers</Link></li>
              <li><Link href="/sale" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Sale Items</Link></li>
            </ul>
          </div>

          {/* Section 3: Support Links */}
          <div className="col-span-1">
            <h4 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">FAQ</Link></li>
              <li><Link href="/shipping-returns" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/privacy-policy" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Section 4: Connect & Social Media */}
          <div className="col-span-1">
            <h4 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-4">Connect With Us</h4>
            <div className="flex justify-center md:justify-start space-x-4 mb-4">
              <a href="https://facebook.com/abrarshopbd" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <Facebook size={24} />
              </a>
              <a href="https://instagram.com/abrarshopbd" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <Instagram size={24} />
              </a>
              <a href="https://twitter.com/abrarshopbd" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <Twitter size={24} />
              </a>
              <a href="https://linkedin.com/company/abrarshopbd" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <Linkedin size={24} />
              </a>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Stay updated with our latest offers and news!
            </p>
          </div>
        </div>

        {/* Separator */}
        <hr className="my-8 border-gray-300 dark:border-gray-600" />

        {/* Bottom Bar: Copyright and Powered By */}
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; {currentYear} Abrar Shop. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            Powered by Sofol IT.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;