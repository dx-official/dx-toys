// ---------- DATA (edit here; swap for real inventory later) ----------
const BRAND={wa:"6281228505388",waShow:"+62 81228505388",ig:"@dx_vault",email:"hello@dxtoysandhobbies.com",hours:"Monday–Saturday, 09:00–18:00 WIB"};
const COLS=[{n:"Diecast",slug:"diecast",d:"Hot Wheels, Mini GT, Pop Race, and more.",img:"/assets/collections/diecast.jpg",c:"#e63a2e",e:"🏎️"},
{n:"Trading Cards",slug:"trading-cards",d:"Pokémon, One Piece, and other collectible card products.",img:"/assets/collections/tcg.jpg",c:"#2457d6",e:"🃏"},
{n:"Toys & Collectibles",slug:"toys-collectibles",d:"Figures, toys, and collectible items.",img:"/assets/collections/toys.jpg",c:"#22a06b",e:"🧸"},
{n:"Accessories",slug:"accessories",d:"Display cases, sleeves, protectors, and hobby accessories.",img:"/assets/collections/accessories.jpg",c:"#c98f00",e:"🛡️"}];
const P=[
{id:1,name:"Booster Box Pokémon",category:"Trading Cards",brand:"Pokémon",price:null,originalPrice:null,stock:null,status:"",badge:"",sku:"",description:"",image:"/assets/products/pokemon-booster-box.jpg",slug:"pokemon-booster-box",tags:[]},
{id:2,name:"Booster Pack Pokémon",category:"Trading Cards",brand:"Pokémon",price:null,originalPrice:null,stock:null,status:"",badge:"",sku:"",description:"",image:"/assets/products/pokemon-booster-pack.jpg",slug:"pokemon-booster-pack",tags:[]},
{id:3,name:"Single Card Pokémon",category:"Trading Cards",brand:"Pokémon",price:null,originalPrice:null,stock:null,status:"",badge:"",sku:"",description:"",image:"/assets/products/pokemon-single-card.jpg",slug:"pokemon-single-card",tags:[]},
{id:4,name:"Bulk Card Pokémon",category:"Trading Cards",brand:"Pokémon",price:null,originalPrice:null,stock:null,status:"",badge:"",sku:"",description:"",image:"/assets/products/pokemon-bulk-card.jpg",slug:"pokemon-bulk-card",tags:[]}];
const NEW_IDS=[1,2,3,4],BEST_IDS=[];
const PRE=[{name:"Pokémon Booster Box — Upcoming Set",rel:"December 2026",price:1199000,dep:300000,status:"Open",d:"Limited pre-order allocation. Release date may change according to official distributor schedule.",img:"/assets/preorder/pokemon-upcoming.jpg"}];
const PROMO=[{t:"FREE SHIPPING WEEKEND",d:"Free shipping for selected orders.",p:"10–12 October 2026",c:"DXWEEKEND"},{t:"COLLECTOR DEAL",d:"Save more when purchasing selected bundles.",p:"",c:""}];
const WHY=[["Curated Products","We carefully select products worth adding to your collection.","✓","var(--red)"],["Collector Focused","Built for collectors, enthusiasts, and hobby communities.","★","var(--blue)"],["Safe Packaging","Every order is packed with care to help products arrive safely.","▣","var(--green)"],["Reliable Service","Fast response and transparent order information.","☎","#c98f00"]];
const FAQ=[["Are all products authentic?","Yes. We source products from trusted distributors and suppliers."],["Do you accept pre-orders?","Yes. Selected upcoming products are available for pre-order."],["Can I request specific products?","Yes. Contact us through WhatsApp or Instagram."],["How are orders packaged?","Products are packed according to their category and protection requirements."]];
const SHIP=["J&T Express","SiCepat","Anteraja"],PAY=["Bank Transfer","QRIS","E-Wallet","Marketplace Payment"];
// Shop filter options. Products are matched by brand (or category for Accessories); "Others" = everything not matched.
const SHOP_CATS=["Hot Wheels","Mini GT","Pop Race","Pokémon","One Piece","Accessories","Others"];
const CATMATCH={"Hot Wheels":p=>p.brand.toLowerCase()==="hot wheels","Mini GT":p=>p.brand.toLowerCase()==="mini gt","Pop Race":p=>p.brand.toLowerCase()==="pop race","Pokémon":p=>p.brand.toLowerCase()==="pokémon","One Piece":p=>p.brand.toLowerCase()==="one piece","Accessories":p=>p.category==="Accessories"};
const inShopCat=(p,n)=>n==="Others"?!Object.values(CATMATCH).some(f=>f(p)):CATMATCH[n](p);
