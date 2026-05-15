const fs = require('fs');
const path = require('path');

const filesToFix = [
  'e:/Loupe_Jewellery/Frontend/src/customer/components/navigation/Navigation.js',
  'e:/Loupe_Jewellery/Frontend/src/customer/components/Footer/Footer.js',
  'e:/Loupe_Jewellery/Frontend/src/customer/components/User_Details/MyAccount.js'
];

const mappings = [
  { from: /Ã°Å¸â€¡Â®Ã°Å¸â€¡Â³|ðŸ‡®ðŸ‡³/g, to: '🇮🇳' },
  { from: /ðŸ‡ºðŸ‡¸/g, to: '🇺🇸' },
  { from: /Ã¢â€šÂ¹|â‚¹|Ãƒâ€šÃ‚Â¹/g, to: '₹' },
  { from: /Ãƒâ€šÃ‚Â©/g, to: '©' },
  { from: /ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢/g, to: '•' },
  { from: /â€”/g, to: '—' },
  { from: /bg-\[#755970\] text-white pt-10 pb-5/g, to: 'bg-[#402d43] text-white pt-10 pb-5' },
  { from: /backgroundColor: '#755970'/g, to: "backgroundColor: '#402d43'" }
];

filesToFix.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    mappings.forEach(mapping => {
      content = content.replace(mapping.from, mapping.to);
    });
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Fixed encoding and theme colors in ${file}`);
  }
});
