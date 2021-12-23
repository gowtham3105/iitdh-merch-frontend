import API_ENDPOINT from "./api_endpoint";

const GetOrder = (payment_id) => {
  return new Promise((myResolve, myReject) => {
    if (payment_id) {
      fetch(API_ENDPOINT +
                "getOrder/?payment_id=" + payment_id, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      })
        .then((result) => {
          if (result.status === 200) myResolve(result.json());
          else throw new Error("Error " + result.status);
        })
        .catch((err) => {
          myReject(false);
        });
    } else {
      myReject(false);
    }
  });
};

export default GetOrder;