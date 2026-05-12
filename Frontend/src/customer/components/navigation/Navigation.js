import { Fragment, useContext, useEffect, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import { Badge, Box, Button, Drawer, Typography, IconButton, Menu, MenuItem, InputBase, Backdrop, Divider, ListItemIcon, ListItemText } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AuthModel from "../../auth/AuthModel";
import { getUser, logout } from "../../../state/auth/Action";
import { useDispatch, useSelector } from "react-redux";
import { ModalContext } from "../../../context/modal/modalContext";
import { getCart, removeCartItem } from "../../../state/cart/Action";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { formatPriceINR } from "../../../utils/price";

const navigation = {
  categories: [
    {
      id: "rings",
      name: "Rings",
      sections: [
        {
          id: "style",
          name: "Shop by Style",
          items: [
            { name: "Engagement Rings", id: "engagement" },
            { name: "Wedding Bands", id: "wedding-bands" },
            { name: "Eternity Rings", id: "eternity" },
            { name: "Cocktail Rings", id: "cocktail" },
            { name: "Stackable Rings", id: "stackable" },
            { name: "Solitaire Rings", id: "solitaire" },
          ],
        },
        {
          id: "metal",
          name: "Shop by Metal",
          items: [
            { name: "Yellow Gold", id: "yellow-gold" },
            { name: "Rose Gold", id: "rose-gold" },
            { name: "White Gold", id: "white-gold" },
            { name: "Platinum", id: "platinum" },
            { name: "Sterling Silver", id: "silver" },
          ],
        },
        {
          id: "collections",
          name: "Collections",
          items: [
            { name: "Signature Loupe", id: "signature" },
            { name: "Vintage Inspired", id: "vintage" },
            { name: "Modern Minimalist", id: "modern" },
            { name: "Art Deco", id: "art-deco" },
          ],
        },
      ],
    },
    {
      id: "earrings",
      name: "Earrings",
      sections: [
        {
          id: "type",
          name: "Shop by Type",
          items: [
            { name: "Diamond Studs", id: "diamond-studs" },
            { name: "Hoop & Huggies", id: "hoops-huggies" },
            { name: "Dangle & Drops", id: "dangle-drops" },
            { name: "Ear Climbers", id: "climbers" },
            { name: "Ear Cuffs", id: "cuffs" },
            { name: "Chandeliers", id: "chandeliers" },
          ],
        },
        {
          id: "stone",
          name: "Shop by Stone",
          items: [
            { name: "Diamond", id: "stone-diamond" },
            { name: "Pearl", id: "stone-pearl" },
            { name: "Ruby", id: "stone-ruby" },
            { name: "Sapphire", id: "stone-sapphire" },
            { name: "Emerald", id: "stone-emerald" },
          ],
        },
        {
          id: "occasion",
          name: "Occasion",
          items: [
            { name: "Daily Wear", id: "daily-earrings" },
            { name: "Bridal", id: "bridal-earrings" },
            { name: "Party Wear", id: "party-earrings" },
          ],
        },
      ],
    },
    {
      id: "bracelets",
      name: "Bracelets",
      sections: [
        {
          id: "style",
          name: "Shop by Style",
          items: [
            { name: "Tennis Bracelets", id: "tennis-bracelets" },
            { name: "Bangles", id: "bangles" },
            { name: "Chain Bracelets", id: "chain-bracelets" },
            { name: "Cuffs", id: "cuffs" },
            { name: "Charm Bracelets", id: "charms" },
            { name: "Anklets", id: "anklets" },
          ],
        },
        {
          id: "metal",
          name: "Shop by Metal",
          items: [
            { name: "18K Gold", id: "18k-gold" },
            { name: "14K Gold", id: "14k-gold" },
            { name: "Silver", id: "silver-bracelets" },
          ],
        },
      ],
    },
    {
      id: "necklaces",
      name: "Necklaces",
      sections: [
        {
          id: "style",
          name: "Shop by Style",
          items: [
            { name: "Solitaire Pendants", id: "solitaire-pendants" },
            { name: "Gold Chains", id: "gold-chains" },
            { name: "Statement Necklaces", id: "statement" },
            { name: "Chokers", id: "chokers" },
            { name: "Lariats", id: "lariats" },
            { name: "Mangalsutra", id: "mangalsutra" },
          ],
        },
        {
          id: "collection",
          name: "Collections",
          items: [
            { name: "Bridal Suite", id: "bridal-necklaces" },
            { name: "Layered Looks", id: "layered" },
            { name: "Initial & Charms", id: "initial-charms" },
          ],
        },
      ],
    },
    {
      id: "best-seller",
      name: "Best Seller",
      sections: [
        {
          id: "trending",
          name: "Trending Now",
          items: [
            { name: "Top 10 Picks", id: "top-10" },
            { name: "New Arrivals", id: "new-arrivals" },
            { name: "Celebrity Choices", id: "celeb-choices" },
            { name: "Instagram Favorites", id: "insta-favs" },
          ],
        },
        {
          id: "gifts",
          name: "Gift Guide",
          items: [
            { name: "Gifts for Her", id: "gifts-her" },
            { name: "Gifts for Him", id: "gifts-him" },
            { name: "Gifts Under $500", id: "gifts-500" },
            { name: "Anniversary Gifts", id: "anniversary" },
          ],
        },
      ],
    },
  ],
  pages: [],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const modal = useContext(ModalContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [countryAnchorEl, setCountryAnchorEl] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState({ name: 'INDIA', code: 'IN', currency: 'INR ₹', flag: '🇮🇳' });
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth, cart } = useSelector((store) => store);

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
      dispatch(getCart());
    }
  }, [jwt, auth.jwt]);

  const handleRemoveCartItem = (cartItemId) => {
    dispatch(removeCartItem(cartItemId));
  };

  useEffect(() => {
    if (cartOpen && jwt) {
      dispatch(getCart());
    }
  }, [cartOpen, jwt]);

  useEffect(() => {
    if (jwt) {
      dispatch(getCart());
    }
  }, [cart.deleteCartItem]);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const handleCategoryClick = (category, section, item, close) => {
    navigate(`/${category.id}/${section.id}/${item.id}`);
    close();
  };

  const handleOpen = (e, authMode) => {
    e.preventDefault();
    navigate(`/${authMode}`);
    modal.openModal();
  };

  const handleClose = () => {
    navigate("/");
    modal.closeModal();
  };

  const handleLogout = () => {
    dispatch(logout());
    modal.closeModal();
    window.location.reload();
  };

  const handleCountryOpen = (event) => setCountryAnchorEl(event.currentTarget);
  const handleCountryClose = () => setCountryAnchorEl(null);
  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    handleCountryClose();
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/all-jewellery/all/jewellery?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <div>
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-[60] lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-500 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-400 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-[85vw] flex-col overflow-y-auto bg-white pb-12 shadow-2xl">
                {/* 1. Editorial Header Bar */}
                <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-5 bg-white border-b border-gray-100">
                  <Link to="/" onClick={() => setOpen(false)}>
                    <img
                      src="/Loupe_Jeweler-logo.png"
                      alt="Loupe Jeweler"
                      className="h-10 w-auto object-contain"
                    />
                  </Link>
                  <IconButton onClick={() => setOpen(false)} sx={{ color: '#1e293b' }}>
                    <CloseIcon sx={{ fontSize: 22 }} />
                  </IconButton>
                </div>

                {/* 2. Premium User Profile Section */}
                <Box sx={{ p: 4, bgcolor: '#fafafa' }}>
                  {!auth.user ? (
                    <Box>
                      <Typography sx={{ fontSize: '1.4rem', fontWeight: 300, fontFamily: "'Playfair Display', serif", color: '#1e293b', mb: 1 }}>
                        The Boutique
                      </Typography>
                      <Typography sx={{ fontSize: '0.75rem', color: '#64748b', mb: 3, letterSpacing: 0.5, lineHeight: 1.6 }}>
                        Log in to access your exclusive jewelry collections and saved designs.
                      </Typography>
                      <Button
                        onClick={(e) => { handleOpen(e, "login"); setOpen(false); }}
                        fullWidth
                        variant="contained"
                        sx={{ bgcolor: '#1e293b', color: 'white', py: 1.5, fontSize: '0.8rem', fontWeight: 800, borderRadius: '8px', textTransform: 'uppercase', letterSpacing: 1 }}
                      >
                        Sign In
                      </Button>
                    </Box>
                  ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
                      <div className="w-16 h-16 rounded-full bg-[#1e293b] flex items-center justify-center text-white text-2xl font-serif">
                        {auth.user.firstName?.[0]}
                      </div>
                      <Box>
                        <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b', fontFamily: "'Playfair Display', serif" }}>
                          Hello, {auth.user.firstName}
                        </Typography>
                        <Typography sx={{ fontSize: '0.75rem', color: '#64748b', mb: 0.8 }}>
                          Loupe Circle Member
                        </Typography>
                        <Typography
                          onClick={() => { navigate("/user-details/?layout=0"); setOpen(false); }}
                          sx={{ fontSize: '0.7rem', color: '#97c2d5', cursor: 'pointer', fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1.5 }}
                        >
                          My Dashboard
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </Box>

                {/* 3. Boutique Category List */}
                <Box sx={{ py: 4 }}>
                  <Typography sx={{ px: 4, mb: 2, fontSize: '0.65rem', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 2 }}>
                    Collections
                  </Typography>
                  {navigation.categories.map((category) => (
                    <div key={category.id} className="group">
                      <div className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-50 transition-all"
                        onClick={() => { navigate(`/${category.id}`); setOpen(false); }}>
                        <Typography
                          sx={{
                            fontSize: '0.95rem',
                            fontWeight: 400,
                            fontFamily: "'Playfair Display', serif",
                            color: '#1e293b',
                            letterSpacing: 0.5
                          }}
                        >
                          {category.name}
                        </Typography>
                        <KeyboardArrowDownIcon sx={{ fontSize: 18, color: '#94a3b8', transform: 'rotate(-90deg)' }} />
                      </div>
                    </div>
                  ))}

                  <div className="mt-8 px-6 py-4 mx-4 bg-[#f1f5f9] rounded-xl">
                    <Typography sx={{ fontSize: '0.8rem', fontWeight: 800, color: '#1e293b', mb: 1 }}>Concierge Service</Typography>
                    <Typography sx={{ fontSize: '0.7rem', color: '#64748b', mb: 2 }}>Need help finding the perfect gift?</Typography>
                    <p className="text-[0.75rem] font-black text-[#97c2d5] uppercase tracking-widest cursor-pointer">Chat With Us</p>
                  </div>
                </Box>

                {/* 4. Luxury Utility Bar */}
                <Box sx={{ mt: 'auto', p: 4, bgcolor: '#fff', borderTop: '1px solid #eee' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <div className="flex items-center gap-2" onClick={handleCountryOpen}>
                      <span className="text-xl">{selectedCountry.flag}</span>
                      <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#1e293b' }}>{selectedCountry.name} (INR)</Typography>
                    </div>
                    {auth.user && (
                      <Typography
                        onClick={handleLogout}
                        sx={{ fontSize: '0.7rem', fontWeight: 900, color: '#ef4444', textTransform: 'uppercase', letterSpacing: 1 }}
                      >
                        Logout
                      </Typography>
                    )}
                  </Box>
                  <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.6rem', letterSpacing: 1 }}>
                    © 2024 LOUPE JEWELER • FLAGSHIP STORE
                  </Typography>
                </Box>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="fixed top-0 left-0 right-0 z-50 w-full shadow-md" style={{ backgroundColor: '#97c2d5', color: 'white' }}>
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">

            {/* Left: Logo & Toggle */}
            <div className="flex items-center">
              <IconButton
                onClick={() => setOpen(true)}
                className="lg:hidden"
                sx={{
                  color: 'white',
                  ml: -1,
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
                }}
              >
                <MenuIcon sx={{ fontSize: 28 }} />
              </IconButton>
              <Link to="/" className="flex items-center ml-1 lg:ml-0">
                <img
                  src="/Loupe_Jeweler-logo.png"
                  alt="Loupe Jeweler"
                  className="h-14 sm:h-16 lg:h-20 w-auto object-contain transition-all duration-300"
                />
              </Link>
            </div>

            {/* Center: Nav or Search */}
            <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center px-10">
              {!searchOpen ? (
                <Popover.Group className="flex space-x-8">
                  {navigation.categories.map((category, index) => (
                    <Popover
                      key={`${category.name}-${index}`}
                      className="flex"
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      {({ close }) => (
                        <>
                          <Popover.Button className={classNames(hoveredIndex === index ? "border-white font-bold" : "border-transparent", "z-10 flex items-center text-[0.8rem] tracking-widest uppercase text-white outline-none border-b-2 transition-all pb-1")}>
                            {category.name}
                          </Popover.Button>
                          <Transition
                            show={hoveredIndex === index}
                            as={Fragment}
                            enter="transition ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 scale-95"
                            enterTo="opacity-100 translate-y-0 scale-100"
                            leave="transition ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 scale-100"
                            leaveTo="opacity-0 translate-y-4 scale-95"
                          >
                            <Popover.Panel static className="absolute left-1/2 -translate-x-1/2 top-full z-20 mt-0 w-max min-w-[900px] max-w-[95vw] text-sm text-gray-700 shadow-[0_40px_80px_rgba(0,0,0,0.12)] bg-white border border-gray-100 rounded-b-2xl overflow-hidden">
                              <div className="flex">
                                {/* Left Content: Navigation Grid */}
                                <div className="flex-1 bg-white px-12 py-12 border-r border-gray-50">
                                  <div className="grid grid-cols-3 gap-x-14 gap-y-10">
                                    {category.sections.map((section) => (
                                      <div key={section.id} className="min-w-[150px]">
                                        <Typography sx={{
                                          fontFamily: "'Playfair Display', serif",
                                          fontWeight: 700,
                                          fontSize: '0.9rem',
                                          color: '#1e293b',
                                          mb: 3,
                                          pb: 1,
                                          borderBottom: '1px solid #f1f5f9'
                                        }}>
                                          {section.name}
                                        </Typography>
                                        <ul className="space-y-3">
                                          {section.items.map((item) => (
                                            <li key={item.id}>
                                              <p
                                                onClick={() => handleCategoryClick(category, section, item, () => { close(); setHoveredIndex(null); })}
                                                className="text-gray-500 hover:text-[#97c2d5] cursor-pointer hover:translate-x-1 transition-all duration-300 text-[0.8rem] font-medium tracking-wide"
                                              >
                                                {item.name}
                                              </p>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Right Content: Featured Boutique Spot */}
                                <div className="w-[320px] bg-[#fafafa] p-8 flex flex-col items-center justify-center text-center">
                                  <div className="w-full aspect-[4/5] rounded-xl overflow-hidden shadow-lg mb-6 group/img">
                                    <img
                                      src={index === 0 ? "https://images.pexels.com/photos/10983783/pexels-photo-10983783.jpeg?auto=compress&cs=tinysrgb&w=600" :
                                        index === 1 ? "https://images.pexels.com/photos/9428281/pexels-photo-9428281.jpeg?auto=compress&cs=tinysrgb&w=600" :
                                          "https://images.pexels.com/photos/11745093/pexels-photo-11745093.jpeg?auto=compress&cs=tinysrgb&w=600"}
                                      alt="Featured"
                                      className="w-full h-full object-cover transition-transform duration-1000 group-hover/img:scale-110"
                                    />
                                  </div>
                                  <Typography sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '1rem', color: '#1e293b', mb: 1 }}>
                                    The {category.name} Collection
                                  </Typography>
                                  <Typography sx={{ fontSize: '0.7rem', color: '#64748b', mb: 3, letterSpacing: 0.5, lineHeight: 1.5 }}>
                                    Curated masterpieces handcrafted with precision for the modern connoisseur.
                                  </Typography>
                                  <Button
                                    onClick={() => navigate(`/${category.id}`)}
                                    variant="outlined"
                                    sx={{
                                      borderColor: '#1e293b', color: '#1e293b', borderRadius: '4px',
                                      px: 3, py: 0.8, fontSize: '0.65rem', fontWeight: 900, letterSpacing: 1.5,
                                      '&:hover': { bgcolor: '#1e293b', color: 'white' }
                                    }}
                                  >
                                    Discover All
                                  </Button>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}
                </Popover.Group>
              ) : (
                <div className="w-full max-w-xl animate-in fade-in slide-in-from-top-4 duration-300">
                  <div className="relative flex items-center border-b-2 border-white/70 py-1 group focus-within:border-white transition-all">
                    <InputBase
                      autoFocus
                      placeholder="Search for products..."
                      fullWidth
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={handleSearch}
                      sx={{
                        color: 'white',
                        fontSize: '1.1rem',
                        fontFamily: 'serif',
                        '& input::placeholder': { color: 'white', opacity: 0.7 }
                      }}
                    />
                    <IconButton onClick={() => setSearchOpen(false)} sx={{ color: 'white', p: 0.5 }}>
                      <CloseIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Tools */}
            <div className="flex items-center space-x-3 sm:space-x-6">

              {/* Country */}
              <div
                className="hidden xl:flex items-center text-white text-[0.75rem] font-semibold cursor-pointer py-1.5 px-3 rounded-full hover:bg-white/10 transition-all border border-white/20"
                onClick={handleCountryOpen}
              >
                <span className="mr-2 text-base">{selectedCountry.flag}</span>
                <span className="uppercase tracking-[0.1em]">{selectedCountry.name} ({selectedCountry.currency.split(' ')[0]})</span>
                <KeyboardArrowDownIcon sx={{ fontSize: 16, ml: 0.5, opacity: 0.8 }} />
              </div>
              <Menu
                anchorEl={countryAnchorEl}
                open={Boolean(countryAnchorEl)}
                onClose={handleCountryClose}
                PaperProps={{
                  sx: {
                    mt: 1,
                    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
                    borderRadius: '12px',
                    minWidth: '180px',
                    border: '1px solid #f0f0f0'
                  }
                }}
              >
                <MenuItem onClick={() => handleCountrySelect({ name: 'INDIA', code: 'IN', currency: 'INR ₹', flag: '🇮🇳' })} sx={{ py: 1.5, '&:hover': { bgcolor: '#f0f9ff' } }}>
                  <span style={{ fontSize: '1.2rem', marginRight: '12px' }}>🇮🇳</span>
                  <ListItemText primary="INDIA" secondary="INR ₹" primaryTypographyProps={{ fontSize: '0.85rem', fontWeight: 600 }} secondaryTypographyProps={{ fontSize: '0.75rem' }} />
                </MenuItem>
                <Divider sx={{ my: '0 !important' }} />
                <MenuItem onClick={() => handleCountrySelect({ name: 'USA', code: 'US', currency: 'USD $', flag: '🇺🇸' })} sx={{ py: 1.5, '&:hover': { bgcolor: '#f0f9ff' } }}>
                  <span style={{ fontSize: '1.2rem', marginRight: '12px' }}>🇺🇸</span>
                  <ListItemText primary="USA" secondary="USD $" primaryTypographyProps={{ fontSize: '0.85rem', fontWeight: 600 }} secondaryTypographyProps={{ fontSize: '0.75rem' }} />
                </MenuItem>
              </Menu>

              {/* Profile */}
              <div className="relative cursor-pointer">
                <IconButton
                  onClick={handleProfileClick}
                  sx={{
                    color: 'white',
                    p: 1,
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
                    bgcolor: Boolean(anchorEl) ? 'rgba(255,255,255,0.2)' : 'transparent'
                  }}
                >
                  <PermIdentityOutlinedIcon sx={{ width: "24px", height: "24px" }} />
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleProfileClose}
                  PaperProps={{
                    sx: {
                      mt: 1.5,
                      minWidth: 220,
                      borderRadius: '12px',
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 10px 25px rgba(0,0,0,0.1))',
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  {!auth.user ? (
                    <div className="p-4 px-5">
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5, color: '#333' }}>Account</Typography>
                      <Typography variant="caption" sx={{ color: '#666', display: 'block', mb: 2 }}>Access your account or orders</Typography>
                      <div className="flex flex-col gap-2">
                        <Button
                          onClick={(e) => { handleOpen(e, "login"); handleProfileClose(); }}
                          variant="contained"
                          fullWidth
                          sx={{ bgcolor: '#97c2d5', '&:hover': { bgcolor: '#7eb1c9' }, textTransform: 'none', fontWeight: 600, py: 1 }}
                        >
                          Log In
                        </Button>
                        <Button
                          onClick={(e) => { handleOpen(e, "register"); handleProfileClose(); }}
                          variant="text"
                          fullWidth
                          sx={{ color: '#97c2d5', textTransform: 'none', fontWeight: 600 }}
                        >
                          Sign Up
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#97c2d5] flex items-center justify-center text-white font-bold text-sm">
                          {auth.user.firstName?.[0]}
                        </div>
                        <div className="flex flex-col">
                          <Typography variant="body2" sx={{ fontWeight: 700, color: '#333' }}>{auth.user.firstName} {auth.user.lastName}</Typography>
                          <Typography variant="caption" sx={{ color: '#666' }}>{auth.user.email}</Typography>
                        </div>
                      </div>

                      <div className="py-1">
                        {auth.user.role === "ADMIN" && (
                          <MenuItem onClick={() => { navigate("/admin"); handleProfileClose(); }} sx={{ py: 1.2 }}>
                            <ListItemIcon><DashboardOutlinedIcon fontSize="small" /></ListItemIcon>
                            <ListItemText primary="Admin Dashboard" primaryTypographyProps={{ fontSize: '0.85rem' }} />
                          </MenuItem>
                        )}
                        <MenuItem onClick={() => { navigate("/user-details/?layout=0"); handleProfileClose(); }} sx={{ py: 1.2 }}>
                          <ListItemIcon><AccountCircleOutlinedIcon fontSize="small" /></ListItemIcon>
                          <ListItemText primary="My Account" primaryTypographyProps={{ fontSize: '0.85rem' }} />
                        </MenuItem>
                        <MenuItem onClick={() => { navigate("/user-details/?layout=2"); handleProfileClose(); }} sx={{ py: 1.2 }}>
                          <ListItemIcon><ShoppingBagOutlinedIcon fontSize="small" /></ListItemIcon>
                          <ListItemText primary="My Orders" primaryTypographyProps={{ fontSize: '0.85rem' }} />
                        </MenuItem>
                        <Divider sx={{ my: 1, opacity: 0.6 }} />
                        <MenuItem onClick={() => { handleLogout(); handleProfileClose(); }} sx={{ py: 1.2, color: '#ef4444' }}>
                          <ListItemIcon><LogoutOutlinedIcon fontSize="small" sx={{ color: '#ef4444' }} /></ListItemIcon>
                          <ListItemText primary="Logout" primaryTypographyProps={{ fontSize: '0.85rem', fontWeight: 600 }} />
                        </MenuItem>
                      </div>
                    </>
                  )}
                </Menu>
              </div>

              {/* Search Toggle */}
              <IconButton onClick={() => setSearchOpen(!searchOpen)} sx={{ color: 'white', p: 1 }}>
                <SearchIcon sx={{ width: "24px", height: "24px" }} />
              </IconButton>

              {/* Cart */}
              <IconButton onClick={() => setCartOpen(true)} sx={{ color: 'white', p: 1 }}>
                <Badge badgeContent={cart.cart?.totalItem} sx={{ '& .MuiBadge-badge': { backgroundColor: 'white', color: '#97c2d5', fontWeight: 'bold' } }}>
                  <AddShoppingCartIcon sx={{ width: "23px", height: "23px" }} />
                </Badge>
              </IconButton>

            </div>
          </div>
        </div>
      </header>
      <div className="h-20" aria-hidden="true" />
      {/* <div className="h-4" aria-hidden="true" /> */}

      {/* Cart Drawer */}
      <Drawer
        anchor="right"
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 400 },
            p: 0,
            display: 'flex',
            flexDirection: 'column'
          }
        }}
      >
        <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <ShoppingBagOutlinedIcon sx={{ color: '#1e293b' }} />
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e293b', fontFamily: 'serif' }}>Your Bag</Typography>
          </Box>
          <IconButton onClick={() => setCartOpen(false)} sx={{ ml: 'auto' }}><CloseIcon /></IconButton>
        </Box>

        <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 3 }}>
          {cart.cart?.cartItems?.length > 0 ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {cart.cart.cartItems.map((item) => (
                <Box key={item._id} sx={{ display: 'flex', gap: 2 }}>
                  <Box sx={{ width: 80, height: 100, borderRadius: '8px', overflow: 'hidden', flexShrink: 0, bgcolor: '#f4f4f4' }}>
                    <img
                      src={item.product?.imageUrls?.[0]?.imageUrl}
                      alt={item.product?.title}
                      className="w-full h-full object-cover"
                    />
                  </Box>
                  <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b', mb: 0.5, lineHeight: 1.3 }}>
                      {item.product?.title}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#64748b', mb: 1 }}>
                      Qty: {item.quantity} {item.weight ? `| ${item.weight}` : ''}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                      <Typography sx={{ fontWeight: 800, color: '#1e293b', fontSize: '0.9rem' }}>
                        ₹{formatPriceINR(item.discountedPrice)}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => handleRemoveCartItem(item._id)}
                        sx={{ color: '#94a3b8', '&:hover': { color: '#ef4444' } }}
                      >
                        <DeleteOutlineIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 py-20">
              <AddShoppingCartIcon sx={{ fontSize: 64, mb: 2, opacity: 0.2 }} />
              <Typography sx={{ fontWeight: 600, color: '#94a3b8' }}>Your bag is empty</Typography>
              <Button
                variant="outlined"
                onClick={() => setCartOpen(false)}
                sx={{
                  mt: 3, px: 4, borderRadius: '8px', textTransform: 'none',
                  borderColor: '#97c2d5', color: '#97c2d5',
                  '&:hover': { borderColor: '#7eb1c9', bgcolor: '#f0f9ff' }
                }}
              >
                Start Shopping
              </Button>
            </div>
          )}
        </Box>

        {cart.cart?.cartItems?.length > 0 && (
          <Box sx={{ p: 3, borderTop: '1px solid #eee', bgcolor: '#fafafa' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2.5 }}>
              <Typography sx={{ color: '#64748b', fontWeight: 600 }}>Subtotal</Typography>
              <Typography sx={{ color: '#1e293b', fontWeight: 800, fontSize: '1.1rem' }}>
                ₹{formatPriceINR(cart.cart?.totalDiscountedPrice)}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => { setCartOpen(false); navigate('/cart'); }}
                sx={{
                  py: 1.5, borderRadius: '10px', textTransform: 'none', fontWeight: 700,
                  borderColor: '#1e293b', color: '#1e293b',
                  '&:hover': { borderColor: '#1e293b', bgcolor: '#f1f5f9' }
                }}
              >
                View Bag
              </Button>
              <Button
                fullWidth
                variant="contained"
                onClick={() => { setCartOpen(false); navigate('/checkout'); }}
                sx={{
                  py: 1.5, borderRadius: '10px', textTransform: 'none', fontWeight: 700,
                  bgcolor: '#1e293b', color: 'white',
                  '&:hover': { bgcolor: '#97c2d5' }, boxShadow: 'none'
                }}
              >
                Checkout
              </Button>
            </Box>
          </Box>
        )}
      </Drawer>

      <AuthModel handleClose={() => modal.closeModal()} open={modal.state} />
    </div>
  );
}
