import {API_END_POINT} from "./api_endpoint";

const  MarkOrderAPI = (payment_id, password) => {
  return new Promise((myResolve, myReject) => {
    console.log(payment_id, "Dfdfds");
    if (payment_id) {
      fetch(API_END_POINT + "markOrder/", {
        method: "POST",
        headers: {

          Accept: "application/json",
          'Content-Type':"application/json",
        },
        body: JSON.stringify({
          'payment_id': payment_id,
          'password': password,
        }),
      })
        .then((result) => {
          if (result.status === 200) myResolve(result.json());
          else throw new Error("Error " + result.status);
        })
        .catch((err) => {
          console.log(err);
          myReject(false);
        });
    } else {
      myReject(false);
    }
  });
};

export default MarkOrderAPI;