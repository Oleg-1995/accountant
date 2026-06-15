const burger = document.querySelector('.burger');
const menu = document.querySelector('.menu');
const headerElements = document.querySelector('.header__elements');

burger.addEventListener('click', () => {
  burger.classList.toggle('active');

  menu.classList.toggle('active');
  headerElements.classList.toggle('active');

  document.body.classList.toggle('lock');
});


// ======================
// SERVICES DATA
// ======================

const servicesData = {
  accounting: {
    title: 'Бухгалтерський облік',
    items: [
      'Ведення бухгалтерського та податкового обліку',
      'Контроль первинної документації',
      'Формування звітності',
      'Облік доходів та витрат',
      'Робота з банківськими виписками',
      'Консультації щодо ведення діяльності'
    ]
  },

  tax: {
    title: 'Податковий супровід',
    items: [
      'Подача податкової звітності',
      'Контроль термінів сплати податків',
      'Консультації щодо оподаткування',
      'Робота з електронним кабінетом',
      'Допомога при зміні системи оподаткування',
      'Аналіз податкового навантаження'
    ]
  },

  fop: {
    title: 'Супровід ФОП',
    items: [
      'Реєстрація та закриття ФОП',
      'Вибір оптимальної групи оподаткування',
      'Подача квартальної та річної звітності',
      'Контроль сплати ЄСВ та податків',
      'Консультації для підприємців',
      'Ведення документації ФОП'
    ]
  },

  salary: {
    title: 'Заробітна плата та кадри',
    items: [
      'Розрахунок заробітної плати',
      'Ведення кадрової документації',
      'Оформлення працівників',
      'Подача звітності по персоналу',
      'Лікарняні та відпустки',
      'Контроль кадрових процесів'
    ]
  },

  consulting: {
    title: 'Консультації для бізнесу',
    items: [
      'Консультації з бухгалтерського обліку',
      'Пояснення податкових змін',
      'Допомога у вирішенні спірних питань',
      'Аналіз фінансових процесів',
      'Рекомендації щодо оптимізації витрат',
      'Підтримка підприємців та компаній'
    ]
  },

  registration: {
    title: 'Реєстрація бізнесу',
    items: [
      'Реєстрація ФОП та ТОВ',
      'Вибір КВЕД та системи оподаткування',
      'Підготовка необхідних документів',
      'Консультації перед відкриттям бізнесу',
      'Допомога з електронними ключами',
      'Супровід на старті діяльності'
    ]
  }
};


// ======================
// UNIVERSAL MODAL FACTORY
// ======================

function createModal({ modal, overlay, openButtons, closeButton }) {
  if (!modal || !overlay) return null;

  function open() {
    modal.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    modal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (openButtons?.length) {
    openButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        open();
      });
    });
  }

  if (closeButton) {
    closeButton.addEventListener('click', close);
  }

  overlay.addEventListener('click', close);
  return { open, close };
}


// ======================
// SERVICES MODAL
// ======================

const servicesModal = document.querySelector('.services-modal');
const servicesOverlay = document.querySelector('.modal-overlay');
const servicesButtons = document.querySelectorAll('.services__link');

const servicesTitle = document.querySelector('.services-modal__title');
const servicesList = document.querySelector('.services-modal__list');
const servicesClose = document.querySelector('.services-modal__close');

function openServices(serviceKey) {
  const data = servicesData[serviceKey];
  if (!data) return;

  if (servicesTitle) servicesTitle.textContent = data.title;

  if (servicesList) {
    servicesList.innerHTML = data.items
      .map(item => `<li>${item}</li>`)
      .join('');
  }
}

const services = createModal({
  modal: servicesModal,
  overlay: servicesOverlay,
  openButtons: servicesButtons,
  closeButton: servicesClose
});

if (servicesButtons.length) {
  servicesButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      openServices(btn.dataset.service);
      services?.open();
    });
  });
}


// ======================
// CONTACT MODAL
// ======================

const contactModal = document.querySelector('.contact-modal');
const contactOverlay = document.querySelector('.contact-modal-overlay');
const openContactBtn = document.querySelector('#open-contact-modal');
const closeContactBtn = document.querySelector('.contact-modal__close');

const contact = createModal({
  modal: contactModal,
  overlay: contactOverlay,
  openButtons: openContactBtn ? [openContactBtn] : [],
  closeButton: closeContactBtn
});


// ======================
// FORMS
// ======================

const mainForm = document.querySelector('#contact-form');

if (mainForm) {
  mainForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(mainForm);

    const res = await fetch('/send.php', {
      method: 'POST',
      body: formData
    });

    if (res.ok) {
      mainForm.reset();
      openSuccessModal();
    }
  });
}

const modalForm = document.querySelector('#contact-modal-form');

if (modalForm) {
  modalForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(modalForm);
    const res = await fetch('/send.php', {
      method: 'POST',
      body: formData
    });

    if (res.ok) {
      modalForm.reset();
      contact?.close();
      openSuccessModal();
    }
  });
}


// ======================
// FAQ
// ======================

const faqItems = document.querySelectorAll('.faq__item');

if (faqItems.length) {
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq__top');

    if (!btn) return;

    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(el => el.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}


// ======================
// ESC CLOSE ALL MODALS
// ======================

document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;

  document.querySelectorAll('.active').forEach(el => {
    el.classList.remove('active');
  });

  document.body.style.overflow = '';
});