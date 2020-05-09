import dummydata from "../dummyData";
export const fetchFoodData = () => {
    return fetch('http://demo9859925.mockable.io')
        .then((resp) => resp.json())
        .then((res) => res)
        .catch(err => dummydata)
}