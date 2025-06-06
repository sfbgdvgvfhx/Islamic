
        // الوظائف العامة
        document.addEventListener('DOMContentLoaded', function() {
            // التنقل بين الأقسام
            const navButtons = document.querySelectorAll('.nav-btn');
            const sections = document.querySelectorAll('.section');
            
            navButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const sectionId = this.getAttribute('data-section');
                    
                    // إزالة الصنف النشط من جميع الأزرار
                    navButtons.forEach(btn => btn.classList.remove('active'));
                    
                    // إضافة الصنف النشط للزر المختار
                    this.classList.add('active');
                    
                    // إخفاء جميع الأقسام
                    sections.forEach(section => section.classList.add('hidden'));
                    
                    // إظهار القسم المختار
                    document.getElementById(sectionId).classList.remove('hidden');
                });
            });
            
            // تهيئة البيانات عند تحميل الصفحة
            loadAdhkar();
            loadQuranData();
            loadDuas();
            
            // تفعيل قسم التسبيح مبدئيًا
            document.querySelector('.nav-btn[data-section="tasbih"]').click();
        });

        // وظائف التسبيح
        let tasbihCount = 0;
        
        document.getElementById('increment-tasbih').addEventListener('click', function() {
            tasbihCount++;
            document.getElementById('tasbih-count').innerText = tasbihCount;
            
            // إظهار رسالة عند وصول التسبيح إلى أعداد معينة
            if (tasbihCount % 33 === 0) {
                showSuccessMessage(`أحسنت! لقد أكملت ${tasbihCount / 33} دورة كاملة`);
            }
        });
        
        document.getElementById('reset-tasbih').addEventListener('click', function() {
            tasbihCount = 0;
            document.getElementById('tasbih-count').innerText = tasbihCount;
        });
        
        document.getElementById('tasbih-type').addEventListener('change', function() {
            const selectedTasbih = this.value;
            document.getElementById('current-tasbih').innerText = selectedTasbih;
            // إعادة تعيين العداد عند تغيير نوع التسبيح
            tasbihCount = 0;
            document.getElementById('tasbih-count').innerText = tasbihCount;
        });
        
        // وظيفة إظهار رسالة النجاح
        function showSuccessMessage(message) {
            const msgElement = document.getElementById('success-message') || document.createElement('div');
            if (!document.getElementById('success-message')) {
                msgElement.id = 'success-message';
                document.querySelector('.tasbih-container').appendChild(msgElement);
            }
            
            msgElement.innerText = message;
            msgElement.style.display = 'block';
            
            setTimeout(() => {
                msgElement.style.display = 'none';
            }, 3000);
        }

        // وظائف الأذكار
        async function loadAdhkar() {
            try {
                // أذكار الصباح
                const morningResponse = await fetch('https://api.aladhan.com/v1/timingsByCity?city=Cairo&country=Egypt');
                const morningData = await morningResponse.json();
                
                // هنا سنستخدم بيانات وهمية لأن API المستخدم لا يوفر أذكار فعلية
                const morningAdhkar = [
                    "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ",
                    "أَصْبَحْنَا عَلَى فِطْرَةِ الإِسْلاَمِ، وَعَلَى كَلِمَةِ الإِخْلاَصِ، وَعَلَى دِينِ نَبِيِّنَا مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، وَعَلَى مِلَّةِ أَبِينَا إِبْرَاهِيمَ حَنِيفًا مُسْلِمًا وَمَا كَانَ مِنَ المُشْرِكِينَ",
                    "سُبْحَانَ اللهِ وَبِحَمْدِهِ عَدَدَ خَلْقِهِ، وَرِضَا نَفْسِهِ، وَزِنَةَ عَرْشِهِ، وَمِدَادَ كَلِمَاتِهِ (ثلاثَ مرَّاتٍ)"
                ];
                
                displayAdhkar('morning-adhkar-content', morningAdhkar);
                
                // أذكار المساء
                const eveningAdhkar = [
                    "اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ",
                    "اللَّهُمَّ مَا أَمْسَى بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لَا شَرِيكَ لَكَ، فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ",
                    "أَعُوذُ بِكَلِمَاتِ اللهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ (ثلاثَ مرَّاتٍ)"
                ];
                
                displayAdhkar('evening-adhkar-content', eveningAdhkar);
                
                // أذكار النوم
                const sleepAdhkar = [
                    "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
                    "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا، وَكَفَانَا، وَآوَانَا، فَكَمْ مِمَّنْ لاَ كَافِيَ لَهُ وَلاَ مُؤْوِيَ",
                    "اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ"
                ];
                
                displayAdhkar('sleep-adhkar-content', sleepAdhkar);
                
            } catch (error) {
                console.error('Error loading adhkar:', error);
                document.getElementById('morning-adhkar-content').innerText = 'حدث خطأ أثناء تحميل الأذكار';
                document.getElementById('evening-adhkar-content').innerText = 'حدث خطأ أثناء تحميل الأذكار';
                document.getElementById('sleep-adhkar-content').innerText = 'حدث خطأ أثناء تحميل الأذكار';
            }
        }
        
        function displayAdhkar(elementId, adhkarList) {
            const container = document.getElementById(elementId);
            container.innerHTML = '';
            
            adhkarList.forEach((dhikr, index) => {
                const dhikrElement = document.createElement('p');
                dhikrElement.innerText = `${index + 1}. ${dhikr}`;
                container.appendChild(dhikrElement);
            });
        }
        
        // وظائف القرآن

        // النص الحالي
        let currentFontSize = 20;
        
        // الاستماع لأزرار تغيير حجم الخط
        document.getElementById('increaseFont').addEventListener('click', () => {
            if (currentFontSize < 32) {
                currentFontSize += 2;
                updateFontSize();
            }
        });
        
        document.getElementById('decreaseFont').addEventListener('click', () => {
            if (currentFontSize > 16) {
                currentFontSize -= 2;
                updateFontSize();
            }
        });
        
        function updateFontSize() {
            document.querySelectorAll('.verse-text').forEach(el => {
                el.style.fontSize = `${currentFontSize}px`;
            });
        }
        
        // تحميل قائمة السور عند فتح الصفحة
        document.addEventListener('DOMContentLoaded', fetchSurahs);
        
        // إرجاع إلى قائمة السور
        document.getElementById('backBtn').addEventListener('click', showSurahList);
        
        // البحث عن سورة
        document.getElementById('searchBtn').addEventListener('click', searchSurah);
        document.getElementById('searchInput').addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                searchSurah();
            }
        });
        
        function searchSurah() {
            const searchTerm = document.getElementById('searchInput').value.trim();
            if (!searchTerm) return;
            
            const surahCards = document.querySelectorAll('.surah-card');
            let found = false;
            
            surahCards.forEach(card => {
                const surahName = card.querySelector('h3').textContent;
                if (surahName.includes(searchTerm)) {
                    card.style.display = 'block';
                    found = true;
                } else {
                    card.style.display = 'none';
                }
            });
            
            if (!found) {
                const surahList = document.getElementById('surahList');
                surahList.innerHTML = '<p style="width: 100%; text-align: center; padding: 20px;">لا توجد نتائج للبحث</p>';
            }
        }
        
        // تحميل قائمة السور من API
        async function fetchSurahs() {
            try {
                const response = await fetch('https://api.alquran.cloud/v1/surah');
                const data = await response.json();
                
                if (data.code === 200) {
                    displaySurahs(data.data);
                } else {
                    throw new Error('فشل في تحميل بيانات السور');
                }
            } catch (error) {
                document.getElementById('surahList').innerHTML = `
                    <div style="width: 100%; text-align: center; padding: 20px; color: #ff5555;">
                        حدث خطأ في تحميل البيانات. يرجى المحاولة مرة أخرى.
                    </div>
                `;
                console.error('Error fetching surahs:', error);
            }
        }
        
        // عرض قائمة السور
        function displaySurahs(surahs) {
            const surahList = document.getElementById('surahList');
            surahList.innerHTML = '';
            
            surahs.forEach(surah => {
                const surahCard = document.createElement('div');
                surahCard.className = 'surah-card';
                surahCard.innerHTML = `
                    <h3>${surah.name}</h3>
                    <p>${surah.englishName} - آياتها: ${surah.numberOfAyahs}</p>
                    <p>${surah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'}</p>
                `;
                
                surahCard.addEventListener('click', () => {
                    fetchSurah(surah.number);
                });
                
                surahList.appendChild(surahCard);
            });
        }
        
        // تحميل سورة معينة
        async function fetchSurah(surahNumber) {
            try {
                document.getElementById('quranContent').style.display = 'block';
                document.getElementById('main-content').style.display = 'none';
                
                document.getElementById('versesContainer').innerHTML = `
                    <div class="loading">جاري تحميل السورة...</div>
                `;
                
                const response = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}`);
                const data = await response.json();
                
                if (data.code === 200) {
                    displaySurah(data.data);
                } else {
                    throw new Error('فشل في تحميل بيانات السورة');
                }
            } catch (error) {
                document.getElementById('versesContainer').innerHTML = `
                    <div style="text-align: center; padding: 20px; color: #ff5555;">
                        حدث خطأ في تحميل السورة. يرجى المحاولة مرة أخرى.
                    </div>
                `;
                console.error('Error fetching surah:', error);
            }
        }
        
        // عرض السورة
        function displaySurah(surah) {
            // تحديث عنوان السورة
            const surahHeader = document.getElementById('surahHeader');
            surahHeader.innerHTML = `
                <h2>سورة ${surah.name}</h2>
                <p>${surah.englishName} - ${surah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'} - عدد الآيات: ${surah.numberOfAyahs}</p>
            `;
            
            // إخفاء البسملة لسورة التوبة
            const bismillah = document.getElementById('bismillah');
            if (surah.number === 9) {
                bismillah.style.display = 'none';
            } else {
                bismillah.style.display = 'block';
            }
            
            // عرض الآيات
            const versesContainer = document.getElementById('versesContainer');
            versesContainer.innerHTML = '';
            
            surah.ayahs.forEach(ayah => {
                const verseDiv = document.createElement('div');
                verseDiv.className = 'verse';
                
                verseDiv.innerHTML = `
                    <span class="verse-text" style="font-size: ${currentFontSize}px">${ayah.text}</span>
                    <span class="verse-number">${ayah.numberInSurah}</span>
                `;
                
                versesContainer.appendChild(verseDiv);
            });
            
            // التمرير إلى الأعلى
            window.scrollTo(0, 0);
        }
        
        // إظهار قائمة السور
        function showSurahList() {
            document.getElementById('quranContent').style.display = 'none';
            document.getElementById('main-content').style.display = 'block';
            document.getElementById('searchInput').value = '';
            
            // إظهار كل السور بعد العودة من البحث
            const surahCards = document.querySelectorAll('.surah-card');
            surahCards.forEach(card => {
                card.style.display = 'block';
            });
        }
// وظائف الأدعية
        async function loadDuas() {
            try {
                // هنا سنستخدم بيانات وهمية لأن API المستخدم لا يوفر أدعية فعلية
                const duas = [
                    {
                        title: "دعاء الاستفتاح",
                        text: "اللَّهُمَّ بَاعِدْ بَيْنِي وَبَيْنَ خَطَايَايَ كَمَا بَاعَدْتَ بَيْنَ الْمَشْرِقِ وَالْمَغْرِبِ، اللَّهُمَّ نَقِّنِي مِنْ خَطَايَايَ كَمَا يُنَقَّى الثَّوْبُ الْأَبْيَضُ مِنَ الدَّنَسِ، اللَّهُمَّ اغْسِلْنِي مِنْ خَطَايَايَ بِالثَّلْجِ وَالْمَاءِ وَالْبَرَدِ"
                    },
                    {
                        title: "دعاء السفر",
                        text: "اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ، وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ، اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا البِرَّ وَالتَّقْوَى، وَمِنَ العَمَلِ مَا تَرْضَى، اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَذَا وَاطْوِ عَنَّا بُعْدَهُ، اللَّهُمَّ أَنْتَ الصَّاحِبُ فِي السَّفَرِ، وَالخَليفَةُ فِي الأَهْلِ، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ وَعْثَاءِ السَّفَرِ، وَكَآبَةِ المَنْظَرِ، وَسُوءِ المُنْقَلَبِ فِي المَالِ وَالأَهْلِ"
                    },
                    {
                        title: "دعاء الاستخارة",
                        text: "اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ، وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ، وَأَسْأَلُكَ مِنْ فَضْلِكَ العَظِيمِ، فَإِنَّكَ تَقْدِرُ وَلاَ أَقْدِرُ، وَتَعْلَمُ وَلاَ أَعْلَمُ، وَأَنْتَ عَلاَّمُ الغُيُوبِ، اللَّهُمَّ إِنْ كُنْتَ تَعْلَمُ أَنَّ هَذَا الأَمْرَ خَيْرٌ لِي فِي دِينِي وَمَعَاشِي وَعَاقِبَةِ أَمْرِي - أَوْ قَالَ: عَاجِلِ أَمْرِي وَآجِلِهِ - فَاقْدُرْهُ لِي وَيَسِّرْهُ لِي ثُمَّ بَارِكْ لِي فِيهِ، وَإِنْ كُنْتَ تَعْلَمُ أَنَّ هَذَا الأَمْرَ شَرٌّ لِي فِي دِينِي وَمَعَاشِي وَعَاقِبَةِ أَمْرِي - أَوْ قَالَ: عَاجِلِ أَمْرِي وَآجِلِهِ - فَاصْرِفْهُ عَنِّي وَاصْرِفْنِي عَنْهُ، وَاقْدُرْ لِي الخَيْرَ حَيْثُ كَانَ، ثُمَّ أَرْضِنِي بِهِ"
                    },
                    {
                        title: "دعاء الهم والحزن",
                        text: "اللَّهُمَّ إِنِّي عَبْدُكَ، ابْنُ عَبْدِكَ، ابْنُ أَمَتِكَ، نَاصِيَتِي بِيَدِكَ، مَاضٍ فِيَّ حُكْمُكَ، عَدْلٌ فِيَّ قَضَاؤُكَ، أَسْأَلُكَ بِكُلِّ اسْمٍ هُوَ لَكَ، سَمَّيْتَ بِهِ نَفْسَكَ، أَوْ أَنْزَلْتَهُ فِي كِتَابِكَ، أَوْ عَلَّمْتَهُ أَحَدًا مِنْ خَلْقِكَ، أَوِ اسْتَأْثَرْتَ بِهِ فِي عِلْمِ الغَيْبِ عِنْدَكَ، أَنْ تَجْعَلَ القُرْآنَ رَبِيعَ قَلْبِي، وَنُورَ صَدْرِي، وَجَلَاءَ حُزْنِي، وَذَهَابَ هَمِّي"
                    },
                    {
                        title: "دعاء دخول المسجد",
                        text: "أَعُوذُ بِاللهِ العَظِيمِ، وَبِوَجْهِهِ الكَرِيمِ، وَسُلْطَانِهِ القَدِيمِ، مِنَ الشَّيْطَانِ الرَّجِيمِ، بِسْمِ اللهِ، وَالصَّلَاةُ وَالسَّلَامُ عَلَى رَسُولِ اللهِ، اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ"
                    }
                ];
                
                displayDuas(duas);
                
            } catch (error) {
                console.error('Error loading duas:', error);
                document.getElementById('duas-container').innerText = 'حدث خطأ أثناء تحميل الأدعية';
            }
        }
        
        function displayDuas(duasList) {
            const container = document.getElementById('duas-container');
            container.innerHTML = '';
            
            duasList.forEach(dua => {
                const duaCard = document.createElement('div');
                duaCard.className = 'card';
                
                const title = document.createElement('h3');
                title.innerText = dua.title;
                
                const text = document.createElement('p');
                text.innerText = dua.text;
                
                duaCard.appendChild(title);
                duaCard.appendChild(text);
                container.appendChild(duaCard);
            });
        }
        
        // وظائف المساعد الإسلامي باستخدام الذكاء الاصطناعي
        const API_KEY = 'AIzaSyDjMwL_OQEy-qCvBj8SuLH1vjERqyCRY3w';
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
        
        document.getElementById('ai-submit').addEventListener('click', async function() {
            const userInput = document.getElementById('ai-input').value.trim();
            
            if (!userInput) {
                alert('الرجاء كتابة سؤال أولاً');
                return;
            }
            
            // إظهار مؤشر التحميل
            document.getElementById('ai-loader').style.display = 'block';
            document.getElementById('ai-response').innerText = 'جاري معالجة السؤال...';
            
            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: "أجب على السؤال التالي مع الالتزام بالضوابط الإسلامية والأدلة من القرآن والسنة إن أمكن: " + userInput
                            }]
                        }]
                    })
                });
                
                const data = await response.json();
                
                if (data.candidates && data.candidates[0].content) {
                    document.getElementById('ai-response').innerText = data.candidates[0].content.parts[0].text;
                } else {
                    throw new Error('لم يتم الحصول على إجابة من المساعد');
                }
                
            } catch (error) {
                console.error('Error with AI assistant:', error);
                document.getElementById('ai-response').innerText = 'حدث خطأ أثناء معالجة السؤال. يرجى المحاولة مرة أخرى لاحقًا.';
            } finally {
                // إخفاء مؤشر التحميل
                document.getElementById('ai-loader').style.display = 'none';
            }
        });
        
        // استمع لضغط مفتاح Enter في حقل الإدخال
        document.getElementById('ai-input').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                document.getElementById('ai-submit').click();
            }
        });
        
        // إضافة ميزة التحويل التلقائي لوضع الليل/النهار
        function checkDayNightMode() {
            const now = new Date();
            const hours = now.getHours();
            
            // تطبيق وضع الليل من 6 مساءً حتى 6 صباحًا
            if (hours >= 18 || hours < 6) {
                document.body.style.background = 'linear-gradient(135deg, #1a202c 0%, #2d3748 100%)';
                document.body.style.color = '#e2e8f0';
                
                // تغيير ألوان البطاقات
                const cards = document.querySelectorAll('.card');
                cards.forEach(card => {
                    card.style.backgroundColor = '#2d3748';
                    card.style.color = '#e2e8f0';
                });
            } else {
                document.body.style.background = 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)';
                document.body.style.color = '#333';
                
                // إعادة ألوان البطاقات للوضع النهاري
                const cards = document.querySelectorAll('.card');
                cards.forEach(card => {
                    card.style.backgroundColor = '#f8fafc';
                    card.style.color = '#333';
                });
            }
        }
        
        // التحقق من وضع الليل/النهار عند تحميل الصفحة
        checkDayNightMode();
        
        // التحقق كل ساعة
        setInterval(checkDayNightMode, 3600000);
        
        // إضافة ميزة الإشعارات المحلية للتذكير بالأذكار
        function scheduleAdhkarReminders() {
            // التحقق من دعم الإشعارات في المتصفح
            if (!("Notification" in window)) {
                console.log("المتصفح لا يدعم الإشعارات");
                return;
            }
            
            // طلب إذن الإشعارات
            if (Notification.permission !== "granted" && Notification.permission !== "denied") {
                Notification.requestPermission().then(permission => {
                    if (permission === "granted") {
                        setupReminders();
                    }
                });
            } else if (Notification.permission === "granted") {
                setupReminders();
            }
        }
        
        function setupReminders() {
            const now = new Date();
            const hours = now.getHours();
            
            // إذا كان الوقت بين 5 و 7 صباحًا، قم بتذكير أذكار الصباح
            if (hours >= 5 && hours < 7) {
                new Notification("تذكير بأذكار الصباح", {
                    body: "حان وقت أذكار الصباح. انقر للاطلاع عليها.",
                    icon: "https://example.com/islam-icon.png"
                });
            }
            
            // إذا كان الوقت بين 5 و 7 مساءً، قم بتذكير أذكار المساء
            if (hours >= 17 && hours < 19) {
                new Notification("تذكير بأذكار المساء", {
                    body: "حان وقت أذكار المساء. انقر للاطلاع عليها.",
                    icon: "https://example.com/islam-icon.png"
                });
            }
        }
        
        // محاولة جدولة التذكيرات عند تحميل الصفحة
        scheduleAdhkarReminders();
        
        // جدولة التحقق من وقت الأذكار كل ساعة
        setInterval(scheduleAdhkarReminders, 3600000);
        
        // إضافة ميزة حفظ عدد التسبيح في التخزين المحلي
        function saveTasbihCount() {
            const tasbihType = document.getElementById('tasbih-type').value;
            localStorage.setItem('tasbihType', tasbihType);
            localStorage.setItem('tasbihCount', tasbihCount);
        }
        
        function loadTasbihCount() {
            const savedType = localStorage.getItem('tasbihType');
            const savedCount = localStorage.getItem('tasbihCount');
            
            if (savedType) {
                document.getElementById('tasbih-type').value = savedType;
                document.getElementById('current-tasbih').innerText = savedType;
            }
            
            if (savedCount) {
                tasbihCount = parseInt(savedCount);
                document.getElementById('tasbih-count').innerText = tasbihCount;
            }
        }
        
        // حفظ التسبيح عند تغيير القيمة
        document.getElementById('increment-tasbih').addEventListener('click', saveTasbihCount);
        document.getElementById('reset-tasbih').addEventListener('click', saveTasbihCount);
        document.getElementById('tasbih-type').addEventListener('change', saveTasbihCount);
        
        // تحميل قيم التسبيح المحفوظة عند بدء الصفحة
        loadTasbihCount();
        
        // إضافة ميزة البحث في موقع القرآن
        function setupQuranSearch() {
            // إضافة حقل البحث إلى قسم القرآن
            const quranSection = document.getElementById('quran');
            const searchContainer = document.createElement('div');
            searchContainer.className = 'card';
            searchContainer.innerHTML = `
                <h3>البحث في القرآن</h3>
                <div class="input-container">
                    <input type="text" id="quran-search" placeholder="ابحث عن كلمة أو آية..." />
                    <button id="quran-search-btn" class="tasbih-btn">بحث</button>
                </div>
            `;
            
            quranSection.insertBefore(searchContainer, quranSection.firstChild.nextSibling);
            
            // إضافة وظيفة البحث
            document.getElementById('quran-search-btn').addEventListener('click', function() {
                const searchQuery = document.getElementById('quran-search').value.trim();
                if (searchQuery) {
                    window.open(`https://quran.com/search?q=${encodeURIComponent(searchQuery)}`, '_blank');
                } else {
                    alert('الرجاء إدخال نص للبحث');
                }
            });
            
            document.getElementById('quran-search').addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    document.getElementById('quran-search-btn').click();
                }
            });
        }
        
        // إعداد ميزة البحث في القرآن
        setupQuranSearch();