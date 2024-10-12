export const recipes = [
    {
        _id: 1,
        title: "Classic Chocolate Chip Cookies",
        description: "The perfect chewy chocolate chip cookie recipe",
        category: "desserts",
        image: "/images/chocolate-chip-cookies.jpeg",
        likes: [1,2],
        createdAt: "Fri Nov 04 2023",
        chef: {
            username: "Sarah Gad",
            image: "/images/user-avatar.png"
        },
        ingredients: "flour, sugar, butter, chocolate chips, eggs, vanilla extract",
        instructions: "Cream butter and sugar. Add eggs and vanilla. Mix in dry ingredients. Fold in chocolate chips. Bake at 350°F for 10-12 minutes",
        cookTime: 12
    },
    {
        _id: 2,
        title: "Spicy Thai Green Curry",
        description: "Authentic Thai green curry with vegetables",
        category: "main dishes",
        image: "/images/thai-green-curry.jpeg",
        likes: [1,2,3,4],
        createdAt: "Sun Oct 06 2023",
        chef: {
            username: "Abrar Gomaa",
            image: "/images/user-avatar.png"
        },
        ingredients: "green curry paste, coconut milk, chicken, vegetables, fish sauce, lime leaves",
        instructions: "Fry curry paste in oil. Add coconut milk and bring to simmer. Add chicken and cook until done. Add vegetables and simmer until tender. Season with fish sauce and garnish with lime leaves",
        cookTime: 30
    },
    {
        _id: 3,
        title: "Fresh Summer Gazpacho",
        description: "Cool and refreshing Spanish tomato soup",
        category: "soups",
        image: "/images/gazpacho.jpeg",
        likes: [],
        createdAt: "Fri Oct 08 2023",
        chef: {
            username: "Sarah Gad",
            image: "/images/user-avatar.png"
        },
        ingredients: "tomatoes, cucumber, bell pepper, garlic, olive oil, vinegar",
        instructions: "Roughly chop vegetables. Blend all ingredients until smooth. Chill for at least 2 hours. Serve cold with garnishes",
        cookTime: 15
    },
    {
        _id: 4,
        title: "Homemade Sourdough Bread",
        description: "Crusty artisan sourdough bread recipe",
        category: "baking",
        image: "/images/sourdough-bread.jpeg",
        likes: [1,2,3,4,5],
        createdAt: "Mon Jul 06 2023",
        chef: {
            username: "Abrar Gomaa",
            image: "/images/user-avatar.png"
        },
        ingredients: "sourdough starter, flour, water, salt",
        instructions: "Mix ingredients and knead. Let rise for 4-6 hours. Shape and proof for 2-3 hours. Bake in a Dutch oven at 450°F for 45 minutes",
        cookTime: 45
    },
    {
        _id: 5,
        title: "Colorful Mediterranean Salad",
        description: "Healthy and vibrant salad with feta and olives",
        category: "salads",
        image: "/images/mediterranean-salad.jpeg",
        likes: [1,2,3],
        createdAt: "Fri Oct 12 2023",
        chef: {
            username: "Sarah Gad",
            image: "/images/user-avatar.png"
        },
        ingredients: "mixed greens, tomatoes, cucumber, feta cheese, olives, red onion, olive oil, lemon juice",
        instructions: "Chop vegetables. Combine all ingredients in a bowl. Dress with olive oil and lemon juice. Toss and serve immediately",
        cookTime: 10
    },
    {
        _id: 6,
        title: "Perfect Cappuccino at Home",
        description: "Tips for making barista-quality cappuccino",
        category: "beverages",
        image: "/images/cappuccino.jpg",
        likes: [1],
        createdAt: "Fri Oct 21 2023",
        chef: {
            username: "Abrar Gomaa",
            image: "/images/user-avatar.png"
        },
        ingredients: "espresso, milk, cocoa powder (optional)",
        instructions: "Brew a shot of espresso. Steam milk until frothy. Pour espresso into a cup. Add steamed milk, holding back the foam. Top with milk foam and dust with cocoa if desired",
        cookTime: 5
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
