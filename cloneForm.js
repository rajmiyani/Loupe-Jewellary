const fs = require('fs');
const path = require('path');

const createFormPath = path.join(__dirname, 'Frontend', 'src', 'admin', 'components', 'CreateProductForm.js');
const editFormPath = path.join(__dirname, 'Frontend', 'src', 'admin', 'components', 'EditProductForm.js');

let code = fs.readFileSync(createFormPath, 'utf8');

// 1. Component name and imports
code = code.replace(/CreateProductForm/g, 'EditProductForm');
code = code.replace("import { createProduct } from '../../state/product/Action';", "import { updateProduct, findProductById } from '../../state/product/Action';\nimport { useNavigate, useParams } from 'react-router-dom';");

// 2. Add navigation and params to the functional component start
code = code.replace("const EditProductForm = () => {", "const EditProductForm = () => {\n  const { productId } = useParams();\n  const navigate = useNavigate();");

// 3. Inject useEffect to find by productId
code = code.replace("const dispatch = useDispatch();", "const dispatch = useDispatch();\n  \n  React.useEffect(() => {\n    if (productId) {\n      dispatch(findProductById({ productId }));\n    }\n  }, [productId, dispatch]);");

// 4. Inject useEffect to hydrate state when products.product changes
const hydrateEffect = `
  React.useEffect(() => {
    if (products?.product && products.product._id === productId) {
      const p = products.product;
      setProductData({
        imageUrls: Array.isArray(p.imageUrls) ? p.imageUrls : [],
        title: p.title || '',
        brand: p.brand || 'Loupe Jeweler',
        color: Array.isArray(p.color) ? p.color : (p.color ? [p.color] : []),
        discountedPrice: p.discountedPrice || 0,
        price: p.price || 0,
        discountPercent: p.discountPercent || 0,
        description: p.description || '',
        details: p.details || '',
        occasion: p.occasion || '',
        quantity: p.quantity || 1,
        collectionName: p.collectionName || '',
        type: p.type || '',
        sizes: Array.isArray(p.sizes) && p.sizes.length > 0 ? p.sizes : [{ weight: 'g', size: 'MM', stock: 0 }],
        topLevelCategory: p.category?.parentCategory?.parentCategory?.name || p.topLevelCategory || '',
        secondLevelCategory: p.category?.parentCategory?.name || p.secondLevelCategory || '',
        thirdLevelCategory: p.category?.name || p.thirdLevelCategory || '',
        metalType: p.metalType || '',
        metalPurity: p.metalPurity || '',
        metalWeight: p.metalWeight || '',
        hallmarkCertification: p.hallmarkCertification || '',
        metalColor: p.metalColor || '',
        primaryStoneType: p.primaryStoneType || '',
        stoneShape: p.stoneShape || '',
        stoneWeight: p.stoneWeight || '',
        ringSize: p.ringSize || '',
        chainLength: p.chainLength || '',
        pendantSize: p.pendantSize || '',
        dimensions: p.dimensions || '',
        totalWeight: p.totalWeight || '',
      });
    }
  }, [products?.product, productId]);
`;
code = code.replace("const { products } = useSelector((store) => store);", "const { products } = useSelector((store) => store);\n" + hydrateEffect);

// 5. Update submission handler
const submitPattern = /const handleSubmit = \(e\) => {[\s\S]*?};\n/;
const updateSubmit = `const handleSubmit = (e) => {
    e.preventDefault();
    const computedDiscount = productData.price > 0 ? Math.floor(((productData.price - productData.discountedPrice) / productData.price) * 100) : 0;
    const finalData = { ...productData, discountPercent: computedDiscount };
    
    dispatch(updateProduct({ productId, data: finalData }));
    
    // Simulate short delay then redirect
    setTimeout(() => {
      navigate('/admin/products');
    }, 1500);
  };\n`;
code = code.replace(submitPattern, updateSubmit);

// 6. Update text strings in the form layout
code = code.replace(/>Add New Product</g, '>Edit Product<');
code = code.replace(/Publish Product to Store/g, "Save Changes");
code = code.replace(/>Publishing Product...</g, '>Saving Changes...<');
code = code.replace(/>Create Product</g, '>Update Product Details<');
code = code.replace(/>Fill in all the details to add a new jewellery product to the inventory\.</g, '>Modify any details to update the product in the inventory.<');

fs.writeFileSync(editFormPath, code);
console.log("EditProductForm generated successfully!");
