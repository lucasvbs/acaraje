import { useEffect, useRef, useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import logoPath from '@assets/acaraje_perfil_insta-02_no_bg.png';
import acarajeTradicional from '@assets/generated_images/acaraje-tradicional.png';
import vatapaDaRo from '@assets/generated_images/vatapa-da-ro.png';
import abaraBahiano from '@assets/generated_images/abara-bahiano.png';
import mesaBaiana from '@assets/generated_images/mesa-baiana.png';
import {
  ArrowUpRight,
  Clock3,
  Facebook,
  Instagram,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Star,
  Utensils,
  X,
} from 'lucide-react';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const revealRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const nodes = revealRefs.current.filter(Boolean) as HTMLElement[];
    if (!('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const reveal = (index: number, className = '') => (node: HTMLElement | null) => {
    revealRefs.current[index] = node;
    if (node) node.className = `${node.className} reveal ${className}`.trim();
  };

  const closeMenu = () => setMenuOpen(false);
  const ifoodUrl = 'https://www.ifood.com.br/delivery/brasilia-df/acaraje-da-ro/aguas-claras';
  const whatsappUrl = 'https://wa.me/5561986383194?text=Ol%C3%A1%2C%20Acaraj%C3%A9%20Da%20R%C3%B3!';
  const instagramUrl = 'https://www.instagram.com/acarajedaro/';
  const facebookUrl = 'https://www.facebook.com/acarajedaro';
  const galleryItems = [
    {
      name: 'Acarajé tradicional',
      description: 'Crocante por fora, cremoso por dentro e servido com camarão seco.',
      image: acarajeTradicional,
      alt: 'Acarajé dourado recheado com vatapá, camarão e vinagrete em prato escuro',
      className: 'gallery-feature',
    },
    {
      name: 'Vatapá da Ró',
      description: 'A colherada generosa que faz qualquer mesa ficar mais baiana.',
      image: vatapaDaRo,
      alt: 'Tigela de barro com vatapá cremoso e camarões por cima',
      className: '',
    },
    {
      name: 'Abará baiano',
      description: 'Macio, intenso e embrulhado na folha, do jeitinho que pede a tradição.',
      image: abaraBahiano,
      alt: 'Abarás envolvidos em folhas verdes de bananeira sobre prato de cerâmica',
      className: '',
    },
    {
      name: 'Mesa baiana',
      description: 'Quando a fome chega em grupo, a mesa responde com fartura.',
      image: mesaBaiana,
      alt: 'Mesa baiana com acarajés, vatapá, camarões e acompanhamentos',
      className: 'gallery-wide',
    },
  ];

  return (
    <div className="site-shell">
      <div className="top-strip">
        <div className="container top-strip-inner">
          <span><strong>Aberto</strong> · abrimos quarta às 17:30</span>
          <span className="top-strip-note">Águas Claras, Brasília · feito na hora</span>
        </div>
      </div>
      <header className="hero" id="inicio">
        <nav className="nav" aria-label="Navegação principal">
          <div className="container nav-inner">
            <a href="#inicio" className="brand" data-testid="link-brand" onClick={closeMenu}>
              <span className="logo-lockup">
                <img className="brand-logo" src={logoPath} alt="Acarajé Da Ró" />
                <span className="brand-place">Bahia em Águas Claras</span>
              </span>
            </a>
            <button className="mobile-toggle" type="button" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)} data-testid="button-mobile-menu">
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
              <a href="#nossa-historia" className="nav-link" onClick={closeMenu} data-testid="link-nav-historia">Nossa história</a>
              <a href="#cardapio" className="nav-link" onClick={closeMenu} data-testid="link-nav-cardapio">Cardápio</a>
              <a href="#galeria" className="nav-link" onClick={closeMenu} data-testid="link-nav-galeria">Galeria</a>
              <a href="#depoimentos" className="nav-link" onClick={closeMenu} data-testid="link-nav-depoimentos">Quem prova, volta</a>
              <a href="#visite" className="nav-link" onClick={closeMenu} data-testid="link-nav-visite">Visite a Ró</a>
              <a href={ifoodUrl} target="_blank" rel="noreferrer" className="nav-cta" data-testid="link-nav-ifood">Pedir no iFood <ArrowUpRight size={15} /></a>
            </div>
          </div>
        </nav>

        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="eyebrow hero-kicker">Tempero baiano em Brasília</span>
            <h1 className="display hero-title">A Bahia<br />mora <em>aqui.</em></h1>
            <p className="hero-lede">O verdadeiro e melhor acarajé de Brasília, venha conferir! Massa feita na hora, dendê no ponto e aquela acolhida que faz a gente sentar sem pressa.</p>
            <div className="hero-actions">
              <a href={ifoodUrl} target="_blank" rel="noreferrer" className="button button-primary" data-testid="link-hero-ifood">Ver cardápio no iFood <ArrowUpRight size={17} /></a>
              <a href="#visite" className="button button-ghost" data-testid="link-hero-visite">Como chegar <MapPin size={16} /></a>
            </div>
            <div className="hero-meta">
              <div className="meta-item"><span className="meta-value">4,7 <small>/ 5</small></span><span className="meta-label">Google · 402 avaliações</span></div>
              <div className="meta-item"><span className="meta-value">R$ 20–40</span><span className="meta-label">por pessoa</span></div>
              <div className="meta-item"><span className="meta-value">desde cedo</span><span className="meta-label">feito à mão</span></div>
            </div>
          </div>
          <div className="food-art-wrap" aria-label="Ilustração de um acarajé recheado servido em um prato" role="img">
            <div className="food-art-shadow" />
            <div className="food-art">
              <div className="art-stamp"><strong>100%</strong> feito à mão<br />com dendê</div>
              <div className="garnish" />
              <div className="acaraje" />
              <div className="plate" />
            </div>
          </div>
        </div>
      </header>
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          <span className="marquee-item">Acarajé quentinho</span><span className="marquee-item">Vatapá cremoso</span><span className="marquee-item">Camarão seco</span><span className="marquee-item">Delícia da Bahia</span>
          <span className="marquee-item">Acarajé quentinho</span><span className="marquee-item">Vatapá cremoso</span><span className="marquee-item">Camarão seco</span><span className="marquee-item">Axé na mesa</span>
        </div>
      </div>
      <main>
        <section className="section story" id="nossa-historia">
          <div className="container story-grid">
            <div className="story-card reveal" ref={reveal(0)}>
              <p className="story-note">“Comida boa é a que faz a conversa durar mais.”</p>
              <p className="story-sign">— Ró, com carinho</p>
            </div>
            <div className="story-copy reveal delay-1" ref={reveal(1)}>
              <span className="eyebrow">Nossa história</span>
              <h2 className="display section-title">Um pedacinho da Bahia, bem no meio do cerrado.</h2>
              <p>O Acarajé Da Ró nasceu para matar a saudade da Bahia e criar novas memórias em Brasília. Aqui, cada bolinho é moldado na mão, frito no dendê e montado com a generosidade que a gente aprendeu lá.</p>
              <p>É comida de rua no melhor sentido: sem cerimônia, com sabor marcante e feita para compartilhar. Chegue como quem visita um amigo. A mesa é sua.</p>
              <div className="story-facts">
                <div className="fact"><Utensils size={20} /><strong>Feito na hora</strong><span>Massa, recheio e montagem sem atalhos.</span></div>
                <div className="fact"><MessageCircle size={20} /><strong>Recebido com carinho</strong><span>Um lugar para comer e ficar à vontade.</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="section menu-section" id="cardapio">
          <div className="container menu-layout">
            <div className="menu-intro reveal" ref={reveal(2)}>
              <span className="eyebrow">Da nossa cozinha</span>
              <h2 className="display section-title">O clássico que abraça.</h2>
              <p className="section-lede">O cardápio cabe na mão, mas a vontade de provar tudo não. Escolha seu acarajé, capriche nos complementos e deixe o dendê fazer o resto.</p>
              <div className="menu-bottom">
                <p>Faixa de preço<br /><strong>R$ 20–40 por pessoa</strong></p>
                <a href={ifoodUrl} target="_blank" rel="noreferrer" className="button button-dark" data-testid="link-menu-ifood">Pedir agora <ArrowUpRight size={16} /></a>
              </div>
            </div>
            <div className="menu-board reveal delay-1" ref={reveal(3)}>
              <article className="menu-item"><h3>Acarajé tradicional</h3><p>O bolinho de feijão-fradinho, vatapá, camarão seco e vinagrete.</p><span className="menu-price">o ponto de partida</span></article>
              <article className="menu-item"><h3>Acarajé completo</h3><p>Vatapá cremoso, caruru, camarão e tudo o que a fome baiana pede.</p><span className="menu-price">para chegar com vontade</span></article>
              <article className="menu-item"><h3>Abará</h3><p>Feijão-fradinho temperado, envolvido na folha de bananeira e cozido no vapor.</p><span className="menu-price">macio, intenso, baiano</span></article>
              <article className="menu-item"><h3>Porção de camarão</h3><p>Camarão seco com tempero da casa para começar a conversa.</p><span className="menu-price">para compartilhar</span></article>
              <article className="menu-item"><h3>Vatapá da Ró</h3><p>Creme encorpado de pão, castanha, leite de coco e dendê.</p><span className="menu-price">colherada generosa</span></article>
              <article className="menu-item"><h3>Para acompanhar</h3><p>Refrigerante gelado, sucos e aquele cafezinho para fechar bonito.</p><span className="menu-price">mesa completa</span></article>
            </div>
          </div>
        </section>

        <section className="section gallery-section" id="galeria">
          <div className="container">
            <div className="gallery-heading reveal" ref={reveal(4)}>
              <div>
                <span className="eyebrow">Olha só essa mesa</span>
                <h2 className="display section-title">Feito para abrir o apetite.</h2>
              </div>
              <p className="section-lede">Tem coisa que a gente explica. E tem coisa que chega quentinha, dourada e fala por si.</p>
            </div>
            <div className="gallery-grid">
              {galleryItems.map((item, index) => (
                <figure className={`gallery-card ${item.className} reveal delay-${(index % 3) + 1}`} ref={reveal(5 + index)} key={item.name} data-testid={`card-gallery-${index}`}>
                  <div className="gallery-image-wrap">
                    <img src={item.image} alt={item.alt} loading={index === 0 ? 'eager' : 'lazy'} data-testid={`img-gallery-${index}`} />
                    <span className="gallery-index">0{index + 1}</span>
                  </div>
                  <figcaption>
                    <div>
                      <h3>{item.name}</h3>
                      <p>{item.description}</p>
                    </div>
                    <span className="gallery-arrow" aria-hidden="true"><ArrowUpRight size={17} /></span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="section rating-band">
          <div className="container rating-grid">
            <div className="reveal" ref={reveal(9)}>
              <span className="eyebrow" style={{ color: 'hsl(var(--accent))' }}>A cidade aprovou</span>
              <h2 className="display rating-title">Sabor que<br />vira ponto de encontro.</h2>
              <p className="rating-copy">Tem gente que vem pela primeira vez e já sai planejando a próxima. Os números abaixo são de quem parou, provou e fez questão de contar.</p>
            </div>
            <div className="ratings reveal delay-1" ref={reveal(10)}>
              <div className="rating-row"><span className="rating-source">Google</span><strong className="rating-value">4,7</strong><span className="stars" aria-label="4 de 5 estrelas"><Star size={14} /><Star size={14} /><Star size={14} /><Star size={14} /><Star size={14} /></span><span className="rating-detail">de 5 · 402 avaliações</span></div>
              <div className="rating-row"><span className="rating-source">Facebook</span><strong className="rating-value">4,9</strong><span className="stars" aria-label="4 de 5 estrelas"><Star size={14} /><Star size={14} /><Star size={14} /><Star size={14} /><Star size={14} /></span><span className="rating-detail">de 5 · 25 votos</span></div>
            </div>
          </div>
        </section>

        <section className="section voices" id="depoimentos">
          <div className="container">
            <div className="voices-heading">
                <div className="section-heading reveal" ref={reveal(11)}>
                <span className="eyebrow">Quem prova, volta</span>
                <h2 className="display section-title">A palavra é de quem sentou à mesa.</h2>
              </div>
              <span className="voices-mark" aria-hidden="true">“</span>
            </div>
            <div className="quotes">
              <blockquote className="quote reveal" ref={reveal(12)}>
                <p>“O melhor acarajé que já comi em Brasília. Tudo muito saboroso, bem servido e o atendimento é aquele que faz a gente se sentir em casa.”</p>
                <footer><strong>Denice Damasceno</strong><span>cliente da casa</span></footer>
              </blockquote>
              <blockquote className="quote quote-small reveal delay-1" ref={reveal(13)}>
                <p>“Tem gosto de Bahia de verdade. O vatapá é especial e a Ró é uma simpatia só.”</p>
                <footer><strong>Rogério Pereira</strong><span>cliente da casa</span></footer>
              </blockquote>
            </div>
          </div>
        </section>

        <section className="section visit" id="visite">
          <div className="container visit-grid">
            <div className="reveal" ref={reveal(14)}>
              <span className="eyebrow">Chegue mais</span>
              <h2 className="display section-title">A gente te espera em Águas Claras.</h2>
              <p className="section-lede">Tem mesa do lado de fora, brisa boa e espaço para deixar o relógio de lado. Não fazemos reservas: é só chegar.</p>
              <div className="visit-details">
                <div className="visit-detail"><MapPin size={19} /><div><strong>Endereço</strong><span>Q. 103 - Águas Claras,<br />Brasília - DF, 71909-000</span></div></div>
                <div className="visit-detail"><Clock3 size={19} /><div><strong>Horários</strong><span><strong>Fechado agora</strong><br />Abre quarta às 17:30</span></div></div>
                <div className="visit-detail"><Phone size={19} /><div><strong>Fale com a Ró</strong><a href="tel:+5561986383194" data-testid="link-phone">(61) 98638-3194</a></div></div>
                <div className="visit-detail"><Utensils size={19} /><div><strong>Na casa</strong><span>Mesas ao ar livre<br />Não fazemos reservas</span></div></div>
              </div>
            </div>
            <div className="map-card reveal delay-1" ref={reveal(15)}>
              <div className="map-content">
                <div className="map-pin"><MapPin size={21} /></div>
                <h3>Vem pelo cheiro.</h3>
                <p>Q. 103 - Águas Claras, Brasília. Abra o mapa e trace seu caminho até o acarajé.</p>
                <a className="button button-primary" href="https://www.google.com/maps/search/?api=1&query=Acaraj%C3%A9+Da+R%C3%B3+%C3%81guas+Claras+Bras%C3%ADlia" target="_blank" rel="noreferrer" style={{ marginTop: 20 }} data-testid="link-google-maps">Abrir no mapa <ArrowUpRight size={15} /></a>
              </div>
            </div>
          </div>
        </section>

        <section className="final-cta">
          <div className="container cta-inner">
            <div>
              <span className="eyebrow" style={{ color: 'hsl(var(--secondary))' }}>Quando bater a vontade</span>
              <h2 className="display cta-title">Seu próximo acarajé já tem endereço.</h2>
            </div>
            <div>
              <p className="cta-copy">Peça pelo iFood ou fale com a gente pelo WhatsApp. O tempero é o mesmo, a saudade também.</p>
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="button button-cta" data-testid="link-cta-whatsapp">Chamar no WhatsApp <MessageCircle size={17} /></a>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <a href="#inicio" className="brand" data-testid="link-footer-brand">
              <span className="logo-lockup">
                <img className="brand-logo" src={logoPath} alt="Acarajé Da Ró" />
                <span className="brand-place">Bahia em Águas Claras</span>
              </span>
            </a>
            <div className="footer-nav">
              <a href="#nossa-historia" data-testid="link-footer-historia">Nossa história</a>
              <a href="#cardapio" data-testid="link-footer-cardapio">Cardápio</a>
              <a href="#galeria" data-testid="link-footer-galeria">Galeria</a>
              <a href="#visite" data-testid="link-footer-visite">Visite a Ró</a>
              <a href={ifoodUrl} target="_blank" rel="noreferrer" data-testid="link-footer-ifood">iFood <ArrowUpRight size={13} /></a>
            </div>
            <div className="socials">
              <a href={instagramUrl} target="_blank" rel="noreferrer" className="social" aria-label="Instagram do Acarajé Da Ró" data-testid="link-instagram"><Instagram size={16} /></a>
              <a href={facebookUrl} target="_blank" rel="noreferrer" className="social" aria-label="Facebook do Acarajé Da Ró" data-testid="link-facebook"><Facebook size={16} /></a>
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="social" aria-label="WhatsApp do Acarajé Da Ró" data-testid="link-whatsapp"><MessageCircle size={16} /></a>
            </div>
          </div>
          <div className="footer-bottom"><span>© {new Date().getFullYear()} Acarajé Da Ró · Brasília, DF</span><span>Feito com dendê e carinho.</span></div>
        </div>
      </footer>
    </div>
  );
}

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
