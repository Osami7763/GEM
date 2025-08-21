// الحصول على عناصر HTML الرئيسية من الصفحة باستخدام معرفاتها (IDs)
const stagesContainer = document.getElementById("stages-container"); // حاوية المراحل
const quizContainer = document.getElementById("quiz-container");     // حاوية الاختبار (الأسئلة)
const resultContainer = document.getElementById("result-container"); // حاوية النتائج
const quizTitle = document.getElementById("quiz-title");             // عنوان الاختبار (اسم المرحلة)
const questionText = document.getElementById("question-text");       // نص السؤال
const optionsContainer = document.getElementById("options-container"); // حاوية خيارات الإجابة
const nextButton = document.getElementById("next-button");           // زر التالي (مخفي حاليًا)
const backButton = document.getElementById("back-button");           // زر العودة
const continueButton = document.getElementById("continue-button");   // زر المتابعة في شاشة النتائج
const questionCounter = document.getElementById("question-counter"); // عداد الأسئلة
const feedbackContainer = document.getElementById("feedback-container"); // حاوية التغذية الراجعة (صحيح/خطأ)
const resultIcon = document.getElementById("result-icon");           // أيقونة النتيجة
const resultTitle = document.getElementById("result-title");         // عنوان النتيجة
const resultScore = document.getElementById("result-score");         // نقاط النتيجة
const resultMessage = document.getElementById("result-message");     // رسالة النتيجة

// تعريف المتغيرات الأساسية لحالة اللعبة
let currentStage = 1;         // المرحلة الحالية التي يلعبها المستخدم (تبدأ من 1)
let currentQuestionIndex = 0; // فهرس السؤال الحالي داخل المرحلة (يبدأ من 0)
let correctAnswersCount = 0;  // عدد الإجابات الصحيحة في المرحلة الحالية
let totalQuestions = 5;       // العدد الإجمالي للأسئلة في كل مرحلة

