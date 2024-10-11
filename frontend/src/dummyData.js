export const recipes = [
    {
        _id: 1,
        title: "Classic Chocolate Chip Cookies",
        description: "The perfect chewy chocolate chip cookie recipe",
        category: "desserts",
        image: "/images/chocolate-chip-cookies.jpeg",
        likes: [1,2],
        createdAt: "Fri Nov 04 2023",
        user: {
            username: "Sarah Gad",
            image: "/images/user-avatar.png"
        },
    },
    {
        _id: 2,
        title: "Spicy Thai Green Curry",
        description: "Authentic Thai green curry with vegetables",
        category: "main dishes",
        image: "/images/thai-green-curry.jpeg",
        likes: [1,2,3,4],
        createdAt: "Sun Oct 06 2023",
        user: {
            username: "Abrar Gomaa",
            image: "/images/user-avatar.png"
        }
    },
    {
        _id: 3,
        title: "Fresh Summer Gazpacho",
        description: "Cool and refreshing Spanish tomato soup",
        category: "soups",
        image: "/images/gazpacho.jpeg",
        likes: [],
        createdAt: "Fri Oct 08 2023",
        user: {
            username: "Sarah Gad",
            image: "/images/user-avatar.png"
        }
    },
    {
        _id: 4,
        title: "Homemade Sourdough Bread",
        description: "Crusty artisan sourdough bread recipe",
        category: "baking",
        image: "/images/sourdough-bread.jpeg",
        likes: [1,2,3,4,5],
        createdAt: "Mon Jul 06 2023",
        user: {
            username: "Abrar Gomaa",
            image: "/images/user-avatar.png"
        },
    },
    {
        _id: 5,
        title: "Colorful Mediterranean Salad",
        description: "Healthy and vibrant salad with feta and olives",
        category: "salads",
        image: "/images/mediterranean-salad.jpeg",
        likes: [1,2,3],
        createdAt: "Fri Oct 12 2023",
        user: {
            username: "Sarah Gad",
            image: "/images/user-avatar.png"
        }
    },
    {
        _id: 6,
        title: "Perfect Cappuccino at Home",
        description: "Tips for making barista-quality cappuccino",
        category: "beverages",
        image: "/images/cappuccino.jpg",
        likes: [1],
        createdAt: "Fri Oct 21 2023",
        user: {
            username: "Abrar Gomaa",
            image: "/images/user-avatar.png"
        }
    },
];
export const categories = [
    {
        _id: 1,
        title: 'appetizers',
    },
    {
        _id: 2,
        title: 'main dishes',
    },
    {
        _id: 3,
        title: 'desserts',
    },
    {
        _id: 4,
        title: 'baking',
    },
    {
        _id: 5,
        title: 'salads',
    },
    {
        _id: 6,
        title: 'beverages',
    },
    {
        _id: 7,
        title: 'soups',
    },
];
