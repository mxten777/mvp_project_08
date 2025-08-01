import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, Phone, AlertCircle, Filter } from 'lucide-react';
import type { Schedule, ScheduleCategory } from '../types';
import './SchedulePage.css';

const SchedulePage: React.FC = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ScheduleCategory | 'all'>('all');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(true);

  // 카테고리 정의
  const categories = [
    { id: 'all' as const, name: '전체', icon: Calendar, color: '#2563eb' },
    { id: 'health_checkup' as const, name: '건강검진', icon: AlertCircle, color: '#dc2626' },
    { id: 'exercise' as const, name: '운동', icon: Users, color: '#059669' },
    { id: 'education' as const, name: '교육', icon: Calendar, color: '#7c3aed' },
    { id: 'cultural' as const, name: '문화', icon: Calendar, color: '#ea580c' },
    { id: 'meal' as const, name: '급식', icon: Calendar, color: '#d97706' },
    { id: 'counseling' as const, name: '상담', icon: Users, color: '#0891b2' },
  ];

  // 더미 데이터
  useEffect(() => {
    const loadScheduleData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const today = new Date();
      const dummyData: Schedule[] = [
        {
          id: '1',
          title: '무료 건강검진',
          description: '65세 이상 어르신 대상 종합건강검진입니다. 사전 예약 필수입니다.',
          category: 'health_checkup',
          startDate: new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000),
          endDate: new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000),
          location: {
            id: 'loc1',
            name: '종로구 보건소',
            address: '서울시 종로구 송월길 14',
            coordinates: { lat: 37.5735, lng: 126.9788 },
            city: '서울시',
            district: '종로구',
            neighborhood: '청운동'
          },
          capacity: 50,
          registered: 23,
          registrationRequired: true,
          contactInfo: {
            phone: '02-2148-3500',
            hours: '평일 09:00-18:00'
          },
          tags: ['건강검진', '무료', '예약필수'],
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '2',
          title: '실버 요가 교실',
          description: '시니어를 위한 요가 수업입니다. 초보자도 쉽게 따라할 수 있는 프로그램입니다.',
          category: 'exercise',
          startDate: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000),
          endDate: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000 + 1.5 * 60 * 60 * 1000),
          location: {
            id: 'loc2',
            name: '청운동 복지관',
            address: '서울시 종로구 청운효자동 123',
            coordinates: { lat: 37.5756, lng: 126.9705 },
            city: '서울시',
            district: '종로구',
            neighborhood: '청운동'
          },
          capacity: 20,
          registered: 15,
          registrationRequired: true,
          contactInfo: {
            phone: '02-735-1234',
            hours: '평일 09:00-18:00'
          },
          tags: ['운동', '요가', '초보환영'],
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '3',
          title: '디지털 교육 - 스마트폰 기초',
          description: '스마트폰 사용법을 처음부터 차근차근 배우는 교육 프로그램입니다.',
          category: 'education',
          startDate: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000),
          endDate: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
          location: {
            id: 'loc3',
            name: '종로구 디지털센터',
            address: '서울시 종로구 삼봉로 43',
            coordinates: { lat: 37.5735, lng: 126.9788 },
            city: '서울시',
            district: '종로구',
            neighborhood: '종로1가'
          },
          capacity: 15,
          registered: 8,
          registrationRequired: true,
          contactInfo: {
            phone: '02-2148-1234',
            hours: '평일 09:00-18:00'
          },
          tags: ['디지털교육', '스마트폰', '기초'],
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '4',
          title: '경로당 점심 급식',
          description: '매일 제공되는 무료 점심 급식입니다. 영양사가 설계한 건강한 식단을 제공합니다.',
          category: 'meal',
          startDate: new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000),
          endDate: new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000 + 1.5 * 60 * 60 * 1000),
          location: {
            id: 'loc4',
            name: '청운동 경로당',
            address: '서울시 종로구 청운효자동 456',
            coordinates: { lat: 37.5756, lng: 126.9705 },
            city: '서울시',
            district: '종로구',
            neighborhood: '청운동'
          },
          registrationRequired: false,
          contactInfo: {
            phone: '02-735-5678',
            hours: '평일 11:30-13:00'
          },
          tags: ['무료급식', '매일제공', '영양식'],
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '5',
          title: '전통 문화 체험 - 서예교실',
          description: '붓글씨를 배우며 전통 문화를 체험하는 시간입니다. 모든 재료가 제공됩니다.',
          category: 'cultural',
          startDate: new Date(today.getTime() + 4 * 24 * 60 * 60 * 1000),
          endDate: new Date(today.getTime() + 4 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
          location: {
            id: 'loc5',
            name: '종로문화원',
            address: '서울시 종로구 인사동길 32',
            coordinates: { lat: 37.5715, lng: 126.9860 },
            city: '서울시',
            district: '종로구',
            neighborhood: '인사동'
          },
          capacity: 25,
          registered: 18,
          registrationRequired: true,
          contactInfo: {
            phone: '02-734-8765',
            hours: '평일 09:00-18:00'
          },
          tags: ['전통문화', '서예', '재료제공'],
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];
      
      setSchedules(dummyData);
      setLoading(false);
    };

    loadScheduleData();
  }, []);

  // 필터링된 일정
  const filteredSchedules = schedules.filter(schedule => {
    const matchesCategory = selectedCategory === 'all' || schedule.category === selectedCategory;
    const scheduleDate = schedule.startDate.toDateString();
    const targetDate = selectedDate.toDateString();
    const matchesDate = scheduleDate === targetDate || selectedDate.getTime() === 0;
    
    return matchesCategory && (selectedDate.getTime() === 0 || matchesDate);
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

  const getCategoryInfo = (categoryId: ScheduleCategory) => {
    return categories.find(cat => cat.id === categoryId) || categories[0];
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ko-KR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ko-KR', {
      month: 'long',
      day: 'numeric',
      weekday: 'short'
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isFull = (schedule: Schedule): boolean => {
    return !!(schedule.capacity && schedule.registered && schedule.registered >= schedule.capacity);
  };

  return (
    <div className="schedule-page">
      {/* 페이지 헤더 */}
      <div className="page-header">
        <h1 className="page-title" onClick={() => speakText('일정표 페이지')}>
          📅 일정표
        </h1>
        <p className="page-description">
          복지관 프로그램과 일정을 확인하세요
        </p>
      </div>

      {/* 필터 섹션 */}
      <section className="filter-section">
        <div className="date-selector">
          <label htmlFor="date-input" className="date-label">
            <Calendar size={20} />
            날짜 선택
          </label>
          <input
            id="date-input"
            type="date"
            className="date-input"
            value={selectedDate.toISOString().split('T')[0]}
            onChange={(e) => {
              const newDate = new Date(e.target.value);
              setSelectedDate(newDate);
              speakText(`${newDate.toLocaleDateString('ko-KR')} 선택됨`);
            }}
          />
          <button
            className="today-button"
            onClick={() => {
              setSelectedDate(new Date());
              speakText('오늘 날짜로 변경되었습니다');
            }}
          >
            오늘
          </button>
        </div>

        {/* 카테고리 필터 */}
        <div className="category-filters">
          <div className="filter-label">
            <Filter size={18} />
            <span>분류</span>
          </div>
          <div className="filter-buttons">
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
                >
                  <IconComponent size={16} />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 일정 목록 */}
      <section className="schedule-section">
        <div className="section-header">
          <h2 className="section-title">
            {formatDate(selectedDate)} 일정
          </h2>
          <span className="schedule-count">
            {filteredSchedules.length}개 일정
          </span>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>일정 정보를 불러오는 중...</p>
          </div>
        ) : filteredSchedules.length === 0 ? (
          <div className="no-schedule">
            <Calendar size={48} />
            <p>선택하신 날짜에 일정이 없습니다.</p>
            <button 
              className="btn btn-primary"
              onClick={() => {
                setSelectedDate(new Date());
                setSelectedCategory('all');
                speakText('필터를 초기화했습니다');
              }}
            >
              전체 일정 보기
            </button>
          </div>
        ) : (
          <div className="schedule-list">
            {filteredSchedules.map((schedule) => {
              const categoryInfo = getCategoryInfo(schedule.category);
              const CategoryIcon = categoryInfo.icon;
              
              return (
                <article 
                  key={schedule.id} 
                  className={`schedule-card ${isToday(schedule.startDate) ? 'today' : ''}`}
                  onClick={() => speakText(`${schedule.title}. ${schedule.description}`)}
                >
                  <div className="schedule-card-header">
                    <div 
                      className="category-badge"
                      style={{ '--category-color': categoryInfo.color } as React.CSSProperties}
                    >
                      <CategoryIcon size={16} />
                      <span>{categoryInfo.name}</span>
                    </div>
                    
                    <div className="time-info">
                      <Clock size={14} />
                      <span>
                        {formatTime(schedule.startDate)} - {formatTime(schedule.endDate)}
                      </span>
                    </div>
                  </div>

                  <div className="schedule-card-content">
                    <h3 className="schedule-title">{schedule.title}</h3>
                    <p className="schedule-description">{schedule.description}</p>

                    <div className="schedule-details">
                      <div className="detail-item location-info">
                        <MapPin size={16} />
                        <div>
                          <div className="location-name">{schedule.location.name}</div>
                          <div className="location-address">{schedule.location.address}</div>
                        </div>
                      </div>

                      {schedule.capacity && (
                        <div className="detail-item capacity-info">
                          <Users size={16} />
                          <div>
                            <div className={`capacity-status ${isFull(schedule) ? 'full' : ''}`}>
                              {schedule.registered || 0} / {schedule.capacity}명
                              {isFull(schedule) && <span className="full-badge">마감</span>}
                            </div>
                            <div className="registration-status">
                              {schedule.registrationRequired ? '사전 예약 필수' : '당일 신청 가능'}
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="detail-item contact-info">
                        <Phone size={16} />
                        <div>
                          <div className="contact-phone">{schedule.contactInfo.phone}</div>
                          <div className="contact-hours">{schedule.contactInfo.hours}</div>
                        </div>
                      </div>
                    </div>

                    <div className="schedule-tags">
                      {schedule.tags.map((tag, index) => (
                        <span key={index} className="schedule-tag">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="schedule-card-actions">
                    <button
                      className="btn btn-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCall(schedule.contactInfo.phone);
                      }}
                      disabled={isFull(schedule)}
                    >
                      <Phone size={16} />
                      {schedule.registrationRequired ? '예약 문의' : '전화 문의'}
                    </button>
                    
                    {isToday(schedule.startDate) && (
                      <div className="today-indicator">
                        <AlertCircle size={16} />
                        <span>오늘 일정</span>
                      </div>
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

export default SchedulePage;
