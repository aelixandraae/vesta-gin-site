// ============ VESTA — shared behaviour ============
document.addEventListener('DOMContentLoaded', () => {

  // Mobile menu
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeBtn = document.querySelector('.mobile-menu .close-btn');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
    closeBtn && closeBtn.addEventListener('click', () => mobileMenu.classList.remove('open'));
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));
  }

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    q && q.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      item.parentElement.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  // Quantity steppers (cart + product page)
  document.querySelectorAll('.qty-stepper').forEach(stepper => {
    const input = stepper.querySelector('input');
    const minus = stepper.querySelector('.qty-minus');
    const plus = stepper.querySelector('.qty-plus');
    minus && minus.addEventListener('click', () => {
      const v = Math.max(1, parseInt(input.value || '1', 10) - 1);
      input.value = v;
      input.dispatchEvent(new Event('change'));
    });
    plus && plus.addEventListener('click', () => {
      const v = parseInt(input.value || '1', 10) + 1;
      input.value = v;
      input.dispatchEvent(new Event('change'));
    });
  });

  // Size selector (product page)
  document.querySelectorAll('.size-row').forEach(row => {
    row.querySelectorAll('.size-opt').forEach(opt => {
      opt.addEventListener('click', () => {
        row.querySelectorAll('.size-opt').forEach(o => o.classList.remove('active'));
        opt.classList.add('active');
      });
    });
  });

  // Read More toggle (product description)
  document.querySelectorAll('.read-more-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const target = document.querySelector(toggle.dataset.target);
      target.classList.toggle('expanded');
      toggle.textContent = target.classList.contains('expanded') ? 'Read Less' : 'Read More';
    });
  });

  // Cart line total recompute (visual only, no real persistence)
  document.querySelectorAll('.cart-item').forEach(item => {
    const input = item.querySelector('.qty-stepper input');
    const priceEl = item.querySelector('.price');
    if (!input || !priceEl) return;
    const unit = parseFloat(priceEl.dataset.unit);
    input.addEventListener('change', () => {
      const qty = Math.max(1, parseInt(input.value || '1', 10));
      priceEl.textContent = '$' + (unit * qty).toFixed(2);
      recomputeSubtotal();
    });
  });
  function recomputeSubtotal() {
    let total = 0;
    document.querySelectorAll('.cart-item .price').forEach(p => total += parseFloat(p.textContent.replace('$','')) || 0);
    const subtotalEl = document.querySelector('[data-subtotal]');
    if (subtotalEl) subtotalEl.textContent = '$' + total.toFixed(2);
  }

  // Reveal-on-scroll
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  // Newsletter forms — visual only
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const input = form.querySelector('input');
      const btn = form.querySelector('button');
      const original = btn.textContent;
      btn.textContent = 'Subscribed ✓';
      input.value = '';
      setTimeout(() => btn.textContent = original, 2200);
    });
  });

  // Checkout form — visual only, no real payment
  const checkoutForm = document.querySelector('.checkout-form-el');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', e => {
      e.preventDefault();
      alert('This is a visual prototype — no real payment is processed.');
    });
  }
});
