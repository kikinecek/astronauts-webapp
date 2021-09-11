import React from "react";
import { Formik } from "formik";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Grid,
  Tooltip,
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import { AstronautDialogInterface } from "../../type/astronautComponent";
import { AstronautValidationSchema } from "../../validation/schema";
import { dateFormatOptions, dateTimeFormatOptions } from "../../utility/date";
import { AstronautsDialogTranslations } from "../../utility/translations";
import { AstronautForm } from "../../type/astronaut";

/**
 * Styles for the astronauts dialog
 */
const useStyles = makeStyles(({ spacing }) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    paddingRight: spacing(2),
    paddingBottom: spacing(2),
    paddingLeft: spacing(2),
    "& > :not(:last-child)": {
      marginBottom: spacing(1)
    }
  },
}));


/** Default values for create astronaut form */
const defaultFormValues: AstronautForm = {
  name: "",
  surname: "",
  superpower: "",
  birthdate: new Date()
}

/**
 * Function represents component Dialog for creating new astronauts
 * !!! All params are passed inside one object (so technically there is only 1 param)
 * @param open defines if dialog is open or not
 * @param onClose is function that handles closing dialog
 * @param onSubmit is function that handles submitting the form
 */
const AstronautsDialog = ({
  astronaut,
  open,
  onClose,
  onSubmit
}: AstronautDialogInterface
): JSX.Element => {
  const classes = useStyles();

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>
          {
            astronaut ? AstronautsDialogTranslations.TITLE_UPDATE : AstronautsDialogTranslations.TITLE_CREATE
          }
        </DialogTitle>
        <Formik
          validationSchema={AstronautValidationSchema}
          initialValues={{
            name: astronaut?.name || defaultFormValues.name,
            surname: astronaut?.surname || defaultFormValues.surname,
            superpower: astronaut?.superpower || defaultFormValues.superpower,
            birthdate: astronaut?.birthdate
              ? astronaut.birthdate.toISOString().substring(0, 10)
              : defaultFormValues.birthdate.toISOString().substring(0, 10)
          }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            onSubmit({
              ...values,
              birthdate: new Date(values.birthdate)
            });
          }}
        >
          {
            ({
              values,
              isSubmitting,
              errors,
              touched,
              handleBlur,
              handleChange,
              submitForm
            }) => (
              <>
                <DialogContent>
                  <form>
                    <Grid container className={classes.container} spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          required
                          id="name"
                          name="name"
                          label={AstronautsDialogTranslations.LABEL_NAME}
                          type="text"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={!!errors.name && touched.name}
                          helperText={touched.name ? errors.name : ""}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          id="surname"
                          name="surname"
                          label={AstronautsDialogTranslations.LABEL_SURNAME}
                          type="text"
                          value={values.surname}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={!!errors.surname && touched.surname}
                          helperText={touched.surname ? errors.surname : ""}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          id="superpower"
                          name="superpower"
                          label={AstronautsDialogTranslations.LABEL_SUPERPOWER}
                          type="text"
                          value={values.superpower}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={!!errors.superpower && touched.superpower}
                          helperText={touched.superpower ? errors.superpower : ""}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          id="birthdate"
                          name="birthdate"
                          label={AstronautsDialogTranslations.LABEL_BIRTHDATE}
                          type="date"
                          value={values.birthdate}
                          onChange={handleChange}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onBlur={handleBlur}
                          error={!!errors.birthdate && !!touched.birthdate}
                          helperText={touched.birthdate ? errors.birthdate : ""}
                        />
                      </Grid>
                      {
                        astronaut ? (
                          <Grid item xs={12}>
                            <Tooltip title={astronaut.createdAt.toLocaleString("en-US", dateTimeFormatOptions)}>
                              <TextField
                                id="createdAt"
                                name="createdAt"
                                label={AstronautsDialogTranslations.LABEL_CREATED_AT}
                                type="text"
                                value={astronaut.createdAt.toLocaleDateString("en-US", dateFormatOptions)}
                                disabled
                              />
                            </Tooltip>
                          </Grid>
                        ) : null
                      }
                      {
                        astronaut ? (
                          <Grid item xs={12}>
                            <Tooltip title={astronaut.updatedAt.toLocaleString("en-US", dateTimeFormatOptions)}>
                              <TextField
                                id="updatedAt"
                                name="updated"
                                label={AstronautsDialogTranslations.LABEL_UPDATED_AT}
                                type="text"
                                value={astronaut.updatedAt.toLocaleDateString("en-US", dateFormatOptions)}
                                disabled
                              />
                            </Tooltip>
                          </Grid>
                        ) : null
                      }
                      <Button onClick={submitForm} disabled={isSubmitting}>{"Submit"}</Button>
                    </Grid>
                  </form>
                </DialogContent>
              </>
            )
          }
        </Formik>
      </Dialog>
    </>
  )
}

export default AstronautsDialog;