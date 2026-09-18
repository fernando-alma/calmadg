"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Palette,
  TrendingUp,
  Instagram,
  Video,
  Camera,
  Globe,
  Check,
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
} from "lucide-react"

export default function CalmaPortfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const services = [
    {
      title: "Branding",
      description: "Construimos identidades visuales memorables.",
    },
    {
      title: "Gestión de Redes",
      description: "Creamos estrategias y contenido para conectar con clientes.",
    },
    {
      title: "Fotografía Profesional",
      description: "Imágenes profesionales para potenciar tu comunicación.",
    },
    {
      title: "Diseño Web",
      description: "Sitios modernos enfocados en experiencia y conversión.",
    },
    {
      title: "Contenido Multimedia",
      description: "Videos y piezas audiovisuales para campañas digitales.",
    },
    {
      title: "Papelería Corporativa",
      description: "Aplicaciones impresas alineadas con la identidad de marca.",
    },
  ]

  const benefits = [
    "Enfoque estratégico",
    "Diseño minimalista y funcional",
    "Contenido para vender",
    "Acompañamiento personalizado",
    "Experiencia local y regional",
  ]

  const process = [
    { step: "01", title: "Análisis", description: "Conocemos tu marca" },
    { step: "02", title: "Estrategia", description: "Definimos el rumbo" },
    { step: "03", title: "Diseño y desarrollo", description: "Creación" },
    { step: "04", title: "Implementación", description: "Puesta en marcha" },
  ]

  const navItems = ["Inicio", "Servicios", "Cómo trabajamos", "Sobre Calma", "Contacto"]

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-background/80 backdrop-blur-lg border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src="/images/logo-calma.png"
                alt="CALMA Estudio de Diseño"
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  {item}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              {/* CTA Button */}
              <Button className="hidden md:inline-flex bg-calma-pink hover:bg-calma-pink-soft text-white">
                Hablemos
              </Button>

              {/* Mobile Menu Toggle */}
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2" aria-label="Toggle menu">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <nav className="lg:hidden mt-4 pb-4 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="block py-2 hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="inicio"
        className="relative h-[100dvh] min-h-[580px] max-h-[1080px] w-full bg-black text-white flex flex-col justify-between overflow-hidden pt-20 sm:pt-24 pb-4 sm:pb-6 lg:pb-8"
      >
        {/* Desktop Laptop Graphic (Transparent PNG) */}
        <div className="absolute right-0 bottom-0 pointer-events-none select-none z-0 hidden lg:flex items-end justify-end w-[52vw] max-w-[840px] h-[82vh]">
          <img
            src="/images/hero-laptop.png"
            alt="Calma Brand Design Studio Laptop"
            className="w-full h-full object-contain object-bottom-right"
          />
        </div>
        {/* Subtle left vignette on desktop for seamless branding area */}
        <div className="absolute inset-y-0 left-0 w-[45%] bg-gradient-to-r from-black via-black/70 to-transparent pointer-events-none z-[1] hidden lg:block" />

        {/* Mobile / Tablet Laptop & Vase Graphic: sharp, crisp, 80-85% opacity, zero blur */}
        <div className="absolute right-0 bottom-10 sm:bottom-12 pointer-events-none select-none z-0 lg:hidden flex items-end justify-end w-[85%] max-w-[440px] h-[46vh]">
          <img
            src="/images/hero-laptop.png"
            alt="Calma Brand Design Studio Laptop"
            className="w-full h-full object-contain object-bottom-right opacity-80 sm:opacity-85"
          />
        </div>
        {/* Left gradient on mobile so brand text sits cleanly on pure black */}
        <div className="absolute inset-y-0 left-0 w-3/4 sm:w-1/2 bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none z-[1] lg:hidden" />

        {/* Main Branding Content */}
        <div className="container mx-auto px-6 sm:px-10 md:px-16 lg:px-20 xl:px-24 relative z-10 my-auto">
          <div className="inline-flex flex-col py-4 sm:py-8 lg:py-16 w-full max-w-[275px] sm:max-w-[380px] md:max-w-[460px] lg:max-w-[500px]">
            {/* Logo Calma: enlarged and crisp, flat matte without neon/glow */}
            <div className="w-full">
              <img
                src="/images/logo-calma.png"
                alt="Calma Estudio de Diseño"
                className="w-full h-auto object-contain block select-none"
              />
            </div>

            {/* Pink Divider Line: perfectly centered over tagline, flat matte brand pink, thicker (2.5px) */}
            <div className="w-[74%] h-[2px] sm:h-[2.5px] bg-[#e3729e] my-3 sm:my-4 self-center ml-[2.8%]" />

            {/* Tagline: BRAND DESIGN STUDIO: scaled to ~95% of logo width matching context capture, flush right */}
            <div className="w-full flex justify-end">
              <h1 className="font-serif text-[13.5px] sm:text-[19px] md:text-[23px] lg:text-[26.5px] font-bold tracking-[0.13em] sm:tracking-[0.14em] uppercase leading-tight select-none">
                <span className="text-[#e3729e]">BRAND</span>{" "}
                <span className="text-white">DESIGN STUDIO</span>
              </h1>
            </div>
          </div>
        </div>

        {/* Bottom Services Infinite Marquee Strip (All devices) */}
        <div className="relative z-20 w-full pl-0 pr-0 mt-auto flex items-center overflow-hidden">
          {/* Fixed Left Pink Line */}
          <div className="h-[2px] sm:h-[2.5px] bg-[#e3729e] flex-shrink-0 w-8 sm:w-16 md:w-28 lg:w-40 mr-3 sm:mr-5" />

          {/* Marquee Track with gradient fade on edges */}
          <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,black_85%,transparent)] sm:[mask-image:linear-gradient(to_right,black_92%,transparent)]">
            <div className="animate-marquee flex items-center gap-3 sm:gap-4 whitespace-nowrap text-[10.5px] sm:text-xs md:text-sm font-sans tracking-[0.18em] sm:tracking-[0.24em] uppercase text-zinc-300 font-light select-none py-1">
              {/* Loop Items 1 */}
              <span>BRANDING</span>
              <span className="text-[#e3729e] font-normal">·</span>
              <span>REDES SOCIALES</span>
              <span className="text-[#e3729e] font-normal">·</span>
              <span>FOTOGRAFÍA</span>
              <span className="text-[#e3729e] font-normal">·</span>
              <span>DISEÑO WEB</span>
              <span className="text-[#e3729e] font-normal">·</span>
              <span>CONTENIDO MULTIMEDIA</span>
              <span className="text-[#e3729e] font-normal mx-2">·</span>

              {/* Loop Items 2 (Duplicate for seamless loop) */}
              <span>BRANDING</span>
              <span className="text-[#e3729e] font-normal">·</span>
              <span>REDES SOCIALES</span>
              <span className="text-[#e3729e] font-normal">·</span>
              <span>FOTOGRAFÍA</span>
              <span className="text-[#e3729e] font-normal">·</span>
              <span>DISEÑO WEB</span>
              <span className="text-[#e3729e] font-normal">·</span>
              <span>CONTENIDO MULTIMEDIA</span>
              <span className="text-[#e3729e] font-normal mx-2">·</span>

              {/* Loop Items 3 */}
              <span>BRANDING</span>
              <span className="text-[#e3729e] font-normal">·</span>
              <span>REDES SOCIALES</span>
              <span className="text-[#e3729e] font-normal">·</span>
              <span>FOTOGRAFÍA</span>
              <span className="text-[#e3729e] font-normal">·</span>
              <span>DISEÑO WEB</span>
              <span className="text-[#e3729e] font-normal">·</span>
              <span>CONTENIDO MULTIMEDIA</span>
              <span className="text-[#e3729e] font-normal mx-2">·</span>

              {/* Loop Items 4 */}
              <span>BRANDING</span>
              <span className="text-[#e3729e] font-normal">·</span>
              <span>REDES SOCIALES</span>
              <span className="text-[#e3729e] font-normal">·</span>
              <span>FOTOGRAFÍA</span>
              <span className="text-[#e3729e] font-normal">·</span>
              <span>DISEÑO WEB</span>
              <span className="text-[#e3729e] font-normal">·</span>
              <span>CONTENIDO MULTIMEDIA</span>
              <span className="text-[#e3729e] font-normal mx-2">·</span>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Block */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold">
            Diseño con intención. Estrategia con resultados.
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty">
            Acompañamos a marcas, emprendedores y negocios a construir una imagen profesional, coherente y alineada a
            sus objetivos. No diseñamos solo lo visual: trabajamos la estrategia, el mensaje y la experiencia de marca.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="servicios"
        className="bg-dark-wall relative w-full overflow-hidden text-white scroll-mt-20 lg:h-[100dvh] lg:min-h-[560px] lg:max-h-[1080px] lg:flex lg:items-center"
      >
        <div className="w-full lg:h-full flex flex-col lg:flex-row lg:items-stretch lg:justify-between">
          {/* Text Column: Title & Timeline */}
          <div className="w-full lg:w-[68%] lg:h-full flex flex-col justify-center pt-20 sm:pt-24 lg:pt-14 pb-8 lg:pb-2 pl-4 sm:pl-8 md:pl-14 lg:pl-20 xl:pl-24 pr-4 sm:pr-8 md:pr-14 lg:pr-14">
            {/* Heading with horizontal line from left edge */}
            <div className="flex items-center gap-2.5 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-7 lg:mb-6">
              {/* Horizontal line extending back toward the left edge of viewport */}
              <div className="h-[1.5px] bg-white/70 w-5 sm:w-8 md:w-14 lg:w-20 -ml-4 sm:-ml-8 md:-ml-14 lg:-ml-20 xl:-ml-24 flex-shrink-0" />
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-[38px] font-bold text-white tracking-tight select-none">
                Nuestros servicios
              </h2>
            </div>

            {/* Vertical Timeline */}
            <div className="flex flex-col">
              {services.map((service, index) => {
                const isLast = index === services.length - 1
                return (
                  <div key={index} className="relative flex items-start gap-3 sm:gap-4 md:gap-5 lg:gap-5">
                    {/* Indicator Column: Dot + Connecting Line */}
                    <div className="relative flex flex-col items-center flex-shrink-0 self-stretch">
                      {/* Pink Dot */}
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#e3729e] flex-shrink-0 mt-[5px] sm:mt-[6px] z-10" />
                      {/* Pink Line down to next dot */}
                      {!isLast && <div className="w-[2px] bg-[#e3729e] flex-1" />}
                    </div>

                    {/* Service Text Content */}
                    <div className={`flex flex-col ${isLast ? "pb-0" : "pb-3 sm:pb-4 md:pb-5 lg:pb-3 xl:pb-3.5"}`}>
                      <h3 className="font-serif text-sm sm:text-base md:text-lg lg:text-base xl:text-lg font-bold text-white tracking-wide leading-snug">
                        {service.title}
                      </h3>
                      <p className="font-sans text-xs sm:text-sm md:text-base lg:text-[13px] text-zinc-300 font-light mt-0.5 sm:mt-1 leading-relaxed max-w-lg">
                        {service.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Images: Right column on desktop, horizontal strip below on tablet/mobile */}
          <div className="w-full lg:w-[32%] lg:h-full flex-shrink-0 lg:border-l border-white/5 overflow-hidden">
            {/* Desktop: stacked vertically (flex-col, each flex-1) */}
            <div className="hidden lg:flex flex-col h-full">
              <div className="flex-1 overflow-hidden">
                <img src="/images/services-img-top.webp" alt="Parche bordado Calma Estudio" className="w-full h-full object-cover object-center" />
              </div>
              <div className="flex-1 overflow-hidden border-t border-white/5">
                <img src="/images/services-img-mid.webp" alt="Correa de cuero Calma Estudio" className="w-full h-full object-cover object-center" />
              </div>
              <div className="flex-1 overflow-hidden border-t border-white/5">
                <img src="/images/services-img-bot.webp" alt="Papelería institucional Calma Estudio" className="w-full h-full object-cover object-center" />
              </div>
            </div>

            {/* Mobile / Tablet: 3 images side by side as horizontal strip */}
            <div className="flex lg:hidden flex-row h-44 sm:h-56 md:h-64 border-t border-white/10 mt-2">
              <div className="flex-1 overflow-hidden">
                <img src="/images/services-img-top.webp" alt="Parche bordado Calma Estudio" className="w-full h-full object-cover object-center" />
              </div>
              <div className="flex-1 overflow-hidden border-l border-white/10">
                <img src="/images/services-img-mid.webp" alt="Correa de cuero Calma Estudio" className="w-full h-full object-cover object-center" />
              </div>
              <div className="flex-1 overflow-hidden border-l border-white/10">
                <img src="/images/services-img-bot.webp" alt="Papelería institucional Calma Estudio" className="w-full h-full object-cover object-center" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Marcas y Proyectos Section */}
      <section
        className="bg-dark-wall relative w-full py-12 sm:py-16 overflow-hidden text-white"
      >
        {/* Title with flanking lines */}
        <div className="flex items-center justify-center gap-4 sm:gap-8 px-6 sm:px-12 mb-10 sm:mb-14">
          <div className="h-[1px] bg-white/40 flex-1 max-w-[120px] sm:max-w-[200px]" />
          <h2 className="font-sans text-xs sm:text-sm md:text-base font-semibold tracking-[0.3em] sm:tracking-[0.4em] text-white/90 uppercase whitespace-nowrap select-none">
            Marcas y Proyectos
          </h2>
          <div className="h-[1px] bg-white/40 flex-1 max-w-[120px] sm:max-w-[200px]" />
        </div>

        {/* Infinite Logo Marquee */}
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="animate-marquee-logos flex items-center gap-16 sm:gap-20 md:gap-24">
            {/* Set 1 */}
            <img src="/images/logo-escuelas-river.webp"     alt="Escuelas River Mendoza"         className="h-10 sm:h-12 md:h-14 w-auto object-contain opacity-90 flex-shrink-0" />
            <img src="/images/logo-victoria.webp"           alt="Victoria Sports Management"     className="h-10 sm:h-12 md:h-14 w-auto object-contain opacity-90 flex-shrink-0" />
            <img src="/images/logo-mercedes-palomeque.webp" alt="Mercedes Palomeque Fotografía"  className="h-10 sm:h-12 md:h-14 w-auto object-contain opacity-90 flex-shrink-0" />
            <img src="/images/logo-xauruad.webp"            alt="Xauruad Viajes y Turismo"       className="h-10 sm:h-12 md:h-14 w-auto object-contain opacity-90 flex-shrink-0" />
            <img src="/images/logo-new-1.webp"              alt="Marca 5"                        className="h-10 sm:h-12 md:h-14 w-auto object-contain opacity-90 flex-shrink-0" />
            <img src="/images/logo-new-2.webp"              alt="Marca 6"                        className="h-10 sm:h-12 md:h-14 w-auto object-contain opacity-90 flex-shrink-0" />
            <img src="/images/logo-new-3.webp"              alt="Marca 7"                        className="h-10 sm:h-12 md:h-14 w-auto object-contain opacity-90 flex-shrink-0" />
            <img src="/images/logo-new-4.webp"              alt="Marca 8"                        className="h-10 sm:h-12 md:h-14 w-auto object-contain opacity-90 flex-shrink-0" />
            <img src="/images/logo-new-5.webp"              alt="Marca 9"                        className="h-10 sm:h-12 md:h-14 w-auto object-contain opacity-90 flex-shrink-0" />
            {/* Set 2 — duplicate for seamless loop */}
            <img src="/images/logo-escuelas-river.webp"     alt="Escuelas River Mendoza"         className="h-10 sm:h-12 md:h-14 w-auto object-contain opacity-90 flex-shrink-0" />
            <img src="/images/logo-victoria.webp"           alt="Victoria Sports Management"     className="h-10 sm:h-12 md:h-14 w-auto object-contain opacity-90 flex-shrink-0" />
            <img src="/images/logo-mercedes-palomeque.webp" alt="Mercedes Palomeque Fotografía"  className="h-10 sm:h-12 md:h-14 w-auto object-contain opacity-90 flex-shrink-0" />
            <img src="/images/logo-xauruad.webp"            alt="Xauruad Viajes y Turismo"       className="h-10 sm:h-12 md:h-14 w-auto object-contain opacity-90 flex-shrink-0" />
            <img src="/images/logo-new-1.webp"              alt="Marca 5"                        className="h-10 sm:h-12 md:h-14 w-auto object-contain opacity-90 flex-shrink-0" />
            <img src="/images/logo-new-2.webp"              alt="Marca 6"                        className="h-10 sm:h-12 md:h-14 w-auto object-contain opacity-90 flex-shrink-0" />
            <img src="/images/logo-new-3.webp"              alt="Marca 7"                        className="h-10 sm:h-12 md:h-14 w-auto object-contain opacity-90 flex-shrink-0" />
            <img src="/images/logo-new-4.webp"              alt="Marca 8"                        className="h-10 sm:h-12 md:h-14 w-auto object-contain opacity-90 flex-shrink-0" />
            <img src="/images/logo-new-5.webp"              alt="Marca 9"                        className="h-10 sm:h-12 md:h-14 w-auto object-contain opacity-90 flex-shrink-0" />
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold">¿Por qué elegir Calma?</h2>

              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-1 p-1 rounded-full bg-calma-pink/10">
                      <Check className="h-5 w-5 text-calma-pink" />
                    </div>
                    <span className="text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>

              <Card className="p-6 bg-calma-pink/10 border-calma-pink/30">
                <p className="font-serif text-xl font-semibold mb-3">¿Querés una marca clara?</p>
                <p className="text-muted-foreground mb-4">Hablemos de tu proyecto.</p>
                <Button className="bg-calma-pink hover:bg-calma-pink-soft text-white">Contactar ahora</Button>
              </Card>
            </div>

            <div className="relative aspect-square rounded-lg overflow-hidden">
              <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8%20%281%29-eDt0cGMO5yUCsxeKyjx4HxCOY4ijJU.png" alt="CALMA workspace" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="cómo-trabajamos" className="py-20 px-4 bg-accent/30">
        <div className="container mx-auto max-w-5xl">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16">Nuestro proceso</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {process.map((item, index) => (
              <div
                key={index}
                className="relative p-8 rounded-lg bg-card border border-border hover:border-calma-pink/50 transition-all duration-300"
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-calma-pink flex items-center justify-center text-white font-bold text-lg">
                  {item.step}
                </div>
                <h3 className="font-serif text-2xl font-bold mb-2 mt-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre-calma" className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden order-2 lg:order-1">
              <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9%20%281%29-8J9ItooIJcKqcxS3dJ2QxQUuVEZjqN.png" alt="Sobre CALMA" className="w-full h-full object-cover" />
            </div>

            <div className="space-y-6 order-1 lg:order-2">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold">Sobre Calma</h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Calma es un estudio de diseño especializado en branding, estrategia de marca y contenido visual para
                  negocios que buscan destacarse con profesionalismo y claridad.
                </p>
                <p>
                  Creemos en el diseño como herramienta estratégica: no solo creamos una imagen atractiva, sino una
                  identidad coherente que conecta con tu audiencia y refleja el valor de lo que hacés.
                </p>
                <p>
                  Trabajamos con marcas en Mendoza, Argentina y toda la región, ofreciendo soluciones personalizadas que
                  combinan creatividad, estrategia y resultados.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-20 px-4 bg-accent/30">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center space-y-4 mb-12">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold">Hablemos de tu proyecto</h2>
            <p className="text-lg text-muted-foreground">Estamos listos para ayudarte a hacer crecer tu marca.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="p-8">
              <form className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nombre</label>
                  <Input placeholder="Tu nombre completo" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input type="email" placeholder="tu@email.com" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Nombre de tu marca</label>
                  <Input placeholder="Tu empresa o proyecto" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Mensaje</label>
                  <Textarea placeholder="Contanos sobre tu proyecto..." rows={5} />
                </div>

                <Button className="w-full bg-calma-pink hover:bg-calma-pink-soft text-white" size="lg">
                  Enviar mensaje
                </Button>
              </form>
            </Card>

            <div className="space-y-8">
              <div>
                <h3 className="font-serif text-2xl font-bold mb-6">Información de contacto</h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-calma-pink mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Ubicación</p>
                      <p className="text-muted-foreground">Mendoza, Argentina</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-calma-pink mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Teléfono</p>
                      <p className="text-muted-foreground">+54 9 2617 26-6654</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-calma-pink mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">calmadiseno@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-serif text-2xl font-bold mb-6">Redes sociales</h3>

                <div className="flex gap-4">
                  <a
                    href="https://instagram.com/calma.dg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-calma-pink/10 hover:bg-calma-pink/20 transition-colors"
                  >
                    <Instagram className="h-5 w-5 text-calma-pink" />
                  </a>
                  <a href="#" className="p-3 rounded-full bg-calma-pink/10 hover:bg-calma-pink/20 transition-colors">
                    <Video className="h-5 w-5 text-calma-pink" />
                  </a>
                  <a href="#" className="p-3 rounded-full bg-calma-pink/10 hover:bg-calma-pink/20 transition-colors">
                    <Globe className="h-5 w-5 text-calma-pink" />
                  </a>
                </div>
                <p className="text-sm text-muted-foreground mt-4">Síguenos en @calma.dg</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Recurso%208-8-EG4hskUsSB3u3BseHKFt3qBY968jDX.png"
                alt="CALMA"
                className="h-12 w-auto mb-4"
              />
              <p className="text-sm text-muted-foreground">Estudio de diseño especializado en branding y estrategia.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Navegación</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {navItems.map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className="hover:text-foreground transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contacto</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Mendoza, Argentina</li>
                <li>+54 9 2617 26-6654</li>
                <li>calmadiseno@gmail.com</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Síguenos</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    TikTok
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Facebook
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Calma · Estudio de Diseño. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
