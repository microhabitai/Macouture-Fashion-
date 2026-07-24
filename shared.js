// SHARED across all pages — Firebase config, utility functions, nav behavior.
// Loaded via <script src="shared.js"></script> after the Firebase SDK scripts.

const FIREBASE_CONFIG = { apiKey:"AIzaSyBHj1O7hvCmS3DYbl54Q7B3rFVbyfukQlA", authDomain:"macouture-fashion.firebaseapp.com", projectId:"macouture-fashion", storageBucket:"macouture-fashion.firebasestorage.app", messagingSenderId:"502937686499", appId:"1:502937686499:web:916df3a3facc66384850d6" };
const PAYSTACK_KEY         = "pk_live_eabdf7677ea950606a8131867f93a3ad3fae5e4d";
const VERIFY_WORKER_URL    = "https://macouturefashion.fancytreaz.workers.dev";
const CLOUDINARY_CLOUD_NAME  = "dumatsfyt";
const CLOUDINARY_UPLOAD_PRESET = "macouture_uploads";
const WHATSAPP_NUMBER = "2349126880592";

let auth, db;
try {
  firebase.initializeApp(FIREBASE_CONFIG);
  auth = firebase.auth();
  db   = firebase.firestore();
} catch(e) {
  console.error('Firebase init error:', e);
}

function formatNGN(a) { return '₦'+Number(a).toLocaleString('en-NG'); }
function escHtml(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function toast(msg,type='success') {
  const t=document.getElementById('toast');
  if (!t) return;
  t.textContent=msg; t.className=`show ${type}`;
  clearTimeout(t._timer); t._timer=setTimeout(()=>t.className='',3200);
}

// Item card now links to a real URL (item.html?id=...) instead of a JS-only onclick,
// so opening an item and reloading always works.
function itemCardHTML(item) {
  return `<a class="item-card" href="item.html?id=${item.id}">
    <div class="item-card-img"><img src="${item.mainPhoto}" alt="${escHtml(item.name)}" loading="lazy"><div class="item-card-overlay"><span>View Item</span></div></div>
    <p class="item-card-name">${escHtml(item.name)}</p><p class="item-card-price">${formatNGN(item.price)}</p>
  </a>`;
}

function comingSoonHTML() {
  return `<div class="coming-soon-box">
    <div class="cs-label">Macouture Fashion House</div>
    <h3>New Collection <em>Coming Soon</em></h3>
    <p>Our ready-to-wear pieces are being carefully curated. Check back soon or reach out on WhatsApp to enquire about availability.</p>
    <a class="whatsapp-btn" href="https://wa.me/${WHATSAPP_NUMBER}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:.6rem">
      <svg width="17" height="17" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      Enquire on WhatsApp
    </a>
  </div>`;
}

function openMobileNav() { document.getElementById('mobile-nav').classList.add('open'); }
function closeMobileNav() { document.getElementById('mobile-nav').classList.remove('open'); }

try {
  const wlink = document.getElementById('whatsapp-link');
  if (wlink) wlink.href = 'https://wa.me/' + WHATSAPP_NUMBER;
} catch(e) {}
