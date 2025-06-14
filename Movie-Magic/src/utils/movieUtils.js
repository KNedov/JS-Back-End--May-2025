export function getCategoryViewData(category) {
    const options = [
        { value: "tv-show", title: "TV Show" },
        { value: "animation", title: "Animation" },
        { value: "movie", title: "Movie" },
        { value: "documentary", title: "Documentary" },
        { value: "short-film", title: "Short Film" },
    ];
    const result = options.map((o) => {
        return {
            ...o,
            selected: o.value === category,
        };
    });
    return result;
}