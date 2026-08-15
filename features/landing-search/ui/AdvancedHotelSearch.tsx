"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import {
  LuArrowLeft,
  LuBuilding2,
  LuCalendarDays,
  LuCheck,
  LuChevronDown,
  LuChevronLeft,
  LuChevronRight,
  LuCircleAlert,
  LuMapPin,
  LuRefreshCw,
  LuSearch,
  LuSlidersHorizontal,
  LuStar,
  LuUsers,
  LuX,
} from "react-icons/lu";
import {
  useGetLandingFiltersQuery,
  useLazySearchLandingHotelsQuery,
} from "@/entities/Landing/services/landing.service";
import { API_BASE_URL } from "@/shared/configs/api";
import type {
  HotelSearchParams,
  HotelSort,
  LandingHotel,
} from "@/entities/Landing/types/landing.types";

interface SearchDraft {
  destination: string;
  provinceId: string;
  checkIn: string;
  checkOut: string;
  capacity: number;
  stars: number[];
  amenityIds: number[];
  minPrice: string;
  maxPrice: string;
  metroAccess: "" | "YES" | "NO";
  sort: HotelSort;
}

const createInitialDraft = (): SearchDraft => ({
  destination: "",
  provinceId: "",
  checkIn: "",
  checkOut: "",
  capacity: 1,
  stars: [],
  amenityIds: [],
  minPrice: "",
  maxPrice: "",
  metroAccess: "",
  sort: "recommended",
});

const priceFormatter = new Intl.NumberFormat("fa-IR");
const numberFormatter = new Intl.NumberFormat("fa-IR");
const backendOrigin = API_BASE_URL.replace(/\/api\/v1\/?$/, "");

function localToday() {
  const date = new Date();
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().slice(0, 10);
}

