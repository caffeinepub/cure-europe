import {
  Link,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  useRouterState,
} from "@tanstack/react-router";
import {
  Award,
  CheckCircle2,
  ChevronRight,
  Loader2,
  Lock,
  Mail,
  Menu,
  MessageCircle,
  Send,
  Shield,
  ShoppingBag,
  Star,
  X,
  Youtube,
} from "lucide-react";
import { motion } from "motion/react";
import type { Variants } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SiInstagram } from "react-icons/si";
import { toast } from "sonner";

import { useActor } from "@/hooks/useActor";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";

// ─── Constants ───────────────────────────────────────────────────────────────

const WHATSAPP_URL = "https://wa.me/message/GAVCZG4DDEMMH1";
const PRODUCT_IMAGE =
  "https://images.unsplash.com/photo-1763667926453-6a992d38ac43?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwzfHxtaW5pbWFsaXN0JTIwcGlsbCUyMGJvdHRsZSUyMG1lZGljYXRpb24lMjBwYWNrYWdpbmd8ZW58MHx8fHwxNzczMDI1MDA0fDA&ixlib=rb-4.1.0&q=85";

// ─── Form Types ───────────────────────────────────────────────────────────────

interface FormData {
  fullName: string;
  email: string;
  treatment: string;
  message: string;
}

// ─── Animation Variants ──────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

// ─── Announcement Banner ─────────────────────────────────────────────────────

function AnnouncementBanner() {
  const message =
    "Shop for 90€ get 20% OFF, Limited offer! 📣      Free shipping with BTC payment 🚚";

  return (
    <div
      className="w-full overflow-hidden"
      style={{ backgroundColor: "#1A4D2E", height: "36px" }}
      aria-label="Announcement"
      role="marquee"
    >
      <div className="flex h-full items-center animate-marquee whitespace-nowrap">
        {/* Six copies so the loop is seamless regardless of viewport width */}
        <span className="text-sm font-medium text-white px-12">{message}</span>
        <span
          className="text-sm font-medium text-white px-12"
          aria-hidden="true"
        >
          {message}
        </span>
        <span
          className="text-sm font-medium text-white px-12"
          aria-hidden="true"
        >
          {message}
        </span>
        <span
          className="text-sm font-medium text-white px-12"
          aria-hidden="true"
        >
          {message}
        </span>
        <span
          className="text-sm font-medium text-white px-12"
          aria-hidden="true"
        >
          {message}
        </span>
        <span
          className="text-sm font-medium text-white px-12"
          aria-hidden="true"
        >
          {message}
        </span>
      </div>
    </div>
  );
}

// ─── Navigation Component ────────────────────────────────────────────────────

