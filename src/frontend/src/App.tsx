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
  ChevronLeft,
  ChevronRight,
  Loader2,
  Lock,
  Mail,
  Menu,
  MessageCircle,
  Pencil,
  PlusCircle,
  Send,
  Shield,
  ShoppingBag,
  Star,
  Trash2,
  X,
  Youtube,
} from "lucide-react";
import { motion } from "motion/react";
import type { Variants } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SiInstagram } from "react-icons/si";
import { toast } from "sonner";

import type { ProductView, TouchdownGallery } from "@/backend";
import { useActor } from "@/hooks/useActor";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
import { Label } from "@/components/ui/label";
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
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

// ─── Constants ───────────────────────────────────────────────────────────────

const WHATSAPP_URL = "https://wa.me/message/GAVCZG4DDEMMH1";
const PRODUCT_IMAGE =
  "https://images.unsplash.com/photo-1763667926453-6a992d38ac43?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwzfHxtaW5pbWFsaXN0JTIwcGlsbCUyMGJvdHRsZSUyMG1lZGljYXRpb24lMjBwYWNrYWdpbmd8ZW58MHx8fHwxNzczMDI1MDA0fDA&ixlib=rb-4.1.0&q=85";

const DEFAULT_PRODUCTS: ProductView[] = [
  {
    id: "1",
    name: "Erectile Dysfunction Treatment",
    tagline: "Clinically proven. Discreetly delivered.",
    price: "from €29",
    badge: "Best Seller",
    category: "Men's Health",
    imageUrl:
      "https://images.unsplash.com/photo-1763667926453-6a992d38ac43?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=800",
    imageUrls: [
      "https://images.unsplash.com/photo-1763667926453-6a992d38ac43?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=800",
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=800",
      "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=800",
    ],
  },
  {
    id: "2",
    name: "Testosterone Boost",
    tagline: "Restore energy, drive and confidence.",
    price: "from €45",
    badge: "",
    category: "Men's Health",
    imageUrl:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=800",
    imageUrls: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=800",
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=800",
      "https://images.unsplash.com/photo-1594381898411-846e7d193883?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=800",
    ],
  },
  {
    id: "3",
    name: "Premature Ejaculation",
    tagline: "Science-backed solutions for lasting intimacy.",
    price: "from €35",
    badge: "",
    category: "Men's Health",
    imageUrl:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=800",
    imageUrls: [
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=800",
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=800",
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=800",
    ],
  },
  {
    id: "4",
    name: "Finasteride Treatment",
    tagline: "Stop hair loss with clinically proven finasteride.",
    price: "from €39",
    badge: "Best Seller",
    category: "Hair Loss",
    imageUrl:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=800",
    imageUrls: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=800",
      "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=800",
      "https://images.unsplash.com/photo-1560707303-4e980ce876ad?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=800",
    ],
  },
  {
    id: "5",
    name: "Minoxidil Solution",
    tagline: "Stimulate regrowth with topical minoxidil.",
    price: "from €25",
    badge: "",
    category: "Hair Loss",
    imageUrl:
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=800",
    imageUrls: [
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=800",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=800",
      "https://images.unsplash.com/photo-1504439468489-c8920d796a29?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=800",
    ],
  },
  {
    id: "6",
    name: "Hair Restoration Kit",
    tagline: "Complete 3-step hair restoration programme.",
    price: "from €59",
    badge: "",
    category: "Hair Loss",
    imageUrl:
      "https://images.unsplash.com/photo-1526045612212-70caf35c14df?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=800",
    imageUrls: [
      "https://images.unsplash.com/photo-1526045612212-70caf35c14df?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=800",
      "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=800",
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=800",
    ],
  },
  {
    id: "7",
    name: "Medically Supervised Weight Loss",
    tagline: "Doctor-guided, sustainable weight loss.",
    price: "from €49",
    badge: "",
    category: "Weight Management",
    imageUrl:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=800",
    imageUrls: [
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=800",
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=800",
      "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=800",
    ],
  },
  {
    id: "8",
    name: "Appetite Control",
    tagline: "Clinically approved appetite suppressants.",
    price: "from €42",
    badge: "",
    category: "Weight Management",
    imageUrl:
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=800",
    imageUrls: [
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=800",
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=800",
      "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=800",
    ],
  },
  {
    id: "9",
    name: "Vitamin & Supplement Pack",
    tagline: "Personalised European wellness supplements.",
    price: "from €29",
    badge: "",
    category: "General Wellness",
    imageUrl:
      "https://images.unsplash.com/photo-1550572017-4fcdbb59cc32?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=800",
    imageUrls: [
      "https://images.unsplash.com/photo-1550572017-4fcdbb59cc32?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=800",
      "https://images.unsplash.com/photo-1559181567-c3190ca9959b?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=800",
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=800",
    ],
  },
  {
    id: "10",
    name: "Stress & Sleep Support",
    tagline: "Medical-grade sleep and stress relief.",
    price: "from €35",
    badge: "",
    category: "General Wellness",
    imageUrl:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=800",
    imageUrls: [
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=800",
      "https://images.unsplash.com/photo-1520206183501-b80df61043c2?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=800",
      "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=800",
    ],
  },
];

