import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ImagePlus, X, ShieldCheck } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';

const CATEGORIES = [
  'Electronics',
  'Bags',
  'Jewelry',
  'Accessories',
  'Wallets & IDs',
  'Keys',
  'Books & Stationery',
  'Other',
];

export default function ReportItem() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialType = searchParams.get('type') === 'found' ? 'found' : 'lost';

  const [type, setType] = useState(initialType);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [campusLocation, setCampusLocation] = useState('');
  const [dateOccurred, setDateOccurred] = useState('');
  const [description, setDescription] = useState('');
  const [verificationQuestion, setVerificationQuestion] = useState('');
  const [contactInfo, setContactInfo] = useState(user?.email || '');

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Sync toggle if URL query (?type=found or ?type=lost) changes
  useEffect(() => {
    const paramType = searchParams.get('type');
    if (paramType === 'found' || paramType === 'lost') {
      setType(paramType);
    }
  }, [searchParams]);

  // Pre-fill contact info once user context finishes loading
  useEffect(() => {
    if (user?.email && !contactInfo) {
      setContactInfo(user.email);
    }
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!category) {
      return setError('Please select a category.');
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('type', type);
      formData.append('title', title);
      formData.append('category', category);
      formData.append('campus_location', campusLocation);
      formData.append('date_occurred', dateOccurred);
      formData.append('description', description);
      formData.append('contact_info', contactInfo);

      if (type === 'found' && verificationQuestion.trim()) {
        formData.append('verification_question', verificationQuestion.trim());
      }

      if (imageFile) {
        formData.append('image', imageFile);
      }

      await api.post('/items', formData);
      navigate(type === 'lost' ? '/lost' : '/found');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit report. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-white flex flex-col justify-between">
      <main className="w-full max-w-[680px] mx-auto px-4 sm:px-6 pt-12 pb-20">
        {/* Page Heading */}
        <div className="mb-7">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Report an Item
          </h1>
          <p className="text-base text-gray-500 mt-1.5">
            Please provide as much detail as possible to help with identification.
          </p>
        </div>

        {/* Form Card */}
        <div className="w-full bg-white rounded-xl border border-gray-200 p-7 sm:p-9">
          {error && (
            <div className="mb-6 p-3.5 rounded-lg bg-red-50 border border-red-200 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Lost / Found Toggle Buttons */}
          <div className="grid grid-cols-2 gap-3.5 mb-6">
            <button
              type="button"
              onClick={() => setType('lost')}
              className={`py-3 px-4 rounded-lg text-base font-medium transition-colors cursor-pointer ${
                type === 'lost'
                  ? 'bg-[#2B7FFF] text-white'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              I Lost an Item
            </button>

            <button
              type="button"
              onClick={() => setType('found')}
              className={`py-3 px-4 rounded-lg text-base font-medium transition-colors cursor-pointer ${
                type === 'found'
                  ? 'bg-[#2B7FFF] text-white'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              I Found an Item
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Item Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Item Name*
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Black Nike Backpack"
                className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-base text-gray-900 placeholder:text-gray-400 focus:border-[#2B7FFF] focus:outline-none"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Category*
              </label>
              <select
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-gray-100/80 px-3.5 py-2.5 text-base text-gray-900 focus:border-[#2B7FFF] focus:bg-white focus:outline-none"
              >
                <option value="" disabled>
                  Select a category
                </option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Location & Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Location*
                </label>
                <input
                  type="text"
                  required
                  value={campusLocation}
                  onChange={(e) => setCampusLocation(e.target.value)}
                  placeholder="Where was it lost/found?"
                  className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-base text-gray-900 placeholder:text-gray-400 focus:border-[#2B7FFF] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Date*
                </label>
                <input
                  type="date"
                  required
                  value={dateOccurred}
                  onChange={(e) => setDateOccurred(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-base text-gray-900 focus:border-[#2B7FFF] focus:outline-none"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Description*
              </label>
              <textarea
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Color, brand, distinguishing marks, or circumstances..."
                className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-base text-gray-900 placeholder:text-gray-400 focus:border-[#2B7FFF] focus:outline-none resize-y"
              />
            </div>

            {/* Ownership Verification Question (shown when reporting a Found item) */}
            {type === 'found' && (
              <div className="rounded-lg bg-blue-50/60 border border-blue-100 p-4">
                <label className="flex items-center gap-1.5 text-sm font-medium text-gray-800 mb-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#2B7FFF]" />
                  <span>Verification Question (Recommended)</span>
                </label>
                <input
                  type="text"
                  value={verificationQuestion}
                  onChange={(e) => setVerificationQuestion(e.target.value)}
                  placeholder="e.g., What cards are inside or what is the lockscreen wallpaper?"
                  className="w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-base text-gray-900 placeholder:text-gray-400 focus:border-[#2B7FFF] focus:outline-none"
                />
                <p className="text-xs text-gray-500 mt-1.5">
                  Claimants must answer this privately before you approve their claim.
                </p>
              </div>
            )}

            {/* Item Photo Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Item Image (Optional)
              </label>

              {imagePreview ? (
                <div className="relative inline-block">
                  <img
                    src={imagePreview}
                    alt="Item preview"
                    className="h-36 w-auto rounded-lg border border-gray-200 object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 rounded-full bg-gray-900 text-white p-1 hover:bg-red-600 transition-colors cursor-pointer"
                    aria-label="Remove image"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <label className="flex items-center justify-center gap-2.5 w-full rounded-lg border border-dashed border-gray-300 px-4 py-4 text-sm text-gray-600 hover:border-[#2B7FFF] hover:text-[#2B7FFF] transition-colors cursor-pointer">
                  <ImagePlus className="w-5 h-5" />
                  <span>Upload a photo of the item (JPG, PNG, WebP)</span>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Contact Information */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Contact Information*
              </label>
              <input
                type="text"
                required
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                placeholder="Your email or phone number"
                className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-base text-gray-900 placeholder:text-gray-400 focus:border-[#2B7FFF] focus:outline-none"
              />
            </div>

            {/* Cancel & Submit Buttons */}
            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="rounded-lg border border-gray-300 bg-white hover:bg-gray-50 px-5 py-2.5 text-base font-medium text-gray-700 transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={submitting}
                className="rounded-lg bg-[#2B7FFF] hover:bg-[#1E6CEB] px-6 py-2.5 text-base font-medium text-white transition-colors disabled:opacity-60 cursor-pointer"
              >
                {submitting ? 'Submitting...' : 'Submit Report'}
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}