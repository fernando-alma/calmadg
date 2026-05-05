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
  Sun,
  Moon,
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
} from "lucide-react"

export default function CalmaPortfolio() {
  const [isDark, setIsDark] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDark])

  const services = [
    {
      icon: Palette,
      title: "Branding",
      description: "Diseño de logo, Paleta cromática, Tipografías, Manual de marca.",
    },
    {
      icon: TrendingUp,
      title: "Estrategia de marca",
      description: "Definimos el rumbo, mensaje y posicionamiento.",
    },
    {
      icon: Instagram,
      title: "Redes Sociales",
      description: "Planificación y gestión con contenido estratégico.",
    },
    {
      icon: Camera,
      title: "Fotografía",
      description: "Producción para productos y espacios.",
    },
    {
      icon: Globe,
      title: "Web Dev",
      description: "Sitios funcionales y estéticos.",
    },
    {
      icon: Video,
      title: "Contenido Multimedia",
      description: "Videos, reels y piezas audiovisuales.",
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
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Recurso%208-8-xDHTCEwIKzAukvXkAVe0WcCuyjhRAB.png"
                alt="CALMA Estudio de Diseño"
                className="h-12 w-auto"
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
              {/* Language Toggle */}
              <div className="hidden md:flex items-center gap-2 text-sm">
                <button className="font-medium text-primary">ES</button>
                <span className="text-muted-foreground">|</span>
                <button className="text-muted-foreground hover:text-foreground">EN</button>
              </div>

              {/* Theme Toggle */}
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-full hover:bg-accent transition-colors"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

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
        className="relative min-h-screen flex items-center justify-center pt-20 px-4"
        style={{
          backgroundImage: isDark ? `url('/images/fondo-20-20calma-20dg-20-20-20sitio-20web.png')` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />

        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-balance">
              Diseño estratégico para marcas que buscan crecer con claridad.
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              En Calma creamos identidades visuales, estrategias y contenido que ordenan tu marca y potencian su
              presencia digital.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="bg-calma-pink hover:bg-calma-pink-soft text-white">
                Solicitar propuesta
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 bg-transparent">
                Conocer servicios
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative Element */}
        <div className="absolute bottom-0 right-0 w-32 h-32 md:w-48 md:h-48 opacity-50">
          
        </div>
      </section>

      {/* Torn Paper Divider */}
      <div
        className="w-full h-8 bg-gradient-to-b from-transparent to-background"
        style={{
          clipPath:
            "polygon(0 0, 100% 0, 100% 50%, 98% 60%, 95% 50%, 92% 65%, 88% 55%, 85% 70%, 80% 60%, 75% 75%, 70% 65%, 65% 80%, 60% 70%, 55% 85%, 50% 75%, 45% 90%, 40% 80%, 35% 95%, 30% 85%, 25% 100%, 20% 90%, 15% 95%, 10% 85%, 5% 90%, 0 80%)",
        }}
      />

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
      <section id="servicios" className="py-20 px-4 bg-accent/30">
        <div className="container mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold">Nuestros servicios</h2>
            <p className="text-lg text-muted-foreground">Ofrecemos soluciones integrales de diseño y comunicación.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {services.map((service, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg hover:border-calma-pink/50 transition-all duration-300 group"
              >
                <div className="flex flex-col items-start gap-4">
                  <div className="p-3 rounded-lg bg-calma-pink/10 group-hover:bg-calma-pink/20 transition-colors">
                    <service.icon className="h-6 w-6 text-calma-pink" />
                  </div>
                  <h3 className="font-serif text-xl font-bold">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" size="lg" className="border-2 bg-transparent">
              Ver todos los servicios
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
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
