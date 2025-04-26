import useHttp from "../components/hooks/useHttp.js";
import Meal from "./Meal.jsx";
// import { MEALS } from "../data/meals.js";

const menus = ["Egyptian", "Italian", "Greek", "Turkish", "French"];

const generateRandomPrice = () => {
    return (Math.random() * 200).toFixed(2);
};

const generateRandomMenu = () => {
    return Math.round(Math.random() * 4);
};

const menu = menus[generateRandomMenu()];
const menuAPI = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${menu}`;

const Meals = () => {

    const { data: meals, isLoading, error } = useHttp(menuAPI, []);

    if (isLoading) {
        return (
            <p className="mx-auto text-2xl text-white">Loading Meals...</p>
        )
    }

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center text-2xl text-white">
                <p>An Error has occurred...</p>
                <p>Please try again later.</p>
            </div>
        )
    }

    return (
        <>
            {/* {isLoading && <p className="mx-auto text-2xl text-white">Loading Meals...</p>}

            {error && <div className="flex flex-col justify-center items-center text-2xl text-white">
                <p>An Error has occurred...</p>
                <p>Please try again later.</p>
            </div>} */}

            {/* {meals && !isLoading && !error && <h2 className="text-2xl text-white font-bold m-3">{menu} Menu</h2>} */}

            {meals && (
                <>
                    <h2 className="text-2xl text-white font-bold m-3">{menu} Menu</h2>
                    <div className="grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-10 m-3">
                        {meals.map((meal) => (
                            <Meal key={meal.idMeal} meal={{ ...meal, price: generateRandomPrice() }} />
                        ))}
                    </div>
                </>
            )}
        </>
    )
}

export default Meals;