import { useEffect } from "react";
import { hitApi } from "../../api/metricsService";
import { useLocation } from "react-router-dom";

const Cholecounter = () => {
  const location = useLocation();

  useEffect(() => {
    hitApi(window.location.href);
  }, [location.pathname]);

  return null;
};

export default Cholecounter;
