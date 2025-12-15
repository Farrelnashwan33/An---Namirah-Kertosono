// ============================================
// AN NAMIROH Travel - Chatbot Assistant
// Online API + Offline Fallback
// ============================================

// Chatbot Configuration
const CHATBOT_CONFIG = {
    apiUrl: 'https://api.openai.com/v1/chat/completions', // Ganti dengan API endpoint Anda
    apiKey: 'YOUR_API_KEY', // Ganti dengan API key Anda
    useOnline: true, // Set false untuk hanya menggunakan offline mode
    offlineMode: true, // Fallback ke offline jika API gagal
    soundEnabled: true, // Enable text-to-speech
    speechRate: 1.2, // Kecepatan suara (1.0 = normal, 1.2 = lebih cepat)
    speechLang: 'id-ID' // Bahasa Indonesia
};

// Speech Synthesis
let speechSynthesis = null;
let currentUtterance = null;
let userSoundPreference = true; // Store user's sound preference

// Offline Responses Database
const OFFLINE_RESPONSES = {
    'paket': {
        message: 'Kami memiliki beberapa paket umroh yang bisa Anda pilih:\n\n• Paket Umroh Reguler - Rp 32.2 Jt (9 Hari)\n• Paket Umroh Plus - Rp 34.45 Jt (12 Hari)\n• Paket Umroh VIP - Rp 38.3 Jt (16 Hari)\n\nSemua paket sudah termasuk tiket pesawat, visa, hotel, makan, dan transportasi.\n\nUntuk informasi lebih detail atau pemesanan, silakan hubungi kami di 0812-5967-3929 (Bapak Irjik Indra Gunawan) atau klik icon WhatsApp di header chatbot ini.',
        keywords: ['paket', 'harga', 'biaya', 'tarif', 'price', 'cost']
    },
    'jadwal': {
        message: 'Jadwal keberangkatan umroh kami tersedia sepanjang tahun. Untuk informasi jadwal terbaru dan ketersediaan kursi, silakan hubungi marketing kami di 0812-5967-3929 (Bapak Irjik Indra Gunawan) atau kunjungi kantor kami di Jl. Bengkoang No. 28 Kertosono. Kami akan membantu Anda memilih jadwal yang paling sesuai.',
        keywords: ['jadwal', 'keberangkatan', 'tanggal', 'schedule', 'kapan', 'waktu'],
        speakText: 'Jadwal keberangkatan umroh kami tersedia sepanjang tahun. Untuk informasi jadwal terbaru dan ketersediaan kursi, silakan hubungi marketing kami atau kunjungi kantor kami di Jalan Bengkoang Nomor dua puluh delapan Kertosono. Kami akan membantu Anda memilih jadwal yang paling sesuai.'
    },
    'daftar': {
        message: 'Untuk mendaftar, Anda bisa:\n\n1. Hubungi langsung marketing kami: 0812-5967-3929 (Bapak Irjik Indra Gunawan)\n2. Kunjungi kantor kami di Jl. Bengkoang No. 28 Kertosono\n3. Klik icon WhatsApp di header chatbot ini untuk chat langsung\n\nKami akan membantu proses pendaftaran Anda dengan ramah dan profesional.',
        keywords: ['daftar', 'pendaftaran', 'registrasi', 'cara daftar', 'bagaimana daftar', 'register', 'mendaftar'],
        speakText: 'Untuk mendaftar, Anda bisa hubungi langsung marketing kami, kunjungi kantor kami di Jalan Bengkoang Nomor dua puluh delapan Kertosono, atau klik icon WhatsApp di header chatbot ini untuk chat langsung. Kami akan membantu proses pendaftaran Anda dengan ramah dan profesional.'
    },
    'kontak': {
        message: 'Kontak AN NAMIROH Travel:\n\n📞 Telepon: 0812-5967-3929\n👤 Marketing: Bapak Irjik Indra Gunawan\n📍 Alamat: Jl. Bengkoang No. 28 Kertosono\n\nKami siap melayani Anda setiap hari. Jangan ragu untuk menghubungi kami via WhatsApp dengan klik icon WhatsApp di header chatbot ini!',
        keywords: ['kontak', 'telepon', 'alamat', 'lokasi', 'hubungi', 'contact', 'nomor', 'hp'],
        speakText: 'Kontak An Namirah Travel. Telepon nomor yang tersedia. Marketing Bapak Irjik Indra Gunawan. Alamat Jalan Bengkoang Nomor dua puluh delapan Kertosono. Kami siap melayani Anda setiap hari. Jangan ragu untuk menghubungi kami via WhatsApp dengan klik icon WhatsApp di header chatbot ini.'
    },
    'fasilitas': {
        message: 'Fasilitas yang termasuk dalam paket umroh kami:\n\n✓ Tiket pesawat pulang pergi kelas ekonomi\n✓ Visa Umroh\n✓ Hotel bintang 3-4 di Makkah & Madinah\n✓ Makan 3x sehari (buffet)\n✓ Transportasi AC selama di Arab Saudi\n✓ Zamzam 5 liter per jamaah\n✓ Muthawif/Guide berpengalaman\n✓ Dokumentasi foto & video\n✓ Tips hotel & restoran\n✓ Asuransi perjalanan\n\nUntuk informasi lebih lanjut, hubungi 0812-5967-3929.',
        keywords: ['fasilitas', 'include', 'inklusi', 'apa saja', 'facility', 'fitur'],
        speakText: 'Fasilitas yang termasuk dalam paket umroh kami adalah tiket pesawat pulang pergi kelas ekonomi, visa umroh, hotel bintang tiga sampai empat di Makkah dan Madinah, makan tiga kali sehari buffet, transportasi AC selama di Arab Saudi, zamzam lima liter per jamaah, muthawif atau guide berpengalaman, dokumentasi foto dan video, tips hotel dan restoran, serta asuransi perjalanan. Untuk informasi lebih lanjut, hubungi nomor yang tersedia.'
    },
    'default': {
        message: 'Terima kasih atas pertanyaan Anda. Saya adalah Asisten AN NAMIROH Travel. Saya bisa membantu Anda dengan informasi tentang:\n\n• Paket Umroh & Harga\n• Jadwal Keberangkatan\n• Cara Pendaftaran\n• Fasilitas Paket\n• Kontak & Lokasi\n\nSilakan tanyakan apa yang ingin Anda ketahui, atau klik tombol cepat di bawah untuk pertanyaan umum. Untuk chat langsung dengan admin, klik icon WhatsApp di header chatbot ini.',
        speakText: 'Terima kasih atas pertanyaan Anda. Saya adalah Asisten An Namirah Travel. Saya bisa membantu Anda dengan informasi tentang paket umroh dan harga, jadwal keberangkatan, cara pendaftaran, fasilitas paket, kontak dan lokasi. Silakan tanyakan apa yang ingin Anda ketahui, atau klik tombol cepat di bawah untuk pertanyaan umum.'
    }
};

