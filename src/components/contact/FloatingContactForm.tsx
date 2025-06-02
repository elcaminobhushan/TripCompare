import React, { useState } from 'react';
import { X, Send, Phone, CheckCircle } from 'lucide-react';

interface FloatingContactFormProps {
  isOpen: boolean;
  onClose: () => void;
  packageTitle?: string;
}

const FloatingContactForm: React.FC<FloatingContactFormProps> = ({ isOpen, onClose, packageTitle }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: packageTitle ? `I'm interested in the "${packageTitle}" package` : '',
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    setShowSuccess(true);
    
    // Close the success message and form after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: packageTitle ? `I'm interested in the "${packageTitle}" package` : '',
      });
    }, 3000);
  };

  if (!isOpen) return null;

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 text-center animate-[slideIn_0.3s_ease-out]">
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 rounded-full p-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2">Request Received!</h3>
          <p className="text-gray-600">
            Thank you for your interest. Our team will contact you within 24 hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md relative animate-[slideIn_0.3s_ease-out]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-primary-100 p-3 rounded-full">
              <Phone className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Request Callback</h3>
              <p className="text-gray-600">We'll get back to you within 24 hours</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input w-full"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input w-full"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="input w-full"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="input w-full h-24 resize-none"
                required
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full py-3 flex items-center justify-center"
            >
              <Send className="h-4 w-4 mr-2" />
              Send Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FloatingContactForm;