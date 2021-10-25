let status="Pending...";
document.addEventListener("DOMContentLoaded", function(){

if (document.getElementsByClassName("payment-method-list__item__info")[0].innerText.indexOf('Balancesoft') > -1){
const textCointainer=document.createElement("div");
textCointainer.className = "content-box__row text-container";

let title=document.createElement("h2");
title.className = "heading-2 os-step__title";
title.appendChild(document.createTextNode("Pay via Balancesoft Pay (Cryptocurrencies)"));

let description=document.createElement("p");
description.className = "os-step__description";
description.appendChild(document.createTextNode("You can pay in stablecoins / non-stablecoins on the Solana Blockchain. Order will only be released on successful Balancesoft payment."));

let bs_img = document.createElement("img");
bs_img.setAttribute("id","bs_img");
bs_img.setAttribute("style", "max-width: 10rem;margin-top: 5px;margin-bottom: 5px;border-radius: 15px;");
bs_img.src = "https://i.ibb.co/fQ9RkYt/Balancesoft-Pay.png" ;

let bs_img_container = document.createElement("p");
bs_img_container.appendChild(bs_img);
description.appendChild(bs_img_container);

let p_link_to_pay = document.createElement("p");
p_link_to_pay.setAttribute("id","link_to_pay")
p_link_to_pay.innerHTML = `Payment Link: ${status}`;
description.appendChild(p_link_to_pay);

let p = document.createElement("p");
p.setAttribute("id","paid_status");
p.innerHTML = `Payment Status: ${status}`;
description.appendChild(p);

let p_guide = document.createElement("p");
p_guide.setAttribute("id","p_guide");
p_guide.innerHTML = `Balancesoft Pay: <a href="https://docs.getbalancesoft.com/user/how-to-make-payments" target="_blank">Guide</a>`;
description.appendChild(p_guide);

let p_last_checked = document.createElement("p");
p_last_checked.setAttribute("id","last_checked_time")
description.appendChild(p_last_checked);

let specialDescription=document.createElement("div");
specialDescription.className = "os-step__special-description";
specialDescription.appendChild(description);

title.appendChild(specialDescription);

textCointainer.appendChild(title);
textCointainer.appendChild(specialDescription);

let contentBox=document.createElement("div");
contentBox.className = "content-box";
contentBox.appendChild(textCointainer);

let appendHere = document.getElementsByClassName("content-box")[0];
appendHere.parentNode.insertBefore(contentBox,appendHere.nextSibling);

document.getElementsByClassName("content-box")[0].style.display= "none";
}
});
