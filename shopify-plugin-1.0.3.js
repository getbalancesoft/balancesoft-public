// Get keys to run API calls
window.balancesoftPay = function init(options) {
  const api_key = options.api_key;
  const secret_key = options.secret_key;
  const order_id = options.order_id;
  const shop_url = options.shop_url;
  const dev_api_url = options.dev_api_url;

  function encrypt(transmit_dict, api_key, secret_key) {
    let iterations = 128;
    let bytes = CryptoJS.PBKDF2(api_key, secret_key, {
      keySize: 48,
      iterations: iterations,
    });
    let iv = CryptoJS.enc.Hex.parse(bytes.toString().slice(0, 32));
    let key = CryptoJS.enc.Hex.parse(bytes.toString().slice(32, 96));
    let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(transmit_dict), key, {
      iv: iv,
    });
    return ciphertext.toString();
  }
  async function send_encrypt(transmit_dict, api_key, secret_key) {
    url =
      dev_api_url
        ? dev_api_url: "https://api.getbalancesoft.com/v1/shopify_create_request_from_order";
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        encrypted_data: encrypt(transmit_dict, api_key, secret_key),
        api_key: api_key,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        document.getElementById(
          "img_href_wrapper"
        ).href = `http://${data?.data?.link}`;
        return data?.data;
      });
  }

  async function refresh() {
    const response_data = await send_encrypt(
      {
        order_id: order_id,
        shop_url: window.location.href,
      },
      api_key,
      secret_key
    );
    document.getElementById("paid_status").innerHTML = `Status: <b>${
      response_data?.status ? response_data?.status : "Error"
    }</b>`;
    let d = new Date();
    document.getElementById(
      "last_checked_time"
    ).innerHTML = `Last Checked: ${d.toLocaleTimeString()}`;
    document.getElementById(
      "link_to_pay"
    ).innerHTML = `Pay Link: <a href=`${dev_api_url?http://${response_data?.link}:https://${response_data?.link}}` target="_blank">Balancesoft Pay</a>`;
    if (response_data?.status == "PAID") {
      clearTimeout(timer);
      timer = 0;
    }
    timer = setTimeout(refresh, 5000);
  }
  setTimeout(refresh, 5000);
};

// UI changes to show crypto payments features
let status = "Pending...";
document.addEventListener("DOMContentLoaded", function () {
  if (
    document
      .getElementsByClassName("payment-method-list__item__info")[0]
      .innerText.indexOf("Balancesoft") > -1
  ) {
    const textCointainer = document.createElement("div");
    textCointainer.className = "content-box__row text-container";

    let title = document.createElement("h2");
    title.className = "heading-2 os-step__title";
    title.appendChild(
      document.createTextNode("Pay via Balancesoft Pay (Cryptocurrencies)")
    );

    let description = document.createElement("p");
    description.className = "os-step__description";
    description.appendChild(
      document.createTextNode(
        "You can pay in stablecoins / non-stablecoins on the Solana Blockchain. Order will only be released on successful Balancesoft payment."
      )
    );

    let bs_img = document.createElement("img");
    bs_img.setAttribute("id", "bs_img");
    bs_img.setAttribute(
      "style",
      "max-width: 10rem;margin-top: 5px;margin-bottom: 5px;border-radius: 15px;"
    );
    bs_img.src = "https://i.ibb.co/fQ9RkYt/Balancesoft-Pay.png";

    let img_href_wrapper = document.createElement("a");
    img_href_wrapper.setAttribute("id", "img_href_wrapper");
    img_href_wrapper.setAttribute("target", "_blank");
    img_href_wrapper.appendChild(bs_img);

    let bs_img_container = document.createElement("p");
    bs_img_container.appendChild(img_href_wrapper);
    description.appendChild(bs_img_container);

    let p_link_to_pay = document.createElement("p");
    p_link_to_pay.setAttribute("id", "link_to_pay");
    p_link_to_pay.innerHTML = `Payment Link: ${status}`;
    description.appendChild(p_link_to_pay);

    let p = document.createElement("p");
    p.setAttribute("id", "paid_status");
    p.innerHTML = `Payment Status: ${status}`;
    description.appendChild(p);

    let p_guide = document.createElement("p");
    p_guide.setAttribute("id", "p_guide");
    p_guide.innerHTML = `Balancesoft Pay: <a href="https://docs.getbalancesoft.com/user/how-to-make-payments" target="_blank">Guide</a>`;
    description.appendChild(p_guide);

    let p_last_checked = document.createElement("p");
    p_last_checked.setAttribute("id", "last_checked_time");
    description.appendChild(p_last_checked);

    let specialDescription = document.createElement("div");
    specialDescription.className = "os-step__special-description";
    specialDescription.appendChild(description);

    title.appendChild(specialDescription);

    textCointainer.appendChild(title);
    textCointainer.appendChild(specialDescription);

    let contentBox = document.createElement("div");
    contentBox.className = "content-box";
    contentBox.appendChild(textCointainer);

    let appendHere = document.getElementsByClassName("content-box")[0];
    appendHere.parentNode.insertBefore(contentBox, appendHere.nextSibling);

    document.getElementsByClassName("content-box")[0].style.display = "none";
  }
});
