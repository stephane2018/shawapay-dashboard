import { format } from "date-fns";
import { fr } from "date-fns/locale";

export const formatDate = (date: Date | string | number, formatStr: string = "dd MMM yyyy") => {
    if (!date) return "";
    return format(new Date(date), formatStr, { locale: fr });
};
