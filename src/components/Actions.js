
// export const DeleteSomething = async (resource, somethings, setSomethings, id) => {

//     try {
//         console.log("Resource:", resource);
//         console.log("Something:", somethings);
//         console.log("ID:", id);

//         const url = `http://localhost:3001/${resource}/${id}`;

//         const response = await fetch(url, {
//             method: 'DELETE',
//         });

//         if (!response.ok) {
//             throw new Error(`Failed to delete. Status: ${response.status}`);
//         }

//         setSomethings(somethings.filter((s) => s.id !== id));
//     } catch (error) {
//         console.error("Error deleting something:", error);
//     }
// }

export const SortSomething = (somethings, sortCriterion) => {

    return somethings?.length ? [...somethings].sort((a, b) => {
        switch (sortCriterion) {
            case 'id':
                return a.id - b.id;
            case 'alphabetical':
                return a.title.localeCompare(b.title);
            case 'completed':
                return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
            case 'random':
                return Math.random() - 0.5;
            default:
                return 0;
        }
    }) : [];
}

export const FilterSomething = (searchCriterion, sortedSomethings, searchValue) => {

    return sortedSomethings.filter((st) => {
        switch (searchCriterion) {
            case 'id':
                return `${st.id}`.includes(searchValue);
            case 'title':
                return st.title.toLowerCase().includes(searchValue.toLowerCase());
            case 'completed':
                return searchValue === 'true' ? st.completed
                    : searchValue === 'false' ? !st.completed : true;
            default:
                return true;
        }
    });
}
