import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';

const CATEGORY_FILTERS = [
  { label: 'All Items', values: [] },
  { label: 'Electronics', values: ['Electronics'] },
  { label: 'Bags', values: ['Bags'] },
  { label: 'Jewelry', values: ['Jewelry'] },
  { label: 'Accessories', values: ['Accessories'] },
  { label: 'IDs & Keys', values: ['Wallets & IDs', 'Keys'] },
  { label: 'Books & Other', values: ['Books & Stationery', 'Other'] },
];

export default function FoundItems() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All Items');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFoundItems = async () => {
      setLoading(true);
      setError('');
      try {
        const params = { type: 'found' };
        const activeGroup = CATEGORY_FILTERS.find((f) => f.label === selectedFilter);

        if (activeGroup && activeGroup.values.length > 0) {
          params.category = activeGroup.values.join(',');
        }
        if (searchQuery.trim()) {
          params.search = searchQuery.trim();
        }

        const res = await api.get('/items', { params });
        setItems(res.data.items || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Unable to load found items.');
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchFoundItems, 250);
    return () => clearTimeout(debounceTimer);
  }, [selectedFilter, searchQuery]);

  const handleClaimClick = (item) => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate(`/items/${item.id}`);
  };

  const renderStatusBadge = (item) => {
    if (item.status === 'returned') {
      return (
        <span className="inline-block rounded-full bg-gray-100 px-3.5 py-1 text-sm font-medium text-gray-600">
          Returned
        </span>
      );
    }
    if (item.status === 'claimed') {
      return (
        <span className="inline-block rounded-full bg-blue-100 px-3.5 py-1 text-sm font-medium text-[#2B7FFF]">
          Claimed
        </span>
      );
    }
    if (item.pending_claims_count > 0) {
      return (
        <span className="inline-block rounded-full bg-[#FEF3C7] px-3.5 py-1 text-sm font-medium text-[#D97706]">
          Pending
        </span>
      );
    }
    return (
      <span className="inline-block rounded-full bg-[#DCFCE7] px-3.5 py-1 text-sm font-medium text-[#16A34A]">
        Unclaimed
      </span>
    );
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-white flex flex-col justify-between">
      <main className="w-full max-w-7xl mx-auto px-6 sm:px-10 pt-10 pb-20">
        {/* Top Title & Action Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Found Items
          </h1>

          <Link
            to="/post?type=found"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2B7FFF] hover:bg-[#1E6CEB] px-5 py-2.5 text-base font-medium text-white transition-colors self-start sm:self-auto"
          >
            <Plus className="w-5 h-5" />
            <span>Report Found Item</span>
          </Link>
        </div>

        {/* Single-Line Search Input & Category Pills */}
        <div className="flex flex-col xl:flex-row xl:items-center gap-4 mb-10">
          <div className="relative w-full xl:w-[320px] shrink-0">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search found items..."
              className="w-full rounded-lg border border-gray-200 bg-white pl-4 pr-10 py-2.5 text-base text-gray-900 placeholder:text-gray-400 focus:border-[#2B7FFF] focus:outline-none"
            />
            <Search className="w-4 h-4 text-gray-700 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="flex flex-wrap xl:flex-nowrap items-center gap-2">
            {CATEGORY_FILTERS.map((filter) => {
              const isSelected = selectedFilter === filter.label;
              return (
                <button
                  key={filter.label}
                  type="button"
                  onClick={() => setSelectedFilter(filter.label)}
                  className={`rounded-lg px-3.5 py-2 text-base font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#2B7FFF] text-white'
                      : 'bg-[#F3F4F6] text-gray-700 hover:bg-gray-200/80'
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-8 p-4 rounded-lg bg-red-50 border border-red-200 text-base text-red-600">
            {error}
          </div>
        )}

        {/* Loading Skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="animate-pulse">
                <div className="aspect-[4/3] w-full bg-gray-200 rounded-xs" />
                <div className="h-5 bg-gray-200 rounded w-1/2 mt-4" />
                <div className="h-4 bg-gray-200 rounded w-2/3 mt-2" />
                <div className="h-4 bg-gray-200 rounded w-full mt-2" />
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          /* Empty State */
          <div className="text-center py-20 border border-dashed border-gray-200 rounded-xl">
            <p className="text-lg font-medium text-gray-700">
              No found items match your filter.
            </p>
            <p className="text-base text-gray-500 mt-1">
              Try clearing your search or report a found item to help someone out.
            </p>
            <Link
              to="/post?type=found"
              className="inline-flex items-center gap-2 mt-5 rounded-lg bg-[#2B7FFF] hover:bg-[#1E6CEB] px-5 py-2.5 text-base font-medium text-white transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Report Found Item</span>
            </Link>
          </div>
        ) : (
          /* Found Items Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-11">
            {items.map((item) => {
              const isOwner = user && user.id === item.reporter_id;
              const isClosed = item.status === 'claimed' || item.status === 'returned';

              return (
                <div key={item.id} className="flex flex-col justify-between group">
                  <div>
                    {/* 400 x 300 Image / Placeholder */}
                    <div className="aspect-[4/3] w-full bg-[#D1D5DB] overflow-hidden flex items-center justify-center">
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
                        />
                      ) : (
                        <span className="text-3xl font-medium text-gray-500 select-none">
                          400 &times; 300
                        </span>
                      )}
                    </div>

                    {/* Title & Date */}
                    <div className="flex items-baseline justify-between gap-3 mt-4">
                      <h2 className="text-lg font-bold text-gray-900 truncate">
                        {item.title}
                      </h2>
                      <span className="text-sm text-gray-500 shrink-0">
                        {item.date_occurred}
                      </span>
                    </div>

                    {/* Location */}
                    <p className="text-base text-gray-500 mt-1">
                      {item.campus_location}
                    </p>

                    {/* Description */}
                    <p className="text-base text-gray-500 mt-1 line-clamp-2">
                      {item.description}
                    </p>

                    {/* Status Pill */}
                    <div className="mt-4">{renderStatusBadge(item)}</div>
                  </div>

                  {/* Claim Item Button */}
                  <div className="mt-4">
                    {isOwner ? (
                      <Link
                        to="/dashboard"
                        className="block w-full text-center rounded-lg bg-gray-100 hover:bg-gray-200/80 py-2.5 text-base font-medium text-gray-700 transition-colors"
                      >
                        Manage Your Post
                      </Link>
                    ) : (
                      <button
                        type="button"
                        disabled={isClosed}
                        onClick={() => handleClaimClick(item)}
                        className="w-full rounded-lg bg-[#EEF4FF]/70 hover:bg-[#EEF4FF] py-2.5 text-base font-medium text-[#2B7FFF] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      >
                        {isClosed ? 'Already Claimed' : 'Claim Item'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}