// تعريف كائن يحتوي على أسئلة كل مرحلة
const questions = {
    // أسئلة المرحلة الأولى (سهل)
    1: [
        { question: "ما هو الاسم الكيميائي للمركب المعروف باسم 'ملح الطعام'؟", options: ["كلوريد البوتاسيوم", "كربونات الصوديوم", "كلوريد الصوديوم", "كبريتات المغنيسيوم"], answer: "كلوريد الصوديوم" },
        { question: "من هو أول رائد فضاء عربي؟", options: ["محمد فارس", "سلطان بن سلمان آل سعود", "هزاع المنصوري", "أحمد الهاشمي"], answer: "سلطان بن سلمان آل سعود" },
        { question: "ما هي المدينة التي يطلق عليها اسم 'مدينة الضباب'؟", options: ["باريس", "لندن", "روما", "طوكيو"], answer: "لندن" },
        { question: "ما هو الحيوان الذي لا يستطيع القفز؟", options: ["الفيل", "الكنغر", "الأرنب", "الضفدع"], answer: "الفيل" },
        { question: "ما هو أطول نهر في العالم؟", options: ["نهر النيل", "نهر الأمازون", "نهر اليانغتسي", "نهر المسيسيبي"], answer: "نهر النيل" }
    ],
    // أسئلة المرحلة الثانية (متوسط)
    2: [
        { question: "ما هي النظرية التي تفسر تمدد الكون؟", options: ["نظرية الانفجار العظيم", "نظرية التطور", "نظرية النسبية", "نظرية الأوتار"], answer: "نظرية الانفجار العظيم" },
        { question: "من هو الفيلسوف اليوناني الذي يعتبر أبا الطب؟", options: ["أفلاطون", "أرسطو", "أبقراط", "سقراط"], answer: "أبقراط" },
        { question: "ما هو اسم العملية التي يتم فيها تحويل الغاز إلى سائل؟", options: ["التبخر", "التكثف", "الانصهار", "التسامي"], answer: "التكثف" },
        { question: "ما هي الدولة التي يمر بها خط الاستواء وخط غرينتش معًا؟", options: ["البرازيل", "إندونيسيا", "الإكوادور", "ساو تومي وبرينسيبي"], answer: "ساو تومي وبرينسيبي" },
        { question: "ما هو اسم أصغر كوكب في المجموعة الشمسية؟", options: ["المريخ", "الزهرة", "عطارد", "بلوتو"], answer: "عطارد" }
    ],
    // أسئلة المرحلة الثالثة (متقدم)
    3: [
        { question: "ما هو اسم أول امرأة تحصل على جائزة نوبل؟", options: ["ماري كوري", "روزا باركس", "هيلين كيلر", "الأم تيريزا"], answer: "ماري كوري" },
        { question: "ما هو اسم الغاز الذي يشكل معظم الغلاف الجوي للأرض؟", options: ["الأكسجين", "ثاني أكسيد الكربون", "النيتروجين", "الأرجون"], answer: "النيتروجين" },
        { question: "ما هو اسم أقدم جامعة في العالم؟", options: ["جامعة الأزهر", "جامعة بولونيا", "جامعة القرويين", "جامعة أكسفورد"], answer: "جامعة القرويين" },
        { question: "ما هو اسم العملية التي يتم فيها تحويل السائل إلى غاز؟", options: ["التكثف", "التبخر", "الانصهار", "التجمد"], answer: "التبخر" },
        { question: "ما هو اسم المضيق الذي يفصل بين قارتي آسيا وأفريقيا؟", options: ["مضيق جبل طارق", "مضيق باب المندب", "مضيق هرمز", "مضيق بيرينغ"], answer: "مضيق باب المندب" }
    ],
    // أسئلة المرحلة الرابعة (صعب)
    4: [
        { question: "ما هو اسم العالم الذي اكتشف قانون الجاذبية؟", options: ["ألبرت أينشتاين", "إسحاق نيوتن", "جاليليو جاليلي", "نيكولا تسلا"], answer: "إسحاق نيوتن" },
        { question: "ما هو اسم العملية التي يتم فيها تحويل الطاقة الضوئية إلى طاقة كيميائية في النباتات؟", options: ["التنفس الخلوي", "التمثيل الضوئي", "التخمر", "التحلل"], answer: "التمثيل الضوئي" },
        { question: "ما هو اسم أعمق نقطة في المحيطات؟", options: ["خندق بورتوريكو", "خندق ماريانا", "خندق سوندا", "خندق بيرينغ"], answer: "خندق ماريانا" },
        { question: "ما هو اسم أصغر دولة في العالم من حيث المساحة؟", options: ["موناكو", "الفاتيكان", "ناورو", "سان مارينو"], answer: "الفاتيكان" },
        { question: "ما هو اسم العملية التي يتم فيها انقسام الخلية إلى خليتين متطابقتين؟", options: ["الانقسام الاختزالي", "الانقسام المتساوي", "التبرعم", "التجزؤ"], answer: "الانقسام المتساوي" }
    ]
};

// تعريف أسماء المراحل
const stageNames = {
    1: "المرحلة الأولى - مستوى سهل",
    2: "المرحلة الثانية - مستوى متوسط", 
    3: "المرحلة الثالثة - مستوى متقدم",
    4: "المرحلة الرابعة - مستوى صعب"
};

// دالة لبدء مرحلة معينة
function startStage(stageNum) {
    currentStage = stageNum;         // تحديث المرحلة الحالية
    currentQuestionIndex = 0;      // إعادة تعيين فهرس السؤال
    correctAnswersCount = 0;       // إعادة تعيين عدد الإجابات الصحيحة
    
    stagesContainer.style.display = 'none'; // إخفاء حاوية المراحل
    quizContainer.style.display = 'block';  // إظهار حاوية الاختبار
    resultContainer.style.display = 'none'; // إخفاء حاوية النتائج
    
    quizTitle.textContent = stageNames[stageNum]; // تحديث عنوان الاختبار باسم المرحلة
    
    loadQuestion(); // تحميل السؤال الأول للمرحلة
}

