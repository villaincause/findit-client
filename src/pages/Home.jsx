import { Link } from 'react-router-dom';
import { Plus, Search, ShieldCheck } from 'lucide-react';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-white flex flex-col justify-between">
      <main className="flex-1 flex flex-col justify-center">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto px-6 pt-16 sm:pt-20 pb-14 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
            You can find it here
          </h1>

          <p className="mt-5 text-base sm:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            The community platform that connects people who have lost items
            with those who have found them.
          </p>

          {/* CTA Buttons */}
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/post"
              className="inline-flex items-center gap-2 rounded-lg bg-[#2B7FFF] hover:bg-[#1E6CEB] px-6 py-3 text-base font-medium text-white transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Report an Item</span>
            </Link>

            <Link
              to="/lost"
              className="inline-flex items-center gap-2 rounded-lg border border-[#2B7FFF] bg-white hover:bg-blue-50/60 px-6 py-3 text-base font-medium text-[#2B7FFF] transition-colors"
            >
              <Search className="w-4 h-4 text-gray-900" />
              <span>Search Lost Items</span>
            </Link>
          </div>
        </section>

        {/* Full-Width Three Feature Cards */}
        <section className="w-full px-8 sm:px-14 pt-4 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {/* Card 1 */}
            <Link
              to="/post"
              className="rounded-xl bg-[#F4F0F0] hover:bg-[#EDE7E7] transition-colors px-10 py-12 min-h-[260px] flex flex-col items-center justify-center text-center"
            >
              <Plus className="w-7 h-7 text-gray-900 mb-5 stroke-[1.75]" />
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Report Lost Items
              </h2>
              <p className="text-base text-gray-500 leading-relaxed max-w-sm">
                Quickly report your lost items with details and images to
                increase your chances of finding them.
              </p>
            </Link>

            {/* Card 2 */}
            <Link
              to="/found"
              className="rounded-xl bg-[#F4F0F0] hover:bg-[#EDE7E7] transition-colors px-10 py-12 min-h-[260px] flex flex-col items-center justify-center text-center"
            >
              <Search className="w-7 h-7 text-gray-900 mb-5 stroke-[1.75]" />
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Find Items
              </h2>
              <p className="text-base text-gray-500 leading-relaxed max-w-sm">
                Search for items by category, location, and date.
              </p>
            </Link>

            {/* Card 3 */}
            <div className="rounded-xl bg-[#F4F0F0] px-10 py-12 min-h-[260px] flex flex-col items-center justify-center text-center">
              <ShieldCheck className="w-7 h-7 text-gray-900 mb-5 stroke-[1.75]" />
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Verification System
              </h2>
              <p className="text-base text-gray-500 leading-relaxed max-w-sm">
                Ensures that items are returned to their rightful owners.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}