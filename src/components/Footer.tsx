import { Mail, Phone, MapPin, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-t border-yellow-600/20 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-yellow-500 font-bold text-lg mb-4">Watika Gardenia</h3>
            <p className="text-sm text-gray-400">
              Experience the finest dining with our curated menu of authentic dishes. 
              Order online and enjoy restaurant-quality food at your doorstep.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-yellow-500 font-bold text-lg mb-4">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-yellow-500" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-yellow-500" />
                <span>info@watika-gardenia.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-yellow-500" />
                <span>123 Garden Street, Delhi</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-yellow-500 font-bold text-lg mb-4">Opening Hours</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Monday - Friday</span>
                <span className="text-gray-400">11:00 AM - 11:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday - Sunday</span>
                <span className="text-gray-400">10:00 AM - 12:00 AM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p className="flex items-center justify-center space-x-1">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>by Watika Gardenia Team © 2024</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
