// [1] 스크롤 시 사이드바 메뉴 활성화 (Spy 기능)
const sections = document.querySelectorAll("section");
const navLi = document.querySelectorAll(".nav-menu ul li a");
const scrollContainer = document.querySelector(".main-content-inner");

scrollContainer.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (scrollContainer.scrollTop >= sectionTop - 200) {
            current = section.getAttribute("id");
        }
    });

    navLi.forEach((a) => {
        a.classList.remove("active");
        if (a.getAttribute("href").includes(current)) {
            a.classList.add("active");
        }
    });
});

// Nav 링크 클릭 시 컨테이너 내부에서 해당 섹션으로 스크롤
navLi.forEach((a) => {
    a.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = a.getAttribute("href").replace("#", "");
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// [2] 스크롤 등장 애니메이션 (Intersection Observer)
const revealElements = document.querySelectorAll(
    ".section-title, .about-profile-container, .about-card, .timeline-item, .skill-box, .project-card"
);

revealElements.forEach((el) => {
    el.classList.add("reveal");
});

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
    root: scrollContainer
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

revealElements.forEach(el => {
    revealOnScroll.observe(el);
});
