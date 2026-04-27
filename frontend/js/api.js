const API_URL = "http://localhost:5088/api/memes";

async function getAllMemes() {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error("Не удалось загрузить мемы");
    }
    return response.json();
}

async function addMeme(title, category, rating) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: title,
            category: category,
            rating: rating,
        }),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Не удалось добавить мем");
    }
    return response.json();
}

async function deleteMeme(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Не удалось удалить мем");
    }
}