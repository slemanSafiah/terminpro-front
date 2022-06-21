import React from "react";
import { useAtom } from "jotai";
import validaityAtom from "../../atoms/validity";
import { Link } from "react-router-dom";

export default function SubscriptionStatus({ end, id }) {
  const [validity, setValidity] = useAtom(validaityAtom);

  if (!end || new Date(end) <= Date.now()) {
    setValidity(false);
    return (
      <div className="noti-subs error">
        your Account is suspended until you Subscribe again
        <Link to={`/institution/${id}`}>
          <div className="fast-access">go to institution page</div>
        </Link>
      </div>
    );
  }
  setValidity(true);
  return (
    <div className="noti-subs">
      <div>your Subscription ends in {new Date(end).toLocaleString()}</div>
      <Link to={`/institution/${id}`}>
        <div className="fast-access">go to institution page</div>
      </Link>
    </div>
  );
}
