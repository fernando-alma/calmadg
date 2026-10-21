"use client"

import { useEffect, useState, type FormEvent } from "react"
import { BrandingGallery } from "@/components/branding-gallery"
import { CalmaButton, DecorLine, Lead, LinedHeading, PinkTimeline, SectionTitle } from "@/components/calma/ui"
import { Check, ChevronRight, Instagram, Mail, MapPin, Menu, MessageCircle, X } from "lucide-react"

/* ─── Datos del estudio ─────────────────────────────────────────────────── */
const CONTACT = {
  city: "Mendoza, Argentina",
  phoneDisplay: "+54 9 261 726-6654",
  whatsapp: "5492617266654",
  email: "calmadiseno@gmail.com",
  instagram: "calma.dg",
}

const NAV = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Branding", href: "#branding" },
  { label: "Cómo trabajamos", href: "#como-trabajamos" },
  { label: "Contacto", href: "#contacto" },
]

const MARQUEE = ["Branding", "Redes sociales", "Fotografía", "Diseño web", "Contenido multimedia"]

const SERVICES = [
  { title: "Branding", description: "Construimos identidades visuales memorables." },
  { title: "Gestión de Redes", description: "Creamos estrategias y contenido para conectar con clientes." },
  { title: "Fotografía Profesional", description: "Imágenes profesionales para potenciar tu comunicación." },
  { title: "Diseño Web", description: "Sitios modernos enfocados en experiencia y conversión." },
  { title: "Contenido Multimedia", description: "Videos y piezas audiovisuales para campañas digitales." },
  { title: "Papelería Corporativa", description: "Aplicaciones impresas alineadas con la identidad de marca." },
]

const CLIENT_LOGOS = [
  { src: "logo-escuelas-river.webp", alt: "Escuelas River Mendoza" },
  { src: "logo-mercedes-palomeque.webp", alt: "Mercedes Palomeque Fotografía" },
  { src: "logo-kalas.webp", alt: "Kalas Viajes y Turismo" },
  { src: "logo-victoria.webp", alt: "Victoria Sports Management" },
  { src: "logo-xaurua.webp", alt: "Xaurua Viajes y Turismo" },
  { src: "logo-modo-sport.webp", alt: "Modo Sport" },
  { src: "logo-playfit.webp", alt: "Playfit" },
  { src: "logo-pretoria.webp", alt: "Pretoria Estudio Jurídico" },
  { src: "logo-urs.webp", alt: "URS Urban Sport" },
]

const STATS = [
  "+5 años de experiencia",
  "+40 marcas desarrolladas",
  "+500 piezas gráficas",
  "+30 identidades visuales",
  "+100 campañas",
  "+15 sitios web",
  "+5000 fotografías profesionales",
]

const PROCESS = ["01 Descubrimiento", "02 Estrategia", "03 Diseño", "04 Producción", "05 Implementación"]

const BENEFITS = [
  "Enfoque estratégico",
  "Diseño minimalista y funcional",
  "Contenido para vender",
  "Acompañamiento personalizado",
  "Experiencia local y regional",
]

