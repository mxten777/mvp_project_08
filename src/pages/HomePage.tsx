import React, { useState, useEffect } from 'react';
import { MapPin, Bell, Clock, Utensils } from 'lucide-react';
import './HomePage.css';

const HomePage: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [location, setLocation] = useState<string>('위치를 확인하는 중...');

  useEffect(() => {
    // 시간 업데이트
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // 위치 정보 가져오기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (_position) => {
          // 실제 구현에서는 reverse geocoding API 사용
          setLocation('서울시 종로구 청운동');
        },
        () => {
          setLocation('위치 정보를 가져올 수 없습니다');
        }
      );
    }

    return () => clearInterval(timer);
  }, []);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ko-KR';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  const quickActions = [
    {
      title: '오늘의 복지 정보',
      description: '새로운 복지 혜택을 확인하세요',
      icon: Bell,
      action: () => {
        speakText('복지 정보 페이지로 이동합니다');
        // navigate('/welfare');
      },
      color: 'var(--primary-color)'
    },
    {
      title: '이번 주 일정',
      description: '복지관 프로그램 일정을 확인하세요',
      icon: Clock,
      action: () => {
        speakText('일정표 페이지로 이동합니다');
        // navigate('/schedule');
      },
      color: 'var(--secondary-color)'
    },
    {
      title: '오늘의 식단',
      description: '복지관 식단을 확인하세요',
      icon: Utensils,
      action: () => {
        speakText('식단표 페이지로 이동합니다');
        // navigate('/menu');
      },
      color: 'var(--accent-color)'
    }
  ];

  const recentNotifications = [
    {
      id: 1,
      title: '건강검진 안내',
      content: '무료 건강검진이 내일부터 시작됩니다.',
      time: '30분 전',
      priority: 'high'
    },
    {
      id: 2,
      title: '점심 식단 변경',
      content: '오늘 점심 메뉴가 변경되었습니다.',
      time: '1시간 전',
      priority: 'normal'
    },
    {
      id: 3,
      title: '문화 프로그램 신청',
      content: '서예 교실 신청이 시작되었습니다.',
      time: '2시간 전',
      priority: 'normal'
    }
  ];

  return (
    <div className="home-page">
      {/* 인사말과 시간 섹션 */}
      <section className="welcome-section">
        <div className="card welcome-card">
          <div className="welcome-content">
            <h2 className="welcome-title">
              안녕하세요! 👋
            </h2>
            <p className="welcome-message">
              오늘도 건강하고 행복한 하루 되세요
            </p>
            
            <div className="time-info">
              <div className="current-time" onClick={() => speakText(`현재 시간은 ${formatTime(currentTime)}입니다`)}>
                <Clock size={20} />
                <span>{formatTime(currentTime)}</span>
              </div>
              <div className="current-date">{formatDate(currentTime)}</div>
            </div>

            <div className="location-info" onClick={() => speakText(`현재 위치는 ${location}입니다`)}>
              <MapPin size={18} />
              <span>{location}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 빠른 메뉴 섹션 */}
      <section className="quick-actions-section">
        <h3 className="section-title">빠른 메뉴</h3>
        <div className="quick-actions-grid">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <button
                key={index}
                className="quick-action-card"
                onClick={action.action}
                style={{ '--accent-color': action.color } as React.CSSProperties}
                onMouseEnter={() => speakText(action.title)}
              >
                <div className="quick-action-icon">
                  <IconComponent size={32} />
                </div>
                <div className="quick-action-content">
                  <h4 className="quick-action-title">{action.title}</h4>
                  <p className="quick-action-description">{action.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 최근 알림 섹션 */}
      <section className="notifications-section">
        <div className="section-header">
          <h3 className="section-title">최근 알림</h3>
          <button 
            className="btn btn-secondary"
            onClick={() => speakText('모든 알림을 확인합니다')}
          >
            전체 보기
          </button>
        </div>
        
        <div className="notifications-list">
          {recentNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`notification-card ${notification.priority === 'high' ? 'priority-high' : ''}`}
              onClick={() => speakText(`${notification.title}. ${notification.content}`)}
            >
              <div className="notification-content">
                <h4 className="notification-title">{notification.title}</h4>
                <p className="notification-text">{notification.content}</p>
                <span className="notification-time">{notification.time}</span>
              </div>
              {notification.priority === 'high' && (
                <div className="priority-indicator" aria-label="중요 알림">
                  <Bell size={16} />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 긴급 연락처 섹션 */}
      <section className="emergency-section">
        <div className="card emergency-card">
          <h3 className="emergency-title">긴급 연락처</h3>
          <div className="emergency-contacts">
            <button 
              className="emergency-button"
              onClick={() => {
                speakText('119 화재 신고');
                window.location.href = 'tel:119';
              }}
            >
              🚨 119 (화재·구급)
            </button>
            <button 
              className="emergency-button"
              onClick={() => {
                speakText('112 경찰 신고');
                window.location.href = 'tel:112';
              }}
            >
              🚔 112 (경찰)
            </button>
            <button 
              className="emergency-button"
              onClick={() => {
                speakText('복지센터 연락');
                window.location.href = 'tel:02-123-4567';
              }}
            >
              🏢 복지센터
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
