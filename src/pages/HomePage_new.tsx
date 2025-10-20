import React, { useState, useEffect } from 'react';
import { MapPin, Bell, Clock, Utensils } from 'lucide-react';
import Card from '../components/common/Card';
import NotificationCard from '../components/common/NotificationCard';
import Banner from '../components/common/Banner';
import Button from '../components/common/Button';

const HomePage: React.FC = () => {
  useEffect(() => {
    // 페이지 진입 시 TTS 안내
    if ('speechSynthesis' in window) {
      const utter = new SpeechSynthesisUtterance('홈 화면입니다. 오늘도 건강하고 행복한 하루 되세요.');
      utter.lang = 'ko-KR';
      utter.rate = 0.8;
      speechSynthesis.speak(utter);
    }
  }, []);

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
        () => {
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
    <div className="space-y-10 max-w-3xl mx-auto px-2 md:px-0">
      {/* 인사말/시간/위치 프리미엄 카드 */}
      <section>
        <Card variant="primary" className="p-8 flex flex-col gap-4 items-center text-center animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-2 tracking-tight">
            안녕하세요! <span aria-label="손인사">👋</span>
          </h2>
          <p className="text-xl md:text-2xl mb-4 opacity-90 font-medium">
            오늘도 건강하고 행복한 하루 되세요
          </p>
          <div className="flex flex-col md:flex-row gap-4 w-full justify-center items-center">
            <Button
              variant="outline"
              size="lg"
              className="flex items-center gap-3 w-full md:w-auto justify-center text-xl bg-white/30 hover:bg-white/50"
              onClick={() => speakText(`현재 시간은 ${formatTime(currentTime)}입니다`)}
              aria-label="현재 시간 듣기"
            >
              <Clock size={28} />
              <span className="font-mono text-2xl">{formatTime(currentTime)}</span>
            </Button>
            <div className="text-lg md:text-xl opacity-80 flex items-center gap-2">
              <span className="sr-only">날짜</span>
              {formatDate(currentTime)}
            </div>
            <Button
              variant="outline"
              size="lg"
              className="flex items-center gap-3 w-full md:w-auto justify-center text-xl bg-white/30 hover:bg-white/50"
              onClick={() => speakText(`현재 위치는 ${location}입니다`)}
              aria-label="현재 위치 듣기"
            >
              <MapPin size={24} />
              <span>{location}</span>
            </Button>
          </div>
        </Card>
      </section>

      {/* 빠른 메뉴 프리미엄 섹션 */}
      <section style={{
        background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
        padding: '24px',
        margin: '24px 0',
        borderRadius: '20px',
        boxShadow: '0 10px 25px rgba(59, 130, 246, 0.1)',
        minHeight: '400px'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '24px',
          padding: '16px',
          background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
          borderRadius: '16px',
          color: 'white'
        }}>
          <h3 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0' }}>
            🎯 자주 찾는 주요 메뉴를 한눈에!
          </h3>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {quickActions.map((action, index) => {
            const colors = [
              { bg: '#ffffff', border: '#3b82f6', button: '#3b82f6', icon: '🔔' },
              { bg: '#ffffff', border: '#10b981', button: '#10b981', icon: '⏰' },
              { bg: '#ffffff', border: '#f59e0b', button: '#f59e0b', icon: '🍽️' }
            ];
            const color = colors[index] || colors[0];

            return (
              <div
                key={index}
                style={{
                  backgroundColor: color.bg,
                  border: `2px solid ${color.border}`,
                  borderRadius: '20px',
                  padding: '24px',
                  textAlign: 'center',
                  minHeight: '220px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.08)';
                }}
              >
                <div>
                  <div style={{
                    fontSize: '48px',
                    marginBottom: '16px',
                    background: `linear-gradient(135deg, ${color.border}, ${color.button})`,
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                    boxShadow: `0 4px 12px ${color.border}33`
                  }}>
                    {color.icon}
                  </div>
                  <h4 style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    marginBottom: '12px',
                    color: '#1f2937',
                    lineHeight: '1.3'
                  }}>
                    {action.title}
                  </h4>
                  <p style={{
                    fontSize: '16px',
                    color: '#6b7280',
                    marginBottom: '20px',
                    lineHeight: '1.5'
                  }}>
                    {action.description}
                  </p>
                </div>
                <button
                  style={{
                    background: `linear-gradient(135deg, ${color.button}, ${color.border})`,
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '12px',
                    border: 'none',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: `0 4px 12px ${color.button}33`
                  }}
                  onClick={action.action}
                  onMouseEnter={() => speakText(action.title)}
                >
                  바로가기
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* 최근 알림 프리미엄 카드 섹션 */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">최근 알림</h3>
          <Button
            variant="outline"
            size="md"
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium"
            onClick={() => speakText('모든 알림을 확인합니다')}
          >
            전체 보기
          </Button>
        </div>
        <div className="space-y-5">
          {recentNotifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              title={notification.title}
              content={notification.content}
              time={notification.time}
              priority={notification.priority as 'normal' | 'high'}
              icon={notification.priority === 'high' ? <Bell size={20} /> : undefined}
              onClick={() => speakText(`${notification.title}. ${notification.content}`)}
              className="animate-fade-in"
            />
          ))}
        </div>
      </section>

      {/* 긴급 연락처 프리미엄 배너/버튼 섹션 */}
      <section>
        <Banner color="danger" className="mb-4 text-xl font-semibold flex items-center gap-3">
          <span className="text-2xl">🚨</span>
          <span>긴급 상황 시 아래 번호로 바로 연락하세요!</span>
        </Banner>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Button
            variant="danger"
            size="lg"
            className="w-full flex items-center justify-center text-xl gap-3 shadow-lg"
            onClick={() => {
              speakText('119 화재 신고');
              window.location.href = 'tel:119';
            }}
            aria-label="119 화재·구급 신고"
          >
            🚨 119 (화재·구급)
          </Button>
          <Button
            variant="primary"
            size="lg"
            className="w-full flex items-center justify-center text-xl gap-3 shadow-lg"
            onClick={() => {
              speakText('112 경찰 신고');
              window.location.href = 'tel:112';
            }}
            aria-label="112 경찰 신고"
          >
            🚔 112 (경찰)
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="w-full flex items-center justify-center text-xl gap-3 shadow-lg"
            onClick={() => {
              speakText('복지센터 연락');
              window.location.href = 'tel:02-123-4567';
            }}
            aria-label="복지센터 연락"
          >
            🏢 복지센터
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;