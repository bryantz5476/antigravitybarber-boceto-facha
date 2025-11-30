import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Scissors, Calendar, Clock, MapPin, ArrowRight, Instagram, Twitter } from 'lucide-react';

// --- Custom Cursor Component ---
const Cursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const mouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e) => {
            if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.closest('.interactive')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', mouseMove);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', mouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    const variants = {
        default: {
            x: mousePosition.x - 8,
            y: mousePosition.y - 8,
            height: 16,
            width: 16,
            backgroundColor: "white",
            mixBlendMode: "difference"
        },
        hover: {
            x: mousePosition.x - 32,
            y: mousePosition.y - 32,
            height: 64,
            width: 64,
            backgroundColor: "white",
            mixBlendMode: "difference"
        }
    };

    return (
        <motion.div
            className="fixed top-0 left-0 rounded-full pointer-events-none z-50"
            variants={variants}
            animate={isHovering ? "hover" : "default"}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
        />
    );
};

// --- Magnetic Button Component ---
const MagneticButton = ({ children, className }) => {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    const { x, y } = position;
    return (
        <motion.button
            ref={ref}
            className={`interactive relative overflow-hidden ${className}`}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        >
            {children}
        </motion.button>
    );
};

// --- Hero Section ---
const Hero = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const x = clientX / innerWidth;
        const y = clientY / innerHeight;
        setMousePosition({ x, y });
    };

    return (
        <section
            className="h-screen w-full flex items-center justify-center relative overflow-hidden"
            onMouseMove={handleMouseMove}
        >
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-900 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gray-800 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 text-center">
                <motion.h1
                    className="text-[12vw] leading-none font-bold font-heading tracking-tighter select-none"
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <span className="block relative">
                        <span className="text-transparent stroke-text absolute inset-0" style={{ WebkitTextStroke: '2px white' }}>SHARP.</span>
                        <motion.span
                            className="text-red-600 relative z-10"
                            style={{
                                clipPath: `circle(150px at ${mousePosition.x * 100}% ${mousePosition.y * 100}%)`
                            }}
                        >
                            SHARP.
                        </motion.span>
                    </span>
                </motion.h1>

                <motion.p
                    className="mt-8 text-xl md:text-2xl text-gray-400 font-light tracking-widest uppercase"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    Precision Cuts &middot; Urban Style
                </motion.p>

                <div className="mt-12 flex justify-center gap-6">
                    <MagneticButton className="px-8 py-4 bg-white text-black font-bold uppercase tracking-wider hover:bg-red-600 hover:text-white transition-colors duration-300">
                        Book Now
                    </MagneticButton>
                    <MagneticButton className="px-8 py-4 border border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors duration-300">
                        Services
                    </MagneticButton>
                </div>
            </div>
        </section>
    );
};

