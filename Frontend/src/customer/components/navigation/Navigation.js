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

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth, cart } = useSelector((store) => store);

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, auth.jwt]);

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

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl border-r border-[#97c2d5]/10">
                <div className="flex items-center justify-between px-6 pb-4 pt-6 border-b border-gray-100 bg-gray-50/50">
                  <div className="flex items-center">
                    <img
                      src="/Loupe_Jeweler-logo.png"
                      alt="Loupe Jeweler"
                      className="h-12 w-auto object-contain brightness-90 grayscale-[0.3]"
                    />
                  </div>
                  <IconButton onClick={() => setOpen(false)} sx={{ color: '#94a3b8' }}>
                    <CloseIcon />
                  </IconButton>
                </div>

                {/* Mobile Navigation List */}
                <Box sx={{ py: 2 }}>
                  {navigation.categories.map((category) => (
                    <Box key={category.id} sx={{ mb: 1 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          px: 3,
                          py: 1.5,
                          fontSize: '0.9rem',
                          fontWeight: 800,
                          color: '#1e293b',
                          letterSpacing: 1.5,
                          textTransform: 'uppercase',
                          bgcolor: '#f8fafc'
                        }}
                      >
                        {category.name}
                      </Typography>
                      <Box sx={{ px: 3, py: 1 }}>
                        {category.sections.map((section) => (
                          <Box key={section.id} sx={{ mb: 3 }}>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                fontWeight: 700,
                                color: '#97c2d5',
                                mb: 1,
                                fontSize: '0.75rem',
                                letterSpacing: 1
                              }}
                            >
                              {section.name}
                            </Typography>
                            <ul className="space-y-2.5">
                              {section.items.map((item) => (
                                <li key={item.id}>
                                  <p
                                    onClick={() => {
                                      navigate(`/${category.id}/${section.id}/${item.id}`);
                                      setOpen(false);
                                    }}
                                    className="text-[0.9rem] text-gray-500 hover:text-[#97c2d5] cursor-pointer active:scale-95 transition-all font-medium py-1"
                                  >
                                    {item.name}
                                  </p>
                                </li>
                              ))}
                            </ul>
                          </Box>
                        ))}
                      </Box>
                      <Divider sx={{ mx: 3, my: 1, opacity: 0.5 }} />
                    </Box>
                  ))}
                </Box>

                {/* Mobile Bottom Section */}
                <Box sx={{ mt: 'auto', p: 3, bgcolor: '#f1f5f9' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <span className="text-xl">{selectedCountry.flag}</span>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569' }}>
                      {selectedCountry.name} ({selectedCountry.currency.split(' ')[0]})
                    </Typography>
                  </Box>
                  <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                    © 2024 Loupe Jeweler. All Rights Reserved.
                  </Typography>
                </Box>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="fixed top-0 left-0 right-0 z-50 w-full shadow-md" style={{ backgroundColor: '#97c2d5', color: 'white' }}>
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="flex h-18 items-center justify-between">

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
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 -translate-y-2"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 -translate-y-2"
                          >
                            <Popover.Panel static className="absolute left-1/2 -translate-x-1/2 top-full z-20 mt-1 w-max min-w-[600px] max-w-[90vw] text-sm text-gray-700 shadow-[0_20px_50px_rgba(0,0,0,0.15)] bg-white border border-gray-100 rounded-xl overflow-hidden">
                              <div className="relative bg-white px-10 py-10">
                                <div className={classNames(
                                  (category.id === 'rings' || category.id === 'earrings') ? "grid-cols-3" : "grid-cols-2",
                                  "grid gap-x-16 gap-y-10"
                                )}>
                                  {category.sections.map((section) => (
                                    <div key={section.id} className="min-w-[180px]">
                                      <p className="font-serif font-bold text-sm text-gray-900 uppercase tracking-widest pb-2 border-b border-[#97c2d5]/30 mb-5">{section.name}</p>
                                      <ul className="space-y-3.5">
                                        {section.items.map((item) => (
                                          <li key={item.id}>
                                            <p
                                              onClick={() => handleCategoryClick(category, section, item, () => { close(); setHoveredIndex(null); })}
                                              className="text-gray-500 hover:text-[#97c2d5] cursor-pointer hover:translate-x-1 transition-all duration-300 text-[0.85rem] font-medium"
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
      <div className="h-18" aria-hidden="true" />

      {/* Cart Drawer */}
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)} PaperProps={{ sx: { width: { xs: '100%', sm: 400 }, p: 4 } }}>
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <Typography variant="h6" sx={{ fontWeight: 'bold', fontFamily: 'serif' }}>Shopping Cart</Typography>
          <IconButton onClick={() => setCartOpen(false)}><CloseIcon /></IconButton>
        </div>
        <div className="flex flex-col items-center justify-center flex-grow text-gray-400">
          <AddShoppingCartIcon sx={{ fontSize: 64, mb: 2, opacity: 0.3 }} />
          <Typography>Your cart is empty.</Typography>
          <Button variant="contained" fullWidth onClick={() => { setCartOpen(false); navigate('/cart'); }} sx={{ bgcolor: '#97c2d5', mt: 'auto', py: 1.5 }}>Checkout</Button>
        </div>
      </Drawer>

      <AuthModel handleClose={() => modal.closeModal()} open={modal.state} />
    </div>
  );
}
