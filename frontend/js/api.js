const memesGrid = document.getElementById("memesGrid");
const loadingText = document.querySelector(".loading-text");
const titleInput = document.getElementById("titleInput");
const categorySelect = document.getElementById("categorySelect");
const ratingSelect = document.getElementById("ratingSelect");
const addBtn = document.getElementById("addBtn");
const errorMsg = document.getElementById("errorMsg");

function createCardHTML(meme) {
    const date = new Date(meme.addedAt).toLocaleDateString("ru-RU");
    const stars = "⭐".repeat(meme.rating);
    
    return `
        <div class="meme-card">
            <p class="meme-title">${escapeHtml(meme.title)}</p>
            <span class="meme-category">${escapeHtml(meme.category)}</span>
            <p class="meme-rating">${stars}</p>
            <p class="meme-date">Добавлено: ${date}</p>
            <button onclick="handleDelete(${meme.id})">🗑 Удалить</button>
        </div>
    `;
}

function escapeHtml(str) {
    if (!str) return "";
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function renderMemes(memes) {
    // Прячем текст загрузки
    loadingText.style.display = "none";
    
    if (memes.length === 0) {
        memesGrid.innerHTML = '<p class="empty-text">Мемов пока нет. Добавьте первый!</p>';
        return;
    }
   
    memesGrid.innerHTML = memes.map((meme) => createCardHTML(meme)).join("");
}

async function loadMemes() {
    try {
        const memes = await getAllMemes();
        renderMemes(memes);
    } catch (error) {
        loadingText.style.display = "none";
        memesGrid.innerHTML = `<p class="empty-text">Ошибка: ${error.message}</p>`;
    }
}

async function handleAdd() {
    const title = titleInput.value.trim();
    const category = categorySelect.value;
    const rating = parseInt(ratingSelect.value);
    
    errorMsg.textContent = "";
    
    if (!title) {
        errorMsg.textContent = "Введите название мема";
        titleInput.focus();
        return;
    }
   
    addBtn.disabled = true;
    addBtn.textContent = "Добавляем...";
    
    try {
        await addMeme(title, category, rating);
      
        titleInput.value = "";
        
        await loadMemes();
    } catch (error) {
        errorMsg.textContent = error.message;
    } finally {
        
        addBtn.disabled = false;
        addBtn.textContent = "Добавить";
    }
}


window.handleDelete = async function(id) {
    if (!confirm("Удалить этот мем?")) return;
    
    try {
        await deleteMeme(id);
        await loadMemes();
    } catch (error) {
        alert("Ошибка при удалении: " + error.message);
    }
};


addBtn.addEventListener("click", handleAdd);


titleInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        handleAdd();
    }
});


loadMemes();