function resolveHotelImage(hotel: LandingHotel) {
  const path =
    hotel.cover ||
    hotel.images.find((image) => image.isCover)?.url ||
    hotel.images[0]?.url;
  if (!path) return "/images/travel-hero.png";
  if (/^https?:\/\//i.test(path)) return path;
  return `${backendOrigin}/${path.replaceAll("\\", "/").replace(/^\/+/, "")}`;
}

function apiErrorMessage(error: unknown) {
  if (!error || typeof error !== "object") return "ارتباط با سرور برقرار نشد.";
  const candidate = error as {
    data?: { message?: string };
    error?: string;
    status?: number | string;
  };
  return candidate.data?.message || candidate.error || "دریافت نتایج با خطا روبه‌رو شد.";
}

function visiblePages(current: number, total: number) {
  if (total <= 5) return Array.from({ length: total }, (_, index) => index + 1);
  const start = Math.max(1, Math.min(current - 2, total - 4));
  return Array.from({ length: 5 }, (_, index) => start + index);
}

function hotelDetailHref(hotel: LandingHotel, search?: HotelSearchParams | null) {
  const params = new URLSearchParams();
  if (search?.checkIn) params.set("checkIn", search.checkIn);
  if (search?.checkOut) params.set("checkOut", search.checkOut);
  if (search?.capacity) params.set("capacity", String(search.capacity));
  const query = params.toString();
  return `/hotels/${encodeURIComponent(hotel.slug)}${query ? `?${query}` : ""}`;
}

function HotelResultCard({
  hotel,
  search,
}: {
  hotel: LandingHotel;
  search?: HotelSearchParams | null;
}) {
  return (
    <Link
      href={hotelDetailHref(hotel, search)}
      className="hotel-result-card"
      aria-label={`مشاهده اطلاعات ${hotel.name}`}
    >
      <article>
        <div
          className="hotel-result-image"
          style={{ backgroundImage: `url(${JSON.stringify(resolveHotelImage(hotel))})` }}
        >
          <span className="hotel-stars" aria-label={`${hotel.stars} ستاره`}>
            {Array.from({ length: hotel.stars }, (_, index) => (
              <LuStar key={index} aria-hidden="true" />
            ))}
          </span>
          <span className="available-room-count">
            {numberFormatter.format(hotel.matchingRoomCount)} اتاق مطابق جستجو
          </span>
        </div>

        <div className="hotel-result-body">
          <div className="hotel-result-heading">
            <div>
              <span>{hotel.province?.name || "ایران"}</span>
              <h3>{hotel.name}</h3>
            </div>
            <LuBuilding2 aria-hidden="true" />
          </div>

          <p className="hotel-result-address">
            <LuMapPin aria-hidden="true" />
            {hotel.address}
          </p>

          <div className="hotel-amenity-list" aria-label="امکانات هتل">
            {hotel.amenities.slice(0, 3).map((amenity) => (
              <span key={amenity.id}>
                <LuCheck aria-hidden="true" />
                {amenity.title}
              </span>
            ))}
            {hotel.amenities.length > 3 && (
              <span>+{numberFormatter.format(hotel.amenities.length - 3)} امکان دیگر</span>
            )}
          </div>

          <div className="hotel-result-footer">
            <div>
              <small>شروع قیمت هر شب</small>
              <strong>
                {hotel.startingPrice === null
                  ? "تماس بگیرید"
                  : `${priceFormatter.format(hotel.startingPrice)} تومان`}
              </strong>
            </div>
            <span className="hotel-card-cta">
              مشاهده هتل
              <LuArrowLeft aria-hidden="true" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function AdvancedHotelSearch() {
  const [draft, setDraft] = useState<SearchDraft>(createInitialDraft);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [guestOpen, setGuestOpen] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [submittedFilters, setSubmittedFilters] =
    useState<HotelSearchParams | null>(null);
  const [validationError, setValidationError] = useState("");
  const today = useMemo(() => localToday(), []);

  const {
    data: filterResponse,
    isLoading: filtersLoading,
    isError: filtersFailed,
  } = useGetLandingFiltersQuery();
  const filters = filterResponse?.data;

  const [searchHotels, searchState] = useLazySearchLandingHotelsQuery();
  const searchResult = searchState.data?.data;

  const advancedFilterCount =
    draft.stars.length +
    draft.amenityIds.length +
    Number(Boolean(draft.minPrice)) +
    Number(Boolean(draft.maxPrice)) +
    Number(Boolean(draft.metroAccess)) +
    Number(draft.sort !== "recommended");

  function setField<K extends keyof SearchDraft>(key: K, value: SearchDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function toggleNumberFilter(key: "stars" | "amenityIds", value: number) {
    setDraft((current) => ({
      ...current,
      [key]: current[key].includes(value)
        ? current[key].filter((item) => item !== value)
        : [...current[key], value],
    }));
  }

  function createQuery(page = 1): HotelSearchParams | null {
    if ((draft.checkIn && !draft.checkOut) || (!draft.checkIn && draft.checkOut)) {
      setValidationError("تاریخ ورود و خروج را با هم انتخاب کنید.");
      return null;
    }
    if (draft.checkIn && draft.checkOut && draft.checkIn >= draft.checkOut) {
      setValidationError("تاریخ خروج باید بعد از تاریخ ورود باشد.");
      return null;
    }
    if (
      draft.minPrice &&
      draft.maxPrice &&
      Number(draft.minPrice) > Number(draft.maxPrice)
    ) {
      setValidationError("حداقل قیمت نمی‌تواند از حداکثر قیمت بیشتر باشد.");
      return null;
    }

    setValidationError("");
    return {
      destination: draft.destination.trim() || undefined,
      provinceId: draft.provinceId ? Number(draft.provinceId) : undefined,
      checkIn: draft.checkIn || undefined,
      checkOut: draft.checkOut || undefined,
      capacity: draft.capacity,
      stars: draft.stars.length ? draft.stars : undefined,
      amenityIds: draft.amenityIds.length ? draft.amenityIds : undefined,
      minPrice: draft.minPrice ? Number(draft.minPrice) : undefined,
      maxPrice: draft.maxPrice ? Number(draft.maxPrice) : undefined,
      metroAccess: draft.metroAccess || undefined,
      sort: draft.sort,
      page,
      limit: 6,
    };
  }

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = createQuery();
    if (!query) return;

    setHasSearched(true);
    setSubmittedFilters(query);
    setGuestOpen(false);
    searchHotels(query);
  }

  function changePage(page: number) {
    if (!submittedFilters || page === submittedFilters.page) return;
    const query = { ...submittedFilters, page };
    setSubmittedFilters(query);
    searchHotels(query);
    document.getElementById("hotel-results")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function clearFilters() {
    setDraft(createInitialDraft());
    setAdvancedOpen(false);
    setGuestOpen(false);
    setHasSearched(false);
    setSubmittedFilters(null);
    setValidationError("");
    searchState.reset();
  }

  return (
    <>
      <form className="booking-form hotel-booking-form" onSubmit={submitSearch}>
        <div className="search-fields hotel-search-fields">
          <label className="field hotel-destination-field">
            <span>مقصد یا نام هتل</span>
            <span className="field-control">
              <LuSearch aria-hidden="true" />
              <input
                value={draft.destination}
                onChange={(event) => setField("destination", event.target.value)}
                placeholder="مثلاً تهران یا اسپیناس"
                autoComplete="off"
              />
            </span>
          </label>

          <label className="field">
            <span>استان</span>
            <span className="field-control select-control">
              <LuMapPin aria-hidden="true" />
              <select
                value={draft.provinceId}
                onChange={(event) => setField("provinceId", event.target.value)}
                disabled={filtersLoading}
              >
                <option value="">همه استان‌ها</option>
                {filters?.destinations.map((destination) => (
                  <option key={destination.value} value={destination.value}>
                    {destination.label}
                    {destination.hotelCount
                      ? ` (${numberFormatter.format(destination.hotelCount)})`
                      : ""}
                  </option>
                ))}
              </select>
              <LuChevronDown aria-hidden="true" />
            </span>
          </label>

          <label className="field date-field">
            <span>تاریخ ورود</span>
            <span className="field-control">
              <LuCalendarDays aria-hidden="true" />
              <input
                type="date"
                min={today}
                value={draft.checkIn}
                onChange={(event) => {
                  const checkIn = event.target.value;
                  setDraft((current) => ({
                    ...current,
                    checkIn,
                    checkOut:
                      current.checkOut && current.checkOut <= checkIn
                        ? ""
                        : current.checkOut,
                  }));
                }}
              />
            </span>
          </label>

          <label className="field date-field">
            <span>تاریخ خروج</span>
            <span className="field-control">
              <LuCalendarDays aria-hidden="true" />
              <input
                type="date"
                min={draft.checkIn || today}
                value={draft.checkOut}
                onChange={(event) => setField("checkOut", event.target.value)}
              />
            </span>
          </label>

          <div className="field passenger-field">
            <span>تعداد مهمان</span>
            <button
              type="button"
              className="field-control passenger-trigger"
              onClick={() => setGuestOpen((open) => !open)}
              aria-expanded={guestOpen}
            >
              <LuUsers aria-hidden="true" />
              <span>{numberFormatter.format(draft.capacity)} مهمان</span>
              <LuChevronDown aria-hidden="true" />
            </button>
            {guestOpen && (
              <div className="passenger-popover">
                <div>
                  <span>مهمانان</span>
                  <small>ظرفیت مورد نیاز اتاق</small>
                </div>
                <div className="counter">
                  <button
                    type="button"
                    onClick={() =>
                      setField("capacity", Math.max(1, draft.capacity - 1))
                    }
                    aria-label="کاهش تعداد مهمان"
                  >
                    −
                  </button>
                  <strong>{numberFormatter.format(draft.capacity)}</strong>
                  <button
                    type="button"
                    onClick={() =>
                      setField("capacity", Math.min(20, draft.capacity + 1))
                    }
                    aria-label="افزایش تعداد مهمان"
                  >
                    +
                  </button>
                </div>
              </div>
            )}
          </div>

          <button className="search-button" type="submit" disabled={searchState.isFetching}>
            {searchState.isFetching ? (
              <LuRefreshCw className="spin" aria-hidden="true" />
            ) : (
              <LuSearch aria-hidden="true" />
            )}
            {searchState.isFetching ? "در حال جستجو" : "جستجو"}
          </button>
        </div>

        <div className="advanced-search-toolbar">
          <button
            type="button"
            className={advancedOpen ? "advanced-toggle active" : "advanced-toggle"}
            onClick={() => setAdvancedOpen((open) => !open)}
            aria-expanded={advancedOpen}
          >
            <LuSlidersHorizontal aria-hidden="true" />
            فیلترهای پیشرفته
            {advancedFilterCount > 0 && (
              <span>{numberFormatter.format(advancedFilterCount)}</span>
            )}
            <LuChevronDown aria-hidden="true" />
          </button>

          <span className={filtersFailed ? "filter-api-status error" : "filter-api-status"}>
            {filtersLoading
              ? "در حال دریافت گزینه‌های جستجو…"
              : filtersFailed
                ? "گزینه‌های فیلتر در دسترس نیستند؛ جستجوی پایه فعال است."
                : "قیمت و ظرفیت اتاق‌ها به‌صورت زنده بررسی می‌شود."}
          </span>

          {(advancedFilterCount > 0 || hasSearched) && (
            <button type="button" className="clear-search" onClick={clearFilters}>
              <LuX aria-hidden="true" />
              پاک کردن
            </button>
          )}
        </div>

        {advancedOpen && (
          <div className="advanced-filter-panel">
            <fieldset className="advanced-filter-group">
              <legend>درجه هتل</legend>
              <div className="star-filter-list">
                {[5, 4, 3, 2, 1].map((star) => (
                  <label
                    key={star}
                    className={draft.stars.includes(star) ? "selected" : ""}
                  >
                    <input
                      type="checkbox"
                      checked={draft.stars.includes(star)}
                      onChange={() => toggleNumberFilter("stars", star)}
                    />
                    <span>{numberFormatter.format(star)}</span>
                    <LuStar aria-hidden="true" />
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="advanced-filter-group amenity-filter-group">
              <legend>امکانات هتل</legend>
              <div className="amenity-filter-list">
                {filters?.amenities.map((amenity) => (
                  <label
                    key={amenity.value}
                    className={
                      draft.amenityIds.includes(amenity.value) ? "selected" : ""
                    }
                  >
                    <input
                      type="checkbox"
                      checked={draft.amenityIds.includes(amenity.value)}
                      onChange={() => toggleNumberFilter("amenityIds", amenity.value)}
                    />
                    <LuCheck aria-hidden="true" />
                    <span>{amenity.label}</span>
                    <small>{numberFormatter.format(amenity.hotelCount)}</small>
                  </label>
                ))}
                {!filtersLoading && !filters?.amenities.length && (
                  <span className="empty-filter-note">امکاناتی ثبت نشده است.</span>
                )}
              </div>
            </fieldset>

            <div className="advanced-filter-group price-filter-group">
              <span>محدوده قیمت هر شب</span>
              <div>
                <label>
                  <span>از</span>
                  <input
                    type="number"
                    min={0}
                    step={100000}
                    value={draft.minPrice}
                    onChange={(event) => setField("minPrice", event.target.value)}
                    placeholder={
                      filters
                        ? priceFormatter.format(filters.priceRange.min)
                        : "حداقل قیمت"
                    }
                  />
                </label>
                <label>
                  <span>تا</span>
                  <input
                    type="number"
                    min={0}
                    step={100000}
                    value={draft.maxPrice}
                    onChange={(event) => setField("maxPrice", event.target.value)}
                    placeholder={
                      filters
                        ? priceFormatter.format(filters.priceRange.max)
                        : "حداکثر قیمت"
                    }
                  />
                </label>
              </div>
              <small>مبالغ به تومان هستند.</small>
            </div>

            <label className="advanced-select-group">
              <span>دسترسی به مترو</span>
              <select
                value={draft.metroAccess}
                onChange={(event) =>
                  setField(
                    "metroAccess",
                    event.target.value as SearchDraft["metroAccess"],
                  )
                }
              >
                <option value="">مهم نیست</option>
                {filters?.metroAccess.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="advanced-select-group">
              <span>مرتب‌سازی نتایج</span>
              <select
                value={draft.sort}
                onChange={(event) => setField("sort", event.target.value as HotelSort)}
              >
                {(filters?.sortOptions || [
                  { value: "recommended" as const, label: "پیشنهاد هُما" },
                  { value: "price_asc" as const, label: "کمترین قیمت" },
                  { value: "price_desc" as const, label: "بیشترین قیمت" },
                ]).map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}

        {validationError && (
          <p className="search-form-error" role="alert">
            <LuCircleAlert aria-hidden="true" />
            {validationError}
          </p>
        )}
      </form>

      {hasSearched && (
        <section className="hotel-results" id="hotel-results" aria-live="polite">
          {searchState.isFetching ? (
            <div className="hotel-result-loading" role="status">
              <LuRefreshCw className="spin" aria-hidden="true" />
              <strong>در حال پیدا کردن بهترین اتاق‌ها…</strong>
              <span>ظرفیت، قیمت و تداخل رزروها بررسی می‌شود.</span>
            </div>
          ) : searchState.isError ? (
            <div className="hotel-result-state error" role="alert">
              <LuCircleAlert aria-hidden="true" />
              <div>
                <strong>جستجو انجام نشد</strong>
                <span>{apiErrorMessage(searchState.error)}</span>
              </div>
              <button
                type="button"
                onClick={() => submittedFilters && searchHotels(submittedFilters)}
              >
                تلاش دوباره
              </button>
            </div>
          ) : searchResult && searchResult.hotels.length > 0 ? (
            <>
              <div className="hotel-results-heading">
                <div>
                  <span>نتایج جستجوی اقامت</span>
                  <h2>
                    {numberFormatter.format(searchResult.pagination.totalItems)} هتل مناسب
                    پیدا شد
                  </h2>
                </div>
                <small>
                  صفحه {numberFormatter.format(searchResult.pagination.page)} از {" "}
                  {numberFormatter.format(searchResult.pagination.totalPages)}
                </small>
              </div>

              <div className="hotel-result-grid">
                {searchResult.hotels.map((hotel) => (
                  <HotelResultCard
                    key={hotel.id}
                    hotel={hotel}
                    search={submittedFilters}
                  />
                ))}
              </div>

              {searchResult.pagination.totalPages > 1 && (
                <nav className="hotel-pagination" aria-label="صفحه‌بندی نتایج هتل">
                  <button
                    type="button"
                    onClick={() => changePage(searchResult.pagination.page - 1)}
                    disabled={searchResult.pagination.page === 1}
                    aria-label="صفحه قبل"
                  >
                    <LuChevronRight aria-hidden="true" />
                  </button>
                  {visiblePages(
                    searchResult.pagination.page,
                    searchResult.pagination.totalPages,
                  ).map((page) => (
                    <button
                      type="button"
                      key={page}
                      className={page === searchResult.pagination.page ? "active" : ""}
                      onClick={() => changePage(page)}
                      aria-current={page === searchResult.pagination.page ? "page" : undefined}
                    >
                      {numberFormatter.format(page)}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => changePage(searchResult.pagination.page + 1)}
                    disabled={
                      searchResult.pagination.page === searchResult.pagination.totalPages
                    }
                    aria-label="صفحه بعد"
                  >
                    <LuChevronLeft aria-hidden="true" />
                  </button>
                </nav>
              )}
            </>
          ) : (
            <div className="hotel-result-state empty">
              <LuBuilding2 aria-hidden="true" />
              <div>
                <strong>هتلی با این شرایط پیدا نشد</strong>
                <span>تاریخ، بازه قیمت یا امکانات انتخابی را کمی تغییر دهید.</span>
              </div>
              <button type="button" onClick={() => setAdvancedOpen(true)}>
                ویرایش فیلترها
              </button>
            </div>
          )}
        </section>
      )}
    </>
  );
}
