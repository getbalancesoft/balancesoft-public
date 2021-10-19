function encrypt(transmit_dict, api_key, secret_key) {
  let iterations = 128;
  let bytes = CryptoJS.PBKDF2(api_key, secret_key, { keySize: 48, iterations: iterations });
  let iv = CryptoJS.enc.Hex.parse(bytes.toString().slice(0, 32));
  let key = CryptoJS.enc.Hex.parse(bytes.toString().slice(32, 96));
  let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(transmit_dict), key, { iv: iv });
  return ciphertext.toString();
}

function send_encrypt(transmit_dict, api_key, secret_key) {
  url = 'https://balancesoft-backend.leewenjie.repl.co/v1/shopify_create_request_from_order'
  fetch(url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
        encrypted_data: encrypt(transmit_dict,
          api_key, secret_key)
      })
  })
    .then(response => response.json())
    .then(data => console.log(data));
  return
}

function test() {
  console.log("1234")
}