// Initialize Chatbot
document.addEventListener('DOMContentLoaded', function() {
    initChatbot();
});

function initChatbot() {
    // Initialize Speech Synthesis
    if ('speechSynthesis' in window) {
        speechSynthesis = window.speechSynthesis;
    }
    
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');
    const quickButtons = document.querySelectorAll('.quick-btn');
    const chatbotModal = document.getElementById('chatbotModal');
    const soundToggle = document.getElementById('soundToggle');
    
    // Sound toggle button
    if (soundToggle) {
        soundToggle.addEventListener('click', toggleSound);
        updateSoundToggleIcon();
    }
    
    // When modal is opened - enable sound based on user preference
    chatbotModal.addEventListener('shown.bs.modal', function() {
        // Re-enable sound when modal opens (based on user preference)
        CHATBOT_CONFIG.soundEnabled = userSoundPreference;
        updateSoundToggleIcon();
        
        // Welcome message
        if (document.getElementById('chatbotMessages').children.length === 0) {
            const welcomeMsg = 'Assalamu\'alaikum! 👋\n\nSaya Asisten AN NAMIROH Travel. Ada yang bisa saya bantu terkait paket umroh atau haji? Silakan tanyakan atau klik tombol cepat di bawah.\n\nUntuk chat langsung dengan admin, klik icon WhatsApp di header ini.';
            const welcomeSpeak = 'Assalamu\'alaikum. Saya Asisten An Namirah Travel. Ada yang bisa saya bantu terkait paket umroh atau haji? Silakan tanyakan atau klik tombol cepat di bawah. Untuk chat langsung dengan admin, klik icon WhatsApp di header ini.';
            addMessage('bot', welcomeMsg);
            // Speak welcome message if sound is enabled
            setTimeout(() => {
                if (CHATBOT_CONFIG.soundEnabled && speechSynthesis) {
                    speakMessage(welcomeSpeak);
                }
            }, 500);
        }
    });
    
    // When modal is closed - stop all sounds
    chatbotModal.addEventListener('hidden.bs.modal', function() {
        // Stop all speech synthesis when modal closes
        if (speechSynthesis && speechSynthesis.speaking) {
            speechSynthesis.cancel();
            currentUtterance = null;
        }
        // Disable sound when modal is closed (but keep user preference)
        CHATBOT_CONFIG.soundEnabled = false;
    });
    
    // Send button click
    chatbotSend.addEventListener('click', sendMessage);
    
    // Enter key press
    chatbotInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Quick buttons
    quickButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const question = this.getAttribute('data-question');
            chatbotInput.value = question;
            sendMessage();
        });
    });
}

