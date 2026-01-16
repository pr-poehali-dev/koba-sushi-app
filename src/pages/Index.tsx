import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface MenuItem {
  id: number;
  name: string;
  nameJp: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

const menuItems: MenuItem[] = [
  { id: 1, name: 'Филадельфия классик', nameJp: 'フィラデルフィア', description: 'Лосось, сливочный сыр Philadelphia, огурец', price: 420, category: 'rolls', image: '🍣' },
  { id: 2, name: 'Филадельфия лайт', nameJp: '', description: 'Лосось, сливочный сыр, огурец, авокадо, икра тобико', price: 450, category: 'rolls', image: '🍣' },
  { id: 3, name: 'Калифорния с крабом', nameJp: 'カリフォルニア', description: 'Снежный краб, авокадо, огурец, майонез, икра тобико', price: 390, category: 'rolls', image: '🍣' },
  { id: 4, name: 'Калифорния с лососем', nameJp: '', description: 'Лосось, авокадо, огурец, майонез, икра тобико', price: 410, category: 'rolls', image: '🍣' },
  { id: 5, name: 'Спайси с лососем', nameJp: 'スパイシーサーモン', description: 'Лосось, огурец, спайси соус, кунжут, зелёный лук', price: 380, category: 'rolls', image: '🍣' },
  { id: 6, name: 'Спайси с тунцом', nameJp: 'スパイシーツナ', description: 'Тунец, огурец, спайси соус, кунжут, зелёный лук', price: 420, category: 'rolls', image: '🍣' },
  { id: 7, name: 'Дракон ролл', nameJp: 'ドラゴン', description: 'Угорь, авокадо, огурец, икра масаго, соус унаги', price: 520, category: 'rolls', image: '🍣' },
  { id: 8, name: 'Цезарь ролл', nameJp: '', description: 'Курица, омлет, томаты черри, салат айсберг, соус цезарь, фурикакэ', price: 390, category: 'rolls', image: '🍣' },
  { id: 9, name: 'Ролл с креветкой темпура', nameJp: 'えび天ぷら', description: 'Креветка в темпуре, огурец, салат, икра тобико, спайси соус', price: 440, category: 'rolls', image: '🍣' },
  { id: 10, name: 'Ролл с лососем темпура', nameJp: '', description: 'Лосось в темпуре, огурец, салат, икра тобико, унаги соус', price: 460, category: 'rolls', image: '🍣' },
  { id: 11, name: 'Радуга ролл', nameJp: '', description: 'Лосось, тунец, окунь, креветка, авокадо, икра тобико', price: 490, category: 'rolls', image: '🍣' },
  { id: 12, name: 'Канада ролл', nameJp: '', description: 'Копченый лосось, угорь, сливочный сыр, огурец, унаги соус', price: 480, category: 'rolls', image: '🍣' },
  { id: 13, name: 'Тигровая креветка', nameJp: '', description: 'Тигровая креветка, авокадо, огурец, спайси майонез, икра тобико', price: 510, category: 'rolls', image: '🍣' },
  { id: 14, name: 'Унаги ролл', nameJp: 'うなぎロール', description: 'Угорь, огурец, кунжут, соус унаги', price: 450, category: 'rolls', image: '🍣' },
  
  { id: 100, name: 'Запеченный с белой рыбой', nameJp: '', description: 'Урамаки ролл в икре тобико со сливочным сыром, огурцом, омлетом, запеченный с белой рыбой, лососем, спайси соусом и сыром', price: 580, category: 'baked', image: 'https://cdn.poehali.dev/files/photo_2026-01-16_12-45-55.jpg' },
  { id: 101, name: 'Запеченный с лососем', nameJp: '', description: 'Рис, нори, лосось, огурец, сливочный сыр, сырная шапочка, соус унаги', price: 490, category: 'baked', image: 'https://cdn.poehali.dev/files/photo_2026-01-16_12-45-55.jpg' },
  { id: 102, name: 'Запеченный с курицей', nameJp: '', description: 'Рис, нори, курица гриль, помидор, сырная шапочка, терияки соус', price: 470, category: 'baked', image: 'https://cdn.poehali.dev/files/photo_2026-01-16_12-45-55.jpg' },
  { id: 103, name: 'Запеченный с креветкой', nameJp: '', description: 'Рис, нори, тигровая креветка, огурец, сырная шапочка, спайси майонез', price: 520, category: 'baked', image: 'https://cdn.poehali.dev/files/photo_2026-01-16_12-45-55.jpg' },
  { id: 104, name: 'Запеченный с крабом', nameJp: '', description: 'Рис, нори, снежный краб, огурец, авокадо, сырная шапочка', price: 470, category: 'baked', image: 'https://cdn.poehali.dev/files/photo_2026-01-16_12-45-55.jpg' },
  { id: 105, name: 'Запеченный с угрём', nameJp: '', description: 'Рис, нори, угорь, огурец, кунжут, сырная шапочка, унаги соус', price: 540, category: 'baked', image: 'https://cdn.poehali.dev/files/photo_2026-01-16_12-45-55.jpg' },
  { id: 106, name: 'Ойси ролл', nameJp: '', description: 'Рис, нори, лосось, икра томаго, икра тобико, огурец, сырная шапочка', price: 490, category: 'baked', image: 'https://cdn.poehali.dev/files/photo_2026-01-16_12-45-55.jpg' },

  { id: 200, name: 'Филадельфия сет', nameJp: '', description: 'Филадельфия классик 8 шт, Филадельфия лайт 8 шт', price: 1390, category: 'sets', image: 'https://cdn.poehali.dev/files/photo_2026-01-16_12-45-51.jpg' },
  { id: 201, name: 'Токио сет', nameJp: '', description: 'Калифорния с лососем, Спайси с лососем, Дракон ролл, Филадельфия классик', price: 1690, category: 'sets', image: 'https://cdn.poehali.dev/files/photo_2026-01-16_12-45-51.jpg' },
  { id: 202, name: 'Запеченный сет', nameJp: '', description: 'Запеченный с лососем, Запеченный с креветкой, Запеченный с курицей, Ойси ролл', price: 1890, category: 'sets', image: 'https://cdn.poehali.dev/files/photo_2026-01-16_12-45-51.jpg' },
  { id: 203, name: 'Сет для двоих', nameJp: '', description: 'Филадельфия, Калифорния, Дракон, Спайси с тунцом, Унаги ролл, Радуга ролл', price: 2790, category: 'sets', image: 'https://cdn.poehali.dev/files/photo_2026-01-16_12-45-51.jpg' },
  { id: 204, name: 'Премиум сет', nameJp: '', description: 'Тигровая креветка, Канада ролл, Радуга ролл, Запеченный с угрём, Филадельфия лайт', price: 3290, category: 'sets', image: 'https://cdn.poehali.dev/files/photo_2026-01-16_12-45-51.jpg' },
  { id: 205, name: 'Сет VIP', nameJp: '', description: 'Все хиты: Филадельфия, Калифорния, Дракон, Запеченные роллы, Темпура роллы, Спайси роллы', price: 4290, category: 'sets', image: 'https://cdn.poehali.dev/files/photo_2026-01-16_12-45-51.jpg' },

  { id: 50, name: 'Нигири лосось', nameJp: '鮭の握り', description: 'Рис, свежий лосось (2 шт)', price: 180, category: 'nigiri', image: '🍣' },
  { id: 51, name: 'Нигири тунец', nameJp: 'マグロの握り', description: 'Рис, свежий тунец (2 шт)', price: 220, category: 'nigiri', image: '🍣' },
  { id: 52, name: 'Нигири угорь', nameJp: 'うなぎの握り', description: 'Рис, угорь, соус унаги (2 шт)', price: 210, category: 'nigiri', image: '🍣' },
  { id: 53, name: 'Нигири креветка', nameJp: 'えび握り', description: 'Рис, тигровая креветка (2 шт)', price: 190, category: 'nigiri', image: '🍣' },
  { id: 54, name: 'Нигири гребешок', nameJp: 'ホタテ握り', description: 'Рис, свежий гребешок (2 шт)', price: 230, category: 'nigiri', image: '🍣' },
  { id: 55, name: 'Нигири икура', nameJp: 'いくら握り', description: 'Рис, икра лосося (2 шт)', price: 250, category: 'nigiri', image: '🍣' },

  { id: 60, name: 'Сашими лосось', nameJp: '鮭刺身', description: '5 кусочков свежего лосося (80г)', price: 420, category: 'sashimi', image: '🍱' },
  { id: 61, name: 'Сашими тунец', nameJp: 'マグロ刺身', description: '5 кусочков свежего тунца (80г)', price: 480, category: 'sashimi', image: '🍱' },
  { id: 62, name: 'Сашими ассорти', nameJp: '刺身盛り合わせ', description: 'Лосось, тунец, окунь, креветка (120г)', price: 720, category: 'sashimi', image: '🍱' },
  { id: 63, name: 'Сашими микс премиум', nameJp: '', description: 'Лосось, тунец, гребешок, угорь, икура (180г)', price: 990, category: 'sashimi', image: '🍱' },

  { id: 70, name: 'Мисо суп', nameJp: '味噌汁', description: 'Традиционный японский суп с тофу и водорослями', price: 150, category: 'other', image: '🍜' },
  { id: 71, name: 'Том Ям с креветками', nameJp: '', description: 'Острый тайский суп с тигровыми креветками', price: 320, category: 'other', image: '🍜' },
  { id: 72, name: 'Эдамаме', nameJp: '枝豆', description: 'Зелёные соевые бобы с морской солью', price: 180, category: 'other', image: '🫘' },
  { id: 73, name: 'Гункан с икрой лосося', nameJp: 'いくら軍艦', description: 'Нори, рис, икра лосося (2 шт)', price: 280, category: 'other', image: '🍣' },
  { id: 74, name: 'Гункан спайси с тунцом', nameJp: '', description: 'Нори, рис, тунец, спайси соус (2 шт)', price: 240, category: 'other', image: '🍣' },
  { id: 75, name: 'Васаби', nameJp: 'わさび', description: 'Острая японская приправа', price: 50, category: 'other', image: '🌿' },
  { id: 76, name: 'Имбирь маринованный', nameJp: '紅生姜', description: 'Розовый маринованный имбирь', price: 50, category: 'other', image: '🌸' },
  { id: 77, name: 'Соевый соус', nameJp: '醤油', description: 'Классический соевый соус', price: 30, category: 'other', image: '🥢' },
];

const reviews = [
  { id: 1, author: 'Анна К.', rating: 5, text: 'Лучшие роллы в городе! Свежие ингредиенты, быстрая доставка.' },
  { id: 2, author: 'Дмитрий М.', rating: 5, text: 'Заказываю уже третий месяц подряд. Качество всегда на высоте!' },
  { id: 3, author: 'Елена П.', rating: 5, text: 'Филадельфия просто тает во рту. Рекомендую всем!' },
];

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('rolls');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === id);
      if (existing && existing.quantity > 1) {
        return prev.map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i);
      }
      return prev.filter(i => i.id !== id);
    });
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredItems = menuItems.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <header className="sticky top-0 z-50 bg-white border-b border-red-100 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-4xl">🍣</div>
            <div>
              <h1 className="text-3xl font-bold text-red-600">TOKYO</h1>
              <p className="text-sm text-gray-600">東京寿司バー</p>
            </div>
          </div>
          
          <nav className="hidden md:flex gap-6">
            <a href="#menu" className="text-gray-700 hover:text-red-600 transition-colors">Меню</a>
            <a href="#gallery" className="text-gray-700 hover:text-red-600 transition-colors">Галерея</a>
            <a href="#delivery" className="text-gray-700 hover:text-red-600 transition-colors">Доставка</a>
            <a href="#reviews" className="text-gray-700 hover:text-red-600 transition-colors">Отзывы</a>
            <a href="#contacts" className="text-gray-700 hover:text-red-600 transition-colors">Контакты</a>
          </nav>

          <Button 
            variant="outline" 
            size="icon" 
            className="relative border-red-600 hover:bg-red-50"
            onClick={() => setIsCartOpen(!isCartOpen)}
          >
            <Icon name="ShoppingCart" size={20} className="text-red-600" />
            {totalItems > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-red-600">
                {totalItems}
              </Badge>
            )}
          </Button>
        </div>
      </header>

      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setIsCartOpen(false)}>
          <div 
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl p-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Корзина</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(false)}>
                <Icon name="X" size={24} />
              </Button>
            </div>
            
            <div className="space-y-4">
              {cart.length === 0 ? (
                <p className="text-center text-gray-500 py-8">Корзина пуста</p>
              ) : (
                <>
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">{item.price} ₽</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => removeFromCart(item.id)}>
                          <Icon name="Minus" size={14} />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => addToCart(item)}>
                          <Icon name="Plus" size={14} />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between text-lg font-bold mb-4">
                      <span>Итого:</span>
                      <span>{totalPrice} ₽</span>
                    </div>
                    <Button className="w-full bg-red-600 hover:bg-red-700">
                      Оформить заказ
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <section className="py-20 bg-gradient-to-r from-red-600 to-orange-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="text-9xl font-bold absolute top-10 left-10">寿司</div>
          <div className="text-9xl font-bold absolute bottom-10 right-10">和食</div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-bold mb-4">Суши-бар TOKYO</h2>
          <p className="text-xl md:text-2xl mb-8">Традиционная японская кухня в сердце города</p>
          <Button size="lg" variant="secondary" className="bg-white text-red-600 hover:bg-gray-100">
            <a href="#menu">Смотреть меню</a>
          </Button>
        </div>
      </section>

      <section id="menu" className="py-16 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Наше меню</h2>
          <p className="text-gray-600">私たちのメニュー</p>
        </div>

        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          <Button 
            variant={activeCategory === 'rolls' ? 'default' : 'outline'}
            onClick={() => setActiveCategory('rolls')}
            className={activeCategory === 'rolls' ? 'bg-red-600 hover:bg-red-700' : ''}
          >
            🍣 Роллы
          </Button>
          <Button 
            variant={activeCategory === 'baked' ? 'default' : 'outline'}
            onClick={() => setActiveCategory('baked')}
            className={activeCategory === 'baked' ? 'bg-red-600 hover:bg-red-700' : ''}
          >
            🔥 Запеченные роллы
          </Button>
          <Button 
            variant={activeCategory === 'sets' ? 'default' : 'outline'}
            onClick={() => setActiveCategory('sets')}
            className={activeCategory === 'sets' ? 'bg-red-600 hover:bg-red-700' : ''}
          >
            🍱 Сеты
          </Button>
          <Button 
            variant={activeCategory === 'nigiri' ? 'default' : 'outline'}
            onClick={() => setActiveCategory('nigiri')}
            className={activeCategory === 'nigiri' ? 'bg-red-600 hover:bg-red-700' : ''}
          >
            🍙 Нигири
          </Button>
          <Button 
            variant={activeCategory === 'sashimi' ? 'default' : 'outline'}
            onClick={() => setActiveCategory('sashimi')}
            className={activeCategory === 'sashimi' ? 'bg-red-600 hover:bg-red-700' : ''}
          >
            🐟 Сашими
          </Button>
          <Button 
            variant={activeCategory === 'other' ? 'default' : 'outline'}
            onClick={() => setActiveCategory('other')}
            className={activeCategory === 'other' ? 'bg-red-600 hover:bg-red-700' : ''}
          >
            🍜 Дополнительно
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <Card 
              key={item.id} 
              className="overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 animate-fade-in-up group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-6">
                <div className="overflow-hidden rounded-lg mb-4">
                  {item.image.startsWith('http') ? (
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                  ) : (
                    <div className="text-6xl text-center transition-transform duration-300 group-hover:scale-110">{item.image}</div>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-1 group-hover:text-red-600 transition-colors">{item.name}</h3>
                {item.nameJp && <p className="text-sm text-gray-500 mb-2">{item.nameJp}</p>}
                <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-red-600 animate-pulse">{item.price} ₽</span>
                  <Button 
                    onClick={() => addToCart(item)} 
                    className="bg-red-600 hover:bg-red-700 hover:scale-105 transition-transform duration-200"
                  >
                    <Icon name="Plus" size={16} className="mr-1" />
                    В корзину
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section id="gallery" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Галерея</h2>
            <p className="text-gray-600">ギャラリー</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['🍣', '🍱', '🍜', '🍙', '🥟', '🍵', '🍶', '🥢'].map((emoji, i) => (
              <div key={i} className="aspect-square bg-white rounded-lg flex items-center justify-center text-8xl hover:scale-105 transition-transform shadow-md">
                {emoji}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="delivery" className="py-16 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Доставка</h2>
          <p className="text-gray-600">配達</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="p-6 text-center">
            <Icon name="Clock" size={48} className="mx-auto mb-4 text-red-600" />
            <h3 className="text-xl font-bold mb-2">45 минут</h3>
            <p className="text-gray-600">Среднее время доставки</p>
          </Card>
          <Card className="p-6 text-center">
            <Icon name="MapPin" size={48} className="mx-auto mb-4 text-red-600" />
            <h3 className="text-xl font-bold mb-2">Бесплатно</h3>
            <p className="text-gray-600">При заказе от 1000 ₽</p>
          </Card>
          <Card className="p-6 text-center">
            <Icon name="Phone" size={48} className="mx-auto mb-4 text-red-600" />
            <h3 className="text-xl font-bold mb-2">Онлайн заказ</h3>
            <p className="text-gray-600">Через наше приложение</p>
          </Card>
        </div>
      </section>

      <section id="reviews" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Отзывы</h2>
            <p className="text-gray-600">レビュー</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {reviews.map(review => (
              <Card key={review.id} className="p-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Icon key={i} name="Star" size={20} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">{review.text}</p>
                <p className="font-medium text-gray-900">{review.author}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-16 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Контакты</h2>
          <p className="text-gray-600">連絡先</p>
        </div>
        <div className="max-w-2xl mx-auto">
          <Card className="p-8">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start gap-3">
                <Icon name="MapPin" size={24} className="text-red-600 mt-1" />
                <div>
                  <h3 className="font-bold mb-1">Адрес</h3>
                  <p className="text-gray-600">г. Москва, ул. Японская, д. 12</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="Phone" size={24} className="text-red-600 mt-1" />
                <div>
                  <h3 className="font-bold mb-1">Телефон</h3>
                  <p className="text-gray-600">+7 (495) 123-45-67</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="Clock" size={24} className="text-red-600 mt-1" />
                <div>
                  <h3 className="font-bold mb-1">Режим работы</h3>
                  <p className="text-gray-600">Ежедневно с 11:00 до 23:00</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="Mail" size={24} className="text-red-600 mt-1" />
                <div>
                  <h3 className="font-bold mb-1">Email</h3>
                  <p className="text-gray-600">info@koba-sushi.ru</p>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-6">
              <h3 className="font-bold mb-4">Напишите нам</h3>
              <form className="space-y-4">
                <Input placeholder="Ваше имя" />
                <Input type="email" placeholder="Email" />
                <Textarea placeholder="Сообщение" rows={4} />
                <Button className="w-full bg-red-600 hover:bg-red-700">Отправить</Button>
              </form>
            </div>
          </Card>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="text-4xl mb-4">🍣</div>
          <h3 className="text-2xl font-bold mb-2">TOKYO</h3>
          <p className="text-gray-400 mb-4">東京寿司バー</p>
          <p className="text-sm text-gray-500">© 2026 Суши-бар TOKYO. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;