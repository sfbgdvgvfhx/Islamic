"سُبْحَانَ اللَّهِ (33 مرة)، وَالْحَمْدُ لِلَّهِ (33 مرة)، وَاللَّهُ أَكْبَرُ (33 مرة)، ثم يقول: لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
                "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْجُبْنِ، وَأَعُوذُ بِكَ مِنَ الْبُخْلِ، وَأَعُوذُ بِكَ مِنْ أَنْ أُرَدَّ إِلَى أَرْذَلِ الْعُمُرِ، وَأَعُوذُ بِكَ مِنْ فِتْنَةِ الدُّنْيَا وَعَذَابِ الْقَبْرِ"
            ];
            
            displayAdhkar('after-prayer-adhkar-content', afterPrayerAdhkar, true);
        } catch (error) {
            console.error('خطأ في تحميل الأذكار:', error);
            showToast('حدث خطأ أثناء تحميل الأذكار', 'error');
        }
    };
    
    const displayAdhkar = function(elementId, adhkarList, addCopyButton = false) {
        const container = document.getElementById(elementId);
        if (!container) {
            console.warn(`عنصر الأذكار بمعرّف ${elementId} غير موجود`);
            return;
        }
        
        // إنشاء عناصر الأذكار
        container.innerHTML = '';
        
        adhkarList.forEach((dhikr, index) => {
            const dhikrCard = document.createElement('div');
            dhikrCard.className = 'dhikr-card';
            
            const dhikrText = document.createElement('p');
            dhikrText.className = 'dhikr-text';
            dhikrText.textContent = dhikr;
            
            dhikrCard.appendChild(dhikrText);
            
            // إضافة زر نسخ إذا كان مطلوبًا
            if (addCopyButton) {
                const copyBtn = document.createElement('button');
                copyBtn.className = 'copy-btn';
                copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
                copyBtn.title = 'نسخ';
                
                copyBtn.addEventListener('click', function() {
                    copyToClipboard(dhikr);
                    showToast('تم نسخ الذكر', 'success');
                });
                
                dhikrCard.appendChild(copyBtn);
            }
            
            // إضافة زر مشاركة للذكر
            const shareBtn = document.createElement('button');
            shareBtn.className = 'share-btn';
            shareBtn.innerHTML = '<i class="fas fa-share-alt"></i>';
            shareBtn.title = 'مشاركة';
            
            shareBtn.addEventListener('click', function() {
                if (navigator.share) {
                    navigator.share({
                        title: 'ذكر من تطبيق المسلم',
                        text: dhikr
                    })
                    .then(() => console.log('تمت المشاركة بنجاح'))
                    .catch((error) => console.log('خطأ في المشاركة:', error));
                } else {
                    copyToClipboard(dhikr);
                    showToast('تم نسخ الذكر، يمكنك مشاركته الآن', 'info');
                }
            });
            
            dhikrCard.appendChild(shareBtn);
            
            container.appendChild(dhikrCard);
        });
    };
    
    // ------------------- وحدة الأدعية -------------------
    const loadDuas = function() {
        const duasContainer = document.getElementById('duas-content');
        if (!duasContainer) {
            console.warn('عنصر الأدعية غير موجود');
            return;
        }
        
        const duas = [
            {
                title: 'دعاء الاستخارة',
                text: 'اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ، وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ، وَأَسْأَلُكَ مِنْ فَضْلِكَ الْعَظِيمِ، فَإِنَّكَ تَقْدِرُ وَلَا أَقْدِرُ، وَتَعْلَمُ وَلَا أَعْلَمُ، وَأَنْتَ عَلَّامُ الْغُيُوبِ، اللَّهُمَّ إِنْ كُنْتَ تَعْلَمُ أَنَّ هَذَا الْأَمْرَ خَيْرٌ لِي فِي دِينِي وَمَعَاشِي وَعَاقِبَةِ أَمْرِي فَاقْدُرْهُ لِي وَيَسِّرْهُ لِي ثُمَّ بَارِكْ لِي فِيهِ، وَإِنْ كُنْتَ تَعْلَمُ أَنَّ هَذَا الْأَمْرَ شَرٌّ لِي فِي دِينِي وَمَعَاشِي وَعَاقِبَةِ أَمْرِي فَاصْرِفْهُ عَنِّي وَاصْرِفْنِي عَنْهُ وَاقْدُرْ لِي الْخَيْرَ حَيْثُ كَانَ ثُمَّ أَرْضِنِي بِهِ'
            },
            {
                title: 'دعاء الهم والحزن',
                text: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ، وَغَلَبَةِ الرِّجَالِ'
            },
            {
                title: 'دعاء التيسير',
                text: 'اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا، وَأَنْتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلًا'
            },
            {
                title: 'دعاء للوالدين',
                text: 'رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا'
            },
            {
                title: 'دعاء دخول المسجد',
                text: 'اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ'
            },
            {
                title: 'دعاء الخروج من المسجد',
                text: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ'
            },
            {
                title: 'دعاء السفر',
                text: 'اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى، وَمِنَ الْعَمَلِ مَا تَرْضَى، اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَذَا وَاطْوِ عَنَّا بُعْدَهُ، اللَّهُمَّ أَنْتَ الصَّاحِبُ فِي السَّفَرِ، وَالْخَلِيفَةُ فِي الْأَهْلِ، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ وَعْثَاءِ السَّفَرِ، وَكَآبَةِ الْمَنْظَرِ، وَسُوءِ الْمُنْقَلَبِ فِي الْمَالِ وَالْأَهْلِ'
            }
        ];
        
        duasContainer.innerHTML = '';
        
        duas.forEach(dua => {
            const duaCard = document.createElement('div');
            duaCard.className = 'dua-card';
            
            const duaTitle = document.createElement('h3');
            duaTitle.className = 'dua-title';
            duaTitle.textContent = dua.title;
            
            const duaText = document.createElement('p');
            duaText.className = 'dua-text';
            duaText.textContent = dua.text;
            
            // إضافة أزرار النسخ والمشاركة
            const actions = document.createElement('div');
            actions.className = 'dua-actions';
            
            // زر النسخ
            const copyBtn = document.createElement('button');
            copyBtn.className = 'dua-btn';
            copyBtn.innerHTML = '<i class="fas fa-copy"></i> نسخ';
            copyBtn.addEventListener('click', function() {
                copyToClipboard(dua.text);
                showToast('تم نسخ الدعاء', 'success');
            });
            
            // زر المشاركة
            const shareBtn = document.createElement('button');
            shareBtn.className = 'dua-btn';
            shareBtn.innerHTML = '<i class="fas fa-share-alt"></i> مشاركة';
            shareBtn.addEventListener('click', function() {
                if (navigator.share) {
                    navigator.share({
                        title: dua.title,
                        text: dua.text
                    })
                    .then(() => console.log('تمت المشاركة بنجاح'))
                    .catch((error) => console.log('خطأ في المشاركة:', error));
                } else {
                    copyToClipboard(dua.text);
                    showToast('تم نسخ الدعاء، يمكنك مشاركته الآن', 'info');
                }
            });
            
            // زر الاستماع (تحويل النص إلى كلام)
            const listenBtn = document.createElement('button');
            listenBtn.className = 'dua-btn';
            listenBtn.innerHTML = '<i class="fas fa-volume-up"></i> استماع';
            listenBtn.addEventListener('click', function() {
                if ('speechSynthesis' in window) {
                    const utterance = new SpeechSynthesisUtterance(dua.text);
                    utterance.lang = 'ar';
                    speechSynthesis.speak(utterance);
                } else {
                    showToast('متصفحك لا يدعم ميزة تحويل النص إلى كلام', 'warning');
                }
            });
            
            actions.appendChild(copyBtn);
            actions.appendChild(shareBtn);
            actions.appendChild(listenBtn);
            
            duaCard.appendChild(duaTitle);
            duaCard.appendChild(duaText);
            duaCard.appendChild(actions);
            
            duasContainer.appendChild(duaCard);
        });
    };
    
    // ------------------- وحدة القرآن الكريم -------------------
    const loadQuranData = async function() {
        try {
            // تحميل قائمة السور
            const surahContainer = document.getElementById('quran-content');
            if (!surahContainer) return;
            
            surahContainer.innerHTML = '<div class="loader"></div>';
            
            const response = await fetchWithTimeout(`${QURAN_API_BASE_URL}/surah`, {
                timeout: 5000
            });
            
            if (!response.ok) {
                throw new Error(`خطأ في الاستجابة: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.code === 200 && data.data) {
                const surahs = data.data;
                
                surahContainer.innerHTML = '';
                
                // إنشاء عنصر البحث
                const searchContainer = document.createElement('div');
                searchContainer.className = 'search-container';
                
                const searchInput = document.createElement('input');
                searchInput.type = 'text';
                searchInput.id = 'quran-search';
                searchInput.className = 'search-input';
                searchInput.placeholder = 'ابحث عن سورة...';
                
                searchInput.addEventListener('input', function() {
                    const query = this.value.trim().toLowerCase();
                    const surahCards = document.querySelectorAll('.surah-card');
                    
                    surahCards.forEach(card => {
                        const surahName = card.querySelector('.surah-name').textContent.toLowerCase();
                        if (surahName.includes(query)) {
                            card.style.display = 'flex';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                });
                
                searchContainer.appendChild(searchInput);
                surahContainer.appendChild(searchContainer);
                
                // إنشاء حاوية لبطاقات السور
                const surahGrid = document.createElement('div');
                surahGrid.className = 'surah-grid';
                
                surahs.forEach(surah => {
                    const surahCard = document.createElement('div');
                    surahCard.className = 'surah-card';
                    surahCard.setAttribute('data-surah-id', surah.number);
                    
                    const surahName = document.createElement('div');
                    surahName.className = 'surah-name';
                    surahName.textContent = `${surah.name}`;
                    
                    const surahInfo = document.createElement('div');
                    surahInfo.className = 'surah-info';
                    surahInfo.textContent = `${surah.numberOfAyahs} آية - ${surah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'}`;
                    
                    surahCard.appendChild(surahName);
                    surahCard.appendChild(surahInfo);
                    
                    // إضافة مستمع الحدث للنقر
                    surahCard.addEventListener('click', function() {
                        const surahId = this.getAttribute('data-surah-id');
                        loadSurahContent(surahId);
                    });
                    
                    surahGrid.appendChild(surahCard);
                });
                
                surahContainer.appendChild(surahGrid);
            } else {
                throw new Error('لم يتم العثور على بيانات القرآن');
            }
        } catch (error) {
            console.error('خطأ في تحميل بيانات القرآن:', error);
            const quranContainer = document.getElementById('quran-content');
            if (quranContainer) {
                quranContainer.innerHTML = `
                    <p class="error-message">حدث خطأ أثناء تحميل بيانات القرآن: ${error.message}</p>
                    <button id="retry-quran-btn" class="tasbih-btn">إعادة المحاولة</button>
                `;
                
                document.getElementById('retry-quran-btn').addEventListener('click', loadQuranData);
            }
        }
    };
    
    const loadSurahContent = async function(surahId) {
        try {
            // إنشاء قسم عرض السورة إذا لم يكن موجودًا
            let surahViewSection = document.getElementById('surah-view');
            if (!surahViewSection) {
                surahViewSection = document.createElement('section');
                surahViewSection.id = 'surah-view';
                surahViewSection.className = 'section hidden';
                
                document.querySelector('main').appendChild(surahViewSection);
            }
            
            surahViewSection.innerHTML = '<div class="loader"></div>';
            
            // إظهار قسم عرض السورة
            document.getElementById('quran').classList.add('hidden');
            surahViewSection.classList.remove('hidden');
            
            // تحميل محتوى السورة
            const response = await fetchWithTimeout(`${QURAN_API_BASE_URL}/surah/${surahId}`, {
                timeout: 5000
            });
            
            if (!response.ok) {
                throw new Error(`خطأ في الاستجابة: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.code === 200 && data.data) {
                const surah = data.data;
                
                // إنشاء واجهة عرض السورة
                let surahContent = `
                    <div class="surah-header">
                        <button id="back-to-quran" class="btn-back">
                            <i class="fas fa-arrow-right"></i> العودة إلى قائمة السور
                        </button>
                        <h2>${surah.name}</h2>
                        <div class="surah-controls">
                            <button id="toggle-translation" class="btn">عرض الترجمة</button>
                            <select id="font-size-select" class="select">
                                <option value="small">خط صغير</option>
                                <option value="medium" selected>خط متوسط</option>
                                <option value="large">خط كبير</option>
                            </select>
                        </div>
                    </div>
                    <div class="bismillah">﴿ بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ﴾</div>
                    <div class="ayahs-container" id="ayahs-container">`;
                
                // إضافة الآيات
                surah.ayahs.forEach(ayah => {
                    surahContent += `
                        <div class="ayah-item" data-ayah-number="${ayah.numberInSurah}">
                            <div class="ayah-text">${ayah.text} <span class="ayah-number">﴿${ayah.numberInSurah}﴾</span></div>
                            <div class="ayah-translation hidden"></div>
                            <div class="ayah-actions">
                                <button class="ayah-action-btn play-btn" title="استماع"><i class="fas fa-play"></i></button>
                                <button class="ayah-action-btn bookmark-btn" title="إضافة علامة"><i class="fas fa-bookmark"></i></button>
                                <button class="ayah-action-btn copy-btn" title="نسخ"><i class="fas fa-copy"></i></button>
                                <button class="ayah-action-btn share-btn" title="مشاركة"><i class="fas fa-share-alt"></i></button>
                            </div>
                        </div>
                    `;
                });
                
                surahContent += `</div>`;
                
                // إضافة أزرار التنقل بين السور
                surahContent += `
                    <div class="surah-navigation">
                        ${Number(surahId) > 1 ? `<button id="prev-surah" data-surah-id="${Number(surahId) - 1}" class="nav-surah-btn"><i class="fas fa-arrow-right"></i> السورة السابقة</button>` : ''}
                        ${Number(surahId) < 114 ? `<button id="next-surah" data-surah-id="${Number(surahId) + 1}" class="nav-surah-btn">السورة التالية <i class="fas fa-arrow-left"></i></button>` : ''}
                    </div>
                `;
                
                surahViewSection.innerHTML = surahContent;
                
                // إضافة مستمعي الأحداث
                document.getElementById('back-to-quran').addEventListener('click', function() {
                    document.getElementById('quran').classList.remove('hidden');
                    document.getElementById('surah-view').classList.add('hidden');
                });
                
                // التبديل بين عرض الترجمة وإخفائها
                document.getElementById('toggle-translation').addEventListener('click', function() {
                    const translationElements = document.querySelectorAll('.ayah-translation');
                    const showTranslation = translationElements[0].classList.contains('hidden');
                    
                    translationElements.forEach(el => {
                        if (showTranslation) {
                            el.classList.remove('hidden');
                            this.textContent = 'إخفاء الترجمة';
                            
                            // تحميل الترجمة إذا كانت فارغة
                            if (el.textContent.trim() === '') {
                                const ayahItem = el.closest('.ayah-item');
                                const ayahNumber = ayahItem.getAttribute('data-ayah-number');
                                loadAyahTranslation(surahId, ayahNumber, el);
                            }
                        } else {
                            el.classList.add('hidden');
                            this.textContent = 'عرض الترجمة';
                        }
                    });
                });
                
                // تغيير حجم الخط
                document.getElementById('font-size-select').addEventListener('change', function() {
                    const container = document.getElementById('ayahs-container');
                    container.className = 'ayahs-container ' + this.value;
                });
                
                // إضافة وظائف للأزرار
                document.querySelectorAll('.play-btn').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const ayahItem = this.closest('.ayah-item');
                        const ayahNumber = ayahItem.getAttribute('data-ayah-number');
                        playAyahAudio(surahId, ayahNumber);
                    });
                });
                
                document.querySelectorAll('.bookmark-btn').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const ayahItem = this.closest('.ayah-item');
                        const ayahNumber = ayahItem.getAttribute('data-ayah-number');
                        toggleBookmark(surahId, ayahNumber, ayahItem.querySelector('.ayah-text').textContent);
                        
                        // تغيير لون الزر
                        this.classList.toggle('active');
                    });
                });
                
                document.querySelectorAll('.copy-btn').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const ayahText = this.closest('.ayah-item').querySelector('.ayah-text').textContent;
                        copyToClipboard(ayahText);
                        showToast('تم نسخ الآية', 'success');
                    });
                });
                
                document.querySelectorAll('.share-btn').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const ayahText = this.closest('.ayah-item').querySelector('.ayah-text').textContent;
                        const surahName = document.querySelector('.surah-header h2').textContent;
                        
                        if (navigator.share) {
                            navigator.share({
                                title: `سورة ${surahName}`,
                                text: ayahText
                            })
                            .then(() => console.log('تمت المشاركة بنجاح'))
                            .catch((error) => console.log('خطأ في المشاركة:', error));
                        } else {
                            copyToClipboard(ayahText);
                            showToast('تم نسخ الآية، يمكنك مشاركتها الآن', 'info');
                        }
                    });
                });
                
                // أزرار التنقل بين السور
                const prevSurahBtn = document.getElementById('prev-surah');
                if (prevSurahBtn) {
                    prevSurahBtn.addEventListener('click', function() {
                        const surahId = this.getAttribute('data-surah-id');
                        loadSurahContent(surahId);
                    });
                }
                
                const nextSurahBtn = document.getElementById('next-surah');
                if (nextSurahBtn) {
                    nextSurahBtn.addEventListener('click', function() {
                        const surahId = this.getAttribute('data-surah-id');
                        loadSurahContent(surahId);
                    });
                }
                
                // العلامات المرجعية - تحقق مما إذا كانت الآيات مرجعية بالفعل
                markBookmarkedAyahs(surahId);
            } else {
                throw new Error('لم يتم العثور على بيانات السورة');
            }
        } catch (error) {
            console.error('خطأ في تحميل محتوى السورة:', error);
            document.getElementById('surah-view').innerHTML = `
                <div class="error-container">
                    <p class="error-message">حدث خطأ أثناء تحميل محتوى السورة: ${error.message}</p>
                    <button id="back-to-quran-error" class="tasbih-btn">العودة إلى قائمة السور</button>
                </div>
            `;
            
            document.getElementById('back-to-quran-error').addEventListener('click', function() {
                document.getElementById('quran').classList.remove('hidden');
                document.getElementById('surah-view').classList.add('hidden');
            });
        }
    };
    
    const loadAyahTranslation = async function(surahId, ayahNumber, element) {
        try {
            // عرض مؤشر التحميل
            element.innerHTML = '<div class="loader small"></div>';
            
            const response = await fetchWithTimeout(`${QURAN_API_BASE_URL}/ayah/${surahId}:${ayahNumber}/en.asad`, {
                timeout: 5000
            });
            
            if (!response.ok) {
                throw new Error(`خطأ في الاستجابة: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.code === 200 && data.data) {
                element.textContent = data.data.text;
            } else {
                throw new Error('لم يتم العثور على ترجمة الآية');
            }
        } catch (error) {
            console.error('خطأ في تحميل ترجمة الآية:', error);
            element.textContent = 'تعذر تحميل الترجمة';
        }
    };
    
    const playAyahAudio = function(surahId, ayahNumber) {
        // إنشاء عنصر الصوت إذا لم يكن موجودًا
        let audioPlayer = document.getElementById('ayah-audio-player');
        if (!audioPlayer) {
            audioPlayer = document.createElement('audio');
            audioPlayer.id = 'ayah-audio-player';
            audioPlayer.controls = true;
            audioPlayer.className = 'audio-player';
            
            // إضافة عنصر الصوت إلى الصفحة
            const audioContainer = document.createElement('div');
            audioContainer.id = 'audio-container';
            audioContainer.className = 'audio-container';
            
            const audioTitle = document.createElement('p');
            audioTitle.id = 'audio-title';
            audioTitle.className = 'audio-title';
            
            const closeAudioBtn = document.createElement('button');
            closeAudioBtn.className = 'close-audio-btn';
            closeAudioBtn.innerHTML = '<i class="fas fa-times"></i>';
            closeAudioBtn.addEventListener('click', function() {
                audioContainer.classList.add('hidden');
                audioPlayer.pause();
            });
            
            audioContainer.appendChild(audioTitle);
            audioContainer.appendChild(audioPlayer);
            audioContainer.appendChild(closeAudioBtn);
            
            document.body.appendChild(audioContainer);
        }
        
        // تحديث عنوان الصوت
        const surahName = document.querySelector('.surah-header h2').textContent;
        document.getElementById('audio-title').textContent = `سورة ${surahName} - آية ${ayahNumber}`;
        
        // تحديث مصدر الصوت
        audioPlayer.src = `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${(surahId - 1) * 1000 + parseInt(ayahNumber)}.mp3`;
        
        // إظهار مشغل الصوت