// --- Marquee Section ---
const Marquee = () => {
    return (
        <div className="py-12 bg-red-600 overflow-hidden whitespace-nowrap relative z-20 rotate-[-2deg] scale-110">
            <motion.div
                className="flex gap-12 text-black font-heading font-bold text-6xl uppercase"
                animate={{ x: [0, -1000] }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            >
                <span>Walk-ins Welcome</span>
                <span>&middot;</span>
                <span>Premium Products</span>
                <span>&middot;</span>
                <span>Expert Barbers</span>
                <span>&middot;</span>
                <span>Cold Drinks</span>
                <span>&middot;</span>
                <span>Walk-ins Welcome</span>
                <span>&middot;</span>
                <span>Premium Products</span>
                <span>&middot;</span>
                <span>Expert Barbers</span>
                <span>&middot;</span>
                <span>Cold Drinks</span>
            </motion.div>
        </div>
    );
};

// --- About Section ---
const About = () => {
    return (
        <section className="py-32 bg-black relative overflow-hidden">
            <div className="container grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-sm font-bold text-red-600 tracking-[0.5em] uppercase mb-4">About Us</h2>
                    <h3 className="text-5xl font-heading font-bold mb-8">Redefining the Barbershop Experience</h3>
                    <p className="text-gray-400 text-lg leading-relaxed mb-6">
                        At SHARP, we believe that every cut tells a story. Since 2020, we've been crafting precision
                        styles for the modern man who demands excellence.
                    </p>
                    <p className="text-gray-400 text-lg leading-relaxed mb-8">
                        Our team of master barbers combines traditional techniques with contemporary trends,
                        ensuring you walk out looking sharp and feeling confident.
                    </p>
                    <div className="flex gap-12">
                        <div>
                            <div className="text-5xl font-heading font-bold text-red-600">500+</div>
                            <div className="text-gray-500 uppercase text-sm mt-2">Happy Clients</div>
                        </div>
                        <div>
                            <div className="text-5xl font-heading font-bold text-red-600">5★</div>
                            <div className="text-gray-500 uppercase text-sm mt-2">Rating</div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="relative h-[600px]"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent rounded-lg" />
                    <div className="absolute inset-4 border-2 border-white/10 rounded-lg" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                        <Scissors className="w-32 h-32 text-red-600 mx-auto mb-4" />
                        <p className="text-gray-600 text-sm uppercase tracking-widest">Precision in Every Cut</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

// --- Services Section ---
const ServiceCard = ({ title, price, index }) => {
    return (
        <motion.div
            className="border-b border-gray-800 py-12 flex justify-between items-center group interactive cursor-none"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
        >
            <div className="flex items-center gap-8">
                <span className="text-gray-600 font-heading text-2xl">0{index + 1}</span>
                <h3 className="text-4xl md:text-6xl font-heading font-bold group-hover:text-red-600 transition-colors duration-300 uppercase">
                    {title}
                </h3>
            </div>
            <div className="flex items-center gap-4">
                <span className="text-xl md:text-2xl font-light text-gray-400 group-hover:text-white transition-colors">${price}</span>
                <ArrowRight className="w-6 h-6 text-red-600 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
            </div>
        </motion.div>
    );
};

const Services = () => {
    const services = [
        { title: "The Classic Cut", price: "35" },
        { title: "Beard Sculpting", price: "25" },
        { title: "Hot Towel Shave", price: "40" },
        { title: "Full Service", price: "65" }
    ];

    return (
        <section className="py-32 bg-black relative z-20">
            <div className="container">
                <motion.div
                    className="mb-20"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-sm font-bold text-red-600 tracking-[0.5em] uppercase mb-4">Our Menu</h2>
                    <p className="text-5xl font-heading font-bold text-white">Refined Grooming</p>
                </motion.div>

                <div className="flex flex-col">
                    {services.map((s, i) => (
                        <ServiceCard key={i} {...s} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- Gallery Section ---
const Gallery = () => {
    const images = [
        { id: 1, category: "Fades" },
        { id: 2, category: "Beards" },
        { id: 3, category: "Classic" },
        { id: 4, category: "Modern" },
        { id: 5, category: "Styling" },
        { id: 6, category: "Coloring" }
    ];

    return (
        <section className="py-32 bg-zinc-950 relative z-20">
            <div className="container">
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-sm font-bold text-red-600 tracking-[0.5em] uppercase mb-4">Portfolio</h2>
                    <p className="text-5xl font-heading font-bold text-white">Our Work Speaks</p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {images.map((img, index) => (
                        <motion.div
                            key={img.id}
                            className="relative aspect-square bg-zinc-900 rounded overflow-hidden group interactive cursor-none"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-red-600/40 to-black/80 flex items-center justify-center">
                                <div className="text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <Scissors className="w-12 h-12 mx-auto mb-2 text-white" />
                                    <p className="text-white font-heading text-xl uppercase">{img.category}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- Barbers Team Section ---
const BarbersTeam = () => {
    const barbers = [
        { name: "Marcus Steel", specialty: "Fades & Lineups", experience: "8 years" },
        { name: "Alex Blade", specialty: "Beard Sculpting", experience: "6 years" },
        { name: "Jordan Sharp", specialty: "Classic Cuts", experience: "10 years" }
    ];

    return (
        <section className="py-32 bg-black relative">
            <div className="container">
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-sm font-bold text-red-600 tracking-[0.5em] uppercase mb-4">The Team</h2>
                    <p className="text-5xl font-heading font-bold text-white">Master Barbers</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {barbers.map((barber, index) => (
                        <motion.div
                            key={index}
                            className="group interactive cursor-none"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2, duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <div className="relative aspect-[3/4] bg-zinc-900 rounded-lg overflow-hidden mb-6">
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Scissors className="w-24 h-24 text-red-600/30" />
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <div className="w-12 h-1 bg-red-600 mb-3" />
                                    <p className="text-xs text-gray-500 uppercase tracking-wider">{barber.experience} Experience</p>
                                </div>
                            </div>
                            <h3 className="text-2xl font-heading font-bold mb-2 group-hover:text-red-600 transition-colors">{barber.name}</h3>
                            <p className="text-gray-500 uppercase text-sm tracking-wider">{barber.specialty}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- Testimonials Section ---
const Testimonials = () => {
    const reviews = [
        { name: "David M.", text: "Best barbershop in the city. The attention to detail is unmatched.", rating: 5 },
        { name: "Carlos R.", text: "Sharp by name, sharp by nature. My go-to place for 2 years now.", rating: 5 },
        { name: "James L.", text: "Professional service, chill vibes, and always a fresh cut.", rating: 5 }
    ];

    return (
        <section className="py-32 bg-zinc-950 relative">
            <div className="container">
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-sm font-bold text-red-600 tracking-[0.5em] uppercase mb-4">Reviews</h2>
                    <p className="text-5xl font-heading font-bold text-white">What They Say</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review, index) => (
                        <motion.div
                            key={index}
                            className="bg-black border border-gray-800 p-8 rounded-lg relative group interactive cursor-none hover:border-red-600 transition-colors duration-300"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.15, duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex gap-1 mb-6">
                                {[...Array(review.rating)].map((_, i) => (
                                    <span key={i} className="text-red-600 text-xl">★</span>
                                ))}
                            </div>
                            <p className="text-gray-300 text-lg leading-relaxed mb-6">"{review.text}"</p>
                            <p className="text-gray-500 font-bold uppercase text-sm tracking-wider">— {review.name}</p>
                            <div className="absolute top-4 right-4 text-6xl text-red-600/10 font-heading">"</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- Contact Section ---
const Contact = () => {
    return (
        <section className="py-32 bg-black relative">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-sm font-bold text-red-600 tracking-[0.5em] uppercase mb-4">Get in Touch</h2>
                        <h3 className="text-5xl font-heading font-bold mb-8">Book Your Appointment</h3>

                        <div className="space-y-6 mb-8">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shrink-0">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Location</p>
                                    <p className="text-white">123 Urban Avenue, District 9, NY 10012</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shrink-0">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Hours</p>
                                    <p className="text-white">Mon-Sat: 10am - 8pm</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shrink-0">
                                    <Calendar className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Booking</p>
                                    <p className="text-white">Walk-ins welcome or call ahead</p>
                                </div>
                            </div>
                        </div>

                        <MagneticButton className="px-12 py-5 bg-red-600 text-white font-bold uppercase tracking-wider text-lg hover:bg-white hover:text-black transition-colors duration-300">
                            Book Now
                        </MagneticButton>
                    </motion.div>

                    <motion.div
                        className="relative h-[500px] bg-zinc-900 rounded-lg overflow-hidden"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                                <MapPin className="w-20 h-20 text-red-600 mx-auto mb-4" />
                                <p className="text-gray-600 uppercase tracking-widest text-sm">Map Placeholder</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

// --- Footer ---
const Footer = () => {
    return (
        <footer className="py-20 bg-black border-t border-gray-900 relative z-20">
            <div className="container grid grid-cols-1 md:grid-cols-3 gap-12">
                <div>
                    <h4 className="text-2xl font-heading font-bold mb-6">SHARP.</h4>
                    <p className="text-gray-500 max-w-xs">
                        Elevating the art of grooming for the modern gentleman.
                        Precision, style, and experience.
                    </p>
                </div>
                <div>
                    <h4 className="text-lg font-bold mb-6 uppercase tracking-wider">Location</h4>
                    <div className="flex items-start gap-3 text-gray-400 mb-4">
                        <MapPin className="w-5 h-5 text-red-600 shrink-0" />
                        <p>123 Urban Avenue, District 9<br />New York, NY 10012</p>
                    </div>
                    <div className="flex items-center gap-3 text-gray-400">
                        <Clock className="w-5 h-5 text-red-600 shrink-0" />
                        <p>Mon-Sat: 10am - 8pm</p>
                    </div>
                </div>
                <div>
                    <h4 className="text-lg font-bold mb-6 uppercase tracking-wider">Follow Us</h4>
                    <div className="flex gap-4">
                        <a href="#" className="w-12 h-12 rounded-full border border-gray-800 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 interactive">
                            <Instagram className="w-5 h-5" />
                        </a>
                        <a href="#" className="w-12 h-12 rounded-full border border-gray-800 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 interactive">
                            <Twitter className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>
            <div className="container mt-20 pt-8 border-t border-gray-900 text-center text-gray-600 text-sm">
                &copy; 2024 SHARP Barber Shop. All rights reserved.
            </div>
        </footer>
    );
};

function App() {
    return (
        <div className="bg-black min-h-screen text-white selection:bg-red-600 selection:text-white">
            <Cursor />

            {/* Navigation */}
            <nav className="fixed top-0 left-0 w-full p-8 flex justify-between items-center z-40 mix-blend-difference">
                <div className="text-2xl font-heading font-bold">SHARP.</div>
                <div className="hidden md:flex gap-8 text-sm font-bold tracking-widest uppercase">
                    <a href="#" className="hover:text-red-600 transition-colors interactive">Home</a>
                    <a href="#" className="hover:text-red-600 transition-colors interactive">Services</a>
                    <a href="#" className="hover:text-red-600 transition-colors interactive">About</a>
                    <a href="#" className="hover:text-red-600 transition-colors interactive">Contact</a>
                </div>
            </nav>

            <Hero />
            <Marquee />
            <About />
            <Services />
            <Gallery />
            <BarbersTeam />
            <Testimonials />
            <Contact />
            <Footer />
        </div>
    );
}

export default App;