// دالة لتحميل السؤال الحالي
function loadQuestion() {
    const stageQuestions = questions[currentStage]; // الحصول على أسئلة المرحلة الحالية
    
    // التحقق مما إذا كانت هناك أسئلة متبقية في المرحلة
    if (currentQuestionIndex < stageQuestions.length) {
        const question = stageQuestions[currentQuestionIndex]; // الحصول على السؤال الحالي
        
        // تحديث عداد الأسئلة (مثال: 1 / 5)
        questionCounter.textContent = `${currentQuestionIndex + 1} / ${stageQuestions.length}`;
        
        questionText.textContent = question.question; // عرض نص السؤال
        
        optionsContainer.innerHTML = ''; // مسح خيارات الإجابة السابقة
        
        // إنشاء أزرار خيارات الإجابة لكل سؤال
        question.options.forEach((option, index) => {
            const button = document.createElement('button'); // إنشاء زر جديد
            button.className = 'option-button';             // إضافة فئة CSS للزر
            button.textContent = option;                     // تعيين نص الزر (خيار الإجابة)
            // إضافة مستمع حدث عند النقر على الزر لتحديد الإجابة
            button.addEventListener('click', () => selectAnswer(button, option, question.answer));
            optionsContainer.appendChild(button);            // إضافة الزر إلى حاوية الخيارات
        });
        
        nextButton.style.display = 'none'; // إخفاء زر التالي (لأن الانتقال أصبح تلقائيًا)
        feedbackContainer.innerHTML = '';  // مسح أي تغذية راجعة سابقة
    } else {
        showResults(); // إذا انتهت الأسئلة، عرض النتائج
    }
}

// دالة لتحديد الإجابة والتحقق منها
function selectAnswer(selectedButton, selectedAnswer, correctAnswer) {
    const allButtons = optionsContainer.querySelectorAll('.option-button'); // الحصول على جميع أزرار الخيارات
    // تعطيل جميع الأزرار بعد اختيار إجابة لمنع النقر المتعدد
    allButtons.forEach(button => {
        button.disabled = true;
        
        // تمييز الإجابة الصحيحة باللون الأخضر
        if (button.textContent === correctAnswer) {
            button.classList.add('correct');
        // تمييز الإجابة الخاطئة التي اختارها المستخدم باللون الأحمر
        } else if (button === selectedButton && selectedAnswer !== correctAnswer) {
            button.classList.add('incorrect');
        }
    });
    
    // التحقق مما إذا كانت الإجابة المختارة صحيحة
    if (selectedAnswer === correctAnswer) {
        correctAnswersCount++; // زيادة عداد الإجابات الصحيحة
        showFeedback('إجابة صحيحة! 🎉', 'correct'); // عرض رسالة تغذية راجعة إيجابية
    } else {
        showFeedback(`إجابة خاطئة. الإجابة الصحيحة هي: ${correctAnswer}`, 'incorrect'); // عرض رسالة تغذية راجعة سلبية
    }
    
    // الانتقال إلى السؤال التالي بعد 0.5 ثانية (500 مللي ثانية)
    setTimeout(() => {
        currentQuestionIndex++; // زيادة فهرس السؤال
        loadQuestion();         // تحميل السؤال التالي
    }, 500); 
}

// دالة لعرض رسالة التغذية الراجعة (صحيح/خطأ)
function showFeedback(message, type) {
    // تحديث محتوى حاوية التغذية الراجعة بالرسالة والفئة المناسبة
    feedbackContainer.innerHTML = `
        <div class="feedback-message ${type}">
            ${message}
        </div>
    `;
    
    const feedbackElement = feedbackContainer.querySelector('.feedback-message'); // الحصول على عنصر رسالة التغذية الراجعة
    // تطبيق أنماط مختلفة بناءً على نوع التغذية الراجعة (صحيح/خطأ)
    if (type === 'correct') {
        feedbackElement.style.background = '#d4edda'; // خلفية خضراء فاتحة
        feedbackElement.style.color = '#155724';     // نص أخضر داكن
        feedbackElement.style.border = '1px solid #c3e6cb'; // حدود خضراء
    } else {
        feedbackElement.style.background = '#f8d7da'; // خلفية حمراء فاتحة
        feedbackElement.style.color = '#721c24';     // نص أحمر داكن
        feedbackElement.style.border = '1px solid #f5c6cb'; // حدود حمراء
    }
    
    // أنماط إضافية للتغذية الراجعة
    feedbackElement.style.padding = '15px';
    feedbackElement.style.borderRadius = '10px';
    feedbackElement.style.marginTop = '20px';
}

