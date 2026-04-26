// Loader
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.getElementById('loader').classList.add('hidden');
            }, 1500);
        });

        // Navbar scroll
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Mobile menu
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navLinks = document.getElementById('navLinks');
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    navLinks.classList.remove('active');
                }
            });
        });

        // Counter animation
        const counters = document.querySelectorAll('.stat-number');
        const animateCounter = (el) => {
            const target = parseInt(el.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    el.textContent = target + '+';
                    clearInterval(timer);
                } else {
                    el.textContent = Math.floor(current) + '+';
                }
            }, 16);
        };

        // Intersection Observer
        const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    if (entry.target.classList.contains('hero-stats')) {
                        counters.forEach(counter => animateCounter(counter));
                    }
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
        observer.observe(document.querySelector('.hero-stats'));

        // Form submission
        document.getElementById('contactForm').addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Terima kasih! Pesan Anda telah terkirim. Kami akan segera menghubungi Anda.');
            e.target.reset();
        });

        // Donation Modal
        const donationData = {
            yayasan: { title: 'Donasi Yayasan Al Ijma', rekening: '417901030971539', atasNama: 'Yayasan Islam Bani Salim samarang', bank: 'Bank BRI' },
            mi: { title: 'Donasi Madrasah Diniah Takmiliah Al-Ijma', rekening: '417901049981539', atasNama: 'MDTA AL IJMA', bank: 'Bank BRI' },
            ponpes: { title: 'Donasi Pondok Pesantren Al Ijma', rekening: '0117879011100', atasNama: 'Ponpes Al Ijma', bank: 'Bank BJB' }
        };

        let currentDonationType = '';

        function openDonationModal(type) {
            currentDonationType = type;
            const data = donationData[type];
            document.getElementById('modalTitle').textContent = data.title;
            document.getElementById('modalBank').textContent = data.bank;
            document.getElementById('modalAtasNama').textContent = data.atasNama;
            document.getElementById('donationModal').classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeDonationModal() {
            document.getElementById('donationModal').classList.remove('active');
            document.body.style.overflow = '';
        }

        function copyToClipboard(elementId) {
            const data = donationData[currentDonationType];
            const rekening = data.rekening;
            navigator.clipboard.writeText(rekening).then(() => {
                alert('✅ Nomor rekening berhasil disalin!\n\n🏦 ' + data.bank + '\n💳 ' + rekening + '\n👤 A/n: ' + data.atasNama);
            });
        }

        // Close modal on overlay click
        document.getElementById('donationModal').addEventListener('click', (e) => {
            if (e.target === document.getElementById('donationModal')) {
                closeDonationModal();
            }
        });