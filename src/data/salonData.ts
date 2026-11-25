export type ServiceCategory = '커트' | '펌' | '컬러' | '헤드스파';

export interface SignatureStyle {
  id: string;
  category: ServiceCategory;
  subtitle: string;
  title: string;
  description: string;
  duration: string;
  imageSrc: string;
  imageAlt: string;
  recommendedServiceId: string;
}

export interface ServiceItem {
  id: string;
  category: ServiceCategory;
  name: string;
  description: string;
  duration: string;
  price: number;
}

export const HERO_IMAGE = {
  src: '/src/assets/images/hero_salon_interior_1795233139936.jpg',
  alt: '자연광이 드는 코드블루 헤어 살롱 내부 스타일링 공간 예시 이미지',
};

export const DIRECTOR_IMAGE = {
  src: '/src/assets/images/salon_director_portrait_1795233141951.jpg',
  alt: '코드블루 헤어 살롱 디자이너 포트레이트 예시 이미지',
};

export const SIGNATURE_STYLES: SignatureStyle[] = [
  {
    id: 'french-bob',
    category: '커트',
    subtitle: '커트 · 두상 맞춤 레이어링',
    title: '레이어드 프렌치 보브',
    description:
      '턱선과 목선의 비율을 고려한 정교한 질감 처리로, 집에서도 손질이 간편하고 자연스럽게 감기는 실루엣을 완성합니다.',
    duration: '60분 소요',
    imageSrc: '/src/assets/images/style_signature_cut_1795233140030.jpg',
    imageAlt: '자연스러운 층과 가벼운 질감이 돋보이는 레이어드 프렌치 보브 스타일',
    recommendedServiceId: 'cut-signature',
  },
  {
    id: 'soft-scurl',
    category: '펌',
    subtitle: '펌 · 손상 최소화 열펌',
    title: '내추럴 S컬 웨이브 펌',
    description:
      '모질에 맞춘 저자극 약제와 수분 케어를 병행하여, 탄력 있고 자연스럽게 흐르는 굵은 웨이브를 구현합니다.',
    duration: '150분 소요',
    imageSrc: '/src/assets/images/style_signature_perm_1795233141075.jpg',
    imageAlt: '부드럽게 흐르는 윤기 있는 내추럴 S컬 웨이브 펌 스타일',
    recommendedServiceId: 'perm-setting',
  },
  {
    id: 'ash-brown',
    category: '컬러',
    subtitle: '컬러 · 퍼스널 톤 보정',
    title: '딥 애쉬 브라운 컬러',
    description:
      '붉은 기를 정돈하고 피부 톤을 한층 맑아 보이게 하는 저자극 염색으로, 시간이 지나도 차분한 색감을 유지합니다.',
    duration: '110분 소요',
    imageSrc: '/src/assets/images/style_signature_color_1795233141538.jpg',
    imageAlt: '차분하고 투명한 윤기가 감도는 딥 애쉬 브라운 컬러 스타일',
    recommendedServiceId: 'color-signature',
  },
];

export const SERVICE_MENU: ServiceItem[] = [
  {
    id: 'cut-basic',
    category: '커트',
    name: '디자인 커트 (여성 · 남성)',
    description: '1:1 모질·두상 상담, 샴푸 및 데일리 스타일링 마무리 포함',
    duration: '50분',
    price: 25000,
  },
  {
    id: 'cut-signature',
    category: '커트',
    name: '맞춤 레이어드 · 스페셜 커트',
    description: '골격 보정 디자인 커트 및 손질 가이드 제공',
    duration: '60분',
    price: 35000,
  },
  {
    id: 'perm-down',
    category: '펌',
    name: '볼륨 매직 · 다운펌 패키지',
    description: '곱슬기 정돈과 자연스러운 뿌리 볼륨을 동시에 잡는 디자인 펌',
    duration: '140분',
    price: 120000,
  },
  {
    id: 'perm-setting',
    category: '펌',
    name: '시그니처 셋팅 · 디지털 펌',
    description: '전처리 영양 케어가 포함된 탄력 있는 C컬 및 S컬 디자인 펌',
    duration: '150분',
    price: 130000,
  },
  {
    id: 'color-root',
    category: '컬러',
    name: '뿌리 리터치 염색',
    description: '기존 모발 톤과 자연스럽게 연결되는 두피 보호 뿌리 염색',
    duration: '70분',
    price: 60000,
  },
  {
    id: 'color-signature',
    category: '컬러',
    name: '퍼스널 톤업 · 톤다운 전체 염색',
    description: '모발 손상을 줄인 저자극 염모제와 애프터 케어 포함',
    duration: '110분',
    price: 100000,
  },
  {
    id: 'spa-scalp',
    category: '헤드스파',
    name: '두피 스케일링 · 진정 스파',
    description: '모공 딥 클렌징과 두피 열감을 낮추는 릴랙싱 케어',
    duration: '45분',
    price: 60000,
  },
  {
    id: 'spa-clinic',
    category: '헤드스파',
    name: '인텐시브 모발 · 두피 집중 클리닉',
    description: '손상 모발 단백질 보충 및 수분 코팅 집중 관리',
    duration: '60분',
    price: 90000,
  },
];

export const SALON_INFO = {
  brandName: 'CODE BLUE',
  koreanName: '코드블루',
  regionLabel: '경북 경주시 황성동 · 황성로 27, 2층',
  address: '경상북도 경주시 황성로 27, 2층 (황성동)',
  transit: '경주시 황성동 · 황성로 27 건물 2층',
  hours: '10:00 – 20:00 (매장 기준에 맞게 수정 가능)',
  closedDay: '정기 휴무일 안내 (네이버 플레이스 확인)',
  phone: '매장 연락처 입력 예정',
  parking: '방문 전 매장 주차 및 주변 공영주차장 이용 문의',
  directorTitle: '코드블루 헤어 디자이너',
  naverPlaceUrl:
    'https://map.naver.com/p/search/' +
    encodeURIComponent('경북 경주시 황성로 27 코드블루'),
};