// Send Message
async function sendMessage() {
    const input = document.getElementById('chatbotInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message
    addMessage('user', message);
    input.value = '';
    
    // Show loading
    const loadingId = showLoading();
    
    try {
        let response = '';
        
        // Try online API first
        if (CHATBOT_CONFIG.useOnline) {
            try {
                response = await callOnlineAPI(message);
            } catch (error) {
                console.log('Online API failed, using offline mode:', error);
                if (CHATBOT_CONFIG.offlineMode) {
                    response = getOfflineResponse(message);
                } else {
                    throw error;
                }
            }
        } else {
            // Use offline mode directly
            response = getOfflineResponse(message);
        }
        
        // Remove loading and add bot response
        removeLoading(loadingId);
        setTimeout(() => {
            addMessage('bot', response);
            // Speak bot response if sound is enabled
            if (CHATBOT_CONFIG.soundEnabled && speechSynthesis) {
                // Get optimized speak text if available
                const offlineResponse = getOfflineResponseData(message);
                const textToSpeak = offlineResponse && offlineResponse.speakText ? offlineResponse.speakText : response;
                speakMessage(textToSpeak);
            }
        }, 500);
        
    } catch (error) {
        removeLoading(loadingId);
        addMessage('bot', 'Maaf, terjadi kesalahan. Silakan coba lagi atau hubungi kami langsung di 0812-5967-3929 (Bapak Irjik Indra Gunawan).');
        console.error('Chatbot error:', error);
    }
}

// Call Online API
async function callOnlineAPI(message) {
    // Example using OpenAI API (ganti dengan API endpoint Anda)
    const response = await fetch(CHATBOT_CONFIG.apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${CHATBOT_CONFIG.apiKey}`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: 'Anda adalah asisten virtual untuk AN NAMIROH Travel, biro perjalanan umroh dan haji. Berikan informasi yang ramah, profesional, dan membantu tentang paket umroh, jadwal, pendaftaran, dan kontak. Kontak: 0812-5967-3929, Alamat: Jl. Bengkoang No. 28 Kertosono, Marketing: Bapak Irjik Indra Gunawan. Selalu arahkan untuk menghubungi via WhatsApp jika diperlukan.'
                },
                {
                    role: 'user',
                    content: message
                }
            ],
            max_tokens: 200
        })
    });
    
    if (!response.ok) {
        throw new Error('API request failed');
    }
    
    const data = await response.json();
    return data.choices[0].message.content;
}

// Get Offline Response
function getOfflineResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Check each response category
    for (const [key, data] of Object.entries(OFFLINE_RESPONSES)) {
        if (key === 'default') continue;
        
        if (data.keywords.some(keyword => lowerMessage.includes(keyword))) {
            return data.message;
        }
    }
    
    // Default response
    return OFFLINE_RESPONSES.default.message;
}

// Get Offline Response Data (for getting speakText)
function getOfflineResponseData(message) {
    const lowerMessage = message.toLowerCase();
    
    // Check each response category
    for (const [key, data] of Object.entries(OFFLINE_RESPONSES)) {
        if (key === 'default') continue;
        
        if (data.keywords.some(keyword => lowerMessage.includes(keyword))) {
            return data;
        }
    }
    
    // Default response
    return OFFLINE_RESPONSES.default;
}

// Add Message to Chat
function addMessage(sender, text) {
    const messagesContainer = document.getElementById('chatbotMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;
    
    const bubble = document.createElement('div');
    bubble.className = `message-bubble ${sender}`;
    // Convert newlines to <br>
    bubble.innerHTML = text.replace(/\n/g, '<br>');
    
    messageDiv.appendChild(bubble);
    messagesContainer.appendChild(messageDiv);
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Show Loading Indicator
function showLoading() {
    const messagesContainer = document.getElementById('chatbotMessages');
    const loadingDiv = document.createElement('div');
    const loadingId = 'loading-' + Date.now();
    loadingDiv.id = loadingId;
    loadingDiv.className = 'chat-message bot';
    
    const bubble = document.createElement('div');
    bubble.className = 'message-bubble bot chat-loading';
    bubble.innerHTML = '<span></span><span></span><span></span>';
    
    loadingDiv.appendChild(bubble);
    messagesContainer.appendChild(loadingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    return loadingId;
}

// Remove Loading Indicator
function removeLoading(loadingId) {
    const loadingElement = document.getElementById(loadingId);
    if (loadingElement) {
        loadingElement.remove();
    }
}

// Text-to-Speech Function
function speakMessage(text) {
    if (!speechSynthesis || !CHATBOT_CONFIG.soundEnabled) {
        return;
    }
    
    // Stop any ongoing speech
    if (currentUtterance && speechSynthesis.speaking) {
        speechSynthesis.cancel();
    }
    
    // Clean text for better speech - Fix pronunciation issues
    // IMPORTANT: Replace AN NAMIROH FIRST before other processing
    let cleanText = text
        // Fix AN NAMIROH pronunciation FIRST (most specific to least specific)
        .replace(/Asisten\s+AN\s+NAMIROH\s+Travel/gi, 'Asisten An Namirah Travel')
        .replace(/Asisten\s+AN\s+NAMIROH/gi, 'Asisten An Namirah')
        .replace(/AN\s+NAMIROH\s+Travel/gi, 'An Namirah Travel')
        .replace(/AN\s+NAMIROH/gi, 'An Namirah')
        // Other cleaning
        .replace(/\n/g, '. ') // Replace newlines with periods
        .replace(/[📞👤📍✓•👋]/g, '') // Remove emojis
        .replace(/\*\*(.*?)\*\*/g, '$1') // Remove markdown bold
        .replace(/Rp\s*(\d+)[.,]?(\d*)\s*Jt/gi, function(match, p1, p2) {
            // Convert price to natural speech: Rp 32.2 Jt -> rupiah tiga puluh dua koma dua juta
            const num = parseFloat(p1 + '.' + (p2 || '0'));
            if (num < 10) {
                return 'rupiah ' + num.toString().replace('.', ' koma ') + ' juta';
            }
            return 'rupiah ' + p1 + (p2 ? ' koma ' + p2 : '') + ' juta';
        })
        .replace(/0812-?5967-?3929/g, 'nomor yang tersedia') // Simplify phone number
        .replace(/Jl\./gi, 'Jalan') // Jl. to Jalan
        .replace(/No\./gi, 'Nomor') // No. to Nomor
        .replace(/\s+/g, ' ') // Remove extra spaces
        .trim();
    
    if (!cleanText) return;
    
    try {
        // Create utterance
        currentUtterance = new SpeechSynthesisUtterance(cleanText);
        
        // Configure voice settings
        currentUtterance.lang = CHATBOT_CONFIG.speechLang;
        currentUtterance.rate = CHATBOT_CONFIG.speechRate;
        currentUtterance.pitch = 1.0;
        currentUtterance.volume = 1.0;
        
        // Try to use Indonesian voice if available
        if (speechSynthesis.getVoices().length > 0) {
            const voices = speechSynthesis.getVoices();
            const indonesianVoice = voices.find(voice => 
                voice.lang.includes('id') || voice.lang.includes('ID')
            );
            
            if (indonesianVoice) {
                currentUtterance.voice = indonesianVoice;
            }
        }
        
        // Event handlers
        currentUtterance.onend = function() {
            currentUtterance = null;
        };
        
        currentUtterance.onerror = function(event) {
            console.log('Speech synthesis error:', event.error);
            currentUtterance = null;
        };
        
        // Speak
        speechSynthesis.speak(currentUtterance);
    } catch (error) {
        console.log('Error in speakMessage:', error);
        currentUtterance = null;
    }
}

// Toggle Sound Function
function toggleSound() {
    CHATBOT_CONFIG.soundEnabled = !CHATBOT_CONFIG.soundEnabled;
    userSoundPreference = CHATBOT_CONFIG.soundEnabled; // Save user preference
    updateSoundToggleIcon();
    
    // Stop speech if disabled
    if (!CHATBOT_CONFIG.soundEnabled && speechSynthesis && speechSynthesis.speaking) {
        speechSynthesis.cancel();
        currentUtterance = null;
    }
}

// Update Sound Toggle Icon
function updateSoundToggleIcon() {
    const soundToggle = document.getElementById('soundToggle');
    if (!soundToggle) return;
    
    const icon = soundToggle.querySelector('i');
    if (icon) {
        if (CHATBOT_CONFIG.soundEnabled) {
            icon.className = 'bi bi-volume-up-fill';
            soundToggle.setAttribute('title', 'Nonaktifkan suara');
        } else {
            icon.className = 'bi bi-volume-mute-fill';
            soundToggle.setAttribute('title', 'Aktifkan suara');
        }
    }
}

// Load voices when available
if ('speechSynthesis' in window) {
    // Chrome loads voices asynchronously
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = function() {
            // Voices loaded
        };
    }
}

// Input Sanitization
function sanitizeInput(input) {
    return input
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
}

