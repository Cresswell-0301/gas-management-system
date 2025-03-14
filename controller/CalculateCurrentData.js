function CalculateCurrentData(data, currentPage, itemsPerPage, type = null) {
    if (type === "sales") {
        data = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    return data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
}

export default CalculateCurrentData;
