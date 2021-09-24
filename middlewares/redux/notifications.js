import { toast } from "react-toastify";

const notifications = (store) => (next) => (action) => {
  if (action.msg && /(.*)_(SUCCESS)/.test(action.type)) {
    toast.success(action.msg);
  } else if (action.msg && /(.*)_(ERROR)/.test(action.type)) {
    toast.error(action.msg);
  }
  next(action);
};

export default notifications;
