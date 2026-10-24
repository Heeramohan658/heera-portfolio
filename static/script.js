(() => {
    const year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();

    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");
    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");
            menuToggle.setAttribute("aria-expanded", String(isOpen));
        });
        navLinks.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    const roleText = document.getElementById("role-text");
    const roles = ["Software Developer", "Python Developer", "AI/ML Enthusiast", "Web Developer"];
    if (roleText && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        let roleIndex = 0;
        let charIndex = roles[0].length;
        let deleting = true;

        function typeRole() {
            const current = roles[roleIndex];
            if (deleting) {
                charIndex--;
                roleText.textContent = current.slice(0, Math.max(0, charIndex));
                if (charIndex <= 0) {
                    deleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                    setTimeout(typeRole, 350);
                    return;
                }
                setTimeout(typeRole, 45);
            } else {
                const next = roles[roleIndex];
                charIndex++;
                roleText.textContent = next.slice(0, charIndex);
                if (charIndex >= next.length) {
                    deleting = true;
                    setTimeout(typeRole, 1500);
                    return;
                }
                setTimeout(typeRole, 75);
            }
        }
        setTimeout(typeRole, 1800);
    }

    // Three.js animated 3D particle background.
    const canvas = document.getElementById("scene");
    if (!canvas || !window.THREE) return;

    const THREE = window.THREE;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 55;

    let renderer;
    try {
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    } catch (error) {
        console.warn("WebGL is unavailable; the CSS background will remain visible.", error);
        return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const count = window.innerWidth < 700 ? 800 : 1800;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 140;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
        color: 0x58e8ff, size: 0.14, transparent: true, opacity: 0.8, sizeAttenuation: true
    });
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const grid = new THREE.GridHelper(180, 50, 0x235b99, 0x172847);
    grid.position.y = -32;
    grid.position.z = -15;
    grid.material.transparent = true;
    grid.material.opacity = 0.16;
    scene.add(grid);

    let mouseX = 0;
    let mouseY = 0;
    let animationId = null;
    let isVisible = !document.hidden;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.addEventListener("pointermove", (event) => {
        mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    function animate() {
        if (!isVisible) return;
        animationId = requestAnimationFrame(animate);
        if (!reducedMotion) {
            particles.rotation.y += 0.0005;
            particles.rotation.x += 0.00015;
            grid.rotation.y += 0.00008;
        }
        camera.position.x += (mouseX * 3 - camera.position.x) * 0.015;
        camera.position.y += (-mouseY * 2 - camera.position.y) * 0.015;
        camera.lookAt(0, 0, 0);
        renderer.render(scene, camera);
    }

    function resize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener("resize", resize, { passive: true });

    document.addEventListener("visibilitychange", () => {
        isVisible = !document.hidden;
        if (!isVisible && animationId !== null) {
            cancelAnimationFrame(animationId);
            animationId = null;
        } else if (isVisible && animationId === null) {
            animate();
        }
    });

    animate();
})();
