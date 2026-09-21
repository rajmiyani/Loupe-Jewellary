const Category = require("../models/category.model");
const { slugify } = require("../services/category.service");

const DEFAULT_CATEGORIES = [
    {
        name: "Rings",
        level: 1,
        items: [
            "Engagement Rings",
            "Solitaire Rings",
            "Diamond Rings",
            "Eternity Rings",
            "Halo Rings",
            "Daily Wear Rings",
            "Cocktail Rings"
        ]
    },
    {
        name: "Earrings",
        level: 1,
        items: [
            "Diamond Studs",
            "Hoop & Huggies",
            "Dangle & Drops",
            "Ear Climbers",
            "Ear Cuffs",
            "Chandeliers",
            "Jhumkas"
        ]
    },
    {
        name: "Bracelets",
        level: 1,
        items: [
            "Tennis Bracelets",
            "Chain Bracelets",
            "Cuff Bracelets",
            "Charm Bracelets",
            "Bangles",
            "Anklets"
        ]
    },
    {
        name: "Necklaces",
        level: 1,
        items: [
            "Diamond Necklaces",
            "Pendant Necklaces",
            "Diamond Pendants",
            "Solitaire Pendants",
            "Tennis Necklaces",
            "Choker Necklaces"
        ]
    },
    {
        name: "Pendants",
        level: 1,
        items: [
            "Solitaire Pendants",
            "Gemstone Pendants",
            "Alphabet & Initial Pendants",
            "Diamond Pendants"
        ]
    },
    {
        name: "Mangalsutra",
        level: 1,
        items: [
            "Solitaire Mangalsutra",
            "Modern Mangalsutra",
            "Traditional Mangalsutra"
        ]
    },
    {
        name: "Bangles",
        level: 1,
        items: [
            "Diamond Bangles",
            "Kadas",
            "Stackable Bangles"
        ]
    },
    {
        name: "Chains",
        level: 1,
        items: [
            "Gold Chains",
            "Rope Chains"
        ]
    },
    {
        name: "Nose Pins",
        level: 1,
        items: [
            "Diamond Nose Pins",
            "Gold Nose Pins"
        ]
    }
];

async function ensureDefaultCategoriesExist() {
    try {
        const count = await Category.countDocuments();
        if (count > 0) {
            // Already initialized, but let's make sure top-level categories exist
            for (const catGroup of DEFAULT_CATEGORIES) {
                let topCat = await Category.findOne({
                    $or: [
                        { name: { $regex: new RegExp(`^${catGroup.name}$`, "i") } },
                        { slug: slugify(catGroup.name) }
                    ]
                });

                if (!topCat) {
                    topCat = await Category.create({
                        name: catGroup.name,
                        slug: slugify(catGroup.name),
                        level: 1,
                    });
                }

                for (const itemName of catGroup.items) {
                    const itemSlug = slugify(itemName);
                    let subCat = await Category.findOne({
                        $or: [
                            { name: { $regex: new RegExp(`^${itemName}$`, "i") } },
                            { slug: itemSlug }
                        ],
                        parentCategory: topCat._id
                    });

                    if (!subCat) {
                        await Category.create({
                            name: itemName,
                            slug: itemSlug,
                            parentCategory: topCat._id,
                            level: 2
                        });
                    }
                }
            }
            return;
        }

        console.log("[Seed] Seeding default jewellery categories into database...");
        for (const catGroup of DEFAULT_CATEGORIES) {
            const topCat = await Category.create({
                name: catGroup.name,
                slug: slugify(catGroup.name),
                level: 1
            });

            for (const itemName of catGroup.items) {
                await Category.create({
                    name: itemName,
                    slug: slugify(itemName),
                    parentCategory: topCat._id,
                    level: 2
                });
            }
        }
        console.log("[Seed] Default jewellery categories successfully seeded.");
    } catch (error) {
        console.error("Error seeding default categories:", error?.message || error);
    }
}

module.exports = { ensureDefaultCategoriesExist };
