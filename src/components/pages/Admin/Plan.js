import React from "react";
import { Done, DeleteRounded } from "@mui/icons-material";
import axios from "axios";

export default function Plan({ plan, type, setPlans, closeModal, userId }) {
  function handleDelete() {
    axios({
      url: `https://terminpro2022.herokuapp.com/api/plan/${plan._id}`,
      method: "DELETE",
    }).then(() => {
      setPlans((prev) => {
        return prev.filter((item) => {
          return item._id !== plan._id;
        });
      });
    });
  }

  function selectSub() {
    axios({
      url: `https://terminpro2022.herokuapp.com/api/payment/subscription/${userId}`,
      method: "POST",
      data: {
        id: plan._id,
        planName: plan.name,
        institution: userId,
        sku: plan.sku,
        months: plan.length,
        price: plan.price,
      },
    }).then((res) => {
      console.log(res.data);
      window.location.replace(res.data.redirect_url);
      closeModal();
    });
  }

  if (type === "owner")
    return (
      <div
        className="plan-card-select"
        style={{
          backgroundColor: "rgba(240,240,240,1)",
        }}
      >
        <div className="plan-content-select">
          <div>Plan : {plan.name}</div>
          <div>No. Services : {plan.serviceLimit}</div>
          <div>Price : {plan.price}</div>
          <div>Length : {plan.length}</div>
          <div>
            <Done
              color="sucess"
              sx={{
                backgroundColor: "rgb(56, 133, 56)",
                color: "white",
                padding: "1px",
                borderRadius: "50%",
                marginTop: "20px",
                marginLeft: "50%",
                fontSize: "30px",
                transform: "translateX(-50%)",
              }}
              onClick={selectSub}
            />
          </div>
        </div>
      </div>
    );

  return (
    <div className="plan-card">
      <div className="plan-content">
        <div>Plan : {plan.name}</div>
        <div>No. Services : {plan.serviceLimit}</div>
        <div>Price : {plan.price}</div>
        <div>Length : {plan.length} Month(s)</div>
        <div>
          <DeleteRounded
            color="error"
            sx={{
              marginTop: "20px",
              marginLeft: "50%",
              transform: "translateX(-50%)",
            }}
            onClick={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}
