document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript yüklendi ✅");

    const bookList = document.querySelector(".book-container");
    const categoryButtons = document.querySelectorAll(".category-btn");
    const reminderBtn = document.getElementById("reminderBtn");

   
    if (!bookList) {
        console.error("Hata: `.book-container` bulunamadı ❌");
    }
    if (!categoryButtons.length) {
        console.error("Hata: `.category-btn` butonları bulunamadı ❌");
    }
    if (!reminderBtn) {
        console.warn("Uyarı: Hatırlatıcı butonu bu sayfada yok ❗");
    }
    
    if (!reminderBtn) {
        console.warn("⚠️ Uyarı: Hatırlatıcı butonu bulunamadı. Eğer bu buton bu sayfada olmalıysa, HTML içinde olup olmadığını kontrol edin.");
    } else {
        console.log("✅ Hatırlatıcı butonu bulundu!");

       
        reminderBtn.addEventListener("click", function () {
            alert("📌 Etkinlik hatırlatıcısı başarıyla ayarlandı!");
            console.log("🕒 Hatırlatıcı butonuna tıklandı.");
        });
    }

   
    const isRomanlarPage = document.body.classList.contains("romanlar-page");
    const isHikayelerPage = document.body.classList.contains("hikayeler-page");
    const isListemPage = document.body.classList.contains("listem-page");
    const isAyarlarPage = document.body.classList.contains("ayarlar-page");
    const isHomePage = !isRomanlarPage && !isHikayelerPage && !isListemPage && !isAyarlarPage;

    if (isListemPage && bookList) {
        loadFavoriteBooks();
    }
    //  Tema Değiştirme Fonksiyonu 
    window.toggleTheme = function () {
        const currentTheme = document.body.classList.contains("dark-mode") ? "light" : "dark";
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("theme", currentTheme);
        console.log(`🎨 Tema değiştirildi: ${currentTheme}`);
    };

    
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }

    // Kitap Verilerini Sıfırlama Fonksiyonu
    window.resetLibrary = function () {
        if (confirm("Tüm kitapları silmek istediğinize emin misiniz?")) {
            localStorage.removeItem("books");
            alert("📚 Tüm kitaplar silindi!");
            console.log("📚 Kütüphane sıfırlandı!");
        }
    };

    function loadFavoriteBooks() {
        console.log("📖 Listem sayfası yüklendi, favori kitaplar gösteriliyor...");

        const storedBooks = JSON.parse(localStorage.getItem("books")) || [];
        bookList.innerHTML = "";

        if (storedBooks.length === 0) {
            bookList.innerHTML = "<p class='no-books'>📌 Henüz favori kitap eklenmemiş.</p>";
            return;
        }

        storedBooks.forEach((book, index) => {
            const bookItem = document.createElement("div");
            bookItem.classList.add("book");

            bookItem.innerHTML = `
                <div class="book-icon">📖</div>
                <h4>${book.bookName}</h4>
                <p>${book.authorName}</p>
                <button class="remove-btn" onclick="removeBook(${index})">❌ Kaldır</button>
            `;

            bookList.appendChild(bookItem);
        });

        console.log("📚 Favori kitaplar yüklendi!");
    }

    window.addBook = function () {
        const bookName = document.getElementById("bookName").value.trim();
        const authorName = document.getElementById("authorName").value.trim();

        if (!bookName || !authorName) {
            alert("Lütfen tüm alanları doldurun!");
            return;
        }

        const newBook = {
            bookName,
            authorName
        };

        let storedBooks = JSON.parse(localStorage.getItem("books")) || [];
        storedBooks.push(newBook);
        localStorage.setItem("books", JSON.stringify(storedBooks));

        document.getElementById("bookName").value = "";
        document.getElementById("authorName").value = "";

        loadFavoriteBooks();
        console.log(`📚 Yeni kitap eklendi: ${bookName}`);
    };

    window.removeBook = function(index) {
        let storedBooks = JSON.parse(localStorage.getItem("books")) || [];
        storedBooks.splice(index, 1);
        localStorage.setItem("books", JSON.stringify(storedBooks));
        loadFavoriteBooks();
    };

    //  Kitap Silme Fonksiyonu
    window.removeBook = function(index) {
        let storedBooks = JSON.parse(localStorage.getItem("books")) || [];
        storedBooks.splice(index, 1);
        localStorage.setItem("books", JSON.stringify(storedBooks));
        loadFavoriteBooks();
    };

   
    const featuredBooksHTML = `
        <div class="book">
            <img src="img/sherlock.jpg" alt="Sherlock Holmes">
            <h4>Sherlock Holmes</h4>
            <p>Arthur Conan Doyle</p>
        </div>
        <div class="book">
            <img src="img/dune.jpg" alt="Dune">
            <h4>Dune</h4>
            <p>Frank Herbert</p>
        </div>
        <div class="book">
            <img src="img/harry_potter.jpg" alt="Harry Potter">
            <h4>Harry Potter</h4>
            <p>J.K. Rowling</p>
        </div>
    `;

    // **Romanlar Kategorileri**
    const books = {
        polisiye: [
            { title: "Sherlock Holmes", author: "Arthur Conan Doyle", img: "img/sherlock.jpg" },
            { title: "On Küçük Zenci", author: "Agatha Christie", img: "img/on_kucuk_zenci.jpg" }
        ],
        "bilim-kurgu": [
            { title: "1984", author: "George Orwell", img: "img/1984.jpg" },
            { title: "Cesur Yeni Dünya", author: "Aldous Huxley", img: "img/cesur_yeni_dunya.jpg" }
        ],
        dram: [
            { title: "Suç ve Ceza", author: "Fyodor Dostoyevski", img: "img/suc_ve_ceza.jpg" },
            { title: "Anna Karenina", author: "Lev Tolstoy", img: "img/anna_karenina.jpg" }
        ],
        fantastik: [
            { title: "Harry Potter", author: "J.K. Rowling", img: "img/harry_potter.jpg" },
            { title: "Yüzüklerin Efendisi", author: "J.R.R. Tolkien", img: "img/yuzuklerin_efendisi.jpg" }
        ],
        ask: [
            { title: "Sessiz Çığlıklar", author: "Yılmaz Kaya", img: "img/sessiz_cigliklar.jpg" }
        ]
    };

    // **Hikayeler Kategorileri**
    const stories = {
        macera: [
            { title: "Robinson Crusoe", author: "Daniel Defoe", img: "img/robinson_crusoe.jpg" },
            { title: "Define Adası", author: "Robert Louis Stevenson", img: "img/define_adasi.jpg" }
        ],
        korku: [
            { title: "Dracula", author: "Bram Stoker", img: "img/dracula.jpg" },
            { title: "Frankenstein", author: "Mary Shelley", img: "img/frankenstein.jpg" }
        ],
        dram: [
            { title: "Sefiller", author: "Victor Hugo", img: "img/sefiller.jpg" },
            { title: "Bülbülü Öldürmek", author: "Harper Lee", img: "img/bulbulu_oldurmek.jpg" }
        ],
        bilimkurgu: [
            { title: "Zaman Makinesi", author: "H.G. Wells", img: "img/zaman_makinesi.jpg" },
            { title: "Ben, Robot", author: "Isaac Asimov", img: "img/ben_robot.jpg" }
        ],
       
    };

  
    let activeData = isRomanlarPage ? books : isHikayelerPage ? stories : null;

    
    if (isHomePage && bookList) {
        bookList.innerHTML = featuredBooksHTML;
        return;
    }

 
    categoryButtons.forEach(button => {
        button.addEventListener("click", function () {
            const category = this.getAttribute("data-category");

            if (!activeData || !activeData[category]) {
                console.error(`Hata: "${category}" kategorisi bulunamadı.`);
                return;
            }

            displayItems(category);

           
            categoryButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");
        });
    });

    // **Kitapları/Hikayeleri Gösterme Fonksiyonu**
    function displayItems(category) {
        if (!bookList) return;

        bookList.innerHTML = ""; 

        activeData[category].forEach(item => {
            const bookItem = document.createElement("div");
            bookItem.classList.add("book");
            bookItem.innerHTML = `
                <img src="${item.img}" alt="${item.title}" class="book-cover">
                <h4>${item.title}</h4>
                <p>${item.author}</p>
            `;
            bookList.appendChild(bookItem);
        });

        console.log(`"${category}" kategorisindeki kitaplar yüklendi ✅`);
    }

   
});
