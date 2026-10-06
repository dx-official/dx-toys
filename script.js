// ---------- HELPERS ----------
const $=s=>document.querySelector(s),rp=n=>"Rp "+n.toLocaleString("id-ID"),esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const emo={Diecast:"🏎️","Trading Cards":"🃏",Accessories:"🛡️"};
let CART=[];try{CART=JSON.parse(localStorage.getItem("dxcart")||"[]")}catch(e){}
const save=()=>{try{localStorage.setItem("dxcart",JSON.stringify(CART))}catch(e){}};
function toast(m){const t=$("#ts");t.textContent=m;t.classList.add("on");clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove("on"),1600)}
function badge(p){const c={"Best Seller":"y",New:"g",Limited:"r"}[p.badge]||"";return p.badge?`<span class="b ${c}">${esc(p.badge.toUpperCase())}</span>`:""}
const OUT=p=>p.stock!=null&&p.stock<=0,MX=p=>p.stock==null?99:p.stock,ASK=p=>`https://wa.me/${BRAND.wa}?text=${encodeURIComponent("Hello, I'd like to ask about: "+p.name)}`;
function stock(p){if(p.stock==null)return "";return p.stock<=0?`<span class="stk no">OUT OF STOCK</span>`:p.stock<=5?`<span class="stk lo">Only ${p.stock} left · ${esc(p.status)}</span>`:`<span class="stk ok">In stock (${p.stock}) · ${esc(p.status)}</span>`}
function price(p){if(!p.price)return `<div class="pr">Price on request</div>`;const d=p.originalPrice>p.price?Math.round((1-p.price/p.originalPrice)*100):0;return `<div class="pr">${p.from?`<small class="from">Mulai dari</small>`:""}${rp(p.price)}${d?`<s>${rp(p.originalPrice)}</s><span class="d">-${d}%</span>`:""}</div>`}
function img(src,fb){return `<img src="${esc(src)}" alt="" loading="lazy" onerror="this.remove()">${fb}`}
function card(p){return `<article class="card"><a class="im" href="#/product/${p.slug}" aria-label="${esc(p.name)}"><span>${emo[p.category]||"🧸"}</span>${img(p.image,"").replace('alt=""',`alt="${esc(p.name)}"`)}<span class="bd">${badge(p)}</span></a>
<div class="cb"><span class="meta">${[p.brand,p.category].filter(Boolean).map(esc).join(" · ")}</span><h3>${esc(p.name)}</h3>${price(p)}${stock(p)}
<div class="act">${!p.price&&!OUT(p)?`<a class="btn p s" target="_blank" rel="noopener" href="${ASK(p)}">Ask on WhatsApp</a>`:`<button class="btn p s" onclick="add(${p.id})" ${OUT(p)?"disabled":""}>Add to cart</button>`}<a class="btn s" href="#/product/${p.slug}">View</a></div></div></article>`}
const byIds=ids=>ids.map(i=>P.find(p=>p.id===i)).filter(Boolean);
const head=(t,s,l)=>`<div class="hh"><div><h2>${t}</h2><p>${s}</p></div>${l?`<a class="btn s" href="${l}">View all</a>`:""}</div>`;
// ---------- CART ----------
function add(id,q=1){const p=P.find(x=>x.id===id),i=CART.find(x=>x.id===id);if(i)i.q=Math.min(i.q+q,MX(p));else CART.push({id,q});save();upd();toast("Added to cart")}
function chg(id,d){const i=CART.find(x=>x.id===id),p=P.find(x=>x.id===id);i.q=Math.max(0,Math.min(i.q+d,MX(p)));CART=CART.filter(x=>x.q>0);save();upd()}
function cart(o){$("#cart").classList.toggle("open",!!o);upd()}
function upd(){$("#cc").textContent=CART.reduce((a,b)=>a+b.q,0);
$("#cl").innerHTML=CART.length?CART.map(i=>{const p=P.find(x=>x.id===i.id);return `<div class="ci"><div>${esc(p.name)}</div><div>${rp(p.price*i.q)}</div><div class="q"><button onclick="chg(${p.id},-1)" aria-label="Less">−</button><span>${i.q}</span><button onclick="chg(${p.id},1)" aria-label="More">+</button></div></div>`}).join(""):`<p class="empty">Your cart is empty. Add a product to get started.</p>`;
const tot=CART.reduce((a,i)=>a+P.find(x=>x.id===i.id).price*i.q,0);
const msg=encodeURIComponent("Hello DX Toys & Hobbies, I'd like to order:\n"+CART.map(i=>`- ${P.find(x=>x.id===i.id).name} x${i.q}`).join("\n")+"\nPerkiraan total harga: "+rp(tot));
$("#ct").innerHTML=CART.length?`<p><b>Perkiraan total harga: ${rp(tot)}</b></p><a class="btn p" style="display:block;text-align:center" target="_blank" rel="noopener" href="https://wa.me/${BRAND.wa}?text=${msg}">Konfirmasi via WhatsApp</a>`:""}
$("#cb").onclick=()=>cart(1);
// ---------- VIEWS ----------
function home(){return `<section class="hero"><div><span class="lbl">Toys · Diecast · Cards</span><h1>COLLECT WHAT YOU LOVE.</h1><p>Toys, diecast, cards &amp; collectibles — curated for collectors.</p>
<div class="bt"><a class="btn p" href="#/shop">Shop Now</a><a class="btn" href="#collections" onclick="document.getElementById('collections').scrollIntoView();return false">Explore Collections</a></div></div>
<div class="stage"><i style="width:60%;aspect-ratio:1;background:var(--red);top:-14%;right:-12%"></i><i style="width:34%;aspect-ratio:1;background:var(--yellow);bottom:-8%;left:-6%"></i><i style="width:16%;aspect-ratio:1;background:var(--green);top:12%;left:10%"></i>
<div class="t"><span style="background:#fff">🏎️</span><span style="background:var(--yellow)">🃏</span><span style="background:var(--green)">🧸</span><span style="background:#fff">🛡️</span></div>${img("/assets/hero.jpg","")}</div></section>
<section class="sec" id="collections">${head("Featured collections","Pick a shelf and start browsing.")}<div class="grid">${COLS.map(c=>`<a class="col" style="background:${c.c}" href="#/shop?k=${encodeURIComponent(c.n)}"><div style="font-size:2.4rem">${c.e}</div><div><h3>${c.n}</h3><p>${c.d}</p><p><em>Explore collection →</em></p></div></a>`).join("")}</div></section>
<section class="sec">${head("ON PROMOTION","Fresh drops for your collection.","#/shop?s=new")}<div class="grid">${byIds(NEW_IDS).map(card).join("")}</div></section>
<section class="sec">${head("Promotions","Current offers.")}<div class="g2">${PROMO.map(promo).join("")}</div></section>
<section class="sec">${why()}</section>`}
function promo(p){return `<div class="pc"><h3>${esc(p.t)}</h3><span>${esc(p.d)}</span>${p.p?`<span class="meta">Period: ${esc(p.p)}</span>`:""}${p.c?`<span class="code">${esc(p.c)}</span>`:""}<a class="btn s" style="justify-self:start" href="#/shop">Shop now</a></div>`}
function pre(){return `<div class="g2">${PRE.map(r=>`<div class="card" style="flex-direction:row;flex-wrap:wrap"><div class="im" style="flex:1 1 180px;aspect-ratio:auto;min-height:200px"><span>🃏</span>${img(r.img,"")}<span class="bd"><span class="b r">PRE-ORDER</span></span></div><div class="cb" style="flex:1 1 220px"><h3>${esc(r.name)}</h3><span class="meta">Estimated release: ${esc(r.rel)}</span><div class="pr">${rp(r.price)}</div><span class="meta">Deposit: ${rp(r.dep)}</span><span class="stk ok">Status: ${esc(r.status)}</span><p class="meta">${esc(r.d)}</p><a class="btn p s" target="_blank" rel="noopener" href="https://wa.me/${BRAND.wa}?text=${encodeURIComponent("Hello, I'd like to pre-order: "+r.name)}">Pre-order via WhatsApp</a></div></div>`).join("")}</div>`}
function why(){return `${head("WHY DX TOYS & HOBBIES?","")}<div class="g4">${WHY.map(w=>`<div class="card cb"><div class="ic" style="background:${w[3]}">${w[2]}</div><h3>${w[0]}</h3><span class="meta">${w[1]}</span></div>`).join("")}</div>`}
function shop(q){const st={c:"",...q};
return `<section class="sec">${head("Shop","Browse by category.")}<div class="shop"><div class="fl"><label>Category<select id="fc"><option value="">All</option>${SHOP_CATS.map(n=>`<option>${n}</option>`).join("")}</select></label></div>
<div><p class="meta" id="rc"></p><div class="grid" id="pg"></div></div></div></section>`}
let KEEP=true;
function filt(){const c=$("#fc").value,k=KEEP&&(location.hash.match(/[?&]k=([^&]*)/)||[])[1];
let r=P.filter(p=>c?inShopCat(p,c):!k||p.category===decodeURIComponent(k));
if(/[?&]s=new/.test(location.hash))r.sort((x,y)=>NEW_IDS.includes(y.id)-NEW_IDS.includes(x.id));
$("#rc").textContent=r.length+" product"+(r.length===1?"":"s");$("#pg").innerHTML=r.length?r.map(card).join(""):`<p class="empty" style="grid-column:1/-1">No products match. Choose another category to see more products.</p>`}
function prod(slug){const p=P.find(x=>x.slug===slug);if(!p)return `<p class="empty">Product not found. <a href="#/shop" style="color:var(--blue)">Back to shop</a></p>`;document.title=p.name+" — DX Toys & Hobbies";
return `<section class="sec"><p class="meta"><a href="#/shop">Shop</a> / ${esc(p.category)}</p><div class="pd"><div class="im"><span>${emo[p.category]||"🧸"}</span>${img(p.image,"").replace('alt=""',`alt="${esc(p.name)}"`)}<span class="bd">${badge(p)}</span></div>
<div style="display:grid;gap:12px;align-content:start"><span class="meta">${esc(p.brand)}${p.sku?" · SKU "+esc(p.sku):""}</span><h2>${esc(p.name)}</h2>${price(p)}${stock(p)}<p>${esc(p.description)}</p>
${p.price&&!OUT(p)?`<div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center"><div class="q"><button onclick="qty(-1,${MX(p)})" aria-label="Less">−</button><span id="qn">1</span><button onclick="qty(1,${MX(p)})" aria-label="More">+</button></div><button class="btn p" onclick="add(${p.id},+$('#qn').textContent)">Add to cart</button><button class="btn" onclick="add(${p.id},+$('#qn').textContent);cart(1)">Buy now</button></div>`:OUT(p)?`<span class="b r" style="justify-self:start">OUT OF STOCK</span><a class="btn" target="_blank" rel="noopener" href="https://wa.me/${BRAND.wa}?text=${encodeURIComponent("Notify me when back in stock: "+p.name)}">Notify me on WhatsApp</a>`:`<a class="btn p" target="_blank" rel="noopener" href="${ASK(p)}">Ask on WhatsApp</a>`}
<div class="pc"><b>Shipping</b><span class="meta">Processing time 1–2 business days via ${SHIP.join(", ")}. Estimated delivery depends on destination and courier.</span></div></div></div></section>
<section class="sec">${head("Related products","")}<div class="grid">${P.filter(x=>x.id!==p.id).slice(0,4).map(card).join("")}</div></section>`}
const qty=(d,m)=>{const e=$("#qn");e.textContent=Math.max(1,Math.min(m,+e.textContent+d))};
function about(){return `<section class="sec">${why()}</section><section class="sec">${head("FAQ","")}${FAQ.map(f=>`<details><summary>${f[0]}</summary><p>${f[1]}</p></details>`).join("")}</section>
<section class="sec g2"><div><h2>Shipping</h2><div class="chips" style="margin:14px 0">${SHIP.map(s=>`<span class="chip">${s}</span>`).join("")}</div><p class="meta">Processing time: 1–2 business days. Estimated delivery time depends on destination and courier.</p></div>
<div><h2>Payment</h2><div class="chips" style="margin:14px 0">${PAY.map(s=>`<span class="chip">${s}</span>`).join("")}</div></div></section>`}
function contact(){return `<section class="sec">${head("GET IN TOUCH","")}<div class="g3"><div class="pc"><h3>WhatsApp</h3><span>${BRAND.waShow}</span><a class="btn p s" style="justify-self:start" target="_blank" rel="noopener" href="https://wa.me/${BRAND.wa}">Chat on WhatsApp</a></div>
<div class="pc"><h3>Instagram</h3><span>${BRAND.ig}</span><a class="btn s" style="justify-self:start" target="_blank" rel="noopener" href="https://instagram.com/dx_vault">Follow Instagram</a></div>
<div class="pc"><h3>Email &amp; hours</h3><span>${BRAND.email}</span><span class="meta">${BRAND.hours}</span></div></div></section>`}
// ---------- ROUTER ----------
const NAV=[["Home","#/"],["Shop","#/shop"],["New Arrivals","#/shop?s=new"],["Pre-Order","#/preorder"],["About","#/about"],["Contact","#/contact"]];
function route(){const h=location.hash||"#/",[path,qs]=h.split("?"),q={};(qs||"").split("&").forEach(x=>{const[k,v]=x.split("=");if(k)q[k]=decodeURIComponent(v||"")});
const m=path.split("/");let v="",t="DX Toys & Hobbies — Toys, Diecast, Trading Cards & Collectibles";
if(m[1]==="shop"){KEEP=true;v=shop(q);t="Shop — DX Toys & Hobbies"}else if(m[1]==="product")v=prod(m[2]);else if(m[1]==="preorder"){v=`<section class="sec">${head("PRE-ORDER","Secure your upcoming releases before they arrive.")}${pre()}<p class="meta" style="margin-top:14px">Estimated release dates may change according to the official distributor schedule.</p></section><section class="sec">${head("Promotions","")}<div class="g2">${PROMO.map(promo).join("")}</div></section>`;t="Pre-Order — DX Toys & Hobbies"}
else if(m[1]==="about"){v=about();t="About — DX Toys & Hobbies"}else if(m[1]==="contact"){v=contact();t="Contact — DX Toys & Hobbies"}else v=home();
document.title=t;$("#app").innerHTML=v;window.scrollTo(0,0);
$("#nav").innerHTML=NAV.map(n=>`<a href="${n[1]}" class="${h===n[1]?"on":""}">${n[0]}</a>`).join("");
if(m[1]==="shop"){KEEP=true;$("#fc").addEventListener("change",()=>{KEEP=false;filt()});filt()}}
addEventListener("hashchange",route);route();upd();
