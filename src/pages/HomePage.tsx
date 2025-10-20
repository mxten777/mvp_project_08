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
    <div className="space-y-6 md:space-y-10 w-full px-2 md:px-0">
      {/* 인사말/시간/위치 프리미엄 카드 */}
      <section>
        <Card variant="primary" className="p-4 md:p-8 flex flex-col gap-3 md:gap-4 items-center text-center animate-fade-in">
          <h2 className="text-2xl md:text-4xl font-extrabold mb-2 tracking-tight">
            안녕하세요! <span aria-label="손인사">👋</span>
          </h2>
          <p className="text-lg md:text-2xl mb-4 opacity-90 font-medium">
            오늘도 건강하고 행복한 하루 되세요
          </p>
          <div className="flex flex-col gap-3 md:gap-4 w-full justify-center items-center">
            <Button
              variant="outline"
              size="lg"
              className="flex items-center gap-2 md:gap-3 w-full max-w-xs justify-center text-lg md:text-xl bg-white/30 hover:bg-white/50"
              onClick={() => speakText(`현재 시간은 ${formatTime(currentTime)}입니다`)}
              aria-label="현재 시간 듣기"
            >
              <Clock size={24} />
              <span className="font-mono text-xl md:text-2xl">{formatTime(currentTime)}</span>
            </Button>
            <div className="text-base md:text-xl opacity-80 flex items-center gap-2 text-center">
              <span className="sr-only">날짜</span>
              {formatDate(currentTime)}
            </div>
            <Button
              variant="outline"
              size="lg"
              className="flex items-center gap-2 md:gap-3 w-full max-w-xs justify-center text-base md:text-xl bg-white/30 hover:bg-white/50"
              onClick={() => speakText(`현재 위치는 ${location}입니다`)}
              aria-label="현재 위치 듣기"
            >
              <MapPin size={20} />
              <span className="text-sm md:text-base">{location}</span>
            </Button>
          </div>
        </Card>
      </section>

      {/* 빠른 메뉴 프리미엄 섹션 */}
      <section className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 md:p-6 rounded-2xl shadow-lg">
        <div className="text-center mb-4 md:mb-6 p-3 md:p-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white">
          <h3 className="text-lg md:text-2xl font-bold m-0">
            🎯 자주 찾는 주요 메뉴를 한눈에!
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {quickActions.map((action, index) => {
            const colors = [
              { bg: 'bg-white', border: 'border-blue-500', button: 'bg-blue-500', hover: 'hover:bg-blue-600', icon: '🔔' },
              { bg: 'bg-white', border: 'border-green-500', button: 'bg-green-500', hover: 'hover:bg-green-600', icon: '⏰' },
              { bg: 'bg-white', border: 'border-yellow-500', button: 'bg-yellow-500', hover: 'hover:bg-yellow-600', icon: '🍽️' }
            ];
            const color = colors[index] || colors[0];

            return (
              <div
                key={index}
                className={`${color.bg} ${color.border} border-2 rounded-2xl p-4 md:p-6 text-center min-h-48 md:min-h-56 flex flex-col justify-between shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer`}
                onClick={action.action}
                onMouseEnter={() => speakText(action.title)}
              >
                <div>
                  <div className={`text-3xl md:text-4xl mb-3 md:mb-4 ${color.button} w-16 md:w-20 h-16 md:h-20 rounded-full flex items-center justify-center mx-auto shadow-md`}>
                    <span className="text-white text-xl md:text-2xl">{color.icon}</span>
                  </div>
                  <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-gray-800 leading-tight">
                    {action.title}
                  </h4>
                  <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-5 leading-relaxed">
                    {action.description}
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="md"
                  className={`w-full ${color.button} ${color.hover} text-white font-semibold shadow-md text-sm md:text-base`}
                >
                  바로가기
                </Button>
              </div>
            );
          })}
        </div>
      </section>

      {/* 최근 알림 프리미엄 카드 섹션 */}
      <section>
        <div className="flex flex-col md:flex-row gap-3 md:gap-0 md:justify-between md:items-center mb-4 md:mb-6">
          <h3 className="text-xl md:text-2xl font-bold text-gray-800">최근 알림</h3>
          <Button
            variant="outline"
            size="md"
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 md:px-4 py-2 rounded-lg font-medium text-sm md:text-base w-full md:w-auto"
            onClick={() => speakText('모든 알림을 확인합니다')}
          >
            전체 보기
          </Button>
        </div>
        <div className="space-y-3 md:space-y-5">
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
        <Banner color="danger" className="mb-3 md:mb-4 text-lg md:text-xl font-semibold flex items-center gap-2 md:gap-3">
          <span className="text-xl md:text-2xl">🚨</span>
          <span>긴급 상황 시 아래 번호로 바로 연락하세요!</span>
        </Banner>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
          <Button
            variant="danger"
            size="lg"
            className="w-full flex items-center justify-center text-lg md:text-xl gap-2 md:gap-3 shadow-lg py-4 md:py-6"
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
            className="w-full flex items-center justify-center text-lg md:text-xl gap-2 md:gap-3 shadow-lg py-4 md:py-6"
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
            className="w-full flex items-center justify-center text-lg md:text-xl gap-2 md:gap-3 shadow-lg py-4 md:py-6"
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