// دالة لعرض شاشة النتائج بعد انتهاء المرحلة
function showResults() {
    const percentage = (correctAnswersCount / totalQuestions) * 100; // حساب النسبة المئوية للإجابات الصحيحة
    const passed = correctAnswersCount === totalQuestions;         // التحقق مما إذا كان المستخدم قد اجتاز المرحلة (5/5)
    
    quizContainer.style.display = 'none';  // إخفاء حاوية الاختبار
    resultContainer.style.display = 'flex'; // إظهار حاوية النتائج
    
    // عرض رسالة النجاح أو الفشل
    if (passed) {
        resultIcon.textContent = '🎉'; // أيقونة احتفالية
        resultTitle.textContent = 'تهانينا!'; // عنوان النجاح
        resultMessage.innerHTML = `لقد نجحت في اجتياز ${stageNames[currentStage]}!`; // رسالة النجاح
        
        // إذا كانت المرحلة الرابعة، عرض رسالة إكمال اللعبة واسم المطور
        if (currentStage === 4) {
            resultMessage.innerHTML += '<br><br>🎊 لقد أكملت جميع المراحل! 🎊<br>انتظر التحديثات يا وحش!<br><br>✨ صنع بواسطة أسامة ✨';
        }
    } else {
        resultIcon.textContent = '😔'; // أيقونة حزينة
        resultTitle.textContent = 'حاول مرة أخرى'; // عنوان الفشل
        resultMessage.textContent = 'تحتاج للحصول على 5/5 لفتح المرحلة التالية'; // رسالة الفشل
    }
    
    resultScore.textContent = `${correctAnswersCount} / ${totalQuestions}`; // عرض النتيجة (مثال: 3 / 5)
    
    // إذا اجتاز المستخدم المرحلة ولم تكن المرحلة الأخيرة، فتح المرحلة التالية وحفظ التقدم
    if (passed && currentStage < 4) {
        unlockNextStage(currentStage + 1); // فتح المرحلة التالية
        saveProgress(currentStage + 1);    // حفظ التقدم
    }
}

// دالة لفتح المرحلة التالية
function unlockNextStage(stageNum) {
    const stageCard = document.getElementById(`stage${stageNum}`);     // الحصول على بطاقة المرحلة
    const stageButton = stageCard.querySelector('.stage-button'); // الحصول على زر المرحلة
    
    stageCard.classList.remove('locked'); // إزالة فئة 'locked' من البطاقة
    stageButton.disabled = false;         // تفعيل زر المرحلة
    stageButton.innerHTML = '<span>ابدأ</span>'; // تغيير نص الزر إلى "ابدأ"
}

// دالة لحفظ تقدم المستخدم في localStorage
function saveProgress(unlockedStage) {
    localStorage.setItem('unlockedStage', unlockedStage.toString()); // حفظ رقم المرحلة المفتوحة
}

// دالة لتحميل تقدم المستخدم من localStorage عند تحميل الصفحة
function loadProgress() {
    const savedStage = localStorage.getItem('unlockedStage'); // الحصول على المرحلة المحفوظة
    if (savedStage) { // إذا كانت هناك مرحلة محفوظة
        const unlockedStage = parseInt(savedStage); // تحويل القيمة إلى عدد صحيح
        // فتح جميع المراحل حتى المرحلة المحفوظة
        for (let i = 2; i <= unlockedStage && i <= 4; i++) {
            unlockNextStage(i);
        }
    }
}

// دالة للعودة إلى شاشة المراحل
function goBackToStages() {
    stagesContainer.style.display = 'block'; // إظهار حاوية المراحل
    quizContainer.style.display = 'none';    // إخفاء حاوية الاختبار
    resultContainer.style.display = 'none';  // إخفاء حاوية النتائج
}

// عند تحميل محتوى DOM بالكامل
document.addEventListener('DOMContentLoaded', function() {
    loadProgress(); // تحميل تقدم المستخدم
    
    // إضافة مستمعي الأحداث لبطاقات المراحل
    document.querySelectorAll('.stage-card').forEach(card => {
        card.addEventListener('click', function() {
            // إذا لم تكن البطاقة مغلقة
            if (!this.classList.contains('locked')) {
                const stageNum = parseInt(this.dataset.stage); // الحصول على رقم المرحلة من data-stage
                startStage(stageNum); // بدء المرحلة
            }
        });
    });
    
    // مستمع حدث لزر التالي (لم يعد مستخدمًا بشكل مباشر في التدفق الحالي)
    nextButton.addEventListener('click', function() {
        currentQuestionIndex++;
        loadQuestion();
    });
    
    // مستمع حدث لزر العودة
    backButton.addEventListener('click', goBackToStages);
    
    // مستمع حدث لزر المتابعة في شاشة النتائج
    continueButton.addEventListener('click', goBackToStages);
});


