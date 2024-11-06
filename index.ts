import { BaseProduct } from './types/BaseProduct';
import { Electronics } from './types/Electronics';
import { Clothing } from './types/Clothing';
import { Book } from './types/Book';

//Пошук товарів за id
const findProduct = <T extends BaseProduct>(products: T[], id: number): T | undefined => {
    const product = products.find(product => product.id === id);
    if (!product) {
        console.log(`Товар з id ${id} не знайдено.`);
        return undefined;
    }
    return product;
};

//Фільтрація товарів за ціною
const filterByPrice = <T extends BaseProduct>(products: T[], maxPrice: number): T[] => {
    return products.filter(product => product.price <= maxPrice);
};

//Типи кошика
type CartItem<T> = {
    product: T;
    quantity: number;
};

//Додавання товару в кошик
const addToCart = <T extends BaseProduct>(
    cart: CartItem<T>[],
    product: T,
    quantity: number
): CartItem<T>[] => {
    const existingItem = cart.find(item => item.product.id === product.id);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ product, quantity });
    }
    return cart;
};

//Підрахунок загальної вартості товарів у кошику
const calculateTotal = <T extends BaseProduct>(cart: CartItem<T>[]): number => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
};

//Створення товарів
const electronics: Electronics[] = [
    {
        id: 1,
        name: "Phone",
        price: 8060,
        description: "Good phone",
        rating: 7,
        category: 'electronics',
        warranty: "2 years",
        brand: "Lenovo"
    },
    {
        id: 2,
        name: "Computer",
        price: 20480,
        description: "Good computer",
        rating: 8,
        category: 'electronics',
        warranty: "3 years",
        brand: "Samsung"
    }
];

const clothing: Clothing[] = [
    {
        id: 3,
        name: "Jeans",
        price: 6524,
        description: "Good jeans",
        rating: 8,
        category: 'clothing',
        size: "M",
        material: "Denim"
    },
    {
        id: 4,
        name: "T-shirt",
        price: 3806,
        description: "Good shirt",
        rating: 9,
        category: 'clothing',
        size: "L",
        material: "Cotton"
    }
];

const book: Book[] = [
    {
        id: 5,
        name: "Malibu Rising",
        price: 640,
        description: "Good book",
        rating: 9,
        category: 'book',
        author: "Sergo",
        pages: 300
    },
    {
        id: 6,
        name: "The Ink Black Heart",
        price: 530,
        description: "Good book",
        rating: 8,
        category: 'book',
        author: "Vadim",
        pages: 250
    }
];

//Тестування функцій
const phone = findProduct(electronics, 1);
console.log("Знайдений товар:", phone);
const jeans = findProduct(clothing, 7);
console.log("Знайдений товар:", jeans);


const filteredElectronics = filterByPrice(electronics, 100000);
console.log("Фільтрована електроніка:", filteredElectronics);

let cart: CartItem<BaseProduct>[] = [];
if (phone) {
    cart = addToCart(cart, phone, 2);
}

console.log("Вміст кошика:", cart);

const total = calculateTotal(cart);
console.log("Загальна вартість кошика:", total);