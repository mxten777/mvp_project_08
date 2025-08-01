import React, { useState, useEffect } from 'react';
import { Calendar, UtensilsCrossed, MapPin, Clock, AlertTriangle, ChefHat } from 'lucide-react';
import type { Menu, MealType, Location } from '../types';
import './MenuPage.css';

const MenuPage: React.FC = () => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  // 지역 목록
  const locations: (Location & { id: string })[] = [
    {
      id: 'all',
      name: '전체',
      address: '',
      coordinates: { lat: 0, lng: 0 },
      city: '서울시',
      district: '종로구',
      neighborhood: ''
    },
    {
      id: 'loc1',
      name: '청운동 경로당',
      address: '서울시 종로구 청운효자동 123',
      coordinates: { lat: 37.5756, lng: 126.9705 },
      city: '서울시',
      district: '종로구',
      neighborhood: '청운동'
    },
    {
      id: 'loc2',
      name: '종로구 복지관',
      address: '서울시 종로구 돈화문로 32',
      coordinates: { lat: 37.5705, lng: 126.9770 },
      city: '서울시',
      district: '종로구',
      neighborhood: '원서동'
    },
    {
      id: 'loc3',
      name: '효자동 복지센터',
      address: '서울시 종로구 효자로 35',
      coordinates: { lat: 37.5740, lng: 126.9720 },
      city: '서울시',
      district: '종로구',
      neighborhood: '효자동'
    }
  ];

  // 식사 유형 정보
  const mealTypes = [
    { id: 'breakfast' as MealType, name: '아침', icon: '🌅', time: '08:00-09:00' },
    { id: 'lunch' as MealType, name: '점심', icon: '☀️', time: '11:30-13:00' },
    { id: 'dinner' as MealType, name: '저녁', icon: '🌆', time: '17:00-18:30' },
    { id: 'snack' as MealType, name: '간식', icon: '🍪', time: '15:00-16:00' }
  ];

  // 더미 데이터
  useEffect(() => {
    const loadMenuData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const today = new Date();
      const dummyData: Menu[] = [
        {
          id: '1',
          locationId: 'loc1',
          date: new Date(today),
          mealType: 'lunch',
          items: [
            { name: '현미밥', description: '유기농 현미로 지은 건강한 밥' },
            { name: '된장찌개', description: '집에서 담근 된장으로 끓인 찌개', allergens: ['대두'] },
            { name: '불고기', description: '국산 한우로 만든 양념 불고기' },
            { name: '시금치나물', description: '철분 가득한 시금치 무침' },
            { name: '김치', description: '집에서 담근 배추김치', allergens: ['새우젓'] },
            { name: '미역국', description: '영양 만점 미역국' }
          ],
          nutritionInfo: {
            calories: 650,
            protein: 28,
            carbs: 75,
            fat: 18,
            sodium: 1200
          },
          specialNotes: ['저염식 가능', '당뇨식 대체 가능'],
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '2',
          locationId: 'loc2',
          date: new Date(today),
          mealType: 'lunch',
          items: [
            { name: '잡곡밥', description: '5가지 잡곡이 들어간 영양밥' },
            { name: '콩나물국', description: '시원한 콩나물국', allergens: ['대두'] },
            { name: '생선구이', description: '고등어 구이' },
            { name: '호박볶음', description: '달콤한 애호박 볶음' },
            { name: '무생채', description: '상큼한 무생채' },
            { name: '깍두기', description: '아삭한 깍두기' }
          ],
          nutritionInfo: {
            calories: 580,
            protein: 25,
            carbs: 70,
            fat: 15,
            sodium: 1100
          },
          specialNotes: ['알레르기 주의', '생선 대체 가능'],
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '3',
          locationId: 'loc1',
          date: new Date(today.getTime() + 24 * 60 * 60 * 1000),
          mealType: 'lunch',
          items: [
            { name: '흰밥', description: '국산 쌀로 지은 밥' },
            { name: '김치찌개', description: '돼지고기와 김치로 끓인 찌개' },
            { name: '계란말이', description: '부드러운 계란말이', allergens: ['계란'] },
            { name: '콩나물무침', description: '아삭한 콩나물 무침', allergens: ['대두'] },
            { name: '단무지', description: '달콤한 단무지' },
            { name: '요구르트', description: '유산균 음료', allergens: ['유제품'] }
          ],
          nutritionInfo: {
            calories: 620,
            protein: 22,
            carbs: 68,
            fat: 20,
            sodium: 1300
          },
          specialNotes: ['계란 알레르기 주의'],
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '4',
          locationId: 'loc3',
          date: new Date(today),
          mealType: 'snack',
          items: [
            { name: '찐 고구마', description: '달콤한 꿀고구마' },
            { name: '따뜻한 차', description: '유자차 또는 생강차' }
          ],
          nutritionInfo: {
            calories: 150,
            protein: 3,
            carbs: 35,
            fat: 0,
            sodium: 10
          },
          specialNotes: ['당뇨환자 섭취 주의'],
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];
      
      setMenus(dummyData);
      setLoading(false);
    };

    loadMenuData();
  }, []);

  // 필터링된 메뉴
  const filteredMenus = menus.filter(menu => {
    const menuDate = menu.date.toDateString();
    const targetDate = selectedDate.toDateString();
    const matchesDate = menuDate === targetDate;
    const matchesLocation = selectedLocation === 'all' || menu.locationId === selectedLocation;
    
    return matchesDate && matchesLocation;
  });

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ko-KR';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const getLocationName = (locationId: string) => {
    const location = locations.find(loc => loc.id === locationId);
    return location?.name || '알 수 없는 장소';
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const groupMenusByMealType = (menus: Menu[]) => {
    return menus.reduce((groups, menu) => {
      const mealType = menu.mealType;
      if (!groups[mealType]) {
        groups[mealType] = [];
      }
      groups[mealType].push(menu);
      return groups;
    }, {} as Record<MealType, Menu[]>);
  };

  const groupedMenus = groupMenusByMealType(filteredMenus);

  return (
    <div className="menu-page">
      {/* 페이지 헤더 */}
      <div className="page-header">
        <h1 className="page-title" onClick={() => speakText('식단표 페이지')}>
          🍽️ 식단표
        </h1>
        <p className="page-description">
          복지관과 경로당의 식단 정보를 확인하세요
        </p>
      </div>

      {/* 필터 섹션 */}
      <section className="filter-section">
        <div className="date-selector">
          <label htmlFor="menu-date-input" className="date-label">
            <Calendar size={20} />
            날짜 선택
          </label>
          <input
            id="menu-date-input"
            type="date"
            className="date-input"
            value={selectedDate.toISOString().split('T')[0]}
            onChange={(e) => {
              const newDate = new Date(e.target.value);
              setSelectedDate(newDate);
              speakText(`${newDate.toLocaleDateString('ko-KR')} 식단으로 변경되었습니다`);
            }}
          />
          <button
            className="today-button"
            onClick={() => {
              setSelectedDate(new Date());
              speakText('오늘 식단으로 변경되었습니다');
            }}
          >
            오늘
          </button>
        </div>

        <div className="location-selector">
          <label htmlFor="location-select" className="location-label">
            <MapPin size={20} />
            장소 선택
          </label>
          <select
            id="location-select"
            className="location-select"
            value={selectedLocation}
            onChange={(e) => {
              setSelectedLocation(e.target.value);
              const locationName = getLocationName(e.target.value);
              speakText(`${locationName} 선택됨`);
            }}
          >
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* 식단 섹션 */}
      <section className="menu-section">
        <div className="section-header">
          <h2 className="section-title">
            {formatDate(selectedDate)} 식단
          </h2>
          {isToday(selectedDate) && (
            <div className="today-badge">
              <Clock size={16} />
              <span>오늘</span>
            </div>
          )}
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>식단 정보를 불러오는 중...</p>
          </div>
        ) : filteredMenus.length === 0 ? (
          <div className="no-menu">
            <UtensilsCrossed size={48} />
            <p>선택하신 날짜와 장소에 식단 정보가 없습니다.</p>
            <button 
              className="btn btn-primary"
              onClick={() => {
                setSelectedDate(new Date());
                setSelectedLocation('all');
                speakText('필터를 초기화했습니다');
              }}
            >
              전체 식단 보기
            </button>
          </div>
        ) : (
          <div className="menu-list">
            {mealTypes.map((mealTypeInfo) => {
              const menusForMealType = groupedMenus[mealTypeInfo.id];
              if (!menusForMealType || menusForMealType.length === 0) {
                return null;
              }

              return (
                <div key={mealTypeInfo.id} className="meal-section">
                  <div className="meal-header">
                    <div className="meal-title">
                      <span className="meal-icon">{mealTypeInfo.icon}</span>
                      <span className="meal-name">{mealTypeInfo.name}</span>
                      <span className="meal-time">{mealTypeInfo.time}</span>
                    </div>
                  </div>

                  <div className="meal-cards">
                    {menusForMealType.map((menu) => (
                      <article 
                        key={menu.id} 
                        className="menu-card"
                        onClick={() => {
                          const menuItems = menu.items.map(item => item.name).join(', ');
                          speakText(`${getLocationName(menu.locationId)} ${mealTypeInfo.name} 식단: ${menuItems}`);
                        }}
                      >
                        <div className="menu-card-header">
                          <div className="location-info">
                            <MapPin size={16} />
                            <span>{getLocationName(menu.locationId)}</span>
                          </div>
                          {menu.nutritionInfo && (
                            <div className="calories-info">
                              <span>{menu.nutritionInfo.calories} kcal</span>
                            </div>
                          )}
                        </div>

                        <div className="menu-card-content">
                          <div className="menu-items">
                            {menu.items.map((item, index) => (
                              <div key={index} className="menu-item">
                                <div className="item-info">
                                  <span className="item-name">{item.name}</span>
                                  {item.description && (
                                    <span className="item-description">{item.description}</span>
                                  )}
                                </div>
                                {item.allergens && item.allergens.length > 0 && (
                                  <div className="allergen-warning">
                                    <AlertTriangle size={14} />
                                    <span>{item.allergens.join(', ')}</span>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>

                          {menu.nutritionInfo && (
                            <div className="nutrition-info">
                              <h4 className="nutrition-title">
                                <ChefHat size={16} />
                                영양 정보
                              </h4>
                              <div className="nutrition-details">
                                <div className="nutrition-item">
                                  <span className="nutrition-label">칼로리</span>
                                  <span className="nutrition-value">{menu.nutritionInfo.calories} kcal</span>
                                </div>
                                <div className="nutrition-item">
                                  <span className="nutrition-label">단백질</span>
                                  <span className="nutrition-value">{menu.nutritionInfo.protein}g</span>
                                </div>
                                <div className="nutrition-item">
                                  <span className="nutrition-label">탄수화물</span>
                                  <span className="nutrition-value">{menu.nutritionInfo.carbs}g</span>
                                </div>
                                <div className="nutrition-item">
                                  <span className="nutrition-label">지방</span>
                                  <span className="nutrition-value">{menu.nutritionInfo.fat}g</span>
                                </div>
                                <div className="nutrition-item">
                                  <span className="nutrition-label">나트륨</span>
                                  <span className="nutrition-value">{menu.nutritionInfo.sodium}mg</span>
                                </div>
                              </div>
                            </div>
                          )}

                          {menu.specialNotes && menu.specialNotes.length > 0 && (
                            <div className="special-notes">
                              <h4 className="notes-title">특별 안내</h4>
                              <ul className="notes-list">
                                {menu.specialNotes.map((note, index) => (
                                  <li key={index}>{note}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default MenuPage;
