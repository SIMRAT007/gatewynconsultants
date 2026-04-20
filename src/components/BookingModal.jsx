import { useState } from 'react';
import { X, Calendar, Clock, Video } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function BookingModal({ isOpen, onClose, consultantEmail }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    message: ''
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleClose = () => {
    setFormData({ name: '', email: '', phone: '', date: '', time: '', message: '' });
    setSent(false);
    setError('');
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError('');

    // Check if EmailJS is configured
    const SERVICE_ID = 'YOUR_SERVICE_ID';
    const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
    const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

    if (SERVICE_ID === 'YOUR_SERVICE_ID' || TEMPLATE_ID === 'YOUR_TEMPLATE_ID' || PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
      // EmailJS not configured - show demo success
      console.log('📋 BOOKING DETAILS (EmailJS not configured yet):');
      console.log('Name:', formData.name);
      console.log('Email:', formData.email);
      console.log('Phone:', formData.phone);
      console.log('Date:', formData.date);
      console.log('Time:', formData.time);
      console.log('Message:', formData.message);
      console.log('Consultant Email:', consultantEmail);
      console.log('\n⚠️ To enable email sending, follow EMAILJS_SETUP_GUIDE.md');
      
      setSending(false);
      setSent(true);
      setTimeout(() => {
        onClose();
        setSent(false);
        setFormData({ name: '', email: '', phone: '', date: '', time: '', message: '' });
      }, 3000);
      return;
    }

    try {
      // Generate Google Meet link (you'll need to set this up in EmailJS template)
      const meetingLink = `https://meet.google.com/${Math.random().toString(36).substring(7)}`;
      
      // Send email to consultant
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          to_email: consultantEmail,
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          date: formData.date,
          time: formData.time,
          message: formData.message,
          meeting_link: meetingLink,
          email_type: 'consultant'
        },
        PUBLIC_KEY
      );

      // Send confirmation email to user
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          to_email: formData.email,
          to_name: formData.name,
          consultant_email: consultantEmail,
          date: formData.date,
          time: formData.time,
          meeting_link: meetingLink,
          email_type: 'user'
        },
        PUBLIC_KEY
      );

      setSent(true);
      setTimeout(() => {
        onClose();
        setSent(false);
        setFormData({ name: '', email: '', phone: '', date: '', time: '', message: '' });
      }, 3000);
    } catch (err) {
      setError('Failed to send booking request. Please try again.');
      console.error('EmailJS Error:', err);
    } finally {
      setSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-[#142845]/90 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#142845] to-[#1e3a63] text-white px-6 sm:px-8 py-6 flex items-center justify-between z-10 rounded-t-3xl">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold flex items-center gap-3">
              <Video size={28} className="text-[#E7CD87]" />
              Schedule Consultation
            </h2>
            <p className="text-white/60 text-sm mt-1">Book your free 15-minute Google Meet session</p>
          </div>
          <button
            onClick={handleClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all duration-300"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 sm:px-8 py-8 overflow-y-auto max-h-[calc(90vh-100px)]">
          {sent ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-[#142845] mb-3">Booking Received! 🎉</h3>
              <p className="text-gray-600 mb-2">Your booking details have been recorded.</p>
              <p className="text-sm text-gray-500">Check the browser console to see the booking details.</p>
              <p className="text-xs text-blue-600 mt-4">💡 To enable email notifications, set up EmailJS (see guide)</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-wide mb-2 font-semibold">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#E7CD87] focus:outline-none transition-colors text-sm"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-wide mb-2 font-semibold">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#E7CD87] focus:outline-none transition-colors text-sm"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs text-gray-500 uppercase tracking-wide mb-2 font-semibold">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#E7CD87] focus:outline-none transition-colors text-sm"
                  placeholder="+44 123 456 7890"
                />
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-wide mb-2 font-semibold flex items-center gap-2">
                    <Calendar size={14} />
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#E7CD87] focus:outline-none transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-wide mb-2 font-semibold flex items-center gap-2">
                    <Clock size={14} />
                    Preferred Time *
                  </label>
                  <select
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#E7CD87] focus:outline-none transition-colors text-sm"
                  >
                    <option value="">Select time</option>
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="01:00 PM">01:00 PM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="03:00 PM">03:00 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                    <option value="05:00 PM">05:00 PM</option>
                    <option value="06:00 PM">06:00 PM</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs text-gray-500 uppercase tracking-wide mb-2 font-semibold">
                  What would you like to discuss?
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#E7CD87] focus:outline-none transition-colors text-sm resize-none"
                  placeholder="Tell us about your study abroad goals..."
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
                  {error}
                </div>
              )}

              {/* Info Box */}
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                <p className="text-sm text-blue-800 flex items-center gap-2">
                  <Video size={16} />
                  <span>You'll receive a Google Meet link via email after booking</span>
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={sending}
                className="w-full btn-gold py-4 rounded-xl font-semibold text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sending ? 'Scheduling...' : 'Schedule Free Consultation'}
              </button>

              <p className="text-center text-xs text-gray-400">
                No obligation · 100% confidential · Response within 24 hours
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
