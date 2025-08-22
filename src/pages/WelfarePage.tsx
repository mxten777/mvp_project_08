
import React, { useState, useEffect } from 'react';
import { Search, MapPin, Phone, Clock, Heart, Home, Utensils, GraduationCap, Car, Coins } from 'lucide-react';
import type { WelfareInfo, WelfareCategory } from '../types';
import './WelfarePage.css';

const WelfarePage: React.FC = () => {
  useEffect(() => {
    // 페이지 진입 시 TTS 안내
    if ('speechSynthesis' in window) {
      const utter = new SpeechSynthesisUtterance('복지 정보 페이지입니다. 다양한 복지 혜택을 확인해보세요.');
      utter.lang = 'ko-KR';
      utter.rate = 0.8;
      speechSynthesis.speak(utter);
    }
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<WelfareCategory | 'all'>('all');
  const [welfareList, setWelfareList] = useState<WelfareInfo[]>([]);
  const [loading, setLoading] = useState(true);

  // 카테고리 정의
  const categories = [
    { id: 'all' as const, name: '전체', icon: Heart, color: '#2563eb' },
    { id: 'health' as const, name: '건강', icon: Heart, color: '#dc2626' },
    { id: 'housing' as const, name: '주거', icon: Home, color: '#059669' },
    { id: 'food' as const, name: '식사', icon: Utensils, color: '#d97706' },
    { id: 'education' as const, name: '교육', icon: GraduationCap, color: '#7c3aed' },
    { id: 'transport' as const, name: '교통', icon: Car, color: '#0891b2' },
    { id: 'financial' as const, name: '경제', icon: Coins, color: '#ea580c' },
  ];

  // 더미 데이터 (실제로는 Firebase에서 가져올 예정)
  useEffect(() => {

    const loadWelfareData = async () => {
      setLoading(true);
      // 실제 API 호출 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000));
      // 더미 데이터 배열
      const dummyData: WelfareInfo[] = [
        {
          id: '2',
          title: '경로식당 무료급식',
          description: '어르신을 위한 무료 급식 서비스. 영양식 제공.',
          category: 'food',
          eligibility: ['65세 이상', '기초생활수급자'],
          location: {
            id: 'loc2',
            name: '종로노인종합복지관',
            address: '서울시 종로구 대학로 8길 1',
            coordinates: { lat: 37.5796, lng: 126.9982 },
            city: '서울시',
            district: '종로구',
            neighborhood: '명륜동'
          },
          contactInfo: {
            phone: '02-735-1234',
            hours: '평일 11:30-13:00'
          },
          tags: ['무료급식', '영양식', '매일제공'],
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01')
        },
        {
          id: '3',
          title: '노인 교통비 지원',
          description: '대중교통 이용 시 교통비를 지원하는 제도입니다. 버스, 지하철 요금이 할인됩니다.',
          category: 'transport',
          eligibility: ['65세 이상', '서울시 거주 6개월 이상'],
          location: {
            id: 'loc3',
            name: '종로구청',
            address: '서울시 종로구 삼봉로 43',
            coordinates: { lat: 37.5735, lng: 126.9788 },
            city: '서울시',
            district: '종로구',
            neighborhood: '종로1가'
          },
          contactInfo: {
            phone: '02-2148-1234',
            website: 'www.jongno.go.kr',
            hours: '평일 09:00-18:00'
          },
          tags: ['교통비할인', '대중교통', '정기신청'],
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01')
        },
        {
          id: '4',
          title: '독거노인 생활관리사 파견',
          description: '혼자 생활하시는 어르신을 위한 생활관리사 파견 서비스입니다. 일상생활 지원과 안전 확인을 도와드립니다.',
          category: 'housing',
          eligibility: ['70세 이상 독거노인', '기초생활수급자 우선'],
          location: {
            id: 'loc4',
            name: '종로구 복지센터',
            address: '서울시 종로구 돈화문로 32',
            coordinates: { lat: 37.5705, lng: 126.9770 },
            city: '서울시',
            district: '종로구',
            neighborhood: '원서동'
          },
          contactInfo: {
            phone: '02-2148-5678',
            hours: '평일 09:00-18:00'
          },
          tags: ['생활지원', '독거노인', '안전확인'],
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01')
        }
      ];
      setWelfareList(dummyData);
      setLoading(false);
    };
    loadWelfareData();
  }, []);

  // 검색 및 필터링
  const filteredWelfare = welfareList.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ko-KR';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const handleCall = (phone: string) => {
    speakText(`${phone}로 전화를 거는 중입니다`);
    window.location.href = `tel:${phone}`;
  };

  const getCategoryInfo = (categoryId: WelfareCategory) => {
    return categories.find(cat => cat.id === categoryId) || categories[0];
  };

  return (
    <div className="welfare-page">
      {/* 페이지 헤더 */}
      <div className="page-header">
        <h1 className="page-title" onClick={() => speakText('복지 정보 페이지')}>
          🏛️ 복지 정보
        </h1>
        <p className="page-description">
          지역별 복지 혜택과 서비스를 확인하세요
        </p>
      </div>

      {/* 검색 섹션 */}
      <section className="search-section">
        <div className="search-container">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              className="search-input"
              placeholder="복지 서비스를 검색하세요..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="복지 서비스 검색"
            />
          </div>
        </div>

        {/* 카테고리 필터 */}
        <div className="category-filters">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                className={`category-filter ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => {
                  setSelectedCategory(category.id);
                  speakText(`${category.name} 카테고리 선택됨`);
                }}
                style={{ '--category-color': category.color } as React.CSSProperties}
                aria-label={`${category.name} 카테고리 필터`}
              >
                <IconComponent size={20} />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 결과 섹션 */}
      <section className="results-section">
        <div className="results-header">
          <h2 className="results-title">
            {selectedCategory === 'all' ? '전체' : getCategoryInfo(selectedCategory as WelfareCategory).name} 복지 서비스
          </h2>
          <span className="results-count">
            {filteredWelfare.length}개 서비스
          </span>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>복지 정보를 불러오는 중...</p>
          </div>
        ) : filteredWelfare.length === 0 ? (
          <div className="no-results">
            <p>검색 조건에 맞는 복지 서비스가 없습니다.</p>
            <button 
              className="btn btn-primary"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                speakText('검색 조건을 초기화했습니다');
              }}
            >
              검색 초기화
            </button>
          </div>
        ) : (
          <div className="welfare-list">
            {filteredWelfare.map((welfare) => {
              const categoryInfo = getCategoryInfo(welfare.category);
              const CategoryIcon = categoryInfo.icon;
              
              return (
                <article 
                  key={welfare.id} 
                  className="welfare-card"
                  onClick={() => speakText(`${welfare.title}. ${welfare.description}`)}
                >
                  <div className="welfare-card-header">
                    <div 
                      className="category-badge"
                      style={{ '--category-color': categoryInfo.color } as React.CSSProperties}
                    >
                      <CategoryIcon size={16} />
                      <span>{categoryInfo.name}</span>
                    </div>
                    {welfare.deadline && (
                      <div className="deadline-badge">
                        <Clock size={14} />
                        <span>마감: {welfare.deadline.toLocaleDateString('ko-KR')}</span>
                      </div>
                    )}
                  </div>

                  <div className="welfare-card-content">
                    <h3 className="welfare-title">{welfare.title}</h3>
                    <p className="welfare-description">{welfare.description}</p>

                    <div className="welfare-details">
                      <div className="detail-item">
                        <strong>신청 자격:</strong>
                        <ul className="eligibility-list">
                            {welfare.eligibility.map((item: string, index: number) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="detail-item location-info">
                        <MapPin size={16} />
                        <div>
                          <div className="location-name">{welfare.location.name}</div>
                          <div className="location-address">{welfare.location.address}</div>
                        </div>
                      </div>

                      <div className="detail-item contact-info">
                        <Phone size={16} />
                        <div>
                          <div className="contact-phone">{welfare.contactInfo.phone}</div>
                          <div className="contact-hours">{welfare.contactInfo.hours}</div>
                        </div>
                      </div>
                    </div>

                    <div className="welfare-tags">
                          {welfare.tags.map((tag: string, index: number) => (
                        <span key={index} className="welfare-tag">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="welfare-card-actions">
                    <button
                      className="btn btn-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCall(welfare.contactInfo.phone);
                      }}
                    >
                      <Phone size={16} />
                      전화 문의
                    </button>
                    {welfare.contactInfo.website && (
                      <button
                        className="btn btn-secondary"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(welfare.contactInfo.website, '_blank');
                          speakText('홈페이지를 새 창에서 열었습니다');
                        }}
                      >
                        홈페이지
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default WelfarePage;
