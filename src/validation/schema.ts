import * as Yup from "yup";
import { BasicValidationTranslations } from "../utility/translations";

/** Validation schema for astronaut dialog */
export const AstronautValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required(BasicValidationTranslations.NON_EMPTY)
    .test("len", BasicValidationTranslations.STRING_MAX_20_CHAR, (value: string | undefined): boolean => {
      if (value && value.length > 0 && value.length <= 20) {
        return true;
      }

      return false;
    }),
  surname: Yup.string()
    .required(BasicValidationTranslations.NON_EMPTY)
    .test("len", BasicValidationTranslations.STRING_MAX_20_CHAR, (value: string | undefined): boolean => {
      if (value && value.length > 0 && value.length <= 20) {
        return true;
      }

      return false;
    }),
  birthdate: Yup.date()
    .required(BasicValidationTranslations.NON_EMPTY),
  superpower: Yup.string()
    .required(BasicValidationTranslations.NON_EMPTY)
    .test("len", BasicValidationTranslations.STRING_MAX_20_CHAR, (value: string | undefined): boolean => {
      if (value && value.length > 0 && value.length <= 20) {
        return true;
      }

      return false;
    })
});