function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const routerState = useRouterState();
  const isOnHome = routerState.location.pathname === "/";

  const getHref = (anchor: string) => (isOnHome ? anchor : `/${anchor}`);

  const navLinks = [
    { label: "Home", href: getHref("#home") },
    { label: "Products", href: "/products", isRoute: true },
    { label: "How It Works", href: getHref("#how-it-works") },
    { label: "About", href: getHref("#about") },
    { label: "FAQ", href: getHref("#faq") },
    { label: "Contact", href: getHref("#contact") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border backdrop-blur-md bg-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3" data-ocid="nav.link">
            <img
              src="/assets/uploads/IMG_4459-1.jpeg"
              alt="Cure Pharmaceuticals"
              className="h-12 w-auto object-contain"
            />
            <span
              className="text-base font-semibold text-foreground leading-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Cure Pharmacy Europe
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
              link.isRoute ? (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
                  data-ocid="nav.link"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
                  data-ocid="nav.link"
                >
                  {link.label}
                </a>
              ),
            )}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              asChild
              className="rounded-full px-6 bg-primary text-white hover:bg-primary/90 shadow-sm"
              data-ocid="nav.primary_button"
            >
              <a href={getHref("#consultation")}>Get Started</a>
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                data-ocid="nav.toggle"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="flex items-center">
                  <img
                    src="/assets/uploads/IMG_4459-1.jpeg"
                    alt="Cure Pharmaceuticals"
                    className="h-10 w-auto object-contain"
                  />
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 mt-6 px-4">
                {navLinks.map((link) =>
                  link.isRoute ? (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 py-3 text-sm font-medium text-foreground hover:text-primary transition-colors border-b border-border last:border-0"
                      data-ocid="nav.link"
                    >
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 py-3 text-sm font-medium text-foreground hover:text-primary transition-colors border-b border-border last:border-0"
                      data-ocid="nav.link"
                    >
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      {link.label}
                    </a>
                  ),
                )}
                <Button
                  className="mt-6 rounded-full bg-primary text-white hover:bg-primary/90"
                  data-ocid="nav.primary_button"
                  onClick={() => {
                    setMobileOpen(false);
                    document
                      .getElementById("consultation")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Get Started
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

// ─── Hero Section ────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center py-20 md:py-32 bg-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left: Copy */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-8"
          >
            <motion.div variants={fadeUp}>
              <span className="text-xs uppercase tracking-widest font-semibold text-accent">
                European Medical Wellness
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-6xl font-semibold tracking-tight leading-tight text-foreground"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Reclaim Your Health,{" "}
              <em className="not-italic text-primary">Discreetly.</em>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-md"
            >
              Access licensed European physicians and clinically proven
              treatments from the comfort of your home. Private, discreet, and
              delivered to your door.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-full px-8 py-6 text-base bg-primary text-white hover:bg-primary/90 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                data-ocid="hero.primary_button"
              >
                <a href="#consultation">Start Your Consultation</a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full px-8 py-6 text-base border-primary/30 text-primary hover:bg-primary/5 hover:border-primary/50 transition-all"
                data-ocid="hero.secondary_button"
              >
                <Link to="/products">View Treatments</Link>
              </Button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center gap-6 pt-4"
            >
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-primary" />
                <span>GDPR Compliant</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Lock className="h-4 w-4 text-primary" />
                <span>100% Confidential</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Award className="h-4 w-4 text-primary" />
                <span>CE Certified</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Hero image */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] max-h-[80vh]">
              <img
                src="https://images.unsplash.com/photo-1747143295749-ecb1772a3c2d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODh8MHwxfHNlYXJjaHwxfHxtYW4lMjBoaWtpbmclMjBldXJvcGVhbiUyMGFscHMlMjBoZWFsdGh5fGVufDB8fHx8MTc3MzAyNTAwMnww&ixlib=rb-4.1.0&q=85"
                alt="Healthy man hiking in European Alps"
                className="w-full h-full object-cover"
                loading="eager"
              />
              {/* Floating card */}
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl max-w-[220px]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">
                      Consultation approved
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Dr. Müller · 2 min ago
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Trust Logos Bar ─────────────────────────────────────────────────────────

function TrustBar() {
  const trustMarks = [
    { icon: "🇪🇺", label: "CE Medical" },
    { icon: "🇩🇪", label: "German Medical Board" },
    { icon: "🇨🇭", label: "Swiss Quality Institute" },
    { icon: "✓", label: "EU Health Certified" },
    { icon: "⚕", label: "EFPIA Member" },
  ];

  return (
    <section className="py-12 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="text-center text-xs uppercase tracking-widest font-semibold text-muted-foreground mb-8">
            Trusted By European Health Authorities
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {trustMarks.map((mark) => (
              <div
                key={mark.label}
                className="flex items-center gap-2.5 text-sm font-medium text-foreground/60 hover:text-foreground/90 transition-colors"
              >
                <span className="text-base">{mark.icon}</span>
                <span>{mark.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Problem / Solution ──────────────────────────────────────────────────────

function ProblemSolution() {
  const problems = [
    "Embarrassing clinic queues",
    "Lack of privacy and discretion",
    "Generic, one-size-fits-all treatment",
  ];

  const solutions = [
    "100% online consultations",
    "Discreet delivery to your door",
    "Personalised European protocols",
  ];

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-widest font-semibold text-accent">
            The Problem
          </span>
          <h2
            className="text-4xl md:text-5xl font-medium tracking-tight mt-3 text-foreground"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            There Is a Better Way
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Problems */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <p className="text-sm uppercase tracking-widest font-semibold text-muted-foreground mb-2">
              The old way
            </p>
            {problems.map((problem) => (
              <motion.div
                key={problem}
                variants={fadeUp}
                className="flex items-start gap-4 p-5 rounded-xl border border-border bg-muted/30"
              >
                <div className="mt-0.5 w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                  <X className="h-3.5 w-3.5 text-destructive" />
                </div>
                <p className="text-base font-medium text-foreground/70 line-through decoration-muted-foreground/40">
                  {problem}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Solutions */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <p className="text-sm uppercase tracking-widest font-semibold text-primary mb-2">
              The Cure Europe way
            </p>
            {solutions.map((solution) => (
              <motion.div
                key={solution}
                variants={fadeUp}
                className="flex items-start gap-4 p-5 rounded-xl border border-primary/20 bg-primary/5"
              >
                <div className="mt-0.5 w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                </div>
                <p className="text-base font-medium text-foreground">
                  {solution}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ────────────────────────────────────────────────────────────

function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Consult Online",
      description:
        "Complete a confidential medical questionnaire in minutes. No waiting rooms, no awkward conversations.",
    },
    {
      number: "02",
      title: "Get Prescribed",
      description:
        "A licensed European doctor reviews your case and creates a personalised treatment protocol.",
    },
    {
      number: "03",
      title: "Delivered Discreetly",
      description:
        "Medication arrives in plain, unmarked packaging directly to your address within 3–5 business days.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-24"
        >
          <span className="text-xs uppercase tracking-widest font-semibold text-accent">
            Process
          </span>
          <h2
            className="text-4xl md:text-5xl font-medium tracking-tight mt-3 text-foreground"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Simple. Private. Effective.
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              variants={fadeUp}
              className="relative flex flex-col gap-5"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[calc(100%_-_1rem)] w-full h-px border-t border-dashed border-border z-0" />
              )}
              <div className="relative z-10">
                <span
                  className="text-6xl font-bold text-primary/15 select-none"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {step.number}
                </span>
              </div>
              <div>
                <h3
                  className="text-2xl font-medium text-foreground mb-3"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {step.title}
                </h3>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Product Bento Grid (Home) ───────────────────────────────────────────────

interface HomeProduct {
  id: number;
  name: string;
  tagline: string;
  price: string;
  badge: string | null;
}

function ProductGrid() {
  const products: HomeProduct[] = [
    {
      id: 1,
      name: "Erectile Dysfunction",
      tagline: "Clinically proven. Discreetly delivered.",
      price: "from €29/mo",
      badge: "Best Seller",
    },
    {
      id: 2,
      name: "Hair Loss",
      tagline: "Stop hair loss with science-backed treatment.",
      price: "from €39/mo",
      badge: null,
    },
    {
      id: 3,
      name: "Weight Management",
      tagline: "Medically supervised weight loss programmes.",
      price: "from €49/mo",
      badge: null,
    },
  ];

  return (
    <section id="products" className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-widest font-semibold text-accent">
            Treatments
          </span>
          <h2
            className="text-4xl md:text-5xl font-medium tracking-tight mt-3 text-foreground"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Our Treatments
          </h2>
          <p className="mt-4 text-base text-muted-foreground max-w-lg mx-auto">
            Clinically proven protocols designed by European medical
            specialists.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              variants={fadeUp}
              data-ocid={`products.item.${index + 1}`}
            >
              <Card className="h-full flex flex-col border border-border hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer overflow-hidden rounded-xl">
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={PRODUCT_IMAGE}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {product.badge && (
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-accent text-white shadow-sm">
                        {product.badge}
                      </span>
                    </div>
                  )}
                </div>
                <CardHeader className="pb-2">
                  <CardTitle
                    className="text-xl text-foreground"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {product.name}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    {product.tagline}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-lg font-semibold text-primary">
                    {product.price}
                  </p>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                  <Button
                    asChild
                    className="w-full rounded-full bg-primary text-white hover:bg-primary/90 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                    data-ocid={`products.buy_now_button.${index + 1}`}
                  >
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Buy Now
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full px-8 border-primary/40 text-primary hover:bg-primary hover:text-white transition-all"
            data-ocid="products.secondary_button"
          >
            <Link to="/products">
              <ShoppingBag className="mr-2 h-4 w-4" />
              View All Products
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Medical Experts Section ──────────────────────────────────────────────────

function MedicalExperts() {
  const credentials = [
    "Fully licensed in their respective European countries",
    "Members of recognised national medical boards",
    "Specialists with 10+ years of clinical experience",
  ];

  return (
    <section id="about" className="py-20 md:py-32 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Image */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-xl aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1659353888096-cc5e333db5e0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MTN8MHwxfHNlYXJjaHwyfHxtYWxlJTIwZG9jdG9yJTIwY29uc3VsdGluZyUyMHBhdGllbnQlMjBmcmllbmRseXxlbnwwfHx8fDE3NzMwMjUwMDN8MA&ixlib=rb-4.1.0&q=85"
                alt="Cure Europe Medical Director"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            {/* Stats card */}
            <div className="absolute -bottom-4 right-4 md:bottom-8 md:-right-8 bg-white rounded-xl p-5 shadow-xl border border-border">
              <div className="flex items-center gap-3">
                <div className="flex">
                  {["s1", "s2", "s3", "s4", "s5"].map((key) => (
                    <Star
                      key={key}
                      className="h-4 w-4 fill-accent text-accent"
                    />
                  ))}
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">4.9/5</p>
                  <p className="text-xs text-muted-foreground">
                    12,400+ patients
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Copy */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <motion.span
              variants={fadeUp}
              className="text-xs uppercase tracking-widest font-semibold text-accent"
            >
              Our physicians
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="text-4xl md:text-5xl font-medium tracking-tight text-foreground"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Expert European Physicians
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-base leading-relaxed text-muted-foreground"
            >
              Our network of board-certified physicians brings clinical
              excellence to your fingertips. Every consultation is reviewed by a
              real doctor who understands your needs with the utmost discretion.
            </motion.p>
            <motion.ul
              variants={staggerContainer}
              className="flex flex-col gap-3"
            >
              {credentials.map((cred) => (
                <motion.li
                  key={cred}
                  variants={fadeUp}
                  className="flex items-start gap-3"
                >
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <CheckCircle2 className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-sm text-foreground">{cred}</span>
                </motion.li>
              ))}
            </motion.ul>
            <motion.div variants={fadeUp}>
              <Button
                asChild
                size="lg"
                className="rounded-full px-8 bg-primary text-white hover:bg-primary/90 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <a href="#consultation">Meet Our Doctors</a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Lead Capture Form ────────────────────────────────────────────────────────

function LeadCaptureForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [treatmentValue, setTreatmentValue] = useState("");
  const { actor } = useActor();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { fullName: "", email: "", treatment: "", message: "" },
  });

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    "Please enter a valid email address";

  const TREATMENT_LABELS: Record<string, string> = {
    ed: "Erectile Dysfunction",
    hair: "Hair Loss",
    weight: "Weight Management",
    other: "Other",
  };

  const onSubmit = async (data: FormData) => {
    if (!treatmentValue) {
      toast.error("Please select a treatment interest.");
      return;
    }
    setIsSubmitting(true);
    try {
      // Save lead to backend (non-blocking — don't let backend errors stop the form)
      if (actor) {
        actor.addLead(data.fullName, data.email).catch(() => {
          // silently ignore backend errors; the mailto is the primary delivery
        });
      }

      // Open email client without navigating away from the page
      const treatmentLabel = TREATMENT_LABELS[treatmentValue] ?? treatmentValue;
      const subject = encodeURIComponent(
        `New Consultation Request – ${data.fullName}`,
      );
      const body = encodeURIComponent(
        `You have received a new consultation request from your website.\n\nFull Name: ${data.fullName}\nEmail: ${data.email}\nTreatment Interest: ${treatmentLabel}\nMessage: ${data.message || "(none provided)"}\n\nPlease follow up with this customer at your earliest convenience.`,
      );
      window.open(
        `mailto:curepharmaa@outlook.com?subject=${subject}&body=${body}`,
        "_blank",
      );

      toast.success("Your consultation request has been received.", {
        description:
          "A licensed physician will review your case within 24 hours.",
      });
      reset();
      setTreatmentValue("");
    } catch {
      toast.error("Something went wrong. Please try again.", {
        description: "If the problem persists, please contact support.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="consultation" className="py-20 md:py-32 bg-background">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={fadeUp} className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest font-semibold text-accent">
              Get Started
            </span>
            <h2
              className="text-4xl md:text-5xl font-medium tracking-tight mt-3 text-foreground"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Start Your Confidential Consultation
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              Takes 2 minutes. A doctor reviews within 24 hours.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="bg-white border border-border rounded-2xl p-8 md:p-10 shadow-sm"
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
              noValidate
            >
              {/* Full Name */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="fullName"
                  className="text-sm font-medium text-foreground"
                >
                  Full Name
                </label>
                <Input
                  id="fullName"
                  placeholder="e.g. Hans Müller"
                  className="h-12 focus-visible:ring-primary"
                  data-ocid="lead.input"
                  {...register("fullName", {
                    required: "Full name is required",
                    minLength: {
                      value: 2,
                      message: "Full name must be at least 2 characters",
                    },
                  })}
                />
                {errors.fullName && (
                  <p className="text-xs text-destructive">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-foreground"
                >
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="hans@example.com"
                  className="h-12 focus-visible:ring-primary"
                  data-ocid="lead.email_input"
                  autoComplete="email"
                  {...register("email", {
                    required: "Email address is required",
                    validate: validateEmail,
                  })}
                />
                {errors.email && (
                  <p className="text-xs text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Treatment Select */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="treatment-select"
                  className="text-sm font-medium text-foreground"
                >
                  Treatment Interest
                </label>
                <Select
                  value={treatmentValue}
                  onValueChange={setTreatmentValue}
                >
                  <SelectTrigger
                    id="treatment-select"
                    className="h-12 focus:ring-primary"
                    data-ocid="lead.select"
                  >
                    <SelectValue placeholder="Select a treatment..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ed">Erectile Dysfunction</SelectItem>
                    <SelectItem value="hair">Hair Loss</SelectItem>
                    <SelectItem value="weight">Weight Management</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-foreground"
                >
                  Additional Message{" "}
                  <span className="text-muted-foreground font-normal">
                    (optional)
                  </span>
                </label>
                <Textarea
                  id="message"
                  placeholder="Share anything you'd like your doctor to know..."
                  className="min-h-[120px] resize-none focus-visible:ring-primary"
                  data-ocid="lead.textarea"
                  {...register("message")}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                size="lg"
                className="w-full rounded-full py-6 text-base bg-primary text-white hover:bg-primary/90 shadow-md hover:shadow-lg transition-all"
                data-ocid="lead.submit_button"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Request Consultation"
                )}
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                <Lock className="inline h-3 w-3 mr-1" />
                Your data is protected under European GDPR regulations.
              </p>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── FAQ Section ──────────────────────────────────────────────────────────────

function FAQSection() {
  const faqs = [
    {
      id: "faq-1",
      question: "Is my consultation truly private?",
      answer:
        "Yes. All consultations are conducted online and your data is protected under European GDPR regulations. Medications are delivered in plain, unmarked packaging.",
    },
    {
      id: "faq-2",
      question: "Are your doctors licensed?",
      answer:
        "All physicians on our platform are fully licensed in their respective European countries and are members of recognised medical boards.",
    },
    {
      id: "faq-3",
      question: "How quickly can I receive my medication?",
      answer:
        "After your consultation is approved, most patients receive their medication within 3–5 business days via discreet delivery.",
    },
    {
      id: "faq-4",
      question: "What if the treatment doesn't work for me?",
      answer:
        "We offer a satisfaction guarantee. If your prescribed treatment isn't working, our medical team will review your case and adjust the protocol at no extra charge.",
    },
    {
      id: "faq-5",
      question: "Can I cancel my subscription at any time?",
      answer:
        "Yes. There are no long-term contracts. You can cancel, pause, or modify your subscription at any time from your patient dashboard.",
    },
  ];

  return (
    <section id="faq" className="py-20 md:py-32 bg-secondary">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-xs uppercase tracking-widest font-semibold text-accent">
            FAQ
          </span>
          <h2
            className="text-4xl md:text-5xl font-medium tracking-tight mt-3 text-foreground"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Frequently Asked Questions
          </h2>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="flex flex-col gap-2">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="bg-white border border-border rounded-xl px-6 overflow-hidden"
                data-ocid={`faq.item.${index + 1}`}
              >
                <AccordionTrigger className="text-base font-medium text-foreground py-5 hover:no-underline hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Contact Section ──────────────────────────────────────────────────────────

function ContactSection() {
  const contacts = [
    {
      id: "whatsapp",
      icon: MessageCircle,
      label: "WhatsApp",
      detail: "+44 7492 497781",
      href: "https://wa.me/447492497781",
      color: "text-green-600",
      bg: "bg-green-50 hover:bg-green-100",
      borderHover: "hover:border-green-300",
      ocid: "contact.whatsapp_button",
    },
    {
      id: "email",
      icon: Mail,
      label: "Email",
      detail: "curepharmaa@outlook.com",
      href: "mailto:curepharmaa@outlook.com",
      color: "text-primary",
      bg: "bg-primary/5 hover:bg-primary/10",
      borderHover: "hover:border-primary/30",
      ocid: "contact.email_button",
    },
    {
      id: "youtube",
      icon: Youtube,
      label: "YouTube",
      detail: "@curepharmaceuticals",
      href: "https://youtube.com/@curepharmaceuticals?si=ZECq1dEdHW4nQCwX",
      color: "text-red-600",
      bg: "bg-red-50 hover:bg-red-100",
      borderHover: "hover:border-red-300",
      ocid: "contact.youtube_button",
    },
    {
      id: "instagram",
      icon: null,
      label: "Instagram",
      detail: "@cure_phramacy",
      href: "https://www.instagram.com/cure_phramacy?igsh=MXIwOGlpYWNnOTY4bw==",
      color: "text-pink-600",
      bg: "bg-pink-50 hover:bg-pink-100",
      borderHover: "hover:border-pink-300",
      ocid: "contact.instagram_button",
    },
    {
      id: "telegram",
      icon: Send,
      label: "Telegram",
      detail: "@CurePharma2",
      href: "https://t.me/CurePharma2",
      color: "text-sky-600",
      bg: "bg-sky-50 hover:bg-sky-100",
      borderHover: "hover:border-sky-300",
      ocid: "contact.telegram_button",
    },
  ] as const;

  return (
    <section
      id="contact"
      className="py-20 md:py-32 bg-background"
      data-ocid="contact.section"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-xs uppercase tracking-widest font-semibold text-accent">
            Reach Out
          </span>
          <h2
            className="text-4xl md:text-5xl font-medium tracking-tight mt-3 text-foreground"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Get In Touch
          </h2>
          <p className="mt-4 text-base text-muted-foreground max-w-sm mx-auto">
            We're here to help. Choose your preferred way to reach us.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {contacts.map((contact) => (
            <motion.a
              key={contact.id}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeUp}
              data-ocid={contact.ocid}
              className={`group flex flex-col items-start gap-4 p-6 rounded-xl border border-border ${contact.bg} ${contact.borderHover} transition-all duration-300 hover:shadow-md hover:-translate-y-0.5`}
            >
              <div
                className={`w-11 h-11 rounded-xl ${contact.bg} border border-border flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300`}
              >
                {contact.id === "instagram" ? (
                  <SiInstagram className={`h-5 w-5 ${contact.color}`} />
                ) : (
                  contact.icon && (
                    <contact.icon className={`h-5 w-5 ${contact.color}`} />
                  )
                )}
              </div>
              <div className="flex flex-col gap-1">
                <p className={`text-sm font-semibold ${contact.color}`}>
                  {contact.label}
                </p>
                <p className="text-sm text-foreground font-medium leading-snug break-all">
                  {contact.detail}
                </p>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks: Record<string, string[]> = {
    Company: ["About", "Careers", "Press"],
    Treatments: ["ED Treatment", "Hair Loss", "Weight Management"],
    Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
  };

  return (
    <footer className="bg-foreground text-white/80 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <img
                src="/assets/uploads/IMG_4459-1.jpeg"
                alt="Cure Pharmaceuticals"
                className="h-12 w-auto object-contain rounded-md"
              />
            </div>
            <p className="text-sm leading-relaxed text-white/50">
              European Medical Wellness, Delivered.
            </p>
            <div className="flex items-center gap-2 mt-2">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-xs text-white/50">GDPR Compliant</span>
            </div>
            {/* Social links */}
            <div className="flex items-center gap-3 mt-1">
              <a
                href="https://wa.me/447492497781"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="text-white/50 hover:text-white transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
              <a
                href="mailto:curepharmaa@outlook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Email"
                className="text-white/50 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href="https://youtube.com/@curepharmaceuticals?si=ZECq1dEdHW4nQCwX"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-white/50 hover:text-white transition-colors"
              >
                <Youtube className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/cure_phramacy?igsh=MXIwOGlpYWNnOTY4bw=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-white/50 hover:text-white transition-colors"
              >
                <SiInstagram className="h-4 w-4" />
              </a>
              <a
                href="https://t.me/CurePharma2"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="text-white/50 hover:text-white transition-colors"
              >
                <Send className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="flex flex-col gap-4">
              <p className="text-sm font-semibold text-white uppercase tracking-widest">
                {category}
              </p>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <button
                      type="button"
                      className="text-sm text-white/50 hover:text-white transition-colors text-left"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="bg-white/10 mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © {currentYear} Cure Europe. All rights reserved.
          </p>
          <p className="text-xs text-white/40">
            CE Certified Medical Device Platform
          </p>
          <p className="text-xs text-white/40">
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.hostname : "",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/70 transition-colors underline underline-offset-2"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Products Page ────────────────────────────────────────────────────────────

type ProductCategory =
  | "All"
  | "Men's Health"
  | "Hair Loss"
  | "Weight Management"
  | "General Wellness";

interface CatalogProduct {
  id: number;
  name: string;
  tagline: string;
  price: string;
  badge: string | null;
  category: Exclude<ProductCategory, "All">;
}

const CATALOG_PRODUCTS: CatalogProduct[] = [
  {
    id: 1,
    name: "Erectile Dysfunction Treatment",
    tagline: "Clinically proven. Discreetly delivered.",
    price: "from €29/mo",
    badge: "Best Seller",
    category: "Men's Health",
  },
  {
    id: 2,
    name: "Testosterone Boost",
    tagline: "Restore energy, drive and confidence.",
    price: "from €45/mo",
    badge: null,
    category: "Men's Health",
  },
  {
    id: 3,
    name: "Premature Ejaculation",
    tagline: "Science-backed solutions for lasting intimacy.",
    price: "from €35/mo",
    badge: null,
    category: "Men's Health",
  },
  {
    id: 4,
    name: "Finasteride Treatment",
    tagline: "Stop hair loss with clinically proven finasteride.",
    price: "from €39/mo",
    badge: "Best Seller",
    category: "Hair Loss",
  },
  {
    id: 5,
    name: "Minoxidil Solution",
    tagline: "Stimulate regrowth with topical minoxidil.",
    price: "from €25/mo",
    badge: null,
    category: "Hair Loss",
  },
  {
    id: 6,
    name: "Hair Restoration Kit",
    tagline: "Complete 3-step hair restoration programme.",
    price: "from €59/mo",
    badge: null,
    category: "Hair Loss",
  },
  {
    id: 7,
    name: "Medically Supervised Weight Loss",
    tagline: "Doctor-guided, sustainable weight loss.",
    price: "from €49/mo",
    badge: null,
    category: "Weight Management",
  },
  {
    id: 8,
    name: "Appetite Control",
    tagline: "Clinically approved appetite suppressants.",
    price: "from €42/mo",
    badge: null,
    category: "Weight Management",
  },
  {
    id: 9,
    name: "Vitamin & Supplement Pack",
    tagline: "Personalised European wellness supplements.",
    price: "from €29/mo",
    badge: null,
    category: "General Wellness",
  },
  {
    id: 10,
    name: "Stress & Sleep Support",
    tagline: "Medical-grade sleep and stress relief.",
    price: "from €35/mo",
    badge: null,
    category: "General Wellness",
  },
];

const CATEGORY_TABS: ProductCategory[] = [
  "All",
  "Men's Health",
  "Hair Loss",
  "Weight Management",
  "General Wellness",
];

const CATEGORY_OCIDS: Record<ProductCategory, string> = {
  All: "products_page.all_tab",
  "Men's Health": "products_page.mens_health_tab",
  "Hair Loss": "products_page.hair_loss_tab",
  "Weight Management": "products_page.weight_management_tab",
  "General Wellness": "products_page.wellness_tab",
};

function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("All");

  const filtered =
    activeCategory === "All"
      ? CATALOG_PRODUCTS
      : CATALOG_PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* Page Hero */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.nav
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-2 text-sm text-muted-foreground mb-8"
            aria-label="Breadcrumb"
          >
            <Link
              to="/"
              className="hover:text-primary transition-colors"
              data-ocid="products_page.link"
            >
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">Products</span>
          </motion.nav>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-2xl"
          >
            <motion.span
              variants={fadeUp}
              className="text-xs uppercase tracking-widest font-semibold text-accent"
            >
              Our Catalogue
            </motion.span>
            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-6xl font-semibold tracking-tight leading-tight text-foreground mt-3"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Our Products
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-base md:text-lg leading-relaxed text-muted-foreground mt-4"
            >
              Clinically proven treatments, discreetly delivered.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <div className="sticky top-[100px] md:top-[116px] z-30 bg-background/95 backdrop-blur-sm border-b border-border py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {CATEGORY_TABS.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                data-ocid={CATEGORY_OCIDS[cat]}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-primary text-white shadow-sm"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div
              data-ocid="products_page.empty_state"
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <ShoppingBag className="h-7 w-7 text-muted-foreground" />
              </div>
              <h3
                className="text-xl font-medium text-foreground mb-2"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                No products in this category yet.
              </h3>
              <p className="text-sm text-muted-foreground">
                Check back soon or browse another category.
              </p>
            </div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              key={activeCategory}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((product, index) => (
                <motion.div
                  key={product.id}
                  variants={fadeUp}
                  data-ocid={`products_page.item.${index + 1}`}
                >
                  <Card className="h-full flex flex-col border border-border hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group overflow-hidden rounded-xl">
                    {/* Image */}
                    <div className="relative overflow-hidden aspect-video">
                      <img
                        src={PRODUCT_IMAGE}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      {product.badge && (
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-accent text-white border-0 shadow-sm text-xs font-semibold rounded-full px-2.5">
                            {product.badge}
                          </Badge>
                        </div>
                      )}
                      {/* Category pill */}
                      <div className="absolute top-3 right-3">
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-foreground/80 shadow-sm">
                          {product.category}
                        </span>
                      </div>
                    </div>

                    <CardHeader className="pb-2">
                      <CardTitle
                        className="text-xl text-foreground leading-snug"
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                        }}
                      >
                        {product.name}
                      </CardTitle>
                      <CardDescription className="text-sm text-muted-foreground">
                        {product.tagline}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="flex-1">
                      <p className="text-lg font-semibold text-primary">
                        {product.price}
                      </p>
                    </CardContent>

                    <CardFooter>
                      <Button
                        asChild
                        className="w-full rounded-full bg-primary text-white hover:bg-primary/90 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                        data-ocid={`products_page.buy_now_button.${index + 1}`}
                      >
                        <a
                          href={WHATSAPP_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageCircle className="mr-2 h-4 w-4" />
                          Buy Now
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}

// ─── Home Page ────────────────────────────────────────────────────────────────

function HomePage() {
  return (
    <main>
      <HeroSection />
      <TrustBar />
      <ProblemSolution />
      <HowItWorks />
      <ProductGrid />
      <MedicalExperts />
      <LeadCaptureForm />
      <FAQSection />
      <ContactSection />
    </main>
  );
}

// ─── Layout ───────────────────────────────────────────────────────────────────

function RootLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Toaster richColors position="top-center" />
      <AnnouncementBanner />
      <Navigation />
      <Outlet />
      <Footer />
    </div>
  );
}

// ─── Router Setup ─────────────────────────────────────────────────────────────

const rootRoute = createRootRoute({
  component: RootLayout,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/products",
  component: ProductsPage,
});

const routeTree = rootRoute.addChildren([homeRoute, productsRoute]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return <RouterProvider router={router} />;
}