// ─── Form Types ───────────────────────────────────────────────────────────────

interface ConsultationFormData {
  fullName: string;
  email: string;
  treatment: string;
  message: string;
}

interface ProductFormData {
  name: string;
  tagline: string;
  price: string;
  badge: string;
  category: string;
  imageUrls: string;
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

// ─── Product Image Carousel ───────────────────────────────────────────────────

interface ProductImageCarouselProps {
  images: string[];
  name: string;
  badge?: string;
  categoryPill?: string;
  showHoverScale?: boolean;
}

function ProductImageCarousel({
  images,
  name,
  badge,
  categoryPill,
  showHoverScale = false,
}: ProductImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const urls = images.length > 0 ? images : [PRODUCT_IMAGE];
  const hasMultiple = urls.length > 1;

  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((i) => (i - 1 + urls.length) % urls.length);
  };

  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((i) => (i + 1) % urls.length);
  };

  return (
    <div className="relative overflow-hidden aspect-video">
      <img
        src={urls[currentIndex]}
        alt={`${name} – view ${currentIndex + 1}`}
        className={`w-full h-full object-cover transition-all duration-500${showHoverScale ? " group-hover:scale-105" : ""}`}
        loading="lazy"
      />

      {/* Badge */}
      {badge && (
        <div className="absolute top-3 left-3 z-10">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-accent text-white shadow-sm">
            {badge}
          </span>
        </div>
      )}

      {/* Category pill */}
      {categoryPill && (
        <div className="absolute top-3 right-3 z-10">
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-foreground/80 shadow-sm">
            {categoryPill}
          </span>
        </div>
      )}

      {/* Left / Right arrows */}
      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-all backdrop-blur-sm"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next image"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-all backdrop-blur-sm"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </>
      )}

      {/* Dot indicators */}
      {hasMultiple && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
          {urls.map((url, i) => (
            <button
              key={url}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setCurrentIndex(i);
              }}
              aria-label={`Go to image ${i + 1}`}
              className={`rounded-full transition-all duration-200 ${
                i === currentIndex
                  ? "w-2 h-2 bg-white shadow-sm"
                  : "w-1.5 h-1.5 bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

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
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-muted transition-colors"
              data-ocid="nav.toggle"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
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

// ─── Live Notification Widget ────────────────────────────────────────────────

const LIVE_NOTIFICATIONS = [
  { icon: "✅", title: "Consultation approved", sub: "Dr. Müller · just now" },
  { icon: "📦", title: "Order dispatched", sub: "London · 1 min ago" },
  {
    icon: "✅",
    title: "Consultation approved",
    sub: "Dr. Schmidt · 2 min ago",
  },
  { icon: "💊", title: "Prescription issued", sub: "Dr. Weber · 3 min ago" },
  { icon: "📦", title: "Order dispatched", sub: "Manchester · 4 min ago" },
  {
    icon: "✅",
    title: "Consultation approved",
    sub: "Dr. Fischer · 5 min ago",
  },
  { icon: "⭐", title: "New 5-star review", sub: "James T. · 6 min ago" },
  { icon: "💊", title: "Prescription issued", sub: "Dr. Bauer · 7 min ago" },
  { icon: "📦", title: "Order dispatched", sub: "Berlin · 8 min ago" },
  { icon: "✅", title: "Consultation approved", sub: "Dr. Klein · 9 min ago" },
  { icon: "⭐", title: "New 5-star review", sub: "Marco R. · 10 min ago" },
  {
    icon: "💊",
    title: "Prescription issued",
    sub: "Dr. Hoffmann · 11 min ago",
  },
  { icon: "📦", title: "Order dispatched", sub: "Munich · 12 min ago" },
  { icon: "✅", title: "Consultation approved", sub: "Dr. Braun · 13 min ago" },
  { icon: "⭐", title: "New 5-star review", sub: "Alex P. · 14 min ago" },
  { icon: "💊", title: "Prescription issued", sub: "Dr. Wolf · 15 min ago" },
  { icon: "📦", title: "Order dispatched", sub: "Hamburg · 16 min ago" },
  {
    icon: "✅",
    title: "Consultation approved",
    sub: "Dr. Richter · 17 min ago",
  },
  { icon: "⭐", title: "New 5-star review", sub: "Liam K. · 18 min ago" },
  { icon: "💊", title: "Prescription issued", sub: "Dr. Neumann · 19 min ago" },
  { icon: "📦", title: "Order dispatched", sub: "Vienna · 20 min ago" },
  {
    icon: "✅",
    title: "Consultation approved",
    sub: "Dr. Schwarz · 21 min ago",
  },
  { icon: "⭐", title: "New 5-star review", sub: "Oliver M. · 22 min ago" },
  {
    icon: "💊",
    title: "Prescription issued",
    sub: "Dr. Zimmermann · 23 min ago",
  },
  { icon: "📦", title: "Order dispatched", sub: "Zurich · 24 min ago" },
  {
    icon: "✅",
    title: "Consultation approved",
    sub: "Dr. Krause · 25 min ago",
  },
  { icon: "⭐", title: "New 5-star review", sub: "Noah B. · 26 min ago" },
  {
    icon: "💊",
    title: "Prescription issued",
    sub: "Dr. Hartmann · 27 min ago",
  },
  { icon: "📦", title: "Order dispatched", sub: "Amsterdam · 28 min ago" },
  { icon: "✅", title: "Consultation approved", sub: "Dr. Lange · 29 min ago" },
  { icon: "⭐", title: "New 5-star review", sub: "Ethan W. · 30 min ago" },
  { icon: "💊", title: "Prescription issued", sub: "Dr. Köhler · 31 min ago" },
];

function LiveNotification() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % LIVE_NOTIFICATIONS.length);
        setVisible(true);
      }, 400);
    }, 40000);
    return () => clearInterval(interval);
  }, []);

  const notif = LIVE_NOTIFICATIONS[index];

  return (
    <div
      className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl max-w-[230px] transition-all duration-400"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(8px)",
      }}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-lg">
          {notif.icon}
        </div>
        <div>
          <p className="text-xs font-semibold text-foreground leading-tight">
            {notif.title}
          </p>
          <p className="text-xs text-muted-foreground leading-tight mt-0.5">
            {notif.sub}
          </p>
        </div>
      </div>
    </div>
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
              <LiveNotification />
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

function ProductGrid() {
  const { actor, isFetching } = useActor();
  const [products, setProducts] = useState<ProductView[]>(
    DEFAULT_PRODUCTS.slice(0, 3),
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!actor || isFetching) return;
    let cancelled = false;
    setLoading(true);
    actor
      .getAllProducts()
      .then(async (result) => {
        if (cancelled) return;
        if (result.length === 0) {
          await actor.seedProducts(DEFAULT_PRODUCTS);
          const seeded = await actor.getAllProducts();
          if (!cancelled) {
            setProducts(seeded.slice(0, 3));
            setLoading(false);
          }
        } else {
          setProducts(result.slice(0, 3));
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [actor, isFetching]);

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

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-xl border border-border overflow-hidden"
                data-ocid={`products.item.${i}`}
              >
                <Skeleton className="aspect-video w-full" />
                <div className="p-6 flex flex-col gap-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-5 w-1/3" />
                  <Skeleton className="h-10 w-full rounded-full mt-2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
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
                  <ProductImageCarousel
                    images={
                      product.imageUrls?.length > 0
                        ? product.imageUrls
                        : [product.imageUrl || PRODUCT_IMAGE]
                    }
                    name={product.name}
                    badge={product.badge || undefined}
                    showHoverScale
                  />
                  <CardHeader className="pb-2">
                    <CardTitle
                      className="text-xl text-foreground"
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
        )}

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

// ─── Reviews Section ─────────────────────────────────────────────────────────

function ReviewsSection() {
  const profilePhotos = [
    "/assets/uploads/IMG_8239-1.jpeg",
    "/assets/uploads/IMG_8242-2.jpeg",
    "/assets/uploads/IMG_8238-3.jpeg",
    "/assets/uploads/IMG_8241-4.jpeg",
    "/assets/uploads/IMG_8240-5.jpeg",
  ];

  const reviews = [
    {
      id: 1,
      name: "James T.",
      location: "London, UK",
      rating: 5,
      date: "March 2026",
      product: "Erectile Dysfunction Treatment",
      review:
        "Honestly one of the best decisions I've made. The whole process was completely private and the medication arrived within 4 days in a plain box. Already seeing real results after 3 weeks. Highly recommend to any man who needs this.",
      photo: profilePhotos[0],
    },
    {
      id: 2,
      name: "Marco B.",
      location: "Milan, Italy",
      rating: 5,
      date: "February 2026",
      product: "Erectile Dysfunction Treatment",
      review:
        "I was nervous at first but the online consultation was so easy and discreet. The doctor responded within a few hours and explained everything clearly. The treatment works great and my confidence is completely back.",
      photo: profilePhotos[1],
    },
    {
      id: 3,
      name: "David H.",
      location: "Berlin, Germany",
      rating: 4,
      date: "January 2026",
      product: "Erectile Dysfunction Treatment",
      review:
        "Very professional service. The packaging was totally discreet, no one would know what's inside. Delivery was fast and the medication is exactly what was prescribed. Would definitely order again.",
      photo: profilePhotos[2],
    },
    {
      id: 4,
      name: "Stefan M.",
      location: "Vienna, Austria",
      rating: 5,
      date: "March 2026",
      product: "Erectile Dysfunction Treatment",
      review:
        "Cure Europe has been life-changing for me. No embarrassing pharmacy visits, no waiting rooms. Just a quick online form, a doctor's response, and my treatment delivered to my door. The quality of the medication is excellent.",
      photo: profilePhotos[3],
    },
  ];

  const STAR_KEYS = ["s1", "s2", "s3", "s4", "s5"] as const;

  const renderStars = (count: number) =>
    STAR_KEYS.map((key, i) => (
      <Star
        key={key}
        className={`h-4 w-4 ${i < count ? "fill-accent text-accent" : "fill-muted text-muted"}`}
      />
    ));

  return (
    <section
      id="reviews"
      className="py-20 md:py-32 bg-secondary"
      data-ocid="reviews.section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-widest font-semibold text-accent">
            Customer Reviews
          </span>
          <h2
            className="text-4xl md:text-5xl font-medium tracking-tight mt-3 text-foreground"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            What Our Patients Say
          </h2>
          <p className="mt-4 text-base text-muted-foreground max-w-lg mx-auto">
            Real experiences from verified customers across Europe.
          </p>
          {/* Aggregate rating */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="flex items-center gap-1">{renderStars(5)}</div>
            <span className="text-lg font-bold text-foreground">4.9 / 5</span>
            <span className="text-sm text-muted-foreground">
              · Based on 12,400+ reviews
            </span>
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              variants={fadeUp}
              data-ocid={`reviews.item.${index + 1}`}
              className="bg-white rounded-2xl p-6 border border-border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col gap-4"
            >
              {/* Stars */}
              <div className="flex items-center gap-0.5">
                {renderStars(review.rating)}
              </div>

              {/* Review text */}
              <p className="text-sm leading-relaxed text-foreground/80 flex-1">
                "{review.review}"
              </p>

              {/* Product tag */}
              <div>
                <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-primary/8 text-primary border border-primary/15">
                  {review.product}
                </span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-border">
                <img
                  src={review.photo}
                  alt={review.name}
                  className="w-10 h-10 rounded-full object-cover shrink-0 border border-border"
                />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {review.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {review.location} · {review.date}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
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
  } = useForm<ConsultationFormData>({
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

  const onSubmit = async (data: ConsultationFormData) => {
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

// ─── TouchDown Gallery Section ─────────────────────────────────────────────

function TouchDownSection() {
  const { actor, isFetching } = useActor();
  const [images, setImages] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem("touchdown_images");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [title, setTitle] = useState(
    () => localStorage.getItem("touchdown_title") ?? "Our Touchdowns",
  );
  const [backendLoaded, setBackendLoaded] = useState(false);

  // Load from backend so ALL visitors (not just admin's browser) see the images
  useEffect(() => {
    if (!actor || isFetching) return;
    actor
      .getTouchdownGallery()
      .then((data: TouchdownGallery) => {
        if (data?.images && data.images.length > 0) {
          setImages(data.images);
          setTitle(data.title || "Our Touchdowns");
          localStorage.setItem("touchdown_images", JSON.stringify(data.images));
          localStorage.setItem(
            "touchdown_title",
            data.title || "Our Touchdowns",
          );
        }
        setBackendLoaded(true);
      })
      .catch(() => setBackendLoaded(true));
  }, [actor, isFetching]);

  useEffect(() => {
    const loadFromStorage = () => {
      try {
        const stored = localStorage.getItem("touchdown_images");
        const storedTitle = localStorage.getItem("touchdown_title");
        if (stored) setImages(JSON.parse(stored));
        if (storedTitle) setTitle(storedTitle);
      } catch {
        // ignore
      }
    };
    window.addEventListener("touchdownImagesUpdated", loadFromStorage);
    return () =>
      window.removeEventListener("touchdownImagesUpdated", loadFromStorage);
  }, []);

  // We duplicate the array so the strip loops seamlessly
  const displayImages = images.length > 0 ? images : [];
  const loopImages = [...displayImages, ...displayImages];

  // Only hide after backend has responded AND there are no images
  if (images.length === 0 && backendLoaded) return null;
  if (images.length === 0 && !backendLoaded) return null;
  return (
    <section
      id="touchdown"
      className="py-20 md:py-28 bg-secondary overflow-hidden"
      data-ocid="touchdown.section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-xs uppercase tracking-widest font-semibold text-accent">
            Gallery
          </span>
          <h2
            className="text-4xl md:text-5xl font-medium tracking-tight mt-3 text-foreground"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {title}
          </h2>
        </motion.div>
      </div>

      {/* Scroll strip */}
      {images.length === 0 ? (
        /* Placeholder grid when no images configured */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {(
              [
                "p1",
                "p2",
                "p3",
                "p4",
                "p5",
                "p6",
                "p7",
                "p8",
                "p9",
                "p10",
                "p11",
                "p12",
              ] as const
            ).map((id, i) => (
              <div
                key={id}
                className="h-[220px] rounded-xl bg-muted/60 border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 text-muted-foreground"
                data-ocid={`touchdown.item.${i + 1}`}
              >
                <div className="h-8 w-8 rounded-full bg-border flex items-center justify-center">
                  <PlusCircle className="h-4 w-4" />
                </div>
                <span className="text-xs font-medium">Add Image</span>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-6">
            Add images from the{" "}
            <a
              href="/Alexx"
              className="text-primary underline underline-offset-2 hover:text-primary/80"
            >
              Admin Panel
            </a>{" "}
            → TouchDown Gallery tab.
          </p>
        </div>
      ) : (
        /* Auto-scrolling strip */
        <div className="relative w-full overflow-hidden">
          <div
            className="flex gap-4 touchdown-scroll"
            style={{ width: "max-content" }}
          >
            {loopImages.map((src, i) => {
              return (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: intentional duplicate strip for seamless CSS infinite loop
                  key={`${src}-${i}`}
                  className="shrink-0 h-[220px] w-auto rounded-xl overflow-hidden border border-border shadow-sm"
                  data-ocid={
                    i < images.length ? `touchdown.item.${i + 1}` : undefined
                  }
                >
                  <img
                    src={src}
                    alt={`Touchdown ${(i % images.length) + 1}`}
                    className="h-full w-auto object-cover"
                    loading="lazy"
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
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
  const { actor, isFetching } = useActor();
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("All");
  const [products, setProducts] = useState<ProductView[]>(DEFAULT_PRODUCTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!actor || isFetching) return;
    let cancelled = false;
    setLoading(true);
    actor
      .getAllProducts()
      .then(async (result) => {
        if (cancelled) return;
        if (result.length === 0) {
          await actor.seedProducts(DEFAULT_PRODUCTS);
          const seeded = await actor.getAllProducts();
          if (!cancelled) {
            setProducts(seeded);
            setLoading(false);
          }
        } else {
          setProducts(result);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [actor, isFetching]);

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

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
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border overflow-hidden"
                  data-ocid={`products_page.item.${i}`}
                >
                  <Skeleton className="aspect-video w-full" />
                  <div className="p-6 flex flex-col gap-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-5 w-1/3" />
                    <Skeleton className="h-10 w-full rounded-full mt-2" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
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
                    {/* Image Carousel */}
                    <ProductImageCarousel
                      images={
                        product.imageUrls?.length > 0
                          ? product.imageUrls
                          : [product.imageUrl || PRODUCT_IMAGE]
                      }
                      name={product.name}
                      badge={product.badge || undefined}
                      categoryPill={product.category}
                      showHoverScale
                    />

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
      <ReviewsSection />
      <MedicalExperts />
      <LeadCaptureForm />
      <TouchDownSection />
      <FAQSection />
      <ContactSection />
    </main>
  );
}

// ─── Public Layout ────────────────────────────────────────────────────────────

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

// ─── Admin Panel ──────────────────────────────────────────────────────────────

const ADMIN_CATEGORIES: ProductCategory[] = [
  "Men's Health",
  "Hair Loss",
  "Weight Management",
  "General Wellness",
];

// Product Form Sheet
interface ProductFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingProduct: ProductView | null;
  onSaved: () => void;
}

function ProductFormSheet({
  open,
  onOpenChange,
  editingProduct,
  onSaved,
}: ProductFormSheetProps) {
  const { actor } = useActor();
  const [isSaving, setIsSaving] = useState(false);
  const [categoryValue, setCategoryValue] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProductFormData>({
    defaultValues: {
      name: "",
      tagline: "",
      price: "",
      badge: "",
      category: "",
      imageUrls: "",
    },
  });

  // Populate form when editing
  useEffect(() => {
    if (editingProduct) {
      setValue("name", editingProduct.name);
      setValue("tagline", editingProduct.tagline);
      setValue("price", editingProduct.price);
      setValue("badge", editingProduct.badge);
      setValue("category", editingProduct.category);
      const urlsText =
        editingProduct.imageUrls?.length > 0
          ? editingProduct.imageUrls.join("\n")
          : editingProduct.imageUrl;
      setValue("imageUrls", urlsText);
      setCategoryValue(editingProduct.category);
    } else {
      reset();
      setCategoryValue("");
    }
  }, [editingProduct, setValue, reset]);

  const onSubmit = async (data: ProductFormData) => {
    if (!actor) return;
    if (!categoryValue) {
      toast.error("Please select a category.");
      return;
    }
    setIsSaving(true);
    try {
      const imageUrlsArray = data.imageUrls
        .split("\n")
        .map((u) => u.trim())
        .filter(Boolean);
      const primaryImageUrl = imageUrlsArray[0] ?? "";

      if (editingProduct) {
        await actor.updateProduct(
          editingProduct.id,
          data.name,
          data.tagline,
          data.price,
          data.badge,
          categoryValue,
          primaryImageUrl,
          imageUrlsArray,
        );
      } else {
        const newId = String(Date.now());
        await actor.addProduct(
          newId,
          data.name,
          data.tagline,
          data.price,
          data.badge,
          categoryValue,
          primaryImageUrl,
          imageUrlsArray,
        );
      }
      toast.success("Product saved");
      onOpenChange(false);
      onSaved();
    } catch {
      toast.error("Failed to save product. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader className="pb-4">
          <SheetTitle>
            {editingProduct ? "Edit Product" : "Add New Product"}
          </SheetTitle>
          <SheetDescription>
            {editingProduct
              ? "Update the product details below."
              : "Fill in the product details to add it to your catalogue."}
          </SheetDescription>
        </SheetHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 px-4 py-2"
        >
          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="admin-name">Name</Label>
            <Input
              id="admin-name"
              placeholder="e.g. Erectile Dysfunction Treatment"
              data-ocid="admin.form.name_input"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* Tagline */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="admin-tagline">Tagline</Label>
            <Input
              id="admin-tagline"
              placeholder="Short description"
              data-ocid="admin.form.tagline_input"
              {...register("tagline", { required: "Tagline is required" })}
            />
            {errors.tagline && (
              <p className="text-xs text-destructive">
                {errors.tagline.message}
              </p>
            )}
          </div>

          {/* Price */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="admin-price">Price</Label>
            <Input
              id="admin-price"
              placeholder='e.g. "from €29"'
              data-ocid="admin.form.price_input"
              {...register("price", { required: "Price is required" })}
            />
            {errors.price && (
              <p className="text-xs text-destructive">{errors.price.message}</p>
            )}
          </div>

          {/* Badge */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="admin-badge">Badge</Label>
            <Input
              id="admin-badge"
              placeholder="e.g. Best Seller (leave empty for no badge)"
              data-ocid="admin.form.badge_input"
              {...register("badge")}
            />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="admin-category">Category</Label>
            <Select
              value={categoryValue}
              onValueChange={(val) => {
                setCategoryValue(val);
                setValue("category", val);
              }}
            >
              <SelectTrigger
                id="admin-category"
                data-ocid="admin.form.category_select"
              >
                <SelectValue placeholder="Select a category..." />
              </SelectTrigger>
              <SelectContent>
                {ADMIN_CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Image URLs */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="admin-image">
              Image URLs (one per line, up to 5)
            </Label>
            <Textarea
              id="admin-image"
              placeholder={
                "https://example.com/image1.jpg\nhttps://example.com/image2.jpg\nhttps://example.com/image3.jpg"
              }
              rows={4}
              className="resize-none"
              data-ocid="admin.form.image_input"
              {...register("imageUrls")}
            />
          </div>

          <SheetFooter className="flex-row gap-3 pt-2 px-0">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
              data-ocid="admin.form.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSaving}
              className="flex-1 bg-primary text-white hover:bg-primary/90"
              data-ocid="admin.form.save_button"
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Product"
              )}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}

// Admin Dashboard
interface AdminDashboardProps {
  onLogout: () => void;
}

function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const { actor, isFetching } = useActor();
  const [products, setProducts] = useState<ProductView[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductView | null>(
    null,
  );
  const [deleteTarget, setDeleteTarget] = useState<ProductView | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // ── TouchDown Gallery state ──────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState<"products" | "touchdown">(
    "products",
  );
  const [touchdownImages, setTouchdownImages] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem("touchdown_images");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [touchdownTitle, setTouchdownTitle] = useState<string>(
    () => localStorage.getItem("touchdown_title") ?? "Our Touchdowns",
  );
  const [newImageUrl, setNewImageUrl] = useState("");
  const [showAddImageForm, setShowAddImageForm] = useState(false);

  const saveTouchdownImages = (imgs: string[]) => {
    setTouchdownImages(imgs);
    localStorage.setItem("touchdown_images", JSON.stringify(imgs));
    window.dispatchEvent(new Event("touchdownImagesUpdated"));
    if (actor) {
      actor.setTouchdownGallery(imgs, touchdownTitle).catch(() => {});
    }
  };

  const saveTouchdownTitle = (t: string) => {
    setTouchdownTitle(t);
    localStorage.setItem("touchdown_title", t);
    window.dispatchEvent(new Event("touchdownImagesUpdated"));
    if (actor) {
      actor.setTouchdownGallery(touchdownImages, t).catch(() => {});
    }
  };

  const handleAddTouchdownImage = () => {
    const url = newImageUrl.trim();
    if (!url) return;
    if (touchdownImages.length >= 20) {
      toast.error("Maximum 20 images allowed.");
      return;
    }
    const updated = [...touchdownImages, url];
    saveTouchdownImages(updated);
    setNewImageUrl("");
    setShowAddImageForm(false);
    toast.success("Image added to TouchDown gallery.");
  };

  const handleDeleteTouchdownImage = (index: number) => {
    const updated = touchdownImages.filter((_, i) => i !== index);
    saveTouchdownImages(updated);
    toast.success("Image removed.");
  };

  const fetchProducts = useCallback(async () => {
    if (!actor) return;
    setLoadingProducts(true);
    try {
      const result = await actor.getAllProducts();
      if (result.length === 0) {
        // Seed default products on first load
        await actor.seedProducts(DEFAULT_PRODUCTS);
        const seeded = await actor.getAllProducts();
        setProducts(seeded);
      } else {
        setProducts(result);
      }
    } catch {
      toast.error("Failed to load products.");
    } finally {
      setLoadingProducts(false);
    }
  }, [actor]);

  useEffect(() => {
    if (!actor || isFetching) return;
    fetchProducts();
  }, [actor, isFetching, fetchProducts]);

  const handleEditClick = (product: ProductView) => {
    setEditingProduct(product);
    setFormOpen(true);
  };

  const handleAddClick = () => {
    setEditingProduct(null);
    setFormOpen(true);
  };

  const handleFormSaved = () => {
    fetchProducts();
  };

  const handleDeleteConfirm = async () => {
    if (!actor || !deleteTarget) return;
    setIsDeleting(true);
    try {
      await actor.deleteProduct(deleteTarget.id);
      toast.success("Product deleted");
      setDeleteTarget(null);
      fetchProducts();
    } catch {
      toast.error("Failed to delete product.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <img
                src="/assets/uploads/IMG_4459-1.jpeg"
                alt="Cure Pharmaceuticals"
                className="h-9 w-auto object-contain"
              />
              <div>
                <p
                  className="text-sm font-semibold text-foreground leading-tight"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Cure Pharmacy Europe
                </p>
                <p className="text-xs text-muted-foreground">Admin Panel</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onLogout}
              data-ocid="admin.logout_button"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab switcher */}
        <div className="flex items-center gap-1 mb-6 border-b border-border">
          <button
            type="button"
            onClick={() => setActiveTab("products")}
            className={`px-5 py-2.5 text-sm font-medium rounded-t-lg transition-colors -mb-px border border-transparent ${
              activeTab === "products"
                ? "bg-white border-border border-b-white text-primary shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
            data-ocid="admin.products.tab"
          >
            Products
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("touchdown")}
            className={`px-5 py-2.5 text-sm font-medium rounded-t-lg transition-colors -mb-px border border-transparent ${
              activeTab === "touchdown"
                ? "bg-white border-border border-b-white text-primary shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
            data-ocid="admin.touchdown.tab"
          >
            TouchDown Gallery
          </button>
        </div>

        {activeTab === "products" && (
          <>
            {/* Products Page header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Products</h1>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Manage your product catalogue
                </p>
              </div>
              <Button
                onClick={handleAddClick}
                className="bg-primary text-white hover:bg-primary/90"
                data-ocid="admin.add_button"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Product
              </Button>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
              {loadingProducts ? (
                <div
                  className="flex flex-col items-center justify-center py-16"
                  data-ocid="admin.loading_state"
                >
                  <Loader2 className="h-8 w-8 animate-spin text-primary mb-3" />
                  <p className="text-sm text-muted-foreground">
                    Loading products...
                  </p>
                </div>
              ) : products.length === 0 ? (
                <div
                  className="flex flex-col items-center justify-center py-16 text-center"
                  data-ocid="admin.product.empty_state"
                >
                  <ShoppingBag className="h-10 w-10 text-muted-foreground mb-3" />
                  <p className="text-base font-medium text-foreground">
                    No products yet
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Click "Add New Product" to get started.
                  </p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/40">
                      <TableHead className="w-[280px]">Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Badge</TableHead>
                      <TableHead className="text-right w-[140px]">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product, index) => (
                      <TableRow
                        key={product.id}
                        data-ocid={`admin.product.item.${index + 1}`}
                        className="hover:bg-muted/20 transition-colors"
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <img
                              src={product.imageUrl || PRODUCT_IMAGE}
                              alt={product.name}
                              className="w-10 h-10 rounded-lg object-cover shrink-0 border border-border"
                            />
                            <div>
                              <p className="text-sm font-medium text-foreground">
                                {product.name}
                              </p>
                              <p className="text-xs text-muted-foreground truncate max-w-[180px]">
                                {product.tagline}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-muted-foreground">
                            {product.category}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm font-medium text-primary">
                            {product.price}
                          </span>
                        </TableCell>
                        <TableCell>
                          {product.badge ? (
                            <Badge className="bg-accent/15 text-accent border-accent/30 text-xs">
                              {product.badge}
                            </Badge>
                          ) : (
                            <span className="text-xs text-muted-foreground">
                              —
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-foreground"
                              onClick={() => handleEditClick(product)}
                              data-ocid={`admin.product.edit_button.${index + 1}`}
                              aria-label={`Edit ${product.name}`}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-destructive"
                              onClick={() => setDeleteTarget(product)}
                              data-ocid={`admin.product.delete_button.${index + 1}`}
                              aria-label={`Delete ${product.name}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>

            {/* Product count */}
            {!loadingProducts && products.length > 0 && (
              <p className="text-xs text-muted-foreground mt-3">
                {products.length} product{products.length !== 1 ? "s" : ""}{" "}
                total
              </p>
            )}
          </>
        )}

        {/* ── TouchDown Gallery Tab ─────────────────────────────────────── */}
        {activeTab === "touchdown" && (
          <div>
            {/* Section title editor */}
            <div className="bg-white rounded-xl border border-border shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Section Title
              </h2>
              <div className="flex items-center gap-3">
                <Input
                  value={touchdownTitle}
                  onChange={(e) => saveTouchdownTitle(e.target.value)}
                  placeholder="Our Touchdowns"
                  className="max-w-xs h-10"
                  data-ocid="admin.touchdown.input"
                />
                <span className="text-xs text-muted-foreground">
                  Title shown in the TouchDown section on the homepage
                </span>
              </div>
            </div>

            {/* Images header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Images
                </h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {touchdownImages.length}/20 images · auto-scrolling right to
                  left
                </p>
              </div>
              <Button
                onClick={() => setShowAddImageForm((v) => !v)}
                className="bg-primary text-white hover:bg-primary/90"
                data-ocid="admin.touchdown.add_button"
                disabled={touchdownImages.length >= 20}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Image
              </Button>
            </div>

            {/* Add image form */}
            {showAddImageForm && (
              <div className="bg-white border border-border rounded-xl p-5 mb-5 shadow-sm">
                <p className="text-sm font-medium text-foreground mb-3">
                  Paste an image URL below:
                </p>
                <div className="flex items-center gap-3">
                  <Input
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="flex-1 h-10"
                    data-ocid="admin.touchdown.url_input"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleAddTouchdownImage();
                    }}
                  />
                  <Button
                    onClick={handleAddTouchdownImage}
                    className="bg-primary text-white hover:bg-primary/90 shrink-0"
                    data-ocid="admin.touchdown.save_button"
                    disabled={!newImageUrl.trim()}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowAddImageForm(false);
                      setNewImageUrl("");
                    }}
                    data-ocid="admin.touchdown.cancel_button"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {/* Images grid */}
            {touchdownImages.length === 0 ? (
              <div
                className="bg-white rounded-xl border border-border shadow-sm py-16 text-center"
                data-ocid="admin.touchdown.empty_state"
              >
                <div className="flex flex-col items-center gap-3 text-muted-foreground">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                    <PlusCircle className="h-6 w-6" />
                  </div>
                  <p className="text-base font-medium text-foreground">
                    No images yet
                  </p>
                  <p className="text-sm">
                    Click "Add Image" to add your first image URL.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {touchdownImages.map((src, index) => {
                  return (
                    <div
                      // biome-ignore lint/suspicious/noArrayIndexKey: position-managed gallery, admin controls order
                      key={`${src}-${index}`}
                      className="relative group rounded-xl overflow-hidden border border-border shadow-sm aspect-square bg-muted"
                      data-ocid={`admin.touchdown.item.${index + 1}`}
                    >
                      <img
                        src={src}
                        alt={`Gallery item ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button
                          variant="destructive"
                          size="icon"
                          className="h-9 w-9 shadow-lg"
                          onClick={() => handleDeleteTouchdownImage(index)}
                          data-ocid={`admin.touchdown.delete_button.${index + 1}`}
                          aria-label={`Delete image ${index + 1}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="absolute bottom-1.5 left-1.5 bg-black/60 text-white text-[10px] font-mono px-1.5 py-0.5 rounded">
                        {index + 1}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Product Form Sheet */}
      <ProductFormSheet
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) setEditingProduct(null);
        }}
        editingProduct={editingProduct}
        onSaved={handleFormSaved}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <strong>{deleteTarget?.name}</strong>? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              data-ocid="admin.delete.cancel_button"
              disabled={isDeleting}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="bg-destructive text-white hover:bg-destructive/90"
              data-ocid="admin.delete.confirm_button"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// Admin Login
function AdminLogin({
  onLoginSuccess,
}: {
  onLoginSuccess: () => void;
}) {
  const { actor, isFetching } = useActor();
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    setIsLoggingIn(true);
    setLoginError(false);
    try {
      // Try backend first, fall back to local check
      let success = false;
      if (actor) {
        try {
          success = await actor.adminLogin(password);
        } catch {
          success = password === "Alex@thomas2026";
        }
      } else {
        success = password === "Alex@thomas2026";
      }
      if (success) {
        onLoginSuccess();
      } else {
        setLoginError(true);
      }
    } catch {
      setLoginError(true);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <img
            src="/assets/uploads/IMG_4459-1.jpeg"
            alt="Cure Pharmaceuticals"
            className="h-14 w-auto object-contain"
          />
          <div className="text-center">
            <p
              className="text-lg font-semibold text-foreground"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Cure Pharmacy Europe
            </p>
            <p className="text-sm text-muted-foreground">Admin Panel</p>
          </div>
        </div>

        <Card className="shadow-md border border-border">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Enter your admin password to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="admin-password">Password</Label>
                <Input
                  id="admin-password"
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setLoginError(false);
                  }}
                  data-ocid="admin.password_input"
                  autoComplete="current-password"
                  disabled={isFetching}
                />
              </div>

              {loginError && (
                <p
                  className="text-sm text-destructive text-center"
                  data-ocid="admin.error_state"
                >
                  Incorrect password. Please try again.
                </p>
              )}

              <Button
                type="submit"
                disabled={isLoggingIn || !password}
                className="w-full bg-primary text-white hover:bg-primary/90"
                data-ocid="admin.submit_button"
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Admin Page (combines login + dashboard)
function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return <AdminDashboard onLogout={() => setIsAuthenticated(false)} />;
}

// Admin Layout (standalone — no banner/nav/footer)
function AdminLayout() {
  return (
    <>
      <Toaster richColors position="top-center" />
      <AdminPage />
    </>
  );
}

// ─── Router Setup ─────────────────────────────────────────────────────────────

const rootRoute = createRootRoute();

const publicLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "public",
  component: RootLayout,
});

const homeRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/",
  component: HomePage,
});

const productsRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/products",
  component: ProductsPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/Alexx",
  component: AdminLayout,
});

const routeTree = rootRoute.addChildren([
  publicLayoutRoute.addChildren([homeRoute, productsRoute]),
  adminRoute,
]);

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
