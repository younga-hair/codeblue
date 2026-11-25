import {FormEvent, useMemo, useState} from 'react';
import {
  ArrowRight,
  Check,
  Copy,
  ExternalLink,
  Menu,
  X,
} from 'lucide-react';
import {ResilientImage} from './components/ResilientImage';
import {
  DIRECTOR_IMAGE,
  HERO_IMAGE,
  SALON_INFO,
  SERVICE_MENU,
  SIGNATURE_STYLES,
  type ServiceCategory,
} from './data/salonData';

const MENU_CATEGORIES: Array<'전체' | ServiceCategory> = [
  '전체',
  '커트',
  '펌',
  '컬러',
  '헤드스파',
];

const TIME_SLOTS = [
  '10:30',
  '12:00',
  '14:00',
  '16:00',
  '18:00',
  '19:00',
];

interface ReservationFormState {
  name: string;
  phone: string;
  serviceId: string;
  date: string;
  timeSlot: string;
  notes: string;
}

interface SubmittedReservation extends ReservationFormState {
  serviceName: string;
  servicePrice: number;
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'전체' | ServiceCategory>('전체');
  const [copiedAddress, setCopiedAddress] = useState(false);

  const defaultDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  }, []);

  const [form, setForm] = useState<ReservationFormState>({
    name: '',
    phone: '',
    serviceId: SERVICE_MENU[0].id,
    date: defaultDate,
    timeSlot: '14:00',
    notes: '',
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [submittedReservation, setSubmittedReservation] =
    useState<SubmittedReservation | null>(null);

  const filteredMenu = useMemo(() => {
    if (selectedCategory === '전체') return SERVICE_MENU;
    return SERVICE_MENU.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  };

  const handleSelectServiceForBooking = (serviceId: string) => {
    setSubmittedReservation(null);
    setFormError(null);
    setForm((prev) => ({...prev, serviceId}));
    scrollToSection('booking');
  };

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(SALON_INFO.address);
      setCopiedAddress(true);
      window.setTimeout(() => setCopiedAddress(false), 2200);
    } catch {
      setCopiedAddress(false);
    }
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedName = form.name.trim();
    const trimmedPhone = form.phone.trim();

    if (trimmedName.length < 2) {
      setFormError('성함을 두 글자 이상 입력해 주세요.');
      return;
    }

    const phoneDigits = trimmedPhone.replace(/[^0-9]/g, '');
    if (phoneDigits.length < 9 || phoneDigits.length > 11) {
      setFormError('올바른 연락처 형식(예: 010-1234-5678)을 입력해 주세요.');
      return;
    }

    if (!form.date) {
      setFormError('희망 방문 날짜를 선택해 주세요.');
      return;
    }

    const selectedService =
      SERVICE_MENU.find((item) => item.id === form.serviceId) ?? SERVICE_MENU[0];

    setFormError(null);
    setSubmittedReservation({
      ...form,
      name: trimmedName,
      phone: trimmedPhone,
      serviceName: selectedService.name,
      servicePrice: selectedService.price,
    });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 selection:bg-[#17325C] selection:text-white">
      {/* Top Bar: 3-zone contract */}
      <header className="sticky top-0 z-40 h-16 bg-[#FAFAFA]/95 backdrop-blur-sm border-b border-zinc-200">
        <div className="max-w-7xl mx-auto h-full px-6 lg:px-10 flex items-center justify-between gap-8">
          <a
            href="#top"
            className="font-display text-xl font-semibold tracking-wide text-[#17325C] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#17325C]"
          >
            {SALON_INFO.brandName}
          </a>

          <nav
            aria-label="주요 메뉴"
            className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600"
          >
            <a
              href="#styles"
              className="hover:text-zinc-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              시그니처 스타일
            </a>
            <a
              href="#about"
              className="hover:text-zinc-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              살롱 소개
            </a>
            <a
              href="#menu"
              className="hover:text-zinc-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              시술 메뉴
            </a>
            <a
              href="#location"
              className="hover:text-zinc-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              오시는 길
            </a>
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => scrollToSection('booking')}
              className="hidden md:inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-[#17325C] hover:bg-[#102444] rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#17325C]"
            >
              예약 문의
            </button>

            <button
              type="button"
              aria-label={mobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden inline-flex items-center justify-center w-11 h-11 text-zinc-800 hover:bg-zinc-100 rounded-md transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile navigation drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FAFAFA] border-b border-zinc-200 px-6 py-5 space-y-4">
            <nav className="flex flex-col space-y-3 text-base font-medium text-zinc-800">
              <a
                href="#styles"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5"
              >
                시그니처 스타일
              </a>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5"
              >
                살롱 소개
              </a>
              <a
                href="#menu"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5"
              >
                시술 메뉴
              </a>
              <a
                href="#location"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5"
              >
                오시는 길
              </a>
            </nav>
            <button
              type="button"
              onClick={() => scrollToSection('booking')}
              className="w-full py-3 text-sm font-medium text-white bg-[#17325C] rounded-md"
            >
              예약 문의
            </button>
          </div>
        )}
      </header>

      <main id="top">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-10 pb-12 lg:pt-14 lg:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            <div className="lg:col-span-5 flex flex-col justify-between py-2">
              <div>
                <p className="text-sm font-medium text-[#17325C] mb-5">
                  {SALON_INFO.regionLabel}
                </p>
                <h1 className="text-[clamp(2.25rem,3.6vw,3.25rem)] font-semibold leading-[1.18] tracking-tight text-zinc-900 text-balance mb-6">
                  결을 살리는 섬세한 커트, 나만의 무드를 찾는 코드블루
                </h1>
                <p className="text-base leading-relaxed text-zinc-600 max-w-md mb-8">
                  경주 황성동에 위치한 {SALON_INFO.koreanName}({SALON_INFO.brandName})는 고객의 두상과 모질, 평소 손질 습관까지 고려한 1:1 맞춤 헤어 디자인을 제안합니다.
                </p>
                <div className="flex flex-wrap items-center gap-6">
                  <button
                    type="button"
                    onClick={() => scrollToSection('booking')}
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-[#17325C] hover:bg-[#102444] rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#17325C]"
                  >
                    예약 상담 신청하기
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <a
                    href={SALON_INFO.naverPlaceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-700 hover:text-[#17325C] underline underline-offset-4 whitespace-nowrap shrink-0"
                  >
                    네이버 플레이스 바로가기
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="hidden lg:block pt-10 mt-10 border-t border-zinc-200">
                <p className="text-xs text-zinc-500 leading-relaxed">
                  방문 전 1:1 상담을 통해 모발 손상도와 원하는 기장감을 세밀하게 확인한 뒤 맞춤 시술을 진행합니다.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="w-full aspect-16/9 lg:aspect-auto lg:h-full min-h-[300px] lg:min-h-[480px] overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100">
                <ResilientImage
                  src={HERO_IMAGE.src}
                  alt={HERO_IMAGE.alt}
                  className="w-full h-full object-cover"
                  fallbackLabel="CODE BLUE 경주 황성동 헤어 살롱"
                />
              </div>
            </div>
          </div>

          {/* Full-width 4-column Salon Quick Info Strip */}
          <div className="mt-10 pt-8 border-t border-zinc-200 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div>
              <p className="text-xs text-zinc-500 mb-1">영업 시간</p>
              <p className="text-sm font-medium text-zinc-900 tabular-nums">
                {SALON_INFO.hours}
              </p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 mb-1">정기 휴무</p>
              <p className="text-sm font-medium text-zinc-900">
                {SALON_INFO.closedDay}
              </p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 mb-1">예약 및 상담</p>
              <p className="text-sm font-medium text-zinc-900">
                100% 1:1 사전 예약제
              </p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 mb-1">오시는 길</p>
              <p className="text-sm font-medium text-zinc-900">
                {SALON_INFO.transit}
              </p>
            </div>
          </div>
        </section>

        {/* Signature Styles Section */}
        <section id="styles" className="border-t border-zinc-200 bg-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <p className="text-sm font-medium text-zinc-500 mb-2">
                  01. 시그니처 스타일
                </p>
                <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight text-zinc-900 text-balance">
                  시간이 지나도 형태가 흐트러지지 않는 대표 디자인
                </h2>
              </div>
              <p className="text-sm text-zinc-600 max-w-md leading-relaxed">
                유행을 따르기보다 고객 고유의 골격과 피부 톤에 어울리는 균형감을 우선으로 설계합니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {SIGNATURE_STYLES.map((style) => (
                <article
                  key={style.id}
                  className="group flex flex-col justify-between bg-[#FAFAFA] border border-zinc-200 rounded-lg overflow-hidden transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <div>
                    <div className="aspect-4/3 w-full overflow-hidden bg-zinc-100 border-b border-zinc-200">
                      <ResilientImage
                        src={style.imageSrc}
                        alt={style.imageAlt}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs text-zinc-500 mb-2.5">
                        <span>{style.subtitle}</span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">{style.duration}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-zinc-900 mb-2">
                        {style.title}
                      </h3>
                      <p className="text-sm text-zinc-600 leading-relaxed">
                        {style.description}
                      </p>
                    </div>
                  </div>
                  <div className="px-6 pb-6 pt-2">
                    <button
                      type="button"
                      onClick={() => handleSelectServiceForBooking(style.recommendedServiceId)}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-[#17325C] hover:text-zinc-900 transition-colors cursor-pointer"
                    >
                      이 스타일로 상담 예약하기
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy & Director Section */}
        <section id="about" className="border-t border-zinc-200 bg-[#F4F4F5] py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
              <div className="lg:col-span-5">
                <div className="w-full aspect-3/4 lg:h-full max-h-[600px] overflow-hidden rounded-lg border border-zinc-200 bg-zinc-200">
                  <ResilientImage
                    src={DIRECTOR_IMAGE.src}
                    alt={DIRECTOR_IMAGE.alt}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>

              <div className="lg:col-span-7 flex flex-col justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-zinc-500 mb-2">
                    02. 살롱 철학 및 소개
                  </p>
                  <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight text-zinc-900 text-balance mb-5">
                    편안한 공간에서 완성되는 정직한 헤어 디자인
                  </h2>
                  <p className="text-base text-zinc-600 leading-relaxed mb-8 max-w-2xl">
                    경주 황성동 2층에 자리한 {SALON_INFO.koreanName}({SALON_INFO.brandName})는 서두르지 않는 꼼꼼한 상담을 원칙으로 합니다. 모발 손상을 최소화하는 시술 과정부터 집에서 유지하기 쉬운 드라이 방법까지, 고객 한 분 한 분의 일상에 자연스럽게 어우러지는 결과를 지향합니다.
                  </p>
                </div>

                <div className="divide-y divide-zinc-300/80 border-t border-b border-zinc-300/80">
                  <div className="py-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                    <h3 className="text-base font-semibold text-zinc-900">
                      01. 1회 1고객 60분 전담 커트
                    </h3>
                    <p className="text-sm text-zinc-600">
                      동시 다수 시술 없이 한 분의 모질과 생활 패턴에만 집중합니다.
                    </p>
                  </div>
                  <div className="py-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                    <h3 className="text-base font-semibold text-zinc-900">
                      02. 저자극 비건 · 식물성 케어 제품
                    </h3>
                    <p className="text-sm text-zinc-600">
                      두피 자극을 줄인 인증 원료의 펌제와 암모니아 프리 컬러를 사용합니다.
                    </p>
                  </div>
                  <div className="py-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                    <h3 className="text-base font-semibold text-zinc-900">
                      03. 시술 후 14일 무상 리터치 케어
                    </h3>
                    <p className="text-sm text-zinc-600">
                      방문 후 2주 이내 손질이 불편한 부분은 예약 후 무료로 보완해 드립니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Menu Section */}
        <section id="menu" className="border-t border-zinc-200 bg-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <p className="text-sm font-medium text-zinc-500 mb-2">
                  03. 시술 메뉴 및 가격 안내
                </p>
                <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight text-zinc-900">
                  투명한 정찰제 시술 메뉴
                </h2>
              </div>

              {/* Category Filter Tabs */}
              <div
                role="tablist"
                aria-label="시술 카테고리 필터"
                className="inline-flex flex-wrap items-center gap-1 p-1 bg-zinc-100 rounded-lg border border-zinc-200 self-start md:self-auto"
              >
                {MENU_CATEGORIES.map((category) => {
                  const isActive = selectedCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        isActive
                          ? 'bg-white text-zinc-900 shadow-xs'
                          : 'text-zinc-600 hover:text-zinc-900'
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-zinc-200 divide-y divide-zinc-200">
              {filteredMenu.map((item) => {
                const isSelectedForBooking = form.serviceId === item.id;
                return (
                  <div
                    key={item.id}
                    className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-zinc-500">
                        <span>{item.category}</span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">{item.duration} 소요</span>
                      </div>
                      <h3 className="text-base font-semibold text-zinc-900">
                        {item.name}
                      </h3>
                      <p className="text-sm text-zinc-600">{item.description}</p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 shrink-0">
                      <span className="text-base font-semibold text-zinc-900 tabular-nums">
                        {item.price.toLocaleString('ko-KR')}원
                      </span>
                      <button
                        type="button"
                        onClick={() => handleSelectServiceForBooking(item.id)}
                        className={`px-4 py-2 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          isSelectedForBooking
                            ? 'bg-[#17325C] text-white border-[#17325C]'
                            : 'bg-white text-zinc-800 border-zinc-300 hover:border-zinc-900'
                        }`}
                      >
                        {isSelectedForBooking ? '선택됨' : '예약 선택'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="mt-6 text-xs text-zinc-500">
              * 기장 추가 비용 없이 기본 가격으로 운영되며, 특수 탈색 및 복구 시술은 사전 상담 후 정확히 안내해 드립니다.
            </p>
          </div>
        </section>

        {/* Booking & Location Section */}
        <section id="booking" className="border-t border-zinc-200 bg-[#FAFAFA] py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Left: Location & Contact Details */}
              <div id="location" className="lg:col-span-5 space-y-8">
                <div>
                  <p className="text-sm font-medium text-zinc-500 mb-2">
                    04. 예약 문의 및 오시는 길
                  </p>
                  <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight text-zinc-900 text-balance mb-4">
                    방문 전 원하시는 날짜와 시술을 남겨주세요
                  </h2>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    예약 문의를 남겨주시면 확인 후 순차적으로 확정 안내를 드립니다. 당일 예약 및 급한 변경 문의는 매장으로 전화 주시면 빠르게 도와드리겠습니다.
                  </p>
                </div>

                <div className="border-t border-zinc-200 pt-6 space-y-5 text-sm">
                  <div>
                    <p className="text-xs text-zinc-500 mb-1">매장 주소</p>
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="font-medium text-zinc-900">{SALON_INFO.address}</p>
                      <button
                        type="button"
                        onClick={handleCopyAddress}
                        className="inline-flex items-center gap-1 text-xs font-medium text-[#17325C] hover:underline cursor-pointer"
                      >
                        {copiedAddress ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            복사 완료
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            주소 복사
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-zinc-500 mt-1">{SALON_INFO.transit}</p>
                  </div>

                  <div>
                    <p className="text-xs text-zinc-500 mb-1">영업 시간 및 휴무</p>
                    <p className="font-medium text-zinc-900 tabular-nums">
                      {SALON_INFO.hours}
                    </p>
                    <p className="text-xs text-zinc-500 mt-1">{SALON_INFO.closedDay}</p>
                  </div>

                  <div>
                    <p className="text-xs text-zinc-500 mb-1">네이버 플레이스 · 전화 문의</p>
                    <div className="flex flex-wrap items-center gap-4">
                      <span className="font-medium text-zinc-900">
                        {SALON_INFO.phone}
                      </span>
                      <a
                        href={SALON_INFO.naverPlaceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-[#17325C] hover:underline"
                      >
                        네이버 플레이스 열기
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-zinc-500 mb-1">주차 안내</p>
                    <p className="text-zinc-700">{SALON_INFO.parking}</p>
                  </div>
                </div>
              </div>

              {/* Right: Reservation Request Form */}
              <div className="lg:col-span-7">
                <div className="bg-white border border-zinc-200 rounded-lg p-6 sm:p-8">
                  {submittedReservation ? (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-[#17325C]">
                          예약 문의 접수 예시
                        </p>
                        <h3 className="text-xl font-semibold text-zinc-900">
                          {submittedReservation.name}님, 예약 상담 요청이 작성되었습니다.
                        </h3>
                        <p className="text-sm text-zinc-600 leading-relaxed">
                          현재는 프론트엔드 예시 단계로, 이후 Cloudflare Workers나 네이버 예약 링크를 연결하시면 실제 접수 및 알림까지 연동할 수 있습니다.
                        </p>
                      </div>

                      <div className="bg-[#FAFAFA] border border-zinc-200 rounded-md p-5 space-y-3 text-sm">
                        <div className="flex justify-between gap-4">
                          <span className="text-zinc-500">선택 시술</span>
                          <span className="font-medium text-zinc-900 text-right">
                            {submittedReservation.serviceName} (
                            {submittedReservation.servicePrice.toLocaleString('ko-KR')}원)
                          </span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span className="text-zinc-500">희망 일시</span>
                          <span className="font-medium text-zinc-900 tabular-nums">
                            {submittedReservation.date} {submittedReservation.timeSlot}
                          </span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span className="text-zinc-500">연락처</span>
                          <span className="font-medium text-zinc-900 tabular-nums">
                            {submittedReservation.phone}
                          </span>
                        </div>
                        {submittedReservation.notes && (
                          <div className="pt-2 border-t border-zinc-200">
                            <span className="block text-zinc-500 mb-1">요청 메모</span>
                            <p className="text-zinc-800">{submittedReservation.notes}</p>
                          </div>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => setSubmittedReservation(null)}
                        className="px-5 py-2.5 text-sm font-medium text-zinc-800 bg-white border border-zinc-300 hover:border-zinc-900 rounded-md transition-colors cursor-pointer"
                      >
                        다시 작성하기
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} noValidate className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label
                            htmlFor="guest-name"
                            className="block text-xs font-medium text-zinc-700 mb-1.5"
                          >
                            성함
                          </label>
                          <input
                            id="guest-name"
                            type="text"
                            value={form.name}
                            onChange={(e) =>
                              setForm((prev) => ({...prev, name: e.target.value}))
                            }
                            placeholder="홍길동"
                            className="w-full px-3.5 py-2.5 text-sm bg-white border border-zinc-300 rounded-md focus:outline-none focus:border-[#17325C]"
                            required
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="guest-phone"
                            className="block text-xs font-medium text-zinc-700 mb-1.5"
                          >
                            연락처
                          </label>
                          <input
                            id="guest-phone"
                            type="tel"
                            value={form.phone}
                            onChange={(e) =>
                              setForm((prev) => ({...prev, phone: e.target.value}))
                            }
                            placeholder="010-1234-5678"
                            className="w-full px-3.5 py-2.5 text-sm bg-white border border-zinc-300 rounded-md focus:outline-none focus:border-[#17325C] tabular-nums"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="service-select"
                          className="block text-xs font-medium text-zinc-700 mb-1.5"
                        >
                          희망 시술
                        </label>
                        <select
                          id="service-select"
                          value={form.serviceId}
                          onChange={(e) =>
                            setForm((prev) => ({...prev, serviceId: e.target.value}))
                          }
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-zinc-300 rounded-md focus:outline-none focus:border-[#17325C]"
                        >
                          {SERVICE_MENU.map((item) => (
                            <option key={item.id} value={item.id}>
                              [{item.category}] {item.name} —{' '}
                              {item.price.toLocaleString('ko-KR')}원
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label
                            htmlFor="visit-date"
                            className="block text-xs font-medium text-zinc-700 mb-1.5"
                          >
                            희망 날짜
                          </label>
                          <input
                            id="visit-date"
                            type="date"
                            value={form.date}
                            onChange={(e) =>
                              setForm((prev) => ({...prev, date: e.target.value}))
                            }
                            className="w-full px-3.5 py-2.5 text-sm bg-white border border-zinc-300 rounded-md focus:outline-none focus:border-[#17325C] tabular-nums"
                            required
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="visit-time"
                            className="block text-xs font-medium text-zinc-700 mb-1.5"
                          >
                            희망 시간대
                          </label>
                          <select
                            id="visit-time"
                            value={form.timeSlot}
                            onChange={(e) =>
                              setForm((prev) => ({...prev, timeSlot: e.target.value}))
                            }
                            className="w-full px-3.5 py-2.5 text-sm bg-white border border-zinc-300 rounded-md focus:outline-none focus:border-[#17325C] tabular-nums"
                          >
                            {TIME_SLOTS.map((slot) => (
                              <option key={slot} value={slot}>
                                {slot}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="guest-notes"
                          className="block text-xs font-medium text-zinc-700 mb-1.5"
                        >
                          모발 상태 및 요청 사항 (선택)
                        </label>
                        <textarea
                          id="guest-notes"
                          rows={3}
                          value={form.notes}
                          onChange={(e) =>
                            setForm((prev) => ({...prev, notes: e.target.value}))
                          }
                          placeholder="최근 6개월 내 탈색/염색 이력이나 원하시는 기장감이 있다면 적어주세요."
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-zinc-300 rounded-md focus:outline-none focus:border-[#17325C] resize-none"
                        />
                      </div>

                      {formError && (
                        <p role="alert" className="text-xs font-medium text-red-700">
                          {formError}
                        </p>
                      )}

                      <button
                        type="submit"
                        className="w-full py-3 px-6 text-sm font-medium text-white bg-[#17325C] hover:bg-[#102444] rounded-md transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#17325C]"
                      >
                        예약 상담 신청하기
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-zinc-200 bg-white py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <p className="font-display text-lg font-semibold tracking-wide text-[#17325C]">
              {SALON_INFO.brandName}
            </p>
            <p className="text-xs text-zinc-500">
              {SALON_INFO.koreanName} · {SALON_INFO.address} · {SALON_INFO.phone}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-zinc-500">
            <a href="#styles" className="hover:text-zinc-900">
              시그니처 스타일
            </a>
            <a href="#about" className="hover:text-zinc-900">
              살롱 소개
            </a>
            <a href="#menu" className="hover:text-zinc-900">
              시술 메뉴
            </a>
            <a href="#booking" className="hover:text-zinc-900">
              예약 문의
            </a>
            <span>© 2026 {SALON_INFO.brandName}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
