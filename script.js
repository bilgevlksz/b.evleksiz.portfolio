// 1. Mouse Takip Eden Parıltı Efekti (Blob)
const blob = document.createElement('div');
blob.style.cssText = `
    height: 300px; aspect-ratio: 1; position: fixed;
    left: 50%; top: 50%; translate: -50% -50%;
    border-radius: 50%; background: linear-gradient(to right, #6366f1, #a855f7);
    filter: blur(120px); opacity: 0.1; z-index: -1; pointer-events: none;
`;
document.body.appendChild(blob);

window.onpointermove = event => { 
    const { clientX, clientY } = event;
    blob.animate({
        left: `${clientX}px`,
        top: `${clientY}px`
    }, { duration: 3000, fill: "forwards" });
}

// 2. Typewriter (Yazı Yazma) Efekti
const phrases = ["Yapay Zeka Mühendisi Adayı", "Veri Bilimi Meraklısı", "Python Geliştirici", "Problem Çözücü"];
let i = 0, j = 0, currentPhrase = [], isDeleting = false;

function typeLoop() {
    const typewriterElement = document.getElementById('typewriter');
    // Eğer HTML'de 'typewriter' id'sine sahip element yoksa hata vermemesi için kontrol:
    if (!typewriterElement) return;

    if (i === phrases.length) i = 0;
    
    if (!isDeleting && j <= phrases[i].length) {
        currentPhrase.push(phrases[i][j]);
        j++;
    } else if (isDeleting && j >= 0) {
        currentPhrase.pop();
        j--;
    }

    typewriterElement.innerHTML = currentPhrase.join('');

    if (j === phrases[i].length) {
        isDeleting = true;
        setTimeout(typeLoop, 2000); 
    } else if (isDeleting && j === 0) {
        isDeleting = false;
        i++;
        setTimeout(typeLoop, 500);
    } else {
        setTimeout(typeLoop, isDeleting ? 50 : 100);
    }
}
// Sayfa yüklendiğinde başlat
document.addEventListener('DOMContentLoaded', typeLoop);

// 3. 3D Tilt (Eğim) Efekti - Kartlar İçin
// (Burada çift olan kodu teke indirdim ve performansı artırdım)
document.querySelectorAll('.glass').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 15; // 10 yerine 15 yaparak daha yumuşak bir eğim sağladım
        const rotateY = (centerX - x) / 15;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
    });
});

// 4. Scroll Reveal (Aşağı Kaydırdıkça Görünme)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section, .glass').forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.8s ease-out";
    observer.observe(el);
});

console.log("%c Merhaba! Bilge'nin koduna hoş geldin. 🚀", "color: #818cf8; font-size: 20px; font-weight: bold;");