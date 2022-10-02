import React, { useState, useEffect } from "react";

type Props = {
  children: React.ReactElement;
  waitBeforeShow?: number;
};

export const Delayed = ({ children, waitBeforeShow = 1000 }: Props) => {
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsShow(true);
    }, waitBeforeShow);
  }, [waitBeforeShow]);

  return isShow ? children : null;
};
