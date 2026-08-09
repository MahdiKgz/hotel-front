"use client";

import Header from "@/widgets/landing/Header";
import AdvancedHotelSearch from "@/features/landing-search/ui/AdvancedHotelSearch";
import { FormEvent, useState } from "react";
import {
  LuArrowLeft,
  LuArrowLeftRight,
  LuBadgeCheck,
  LuBadgePercent,
  LuBuilding2,
  LuBusFront,
  LuCalendarDays,
  LuChevronDown,
  LuCircleCheckBig,
  LuClock3,
  LuCreditCard,
  LuGem,
  LuHeadphones,
  LuHouse,
  LuInstagram,
  LuLinkedin,
  LuLuggage,
  LuMapPin,
  LuPhone,
  LuPlane,
  LuSearch,
  LuSend,
  LuShieldCheck,
  LuTicketCheck,
  LuTrainFront,
  LuUsers,
  LuWalletCards,
} from "react-icons/lu";

const services = [
  { id: "flight", label: "پرواز", icon: LuPlane },
  { id: "train", label: "قطار", icon: LuTrainFront },
  { id: "bus", label: "اتوبوس", icon: LuBusFront },
  { id: "hotel", label: "هتل", icon: LuBuilding2 },
  { id: "villa", label: "ویلا و اقامتگاه", icon: LuHouse },
  { id: "tour", label: "تور", icon: LuLuggage },
];

const popularDestinations = [
  { city: "کیش", detail: "هتل از شبی ۲٬۴۵۰٬۰۰۰ تومان", position: "12% center" },
  { city: "شیراز", detail: "هتل از شبی ۱٬۸۹۰٬۰۰۰ تومان", position: "50% center" },
  { city: "اصفهان", detail: "هتل از شبی ۱٬۶۷۰٬۰۰۰ تومان", position: "88% center" },
];

const faqs = [
  {
    question: "چطور می‌توانم رزرو هتل یا بلیط خودم را پیگیری کنم؟",
    answer:
      "پس از ورود به حساب کاربری، از بخش «سفرهای من» به همه رزروها، وضعیت پرداخت و فایل بلیط دسترسی دارید. پیامک تأیید نیز بلافاصله برای شما ارسال می‌شود.",
  },
  {
    question: "امکان استرداد آنلاین بلیط وجود دارد؟",
    answer:
      "بله، برای بیشتر بلیط‌ها می‌توانید درخواست استرداد را کاملاً آنلاین ثبت کنید. مبلغ جریمه پیش از تأیید نهایی به شما نمایش داده می‌شود.",
  },
  {
    question: "برای رزرو هتل چه مدارکی لازم است؟",
    answer:
      "برای هتل‌های داخلی، کارت شناسایی معتبر مهمانان و برای برخی مقاصد مدارک تکمیلی مطابق قوانین هتل مورد نیاز است. جزئیات هر هتل در صفحه رزرو نوشته شده است.",
  },
  {
    question: "پشتیبانی هُما در چه ساعاتی پاسخ‌گوست؟",
    answer:
      "تیم پشتیبانی هُما در تمام روزهای هفته و به‌صورت ۲۴ ساعته از طریق تلفن و گفت‌وگوی آنلاین همراه شماست.",
  },
];

