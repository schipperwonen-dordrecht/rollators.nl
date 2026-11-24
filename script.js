/**
 * Rollators.nl - Interactive Scripts
 * Senior-friendly, lightweight & accessible vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // Product data voor de interactieve modal
  const productData = {
    'athlon': {
      title: 'RehaSense Athlon SL Carbon',
      brand: 'RehaSense',
      badge: 'Ultra Lichtgewicht',
      tagClass: 'product-tag-carbon',
      image: 'images/athlon-carbon.png',
      specs: {
        'Gewicht': 'Slechts 5,2 kg',
        'Max. gebruikersgewicht': '150 kg',
        'Zithoogte': 'Verkrijgbaar in 55 cm en 62 cm',
        'Materiaal': 'High-tech Carbon fiber',
        'Inklapbaar': 'Eenvoudig met één hand kruislings inklapbaar'
      },
      description: 'De RehaSense Athlon SL Carbon is het absolute topmodel onder de lichtgewicht rollators. Gemaakt van ultrasterk koolstofvezel (carbon), waardoor hij extreem licht is om op te tillen in de auto of trein, maar toch rotsvast en stabiel aanvoelt. Standaard uitgerust met een comfortabel zitje, boodschappentas en een handige stokhouder.'
    },
    'server': {
      title: 'RehaSense Server Allround',
      brand: 'RehaSense',
      badge: 'Meest Populair',
      tagClass: 'product-tag-classic',
      image: 'images/server-zwart.png',
      specs: {
        'Gewicht': '6,7 kg',
        'Max. gebruikersgewicht': '150 kg',
        'Wielen': 'Zachte TPE comfortwielen',
        'Materiaal': 'Lichtgewicht aluminium frame',
        'Accessoires': 'Inclusief tas en stokhouder'
      },
      description: 'De RehaSense Server is de bekroonde allround rollator die overal uitblinkt. Zijn strakke design, zachte comfortbanden die trillingen dempen en de lichte bediening van de remmen maken dit de ideale partner voor zowel binnen- als buitengebruik. Eenvoudig op te vouwen en blijft zelfstandig op de wielen staan.'
    },
    'explorer': {
      title: 'RehaSense Explorer All-Terrain',
      brand: 'RehaSense',
      badge: 'Buiten & All-Terrain',
      tagClass: 'product-tag-outdoor',
      image: 'images/explorer-allterrain.jpg',
      specs: {
        'Gewicht': '9,0 kg',
        'Max. gebruikersgewicht': '200 kg (extra sterk)',
        'Wielen': 'Extra grote zachte PU-luchtbanden',
        'Geschikt voor': 'Kasseien, bospaden, grind en gras',
        'Vering': 'Geïntegreerde schokabsorptie'
      },
      description: 'Wandelt u graag in de natuur, over bospaden of woont u in een gebied met oude klinkerstraten? De RehaSense Explorer is voorzien van extra grote, zachte wielen die moeiteloos oneffenheden opvangen. Dit ontlast uw polsen, ellebogen en schouders aanzienlijk. Zeer robuust en belastbaar tot maar liefst 200 kg.'
    },
    'server-hd': {
      title: 'RehaSense Server HD (Heavy Duty)',
      brand: 'RehaSense',
      badge: 'Extra Belastbaar',
      tagClass: 'product-tag-medical',
      image: 'images/server-hd.png',
      specs: {
        'Gewicht': '7,6 kg',
        'Max. gebruikersgewicht': 'Tot 200 kg',
        'Zitbreedte': 'Extra breed (55 cm zitruimte)',
        'Frame': 'Versterkt dubbel kruisframe',
        'Remmen': 'Versterkt remsysteem met parkeerstand'
      },
      description: 'Speciaal ontworpen voor gebruikers die behoefte hebben aan extra draagkracht en een royale, comfortabele zitbreedte. De Server HD combineert de wendbaarheid van de gewone Server met een versterkt aluminium frame en een breed zitvlak.'
    },
    'navigator': {
      title: 'RehaSense Navigator Onderarmschaal',
      brand: 'RehaSense',
      badge: 'Onderarmschaal',
      tagClass: 'product-tag-medical',
      image: 'images/navigator-onderarmschaal.png',
      specs: {
        'Gewicht': '9,9 kg',
        'Ondersteuning': 'Zacht gevoerde onderarmschalen',
        'Instelbaar': 'Diepte, hoek en hoogte verstelbaar',
        'Doelgroep': 'Reuma, artrose, pols- of handklachten',
        'Max. belasting': '150 kg'
      },
      description: 'Als het vasthouden van traditionele handvatten pijnlijk of niet meer mogelijk is door reuma of artrose, biedt de Navigator uitkomst. Uw onderarmen rusten comfortabel in zachte schalen, waardoor uw hele bovenlichaam optimaal en pijnvrij wordt ondersteund tijdens het lopen.'
    },
    'premis-provo': {
      title: 'Premis Provo Klassiek',
      brand: 'Premis Medical',
      badge: 'Degelijk & Betrouwbaar',
      tagClass: 'product-tag-classic',
      image: 'images/premis-provo.png',
      specs: {
        'Gewicht': '10,5 kg',
        'Max. gebruikersgewicht': '130 kg',
        'Inclusief': 'Dienblad, metalen mandje en stokhouder',
        'Materiaal': 'Gepoedercoat staal',
        'Kleur': 'Klassiek blauw metallic'
      },
      description: 'De vertrouwde Nederlandse klassieker van Premis Medical. Een oerdegelijke stalen constructie die al tientallen jaren bekend staat om zijn onverwoestbare betrouwbaarheid en hoge stabiliteit. Ideaal voor wie houdt van een stevige rollator die niet snel uit balans raakt.'
    }
  };

  // Filter functionaliteit
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');

      productCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterCategory === 'all' || cardCategory === filterCategory) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Modal Pop-up functionaliteit
  const modalBackdrop = document.getElementById('productModal');
  const modalBody = document.getElementById('modalContent');
  const modalClose = document.getElementById('modalClose');

  function openModal(productId) {
    const item = productData[productId];
    if (!item) return;

    let specsHtml = '';
    for (const [key, val] of Object.entries(item.specs)) {
      specsHtml += `
        <div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid #f1f5f9; font-size:16px;">
          <strong style="color:#475569;">${key}:</strong>
          <span style="color:#0f172a; font-weight:700;">${val}</span>
        </div>
      `;
    }

    modalBody.innerHTML = `
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:28px; align-items:center;">
        <div style="background:#f8fafc; border-radius:12px; padding:20px; text-align:center;">
          <img src="${item.image}" alt="${item.title}" style="max-height:260px; margin:0 auto; object-fit:contain;">
        </div>
        <div>
          <span class="product-tag ${item.tagClass}" style="position:static; display:inline-block; margin-bottom:10px;">${item.badge}</span>
          <p style="font-size:14px; text-transform:uppercase; font-weight:700; color:#0d9488; margin-bottom:4px;">${item.brand}</p>
          <h2 style="font-size:26px; font-weight:800; color:#0f172a; line-height:1.2; margin-bottom:14px;">${item.title}</h2>
          <p style="font-size:16px; color:#334155; margin-bottom:18px; line-height:1.5;">${item.description}</p>
        </div>
      </div>
      <div style="margin-top:24px; background:#f8fafc; border-radius:12px; padding:20px;">
        <h3 style="font-size:18px; font-weight:800; color:#0f172a; margin-bottom:12px;">Specificaties:</h3>
        ${specsHtml}
      </div>
      <div style="margin-top:28px; display:flex; flex-wrap:wrap; gap:14px; justify-content:flex-end;">
        <a href="#contact" class="btn btn-primary" onclick="selectModelInForm('${item.title}'); closeModal();">
          Vrijblijvend proefrijden inplannen
        </a>
        <a href="tel:0786172670" class="btn btn-call">
          📞 Direct bellen voor advies
        </a>
      </div>
    `;

    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  window.closeModal = function() {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });

  // Koppel knoppen aan modal
  document.querySelectorAll('[data-product-id]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-product-id');
      openModal(id);
    });
  });

  // Formulier actie
  window.selectModelInForm = function(modelName) {
    const modelSelect = document.getElementById('formModel');
    if (modelSelect) {
      modelSelect.value = modelName;
    }
    const messageInput = document.getElementById('formMessage');
    if (messageInput && !messageInput.value) {
      messageInput.value = `Graag ontvang ik meer informatie over en de mogelijkheid tot proefrijden met de ${modelName}.`;
    }
  };

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('formName').value;
      const responseArea = document.getElementById('formResponse');
      
      responseArea.style.display = 'block';
      responseArea.innerHTML = `
        <div style="background:#ecfdf5; border:2px solid #059669; border-radius:12px; padding:20px; color:#065f46; margin-top:20px;">
          <h4 style="font-size:20px; font-weight:800; margin-bottom:6px;">✓ Hartelijk dank voor uw aanvraag, ${name}!</h4>
          <p style="font-size:16px;">Wij hebben uw bericht goed ontvangen. Onze specialist neemt binnen 1 werkdag telefonisch contact met u op voor advies of om uw afspraak in te plannen.</p>
        </div>
      `;
      contactForm.reset();
    });
  }
});
