// ===== ЧисткаPlus (демо Пилота 2) — интерактив =====

(function() {
  'use strict';

  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => nav.classList.remove('open'));
    });
  }

  document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    }
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
  } else {
    document.querySelectorAll('.fade-up').forEach(el => el.classList.add('visible'));
  }

  const header = document.getElementById('header');
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 30) {
        header.style.background = 'rgba(245, 249, 252, 0.97)';
        header.style.boxShadow = '0 1px 0 rgba(216, 229, 242, 0.7)';
      } else {
        header.style.background = 'rgba(245, 249, 252, 0.92)';
        header.style.boxShadow = 'none';
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ВАЖНО: в продакшене токен бота НЕ хранится на клиенте.
  // Демо-форма: эмулирует успех без реальной отправки.
  const FORM_ENDPOINT = '';

  const form = document.getElementById('contactForm');
  if (form) {
    const status = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      submitBtn.disabled = true;
      submitBtn.textContent = 'Отправляем…';
      status.className = 'form-status';
      status.textContent = '';

      const data = Object.fromEntries(new FormData(form).entries());

      try {
        if (FORM_ENDPOINT) {
          const response = await fetch(FORM_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });
          if (!response.ok) throw new Error('Server error');
        } else {
          await new Promise(r => setTimeout(r, 800));
        }

        status.classList.add('success');
        status.textContent = 'Заявка получена. Перезвоним в течение 30 минут (с 9:00 до 21:00).';
        form.reset();
      } catch (err) {
        status.classList.add('error');
        status.textContent = 'Что-то пошло не так. Напишите в Telegram: @chistka_plus_spb';
      } finally {
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Заказать вывоз';
        }, 1500);
      }
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = 70;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

})();