export default function Landing() {
  const [activeService, setActiveService] = useState("hotel");
  const [tripType, setTripType] = useState("roundtrip");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [passengerOpen, setPassengerOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [searchMessage, setSearchMessage] = useState("");

  const isStay = activeService === "hotel" || activeService === "villa";

  function swapLocations() {
    setOrigin(destination);
    setDestination(origin);
  }

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const service = services.find((item) => item.id === activeService)?.label;
    setSearchMessage(
      `${service}های مناسب ${destination || "مقصد انتخابی شما"} آماده بررسی هستند.`,
    );
  }

  return (
    <main className="landing-page">
      <Header />

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-overlay" />
        <div className="landing-container hero-content">
          <span className="hero-eyebrow">سفر از همین‌جا شروع می‌شود</span>
          <h1 id="hero-title">هر جای ایران، یک تجربه تازه</h1>
          <p>مقایسه، انتخاب و رزرو مطمئن برای تمام مسیرهای تو</p>
        </div>
      </section>

      <section className="landing-container search-section" id="search">
        <div className="search-card">
          <div className="service-tabs" role="tablist" aria-label="انتخاب نوع سفر">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <button
                  key={service.id}
                  className={activeService === service.id ? "active" : ""}
                  onClick={() => {
                    setActiveService(service.id);
                    setSearchMessage("");
                  }}
                  type="button"
                  role="tab"
                  aria-selected={activeService === service.id}
                >
                  <Icon />
                  <span>{service.label}</span>
                </button>
              );
            })}
          </div>

          {activeService === "hotel" ? (
            <AdvancedHotelSearch />
          ) : (
            <>
              <form className="booking-form" onSubmit={submitSearch}>
            {!isStay && (
              <div className="trip-types" aria-label="نوع سفر">
                <button
                  type="button"
                  className={tripType === "oneway" ? "active" : ""}
                  onClick={() => setTripType("oneway")}
                >
                  یک‌طرفه
                </button>
                <button
                  type="button"
                  className={tripType === "roundtrip" ? "active" : ""}
                  onClick={() => setTripType("roundtrip")}
                >
                  رفت و برگشت
                </button>
              </div>
            )}

            <div className="search-fields">
              <div className="route-fields">
                <label className="field">
                  <span>{isStay ? "مقصد یا نام هتل" : "مبدأ"}</span>
                  <span className="field-control">
                    <LuMapPin />
                    <input
                      value={origin}
                      onChange={(event) => setOrigin(event.target.value)}
                      placeholder={isStay ? "مثلاً هتل‌های کیش" : "شهر یا فرودگاه"}
                    />
                  </span>
                </label>

                {!isStay && (
                  <>
                    <button
                      type="button"
                      className="swap-button"
                      onClick={swapLocations}
                      aria-label="جابجایی مبدأ و مقصد"
                    >
                      <LuArrowLeftRight />
                    </button>
                    <label className="field">
                      <span>مقصد</span>
                      <span className="field-control">
                        <LuMapPin />
                        <input
                          value={destination}
                          onChange={(event) => setDestination(event.target.value)}
                          placeholder="شهر یا فرودگاه"
                        />
                      </span>
                    </label>
                  </>
                )}
              </div>

              <label className="field date-field">
                <span>{isStay ? "تاریخ ورود" : "تاریخ رفت"}</span>
                <span className="field-control">
                  <LuCalendarDays />
                  <input placeholder="انتخاب تاریخ" readOnly />
                </span>
              </label>

              <label className="field date-field optional-date">
                <span>{isStay ? "تاریخ خروج" : "تاریخ برگشت"}</span>
                <span className="field-control">
                  <LuCalendarDays />
                  <input
                    placeholder={tripType === "oneway" && !isStay ? "ندارد" : "انتخاب تاریخ"}
                    readOnly
                    disabled={tripType === "oneway" && !isStay}
                  />
                </span>
              </label>

              <div className="field passenger-field">
                <span>{isStay ? "مسافران و اتاق" : "مسافران"}</span>
                <button
                  type="button"
                  className="field-control passenger-trigger"
                  onClick={() => setPassengerOpen((value) => !value)}
                  aria-expanded={passengerOpen}
                >
                  <LuUsers />
                  <span>{passengers} مسافر</span>
                  <LuChevronDown />
                </button>
                {passengerOpen && (
                  <div className="passenger-popover">
                    <div>
                      <span>بزرگسال</span>
                      <small>۱۲ سال به بالا</small>
                    </div>
                    <div className="counter">
                      <button
                        type="button"
                        onClick={() => setPassengers((count) => Math.max(1, count - 1))}
                      >
                        −
                      </button>
                      <strong>{passengers}</strong>
                      <button
                        type="button"
                        onClick={() => setPassengers((count) => Math.min(9, count + 1))}
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <button className="search-button" type="submit">
                <LuSearch />
                جستجو
              </button>
            </div>
              </form>

              {searchMessage && (
                <div className="search-message" role="status">
                  <LuCircleCheckBig />
                  {searchMessage}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <section className="landing-container quick-benefits" aria-label="مزایای هُما">
        <div>
          <LuShieldCheck />
          <span><strong>خرید مطمئن</strong><small>درگاه پرداخت امن</small></span>
        </div>
        <div>
          <LuHeadphones />
          <span><strong>پشتیبانی ۲۴ ساعته</strong><small>همراه شما در تمام سفر</small></span>
        </div>
        <div>
          <LuWalletCards />
          <span><strong>استرداد آنلاین</strong><small>ساده، سریع و شفاف</small></span>
        </div>
        <div>
          <LuBadgeCheck />
          <span><strong>بهترین انتخاب‌ها</strong><small>مقایسه صدها گزینه</small></span>
        </div>
      </section>

      <section className="landing-container section" id="offers">
        <div className="section-heading">
          <div>
            <span>پیشنهادهای این هفته</span>
            <h2>سفرهایی که نباید از دست بدهید</h2>
          </div>
          <a href="#search">مشاهده همه <LuArrowLeft /></a>
        </div>

        <div className="offer-grid">
          <article className="offer-card main-offer">
            <div className="offer-copy">
              <span className="offer-badge"><LuBadgePercent /> پیشنهاد ویژه</span>
              <h3>این هفته، هوای کیش عالیه!</h3>
              <p>پرواز رفت‌وبرگشت + ۳ شب اقامت با تخفیف ویژه</p>
              <button type="button">دیدن پیشنهاد <LuArrowLeft /></button>
            </div>
            <div className="offer-price">
              <small>شروع قیمت از</small>
              <strong>۸٬۹۰۰٬۰۰۰</strong>
              <span>تومان</span>
            </div>
          </article>

          <article className="offer-card app-offer">
            <div className="phone-mockup" aria-hidden="true">
              <div className="phone-notch" />
              <LuPlane />
              <span>سفر بعدی تو</span>
              <div className="mini-ticket" />
            </div>
            <div>
              <span className="offer-badge dark">اپلیکیشن هُما</span>
              <h3>همه سفرها، توی جیب شما</h3>
              <p>قیمت‌های بهتر و پیگیری آسان‌تر در اپلیکیشن</p>
              <a href="#footer">دانلود اپلیکیشن <LuArrowLeft /></a>
            </div>
          </article>
        </div>
      </section>

      <section className="destination-section" id="inspiration">
        <div className="landing-container section">
          <div className="section-heading">
            <div>
              <span>مقصدهای محبوب</span>
              <h2>برای سفر بعدی کجا می‌روید؟</h2>
            </div>
            <p>اقامتگاه‌های منتخب با امکان رزرو فوری</p>
          </div>
          <div className="destination-grid">
            {popularDestinations.map((destination, index) => (
              <article
                className="destination-card"
                key={destination.city}
                style={{
                  backgroundImage: "url('/images/travel-hero.png')",
                  backgroundPosition: destination.position,
                }}
              >
                <div className="destination-shade" />
                <span className="destination-rank">۰{index + 1}</span>
                <div className="destination-copy">
                  <h3>{destination.city}</h3>
                  <p>{destination.detail}</p>
                </div>
                <button type="button" aria-label={`مشاهده هتل‌های ${destination.city}`}>
                  <LuArrowLeft />
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-container section why-section">
        <div className="why-copy">
          <span className="eyebrow">چرا هُما؟</span>
          <h2>با خیال راحت، راهی شوید</h2>
          <p>
            از لحظه‌ای که مقصد را انتخاب می‌کنید تا وقتی به خانه برمی‌گردید،
            کنار شما هستیم؛ با قیمت‌های شفاف، پشتیبانی واقعی و تجربه‌ای ساده.
          </p>
          <div className="stat-row">
            <div><strong>+۱٫۲ میلیون</strong><span>مسافر خشنود</span></div>
            <div><strong>+۱۲ هزار</strong><span>هتل و اقامتگاه</span></div>
            <div><strong>۴٫۹ از ۵</strong><span>امتیاز کاربران</span></div>
          </div>
        </div>
        <div className="why-features">
          <article><LuCreditCard /><div><h3>قیمت‌های شفاف</h3><p>بدون هزینه پنهان؛ همان قیمتی که می‌بینید.</p></div></article>
          <article><LuClock3 /><div><h3>رزرو در چند دقیقه</h3><p>سریع‌ترین مسیر از انتخاب تا تأیید نهایی.</p></div></article>
          <article><LuGem /><div><h3>انتخاب‌های باکیفیت</h3><p>پیشنهادهای گلچین‌شده برای هر سبک سفر.</p></div></article>
          <article><LuTicketCheck /><div><h3>تضمین رزرو</h3><p>واچر معتبر و پشتیبانی تا پایان اقامت.</p></div></article>
        </div>
      </section>

      <section className="faq-section" id="faq">
        <div className="landing-container faq-layout">
          <div className="faq-intro">
            <span className="eyebrow">پرسش‌های پرتکرار</span>
            <h2>پاسخ سؤال شما همین‌جاست</h2>
            <p>اگر پاسخ‌تان را پیدا نکردید، پشتیبانی ما همیشه در دسترس است.</p>
            <a href="tel:02100000000"><LuPhone /> ۰۲۱-۰۰۰۰۰۰۰۰</a>
          </div>
          <div className="faq-list">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <article className={`faq-item ${isOpen ? "open" : ""}`} key={faq.question}>
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <LuChevronDown />
                  </button>
                  {isOpen && <p>{faq.answer}</p>}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="footer" id="footer">
        <div className="landing-container footer-grid">
          <div className="footer-brand">
            <div className="brand light">
              <span className="brand-mark"><LuPlane /></span>
              <span><strong>هُما</strong><small>همراهِ سفرهای تو</small></span>
            </div>
            <p>رزرو آنلاین بلیط، هتل و تور؛ برای سفرهایی که ارزش به‌یادماندن دارند.</p>
            <div className="socials">
              <a href="#" aria-label="اینستاگرام"><LuInstagram /></a>
              <a href="#" aria-label="لینکدین"><LuLinkedin /></a>
              <a href="#" aria-label="تلگرام"><LuSend /></a>
            </div>
          </div>
          <div><h3>هُما</h3><a href="#offers">درباره ما</a><a href="#offers">فرصت‌های شغلی</a><a href="#offers">باشگاه مسافران</a></div>
          <div><h3>خدمات مشتریان</h3><a href="#faq">مرکز پشتیبانی</a><a href="#faq">راهنمای خرید</a><a href="#faq">استرداد آنلاین</a></div>
          <div><h3>سفر با هُما</h3><a href="#search">بلیط هواپیما</a><a href="#search">رزرو هتل</a><a href="#search">تور مسافرتی</a></div>
        </div>
        <div className="landing-container footer-bottom">
          <span>© ۱۴۰۵ هُما؛ همه حقوق محفوظ است.</span>
          <div><a href="#">حریم خصوصی</a><a href="#">قوانین و مقررات</a></div>
        </div>
      </footer>
    </main>
  );
}
