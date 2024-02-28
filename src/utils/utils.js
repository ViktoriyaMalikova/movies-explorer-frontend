export function handleFilter(keyword, movies, isCheck) {
    const filteredMovies = movies.filter((item) => {

        const nameRu = item.nameRU.toLowerCase().includes(keyword.toLowerCase());
        const nameEn = item.nameEN.toLowerCase().includes(keyword.toLowerCase());
        const shortMovie = item.duration <= 40;

        return isCheck ? (nameRu && shortMovie) || (nameEn && shortMovie) : nameRu || nameEn;
    })
    return filteredMovies;
}