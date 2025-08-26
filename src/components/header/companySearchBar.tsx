'use client';

'use client';

import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

import { Company } from '@/lib/types/company';
import { useGetCompanyList } from '@/store/api_service/companies_api_service';

import { Input } from '../ui/input';
import { Link } from '../ui/link';

interface SearchResult {
  id: string;
  name: string;
}

interface SearchProps {
  partner_slug: string;
  search_icon: string;
}

const CompanySearchBar: React.FC<SearchProps> = ({ partner_slug, search_icon }) => {
  const t = useTranslations('common');
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [pagination] = useState({
    page: 1,
    limit: 10,
  });

  const { data, isLoading } = useGetCompanyList(partner_slug, {
    page: pagination.page,
    limit: pagination.limit,
    q: searchQuery,
  });

  const handleSearchChange = (value: string) => {
    setSearchQuery(value.trim()); // only control query here
  };

  // 👇 update results whenever `data` changes
  useEffect(() => {
    if (data?.results && data.results.length > 0) {
      setResults(
        data.results.map((company: Company) => ({
          id: company.id,
          name: company.name,
        }))
      );
    } else {
      setResults([]);
    }
  }, [data]);

  return (
    <>
      <div className="relative w-full">
        <Input
          id="searchInput"
          className="search-input pr-10" // space for icon
          placeholder={t('searchPlaceholder')}
          onChange={(e) => handleSearchChange(e.target.value)}
        />

        <div className="absolute top-1/2 right-3 flex -translate-y-1/2 items-center justify-center">
          {isLoading ? (
            <div className="border-t-primary h-5 w-5 animate-spin rounded-full border-2 border-gray-200"></div>
          ) : (
            <Search className={search_icon} />
          )}
        </div>
      </div>

      {/* Search Results */}
      {results.length > 0 && (
        <div className="bg-background absolute top-full right-0 left-0 z-50 mt-1 rounded-md border shadow-lg">
          <ul className="max-h-60 overflow-y-auto">
            {results.map((result, idx) => (
              <li key={idx}>
                <Link href={`/company/${result.id}`}>
                  <div className="hover:bg-accent hover:text-accent-foreground cursor-pointer rounded-md px-4 py-2 text-sm">
                    {result.name}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default CompanySearchBar;