/* ─── Formulario → WhatsApp (no necesita servidor) ─────────────────────── */
function ContactForm() {
  const [sent, setSent] = useState(false)

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const get = (k: string) => String(data.get(k) || "").trim()
    const lines = [`¡Hola Calma! Soy ${get("nombre")}.`]
    if (get("marca")) lines.push(`Marca / proyecto: ${get("marca")}`)
    if (get("email")) lines.push(`Email: ${get("email")}`)
    lines.push("", get("mensaje"))
    const url = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`
    window.open(url, "_blank", "noopener,noreferrer")
    setSent(true)
  }

  const label = "block font-sans text-[11px] uppercase tracking-[0.2em] text-white/60"

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-xl border border-white/10 bg-black/60 backdrop-blur-sm p-6 sm:p-10"
      aria-label="Formulario de contacto"
    >
      <div className="grid gap-7 sm:grid-cols-2 sm:gap-x-8">
        <div>
          <label htmlFor="cf-nombre" className={label}>
            Nombre *
          </label>
          <input id="cf-nombre" name="nombre" required autoComplete="name" placeholder="Tu nombre" className="calma-field" />
        </div>
        <div>
          <label htmlFor="cf-marca" className={label}>
            Marca o proyecto
          </label>
          <input id="cf-marca" name="marca" autoComplete="organization" placeholder="Tu empresa o proyecto" className="calma-field" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="cf-email" className={label}>
            Email
          </label>
          <input id="cf-email" name="email" type="email" autoComplete="email" placeholder="tu@email.com" className="calma-field" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="cf-mensaje" className={label}>
            Mensaje *
          </label>
          <textarea
            id="cf-mensaje"
            name="mensaje"
            required
            rows={4}
            placeholder="Contanos sobre tu proyecto…"
            className="calma-field resize-none"
          />
        </div>
      </div>

      <CalmaButton type="submit" size="lg" className="mt-9 w-full">
        <MessageCircle aria-hidden="true" />
        Enviar por WhatsApp
      </CalmaButton>
      <p className="mt-4 text-center font-sans text-xs text-white/50" aria-live="polite">
        {sent ? "¡Listo! Se abrió WhatsApp con tu mensaje para enviar." : "Se abre WhatsApp con tu mensaje listo para enviar."}
      </p>
    </form>
  )
}

export default function CalmaPortfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const solidHeader = scrolled || isMenuOpen

  return (
    <div className="min-h-screen bg-calma-ink text-white">
      {/* ─── Header ─────────────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          solidHeader ? "bg-calma-ink/85 backdrop-blur-lg border-b border-white/10" : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-[1600px] px-4 sm:px-8 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <a href="#inicio" aria-label="CALMA Estudio de Diseño, ir al inicio">
              <img src="/images/logo-calma.webp" alt="CALMA Estudio de Diseño" width={1262} height={433} className="h-10 sm:h-12 w-auto" />
            </a>

            <nav className="hidden lg:flex items-center gap-9" aria-label="Principal">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="font-sans text-sm font-medium text-white/85 hover:text-calma-pink transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <CalmaButton asChild className="hidden md:inline-flex h-10 px-5">
                <a href="#contacto">Hablemos</a>
              </CalmaButton>
              <button
                type="button"
                onClick={() => setIsMenuOpen((o) => !o)}
                className="lg:hidden -mr-2 h-11 w-11 flex items-center justify-center"
                aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <nav id="mobile-menu" className="lg:hidden mt-4 pb-4 border-t border-white/10" aria-label="Principal">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block py-3 font-serif text-xl border-b border-white/5 hover:text-calma-pink transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <CalmaButton asChild className="mt-5 w-full md:hidden">
                <a href="#contacto" onClick={() => setIsMenuOpen(false)}>
                  Hablemos
                </a>
              </CalmaButton>
            </nav>
          )}
        </div>
      </header>

      <main>
        {/* ─── Hero ─────────────────────────────────────────────────────── */}
        <section
          id="inicio"
          className="relative h-[100dvh] min-h-[580px] max-h-[1080px] w-full bg-black text-white flex flex-col justify-between overflow-hidden pt-20 sm:pt-24 pb-4 sm:pb-6 lg:pb-8"
        >
          {/* Laptop (escritorio) */}
          <div className="absolute right-0 bottom-0 pointer-events-none select-none z-0 hidden lg:flex items-end justify-end w-[52vw] max-w-[840px] h-[82vh]">
            <img
              src="/images/hero-laptop.webp"
              alt=""
              width={1024}
              height={683}
              fetchPriority="high"
              className="w-full h-full object-contain object-bottom-right"
            />
          </div>
          <div className="absolute inset-y-0 left-0 w-[45%] bg-gradient-to-r from-black via-black/70 to-transparent pointer-events-none z-[1] hidden lg:block" />

          {/* Laptop (celular / tablet) */}
          <div className="absolute right-0 bottom-10 sm:bottom-12 pointer-events-none select-none z-0 lg:hidden flex items-end justify-end w-[85%] max-w-[440px] h-[46vh]">
            <img
              src="/images/hero-laptop.webp"
              alt=""
              width={1024}
              height={683}
              className="w-full h-full object-contain object-bottom-right opacity-80 sm:opacity-85"
            />
          </div>
          <div className="absolute inset-y-0 left-0 w-3/4 sm:w-1/2 bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none z-[1] lg:hidden" />

          {/* Marca */}
          <div className="container mx-auto px-6 sm:px-10 md:px-16 lg:px-20 xl:px-24 relative z-10 my-auto">
            <div className="inline-flex flex-col py-4 sm:py-8 lg:py-16 w-full max-w-[275px] sm:max-w-[380px] md:max-w-[460px] lg:max-w-[500px]">
              <img
                src="/images/logo-calma.webp"
                alt="Calma Estudio de Diseño"
                width={1262}
                height={433}
                fetchPriority="high"
                className="w-full h-auto block select-none"
              />
              <div className="w-[74%] h-[2px] sm:h-[2.5px] bg-calma-pink my-3 sm:my-4 self-center ml-[2.8%]" />
              <div className="w-full flex justify-end">
                <h1 className="font-serif text-[13.5px] sm:text-[19px] md:text-[23px] lg:text-[26.5px] font-bold tracking-[0.13em] sm:tracking-[0.14em] uppercase leading-tight select-none">
                  <span className="sr-only">CALMA Estudio de Diseño · </span>
                  <span className="text-calma-pink">Brand</span> <span className="text-white">Design Studio</span>
                </h1>
              </div>
            </div>
          </div>

          {/* Cinta de servicios */}
          <div className="relative z-20 w-full mt-auto flex items-center overflow-hidden" aria-hidden="true">
            <div className="h-[2px] sm:h-[2.5px] bg-calma-pink flex-shrink-0 w-8 sm:w-16 md:w-28 lg:w-40 mr-3 sm:mr-5" />
            <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,black_85%,transparent)] sm:[mask-image:linear-gradient(to_right,black_92%,transparent)]">
              <div className="animate-marquee flex items-center gap-3 sm:gap-4 whitespace-nowrap text-[10.5px] sm:text-xs md:text-sm font-sans tracking-[0.18em] sm:tracking-[0.24em] uppercase text-zinc-300 font-light select-none py-1">
                {[0, 1, 2, 3].map((loop) =>
                  MARQUEE.map((item, i) => (
                    <span key={`${loop}-${item}`} className="flex items-center gap-3 sm:gap-4">
                      <span>{item}</span>
                      <span className={`text-calma-pink font-normal ${i === MARQUEE.length - 1 ? "mx-2" : ""}`}>·</span>
                    </span>
                  )),
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ─── Diseñamos marcas que quieren crecer ─────────────────────── */}
        <section
          id="marcas"
          className="bg-dark-wall relative w-full overflow-hidden text-white flex flex-col lg:flex-row lg:min-h-[640px] lg:h-[100dvh] lg:max-h-[900px]"
        >
          <div className="relative w-full lg:w-[54%] flex items-center justify-center lg:justify-end px-6 sm:px-10 md:px-16 lg:pl-16 lg:pr-12 xl:pr-16 py-20 sm:py-24 lg:py-0">
            <DecorLine className="top-8 sm:top-10 lg:top-[13%] right-0 w-[40%] lg:w-[45%]" />
            <DecorLine className="bottom-6 sm:bottom-8 lg:bottom-[11%] left-0 w-[30%] lg:w-[24%]" />

            <div className="relative w-full max-w-xl lg:max-w-[520px] flex flex-col items-center lg:items-end text-center lg:text-right">
              <SectionTitle>Diseñamos marcas que quieren crecer</SectionTitle>
              <Lead className="mt-6 sm:mt-8">
                Creamos identidades visuales, estrategias digitales y experiencias de comunicación que ayudan a las
                empresas a posicionarse, diferenciarse y conectar con su audiencia. No diseñamos solamente piezas
                gráficas. Diseñamos <strong className="font-semibold text-calma-pink">marcas con propósito.</strong>
              </Lead>

              <div className="mt-8 sm:mt-10 w-full lg:w-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-end gap-3 sm:gap-4">
                <CalmaButton asChild>
                  <a href="#contacto">
                    Solicitar propuesta
                    <ChevronRight aria-hidden="true" />
                  </a>
                </CalmaButton>
                <CalmaButton asChild variant="secondary">
                  <a href="#servicios">Conocer servicios</a>
                </CalmaButton>
              </div>
            </div>
          </div>

          <div className="relative w-full lg:w-[46%] h-[85vw] sm:h-[70vw] max-h-[560px] lg:max-h-none lg:h-full">
            <img
              src="/images/branding-mockup.jpg"
              alt="Papelería y aplicaciones de marca de CALMA Estudio de Diseño"
              width={1024}
              height={1536}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover object-center select-none"
            />
          </div>
        </section>

        {/* ─── Calma en números ────────────────────────────────────────── */}
        <section
          id="numeros"
          className="bg-dark-wall relative w-full overflow-hidden text-white flex flex-col lg:flex-row lg:min-h-[620px] lg:h-[100dvh] lg:max-h-[860px]"
        >
          <div className="relative w-full lg:w-[56%] flex items-center px-6 sm:px-10 md:px-16 lg:pl-[7%] lg:pr-10 py-20 sm:py-24 lg:py-0">
            <DecorLine className="top-8 sm:top-10 lg:top-[10%] left-0 w-[22%] lg:w-[9%]" />
            <DecorLine className="bottom-[9%] right-0 w-[14%] hidden lg:block" />

            <div className="relative w-full max-w-xl">
              <SectionTitle>Calma en números</SectionTitle>
              <PinkTimeline items={STATS} className="mt-8 sm:mt-10" />
            </div>
          </div>

          <div className="relative w-full lg:w-[44%] h-[85vw] sm:h-[70vw] max-h-[560px] lg:max-h-none lg:h-full">
            <img
              src="/images/calma-estudio.jpg"
              alt="Oficina de CALMA Estudio de Diseño con el logo en la pared"
              width={1024}
              height={1536}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover object-center select-none"
            />
          </div>
        </section>

        {/* ─── Manifiesto ──────────────────────────────────────────────── */}
        <section className="bg-dark-wall relative w-full overflow-hidden text-white py-24 sm:py-32">
          <DecorLine className="top-10 sm:top-14 left-0 w-[22%] lg:w-[12%]" />
          <DecorLine className="bottom-10 sm:bottom-14 right-0 w-[22%] lg:w-[12%]" />
          <div className="relative mx-auto max-w-4xl px-6 sm:px-10 text-center">
            <SectionTitle>
              Diseño con intención. <span className="text-calma-pink">Estrategia con resultados.</span>
            </SectionTitle>
            <Lead className="mt-6 sm:mt-8 mx-auto max-w-2xl">
              Acompañamos a marcas, emprendedores y negocios a construir una imagen profesional, coherente y alineada a
              sus objetivos. No diseñamos solo lo visual: trabajamos la estrategia, el mensaje y la experiencia de marca.
            </Lead>
          </div>
        </section>

        {/* ─── Servicios ───────────────────────────────────────────────── */}
        <section
          id="servicios"
          className="bg-dark-wall relative w-full overflow-hidden text-white scroll-mt-20 lg:h-[100dvh] lg:min-h-[560px] lg:max-h-[1080px] lg:flex lg:items-center"
        >
          <div className="w-full lg:h-full flex flex-col lg:flex-row lg:items-stretch lg:justify-between">
            <div className="w-full lg:w-[68%] lg:h-full flex flex-col justify-center pt-20 sm:pt-24 lg:pt-14 pb-10 lg:pb-2 pl-6 sm:pl-10 md:pl-16 lg:pl-20 xl:pl-24 pr-6 sm:pr-10 md:pr-14 lg:pr-14">
              <div className="flex items-center gap-3 sm:gap-5 mb-6 sm:mb-8">
                <span
                  className="calma-rule w-5 sm:w-10 md:w-16 lg:w-20 -ml-6 sm:-ml-10 md:-ml-16 lg:-ml-20 xl:-ml-24 flex-shrink-0"
                  aria-hidden="true"
                />
                <SectionTitle>Nuestros servicios</SectionTitle>
              </div>

              <ul className="flex flex-col">
                {SERVICES.map((service, index) => {
                  const isLast = index === SERVICES.length - 1
                  return (
                    <li key={service.title} className="relative flex items-start gap-4 sm:gap-5">
                      <div className="relative flex flex-col items-center flex-shrink-0 self-stretch" aria-hidden="true">
                        <div className="w-3 h-3 rounded-full bg-calma-pink flex-shrink-0 mt-[6px] z-10" />
                        {!isLast && <div className="w-[2px] bg-calma-pink flex-1" />}
                      </div>
                      <div className={isLast ? "pb-0" : "pb-4 sm:pb-5 lg:pb-4 xl:pb-5"}>
                        <h3 className="font-serif text-base sm:text-lg xl:text-xl font-bold text-white leading-snug">
                          {service.title}
                        </h3>
                        <p className="font-sans text-sm sm:text-[15px] text-white/75 mt-1 leading-relaxed max-w-lg">
                          {service.description}
                        </p>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="w-full lg:w-[32%] lg:h-full flex-shrink-0 lg:border-l border-white/5 overflow-hidden">
              <div className="flex flex-row h-44 sm:h-56 md:h-64 lg:h-full lg:flex-col">
                {[
                  { src: "services-img-top.webp", alt: "Papelería institucional de Calma Estudio" },
                  { src: "services-img-mid.webp", alt: "Correa de cámara de cuero con el logo de Calma" },
                  { src: "services-img-bot.webp", alt: "Parche bordado con el logo de Calma" },
                ].map((img, i) => (
                  <div
                    key={img.src}
                    className={`flex-1 overflow-hidden ${i > 0 ? "border-l lg:border-l-0 lg:border-t border-white/10" : ""}`}
                  >
                    <img
                      src={`/images/${img.src}`}
                      alt={img.alt}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── Marcas y proyectos ──────────────────────────────────────── */}
        <section className="bg-dark-wall relative w-full py-14 sm:py-20 overflow-hidden text-white">
          <LinedHeading className="mb-10 sm:mb-14">Marcas y Proyectos</LinedHeading>
          <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div className="animate-marquee-logos flex items-center gap-16 sm:gap-20 md:gap-24">
              {[0, 1].map((loop) =>
                CLIENT_LOGOS.map((logo) => (
                  <img
                    key={`${loop}-${logo.src}`}
                    src={`/images/${logo.src}`}
                    alt={loop === 0 ? logo.alt : ""}
                    aria-hidden={loop === 1 ? true : undefined}
                    loading="lazy"
                    decoding="async"
                    className="h-10 sm:h-12 md:h-14 w-auto object-contain opacity-90 flex-shrink-0"
                  />
                )),
              )}
            </div>
          </div>
        </section>

        {/* ─── Branding (galería) ──────────────────────────────────────── */}
        <BrandingGallery />

        {/* ─── Cómo trabajamos ─────────────────────────────────────────── */}
        <section
          id="como-trabajamos"
          className="bg-dark-wall relative w-full overflow-hidden text-white scroll-mt-20 flex flex-col lg:flex-row lg:items-stretch lg:min-h-[620px] lg:h-[100dvh] lg:max-h-[860px]"
        >
          <DecorLine className="top-8 sm:top-10 lg:top-[10%] left-1/2 -translate-x-1/2 lg:left-[41.5%] lg:translate-x-0 w-[22%] lg:w-[9%]" />
          <DecorLine className="bottom-6 sm:bottom-8 lg:bottom-[9%] right-0 w-[22%] lg:w-[9%]" />

          <div className="relative z-10 w-full lg:w-[52%] lg:order-2 flex items-center px-6 sm:px-10 md:px-16 lg:pl-[2%] lg:pr-[6%] pt-20 pb-8 sm:pt-24 lg:py-0">
            <div className="w-full max-w-xl mx-auto lg:mx-0">
              <SectionTitle>¿Cómo trabajamos?</SectionTitle>
              <PinkTimeline items={PROCESS} ordered className="mt-8 sm:mt-10 [&>li]:font-light" />
            </div>
          </div>

          <div className="relative w-full lg:w-[48%] lg:order-1 flex items-center justify-center px-6 pb-16 pt-4 lg:p-0">
            <img
              src="/images/app-mockup.webp"
              alt="App de gestión de proyectos de CALMA Estudio de Diseño en un celular"
              width={695}
              height={869}
              loading="lazy"
              decoding="async"
              className="w-[75%] max-w-[360px] sm:max-w-[420px] lg:w-auto lg:max-w-none lg:h-[74%] xl:h-[78%] object-contain select-none drop-shadow-[0_30px_40px_rgba(0,0,0,0.6)]"
            />
          </div>
        </section>

        {/* ─── ¿Por qué elegir Calma? ──────────────────────────────────── */}
        <section
          id="por-que-calma"
          className="relative w-full overflow-hidden bg-black text-white flex flex-col lg:flex-row lg:items-stretch lg:min-h-[600px] lg:h-[100dvh] lg:max-h-[860px]"
        >
          <div className="relative z-10 w-full lg:w-[52%] flex items-center px-6 sm:px-10 md:px-16 lg:pl-[8%] lg:pr-6 py-20 sm:py-24 lg:py-0">
            <div className="w-full max-w-md sm:max-w-lg mx-auto lg:mx-0 lg:max-w-[440px]">
              <SectionTitle>¿Por qué elegir Calma?</SectionTitle>

              <ul className="mt-8 space-y-4 sm:space-y-[18px]">
                {BENEFITS.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-calma-pink/15">
                      <Check className="h-4 w-4 text-calma-pink" aria-hidden="true" />
                    </span>
                    <span className="font-sans text-base sm:text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 sm:mt-10 rounded-xl border border-calma-pink/25 bg-calma-pink/[0.07] px-5 sm:px-6 py-6 text-center">
                <p className="font-serif text-xl sm:text-2xl font-semibold leading-snug text-balance">
                  ¿Listos para potenciar tu marca?
                </p>
                <p className="mt-2 font-sans text-sm sm:text-base text-white/85 text-pretty">
                  Contanos tu proyecto y armamos una propuesta.
                </p>
                <CalmaButton asChild className="mt-5 w-full">
                  <a href="#contacto">Contactar ahora</a>
                </CalmaButton>
              </div>
            </div>
          </div>

          <div className="relative w-full lg:w-[48%] flex items-center justify-center px-6 pb-16 lg:p-0">
            <img
              src="/images/phones-mockup.webp"
              alt="Sitio y servicios de CALMA Estudio de Diseño en pantallas de celular"
              width={1080}
              height={1350}
              loading="lazy"
              decoding="async"
              className="w-[88%] max-w-[440px] sm:max-w-[500px] lg:w-auto lg:max-w-full lg:h-[96%] object-contain select-none"
            />
          </div>
        </section>

        {/* ─── Contacto ────────────────────────────────────────────────── */}
        <section id="contacto" className="bg-dark-wall relative w-full overflow-hidden text-white scroll-mt-16 py-24 sm:py-32">
          <DecorLine className="top-10 sm:top-14 left-0 w-[22%] lg:w-[9%]" />
          <DecorLine className="bottom-10 sm:bottom-14 right-0 w-[22%] lg:w-[9%]" />

          <div className="relative mx-auto max-w-6xl px-6 sm:px-10 grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20 items-center">
            <div>
              <SectionTitle>Hablemos de tu proyecto</SectionTitle>
              <Lead className="mt-5 sm:mt-6 max-w-md">
                Contanos qué necesitás y te respondemos con una propuesta a medida para tu marca.
              </Lead>

              <ul className="mt-10 space-y-6">
                {[
                  { icon: MessageCircle, label: "WhatsApp", value: CONTACT.phoneDisplay, href: `https://wa.me/${CONTACT.whatsapp}` },
                  { icon: Mail, label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
                  { icon: Instagram, label: "Instagram", value: `@${CONTACT.instagram}`, href: `https://instagram.com/${CONTACT.instagram}` },
                  { icon: MapPin, label: "Estudio", value: CONTACT.city },
                ].map(({ icon: Icon, label, value, href }) => {
                  const body = (
                    <>
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-calma-pink/15 text-calma-pink transition-colors group-hover:bg-calma-pink group-hover:text-white">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block font-sans text-[11px] uppercase tracking-[0.2em] text-white/55">{label}</span>
                        <span className="block font-sans text-base sm:text-lg text-white">{value}</span>
                      </span>
                    </>
                  )
                  return (
                    <li key={label}>
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith("http") ? "_blank" : undefined}
                          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="group flex items-center gap-4"
                        >
                          {body}
                        </a>
                      ) : (
                        <div className="flex items-center gap-4">{body}</div>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>

            <ContactForm />
          </div>
        </section>
      </main>

      {/* ─── Footer ───────────────────────────────────────────────────────── */}
      <footer className="bg-black text-white border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 sm:px-10 py-14 sm:py-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <img src="/images/logo-calma.webp" alt="CALMA Estudio de Diseño" width={1262} height={433} loading="lazy" className="h-12 w-auto" />
            <p className="mt-5 max-w-xs font-sans text-sm leading-relaxed text-white/60">
              Estudio de diseño especializado en branding, estrategia de marca y contenido visual.
            </p>
          </div>

          <nav aria-label="Pie de página">
            <h2 className="font-serif text-lg font-semibold">Navegación</h2>
            <span className="mt-3 mb-4 block h-px w-8 bg-calma-pink" aria-hidden="true" />
            <ul className="space-y-2.5 font-sans text-sm text-white/60">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="hover:text-calma-pink transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-serif text-lg font-semibold">Contacto</h2>
            <span className="mt-3 mb-4 block h-px w-8 bg-calma-pink" aria-hidden="true" />
            <ul className="space-y-2.5 font-sans text-sm text-white/60">
              <li>{CONTACT.city}</li>
              <li>
                <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-calma-pink transition-colors">
                  {CONTACT.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="hover:text-calma-pink transition-colors">
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://instagram.com/${CONTACT.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-calma-pink transition-colors"
                >
                  Seguinos en @{CONTACT.instagram}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10">
          <p className="mx-auto max-w-6xl px-6 sm:px-10 py-6 font-sans text-xs text-white/45 text-center sm:text-left">
            © {new Date().getFullYear()} Calma · Estudio de Diseño. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}
