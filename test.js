(() => {
  // 1) شريط عاجل يُضاف تلقائياً أعلى الصفحة
  const breaking = [
    "عاجل: تحديثات جديدة في الأخبار خلال اليوم",
    "عاجل: تنبيه طقس — ارتفاع درجات الحرارة",
    "عاجل: حركة الأسواق تستقر بعد تذبذب",
    "عاجل: إطلاق مبادرة تقنية لطلاب الحاسوب",
  ];

  function createTicker() {
    const ticker = document.createElement("div");
    ticker.className = "ticker";
    ticker.innerHTML = `
      <div class="ticker__label">عاجل</div>
      <div class="ticker__track">
        <div class="ticker__items" id="tickerItems"></div>
      </div>
      <div class="ticker__meta"><span id="clock">--:--</span></div>
    `;

    document.body.insertBefore(ticker, document.body.firstChild);

    const items = ticker.querySelector("#tickerItems");
    [...breaking, ...breaking].forEach((t) => {
      const s = document.createElement("span");
      s.className = "ticker__item";
      s.textContent = t;
      items.appendChild(s);
    });

    // ساعة
    const clock = ticker.querySelector("#clock");
    const tick = () => {
      const d = new Date();
      const hh = String(d.getHours()).padStart(2, "0");
      const mm = String(d.getMinutes()).padStart(2, "0");
      clock.textContent = `${hh}:${mm}`;
    };
    tick();
    setInterval(tick, 1000);
  }

  // 2) “ديناميكية” لعناوين القائمة: تبديل/إضافة خبر كل فترة
  function makeListDynamic() {
    const ul = document.querySelector("ul");
    if (!ul) return;

    const pool = [
      "اقتصاد: تحسن طفيف في حركة السوق",
      "تقنية: نصائح أمن معلومات للمستخدمين",
      "رياضة: عودة الدوري المحلي قريباً",
      "تعليم: إطلاق منصة تعليمية جديدة",
      "طقس: أجواء حارة خلال الأيام القادمة",
      "صحة: نصائح لتجنب الإجهاد الحراري",
    ];

    // كل 6 ثواني: نبدل أول عنصر ونضيف عنصر جديد أحياناً
    setInterval(() => {
      const first = ul.querySelector("li");
      if (first) {
        first.innerHTML = `<strong>${pool[Math.floor(Math.random() * pool.length)]}</strong>`;
      }

      // احتمال إضافة خبر جديد
      if (Math.random() > 0.55) {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${pool[Math.floor(Math.random() * pool.length)]}</strong>`;
        ul.insertBefore(li, ul.firstChild);

        // حد أقصى 8 أخبار
        while (ul.children.length > 8) ul.removeChild(ul.lastElementChild);
      }
    }, 6000);
  }

  // 3) تحديث تجريبي للجدول (لو موجود)
  function makeTableDynamic() {
    const table = document.querySelector("table");
    if (!table) return;

    // لو جدولك عنده header: "العملة / السعر..." — سنحاول تحديث الصفوف
    const tbody = table.querySelector("tbody");
    if (!tbody) return;

    const fmtTime = () => {
      const d = new Date();
      return d.toLocaleString("ar", { hour: "2-digit", minute: "2-digit" });
    };

    function updateRates() {
      const euro = (1.05 + Math.random() * 0.1).toFixed(2);
      const gbp  = (1.20 + Math.random() * 0.12).toFixed(2);
      const aed  = (0.26 + Math.random() * 0.03).toFixed(2);
      const t = fmtTime();

      // نحافظ على نفس عدد الصفوف إن كان موجوداً
      const rows = tbody.querySelectorAll("tr");
      if (rows.length >= 3) {
        rows[0].children[1].textContent = euro;
        rows[0].children[2] && (rows[0].children[2].textContent = t);

        rows[1].children[1].textContent = gbp;
        rows[1].children[2] && (rows[1].children[2].textContent = t);

        rows[2].children[1].textContent = aed;
        rows[2].children[2] && (rows[2].children[2].textContent = t);
      }
    }

    updateRates();
    setInterval(updateRates, 12000);
  }

  // تشغيل
  document.addEventListener("DOMContentLoaded", () => {
    createTicker();
    makeListDynamic();
    makeTableDynamic();
  });
})();
