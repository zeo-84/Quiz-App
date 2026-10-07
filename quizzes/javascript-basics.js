const javascript_basicsData = {
    title: "مفاهیم پایه جاوا اسکریپت",
    questions: [
        {
            question: "کدام کلمه کلیدی برای تعریف متغیر با scope بلوکی استفاده می‌شود؟",
            options: ["var", "let", "function", "define"],
            correct: 1,
            explanation: "let و const هر دو scope بلوکی دارند، اما var scope تابعی دارد."
        },
        {
            question: "تفاوت اصلی بین let و const چیست؟",
            options: [
                "let سریع‌تر است",
                "const قابل تغییر نیست (immutable binding)",
                "let فقط برای اعداد است",
                "تفاوتی ندارند"
            ],
            correct: 1,
            explanation: "با const نمی‌توان مقدار متغیر را reassign کرد، اما با let می‌توان."
        },
        {
            question: "Hoisting در جاوا اسکریپت به چه معناست؟",
            options: [
                "اجرای کد از بالا به پایین",
                "بالا بردن تعاریف متغیر و تابع به بالای scope قبل از اجرا",
                "حذف متغیرهای استفاده نشده",
                "بهینه‌سازی کد توسط موتور JS"
            ],
            correct: 1,
            explanation: "Hoisting فرآیندی است که در آن تعاریف var و function declaration قبل از اجرا به بالای scope منتقل می‌شوند."
        },
        {
            question: "خروجی typeof null چیست؟",
            options: ['"null"', '"undefined"', '"object"', '"number"'],
            correct: 2,
            explanation: "این یک باگ تاریخی در JS است. typeof null مقدار 'object' برمی‌گرداند."
        },
        {
            question: "Closure چیست؟",
            options: [
                "یک نوع حلقه",
                "تابعی که به متغیرهای scope والد خود دسترسی دارد حتی بعد از اتمام اجرای آن",
                "یک متد برای بستن فایل",
                "نوعی ارث‌بری"
            ],
            correct: 1,
            explanation: "Closure زمانی ایجاد می‌شود که یک تابع داخلی به متغیرهای تابع بیرونی دسترسی داشته باشد."
        },
        {
            question: "کدام متد آرایه، یک آرایه جدید بر اساس تابع callback برمی‌گرداند؟",
            options: ["forEach", "map", "filter", "reduce"],
            correct: 1,
            explanation: "map() برای هر عنصر آرایه callback را اجرا کرده و نتایج را در آرایه جدید برمی‌گرداند."
        },
        {
            question: "تفاوت == و === چیست؟",
            options: [
                "تفاوتی ندارند",
                "== فقط مقدار را مقایسه می‌کند، === مقدار و نوع را",
                "=== سریع‌تر است",
                "== برای اشیاء استفاده می‌شود"
            ],
            correct: 1,
            explanation: "== با type coercion مقایسه می‌کند (مثلاً 5 == '5' true است)، اما === بدون تبدیل نوع مقایسه می‌کند."
        },
        {
            question: "Event Loop در جاوا اسکریپت چیست؟",
            options: [
                "یک حلقه for خاص",
                "مکانیزمی برای مدیریت عملیات asynchronous و callback ها",
                "نوعی event listener",
                "حلقه بی‌نهایت"
            ],
            correct: 1,
            explanation: "Event Loop مسئول بررسی Call Stack و Task Queue و اجرای callback ها به ترتیب است."
        },
        {
            question: "کدام یک Promise را برمی‌گرداند؟",
            options: ["setTimeout", "fetch()", "console.log", "Math.random()"],
            correct: 1,
            explanation: "fetch() یک Promise برمی‌گرداند که نشان‌دهنده نتیجه درخواست HTTP است."
        },
        {
            question: "async/await برای چه استفاده می‌شود؟",
            options: [
                "ساخت حلقه‌های asynchronous",
                "نوشتن کد asynchronous به شکل synchronous و خوانا",
                "تعریف کلاس‌های async",
                "بهینه‌سازی کد"
            ],
            correct: 1,
            explanation: "async/await syntactic sugar برای Promise ها است و کد asynchronous را خواناتر می‌کند."
        },
        {
            question: "this در یک arrow function به چه چیزی اشاره می‌کند؟",
            options: [
                "به خود تابع",
                "به window object",
                "به this از scope والد (lexical this)",
                "به undefined"
            ],
            correct: 2,
            explanation: "Arrow function ها this خود را ندارند و از scope والد به ارث می‌برند (lexical scoping)."
        },
        {
            question: "کدام متد برای اضافه کردن عنصر به انتهای آرایه استفاده می‌شود؟",
            options: ["append()", "push()", "add()", "insert()"],
            correct: 1,
            explanation: "push() یک یا چند عنصر به انتهای آرایه اضافه می‌کند و طول جدید را برمی‌گرداند."
        },
        {
            question: "DOM مخفف چیست؟",
            options: [
                "Data Object Model",
                "Document Object Model",
                "Digital Object Management",
                "Direct Object Mapping"
            ],
            correct: 1,
            explanation: "DOM (Document Object Model) نمایش درختی ساختار HTML است که با JS قابل دستکاری است."
        },
        {
            question: "کدام روش برای انتخاب عنصر با ID در DOM استفاده می‌شود؟",
            options: [
                "document.getElement()",
                "document.querySelector('#id')",
                "document.findById()",
                "document.select('#id')"
            ],
            correct: 1,
            explanation: "querySelector با CSS selector کار می‌کند و # برای ID استفاده می‌شود."
        },
        {
            question: "Callback Hell چیست؟",
            options: [
                "یک نوع خطا",
                "تودرتو شدن زیاد callback ها که کد را ناخوانا می‌کند",
                "حلقه بی‌نهایت",
                "مشکل حافظه"
            ],
            correct: 1,
            explanation: "Callback Hell زمانی رخ می‌دهد که چندین callback تو در تو شوند و کد به شکل هرمی درآید."
        },
        {
            question: "کدام کلمه کلیدی برای تعریف کلاس در ES6 استفاده می‌شود؟",
            options: ["object", "struct", "class", "define"],
            correct: 2,
            explanation: "کلمه کلیدی class در ES6 برای تعریف کلاس با syntactic sugar معرفی شد."
        },
        {
            question: "Destructuring assignment چیست؟",
            options: [
                "حذف متغیرها",
                "استخراج مقادیر از آرایه یا object به متغیرهای جداگانه",
                "تخریب object",
                "تبدیل نوع داده"
            ],
            correct: 1,
            explanation: "Destructuring اجازه می‌دهد مقادیر از آرایه یا property از object را به متغیرها استخراج کنیم."
        },
        {
            question: "کدام متد آرایه، عناصری را که شرط callback را پاس می‌کنند فیلتر می‌کند؟",
            options: ["map()", "find()", "filter()", "reduce()"],
            correct: 2,
            explanation: "filter() آرایه جدیدی از عناصری که شرط callback را true برمی‌گردانند می‌سازد."
        },
        {
            question: "Spread operator (...) چه کاربردی دارد؟",
            options: [
                "فقط برای آرایه",
                "گسترش عناصر آرایه یا object در مکان دیگر",
                "تعریف پارامترهای اختیاری",
                "کپی عمیق object"
            ],
            correct: 1,
            explanation: "Spread operator عناصر iterable را گسترش می‌دهد، مثلاً [...arr1, ...arr2] برای ادغام آرایه‌ها."
        },
        {
            question: "Temporal Dead Zone (TDZ) به چه معناست؟",
            options: [
                "منطقه‌ای در کد که متغیرهای let/const قبل از declaration قابل دسترسی نیستند",
                "یک نوع timeout",
                "منطقه حافظه آزاد",
                "حالت خاص در async"
            ],
            correct: 0,
            explanation: "TDZ فاصله بین ورود به scope و declaration متغیر let/const است که در آن دسترسی ReferenceError می‌دهد."
        }
    ]
};
