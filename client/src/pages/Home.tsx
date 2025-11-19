import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // カスタムカーソル
  useEffect(() => {
    const cursor = document.createElement('div');
    const follower = document.createElement('div');
    cursor.className = 'cursor';
    follower.className = 'follower';
    document.body.appendChild(cursor);
    document.body.appendChild(follower);

    const moveCursor = (e: MouseEvent) => {
      cursor.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      follower.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
    };

    document.addEventListener('mousemove', moveCursor);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      cursor.remove();
      follower.remove();
    };
  }, []);

  // スクロール進捗を追跡
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = Math.min(scrolled / documentHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen relative bg-gray-100">
      {/* ハンバーガーメニュー */}
      <div className="fixed top-6 right-6 z-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMenuOpen(!menuOpen)}
          className="bg-white/80 backdrop-blur-sm shadow-lg"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* メニューオーバーレイ */}
      {menuOpen && (
        <div className="fixed inset-0 bg-white/95 backdrop-blur-sm z-40">
          <nav className="flex items-center justify-center h-full">
            <ul className="space-y-8 text-center text-2xl font-light">
              <li><button onClick={() => scrollToSection('profile')} className="hover:opacity-70 transition-opacity">01 PROFILE</button></li>
              <li><button onClick={() => scrollToSection('oicot')} className="hover:opacity-70 transition-opacity">02 OICOT FUKUI</button></li>
              <li><button onClick={() => scrollToSection('sns')} className="hover:opacity-70 transition-opacity">03 SNS</button></li>
              <li><button onClick={() => scrollToSection('news')} className="hover:opacity-70 transition-opacity">04 NEWS</button></li>
              <li><button onClick={() => scrollToSection('works')} className="hover:opacity-70 transition-opacity">05 WORKS</button></li>
              <li><button onClick={() => scrollToSection('contact')} className="hover:opacity-70 transition-opacity">06 CONTACT</button></li>
            </ul>
          </nav>
        </div>
      )}

      {/* トップセクション */}
      <div className="h-screen flex items-center justify-center px-4 bg-white">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-light tracking-widest mb-4 text-gray-800">MORI YUKA</h1>
          <p className="text-sm md:text-base tracking-wider text-gray-600 mb-12">OFFICIAL SITE</p>
          <div 
            className="relative w-full max-w-md mx-auto h-96 overflow-hidden rounded-lg shadow-2xl group"
            style={{
              filter: `grayscale(${100 - scrollProgress * 100}%)`,
              transition: 'filter 0.3s ease-out'
            }}
          >
            <img
              src="/center.png"
              alt="もりゆか"
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
              style={{
                filter: 'grayscale(100%)',
              }}
            />
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{
                backgroundImage: 'url(/center.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          </div>
        </div>
      </div>

      {/* プロフィールセクション */}
      <section id="profile" className="py-20 px-4 bg-white">
        <div className="container max-w-3xl mx-auto">
          <div className="mb-8 fade-in">
            <span className="text-sm text-gray-500 tracking-wider">01</span>
            <h2 className="text-4xl font-light tracking-wider mt-2 text-gray-800">PROFILE</h2>
          </div>
          <div className="space-y-8">
            <div 
              className="relative overflow-hidden rounded-lg shadow-lg group"
              style={{
                filter: `grayscale(${Math.max(0, 100 - scrollProgress * 300)}%)`,
                transition: 'filter 0.5s ease-out'
              }}
            >
              <img 
                src="https://iro-color.com/img/episode/about620-gray.jpg" 
                alt="もりゆか プロフィール画像"
                className="w-full transition-all duration-700 group-hover:scale-105"
              />
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  backgroundImage: 'url(https://iro-color.com/img/episode/about620-gray.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'grayscale(0%)',
                }}
              />
            </div>
            <div className="slide-in">
              <h3 className="text-2xl font-light mb-4 text-gray-800">もり ゆか・Mori Yuka</h3>
              <p className="text-gray-700 leading-relaxed">
                元アイドルとして活動し、現在は役者・タレントとして映画、ドラマ、舞台で幅広く活躍中。身長158cm。看護師免許を持つ異色の経歴を持ち、医療現場で培った人への深い理解と共感力を表現活動に活かしている。特に手話表現とダンスを得意とし、言葉だけでは伝えきれない感情や想いを身体全体で表現することを大切にしている。SNSフォロワーは35,000人以上。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OICOT FUKUIセクション */}
      <section id="oicot" className="py-20 px-4 bg-gray-50">
        <div className="container max-w-3xl mx-auto">
          <div className="mb-8 fade-in">
            <span className="text-sm text-gray-500 tracking-wider">02</span>
            <h2 className="text-4xl font-light tracking-wider mt-2 text-gray-800">OICOT FUKUI</h2>
          </div>
          <div className="space-y-8">
            <div 
              className="relative overflow-hidden rounded-lg shadow-lg group"
              style={{
                filter: `grayscale(${Math.max(0, 100 - scrollProgress * 200)}%)`,
                transition: 'filter 0.5s ease-out'
              }}
            >
              <img 
                src="https://img.freepik.com/premium-photo/wavy-black-white-background-wallpaper-grey-smooth-lines-shiny-modern-geometric-polygon-textures_1030874-14146.jpg?semt=ais_incoming&w=740&q=80" 
                alt="OICOT FUKUIロゴ"
                className="w-full transition-all duration-700 group-hover:scale-105"
              />
            </div>
            <div className="slide-in">
              <h3 className="text-2xl font-light mb-4 text-gray-800">地方エンタメの未来をつくる</h3>
              <p className="text-sm text-gray-600 mb-4">「上京しなくても、夢は叶う」を証明するプロジェクト</p>
              <p className="text-gray-700 leading-relaxed">
                地方在住の表現者が、地元にいながら活躍できる仕組みをつくる。<br/>
                企業と地元タレントをつなぐ、エンタメ支援会社。<br/>
                「もりゆか」のようなタレントを、全国へ輩出することを目指します。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SNSセクション */}
      <section id="sns" className="py-20 px-4 bg-white">
        <div className="container max-w-3xl mx-auto">
          <div className="mb-12 fade-in">
            <span className="text-sm text-gray-500 tracking-wider">03</span>
            <h2 className="text-4xl font-light tracking-wider mt-2 text-gray-800">SNS</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { name: 'Instagram', url: 'https://instagram.com/moriyuka_3', icon: 'https://page.gensparksite.com/v1/base64_upload/9d043d624bac50b9038855e00693c2cd' },
              { name: 'YouTube', url: 'https://youtube.com/@moriyuka_3', icon: 'https://page.gensparksite.com/v1/base64_upload/b97ee301a8ba50b78da9fcc210eee212' },
              { name: 'Twitter', url: 'https://x.com/moriyuka_3', icon: 'https://page.gensparksite.com/v1/base64_upload/8c673dbf83b204f7d1040026c3e61f5e' },
              { name: 'LINE', url: '#', icon: 'https://page.gensparksite.com/v1/base64_upload/636174a667819e6708139fd8288fe77f' },
              { name: 'TikTok', url: 'https://www.tiktok.com/@moriyuka_3', icon: 'https://page.gensparksite.com/v1/base64_upload/fdd01755a150b113cf82f1524b5eb511' },
              { name: 'note', url: '#', icon: 'https://page.gensparksite.com/v1/base64_upload/2a4d5e44d57122fed8ccdba2a32d04c4' },
            ].map((sns, index) => (
              <a
                key={sns.name}
                href={sns.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-4 p-6 hover:bg-gray-50 rounded-lg transition-all fade-in group"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  filter: `grayscale(${Math.max(0, 100 - scrollProgress * 150)}%)`,
                }}
              >
                <div className="relative">
                  <img 
                    src={sns.icon} 
                    alt={sns.name} 
                    className="w-16 h-16 object-contain transition-all duration-500 group-hover:scale-110"
                    style={{ filter: 'grayscale(100%)' }}
                  />
                  <img 
                    src={sns.icon} 
                    alt={sns.name} 
                    className="w-16 h-16 object-contain absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                </div>
                <p className="text-sm font-light text-gray-700">{sns.name}</p>
                <span className="text-xl text-gray-600">↑</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSセクション */}
      <section id="news" className="py-20 px-4 bg-gray-50">
        <div className="container max-w-3xl mx-auto">
          <div className="mb-12 fade-in">
            <span className="text-sm text-gray-500 tracking-wider">04</span>
            <h2 className="text-4xl font-light tracking-wider mt-2 text-gray-800">NEWS</h2>
          </div>
          <div className="space-y-6">
            {[
              { date: '2024.11.15', title: '新作映画「冬の光」出演決定' },
              { date: '2024.10.28', title: '舞台「夢の続き」千秋楽を迎えました' },
              { date: '2024.09.10', title: 'ドラマ「街の記憶」第3話放送' },
            ].map((news, index) => (
              <div 
                key={index} 
                className="border-b border-gray-200 pb-4 fade-in hover:border-gray-800 transition-colors"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <p className="text-sm text-gray-500 mb-2">{news.date}</p>
                <p className="text-lg font-light text-gray-800">{news.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORKSセクション */}
      <section id="works" className="py-20 px-4 bg-white">
        <div className="container max-w-3xl mx-auto">
          <div className="mb-12 fade-in">
            <span className="text-sm text-gray-500 tracking-wider">05</span>
            <h2 className="text-4xl font-light tracking-wider mt-2 text-gray-800">WORKS</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { category: 'MOVIE', title: '映画作品一覧' },
              { category: 'DRAMA', title: 'ドラマ作品一覧' },
              { category: 'STAGE', title: '舞台作品一覧' },
              { category: 'CM', title: 'CM作品一覧' },
              { category: 'PROMOTION', title: 'プロモーション' },
            ].map((work, index) => (
              <div 
                key={index}
                className="border border-gray-200 p-6 rounded-lg hover:bg-gray-800 hover:text-white hover:border-gray-800 transition-all cursor-pointer fade-in group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <p className="text-xs text-gray-500 group-hover:text-gray-300 mb-2 transition-colors">{work.category}</p>
                <p className="font-light text-gray-800 group-hover:text-white transition-colors">{work.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTセクション */}
      <section id="contact" className="py-20 px-4 bg-gray-50">
        <div className="container max-w-3xl mx-auto text-center">
          <div className="mb-12 fade-in">
            <span className="text-sm text-gray-500 tracking-wider">06</span>
            <h2 className="text-4xl font-light tracking-wider mt-2 text-gray-800">CONTACT</h2>
          </div>
          <div className="fade-in">
            <p className="text-gray-700 mb-8 leading-relaxed">
              お仕事のご依頼・お問い合わせは、<br className="md:hidden"/>
              下記のメールアドレスまでお願いいたします。
            </p>
            <a 
              href="mailto:contact@moriyuka.com" 
              className="inline-block text-lg font-light border-b-2 border-gray-800 hover:text-gray-600 hover:border-gray-600 transition-all"
            >
              contact@moriyuka.com
            </a>
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer className="py-8 px-4 bg-white text-center">
        <p className="text-sm text-gray-500">© 2024 MORI YUKA. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
